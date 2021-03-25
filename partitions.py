"""
Take a sequence of 2n real numbers as input. Design an O(n log n) algorithm that
partitions the numbers into n pairs, with the property that the partition minimizes
the maximum sum of a pair. For example, say we are given the numbers (1,3,5,9).
The possible partitions are ((1,3),(5,9)), ((1,5),(3,9)), and ((1,9),(3,5)). The pair
sums for these partitions are (4,14), (6,12), and (10,8). Thus the third partition has
10 as its maximum sum, which is the minimum over the three partitions.
"""
import math
def partitions(input_arr):
    pairs = []
    n = len(input_arr)
    input_arr = sorted(input_arr)
    for i in range(math.floor(n / 2)):
        pairs.append((input_arr[i], input_arr[n - i - 1]))
    return pairs


print(partitions([1,10,2,9]))