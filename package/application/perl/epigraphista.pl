#!/usr/bin/perl

use strict;
use warnings;

########## SETTINGS START HERE ##########
my $stylesheet_link = "http://perl-executing-browser-pseudodomain/bootstrap/css/bootstrap.css";
my $index_page_link = "http://perl-executing-browser-pseudodomain/index.html";
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
				<title>TITLE</title>
			</titleStmt>
			<publicationStmt>
				<authority/>
				<idno type='filename'>FILENAME</idno>
			</publicationStmt>
			<sourceDesc>
				<msDesc>
					<msIdentifier>
						<repository>REPOSITORY</repository>
						<idno>IDNO</idno>
					</msIdentifier>
					<physDesc>
						<objectDesc>
							<supportDesc>
								<support>
									SUPPORT_ROOT
									<material>MATERIAL</material>
									<objectType>OBJECT_TYPE</objectType>
								</support>
							</supportDesc>
							<layoutDesc>
								<layout>
									LAYOUT
								</layout>
							</layoutDesc>
						</objectDesc>
						<handDesc>
							<handNote>
								HAND_NOTE
							</handNote>
						</handDesc>
					</physDesc>
					<history>
						<origin>
							<origPlace>ORIG_PLACE</origPlace>
							<origDate>ORIG_DATE</origDate>
						</origin>
						<provenance type='found'>
							PROVENANCE_FOUND
						</provenance>
						<provenance type='observed'>
							PROVENANCE_OBSERVED
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
					ORIGINAL_TEXT_XML
				</ab>
			</div>
			<div type='apparatus'>
				<p>
					APPARATUS_CRITICUS
				</p>
			</div>
			<div type='translation'>
				<p>
					TRANSLATION
				</p>
			</div>
			<div type='commentary'>
				<p>
					COMMENTARY
				</p>
			</div>
			<div type='bibliography'>
				<p>
					BIBLIOGRAPHY
				</p>
			</div>
		</body>
	</text>
</TEI>";

# Convert single quotes to double quotes inside the XML matrix:
$xml =~ s/'/\"/g;

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

$xml =~ s/TITLE/$FORM{"title"}/;

# Filename is produced from title:
my $inscription_filename = $FORM{"title"};
$inscription_filename =~ s/\s|,|;/_/g;
$xml =~ s/FILENAME/$inscription_filename/;

if ($FORM{"repository"}) {
	$xml =~ s/REPOSITORY/$FORM{"repository"}/;
} else {
	$xml =~ s/REPOSITORY//;
}

if ($FORM{"idno"}) {
	$xml =~ s/IDNO/$FORM{"idno"}/;
} else {
	$xml =~ s/IDNO//;
}

if ($FORM{"support_root"}) {
	my $formatted_value = indent_node_value(8, $FORM{"support_root"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/SUPPORT_ROOT/$formatted_value/;
} else {
	$xml =~ s/SUPPORT_ROOT//;
}

if ($FORM{"material"}) {
	$xml =~ s/MATERIAL/$FORM{"material"}/;
} else {
	$xml =~ s/MATERIAL//;
}

if ($FORM{"object_type"}) {
	$xml =~ s/OBJECT_TYPE/$FORM{"object_type"}/;
} else {
	$xml =~ s/OBJECT_TYPE//;
}

if ($FORM{"layout"}) {
	my $formatted_value = indent_node_value(8, $FORM{"layout"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/LAYOUT/$formatted_value/;
} else {
	$xml =~ s/LAYOUT//;
}

if ($FORM{"hand_note"}) {
	my $formatted_value = indent_node_value(8, $FORM{"hand_note"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/HAND_NOTE/$formatted_value/;
} else {
	$xml =~ s/HAND_NOTE//;
}

if ($FORM{"orig_place"}) {
	$xml =~ s/ORIG_PLACE/$FORM{"orig_place"}/;
} else {
	$xml =~ s/ORIG_PLACE//;
}

if ($FORM{"orig_date"}) {
	$xml =~ s/ORIG_DATE/$FORM{"orig_date"}/;
} else {
	$xml =~ s/ORIG_DATE//;
}

if ($FORM{"provenance_found"}) {
	$xml =~ s/PROVENANCE_FOUND/$FORM{"provenance_found"}/;
} else {
	$xml =~ s/PROVENANCE_FOUND//;
}

if ($FORM{"provenance_observed"}) {
	$xml =~ s/PROVENANCE_OBSERVED/$FORM{"provenance_observed"}/;
} else {
	$xml =~ s/PROVENANCE_OBSERVED//;
}

my $inscription_contents_indent = "\t" x 5;
my $inscription_formatted_value = $FORM{"original_text_xml"};
$inscription_formatted_value =~ s/\<lb/\n$inscription_contents_indent\<lb/g;
$xml =~ s/ORIGINAL_TEXT_XML/$inscription_formatted_value/;

if ($FORM{"apparatus_criticus"}) {
	my $formatted_value = indent_node_value(4, $FORM{"apparatus_criticus"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/APPARATUS_CRITICUS/$formatted_value/;
} else {
	$xml =~ s/APPARATUS_CRITICUS//;
}

if ($FORM{"translation"}) {
	my $formatted_value = indent_node_value(4, $FORM{"translation"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/TRANSLATION/$formatted_value/;
} else {
	$xml =~ s/TRANSLATION//;
}

if ($FORM{"commentary"}) {
	my $formatted_value = indent_node_value(4, $FORM{"commentary"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/COMMENTARY/$formatted_value/;
} else {
	$xml =~ s/COMMENTARY//;
}

if ($FORM{"bibliography"}) {
	my $formatted_value = indent_node_value(4, $FORM{"bibliography"});
	$formatted_value = escape_xml_special_characters($formatted_value);
	$xml =~ s/BIBLIOGRAPHY/$formatted_value/;
} else {
	$xml =~ s/BIBLIOGRAPHY//;
}

# Remove all emty lines, if any:
$xml =~ s/\n\s{1,}\n/\n/g;

# Save as a new file:
my $inscription_filepath = "$inscriptions_directory/$inscription_filename.xml";
$inscription_filepath = to_native_separators($inscription_filepath);

open my $output_filehandle, ">", $inscription_filepath or die "Can not open new file!";
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

sub indent_node_value {
	my ($node_level, $node_value) = @_;

	my $indent = "\t" x ($node_level + 1);
	$node_value =~ s/\n/\n$indent/g;

	return $node_value;
}
