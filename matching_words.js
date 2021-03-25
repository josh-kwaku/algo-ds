/**
 * Consider a word game that gives you a set of letters S, and asks you to find all dictionary words that can be made by reordering them. For example, I can make three words from the four letters in S = (a, e, k, l), namely kale, lake, and leak.
 * Think how you might write a program to find the matching words for S, given a dictionary D of n words.
 */

// for this solution, we will assume letters is a sorted array of letters
function buildHash(words) {
    let hashTable = {}
    for (const word of words) {
        let sortedWord = word.split("").sort().join("")
        if (hashTable[sortedWord] ) hashTable[sortedWord].push(word)
        else hashTable[sortedWord] = [word]
    }
    return hashTable;
}

// function preHash(word, alphabetDict, hashTableLength) {
//     let sum = word.reduce((acc, value) => acc + alphabetDict.get(value), 0)
//     return sum % hashTableLength
// }

// function buildAlphabetDict() {
//     let dict = new Map();
//     [...Array(26)].forEach((val, i) =>  dict.set(String.fromCharCode(i + 97), i + 97)) ;
//     return dict;
// }

function matchingWords(letters, words) {
    // Preprocessing
    // let alphabetDict = buildAlphabetDict();
    const hashTable = buildHash(words);
    // actual program
    return hashTable[letters]
}

console.log(matchingWords("abst", ["lake", "acre", "kale", "leak", "acre", "race", "barg", "bats", "garb", "stab", "tabs", "grab", "snap"]))