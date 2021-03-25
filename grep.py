import time
def grep(pattern, text, base, prime):
    windowSize = len(pattern)
    textSize = len(text) 
    pHash = initialHash(pattern, base, windowSize, prime)
    windowHash = initialHash(text[:windowSize], base, windowSize, prime)
    # if (pHash == tHash):
    #     return "found"

    # start_time = time.time()
    RH = RollingHash(base, windowSize, windowHash, prime)
    # print("--- [MID] %s seconds ---" % (time.time() - start_time))
    # return
    for i in range(0,textSize - windowSize + 1):
        # start_time = time.time()
        # windowHash = RH.preHash(text[i - 1], text[windowSize + i - 1])
        # print("--- [MID] %s seconds ---" % (time.time() - start_time), windowHash)
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
    # print("initial: ", str)
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
        # print(self.constant, self.correctionFactor)
        # start_time = time.time()
        self.hash = (((self.hash * self.base) - (ord(oldCharacter) * self.constant) + self.correctionFactor) + ord(newCharacter)) % self.prime
        # print("--- [MID] %s seconds ---" % (time.time() - start_time))
        return self.hash

# print(grep("afd", "bcdafdgklm", 256, 257))


# def grep(d, pat, txt, q):
#     M = len(pat) 
#     N = len(txt) 
#     i = 0
#     j = 0
#     p = 0    # hash value for pattern 
#     t = 0    # hash value for txt 
#     h = 1
  
#     # The value of h would be "pow(d, M-1)%q" 
#     for i in range(M-1): 
#         h = (h*d)%q 
  
#     # Calculate the hash value of pattern and first window 
#     # of text 
#     for i in range(M): 
#         p = (d*p + ord(pat[i]))%q 
#         t = (d*t + ord(txt[i]))%q 
  
#     # Slide the pattern over text one by one 
#     for i in range(N-M+1): 
#         # Check the hash values of current window of text and 
#         # pattern if the hash values match then only check 
#         # for characters on by one 
#         if p==t: 
#             # Check for characters one by one 
#             for j in range(M): 
#                 if txt[i+j] != pat[j]: 
#                     break
#                 else: j+=1
  
#             # if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1] 
#             if j==M: 
#                 print("Pattern found at index " + str(i) )
  
#         # Calculate hash value for next window of text: Remove 
#         # leading digit, add trailing digit 
#         if i < N-M: 
#             t = (d*(t-ord(txt[i])*h) + ord(txt[i+M]))%q 
  
#             # We might get negative values of t, converting it to 
#             # positive 
#             if t < 0: 
#                 t = t+q 