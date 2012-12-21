var fs = require('fs');
var assert = require('assert');
var streamer = require('../lib/streamer.js')

function testReturnLast(last, expectedLength, expectedOffset, fileNo) {
  streamer.lastLinesInFile(last, './res/test-' + fileNo + '-lines.txt', function(res) {
    //console.log(res);
    console.log('testReturnLast :: file=' + fileNo + ' numLines=' + last + ' expectedLines=' + expectedLength + ' :: actualLines=' + res.data.length + ' :: expectedOffset=' + expectedOffset + ' actualOffset =' + res.offset);
    assert.equal(res.data.length, expectedLength);
    assert.equal(res.offset, expectedOffset);
  });
}

function testReturnFromOffset(offset, expectedLines, expectedOffset, fileNo) {
  streamer.fromOffsetInFile(offset, './res/test-' + fileNo + '-lines.txt', function(res) {
    //console.log(res);
    console.log('testReturnFromOffset :: file=' + fileNo + ' startOffset=' + offset + ' expectedLines=' + expectedLines + ' actualLines=' + res.data.length + ' expectedOffset=' + expectedOffset + '  actualOffset =' + res.offset);
    assert.equal(res.data.length, expectedLines);
    assert.equal(res.offset, expectedOffset);
  });
}

function testReturnLastChunked(last, expectedLength, expectedOffset) {
  streamer.lastLinesInFile(last, './res/test.log', function(res) {
    //console.log(res);
    console.log('testReturnLastChunked :: numLines=' + last + ' expectedLines=' + expectedLength + ' :: actualLines=' + res.data.length, ' :: expectedOffset=' + expectedOffset + ' actualOffset =' + res.offset);
    assert.equal(res.data.length, expectedLength);
    assert.equal(res.offset, expectedOffset);
  });
}

function testReturnFromOffsetChunked(offset, expected) {
  streamer.fromOffsetInFile(offset, './res/test.log', function(res) {
    //console.log(res);
    console.log('testReturnFromOffsetChunked :: startOffset =' + offset + ' expectedLines=' + expected + ' :: actualLines=' + res.data.length, ' :: endOffset =' + res.offset);
    assert.equal(res.data.length, expected);
    assert.equal(res.offset, 9500);
  });
}

function testReturnLastHarness() {
  testReturnLast(null, 0, 0, 0);
  testReturnLast(0, 0, 0, 0);
  testReturnLast(0, 0, 1, 1);
  testReturnLast(0, 0, 2, 2);
  testReturnLast(0, 0, 3, 3);
  testReturnLast(0, 0, 4, 4);
  testReturnLast(0, 0, 7, 7);
  testReturnLast(0, 0, 9, 9);
  testReturnLast(0, 0, 10, 10);

  testReturnLast(1, 0, 0, 0);
  testReturnLast(1, 1, 1, 1);
  testReturnLast(1, 1, 2, 2);
  testReturnLast(1, 1, 3, 3);
  testReturnLast(1, 1, 4, 4);
  testReturnLast(1, 1, 7, 7);
  testReturnLast(1, 1, 9, 9);
  testReturnLast(1, 1, 10, 10);

  testReturnLast(9, 0, 0, 0);
  testReturnLast(9, 1, 1, 1);
  testReturnLast(9, 2, 2, 2);
  testReturnLast(9, 3, 3, 3);
  testReturnLast(9, 4, 4, 4);
  testReturnLast(9, 7, 7, 7);
  testReturnLast(9, 9, 9, 9);
  testReturnLast(9, 9, 10, 10);

  testReturnLast(10, 0, 0, 0);
  testReturnLast(10, 1, 1, 1);
  testReturnLast(10, 2, 2, 2);
  testReturnLast(10, 3, 3, 3);
  testReturnLast(10, 4, 4, 4);
  testReturnLast(10, 7, 7, 7);
  testReturnLast(10, 9, 9, 9);
  testReturnLast(10, 10, 10, 10);

  testReturnLast(11, 0, 0, 0);
  testReturnLast(11, 1, 1, 1);
  testReturnLast(11, 2, 2, 2);
  testReturnLast(11, 3, 3, 3);
  testReturnLast(11, 4, 4, 4);
  testReturnLast(11, 7, 7, 7);
  testReturnLast(11, 9, 9, 9);
  testReturnLast(11, 10, 10, 10);
}

function testReturnFromOffsetHarness() {
  testReturnFromOffset(null, 0, 0, 0);
  testReturnFromOffset(0, 0, 0, 0);
  testReturnFromOffset(0, 1, 1, 1);
  testReturnFromOffset(0, 2, 2, 2);
  testReturnFromOffset(0, 3, 3, 3);
  testReturnFromOffset(0, 4, 4, 4);
  testReturnFromOffset(0, 7, 7, 7);
  testReturnFromOffset(0, 9, 9, 9);
  testReturnFromOffset(0, 10, 10, 10);

  testReturnFromOffset(1, 0, 0, 0);
  testReturnFromOffset(1, 0, 1, 1);
  testReturnFromOffset(1, 1, 2, 2);
  testReturnFromOffset(1, 2, 3, 3);
  testReturnFromOffset(1, 3, 4, 4);
  testReturnFromOffset(1, 6, 7, 7);
  testReturnFromOffset(1, 8, 9, 9);
  testReturnFromOffset(1, 9, 10, 10);

  testReturnFromOffset(9, 0, 0, 0);
  testReturnFromOffset(9, 0, 1, 1);
  testReturnFromOffset(9, 0, 2, 2);
  testReturnFromOffset(9, 0, 3, 3);
  testReturnFromOffset(9, 0, 4, 4);
  testReturnFromOffset(9, 0, 7, 7);
  testReturnFromOffset(9, 0, 9, 9);
  testReturnFromOffset(9, 1, 10, 10);

  testReturnFromOffset(10, 0, 0, 0);
  testReturnFromOffset(10, 0, 1, 1);
  testReturnFromOffset(10, 0, 2, 2);
  testReturnFromOffset(10, 0, 3, 3);
  testReturnFromOffset(10, 0, 4, 4);
  testReturnFromOffset(10, 0, 7, 7);
  testReturnFromOffset(10, 0, 9, 9);
  testReturnFromOffset(10, 0, 10, 10);

  testReturnFromOffset(11, 0, 0, 0);
  testReturnFromOffset(11, 0, 1, 1);
  testReturnFromOffset(11, 0, 2, 2);
  testReturnFromOffset(11, 0, 3, 3);
  testReturnFromOffset(11, 0, 4, 4);
  testReturnFromOffset(11, 0, 7, 7);
  testReturnFromOffset(11, 0, 9, 9);
  testReturnFromOffset(11, 0, 10, 10);


  testReturnFromOffset(1, 0, 1, 1);
  testReturnFromOffset(2, 0, 2, 2);
  testReturnFromOffset(3, 0, 3, 3);
  testReturnFromOffset(4, 0, 4, 4);
}


function testReturnLastChunkedHarness() {
  testReturnLastChunked(null, 0, 9500);
  testReturnLastChunked(0, 0, 9500);
  testReturnLastChunked(1, 1, 9500);
  testReturnLastChunked(2, 2, 9500);
  testReturnLastChunked(5, 5, 9500);
  testReturnLastChunked(10, 10, 9500);
  testReturnLastChunked(100, 100, 9500);
  testReturnLastChunked(1000, 1000, 9500);
  testReturnLastChunked(5000, 5000, 9500);
  testReturnLastChunked(9499, 9499, 9500);
  testReturnLastChunked(9500, 9500, 9500);
  testReturnLastChunked(9501, 9500, 9500);
  testReturnLastChunked(10000, 9500, 9500);
}

function testReturnFromOffsetChunkedHarness() {
  testReturnFromOffsetChunked(null, 9500);
  testReturnFromOffsetChunked(0, 9500);
  testReturnFromOffsetChunked(1, 9499);
  testReturnFromOffsetChunked(2, 9498);
  testReturnFromOffsetChunked(10, 9490);
  testReturnFromOffsetChunked(100, 9400);
  testReturnFromOffsetChunked(1000, 8500);
  testReturnFromOffsetChunked(9400, 100);
  testReturnFromOffsetChunked(9490, 10);
  testReturnFromOffsetChunked(9499, 1);
  testReturnFromOffsetChunked(9500, 0);
  testReturnFromOffsetChunked(9501, 0);
  testReturnFromOffsetChunked(9510, 0);
  testReturnFromOffsetChunked(10000, 0);
}

function testLastAndOffsetProgressive() {
  testReturnLast(1000, 1, 1, 1);
  testReturnFromOffset(1, 1, 2, 2);
  testReturnFromOffset(2, 1, 3, 3);
  testReturnFromOffset(3, 1, 4, 4);
  testReturnFromOffset(4, 3, 7, 7);
  testReturnFromOffset(7, 2, 9, 9);
  testReturnFromOffset(9, 1, 10, 10);
  testReturnFromOffset(10, 0, 10, 10);
}

testReturnLastHarness();
testReturnFromOffsetHarness();
testReturnLastChunkedHarness();
testReturnFromOffsetChunkedHarness();
testLastAndOffsetProgressive();