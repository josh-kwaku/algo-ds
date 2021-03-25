from grep import grep
from grep_brute import *
import time

def load_text():
    with open('dummy.txt') as word_file:
        text = word_file.read()
    return text

def main(pattern, base, prime):
    text = load_text()
    # text = "bcdafdgklm"
    start_time = time.time()
    # print(grep(256, pattern, text, 2097211))
    print(grep(pattern, text, base, prime))
    # print(grep_brute(pattern, text))
    print("--- %s seconds ---" % (time.time() - start_time))

main("aaaaaaaaaaak", 256, 101)
# main("josh", 256, 257)