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
									SUPPORT
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
					INSCRIPTION_TEXT
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

my $new_filename;

# Reading new node values from POST data:
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
$new_filename = $FORM{"title"};
$new_filename =~ s/\s|,|;/_/g;
$xml =~ s/FILENAME/$new_filename/;

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

if ($FORM{"support"}) {
	my $node_level = 8;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"support"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

	$xml =~ s/SUPPORT/$formatted_value/;
} else {
	$xml =~ s/SUPPORT//;
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
	my $node_level = 8;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"layout"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

	$xml =~ s/LAYOUT/$formatted_value/;
} else {
	$xml =~ s/LAYOUT//;
}

if ($FORM{"hand_note"}) {
	my $node_level = 8;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"hand_note"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

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

my $inscription_node_level = 4;
my $inscription_contents_indent = "\t" x ($inscription_node_level + 1);

my $inscription_formatted_value = $FORM{"original_text_xml"};
$inscription_formatted_value =~ s/\<lb/\n$inscription_contents_indent\<lb/g;

$xml =~ s/INSCRIPTION_TEXT/$inscription_formatted_value/;

if ($FORM{"apparatus_criticus"}) {
	my $node_level = 4;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"apparatus_criticus"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

	$xml =~ s/APPARATUS_CRITICUS/$formatted_value/;
} else {
	$xml =~ s/APPARATUS_CRITICUS//;
}

if ($FORM{"translation"}) {
	my $node_level = 4;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"translation"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

	$xml =~ s/TRANSLATION/$formatted_value/;
} else {
	$xml =~ s/TRANSLATION//;
}

if ($FORM{"commentary"}) {
	my $node_level = 4;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"commentary"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

	$xml =~ s/COMMENTARY/$formatted_value/;
} else {
	$xml =~ s/COMMENTARY//;
}

if ($FORM{"bibliography"}) {
	my $node_level = 4;
	my $contents_indent = "\t" x ($node_level + 1);

	my $formatted_value = $FORM{"bibliography"};
	$formatted_value =~ s/\n/\n$contents_indent/g;

	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;

	$xml =~ s/BIBLIOGRAPHY/$formatted_value/;
} else {
	$xml =~ s/BIBLIOGRAPHY//;
}

# Remove all emty lines:
$xml =~ s/\n\s{1,}\n/\n/g;

# Save as a new file:
my $inscription_filepath = "$inscriptions_directory/$new_filename.xml";
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
