function filename() {
  const err = new Error().stack;
  return /\/(\w+\.js):/.exec(err)[1];
}
console.log(`Welcome to ${filename()}`);

// songs
const imagine = ["c", "cmaj7", "f", "am", "dm", "g", "e7"];
const somewhereOverTheRainbow = ["c", "em", "f", "g", "am"];
const tooManyCooks = ["c", "g", "f"];
const iWillFollowYouIntoTheDark = ["f", "dm", "bb", "c", "a", "bbm"];
const babyOneMoreTime = ["cm", "g", "bb", "eb", "fm", "ab"];
const creep = ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"];
const paperBag = [
  "bm7",
  "e",
  "c",
  "g",
  "b7",
  "f",
  "em",
  "a",
  "cmaj7",
  "em7",
  "a7",
  "f7",
  "b"
];
const toxic = [
  "cm",
  "eb",
  "g",
  "cdim",
  "eb7",
  "d7",
  "db7",
  "ab",
  "gmaj7",
  "g7"
];
const bulletproof = ["d#m", "g#", "b", "f#", "g#m", "c#"];

var songs = [];
var allChords = new Set();
var labelCounts = {};
var labelProbabilities = {};
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

const easy = "easy";
const medium = "medium";
const hard = "hard";

function train(chords, label) {
  songs.push({ label, chords });
  chords.forEach(chord => allChords.add(chord));
  if (Object.keys(labelCounts).includes(label)) {
    labelCounts[label] = labelCounts[label] + 1;
  } else {
    labelCounts[label] = 1;
  }
}

function setLabelProbabilities() {
  Object.keys(labelCounts).forEach(function(label) {
    labelProbabilities[label] = labelCounts[label] / songs.length;
  });
}

function setChordCountsInLabels() {
  songs.forEach(function(song) {
    if (chordCountsInLabels[song.label] === undefined) {
      chordCountsInLabels[song.label] = {};
    }
    song.chords.forEach(function(chord) {
      if (chordCountsInLabels[song.label][chord] > 0) {
        chordCountsInLabels[song.label][chord] += 1;
      } else {
        chordCountsInLabels[song.label][chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels() {
  probabilityOfChordsInLabels = chordCountsInLabels;
  Object.keys(probabilityOfChordsInLabels).forEach(function(difficulty) {
    Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(function(
      chord
    ) {
      probabilityOfChordsInLabels[difficulty][chord] /= songs.length;
    });
  });
}

train(imagine, easy);
train(somewhereOverTheRainbow, easy);
train(tooManyCooks, easy);
train(iWillFollowYouIntoTheDark, medium);
train(babyOneMoreTime, medium);
train(creep, medium);
train(paperBag, hard);
train(toxic, hard);
train(bulletproof, hard);

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

function classify(chords) {
  console.log(labelProbabilities);
  var classified = {};
  Object.keys(labelProbabilities).forEach(function(difficulty) {
    const smothing = 1.01;
    var first = labelProbabilities[difficulty] + smothing;
    chords.forEach(function(chord) {
      var probabilityOfChordInLabel =
        probabilityOfChordsInLabels[difficulty][chord];
      if (probabilityOfChordInLabel) {
        first = first * (probabilityOfChordInLabel + smothing);
      }
    });
    classified[difficulty] = first;
  });
  console.log(classified);
}

classify(["d", "g", "e", "dm"]);
classify(["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"]);
