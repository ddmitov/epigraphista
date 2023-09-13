#!/usr/bin/perl

# Epigraphista - EpiDoc XML file creator
# Epigraphista is licensed under the terms of GNU GPL version 3.
# Dimitar D. Mitov, 2015 - 2018, 2023.

use strict;
use warnings;

use Cwd;
use JSON::PP;

# Input data is read from STDIN:
my $buffer = <STDIN>;
chomp $buffer;

my $json_object = new JSON::PP;
my $form = $json_object->decode($buffer);

# Compose the paths of the XML template and the inscriptions directory:
my $cwd = cwd();
my $template_filepath = "$cwd/epigraphista/xml/template.xml";
my $inscriptions_directory = "$cwd/../data";

# Create inscriptions directory if it does not exist:
mkdir ($inscriptions_directory) unless (-d $inscriptions_directory);

# Convert template filepath to native separators:
$template_filepath = to_native_separators($template_filepath);

my $xml;

# Read the XML template:
{
  open my $template_filehandle, "<", $template_filepath or
    die "Can not open template: $template_filepath";
  $/ = undef;
  $xml = <$template_filehandle>;
  close $template_filehandle;
}

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

# Title - mandatory element:
$xml =~ s/TITLE/$form->{"title"}/;

# Filename is produced from title:
my $inscription_filename = $form->{"title"};
$inscription_filename =~ s/\s|,|;/_/g;

$xml =~ s/FILENAME/$inscription_filename/;

delete($form->{"title"});

# Inscription description:
if ($form->{"support"}) {
  my $support_indent = " " x 9;
  my $support_formatted_value = $form->{"support"};

  $support_formatted_value =~ s/\<lb/\n$support_indent\<lb/g;
  $xml =~ s/SUPPORT/$support_formatted_value/;

  delete($form->{"support"});
}

# Inscription text - mandatory element:
my $inscription_indent = " " x 20;
my $inscription_formatted_value = $form->{"inscription_xml"};
$inscription_formatted_value =~ s/\<lb/\n$inscription_indent\<lb/g;

$xml =~ s/INSCRIPTION/$inscription_formatted_value/;

delete($form->{"inscription_xml"});

# Save all other nodes:
foreach my $placeholder_name (@placeholder_names) {
  my $form_name = lc $placeholder_name;

  if ($form->{$form_name}) {
    if ($xml =~ m/(\s{1,}.{0,}$placeholder_name)/) {
      my $xml_matrix_placeholder_line = $1;
      my ($space_count) = $xml_matrix_placeholder_line =~ s/\s/ /g;
      my $indent = " " x $space_count;

      my $node_value = $form->{$form_name};
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
open my $output_filehandle, ">", $inscription_filepath or
  die "Can not open file!";
print $output_filehandle $xml;
close $output_filehandle;

print "OK";

# FUNCTIONS
# Convert path separators depending on the operating system:
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
