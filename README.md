*NO LONGER MAINTAINED*

fh-streamer
===========

Utility module for returning lines of text from streams and files as an array of lines.

The newline character \n is used to identify line breaks.

The use case for this module is for "live" rendering of log files. The typical approach would be as follows:

        Get last X number of lines in the log file (lastLinesInFile) - this returns the lines as an array and the total number of line (i.e. offset for future reads) in the (stream) that has been processed

        while true
          get any changes in log file (fromOffsetInFile)
        done

The first call will use lastLinesInFile or lastLinesInStream which returns an array of lines and an offset value indicating what position in the file/stream was read up to (i.e. how many lines in total were in the file/stream). This value can be sent in subsequent requests to fromOffsetInFile/fromOffsetInStream.

fromOffsetInFile/fromOffsetInStream also returns the offset of the last position in the file which has been read to

Usage
-----

Getting the last 100 lines from a file:

        var streamer = require('fh-streamer');
        streamer.lastLinesInFile(100, './res/test.log', function(res) {
          // Returns an array containing the last 100 lines (or as many as exist if less than 100)
          // and the offset that reading finished at - i.e. total number of lines in the file,
          // res = {
          //    'offset': 1200,
          //    'data': [
          //            ...
          //            ]
          //  }
          console.log(res);
        });


Getting the last 200 lines from an existing stream:

        var streamer = require('fh-streamer');
        var myStream = someFunctionThatReturnsAStream;
        streamer.lastLinesInStream(200, myStream, function(res) {
          // Returns an array containing the last 200 lines (or as many as exist if less than 200)
          // and the offset that reading finished at - i.e. total number of lines in the stream,
          // res = {
          //    'offset': 1200,
          //    'data': [
          //            ...
          //            ]
          //  }
          console.log(res);
        });



Getting the contents of a file from line #1200:

        var streamer = require('fh-streamer');
        streamer.fromOffsetInFile(offset':1200, './res/test.log', function(res) {
          // Returns an array containing all lines beyond #1200 onwards, or none if there are no lines
          // and the offset that reading finished at - i.e. total number of lines in the file
          // res = {
          //    'offset': 1350,
          //    'data': [
          //            ...
          //            ]

          //  }
          console.log(res);
        });


Getting the contents of a stream from line #1350:

        var streamer = require('fh-streamer');
        var myStream = someFunctionThatReturnsAStream;
        streamer.fromOffsetInStream(1350, myStream, function(res) {
          // Returns an array containing all lines from 1350  onwards, or none if there are no lines
          // and the offset that reading finished at - i.e. total number of lines in the stream
          // res = {
          //    'offset': 1800,
          //    'data': [
          //            ...
          //            ]
          //  }
          console.log(res);
        });
