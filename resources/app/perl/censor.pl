#!/usr/bin/perl -w

use strict;
use warnings;
use 5.010;

BEGIN {
	##############################
	# BAN ALL PROHIBITED CORE FUNCTIONS:
	##############################
	#no ops qw(syscall dump chroot fork);
	no ops qw(:dangerous fork);

	##############################
	# ENVIRONMENT:
	##############################
	my %CLEAN_ENV;

	if ($ENV{'REQUEST_METHOD'}) {
		$CLEAN_ENV{'REQUEST_METHOD'} = $ENV{'REQUEST_METHOD'};
	}

	if ($ENV{'QUERY_STRING'}) {
		$CLEAN_ENV{'QUERY_STRING'} = $ENV{'QUERY_STRING'};
	}

	if ($ENV{'CONTENT_LENGTH'}) {
		$CLEAN_ENV{'CONTENT_LENGTH'} = $ENV{'CONTENT_LENGTH'};
	}

	%ENV = %CLEAN_ENV;
}

##############################
# REDIRECT STDERR TO A VARIABLE:
##############################
open (my $saved_stderr_filehandle, '>&', \*STDERR)  or die "Can not duplicate STDERR: $!";
close STDERR;
my $stderr;
open (STDERR, '>', \$stderr) or die "Unable to open STDERR: $!";

##############################
# READ USER SCRIPT FROM
# THE FIRST COMMAND LINE ARGUMENT:
##############################
my $filepath = shift @ARGV;
open my $filehandle, '<', $filepath or die "Unable to open file: $!";;
$/ = undef;
my $user_code = <$filehandle>;
close $filehandle;

##############################
# EXECUTE USER CODE IN 'EVAL' STATEMENT:
##############################
eval ($user_code);

##############################
# PRINT SAVED STDERR, IF ANY:
##############################
close (STDERR) or die "Can not close STDERR: $!";
open (STDERR, '>&', $saved_stderr_filehandle) or die "Can not restore STDERR: $!";

if ($@) {
	if ($@ =~ m/trapped/) {
		print STDERR "$filepath\n";
		print STDERR "Insecure code was blocked:\n";
	} else {
		print STDERR "$filepath\n";
		print STDERR "Errors were found during script execution:\n";
	}
	print STDERR "$@";
	exit;
}

if (defined($stderr)) {
	print STDERR "$filepath\n";
	print STDERR "Errors were found during script execution:\n";
	print STDERR "$stderr";
}
