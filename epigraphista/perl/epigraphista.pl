#!/usr/bin/perl

use strict;
use warnings;
use XML::LibXML;

########## SETTINGS START HERE ##########
my $domain = "http://perl-executing-browser-pseudodomain";
my $new_files_directory = "$ENV{DATA_ROOT}";
########## SETTINGS END HERE ##########

# Parsing the template:
my $template_filename = "telamon-template.xml";
my $parser = XML::LibXML->new();
my $document = $parser->parse_file($template_filename);

#~ my $template = "";
#~ my $document = $parser->load_xml($template);

$document->setEncoding("utf-8");

my $xml = XML::LibXML::XPathContext->new ($document);
$xml->registerNs ("TEI", "http://www.tei-c.org/ns/1.0");

# Reading new node values from POST data:
my ($buffer, @pairs, $name, $value, %FORM);
read (STDIN, $buffer, $ENV{'CONTENT_LENGTH'});

my $new_filename;

my $support_value;
my $material_value;
my $object_type_value;

@pairs = split (/&/, $buffer);
foreach my $pair (@pairs) {
	($name, $value) = split (/=/, $pair);
	$value =~ tr/+/ /;
	$value =~ s/%(..)/pack("C", hex($1))/eg;
	$FORM{$name} = $value;

	if ($name =~ "title" and length($value) > 0) {
		my $new_title_node = $document->createElement("title");
		$new_title_node->appendText($value);
		my ($current_title_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:titleStmt/TEI:title');
		# Replacing the old node vaue with the new one:
		$current_title_node->replaceNode($new_title_node);

		# Filename is produced from title:
		$new_filename = $value;
		$new_filename =~ s/\s|,|;/_/g;
		my $new_filename_node = $document->createElement("idno");
		$new_filename_node->setAttribute("type", "filename");
		$new_filename_node->appendText($new_filename);
		my ($current_filename_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:publicationStmt/TEI:idno[@type="filename"]');
		# Replacing the old node with the new one:
		$current_filename_node->replaceNode($new_filename_node);
	}

	if ($name =~ "repository" and length($value) > 0) {
		my $new_node = $document->createElement("repository");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier/TEI:repository');
		# Replacing the old node with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "idno" and length($value) > 0) {
		my $new_node = $document->createElement("idno");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier/TEI:idno');
		# Replacing the old node with the new one:
		$current_node->replaceNode($new_node);
	}

# Support group:
	if ($name =~ "support" and length($value) > 0) {
		$support_value = $value;
	}

	if ($name =~ "material" and length($value) > 0) {
		$material_value = $value;
	}

	if ($name =~ "object_type" and length($value) > 0) {
		$object_type_value = $value;
	}

	if ($name =~ "layout" and length($value) > 0) {
		my $node_level = 8;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\n/\n$contents_indent/g;
		# Escaping all XML special characters:
		$formatted_value =~ s/\</&lt;/g;
		$formatted_value =~ s/\>/&gt;/g;
		$formatted_value =~ s/&/&amp;/g;
		$formatted_value =~ s/\'/&apos;/g;
		$formatted_value =~ s/\"/&quot;/g;
		$formatted_value = "<layout>\n$contents_indent$formatted_value\n$tag_indent</layout>";
		my $fragment = $parser->parse_balanced_chunk($formatted_value );

		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:layoutDesc/TEI:layout');
		# Replacing the old node with the new one:
		$current_node->replaceNode($fragment);
	}

	if ($name =~ "hand_note" and length($value) > 0) {
		my $node_level = 7;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\n/\n$contents_indent/g;
		# Escaping all XML special characters:
		$formatted_value =~ s/\</&lt;/g;
		$formatted_value =~ s/\>/&gt;/g;
		$formatted_value =~ s/&/&amp;/g;
		$formatted_value =~ s/\'/&apos;/g;
		$formatted_value =~ s/\"/&quot;/g;
		$formatted_value = "<handNote>\n$contents_indent$formatted_value\n$tag_indent</handNote>";
		my $fragment = $parser->parse_balanced_chunk($formatted_value );

		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:handDesc/TEI:handNote');
		# Replacing the old node with the new one:
		$current_node->replaceNode($fragment);
	}

	if ($name =~ "orig_place" and length($value) > 0) {
		my $new_node = $document->createElement("origPlace");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin/TEI:origPlace');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "orig_date" and length($value) > 0) {
		my $new_node = $document->createElement("origDate");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin/TEI:origDate');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "provenance_found" and length($value) > 0) {
		my $new_node = $document->createElement("provenance");
		$new_node->setAttribute("type", "found");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:provenance[@type="found"]');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "provenance_observed" and length($value) > 0) {
		my $new_node = $document->createElement("provenance");
		$new_node->setAttribute("type", "observed");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:provenance[@type="observed"]');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "original_text_xml" and length($value) > 0) {
		my $node_level = 4;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\<lb/\n$contents_indent\<lb/g;
		$formatted_value =~ s/\<\/ab\>/\n$tag_indent\<\/ab\>/g;
		my $fragment = $parser->parse_balanced_chunk($formatted_value);

		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="edition"]/TEI:ab');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($fragment);
	}

	if ($name =~ "apparatus_criticus" and length($value) > 0) {
		my $node_level = 4;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\n/\n$contents_indent/g;
		# Escaping all XML special characters:
		$formatted_value =~ s/\</&lt;/g;
		$formatted_value =~ s/\>/&gt;/g;
		$formatted_value =~ s/&/&amp;/g;
		$formatted_value =~ s/\'/&apos;/g;
		$formatted_value =~ s/\"/&quot;/g;
		$formatted_value = "<p>\n$contents_indent$formatted_value\n$tag_indent</p>";
		my $fragment = $parser->parse_balanced_chunk($formatted_value);

		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="apparatus"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($fragment);
	}

	if ($name =~ "translation" and length($value) > 0) {
		my $node_level = 4;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\n/\n$contents_indent/g;
		# Escaping all XML special characters:
		$formatted_value =~ s/\</&lt;/g;
		$formatted_value =~ s/\>/&gt;/g;
		$formatted_value =~ s/&/&amp;/g;
		$formatted_value =~ s/\'/&apos;/g;
		$formatted_value =~ s/\"/&quot;/g;
		$formatted_value = "<p>\n$contents_indent$formatted_value\n$tag_indent</p>";
		my $fragment = $parser->parse_balanced_chunk($formatted_value);

		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="translation"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($fragment);
	}

	if ($name =~ "commentary" and length($value) > 0) {
		my $node_level = 4;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\n/\n$contents_indent/g;
		# Escaping all XML special characters:
		$formatted_value =~ s/\</&lt;/g;
		$formatted_value =~ s/\>/&gt;/g;
		$formatted_value =~ s/&/&amp;/g;
		$formatted_value =~ s/\'/&apos;/g;
		$formatted_value =~ s/\"/&quot;/g;
		$formatted_value = "<p>\n$contents_indent$formatted_value\n$tag_indent</p>";
		my $fragment = $parser->parse_balanced_chunk($formatted_value);

		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="commentary"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($fragment);
	}

	if ($name =~ "bibliography" and length($value) > 0) {
		my $node_level = 4;
		my $tag_indent = "\t" x $node_level;
		my $contents_indent = "\t" x ($node_level + 1);
		my $formatted_value = $value;
		$formatted_value =~ s/\n/\n$contents_indent/g;
		# Escaping all XML special characters:
		$formatted_value =~ s/\</&lt;/g;
		$formatted_value =~ s/\>/&gt;/g;
		$formatted_value =~ s/&/&amp;/g;
		$formatted_value =~ s/\'/&apos;/g;
		$formatted_value =~ s/\"/&quot;/g;
		$formatted_value = "<p>\n$contents_indent$formatted_value\n$tag_indent</p>";
		my $fragment = $parser->parse_balanced_chunk($formatted_value );

		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="bibliography"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($fragment);
	}
}

# Support group:
my $new_support_node = $document->createElement("support");
if (length($support_value)) {
	my $node_level = 8;
	my $tag_indent = "\t" x $node_level;
	my $contents_indent = "\t" x ($node_level + 1);
	my $formatted_value = $support_value;
	$formatted_value =~ s/\n/\n$contents_indent/g;
	# Escaping all XML special characters:
	$formatted_value =~ s/\</&lt;/g;
	$formatted_value =~ s/\>/&gt;/g;
	$formatted_value =~ s/&/&amp;/g;
	$formatted_value =~ s/\'/&apos;/g;
	$formatted_value =~ s/\"/&quot;/g;
	$new_support_node->appendText($formatted_value);
}

my $material_node = $document->createElement("material");
if (length($material_value)) {
	$material_node->appendText($material_value);
}
$new_support_node->appendChild($material_node);

my $object_type_node = $document->createElement("objectType");
if (length($object_type_value)) {
	$object_type_node->appendText($object_type_value);
}
$new_support_node->appendChild($object_type_node);

my ($current_support_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:supportDesc/TEI:support');
$current_support_node->replaceNode($new_support_node);

# Save as a new file:
$document->toFile ("$new_files_directory/$new_filename.xml");

print <<HTML
<!DOCTYPE html>
<html lang="bg">

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">

		<title>Epigraphista</title>

		<link rel="stylesheet" type="text/css" href="$domain/ui/bootstrap/css/bootstrap.css" media="all"/>

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
			<a href='$domain/ui/index.htm' target='_self' class="btn btn-primary">Запиши нов файл</a>
		</div>

		</div>
	</body>

</html>
HTML
;
