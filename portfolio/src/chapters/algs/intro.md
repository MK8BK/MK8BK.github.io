# Algorithms & Data Structures


**The Boyer Moore algorithm for the majority element**

**Problem**:

Given an array nums of size n, return the majority element.
The majority element is the element that appears more than \\(⌊n / 2⌋\\) times.

Assuming a majority element exists,
the Boyer–Moore majority vote algorithm solves this problem in \\(O(n)\\) time
and \\(O(1)\\) space.

See more on 
[`wikipedia`](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm)
.
```
Initialize an element m and a counter c with c = 0
For each element x of the input sequence:
    If c = 0, then assign m = x and c = 1
    else if m = x, then assign c = c + 1
    else assign c = c − 1
Return m
```

```c
// C implementation
int majorityElement(int* nums, int numsSize) {
  int candidate;
  int counter=0;
  for(int i=0; i<numsSize; i++){
    if(counter==0) {
      candidate=nums[i];
      counter++;
    }else if(candidate==nums[i]){
      counter++;
    }else{
      counter--;
    }
  }
  return candidate;
}
```
