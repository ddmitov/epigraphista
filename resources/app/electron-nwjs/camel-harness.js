
// CamelHarness.js
// Electron and NW.js adapter for Perl scripts
// CamelHarness.js is licensed under the terms of GNU GPL version 3.
// Dimitar D. Mitov, 2016.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


// Global variables for CamelHarness.js:
var pathObject;
var perlInterpreterFileName;
var perlInterpreterFullPath;
var platform;


// Determine the operating system,
// set operating-system-specific variables and
// find Perl interpreter:
if (navigator.userAgent.match(/Electron/) || typeof(nw) !== 'undefined') {
	// Determine the operating system:
	var osObject = require('os');
	platform = osObject.platform();

	if (platform != "win32") {
		perlInterpreterFileName = "perl";
		pathObject = require("path").posix;
	} else {
		perlInterpreterFileName = "perl.exe";
		pathObject = require("path").win32;
	}

	// Get the full path of directory where Electron or NW.js binary is located:
	var binaryPath = process.execPath;
	var binaryDir = pathObject.dirname(binaryPath);

	// Compose the full path to the portable Perl interpreter (if any):
	var portablePerlInterpreterFullPath = pathObject.join(binaryDir, "perl/bin", perlInterpreterFileName);

	// Determine where is the Perl interpreter:
	var fsObject = require('fs');
	fsObject.access(portablePerlInterpreterFullPath, function(error) {
		// If portable Perl interpreter is not found,
		// determine the full path of the first Perl interpreter on PATH:
		if (error && error.code === 'ENOENT') {
			var perlFullPathTester = "perl -e 'print $^X;'";
			var exec = require('child_process').exec;

			exec(perlFullPathTester, function (error, stdout, stderr) {
				if (error == null && stdout.length > 0) {
					perlInterpreterFullPath = stdout;
				}
			});
		} else {
			perlInterpreterFullPath = portablePerlInterpreterFullPath;
		}
	});
} else {
	console.log('CamelHarness.js is not usefull outside of  Electron or NW.js.');
}


function camelHarness(scriptFullPath, method, formData, errorFunction, stdoutFunction, stderrFunction, exitFunction) {
	if (navigator.userAgent.match(/Electron/) || typeof(nw) !== 'undefined') {
		// Get the full path of the application root directory:
		var applicationRootDirectory = require('./dirname').dirname;

		// Compose the command line that has to be executed:
		var scriptFullPath = pathObject.join(applicationRootDirectory, "perl/epigraphista-ajax.pl");
		var safetyArguments = " -M-ops=:dangerous -M-ops=fork ";
		var commandLine = perlInterpreterFullPath + safetyArguments + scriptFullPath;

		// Assign environment variables in a clean environment:
		var env = cleanEnvironment = {};

		// Handle POST requests:
		if (method == "POST") {
			cleanEnvironment['REQUEST_METHOD'] = 'POST';
			cleanEnvironment['CONTENT_LENGTH'] = formData.length;
		}

		// Handle GET requests:
		if (method == "GET") {
			cleanEnvironment['REQUEST_METHOD'] = 'GET';
			cleanEnvironment['QUERY_STRING'] = formData;
		}

		// Run the Perl script:
		var exec = require ('child_process').exec, child;
		child = exec(commandLine, {env: cleanEnvironment}, function (error, stdout, stderr) {
			if (error) {
				window[errorFunction](error);
			}

			if (stderr) {
				window[stderrFunction](stderr);
			}

			if (stdout) {
				window[stdoutFunction](stdout);
			}
		});

		// Send POST data to the Perl script:
		if (method == "POST") {
			child.stdin.write(formData);
		}

		child.on('exit', function (code) {
			window[exitFunction](code);
		});
	} else {
		console.log('CamelHarness.js is not usefull outside of  Electron or NW.js.');
	}
}
