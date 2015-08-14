#!/usr/bin/perl

use strict;
use warnings;
use XML::LibXML;
use Env qw (DOCUMENT_ROOT);

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

	if ($name =~ "title" and length($value) > 0) {
		$new_filename = $value;
		$new_filename =~ s/\s|,|;/_/g;

		my $new_node = $document->createElement("title");
		$new_node->appendText($value);
		my ($title_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:titleStmt');
		# Replacing the old node vaue with the new one:
		$title_object->removeChildNodes();
		$title_object->appendChild($new_node);

		my ($filename_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:publicationStmt/TEI:idno[@type="filename"]');
		$filename_object->removeChildNodes();
		$filename_object->appendText($new_filename);
	}

	if ($name =~ "repository" and length($value) > 0) {
		my $new_node = $document->createElement("repository");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($new_node);
	}

	if ($name =~ "idno" and length($value) > 0) {
		my $new_node = $document->createElement("idno");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier');
		$old_node->appendChild($new_node);
	}

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
		my $new_node = $document->createElement("layout");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:layoutDesc');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($new_node);
	}

	if ($name =~ "hand_note" and length($value) > 0) {
		my $new_node = $document->createElement("handNote");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:handDesc');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($new_node);
	}

	if ($name =~ "orig_place" and length($value) > 0) {
		my $new_node = $document->createElement("origPlace");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin/TEI:origPlace');
		# Replacing the old node vaue with the new one:
		$old_node->replaceNode($new_node);
	}

	if ($name =~ "orig_date" and length($value) > 0) {
		my $new_node = $document->createElement("origDate");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin/TEI:origDate');
		# Replacing the old node vaue with the new one:
		$old_node->replaceNode($new_node);
	}

	if ($name =~ "provenance_found" and length($value) > 0) {
		my $new_node = $document->createElement("provenance");
		$new_node->setAttribute("type", "found");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:provenance[@type="found"]');
		# Replacing the old node vaue with the new one:
		$old_node->replaceNode($new_node);
	}

	if ($name =~ "provenance_observed" and length($value) > 0) {
		my $new_node = $document->createElement("provenance");
		$new_node->setAttribute("type", "observed");
		$new_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:provenance[@type="observed"]');
		# Replacing the old node vaue with the new one:
		$old_node->replaceNode($new_node);
	}

	if ($name =~ "original_text_xml" and length($value) > 0) {
		my $fragment = $parser->parse_balanced_chunk($value);
		my ($old_node) = $xml->findnodes("//TEI:text/TEI:body/TEI:div/TEI:ab");
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($fragment);
	}

	if ($name =~ "apparatus_criticus" and length($value) > 0) {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="apparatus"]');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($paragraph_node);
	}

	if ($name =~ "translation" and length($value) > 0) {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="translation"]');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($paragraph_node);
	}

	if ($name =~ "commentary" and length($value) > 0) {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="commentary"]');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($paragraph_node);
	}

	if ($name =~ "bibliography" and length($value) > 0) {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($old_node) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="bibliography"]');
		# Replacing the old node vaue with the new one:
		$old_node->removeChildNodes();
		$old_node->appendChild($paragraph_node);
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
my ($old_support_node) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:supportDesc/TEI:support');
$old_support_node->replaceNode($new_support_node);

# Save as a new file:
$document->toFile ("$DOCUMENT_ROOT/inscriptions/$new_filename.xml");

print <<HTML
<!DOCTYPE html>
<html lang="bg">

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">

		<title>Epigraphista</title>

		<link rel="stylesheet" type="text/css" href="http://perl-executing-browser-pseudodomain/html-css-js/bootstrap/css/bootstrap.css" media="all"/>
		<script type="text/javascript" src="http://perl-executing-browser-pseudodomain/html-css-js/bootstrap/js/bootstrap-min.js"></script>
		<link rel="stylesheet" type="text/css" href="http://perl-executing-browser-pseudodomain/html-css-js/bootstrap/css/current.css" media="all"/>

	</head>

	<body>
		<div class="container-fluid">

		<br>
		<h3>Файлът е записан успешно!</h3>
		<br>

		<div class="form-group">
			<a href='http://perl-executing-browser-pseudodomain/html-css-js/epigraphista.htm' class="btn btn-primary">Запиши нов файл</a>
		</div>

		</div>
	</body>

</html>
HTML
;
