import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';
import Problem from '../models/Problem';

const MONGODB_URI = process.env.MONGODB_URI!;

const problems = [
    // ARRAYS
    {
        title: 'Two Sum',
        description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        difficulty: 'easy',
        category: 'arrays',
        isPremium: false,
        functionName: 'two_sum',
        examples: [
            { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
            { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: '' },
        ],
        constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
        testCases: [
            { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
            { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
            { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] },
            { input: { nums: [1, 2, 3, 4, 5], target: 9 }, expectedOutput: [3, 4], isHidden: true },
        ],
        starterCode: {
            python: `import json 
            import sys 
            def two_sum(nums: list[int], target: int) -> list[int]:
            # Write your solution here
            pass 
            # Do not modify below this line
            if __name__ == "__main__":
                data = json.loads(sys.stdin.read())
                result = two_sum(data["nums"], data["target"])
                print(json.dumps(result))`,
            javascript: `const readline = require('readline');
            const rl = readline.createInterface({ input: process.stdin });
            let input = '';
            rl.on('line', line => input += line);
            rl.on('close', () => {
                const data = JSON.parse(input);
                console.log(JSON.stringify(twoSum(data.nums, data.target)));
            });
            function twoSum(nums, target) {
                // Write your solution here
            }`,
            java: `import java.util.*;
            import com.fasterxml.jackson.databind.ObjectMapper;
            class Solution {
                public int[] twoSum(int[] nums, int target) {
                // Write your solution here
                return new int[]{};
                }
                public static void main(String[] args) throws Exception {
                    Scanner scanner = new Scanner(System.in);
                    String input = scanner.useDelimiter("\\A").next();
                    ObjectMapper mapper = new ObjectMapper();
                    Map<String, Object> data = mapper.readValue(input, Map.class);
                    // Parse and call solution
                }
            }`
        }
    },
    {
        title: 'Maximum Subarray',
        description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
        difficulty: 'medium',
        category: 'arrays',
        isPremium: false,
        functionName: 'max_subarray',
        examples: [
            { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
            { input: 'nums = [1]', output: '1', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        testCases: [
            { input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expectedOutput: 6 },
            { input: { nums: [1] }, expectedOutput: 1 },
            { input: { nums: [5, 4, -1, 7, 8] }, expectedOutput: 23 },
            { input: { nums: [-1, -2, -3] }, expectedOutput: -1, isHidden: true },
        ],
        starterCode: {
            python: `def max_subarray(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxSubArray(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Merge Intervals',
        description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
        difficulty: 'medium',
        category: 'arrays',
        isPremium: true,
        functionName: 'merge',
        examples: [
            { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
        ],
        constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti <= endi <= 10^4'],
        testCases: [
            { input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] }, expectedOutput: [[1, 6], [8, 10], [15, 18]] },
            { input: { intervals: [[1, 4], [4, 5]] }, expectedOutput: [[1, 5]] },
            { input: { intervals: [[1, 4], [0, 4]] }, expectedOutput: [[0, 4]], isHidden: true },
        ],
        starterCode: {
            python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function merge(intervals) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Trapping Rain Water',
        description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
        difficulty: 'hard',
        category: 'arrays',
        isPremium: true,
        functionName: 'trap',
        examples: [
            { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.' },
        ],
        constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
        testCases: [
            { input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, expectedOutput: 6 },
            { input: { height: [4, 2, 0, 3, 2, 5] }, expectedOutput: 9 },
            { input: { height: [3, 0, 2, 0, 4] }, expectedOutput: 7, isHidden: true },
        ],
        starterCode: {
            python: `def trap(height: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function trap(height) {
    // Write your solution here
}`,
            java: `class Solution {
    public int trap(int[] height) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // STRINGS
    {
        title: 'Valid Palindrome',
        description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'strings',
        isPremium: false,
        functionName: 'is_palindrome',
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
            { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
        ],
        constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
        testCases: [
            { input: { s: 'A man, a plan, a canal: Panama' }, expectedOutput: true },
            { input: { s: 'race a car' }, expectedOutput: false },
            { input: { s: ' ' }, expectedOutput: true },
            { input: { s: 'Was it a car or a cat I saw?' }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_palindrome(s: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isPalindrome(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isPalindrome(String s) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Longest Substring Without Repeating Characters',
        description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
        difficulty: 'medium',
        category: 'strings',
        isPremium: false,
        functionName: 'length_of_longest_substring',
        examples: [
            { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
            { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
        ],
        constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
        testCases: [
            { input: { s: 'abcabcbb' }, expectedOutput: 3 },
            { input: { s: 'bbbbb' }, expectedOutput: 1 },
            { input: { s: 'pwwkew' }, expectedOutput: 3 },
            { input: { s: '' }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def length_of_longest_substring(s: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function lengthOfLongestSubstring(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Minimum Window Substring',
        description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
        difficulty: 'hard',
        category: 'strings',
        isPremium: true,
        functionName: 'min_window',
        examples: [
            { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes A, B, and C from string t.' },
        ],
        constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
        testCases: [
            { input: { s: 'ADOBECODEBANC', t: 'ABC' }, expectedOutput: 'BANC' },
            { input: { s: 'a', t: 'a' }, expectedOutput: 'a' },
            { input: { s: 'a', t: 'aa' }, expectedOutput: '' },
            { input: { s: 'cabwefgewcwaefgcf', t: 'cae' }, expectedOutput: 'cwae', isHidden: true },
        ],
        starterCode: {
            python: `def min_window(s: str, t: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function minWindow(s, t) {
    // Write your solution here
}`,
            java: `class Solution {
    public String minWindow(String s, String t) {
        // Write your solution here
        return "";
    }
}`
        }
    },

    // TREES
    {
        title: 'Maximum Depth of Binary Tree',
        description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
        difficulty: 'easy',
        category: 'trees',
        isPremium: false,
        functionName: 'max_depth',
        examples: [
            { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: '' },
            { input: 'root = [1,null,2]', output: '2', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
        testCases: [
            { input: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: 3 },
            { input: { root: [1, null, 2] }, expectedOutput: 2 },
            { input: { root: [] }, expectedOutput: 0 },
            { input: { root: [1, 2, 3, 4, 5] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: TreeNode) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxDepth(root) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxDepth(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Validate Binary Search Tree',
        description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
        difficulty: 'medium',
        category: 'trees',
        isPremium: true,
        functionName: 'is_valid_bst',
        examples: [
            { input: 'root = [2,1,3]', output: 'true', explanation: '' },
            { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node\'s value is 5 but its right child\'s value is 4.' },
        ],
        constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
        testCases: [
            { input: { root: [2, 1, 3] }, expectedOutput: true },
            { input: { root: [5, 1, 4, null, null, 3, 6] }, expectedOutput: false },
            { input: { root: [1] }, expectedOutput: true },
            { input: { root: [5, 4, 6, null, null, 3, 7] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isValidBST(root) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Binary Tree Maximum Path Sum',
        description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the maximum path sum of any non-empty path.`,
        difficulty: 'hard',
        category: 'trees',
        isPremium: true,
        functionName: 'max_path_sum',
        examples: [
            { input: 'root = [1,2,3]', output: '6', explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.' },
            { input: 'root = [-10,9,20,null,null,15,7]', output: '42', explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.' },
        ],
        constraints: ['The number of nodes in the tree is in the range [1, 3 * 10^4].', '-1000 <= Node.val <= 1000'],
        testCases: [
            { input: { root: [1, 2, 3] }, expectedOutput: 6 },
            { input: { root: [-10, 9, 20, null, null, 15, 7] }, expectedOutput: 42 },
            { input: { root: [-3] }, expectedOutput: -3 },
            { input: { root: [2, -1] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root: TreeNode) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxPathSum(root) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxPathSum(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // GRAPHS
    {
        title: 'Number of Islands',
        description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
        difficulty: 'medium',
        category: 'graphs',
        isPremium: false,
        functionName: 'num_islands',
        examples: [
            { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: '' },
            { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', explanation: '' },
        ],
        constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1".'],
        testCases: [
            { input: { grid: [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']] }, expectedOutput: 1 },
            { input: { grid: [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']] }, expectedOutput: 3 },
            { input: { grid: [['1']] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def num_islands(grid: list[list[str]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function numIslands(grid) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Clone Graph',
        description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.`,
        difficulty: 'medium',
        category: 'graphs',
        isPremium: true,
        functionName: 'clone_graph',
        examples: [
            { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'There are 4 nodes in the graph. Node 1\'s neighbors are 2 and 4. Node 2\'s neighbors are 1 and 3. Node 3\'s neighbors are 2 and 4. Node 4\'s neighbors are 1 and 3.' },
        ],
        constraints: ['The number of nodes in the graph is in the range [0, 100].', '1 <= Node.val <= 100', 'Node.val is unique for each node.'],
        testCases: [
            { input: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] }, expectedOutput: [[2, 4], [1, 3], [2, 4], [1, 3]] },
            { input: { adjList: [[]] }, expectedOutput: [[]] },
            { input: { adjList: [] }, expectedOutput: [] },
        ],
        starterCode: {
            python: `class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node: Node) -> Node:
    # Write your solution here
    pass`,
            javascript: `function cloneGraph(node) {
    // Write your solution here
}`,
            java: `class Solution {
    public Node cloneGraph(Node node) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Word Ladder',
        description: `A transformation sequence from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence \`beginWord -> s1 -> s2 -> ... -> sk\` such that every adjacent pair of words differs by a single letter, and every \`si\` for \`1 <= i <= k\` is in \`wordList\`. Note that \`beginWord\` does not need to be in \`wordList\`.

Given \`beginWord\`, \`endWord\`, and \`wordList\`, return the number of words in the shortest transformation sequence from \`beginWord\` to \`endWord\`, or 0 if no such sequence exists.`,
        difficulty: 'hard',
        category: 'graphs',
        isPremium: true,
        functionName: 'ladder_length',
        examples: [
            { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.' },
        ],
        constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'wordList[i].length == beginWord.length'],
        testCases: [
            { input: { beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'] }, expectedOutput: 5 },
            { input: { beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log'] }, expectedOutput: 0 },
        ],
        starterCode: {
            python: `def ladder_length(beginWord: str, endWord: str, wordList: list[str]) -> int:
    # Write your solution here
    pass`,
            javascript: `function ladderLength(beginWord, endWord, wordList) {
    // Write your solution here
}`,
            java: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // DYNAMIC PROGRAMMING
    {
        title: 'Climbing Stairs',
        description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
        difficulty: 'easy',
        category: 'dynamic-programming',
        isPremium: false,
        functionName: 'climb_stairs',
        examples: [
            { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps' },
            { input: 'n = 3', output: '3', explanation: 'There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step' },
        ],
        constraints: ['1 <= n <= 45'],
        testCases: [
            { input: { n: 2 }, expectedOutput: 2 },
            { input: { n: 3 }, expectedOutput: 3 },
            { input: { n: 5 }, expectedOutput: 8 },
            { input: { n: 10 }, expectedOutput: 89, isHidden: true },
        ],
        starterCode: {
            python: `def climb_stairs(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function climbStairs(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Coin Change',
        description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
        difficulty: 'medium',
        category: 'dynamic-programming',
        isPremium: false,
        functionName: 'coin_change',
        examples: [
            { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
            { input: 'coins = [2], amount = 3', output: '-1', explanation: '' },
        ],
        constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
        testCases: [
            { input: { coins: [1, 2, 5], amount: 11 }, expectedOutput: 3 },
            { input: { coins: [2], amount: 3 }, expectedOutput: -1 },
            { input: { coins: [1], amount: 0 }, expectedOutput: 0 },
            { input: { coins: [1, 5, 10, 25], amount: 41 }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def coin_change(coins: list[int], amount: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function coinChange(coins, amount) {
    // Write your solution here
}`,
            java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Longest Common Subsequence',
        description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return \`0\`.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
        difficulty: 'medium',
        category: 'dynamic-programming',
        isPremium: true,
        functionName: 'longest_common_subsequence',
        examples: [
            { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
            { input: 'text1 = "abc", text2 = "abc"', output: '3', explanation: 'The longest common subsequence is "abc" and its length is 3.' },
        ],
        constraints: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters.'],
        testCases: [
            { input: { text1: 'abcde', text2: 'ace' }, expectedOutput: 3 },
            { input: { text1: 'abc', text2: 'abc' }, expectedOutput: 3 },
            { input: { text1: 'abc', text2: 'def' }, expectedOutput: 0 },
            { input: { text1: 'ezupkr', text2: 'ubmrapg' }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function longestCommonSubsequence(text1, text2) {
    // Write your solution here
}`,
            java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Edit Distance',
        description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character`,
        difficulty: 'hard',
        category: 'dynamic-programming',
        isPremium: true,
        functionName: 'min_distance',
        examples: [
            { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse -> rorse (replace h with r) -> rose (remove r) -> ros (remove e)' },
            { input: 'word1 = "intention", word2 = "execution"', output: '5', explanation: '' },
        ],
        constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
        testCases: [
            { input: { word1: 'horse', word2: 'ros' }, expectedOutput: 3 },
            { input: { word1: 'intention', word2: 'execution' }, expectedOutput: 5 },
            { input: { word1: '', word2: 'a' }, expectedOutput: 1 },
            { input: { word1: 'abc', word2: 'abc' }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def min_distance(word1: str, word2: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function minDistance(word1, word2) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minDistance(String word1, String word2) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // SYSTEM DESIGN
    {
        title: 'Design a URL Shortener',
        description: `Design a URL shortening service like TinyURL.

**Requirements:**
- Given a long URL, generate a short URL (e.g. \`https://tinyurl.com/abc123\`)
- Given a short URL, redirect to the original long URL
- Short URLs should be unique and not predictable
- System should handle 100M URLs and 10B redirects per month

**Your task:** Write pseudocode or actual code for the core components:
1. The hash/encoding function that generates short codes
2. The data model for storing URL mappings
3. The redirect logic
4. How you would handle collisions

Explain your design decisions and any trade-offs.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: true,
        functionName: 'solution',
        examples: [
            { input: 'longUrl = "https://www.example.com/very/long/path?with=params"', output: '"https://tinyurl.com/abc123"', explanation: 'Generate a unique 6-character code and store the mapping.' },
        ],
        constraints: [
            'Short codes should be 6-8 characters',
            'Use alphanumeric characters (a-z, A-Z, 0-9)',
            'System must handle high read traffic (10:1 read/write ratio)',
            'URLs should never expire unless explicitly set'
        ],
        testCases: [
            { input: { url: 'https://www.example.com' }, expectedOutput: 'valid_short_url' },
        ],
        starterCode: {
            python: `# Design a URL Shortener
# Write your solution explaining:
# 1. The encoding function
# 2. Data model
# 3. Redirect logic
# 4. Collision handling

class URLShortener:
    def __init__(self):
        # Initialize your data structures
        pass
    
    def encode(self, long_url: str) -> str:
        # Generate a short URL
        pass
    
    def decode(self, short_url: str) -> str:
        # Return the original URL
        pass`,
            javascript: `// Design a URL Shortener
class URLShortener {
    constructor() {
        // Initialize your data structures
    }
    
    encode(longUrl) {
        // Generate a short URL
    }
    
    decode(shortUrl) {
        // Return the original URL
    }
}`,
            java: `// Design a URL Shortener
public class URLShortener {
    public URLShortener() {
        // Initialize your data structures
    }
    
    public String encode(String longUrl) {
        // Generate a short URL
        return "";
    }
    
    public String decode(String shortUrl) {
        // Return the original URL
        return "";
    }
}`
        }
    },
    {
        title: 'Design a Rate Limiter',
        description: `Design a rate limiter that can be used to limit the number of requests a user can make to an API within a time window.

**Requirements:**
- Limit each user to N requests per time window (e.g. 100 requests per minute)
- Return HTTP 429 (Too Many Requests) when limit is exceeded
- The solution should work in a distributed system (multiple servers)
- Minimize latency impact on normal requests

**Your task:** Implement a rate limiter using one of these algorithms:
1. Token Bucket
2. Sliding Window Log
3. Sliding Window Counter

Explain which algorithm you chose and why, then implement it.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: true,
        functionName: 'solution',
        examples: [
            { input: 'userId = "user123", limit = 100, window = 60', output: 'true (request allowed) or false (rate limited)', explanation: 'Return true if the user is within their rate limit, false if exceeded.' },
        ],
        constraints: [
            'Must work across multiple servers',
            'O(1) time complexity preferred',
            'Should handle burst traffic gracefully',
            'Must be accurate within the time window'
        ],
        testCases: [
            { input: { userId: 'user1', limit: 3, window: 60, requests: 4 }, expectedOutput: false },
            { input: { userId: 'user1', limit: 3, window: 60, requests: 2 }, expectedOutput: true },
        ],
        starterCode: {
            python: `# Design a Rate Limiter
# Choose an algorithm and implement it

class RateLimiter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        # Initialize your data structures
    
    def is_allowed(self, user_id: str) -> bool:
        # Return True if request is allowed, False if rate limited
        pass`,
            javascript: `// Design a Rate Limiter
class RateLimiter {
    constructor(limit, windowSeconds) {
        this.limit = limit;
        this.window = windowSeconds;
        // Initialize your data structures
    }
    
    isAllowed(userId) {
        // Return true if request is allowed, false if rate limited
    }
}`,
            java: `// Design a Rate Limiter
public class RateLimiter {
    private int limit;
    private int window;
    
    public RateLimiter(int limit, int windowSeconds) {
        this.limit = limit;
        this.window = windowSeconds;
        // Initialize your data structures
    }
    
    public boolean isAllowed(String userId) {
        // Return true if request is allowed, false if rate limited
        return false;
    }
}`
        }
    },
    {
        title: 'Design Twitter Feed',
        description: `Design a simplified version of Twitter's news feed system.

**Requirements:**
- Users can post tweets
- Users can follow/unfollow other users
- Users can see a feed of the 10 most recent tweets from people they follow
- System must handle 100M daily active users
- Reads should be fast (< 100ms)

**Your task:** Design and implement the core data structures and algorithms for:
1. \`postTweet(userId, tweetId)\` — Post a new tweet
2. \`getNewsFeed(userId)\` — Get the 10 most recent tweets from followed users
3. \`follow(followerId, followeeId)\` — Follow a user
4. \`unfollow(followerId, followeeId)\` — Unfollow a user

Explain how you would scale this to 100M users.`,
        difficulty: 'hard',
        category: 'system-design',
        isPremium: true,
        functionName: 'solution',
        examples: [
            { input: 'postTweet(1, 5), postTweet(1, 3), follow(2, 1), getNewsFeed(2)', output: '[3, 5]', explanation: 'User 2 follows user 1. User 1 posted tweets 5 and 3. getNewsFeed returns most recent first.' },
        ],
        constraints: [
            '1 <= userId, tweetId <= 500',
            'All tweets have unique IDs',
            'At most 3 * 10^4 calls will be made',
            'Feed should return at most 10 tweets'
        ],
        testCases: [
            { input: { operations: ['postTweet', 'postTweet', 'follow', 'getNewsFeed'], args: [[1, 5], [1, 3], [2, 1], [2]] }, expectedOutput: [3, 5] },
        ],
        starterCode: {
            python: `# Design Twitter Feed

class Twitter:
    def __init__(self):
        # Initialize your data structures
        pass
    
    def post_tweet(self, user_id: int, tweet_id: int) -> None:
        pass
    
    def get_news_feed(self, user_id: int) -> list[int]:
        pass
    
    def follow(self, follower_id: int, followee_id: int) -> None:
        pass
    
    def unfollow(self, follower_id: int, followee_id: int) -> None:
        pass`,
            javascript: `// Design Twitter Feed
class Twitter {
    constructor() {
        // Initialize your data structures
    }
    
    postTweet(userId, tweetId) {}
    
    getNewsFeed(userId) {}
    
    follow(followerId, followeeId) {}
    
    unfollow(followerId, followeeId) {}
}`,
            java: `// Design Twitter Feed
class Twitter {
    public Twitter() {
        // Initialize your data structures
    }
    
    public void postTweet(int userId, int tweetId) {}
    
    public List<Integer> getNewsFeed(int userId) { return new ArrayList<>(); }
    
    public void follow(int followerId, int followeeId) {}
    
    public void unfollow(int followerId, int followeeId) {}
}`
        }
    }
];

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems`);

    await mongoose.disconnect();
    console.log('Done!');
}

seed().catch(console.error);