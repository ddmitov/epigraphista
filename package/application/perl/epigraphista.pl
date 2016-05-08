#!/usr/bin/perl

use strict;
use warnings;

########## SETTINGS START HERE ##########
my $stylesheet_link = "http://perl-executing-browser-pseudodomain/bootstrap/css/bootstrap.css";
my $index_page_link = "http://perl-executing-browser-pseudodomain/index.html";
#~ my $template_filepath = "$ENV{PEB_DATA_DIR}/template/telamon-template.xml";
my $inscriptions_directory = "$ENV{PEB_DATA_DIR}/inscriptions";
########## SETTINGS END HERE ##########

# Embedded template:
my $xml = "<?xml version='1.0' encoding='UTF-8'?>
<?xml-model href='http://www.stoa.org/epidoc/schema/latest/tei-epidoc.rng' schematypens='http://relaxng.org/ns/structure/1.0'?>
<?xml-model href='http://www.stoa.org/epidoc/schema/latest/tei-epidoc.rng' schematypens='http://purl.oclc.org/dsdl/schematron'?>
<TEI xmlns='http://www.tei-c.org/ns/1.0' xml:space='preserve' xml:lang='en'>
	<teiHeader>
		<fileDesc>
			<titleStmt>
				<title>{TITLE}</title>
			</titleStmt>
			<publicationStmt>
				<authority/>
				<idno type='filename'>{FILENAME}</idno>
			</publicationStmt>
			<sourceDesc>
				<msDesc>
					<msIdentifier>
						<repository>{REPOSITORY}</repository>
						<idno>{IDNO}</idno>
					</msIdentifier>
					<physDesc>
						<objectDesc>
							<supportDesc>
								<support>
									{SUPPORT_ROOT}
									<material>{MATERIAL}</material>
									<objectType>{OBJECT_TYPE}</objectType>
								</support>
							</supportDesc>
							<layoutDesc>
								<layout>
									{LAYOUT}
								</layout>
							</layoutDesc>
						</objectDesc>
						<handDesc>
							<handNote>
								{HAND_NOTE}
							</handNote>
						</handDesc>
					</physDesc>
					<history>
						<origin>
							<origPlace>{ORIG_PLACE}</origPlace>
							<origDate>{ORIG_DATE}</origDate>
						</origin>
						<provenance type='found'>
							{PROVENANCE_FOUND}
						</provenance>
						<provenance type='observed'>
							{PROVENANCE_OBSERVED}
						</provenance>
					</history>
				</msDesc>
			</sourceDesc>
		</fileDesc>
	</teiHeader>
	<text>
		<body>
			<div type='edition'>
				<ab>
					{ORIGINAL_TEXT_XML}
				</ab>
			</div>
			<div type='apparatus'>
				<p>
					{APPARATUS_CRITICUS}
				</p>
			</div>
			<div type='translation'>
				<p>
					{TRANSLATION}
				</p>
			</div>
			<div type='commentary'>
				<p>
					{COMMENTARY}
				</p>
			</div>
			<div type='bibliography'>
				<p>
					{BIBLIOGRAPHY}
				</p>
			</div>
		</body>
	</text>
</TEI>";

# Convert single quotes to double quotes inside the XML matrix:
$xml =~ s/'/\"/g;

# Read template from external file:
#~ $template_filepath = to_native_separators($template_filepath);
#~ open my $template_filehandle, "<", $template_filepath or die "Can not open template!";
#~ $/ = undef;
#~ $xml = <$template_filehandle>;
#~ close $template_filehandle;

# Get all placeholder names:
my @placeholder_names;
my @xml = split (/\n/, $xml);
foreach my $line (@xml) {
	if ($line =~ m/(\{.*\})/) {
		my $placeholder_name = $1;
		$placeholder_name =~ s/\{//;
		$placeholder_name =~ s/\}//;
		push @placeholder_names, $placeholder_name;
	}
}
$xml =~ s/\{//g;
$xml =~ s/\}//g;

# Read node values from POST data:
my ($buffer, @pairs, $name, $value, %FORM);
read (STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
@pairs = split (/&/, $buffer);
foreach my $pair (@pairs) {
	($name, $value) = split (/=/, $pair);
	$value =~ tr/+/ /;
	$value =~ s/%(..)/pack("C", hex($1))/eg;
	$FORM{$name} = $value;
}

# Title - mandatory element:
$xml =~ s/TITLE/$FORM{"title"}/;

# Filename is produced from title:
my $inscription_filename = $FORM{"title"};
$inscription_filename =~ s/\s|,|;/_/g;
$xml =~ s/FILENAME/$inscription_filename/;
delete($FORM{"title"});

# Inscription text - mandatory element:
my $inscription_contents_indent = "\t" x 5;
my $inscription_formatted_value = $FORM{"original_text_xml"};
$inscription_formatted_value =~ s/\<lb/\n$inscription_contents_indent\<lb/g;
$xml =~ s/ORIGINAL_TEXT_XML/$inscription_formatted_value/;
delete($FORM{"original_text_xml"});

# Save all other nodes:
foreach my $placeholder_name (@placeholder_names) {
	my $form_name = lc $placeholder_name;
	if ($FORM{$form_name}) {
		if ($xml =~ m/(\t{1,}.{0,}$placeholder_name)/) {
			my $xml_matrix_placeholder_line = $1;
			my ($tabcount) = $xml_matrix_placeholder_line =~ s/\t/ /g;
			my $indent = "\t" x $tabcount;

			my $node_value = $FORM{$form_name};
			$node_value =~ s/\n/\n$indent/g;
			$node_value = escape_xml_special_characters($node_value);
			$xml =~ s/$placeholder_name/$node_value/;
		}
	} else {
		$xml =~ s/$placeholder_name//;
	}
}

# Remove all emty lines, if any:
$xml =~ s/\n\s{1,}\n/\n/g;

# Inscription file path:
my $inscription_filepath = "$inscriptions_directory/$inscription_filename.xml";
$inscription_filepath = to_native_separators($inscription_filepath);

# Save inscription file:
open my $output_filehandle, ">", $inscription_filepath or die "Can not open file!";
print $output_filehandle $xml;
close $output_filehandle;

print <<HTML
<!DOCTYPE html>
<html lang="bg">

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">

		<title>Epigraphista</title>

		<link rel="stylesheet" type="text/css" href="$stylesheet_link" media="all"/>

		<style type='text/css'>
			body {
				text-align: center;
			}
		</style>
	</head>

	<body>
		<div class="container-fluid">

		<br>
		<h3>Файлът е записан успешно!</h3>
		<br>

		<div class="form-group">
			<a href='$index_page_link' target='_self' class="btn btn-primary">Запиши нов файл</a>
		</div>

		</div>
	</body>

</html>
HTML
;

# Convert path separators to native path separators depending on the operating system:
sub to_native_separators {
	my ($path) = @_;

	if ($^O eq "MSWin32") {
		$path =~ s/\//\\/g;
	} else {
		$path =~ s/\\/\//g;
	}

	return $path;
}

# Escape all XML special characters:
sub escape_xml_special_characters {
	my ($text) = @_;

	$text =~ s/\</&lt;/g;
	$text =~ s/\>/&gt;/g;
	$text =~ s/&/&amp;/g;
	$text =~ s/\'/&apos;/g;
	$text =~ s/\"/&quot;/g;

	return $text;
}
