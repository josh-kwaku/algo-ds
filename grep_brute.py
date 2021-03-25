def grep_brute(pattern, text):
    for i in range(len(text) - len(pattern) + 1):
        window = text[i:len(pattern) + i]
        if window == pattern:
            return { "start": i, "end": len(pattern) + i}

# print(grep("abc", "defabcjk"))
# main("klm", "bcdafdgklm", 256, 257)