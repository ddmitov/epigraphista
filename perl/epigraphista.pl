#!/usr/bin/perl

use strict;
use warnings;
use XML::LibXML;
use Env qw (DOCUMENT_ROOT);

########## SETTINGS START HERE ##########
my $domain = "http://perl-executing-browser-pseudodomain";
my $new_files_directory = "$DOCUMENT_ROOT/inscriptions";
########## SETTINGS END HERE ##########

# Opening and parsing the template file:
my $template_filename = "telamon-template.xml";
my $parser = XML::LibXML->new();
my $document = $parser->parse_file ($template_filename);
$document->setEncoding ("utf-8");

my $xml = XML::LibXML::XPathContext->new ($document);
$xml->registerNs ("TEI", "http://www.tei-c.org/ns/1.0");

# Reading new node values from POST data:
my ($buffer, @pairs, $name, $value, %FORM);
$ENV{'REQUEST_METHOD'} =~ tr/a-z/A-Z/;
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

	if ($name =~ "title") {
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

	if ($name =~ "repository") {
		my $new_node = $document->createElement("repository");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier/TEI:repository');
		# Replacing the old node with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "idno") {
		my $new_node = $document->createElement("idno");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier/TEI:idno');
		# Replacing the old node with the new one:
		$current_node->replaceNode($new_node);
	}

# Support group:
	if ($name =~ "support") {
		$support_value = $value;
	}

	if ($name =~ "material") {
		$material_value = $value;
	}

	if ($name =~ "object_type") {
		$object_type_value = $value;
	}

	if ($name =~ "layout") {
		my $new_node = $document->createElement("layout");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:layoutDesc/TEI:layout');
		# Replacing the old node with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "hand_note") {
		my $new_node = $document->createElement("handNote");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:handDesc/TEI:handNote');
		# Replacing the old node with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "orig_place") {
		my $new_node = $document->createElement("origPlace");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin/TEI:origPlace');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "orig_date") {
		my $new_node = $document->createElement("origDate");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin/TEI:origDate');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "provenance_found") {
		my $new_node = $document->createElement("provenance");
		$new_node->setAttribute("type", "found");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:provenance[@type="found"]');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "provenance_observed") {
		my $new_node = $document->createElement("provenance");
		$new_node->setAttribute("type", "observed");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:provenance[@type="observed"]');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "original_text_xml") {
		my $fragment = $parser->parse_balanced_chunk($value);
		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="edition"]/TEI:ab');
		# Replacing the old node vaue with the new one:
		$current_node->removeChildNodes();
		$current_node->appendChild($fragment);
	}

	if ($name =~ "apparatus_criticus") {
		my $new_node = $document->createElement("p");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="apparatus"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "translation") {
		my $new_node = $document->createElement("p");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="translation"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "commentary") {
		my $new_node = $document->createElement("p");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="commentary"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}

	if ($name =~ "bibliography") {
		my $new_node = $document->createElement("p");
		$new_node->appendText($value);
		my ($current_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="bibliography"]/TEI:p');
		# Replacing the old node vaue with the new one:
		$current_node->replaceNode($new_node);
	}
}

# Support group:
my $new_support_node = $document->createElement("support");
if (length($support_value)) {
	$new_support_node->appendText($support_value);
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

		<link rel="stylesheet" type="text/css" href="$domain/html-css-js/bootstrap/css/bootstrap.css" media="all"/>
		<script type="text/javascript" src="$domain/html-css-js/bootstrap/js/bootstrap-min.js"></script>
		<link rel="stylesheet" type="text/css" href="$domain/html-css-js/bootstrap/css/current.css" media="all"/>

	</head>

	<body>
		<div class="container-fluid">

		<br>
		<h3>Файлът е записан успешно!</h3>
		<br>

		<div class="form-group">
			<a href='$domain/html-css-js/epigraphista.htm' class="btn btn-primary">Запиши нов файл</a>
		</div>

		</div>
	</body>

</html>
HTML
;
