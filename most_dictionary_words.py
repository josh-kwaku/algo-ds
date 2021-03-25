"""
Which set of k letters can be used to make the most dictionary words? This
seems like a much harder problem, because there are α^k possible letter sets,
where α is the size of the alphabet. But observe that the answer is simply the
hash code with the largest number of collisions. Sweeping over a sorted array
of hash codes (or walking through each bucket in a chained hash table) makes
this fast and easy.
"""

def load_words():
    with open('words_alpha.txt') as word_file:
        valid_words = set(word_file.read().split())

    return valid_words



def mostWords(words, hashTable):
    noOfCollisions = 0
    maxKeyCollisions = ""
    for key, value in hashTable.items():
        if len(value) > noOfCollisions:
            noOfCollisions = len(value)
            maxKeyCollisions = key
    return maxKeyCollisions

def buildHash(words):
    hashTable = {}
    for word in words:
        sorted_word = sortString(word)
        if sorted_word in hashTable:
            hashTable[sorted_word].append(word)
        else:
            hashTable[sorted_word] = [word]
    return hashTable


def sortString(string):
    sorted_chars = sorted(string)
    return "".join(sorted_chars)

if __name__ == '__main__':
    english_words = load_words()
    # demo print
    english_words = list(english_words)
    hashTable = buildHash(english_words)
    k = mostWords(english_words, hashTable)
    print(k, hashTable[k])
