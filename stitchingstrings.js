//For testing purposes
var scramblerDict = ["Hello", "World"];

var numScrambles = Math.round(Math.random()*5)+2;

var words = [];

var rand = Math.round(Math.random()*scramblerDict.length);
for(var i = 0; i < rand; i++) {
  var randInd = Math.round(Math.random()*scramblerDict.length);
  words.push(scramblerDict.splice(randInd,1));
}

var scramblered = words.join(' ');
var scrambleredDict = words.join();

for(var i = 0; i < numScrambles; i++) {
  var randInd = Math.round(Math.random()*scramblered.length);
  scramblered = scramblered.slice(randInd)+scramblered.slice(0,randInd);
}


//Input
// var input = [
//   "world,hello",
//   "rldhello wo",
//   1
// ];
var input = [
  scrambleredDict,
  scramblered,
  numScrambles
];

console.log('Input: ',input);

//Program
var dictionary = input[0].split(',');

var scrambled = input[1];

var numSplits = input[2];
var splits = [];

for(var split = 0; split < numSplits; split++) {
  var maxWords = 0, maxIndex = -1;
  for(var pos = 0; pos < scrambled.length; pos++) {
    var halves = [
      scrambled.slice(0,pos),
      scrambled.slice(pos)
    ];
    var reassembled = halves[1]+halves[0];

    var numWords = 0;
    dictionary.reduce(function(str, word) {
      var regex = new RegExp("\\b"+word+"\\b");

      var match = regex.exec(str);

      if(match)
      {
        numWords++;
        str = str.replace(regex,'');
        // console.log(str);
      }
      return str;
    },reassembled); //jshint ignore:line

    if(numWords > maxWords) {
      maxWords = numWords;
      maxIndex = pos;
    }
  }

  scrambled = scrambled.slice(maxIndex)+scrambled.slice(0,maxIndex);

  splits.push(maxIndex);
}

console.log("\n\n-------------Answer--------------\n"+scrambled);
