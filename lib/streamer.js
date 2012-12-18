var fs = require('fs');

var lastLinesInFile = function(params, filePath, cb) {
  var stream = fs.createReadStream(filePath);
  stream.on('open', function () {
    lastLinesInStream(params, stream, cb);
  });
};

var fromOffsetInFile = function(params, filePath, cb) {
  var stream = fs.createReadStream(filePath);
  stream.on('open', function () {
    fromOffsetInStream(params, stream, cb);
  });
};

var lastLinesInStream = function(params, stream, cb) {
  // Return lines by default
  var lastNum = params ? params.last || 0 : 0;
  var resData = [];

  var chunkCount = 0;
  var recCount = 0;
  var buffer = '';

  stream.addListener('data', function (data) {
    chunkCount++;

    // Add the data to the buffer
    buffer += data.toString();

    // Split the buffer on new line
    var parts = buffer.split('\n');

    var fullRecCountForChunk = parts.length -1;

    // Remove all data from the buffer except the last (partial) line
    buffer = parts[fullRecCountForChunk];

    // Pop the last (possibly partial) record off
    parts.pop();

    recCount += parts.length;

    // Add all the elements for the latest chunk
    resData.push.apply(resData, parts);

    //console.log('chunk ' + chunkCount + ' :: current Records = ' + parts.length + ' :: arrayLength = ' + resData.length + ' :: records processed ' + recCount);

    // splice the array to oly have the last X records
    if(lastNum >= 0) {
      resData.splice(0, ( resData.length - lastNum) );
    }
  });

  stream.addListener('end', function () {
    if( lastNum > 0 && lastNum <= recCount ) {
      // There is more data in the stream than we want. Pop off the first record to make room for the last record
      // which is still in the buffer
      resData.splice(0,1);
    }
    if( lastNum > 0 ) {
      // Add the final line of data from the buffer
      resData.push(buffer);
    }

    var res = {
      'offset': recCount+1,
      'data': resData
    };
    cb(res);
  });
}

var fromOffsetInStream = function(params, stream, cb) {
  var offset = params ? params.offset || 0 : 0;
  var resData = [];

  var chunkCount = 0;
  var recCount = 0;
  var buffer = '';

  stream.addListener('data', function (data) {
    chunkCount++;

    // Add the data to the buffer
    buffer += data.toString();

    // Split the buffer on new line
    var parts = buffer.split('\n');

    var fullRecCountForChunk = parts.length -1;

    // Remove all data from the buffer except the last (partial) line
    buffer = parts[fullRecCountForChunk];

    // Pop the last (possibly partial) record off
    parts.pop();

    recCount += (fullRecCountForChunk);

    if( recCount > offset ) {
      resData.push.apply(resData, parts);
      if( (recCount - fullRecCountForChunk) < offset ) {
        var startRec = recCount - fullRecCountForChunk;
        resData.splice(0, ( offset - startRec) );
      }
    }

    // Add all the elements for the latest chunk

    //console.log('chunk ' + chunkCount + ' :: current Records = ' + parts.length + ' :: arrayLength = ' + resData.length + ' :: records processed ' + recCount);

  });

  stream.addListener('end', function () {
    if( offset <= recCount ) {
      resData.push(buffer);
    }

    var res = {
      'offset': recCount+1,
      'data': resData
    };

    cb(res);
  });
}

module.exports = {
  lastLinesInFile: lastLinesInFile,
  fromOffsetInFile: fromOffsetInFile,
  returnLast: lastLinesInStream,
  returnFromOffset: fromOffsetInStream
};