var fs = require('fs');

var lastLinesInFile = function(from, filePath, cb) {
  var stream = fs.createReadStream(filePath);
  stream.on('open', function () {
    lastLinesInStream(from, stream, cb);
  });
};

var fromOffsetInFile = function(offset, filePath, cb) {
  var stream = fs.createReadStream(filePath);
  stream.on('open', function () {
    fromOffsetInStream(offset, stream, cb);
  });
};

var lastLinesInStream = function(last, stream, cb) {
  // Return lines by default
  var lastNum = last || 0;
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

    buffer = parts[parts.length -1];

    // Pop off the last record (which may be a partial one) as we have left it in the buffer
    parts.pop();

    recCount += parts.length;

    // Add all the elements for the latest chunk
    resData.push.apply(resData, parts);

    //console.log('chunk ' + chunkCount + ' :: current Records = ' + parts.length + ' :: arrayLength = ' + resData.length + ' :: records processed ' + recCount);

    // splice the array to only have the last X records
    if(lastNum >= 0) {
      resData.splice(0, ( resData.length - lastNum) );
    }
  });

  stream.addListener('end', function () {
    if( buffer.length > 0) {
      // add 1 to the record count for the data in the buffer
      recCount++;

      if( lastNum > 0) {
        if( lastNum < recCount) {
          // There is more data in the stream than we want.

          if( resData.length > 0) {
            // If there is any data in the array, pop off the first record to make room for the last record
            // which is still in the buffer
            resData.splice(0,1);
          }
        }

        // Add the final line of data from the buffer
        resData.push(buffer);
      }
    }

    var res = {
      'offset': recCount,
      'data': resData
    };
    cb(res);
  });
}

var fromOffsetInStream = function(offset, stream, cb) {
  var offsetNum = offset || 0;
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

    // Remove all data from the buffer except the last (partial) line
    buffer = parts[parts.length -1];

    // Pop off the last record (which may be a partial one) as we have left it in the buffer
    parts.pop();

    recCount += (parts.length);

    if( recCount > offsetNum ) {
      // The records in the current chunk are in range - add them to the resData
      resData.push.apply(resData, parts);

      if( (recCount - parts.length) <= offsetNum ) {
        // The current chunk is on the boundary of where we want to start adding records - splice of the records
        // we don;t need
        //console.log("recCount:", recCount, " :: fullRecCountForChunk:", fullRecCountForChunk, " :: offset:", offset);
        var startRec = recCount - parts.length;
        resData.splice(0, ( offsetNum - startRec) );
      }
    }

    //console.log('chunk ' + chunkCount + ' :: current Records = ' + parts.length + ' :: arrayLength = ' + resData.length + ' :: records processed ' + recCount);

  });

  stream.addListener('end', function () {
    if( buffer.length > 0) {
      // add 1 to the record count for the data in the buffer
      recCount++;
      if( offset < recCount) {
        // Add the final line of data from the buffer
        resData.push(buffer);
      }
    }

    var res = {
      'offset': recCount,
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