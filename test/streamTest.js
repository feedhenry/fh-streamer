var fs = require('fs');
var assert = require('assert');
var streamer = require('../lib/streamer.js')

function testReturnLast(params, expected) {
  streamer.lastLinesInFile(params, './res/test.log', function(res) {
    //console.log(res);
    console.log('testReturnLast :: expected=' + expected + ' :: actual=' + res.length);
    assert.equal(res.data.length, expected);
  });

}

function testReturnFromOffset(params, expected) {
  streamer.fromOffsetInFile(params, './res/test.log', function(res) {
    //console.log(res);
    console.log('testReturnFromOffset :: expected=' + expected + ' :: actual=' + res.data.length);
    assert.equal(res.data.length, expected);
    assert.equal(res.offset, 9500);
  });
}

testReturnLast(null, 0);
testReturnLast({}, 0);
testReturnLast({'last':0}, 0);
testReturnLast({'last':1}, 1);
testReturnLast({'last':2}, 2);
testReturnLast({'last':5}, 5);
testReturnLast({'last':10}, 10);
testReturnLast({'last':100}, 100);
testReturnLast({'last':1000}, 1000);
testReturnLast({'last':5000}, 5000);
testReturnLast({'last':9499}, 9499);
testReturnLast({'last':9500}, 9500);
testReturnLast({'last':9501}, 9500);
testReturnLast({'last':10000}, 9500);


testReturnFromOffset(null, 9500);
testReturnFromOffset({}, 9500);
testReturnFromOffset({'offset':0}, 9500);
testReturnFromOffset({'offset':1}, 9499);
testReturnFromOffset({'offset':2}, 9498);
testReturnFromOffset({'offset':10}, 9490);
testReturnFromOffset({'offset':100}, 9400);
testReturnFromOffset({'offset':1000}, 8500);
testReturnFromOffset({'offset':9400}, 100);
testReturnFromOffset({'offset':9490}, 10);
testReturnFromOffset({'offset':9499}, 1);
testReturnFromOffset({'offset':9500}, 0);
testReturnFromOffset({'offset':9501}, 0);
testReturnFromOffset({'offset':9510}, 0);
testReturnFromOffset({'offset':10000}, 0);