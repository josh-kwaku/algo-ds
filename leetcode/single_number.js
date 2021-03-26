/*
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

Follow up: Could you implement a solution with a linear runtime complexity and without using extra memory?
*/

/**
 * @param {number[]} nums
 * @return {number}
 * The running total of XORing every element in the array will give us the number that occurs just once
 */
 var singleNumber = function(nums) {
    let result = nums[0]
    for (let i = 1; i < nums.length; i++) {
          result = result ^ nums[i]  
    }
    return result
}