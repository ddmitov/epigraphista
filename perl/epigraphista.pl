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
@pairs = split (/&/, $buffer);
foreach my $pair (@pairs) {
	($name, $value) = split (/=/, $pair);
	$value =~ tr/+/ /;
	$value =~ s/%(..)/pack("C", hex($1))/eg;
	$FORM{$name} = $value;

	if ($name =~ "title") {
		$new_filename = $value;
		$new_filename =~ s/\s|,/_/g;

		my $title_node = $document->createElement("title");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:titleStmt');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "repository") {
		my $title_node = $document->createElement("repository");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "idno") {
		my $title_node = $document->createElement("idno");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:msIdentifier');
		$node_object->appendChild($title_node);
	}

	if ($name =~ "description") {
		my $title_node = $document->createElement("support");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:supportDesc');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "layout") {
		my $title_node = $document->createElement("layout");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:objectDesc/TEI:layoutDesc');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "hand_note") {
		my $title_node = $document->createElement("handNote");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:physDesc/TEI:handDesc');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "orig_place") {
		my $title_node = $document->createElement("origPlace");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "orig_date") {
		my $title_node = $document->createElement("origDate");
		$title_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:teiHeader/TEI:fileDesc/TEI:sourceDesc/TEI:msDesc/TEI:history/TEI:origin');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($title_node);
	}

	if ($name =~ "original_text_xml") {
		my $fragment = $parser->parse_balanced_chunk($value);
		my ($node_object) = $xml->findnodes("//TEI:text/TEI:body/TEI:div/TEI:ab");
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($fragment);
	}

	if ($name =~ "apparatus_criticus") {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="apparatus"]');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($paragraph_node);
	}

	if ($name =~ "translation") {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="translation"]');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($paragraph_node);
	}

	if ($name =~ "commentary") {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="commentary"]');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($paragraph_node);
	}

	if ($name =~ "bibliography") {
		my $paragraph_node = $document->createElement("p");
		$paragraph_node->appendText($value);
		my ($node_object) = $xml->findnodes('//TEI:text/TEI:body/TEI:div[@type="bibliography"]');
		# Replacing the old node vaue with the new one:
		$node_object->removeChildNodes();
		$node_object->appendChild($paragraph_node);
	}
}

# Save as a new file:
$document->toFile ("$DOCUMENT_ROOT/inscriptions/$new_filename.xml");

#~ print "Content-type: text/html; charset=utf-8\n\n";

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
