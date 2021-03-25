import time
def grep(pattern, text, base, prime):
    windowSize = len(pattern)
    textSize = len(text) 
    pHash = initialHash(pattern, base, windowSize, prime)
    windowHash = initialHash(text[:windowSize], base, windowSize, prime)

    RH = RollingHash(base, windowSize, windowHash, prime)
   
    for i in range(0,textSize - windowSize + 1):
        if windowHash == pHash:
            if (text[i: i + windowSize] == pattern):
                return { "start": i, "end": i + windowSize}
            else:
                print("spurious hit")
                continue

        if i < (textSize - windowSize):
            windowHash = RH.preHash(text[i], text[i + windowSize])


"""
compute initial hash - s[w - 1] * b^w-1 + s[w - 2] * b^w-2 + . . . + s[w-w] * b^w-w
"""
def initialHash(str, base, windowSize, prime):
    sum = 0
    for i in range(len(str)):
        sum += ord(str[windowSize - i - 1]) * (base ** i)
    return sum % prime


class RollingHash:
    def __init__(self, base, windowSize, hash, prime):
        self.hash = hash
        self.base = base
        self.prime = prime
        self.constant = (base ** windowSize) % prime
        self.correctionFactor = prime * base
    
    def preHash(self, oldCharacter, newCharacter):
        self.hash = (((self.hash * self.base) - (ord(oldCharacter) * self.constant) + self.correctionFactor) + ord(newCharacter)) % self.prime
        return self.hash

# print(grep("afd", "bcdafdgklm", 256, 257))