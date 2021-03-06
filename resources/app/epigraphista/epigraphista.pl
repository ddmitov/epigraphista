#!/usr/bin/perl

# Epigraphista version 0.2.0
# EpiDoc XML file creator
# Epigraphista is licensed under the terms of GNU GPL version 3.
# Dimitar D. Mitov, 2015 - 2018.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.

use strict;
use warnings;
use Cwd;

my $cwd = cwd();

# Input data is read from STDIN:
my ($buffer, @pairs, $name, $value, %FORM);
$buffer = <STDIN>;
chomp $buffer;

@pairs = split (/&/, $buffer);

foreach my $pair (@pairs) {
  ($name, $value) = split (/=/, $pair);
  $value =~ tr/+/ /;
  $value =~ s/%(..)/pack("C", hex($1))/eg;
  $FORM{$name} = $value;
}

# Paths of the XML template and the inscriptions directory
# Electron:
my $template_filepath = "$cwd/resources/data/telamon-template.xml";
my $inscriptions_directory = "$cwd/resources/data/inscriptions";

# Perl Executing Browser:
if ($ENV{'PEB_DATA_DIR'}) {
  $template_filepath = "$ENV{'PEB_DATA_DIR'}/telamon-template.xml";
  $inscriptions_directory = "$ENV{'PEB_DATA_DIR'}/inscriptions";
}

# Create inscriptions directory if it does not exist:
mkdir ($inscriptions_directory) unless (-d $inscriptions_directory);

# Convert template filepath to native separators:
$template_filepath = to_native_separators($template_filepath);
my $xml;

# Read the XML template:
{
  open my $template_filehandle, "<", $template_filepath or
    die "Can not open template!";
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
$xml =~ s/TITLE/$FORM{"title"}/;

# Filename is produced from title:
my $inscription_filename = $FORM{"title"};
$inscription_filename =~ s/\s|,|;/_/g;
$xml =~ s/FILENAME/$inscription_filename/;
delete($FORM{"title"});

# Inscription description:
if ($FORM{"support"}) {
  my $support_indent = "\t" x 9;
  my $support_formatted_value = $FORM{"support"};
  $support_formatted_value =~ s/\<lb/\n$support_indent\<lb/g;
  $xml =~ s/SUPPORT/$support_formatted_value/;
  delete($FORM{"support"});
}

# Inscription text - mandatory element:
my $inscription_indent = "\t" x 5;
my $inscription_formatted_value = $FORM{"inscription_xml"};
$inscription_formatted_value =~ s/\<lb/\n$inscription_indent\<lb/g;
$xml =~ s/INSCRIPTION/$inscription_formatted_value/;
delete($FORM{"inscription_xml"});

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
