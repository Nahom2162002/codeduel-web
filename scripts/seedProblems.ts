import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Problem from '../models/Problem';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

export const problems = [
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
            python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function twoSum(nums, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
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
        treeNodeParams: ['root'],
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
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function maxDepth(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
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
        treeNodeParams: ['root'],
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
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function isValidBST(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
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
        treeNodeParams: ['root'],
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
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function maxPathSum(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
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
        title: 'LRU Cache',
        description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` initializes the cache with a positive size \`capacity\`.
- \`get(int key)\` returns the value of the key if it exists, otherwise returns \`-1\`.
- \`put(int key, int value)\` updates the value of the key if it exists. Otherwise, adds the key-value pair. If the number of keys exceeds \`capacity\` from this operation, evict the least recently used key.

Both \`get\` and \`put\` must run in \`O(1)\` average time complexity.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: true,
        functionName: 'LRUCache',
        executionType: 'multi-call',
        examples: [
            { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: '[null,null,null,1,null,-1,null,-1,3,4]', explanation: 'Capacity 2. Putting a 3rd key evicts the least recently used one.' },
        ],
        constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls will be made to get and put.'],
        testCases: [
            {
                input: {
                    operations: ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
                    args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
                },
                expectedOutput: [null, null, null, 1, null, -1, null, -1, 3, 4]
            },
        ],
        starterCode: {
            python: `class LRUCache:
    def __init__(self, capacity: int):
        # Write your solution here
        pass

    def get(self, key: int) -> int:
        # Write your solution here
        pass

    def put(self, key: int, value: int) -> None:
        # Write your solution here
        pass`,
            javascript: `class LRUCache {
    constructor(capacity) {
        // Write your solution here
    }

    get(key) {
        // Write your solution here
    }

    put(key, value) {
        // Write your solution here
    }
}`,
            java: `class LRUCache {
    public LRUCache(int capacity) {
        // Write your solution here
    }

    public int get(int key) {
        // Write your solution here
        return -1;
    }

    public void put(int key, int value) {
        // Write your solution here
    }
}`
        }
    },
    {
        title: 'Design Hit Counter',
        description: `Design a hit counter which counts the number of hits received in the past 5 minutes (i.e. the past 300 seconds).

Your system should accept a \`timestamp\` parameter (in seconds granularity), and you may assume that calls are made in chronological order (\`timestamp\` is monotonically increasing). Several hits may arrive at the same timestamp.

Implement the \`HitCounter\` class:
- \`HitCounter()\` initializes the object.
- \`hit(int timestamp)\` records a hit at \`timestamp\`.
- \`getHits(int timestamp)\` returns the number of hits in the past 5 minutes from \`timestamp\` (i.e. the range \`[timestamp - 300 + 1, timestamp]\`).`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: true,
        functionName: 'HitCounter',
        executionType: 'multi-call',
        examples: [
            { input: '["HitCounter","hit","hit","hit","getHits","hit","getHits","getHits"]\n[[],[1],[2],[3],[4],[300],[300],[301]]', output: '[null,null,null,null,3,null,4,3]', explanation: 'At timestamp 301, the hit at timestamp 1 (300 seconds ago) has fallen out of the window.' },
        ],
        constraints: ['1 <= timestamp <= 2 * 10^9', 'All calls are made in chronological order (timestamp is monotonically increasing).', 'At most 300 calls will be made to hit and getHits.'],
        testCases: [
            {
                input: {
                    operations: ['HitCounter', 'hit', 'hit', 'hit', 'getHits', 'hit', 'getHits', 'getHits'],
                    args: [[], [1], [2], [3], [4], [300], [300], [301]]
                },
                expectedOutput: [null, null, null, null, 3, null, 4, 3]
            },
        ],
        starterCode: {
            python: `class HitCounter:
    def __init__(self):
        # Write your solution here
        pass

    def hit(self, timestamp: int) -> None:
        # Write your solution here
        pass

    def get_hits(self, timestamp: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class HitCounter {
    constructor() {
        // Write your solution here
    }

    hit(timestamp) {
        // Write your solution here
    }

    getHits(timestamp) {
        // Write your solution here
        return 0;
    }
}`,
            java: `class HitCounter {
    public HitCounter() {
        // Write your solution here
    }

    public void hit(int timestamp) {
        // Write your solution here
    }

    public int getHits(int timestamp) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Design Twitter Feed',
        description: `Design a simplified version of Twitter where users can post tweets, follow/unfollow other users, and see the 10 most recent tweet IDs in their news feed.

Implement the \`Twitter\` class:
- \`Twitter()\` initializes the object.
- \`postTweet(int userId, int tweetId)\` composes a new tweet. Each call is made with a unique \`tweetId\`.
- \`getNewsFeed(int userId)\` returns a list of the 10 most recent tweet IDs in the user's news feed. Each item must be posted by users the user follows or by the user themself. Tweets must be ordered from most recent to least recent.
- \`follow(int followerId, int followeeId)\` makes \`followerId\` follow \`followeeId\`.
- \`unfollow(int followerId, int followeeId)\` makes \`followerId\` unfollow \`followeeId\`.`,
        difficulty: 'hard',
        category: 'system-design',
        isPremium: true,
        functionName: 'Twitter',
        executionType: 'multi-call',
        examples: [
            { input: '["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]', output: '[null,null,[5],null,null,[6,5],null,[5]]', explanation: 'User 1 posts, follows user 2 (who also posts), then unfollows — the feed reflects each state.' },
        ],
        constraints: ['1 <= userId, tweetId <= 500', 'All the tweets have unique IDs.', 'At most 3 * 10^4 calls will be made to postTweet, getNewsFeed, follow, and unfollow.'],
        testCases: [
            {
                input: {
                    operations: ['Twitter', 'postTweet', 'getNewsFeed', 'follow', 'postTweet', 'getNewsFeed', 'unfollow', 'getNewsFeed'],
                    args: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
                },
                expectedOutput: [null, null, [5], null, null, [6, 5], null, [5]]
            },
        ],
        starterCode: {
            python: `class Twitter:
    def __init__(self):
        # Write your solution here
        pass

    def post_tweet(self, user_id: int, tweet_id: int) -> None:
        # Write your solution here
        pass

    def get_news_feed(self, user_id: int) -> list[int]:
        # Write your solution here
        pass

    def follow(self, follower_id: int, followee_id: int) -> None:
        # Write your solution here
        pass

    def unfollow(self, follower_id: int, followee_id: int) -> None:
        # Write your solution here
        pass`,
            javascript: `class Twitter {
    constructor() {
        // Write your solution here
    }

    postTweet(userId, tweetId) {
        // Write your solution here
    }

    getNewsFeed(userId) {
        // Write your solution here
        return [];
    }

    follow(followerId, followeeId) {
        // Write your solution here
    }

    unfollow(followerId, followeeId) {
        // Write your solution here
    }
}`,
            java: `class Twitter {
    public Twitter() {
        // Write your solution here
    }

    public void postTweet(int userId, int tweetId) {
        // Write your solution here
    }

    public List<Integer> getNewsFeed(int userId) {
        // Write your solution here
        return new ArrayList<>();
    }

    public void follow(int followerId, int followeeId) {
        // Write your solution here
    }

    public void unfollow(int followerId, int followeeId) {
        // Write your solution here
    }
}`
        }
    },

    // BINARY SEARCH
    {
        title: 'Binary Search',
        description: `Given an array of integers \`nums\` sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
        difficulty: 'easy',
        category: 'binary-search',
        isPremium: false,
        functionName: 'search',
        examples: [
            { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
            { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
        testCases: [
            { input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 }, expectedOutput: 4 },
            { input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 }, expectedOutput: -1 },
            { input: { nums: [5], target: 5 }, expectedOutput: 0 },
            { input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 1 }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def search(nums: list[int], target: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function search(nums, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Search in Rotated Sorted Array',
        description: `There is an integer array \`nums\` sorted in ascending order (with distinct values). Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index.

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
        difficulty: 'medium',
        category: 'binary-search',
        isPremium: false,
        functionName: 'search_rotated',
        examples: [
            { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: '' },
            { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10^4 <= target <= 10^4'],
        testCases: [
            { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 }, expectedOutput: 4 },
            { input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }, expectedOutput: -1 },
            { input: { nums: [1], target: 0 }, expectedOutput: -1 },
            { input: { nums: [5, 1, 3], target: 5 }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def search_rotated(nums: list[int], target: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function searchRotated(nums, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int searchRotated(int[] nums, int target) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Find Minimum in Rotated Sorted Array',
        description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times. Given the sorted rotated array \`nums\` of unique elements, return the minimum element of this array.

You must write an algorithm that runs in \`O(log n)\` time.`,
        difficulty: 'medium',
        category: 'binary-search',
        isPremium: true,
        functionName: 'find_min',
        examples: [
            { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'The original array was [1,2,3,4,5] rotated 3 times.' },
            { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'The original array was [0,1,2,4,5,6,7] rotated 4 times.' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All the integers of nums are unique.', 'nums is sorted and rotated between 1 and n times.'],
        testCases: [
            { input: { nums: [3, 4, 5, 1, 2] }, expectedOutput: 1 },
            { input: { nums: [4, 5, 6, 7, 0, 1, 2] }, expectedOutput: 0 },
            { input: { nums: [11, 13, 15, 17] }, expectedOutput: 11 },
            { input: { nums: [2, 1] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def find_min(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findMin(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findMin(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Koko Eating Bananas',
        description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the \`ith\` pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead, and won't eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
        difficulty: 'hard',
        category: 'binary-search',
        isPremium: true,
        functionName: 'min_eating_speed',
        examples: [
            { input: 'piles = [3,6,7,11], h = 8', output: '4', explanation: '' },
            { input: 'piles = [30,11,23,4,20], h = 5', output: '30', explanation: '' },
        ],
        constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
        testCases: [
            { input: { piles: [3, 6, 7, 11], h: 8 }, expectedOutput: 4 },
            { input: { piles: [30, 11, 23, 4, 20], h: 5 }, expectedOutput: 30 },
            { input: { piles: [30, 11, 23, 4, 20], h: 6 }, expectedOutput: 23 },
            { input: { piles: [312884470], h: 968709470 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def min_eating_speed(piles: list[int], h: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function minEatingSpeed(piles, h) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        // Write your solution here
        return 1;
    }
}`
        }
    },

    // STACKS & QUEUES
    {
        title: 'Valid Parentheses',
        description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.`,
        difficulty: 'easy',
        category: 'stacks',
        isPremium: false,
        functionName: 'is_valid',
        examples: [
            { input: 's = "()"', output: 'true', explanation: '' },
            { input: 's = "()[]{}"', output: 'true', explanation: '' },
            { input: 's = "(]"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^4', "s consists of parentheses only '()[]{}'."],
        testCases: [
            { input: { s: '()' }, expectedOutput: true },
            { input: { s: '()[]{}' }, expectedOutput: true },
            { input: { s: '(]' }, expectedOutput: false },
            { input: { s: '([)]' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def is_valid(s: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isValid(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Daily Temperatures',
        description: `Given an array of integers \`temperatures\` representing the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`ith\` day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
        difficulty: 'medium',
        category: 'stacks',
        isPremium: false,
        functionName: 'daily_temperatures',
        examples: [
            { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]', explanation: '' },
            { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]', explanation: '' },
        ],
        constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
        testCases: [
            { input: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] }, expectedOutput: [1, 1, 4, 2, 1, 1, 0, 0] },
            { input: { temperatures: [30, 40, 50, 60] }, expectedOutput: [1, 1, 1, 0] },
            { input: { temperatures: [30, 60, 90] }, expectedOutput: [1, 1, 0] },
            { input: { temperatures: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70] }, expectedOutput: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0], isHidden: true },
        ],
        starterCode: {
            python: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function dailyTemperatures(temperatures) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Evaluate Reverse Polish Notation',
        description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`. Division between two integers should truncate toward zero.`,
        difficulty: 'medium',
        category: 'stacks',
        isPremium: true,
        functionName: 'eval_rpn',
        examples: [
            { input: 'tokens = ["2","1","+","3","*"]', output: '9', explanation: '((2 + 1) * 3) = 9' },
            { input: 'tokens = ["4","13","5","/","+"]', output: '6', explanation: '(4 + (13 / 5)) = 6' },
        ],
        constraints: ['1 <= tokens.length <= 10^4', "tokens[i] is either an operator: '+', '-', '*', or '/', or an integer in the range [-200, 200]."],
        testCases: [
            { input: { tokens: ['2', '1', '+', '3', '*'] }, expectedOutput: 9 },
            { input: { tokens: ['4', '13', '5', '/', '+'] }, expectedOutput: 6 },
            { input: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'] }, expectedOutput: 22 },
            { input: { tokens: ['4', '3', '-'] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def eval_rpn(tokens: list[str]) -> int:
    # Write your solution here
    pass`,
            javascript: `function evalRPN(tokens) {
    // Write your solution here
}`,
            java: `class Solution {
    public int evalRPN(String[] tokens) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Largest Rectangle in Histogram',
        description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.`,
        difficulty: 'hard',
        category: 'stacks',
        isPremium: true,
        functionName: 'largest_rectangle_area',
        examples: [
            { input: 'heights = [2,1,5,6,2,3]', output: '10', explanation: 'The largest rectangle is formed by the bars of height 5 and 6 (indices 2-3), giving an area of 5 * 2 = 10.' },
            { input: 'heights = [2,4]', output: '4', explanation: '' },
        ],
        constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
        testCases: [
            { input: { heights: [2, 1, 5, 6, 2, 3] }, expectedOutput: 10 },
            { input: { heights: [2, 4] }, expectedOutput: 4 },
            { input: { heights: [1, 1] }, expectedOutput: 2 },
            { input: { heights: [6, 2, 5, 4, 5, 1, 6] }, expectedOutput: 12, isHidden: true },
        ],
        starterCode: {
            python: `def largest_rectangle_area(heights: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function largestRectangleArea(heights) {
    // Write your solution here
}`,
            java: `class Solution {
    public int largestRectangleArea(int[] heights) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // GREEDY
    {
        title: 'Best Time to Buy and Sell Stock',
        description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
        difficulty: 'easy',
        category: 'greedy',
        isPremium: false,
        functionName: 'max_profit',
        examples: [
            { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.' },
            { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices only go down, no transactions are done and the max profit is 0.' },
        ],
        constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
        testCases: [
            { input: { prices: [7, 1, 5, 3, 6, 4] }, expectedOutput: 5 },
            { input: { prices: [7, 6, 4, 3, 1] }, expectedOutput: 0 },
            { input: { prices: [2, 4, 1] }, expectedOutput: 2 },
            { input: { prices: [3, 2, 6, 5, 0, 3] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def max_profit(prices: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxProfit(prices) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Jump Game',
        description: `You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'greedy',
        isPremium: false,
        functionName: 'can_jump',
        examples: [
            { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
            { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, so you can never reach the last index.' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
        testCases: [
            { input: { nums: [2, 3, 1, 1, 4] }, expectedOutput: true },
            { input: { nums: [3, 2, 1, 0, 4] }, expectedOutput: false },
            { input: { nums: [0] }, expectedOutput: true },
            { input: { nums: [2, 0, 0] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def can_jump(nums: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canJump(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canJump(int[] nums) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Gas Station',
        description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`ith\` station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`ith\` station to its next \`(i + 1)th\` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is guaranteed to be unique.`,
        difficulty: 'medium',
        category: 'greedy',
        isPremium: true,
        functionName: 'can_complete_circuit',
        examples: [
            { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3', explanation: 'Starting at station 3, you can travel around the circuit once.' },
            { input: 'gas = [2,3,4], cost = [3,4,3]', output: '-1', explanation: 'You cannot travel around the circuit once no matter where you start.' },
        ],
        constraints: ['n == gas.length == cost.length', '1 <= n <= 10^5', '0 <= gas[i], cost[i] <= 10^4'],
        testCases: [
            { input: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] }, expectedOutput: 3 },
            { input: { gas: [2, 3, 4], cost: [3, 4, 3] }, expectedOutput: -1 },
            { input: { gas: [5, 1, 2, 3, 4], cost: [4, 4, 1, 5, 1] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function canCompleteCircuit(gas, cost) {
    // Write your solution here
}`,
            java: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Task Scheduler',
        description: `You are given an array of CPU \`tasks\`, each labeled with a letter from A to Z, and a number \`n\`. Each CPU interval can be idle or allow completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least \`n\` intervals between two tasks with the same label.

Return the minimum number of CPU intervals required to complete all tasks.`,
        difficulty: 'hard',
        category: 'greedy',
        isPremium: true,
        functionName: 'least_interval',
        examples: [
            { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8', explanation: 'A -> B -> idle -> A -> B -> idle -> A -> B' },
            { input: 'tasks = ["A","C","A","B","D","B"], n = 1', output: '6', explanation: 'A -> B -> C -> A -> D -> B' },
        ],
        constraints: ['1 <= tasks.length <= 10^4', 'tasks[i] is an uppercase English letter.', '0 <= n <= 100'],
        testCases: [
            { input: { tasks: ['A', 'A', 'A', 'B', 'B', 'B'], n: 2 }, expectedOutput: 8 },
            { input: { tasks: ['A', 'C', 'A', 'B', 'D', 'B'], n: 1 }, expectedOutput: 6 },
            { input: { tasks: ['A', 'A', 'A', 'B', 'B', 'B'], n: 0 }, expectedOutput: 6 },
            { input: { tasks: ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], n: 2 }, expectedOutput: 16, isHidden: true },
        ],
        starterCode: {
            python: `def least_interval(tasks: list[str], n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function leastInterval(tasks, n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int leastInterval(String[] tasks, int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // BIT MANIPULATION
    {
        title: 'Single Number',
        description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
        difficulty: 'easy',
        category: 'bit-manipulation',
        isPremium: false,
        functionName: 'single_number',
        examples: [
            { input: 'nums = [2,2,1]', output: '1', explanation: '' },
            { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element in the array appears twice except for one element which appears only once.'],
        testCases: [
            { input: { nums: [2, 2, 1] }, expectedOutput: 1 },
            { input: { nums: [4, 1, 2, 1, 2] }, expectedOutput: 4 },
            { input: { nums: [1] }, expectedOutput: 1 },
            { input: { nums: [7, 3, 7] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def single_number(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function singleNumber(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int singleNumber(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Counting Bits',
        description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the number of \`1\`'s in the binary representation of \`i\`.`,
        difficulty: 'medium',
        category: 'bit-manipulation',
        isPremium: false,
        functionName: 'count_bits',
        examples: [
            { input: 'n = 2', output: '[0,1,1]', explanation: '0 --> 0, 1 --> 1, 2 --> 10' },
            { input: 'n = 5', output: '[0,1,1,2,1,2]', explanation: '' },
        ],
        constraints: ['0 <= n <= 10^5'],
        testCases: [
            { input: { n: 2 }, expectedOutput: [0, 1, 1] },
            { input: { n: 5 }, expectedOutput: [0, 1, 1, 2, 1, 2] },
            { input: { n: 0 }, expectedOutput: [0] },
            { input: { n: 8 }, expectedOutput: [0, 1, 1, 2, 1, 2, 2, 3, 1], isHidden: true },
        ],
        starterCode: {
            python: `def count_bits(n: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function countBits(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] countBits(int n) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Reverse Bits',
        description: `Reverse bits of a given 32-bit unsigned integer \`n\`.`,
        difficulty: 'medium',
        category: 'bit-manipulation',
        isPremium: true,
        functionName: 'reverse_bits',
        examples: [
            { input: 'n = 43261596 (00000010100101000001111010011100)', output: '964176192 (00111001011110000010100101000000)', explanation: '' },
            { input: 'n = 4294967293 (11111111111111111111111111111101)', output: '3221225471 (10111111111111111111111111111111)', explanation: '' },
        ],
        constraints: ['0 <= n <= 2^32 - 1'],
        testCases: [
            { input: { n: 43261596 }, expectedOutput: 964176192 },
            { input: { n: 4294967293 }, expectedOutput: 3221225471 },
            { input: { n: 0 }, expectedOutput: 0 },
            { input: { n: 1 }, expectedOutput: 2147483648, isHidden: true },
        ],
        starterCode: {
            python: `def reverse_bits(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function reverseBits(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public long reverseBits(long n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Sum of Two Integers',
        description: `Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.`,
        difficulty: 'hard',
        category: 'bit-manipulation',
        isPremium: true,
        functionName: 'get_sum',
        examples: [
            { input: 'a = 1, b = 2', output: '3', explanation: '' },
            { input: 'a = 2, b = 3', output: '5', explanation: '' },
        ],
        constraints: ['-1000 <= a, b <= 1000'],
        testCases: [
            { input: { a: 1, b: 2 }, expectedOutput: 3 },
            { input: { a: 2, b: 3 }, expectedOutput: 5 },
            { input: { a: -5, b: 7 }, expectedOutput: 2 },
            { input: { a: -10, b: -20 }, expectedOutput: -30, isHidden: true },
        ],
        starterCode: {
            python: `def get_sum(a: int, b: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function getSum(a, b) {
    // Write your solution here
}`,
            java: `class Solution {
    public int getSum(int a, int b) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // HASH TABLE
    {
        title: 'Contains Duplicate',
        description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
        difficulty: 'easy',
        category: 'hash-table',
        isPremium: false,
        functionName: 'contains_duplicate',
        examples: [
            { input: 'nums = [1,2,3,1]', output: 'true', explanation: '' },
            { input: 'nums = [1,2,3,4]', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
        testCases: [
            { input: { nums: [1, 2, 3, 1] }, expectedOutput: true },
            { input: { nums: [1, 2, 3, 4] }, expectedOutput: false },
            { input: { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, expectedOutput: true },
            { input: { nums: [7] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def contains_duplicate(nums: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function containsDuplicate(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Longest Consecutive Sequence',
        description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in \`O(n)\` time.`,
        difficulty: 'medium',
        category: 'hash-table',
        isPremium: false,
        functionName: 'longest_consecutive',
        examples: [
            { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.' },
            { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9', explanation: '' },
        ],
        constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
        testCases: [
            { input: { nums: [100, 4, 200, 1, 3, 2] }, expectedOutput: 4 },
            { input: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, expectedOutput: 9 },
            { input: { nums: [] }, expectedOutput: 0 },
            { input: { nums: [1, 2, 0, 1] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def longest_consecutive(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function longestConsecutive(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int longestConsecutive(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: '4Sum II',
        description: `Given four integer arrays \`nums1\`, \`nums2\`, \`nums3\`, and \`nums4\` all of length \`n\`, return the number of tuples \`(i, j, k, l)\` such that:
- \`0 <= i, j, k, l < n\`
- \`nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0\``,
        difficulty: 'medium',
        category: 'hash-table',
        isPremium: true,
        functionName: 'four_sum_count',
        examples: [
            { input: 'nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]', output: '2', explanation: '' },
        ],
        constraints: ['n == nums1.length == nums2.length == nums3.length == nums4.length', '1 <= n <= 200', '-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28'],
        testCases: [
            { input: { nums1: [1, 2], nums2: [-2, -1], nums3: [-1, 2], nums4: [0, 2] }, expectedOutput: 2 },
            { input: { nums1: [0], nums2: [0], nums3: [0], nums4: [0] }, expectedOutput: 1 },
            { input: { nums1: [0, 0], nums2: [0, 0], nums3: [0, 0], nums4: [0, 0] }, expectedOutput: 16, isHidden: true },
        ],
        starterCode: {
            python: `def four_sum_count(nums1: list[int], nums2: list[int], nums3: list[int], nums4: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function fourSumCount(nums1, nums2, nums3, nums4) {
    // Write your solution here
}`,
            java: `class Solution {
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Subarray Sum Equals K',
        description: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.`,
        difficulty: 'hard',
        category: 'hash-table',
        isPremium: true,
        functionName: 'subarray_sum',
        examples: [
            { input: 'nums = [1,1,1], k = 2', output: '2', explanation: '' },
            { input: 'nums = [1,2,3], k = 3', output: '2', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
        testCases: [
            { input: { nums: [1, 1, 1], k: 2 }, expectedOutput: 2 },
            { input: { nums: [1, 2, 3], k: 3 }, expectedOutput: 2 },
            { input: { nums: [1], k: 0 }, expectedOutput: 0 },
            { input: { nums: [1, -1, 0], k: 0 }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def subarray_sum(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function subarraySum(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int subarraySum(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // TWO POINTERS
    {
        title: 'Valid Palindrome II',
        description: `Given a string \`s\`, return \`true\` if the \`s\` can be palindrome after deleting at most one character from it.`,
        difficulty: 'easy',
        category: 'two-pointers',
        isPremium: false,
        functionName: 'valid_palindrome',
        examples: [
            { input: 's = "aba"', output: 'true', explanation: '' },
            { input: 's = "abca"', output: 'true', explanation: 'You could delete the character \'c\'.' },
            { input: 's = "abc"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
        testCases: [
            { input: { s: 'aba' }, expectedOutput: true },
            { input: { s: 'abca' }, expectedOutput: true },
            { input: { s: 'abc' }, expectedOutput: false },
            { input: { s: 'deeee' }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def valid_palindrome(s: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function validPalindrome(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean validPalindrome(String s) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Container With Most Water',
        description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`ith\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container that contains the most water. Return the maximum amount of water a container can store.`,
        difficulty: 'medium',
        category: 'two-pointers',
        isPremium: false,
        functionName: 'max_area',
        examples: [
            { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: '' },
            { input: 'height = [1,1]', output: '1', explanation: '' },
        ],
        constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
        testCases: [
            { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expectedOutput: 49 },
            { input: { height: [1, 1] }, expectedOutput: 1 },
            { input: { height: [4, 3, 2, 1, 4] }, expectedOutput: 16 },
            { input: { height: [1, 2, 1] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def max_area(height: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxArea(height) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxArea(int[] height) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Sort Colors',
        description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, represented by the integers \`0\`, \`1\`, and \`2\` respectively, sort them so that objects of the same color are adjacent, with the colors in the order red, white, and blue (i.e. sorted in non-decreasing order). Return the sorted array.`,
        difficulty: 'medium',
        category: 'two-pointers',
        isPremium: true,
        functionName: 'sort_colors',
        examples: [
            { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]', explanation: '' },
            { input: 'nums = [2,0,1]', output: '[0,1,2]', explanation: '' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is 0, 1, or 2.'],
        testCases: [
            { input: { nums: [2, 0, 2, 1, 1, 0] }, expectedOutput: [0, 0, 1, 1, 2, 2] },
            { input: { nums: [2, 0, 1] }, expectedOutput: [0, 1, 2] },
            { input: { nums: [0] }, expectedOutput: [0] },
            { input: { nums: [1, 2, 0, 2, 1, 0] }, expectedOutput: [0, 0, 1, 1, 2, 2], isHidden: true },
        ],
        starterCode: {
            python: `def sort_colors(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function sortColors(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] sortColors(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Remove Duplicates from Sorted Array II',
        description: `Given an integer array \`nums\` sorted in non-decreasing order, remove some duplicates such that each unique element appears at most twice. Return the resulting array after removing the duplicates, preserving the relative order of the elements.`,
        difficulty: 'hard',
        category: 'two-pointers',
        isPremium: true,
        functionName: 'remove_duplicates',
        examples: [
            { input: 'nums = [1,1,1,2,2,3]', output: '[1,1,2,2,3]', explanation: '' },
            { input: 'nums = [0,0,1,1,1,1,2,3,3]', output: '[0,0,1,1,2,3,3]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 3 * 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order.'],
        testCases: [
            { input: { nums: [1, 1, 1, 2, 2, 3] }, expectedOutput: [1, 1, 2, 2, 3] },
            { input: { nums: [0, 0, 1, 1, 1, 1, 2, 3, 3] }, expectedOutput: [0, 0, 1, 1, 2, 3, 3] },
            { input: { nums: [1, 1] }, expectedOutput: [1, 1] },
            { input: { nums: [1, 1, 1, 1] }, expectedOutput: [1, 1], isHidden: true },
        ],
        starterCode: {
            python: `def remove_duplicates(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function removeDuplicates(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] removeDuplicates(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // HEAP (PRIORITY QUEUE)
    {
        title: 'Last Stone Weight',
        description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the \`ith\` stone.

We are playing a game with the stones. On each turn, we choose the two heaviest stones and smash them together. Suppose the heaviest two stones have weights \`x\` and \`y\` with \`x <= y\`. The result of this smash is:
- If \`x == y\`, both stones are destroyed.
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is at most one stone left. Return the weight of the last remaining stone, or \`0\` if there are no stones left.`,
        difficulty: 'easy',
        category: 'heap',
        isPremium: false,
        functionName: 'last_stone_weight',
        examples: [
            { input: 'stones = [2,7,4,1,8,1]', output: '1', explanation: 'Combine 7 and 8 to get 1, combine 2 and 4 to get 2, combine 1 and 2 to get 1, combine 1 and 1 to get 0. Last stone is 1.' },
            { input: 'stones = [1]', output: '1', explanation: '' },
        ],
        constraints: ['1 <= stones.length <= 30', '1 <= stones[i] <= 1000'],
        testCases: [
            { input: { stones: [2, 7, 4, 1, 8, 1] }, expectedOutput: 1 },
            { input: { stones: [1] }, expectedOutput: 1 },
            { input: { stones: [1, 3] }, expectedOutput: 2 },
            { input: { stones: [2, 2] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def last_stone_weight(stones: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function lastStoneWeight(stones) {
    // Write your solution here
}`,
            java: `class Solution {
    public int lastStoneWeight(int[] stones) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Kth Largest Element in an Array',
        description: `Given an integer array \`nums\` and an integer \`k\`, return the \`kth\` largest element in the array.

Note that it is the \`kth\` largest element in sorted order, not the \`kth\` distinct element.`,
        difficulty: 'medium',
        category: 'heap',
        isPremium: false,
        functionName: 'find_kth_largest',
        examples: [
            { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5', explanation: '' },
            { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4', explanation: '' },
        ],
        constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        testCases: [
            { input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, expectedOutput: 5 },
            { input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, expectedOutput: 4 },
            { input: { nums: [1], k: 1 }, expectedOutput: 1 },
            { input: { nums: [7, 6, 5, 4, 3, 2, 1], k: 5 }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def find_kth_largest(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function findKthLargest(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Kth Smallest Element in a Sorted Matrix',
        description: `Given an \`n x n\` \`matrix\` where each of the rows and columns is sorted in ascending order, return the \`kth\` smallest element in the matrix.

Note that it is the \`kth\` smallest element in sorted order, not the \`kth\` distinct element.`,
        difficulty: 'medium',
        category: 'heap',
        isPremium: true,
        functionName: 'kth_smallest',
        examples: [
            { input: 'matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8', output: '13', explanation: '' },
        ],
        constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 300', '-10^9 <= matrix[i][j] <= 10^9', 'All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.', '1 <= k <= n^2'],
        testCases: [
            { input: { matrix: [[1, 5, 9], [10, 11, 13], [12, 13, 15]], k: 8 }, expectedOutput: 13 },
            { input: { matrix: [[-5]], k: 1 }, expectedOutput: -5 },
            { input: { matrix: [[1, 2], [1, 3]], k: 2 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def kth_smallest(matrix: list[list[int]], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function kthSmallest(matrix, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Meeting Rooms II',
        description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return the minimum number of conference rooms required.`,
        difficulty: 'hard',
        category: 'heap',
        isPremium: true,
        functionName: 'min_meeting_rooms',
        examples: [
            { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explanation: '' },
            { input: 'intervals = [[7,10],[2,4]]', output: '1', explanation: '' },
        ],
        constraints: ['1 <= intervals.length <= 10^4', '0 <= starti < endi <= 10^6'],
        testCases: [
            { input: { intervals: [[0, 30], [5, 10], [15, 20]] }, expectedOutput: 2 },
            { input: { intervals: [[7, 10], [2, 4]] }, expectedOutput: 1 },
            { input: { intervals: [[1, 5], [8, 9], [8, 9]] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minMeetingRooms(intervals) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // SLIDING WINDOW
    {
        title: 'Permutation in String',
        description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.

In other words, return \`true\` if one of \`s1\`'s permutations is the substring of \`s2\`.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: false,
        functionName: 'check_inclusion',
        examples: [
            { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains one permutation of s1 ("ba").' },
            { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s1.length, s2.length <= 10^4', 's1 and s2 consist of lowercase English letters.'],
        testCases: [
            { input: { s1: 'ab', s2: 'eidbaooo' }, expectedOutput: true },
            { input: { s1: 'ab', s2: 'eidboaoo' }, expectedOutput: false },
            { input: { s1: 'adc', s2: 'dcda' }, expectedOutput: true },
            { input: { s1: 'hello', s2: 'ooolleoooleh' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def check_inclusion(s1: str, s2: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function checkInclusion(s1, s2) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Minimum Size Subarray Sum',
        description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return the minimal length of a subarray whose sum is greater than or equal to \`target\`. If there is no such subarray, return \`0\` instead.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: false,
        functionName: 'min_sub_array_len',
        examples: [
            { input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2', explanation: 'The subarray [4,3] has the minimal length under the problem constraint.' },
            { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0', explanation: '' },
        ],
        constraints: ['1 <= target <= 10^9', '1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^4'],
        testCases: [
            { input: { target: 7, nums: [2, 3, 1, 2, 4, 3] }, expectedOutput: 2 },
            { input: { target: 4, nums: [1, 4, 4] }, expectedOutput: 1 },
            { input: { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1] }, expectedOutput: 0 },
            { input: { target: 15, nums: [1, 2, 3, 4, 5] }, expectedOutput: 5, isHidden: true },
        ],
        starterCode: {
            python: `def min_sub_array_len(target: int, nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minSubArrayLen(target, nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Longest Repeating Character Replacement',
        description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character, at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: true,
        functionName: 'character_replacement',
        examples: [
            { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace the two \'A\'s with two \'B\'s or vice versa.' },
            { input: 's = "AABABBA", k = 1', output: '4', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters.', '0 <= k <= s.length'],
        testCases: [
            { input: { s: 'ABAB', k: 2 }, expectedOutput: 4 },
            { input: { s: 'AABABBA', k: 1 }, expectedOutput: 4 },
            { input: { s: 'ABBB', k: 2 }, expectedOutput: 4 },
            { input: { s: 'AAAA', k: 0 }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def character_replacement(s: str, k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function characterReplacement(s, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int characterReplacement(String s, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Sliding Window Maximum',
        description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.`,
        difficulty: 'hard',
        category: 'sliding-window',
        isPremium: true,
        functionName: 'max_sliding_window',
        examples: [
            { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: '' },
            { input: 'nums = [1], k = 1', output: '[1]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
        testCases: [
            { input: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 }, expectedOutput: [3, 3, 5, 5, 6, 7] },
            { input: { nums: [1], k: 1 }, expectedOutput: [1] },
            { input: { nums: [9, 11], k: 2 }, expectedOutput: [11] },
            { input: { nums: [4, -2], k: 2 }, expectedOutput: [4], isHidden: true },
        ],
        starterCode: {
            python: `def max_sliding_window(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function maxSlidingWindow(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // MATRIX
    {
        title: 'Flood Fill',
        description: `You are given an image represented by an \`m x n\` grid of integers \`image\`, where \`image[i][j]\` represents the pixel value of the image. You are also given three integers \`sr\`, \`sc\`, and \`color\`.

Perform a flood fill on the image starting from the pixel \`image[sr][sc]\`: change its color to \`color\`, then repeat the process for four-directionally adjacent pixels that have the same original color, until you reach pixels with a different color or the boundary of the image.

Return the modified image after performing the flood fill.`,
        difficulty: 'easy',
        category: 'matrix',
        isPremium: false,
        functionName: 'flood_fill',
        examples: [
            { input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2', output: '[[2,2,2],[2,2,0],[2,0,1]]', explanation: 'All pixels connected to the starting pixel with the same color as the starting pixel are colored with the new color.' },
        ],
        constraints: ['m == image.length', 'n == image[i].length', '1 <= m, n <= 50', '0 <= image[i][j], color < 2^16', '0 <= sr < m', '0 <= sc < n'],
        testCases: [
            { input: { image: [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr: 1, sc: 1, color: 2 }, expectedOutput: [[2, 2, 2], [2, 2, 0], [2, 0, 1]] },
            { input: { image: [[0, 0, 0], [0, 0, 0]], sr: 0, sc: 0, color: 0 }, expectedOutput: [[0, 0, 0], [0, 0, 0]] },
            { input: { image: [[1]], sr: 0, sc: 0, color: 1 }, expectedOutput: [[1]], isHidden: true },
        ],
        starterCode: {
            python: `def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function floodFill(image, sr, sc, color) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Rotate Image',
        description: `You are given an \`n x n\` 2D \`matrix\` representing an image. Rotate the image by 90 degrees (clockwise), and return the rotated matrix.`,
        difficulty: 'medium',
        category: 'matrix',
        isPremium: false,
        functionName: 'rotate',
        examples: [
            { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: '' },
        ],
        constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
        testCases: [
            { input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expectedOutput: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
            { input: { matrix: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]] }, expectedOutput: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] },
            { input: { matrix: [[1]] }, expectedOutput: [[1]], isHidden: true },
        ],
        starterCode: {
            python: `def rotate(matrix: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function rotate(matrix) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] rotate(int[][] matrix) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Spiral Matrix',
        description: `Given an \`m x n\` \`matrix\`, return all elements of the matrix in spiral order.`,
        difficulty: 'medium',
        category: 'matrix',
        isPremium: true,
        functionName: 'spiral_order',
        examples: [
            { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: '' },
        ],
        constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
        testCases: [
            { input: { matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expectedOutput: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
            { input: { matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]] }, expectedOutput: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
            { input: { matrix: [[1]] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function spiralOrder(matrix) {
    // Write your solution here
}`,
            java: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        return new ArrayList<>();
    }
}`
        }
    },
    {
        title: 'Set Matrix Zeroes',
        description: `Given an \`m x n\` integer \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`. Return the modified matrix.`,
        difficulty: 'hard',
        category: 'matrix',
        isPremium: true,
        functionName: 'set_zeroes',
        examples: [
            { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: '' },
        ],
        constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
        testCases: [
            { input: { matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }, expectedOutput: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
            { input: { matrix: [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]] }, expectedOutput: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] },
            { input: { matrix: [[1]] }, expectedOutput: [[1]], isHidden: true },
        ],
        starterCode: {
            python: `def set_zeroes(matrix: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function setZeroes(matrix) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] setZeroes(int[][] matrix) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },

    // SORTING
    {
        title: 'Merge Sorted Array',
        description: `You are given two integer arrays \`nums1\` and \`nums2\`, sorted in non-decreasing order. Merge \`nums1\` and \`nums2\` into a single array sorted in non-decreasing order, and return it.`,
        difficulty: 'easy',
        category: 'sorting',
        isPremium: false,
        functionName: 'merge_sorted_array',
        examples: [
            { input: 'nums1 = [1,2,3], nums2 = [2,5,6]', output: '[1,2,2,3,5,6]', explanation: '' },
        ],
        constraints: ['0 <= nums1.length, nums2.length <= 200', '-10^9 <= nums1[i], nums2[i] <= 10^9'],
        testCases: [
            { input: { nums1: [1, 2, 3], nums2: [2, 5, 6] }, expectedOutput: [1, 2, 2, 3, 5, 6] },
            { input: { nums1: [], nums2: [1] }, expectedOutput: [1] },
            { input: { nums1: [1], nums2: [] }, expectedOutput: [1] },
            { input: { nums1: [4, 5, 6], nums2: [1, 2, 3] }, expectedOutput: [1, 2, 3, 4, 5, 6], isHidden: true },
        ],
        starterCode: {
            python: `def merge_sorted_array(nums1: list[int], nums2: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function mergeSortedArray(nums1, nums2) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] mergeSortedArray(int[] nums1, int[] nums2) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Sort an Array',
        description: `Given an array of integers \`nums\`, sort the array in ascending order and return it.`,
        difficulty: 'medium',
        category: 'sorting',
        isPremium: false,
        functionName: 'sort_array',
        examples: [
            { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]', explanation: '' },
            { input: 'nums = [5,1,1,2,0,0]', output: '[0,0,1,1,2,5]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 5 * 10^4', '-5 * 10^4 <= nums[i] <= 5 * 10^4'],
        testCases: [
            { input: { nums: [5, 2, 3, 1] }, expectedOutput: [1, 2, 3, 5] },
            { input: { nums: [5, 1, 1, 2, 0, 0] }, expectedOutput: [0, 0, 1, 1, 2, 5] },
            { input: { nums: [1] }, expectedOutput: [1] },
            { input: { nums: [3, 3, 3, 1] }, expectedOutput: [1, 3, 3, 3], isHidden: true },
        ],
        starterCode: {
            python: `def sort_array(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function sortArray(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] sortArray(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'H-Index',
        description: `Given an array of integers \`citations\` where \`citations[i]\` is the number of citations a researcher received for their \`ith\` paper, return the researcher's h-index.

The h-index is defined as the maximum value of \`h\` such that the given researcher has published at least \`h\` papers that have each been cited at least \`h\` times.`,
        difficulty: 'medium',
        category: 'sorting',
        isPremium: true,
        functionName: 'h_index',
        examples: [
            { input: 'citations = [3,0,6,1,5]', output: '3', explanation: 'The researcher has 3 papers with at least 3 citations each, and the remaining papers have no more than 3 citations each, so their h-index is 3.' },
            { input: 'citations = [1,3,1]', output: '1', explanation: '' },
        ],
        constraints: ['n == citations.length', '1 <= n <= 5000', '0 <= citations[i] <= 1000'],
        testCases: [
            { input: { citations: [3, 0, 6, 1, 5] }, expectedOutput: 3 },
            { input: { citations: [1, 3, 1] }, expectedOutput: 1 },
            { input: { citations: [0, 0, 0] }, expectedOutput: 0 },
            { input: { citations: [10, 8, 5, 4, 3] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def h_index(citations: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function hIndex(citations) {
    // Write your solution here
}`,
            java: `class Solution {
    public int hIndex(int[] citations) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Largest Number',
        description: `Given a list of non-negative integers \`nums\`, arrange them such that they form the largest number and return it as a string.`,
        difficulty: 'hard',
        category: 'sorting',
        isPremium: true,
        functionName: 'largest_number',
        examples: [
            { input: 'nums = [10,2]', output: '"210"', explanation: '' },
            { input: 'nums = [3,30,34,5,9]', output: '"9534330"', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 10^9'],
        testCases: [
            { input: { nums: [10, 2] }, expectedOutput: '210' },
            { input: { nums: [3, 30, 34, 5, 9] }, expectedOutput: '9534330' },
            { input: { nums: [0, 0] }, expectedOutput: '0' },
            { input: { nums: [1] }, expectedOutput: '1', isHidden: true },
        ],
        starterCode: {
            python: `def largest_number(nums: list[int]) -> str:
    # Write your solution here
    pass`,
            javascript: `function largestNumber(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public String largestNumber(int[] nums) {
        // Write your solution here
        return "";
    }
}`
        }
    },

    // UNION-FIND
    {
        title: 'Number of Provinces',
        description: `There are \`n\` cities. Some of them are connected, while some are not. If city \`a\` is connected directly with city \`b\`, and city \`b\` is connected directly with city \`c\`, then city \`a\` is connected indirectly with city \`c\`.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an \`n x n\` matrix \`isConnected\` where \`isConnected[i][j] = 1\` if the \`ith\` city and the \`jth\` city are directly connected, and \`isConnected[i][j] = 0\` otherwise.

Return the total number of provinces.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: false,
        functionName: 'find_circle_num',
        examples: [
            { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2', explanation: '' },
            { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3', explanation: '' },
        ],
        constraints: ['1 <= n <= 200', 'n == isConnected.length == isConnected[i].length', 'isConnected[i][j] is 1 or 0.', 'isConnected[i][i] == 1', 'isConnected[i][j] == isConnected[j][i]'],
        testCases: [
            { input: { isConnected: [[1, 1, 0], [1, 1, 0], [0, 0, 1]] }, expectedOutput: 2 },
            { input: { isConnected: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] }, expectedOutput: 3 },
            { input: { isConnected: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def find_circle_num(isConnected: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findCircleNum(isConnected) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findCircleNum(int[][] isConnected) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Number of Connected Components in an Undirected Graph',
        description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.

Return the number of connected components in the graph.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: false,
        functionName: 'count_components',
        examples: [
            { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2', explanation: '' },
            { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 2000', '1 <= edges.length <= 5000', 'edges[i].length == 2', '0 <= ai, bi < n', 'ai != bi', 'There are no repeated edges.'],
        testCases: [
            { input: { n: 5, edges: [[0, 1], [1, 2], [3, 4]] }, expectedOutput: 2 },
            { input: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]] }, expectedOutput: 1 },
            { input: { n: 4, edges: [] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def count_components(n: int, edges: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function countComponents(n, edges) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countComponents(int n, int[][] edges) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Redundant Connection',
        description: `A tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two different vertices chosen from \`1\` to \`n\`, and was not an edge that already existed.

The graph is represented as an array \`edges\` of length \`n\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between nodes \`ai\` and \`bi\` in the graph.

Return an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: true,
        functionName: 'find_redundant_connection',
        examples: [
            { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]', explanation: '' },
            { input: 'edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]', output: '[1,4]', explanation: '' },
        ],
        constraints: ['n == edges.length', '3 <= n <= 1000', 'edges[i].length == 2', '1 <= ai < bi <= edges.length', 'ai != bi', 'There are no repeated edges.', 'The given graph is connected.'],
        testCases: [
            { input: { edges: [[1, 2], [1, 3], [2, 3]] }, expectedOutput: [2, 3] },
            { input: { edges: [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]] }, expectedOutput: [1, 4] },
            { input: { edges: [[1, 2], [2, 3], [1, 3]] }, expectedOutput: [1, 3], isHidden: true },
        ],
        starterCode: {
            python: `def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findRedundantConnection(edges) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Graph Valid Tree',
        description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between nodes \`ai\` and \`bi\` in the graph.

Return \`true\` if the edges of the given graph make up a valid tree, and \`false\` otherwise.`,
        difficulty: 'hard',
        category: 'union-find',
        isPremium: true,
        functionName: 'valid_tree',
        examples: [
            { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true', explanation: '' },
            { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'edges[i].length == 2', '0 <= ai, bi < n', 'ai != bi', 'There are no self-loops or repeated edges.'],
        testCases: [
            { input: { n: 5, edges: [[0, 1], [0, 2], [0, 3], [1, 4]] }, expectedOutput: true },
            { input: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]] }, expectedOutput: false },
            { input: { n: 1, edges: [] }, expectedOutput: true },
            { input: { n: 4, edges: [[0, 1], [2, 3]] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def valid_tree(n: int, edges: list[list[int]]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function validTree(n, edges) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // TOPOLOGICAL SORT
    {
        title: 'Course Schedule',
        description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you must take course \`bi\` first if you want to take course \`ai\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
        difficulty: 'medium',
        category: 'topological-sort',
        isPremium: false,
        functionName: 'can_finish',
        examples: [
            { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: '' },
            { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', '0 <= ai, bi < numCourses', 'All the pairs prerequisites[i] are unique.'],
        testCases: [
            { input: { numCourses: 2, prerequisites: [[1, 0]] }, expectedOutput: true },
            { input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] }, expectedOutput: false },
            { input: { numCourses: 5, prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3]] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canFinish(numCourses, prerequisites) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Course Schedule II',
        description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you must take course \`bi\` first if you want to take course \`ai\`.

Return the ordering of courses you should take to finish all courses. If there are multiple valid orderings, return the lexicographically smallest one (comparing the order arrays element by element). If it is impossible to finish all courses, return an empty array.`,
        difficulty: 'medium',
        category: 'topological-sort',
        isPremium: false,
        functionName: 'find_order',
        examples: [
            { input: 'numCourses = 2, prerequisites = [[1,0]]', output: '[0,1]', explanation: '' },
            { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3]', explanation: 'Among valid orderings, this is the lexicographically smallest.' },
        ],
        constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)', 'prerequisites[i].length == 2', '0 <= ai, bi < numCourses', 'ai != bi', 'All the pairs [ai, bi] are distinct.'],
        testCases: [
            { input: { numCourses: 2, prerequisites: [[1, 0]] }, expectedOutput: [0, 1] },
            { input: { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] }, expectedOutput: [0, 1, 2, 3] },
            { input: { numCourses: 1, prerequisites: [] }, expectedOutput: [0] },
            { input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] }, expectedOutput: [], isHidden: true },
        ],
        starterCode: {
            python: `def find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findOrder(numCourses, prerequisites) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Minimum Height Trees',
        description: `A tree is an undirected graph in which any two vertices are connected by exactly one path. Given a tree of \`n\` nodes labeled from \`0\` to \`n - 1\` and an array of \`n - 1\` \`edges\`, you can choose any node of the tree as the root. When you select a node \`x\` as the root, the result tree has height \`h\`. Among all possible trees, the ones with minimum height are called minimum height trees (MHTs).

Return a list of all MHTs' root labels, sorted in ascending order.`,
        difficulty: 'hard',
        category: 'topological-sort',
        isPremium: true,
        functionName: 'find_min_height_trees',
        examples: [
            { input: 'n = 4, edges = [[1,0],[1,2],[1,3]]', output: '[1]', explanation: '' },
            { input: 'n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]', output: '[3,4]', explanation: '' },
        ],
        constraints: ['1 <= n <= 2 * 10^4', 'edges.length == n - 1', '0 <= ai, bi < n', 'ai != bi', 'All the pairs (ai, bi) are distinct.', 'The given input is guaranteed to be a tree and there will be no repeated edges.'],
        testCases: [
            { input: { n: 4, edges: [[1, 0], [1, 2], [1, 3]] }, expectedOutput: [1] },
            { input: { n: 6, edges: [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]] }, expectedOutput: [3, 4] },
            { input: { n: 1, edges: [] }, expectedOutput: [0] },
            { input: { n: 2, edges: [[0, 1]] }, expectedOutput: [0, 1], isHidden: true },
        ],
        starterCode: {
            python: `def find_min_height_trees(n: int, edges: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findMinHeightTrees(n, edges) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findMinHeightTrees(int n, int[][] edges) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Find Eventual Safe States',
        description: `There is a directed graph of \`n\` nodes with each node labeled \`0\` through \`n - 1\`. The graph is represented by a 2D array \`graph\`, where \`graph[i]\` is a list of all nodes you can visit from node \`i\` (i.e. there is a directed edge from node \`i\` to node \`j\`).

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph, sorted in ascending order.`,
        difficulty: 'hard',
        category: 'topological-sort',
        isPremium: true,
        functionName: 'eventual_safe_nodes',
        examples: [
            { input: 'graph = [[1,2],[2,3],[5],[0],[5],[],[]]', output: '[2,4,5,6]', explanation: '' },
        ],
        constraints: ['n == graph.length', '1 <= n <= 10^4', '0 <= graph[i].length <= n', '0 <= graph[i][j] <= n - 1', 'graph[i] is sorted in a strictly increasing order.', 'The graph may contain self-loops.'],
        testCases: [
            { input: { graph: [[1, 2], [2, 3], [5], [0], [5], [], []] }, expectedOutput: [2, 4, 5, 6] },
            { input: { graph: [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []] }, expectedOutput: [4] },
            { input: { graph: [[]] }, expectedOutput: [0], isHidden: true },
        ],
        starterCode: {
            python: `def eventual_safe_nodes(graph: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function eventualSafeNodes(graph) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] eventualSafeNodes(int[][] graph) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // SIMULATION
    {
        title: 'Robot Return to Origin',
        description: `There is a robot starting at position \`(0, 0)\`, the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at \`(0, 0)\` after it completes its moves.

You are given a string \`moves\` that represents the moves made by the robot where \`moves[i]\` represents its \`ith\` move. Valid moves are \`'R'\` (right), \`'L'\` (left), \`'U'\` (up), and \`'D'\` (down).

Return \`true\` if the robot returns to the origin after it finishes all of its moves, or \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'simulation',
        isPremium: false,
        functionName: 'judge_circle',
        examples: [
            { input: 'moves = "UD"', output: 'true', explanation: 'The robot moves up once, and then down once, ending at the origin.' },
            { input: 'moves = "LL"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= moves.length <= 2 * 10^4', "moves only contains the characters 'U', 'D', 'L' and 'R'."],
        testCases: [
            { input: { moves: 'UD' }, expectedOutput: true },
            { input: { moves: 'LL' }, expectedOutput: false },
            { input: { moves: 'UDLR' }, expectedOutput: true },
            { input: { moves: 'RRDD' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def judge_circle(moves: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function judgeCircle(moves) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean judgeCircle(String moves) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Game of Life',
        description: `Given the current state of an \`m x n\` grid \`board\` representing Conway's Game of Life, return the next state.

Rules:
- Any live cell (\`1\`) with fewer than two live neighbors dies.
- Any live cell with two or three live neighbors lives on.
- Any live cell with more than three live neighbors dies.
- Any dead cell (\`0\`) with exactly three live neighbors becomes a live cell.

Neighbors are the eight cells horizontally, vertically, or diagonally adjacent.`,
        difficulty: 'medium',
        category: 'simulation',
        isPremium: false,
        functionName: 'game_of_life',
        examples: [
            { input: 'board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]', output: '[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]', explanation: '' },
        ],
        constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 25', 'board[i][j] is 0 or 1.'],
        testCases: [
            { input: { board: [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]] }, expectedOutput: [[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]] },
            { input: { board: [[1, 1], [1, 0]] }, expectedOutput: [[1, 1], [1, 1]] },
            { input: { board: [[0, 0], [0, 0]] }, expectedOutput: [[0, 0], [0, 0]], isHidden: true },
        ],
        starterCode: {
            python: `def game_of_life(board: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function gameOfLife(board) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] gameOfLife(int[][] board) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Zigzag Conversion',
        description: `The string \`s\` is written in a zigzag pattern on a given number of rows, and then read line by line, left to right. Given \`s\` and the number of rows \`numRows\`, return the string read line by line.`,
        difficulty: 'medium',
        category: 'simulation',
        isPremium: true,
        functionName: 'convert',
        examples: [
            { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"', explanation: '' },
            { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"', explanation: '' },
            { input: 's = "A", numRows = 1', output: '"A"', explanation: '' },
        ],
        constraints: ["1 <= s.length <= 1000", 's consists of English letters, commas, and periods.', '1 <= numRows <= 1000'],
        testCases: [
            { input: { s: 'PAYPALISHIRING', numRows: 3 }, expectedOutput: 'PAHNAPLSIIGYIR' },
            { input: { s: 'PAYPALISHIRING', numRows: 4 }, expectedOutput: 'PINALSIGYAHRPI' },
            { input: { s: 'A', numRows: 1 }, expectedOutput: 'A' },
            { input: { s: 'AB', numRows: 1 }, expectedOutput: 'AB', isHidden: true },
        ],
        starterCode: {
            python: `def convert(s: str, numRows: int) -> str:
    # Write your solution here
    pass`,
            javascript: `function convert(s, numRows) {
    // Write your solution here
}`,
            java: `class Solution {
    public String convert(String s, int numRows) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Spiral Matrix II',
        description: `Given a positive integer \`n\`, generate an \`n x n\` matrix filled with elements from \`1\` to \`n^2\` in spiral order, and return it.`,
        difficulty: 'hard',
        category: 'simulation',
        isPremium: true,
        functionName: 'generate_matrix',
        examples: [
            { input: 'n = 3', output: '[[1,2,3],[8,9,4],[7,6,5]]', explanation: '' },
            { input: 'n = 1', output: '[[1]]', explanation: '' },
        ],
        constraints: ['1 <= n <= 20'],
        testCases: [
            { input: { n: 3 }, expectedOutput: [[1, 2, 3], [8, 9, 4], [7, 6, 5]] },
            { input: { n: 1 }, expectedOutput: [[1]] },
            { input: { n: 2 }, expectedOutput: [[1, 2], [4, 3]], isHidden: true },
        ],
        starterCode: {
            python: `def generate_matrix(n: int) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function generateMatrix(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] generateMatrix(int n) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },

    // COUNTING
    {
        title: 'Majority Element',
        description: `Given an array \`nums\` of size \`n\`, return the majority element.

The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.`,
        difficulty: 'easy',
        category: 'counting',
        isPremium: false,
        functionName: 'majority_element',
        examples: [
            { input: 'nums = [3,2,3]', output: '3', explanation: '' },
            { input: 'nums = [2,2,1,1,1,2,2]', output: '2', explanation: '' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
        testCases: [
            { input: { nums: [3, 2, 3] }, expectedOutput: 3 },
            { input: { nums: [2, 2, 1, 1, 1, 2, 2] }, expectedOutput: 2 },
            { input: { nums: [1] }, expectedOutput: 1 },
            { input: { nums: [6, 5, 5] }, expectedOutput: 5, isHidden: true },
        ],
        starterCode: {
            python: `def majority_element(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function majorityElement(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int majorityElement(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Number of Good Pairs',
        description: `Given an array of integers \`nums\`, return the number of good pairs.

A pair \`(i, j)\` is called good if \`nums[i] == nums[j]\` and \`i < j\`.`,
        difficulty: 'easy',
        category: 'counting',
        isPremium: false,
        functionName: 'num_identical_pairs',
        examples: [
            { input: 'nums = [1,2,3,1,1,3]', output: '4', explanation: 'The good pairs are (0,3), (0,4), (3,4), (2,5).' },
            { input: 'nums = [1,1,1,1]', output: '6', explanation: 'Each pair in the array is good.' },
        ],
        constraints: ['1 <= nums.length <= 100', '1 <= nums[i] <= 100'],
        testCases: [
            { input: { nums: [1, 2, 3, 1, 1, 3] }, expectedOutput: 4 },
            { input: { nums: [1, 1, 1, 1] }, expectedOutput: 6 },
            { input: { nums: [1, 2, 3] }, expectedOutput: 0 },
            { input: { nums: [1, 2, 1, 1, 2] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def num_identical_pairs(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function numIdenticalPairs(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numIdenticalPairs(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Single Number II',
        description: `Given an integer array \`nums\` where every element appears three times except for one, which appears exactly once. Find the single element and return it.`,
        difficulty: 'medium',
        category: 'counting',
        isPremium: true,
        functionName: 'single_number_ii',
        examples: [
            { input: 'nums = [2,2,3,2]', output: '3', explanation: '' },
            { input: 'nums = [0,1,0,1,0,1,99]', output: '99', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 3 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1', 'Each element in nums appears exactly three times except for one element which appears once.'],
        testCases: [
            { input: { nums: [2, 2, 3, 2] }, expectedOutput: 3 },
            { input: { nums: [0, 1, 0, 1, 0, 1, 99] }, expectedOutput: 99 },
            { input: { nums: [30000, 500, 100, 30000, 100, 30000, 100] }, expectedOutput: 500, isHidden: true },
        ],
        starterCode: {
            python: `def single_number_ii(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function singleNumberII(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int singleNumberII(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Find All Numbers Disappeared in an Array',
        description: `Given an array \`nums\` of \`n\` integers where \`nums[i]\` is in the range \`[1, n]\`, return an array of all the integers in the range \`[1, n]\` that do not appear in \`nums\`, sorted in ascending order.`,
        difficulty: 'medium',
        category: 'counting',
        isPremium: true,
        functionName: 'find_disappeared_numbers',
        examples: [
            { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]', explanation: '' },
            { input: 'nums = [1,1]', output: '[2]', explanation: '' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 10^5', '1 <= nums[i] <= n'],
        testCases: [
            { input: { nums: [4, 3, 2, 7, 8, 2, 3, 1] }, expectedOutput: [5, 6] },
            { input: { nums: [1, 1] }, expectedOutput: [2] },
            { input: { nums: [1, 2, 3] }, expectedOutput: [] },
            { input: { nums: [2, 2] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def find_disappeared_numbers(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findDisappearedNumbers(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
}`
        }
    },

    // SHORTEST PATH
    {
        title: 'Network Delay Time',
        description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (ui, vi, wi)\`, where \`ui\` is the source node, \`vi\` is the target node, and \`wi\` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node \`k\`. Return the minimum time it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.`,
        difficulty: 'medium',
        category: 'shortest-path',
        isPremium: false,
        functionName: 'network_delay_time',
        examples: [
            { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', output: '2', explanation: '' },
            { input: 'times = [[1,2,1]], n = 2, k = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= k <= n <= 100', '1 <= times.length <= 6000', 'times[i].length == 3', '1 <= ui, vi <= n', 'ui != vi', '0 <= wi <= 100', 'All the pairs (ui, vi) are unique.'],
        testCases: [
            { input: { times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 }, expectedOutput: 2 },
            { input: { times: [[1, 2, 1]], n: 2, k: 1 }, expectedOutput: 1 },
            { input: { times: [[1, 2, 1]], n: 2, k: 2 }, expectedOutput: -1, isHidden: true },
        ],
        starterCode: {
            python: `def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function networkDelayTime(times, n, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Cheapest Flights Within K Stops',
        description: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [fromi, toi, pricei]\` indicates that there is a flight from city \`fromi\` to city \`toi\` with cost \`pricei\`.

You are also given three integers \`src\`, \`dst\`, and \`k\`, return the cheapest price from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.`,
        difficulty: 'medium',
        category: 'shortest-path',
        isPremium: false,
        functionName: 'find_cheapest_price',
        examples: [
            { input: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1', output: '700', explanation: '' },
            { input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1', output: '200', explanation: '' },
        ],
        constraints: ['1 <= n <= 100', '0 <= flights.length <= (n * (n - 1) / 2)', 'flights[i].length == 3', '0 <= fromi, toi < n', 'fromi != toi', '1 <= pricei <= 10^4', '0 <= src, dst, k < n', 'src != dst'],
        testCases: [
            { input: { n: 4, flights: [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], src: 0, dst: 3, k: 1 }, expectedOutput: 700 },
            { input: { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dst: 2, k: 1 }, expectedOutput: 200 },
            { input: { n: 3, flights: [[0, 1, 100], [1, 2, 100], [0, 2, 500]], src: 0, dst: 2, k: 0 }, expectedOutput: 500, isHidden: true },
        ],
        starterCode: {
            python: `def find_cheapest_price(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function findCheapestPrice(n, flights, src, dst, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Path With Minimum Effort',
        description: `You are given \`heights\`, a 2D array of size \`rows x columns\`, where \`heights[row][col]\` represents the height of cell \`(row, col)\`. You are situated in the top-left cell, \`(0, 0)\`, and you hope to travel to the bottom-right cell, \`(rows-1, columns-1)\`. You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.`,
        difficulty: 'medium',
        category: 'shortest-path',
        isPremium: true,
        functionName: 'minimum_effort_path',
        examples: [
            { input: 'heights = [[1,2,2],[3,8,2],[5,3,5]]', output: '2', explanation: '' },
            { input: 'heights = [[1,2,3],[3,8,4],[5,3,5]]', output: '1', explanation: '' },
        ],
        constraints: ['rows == heights.length', 'columns == heights[i].length', '1 <= rows, columns <= 100', '1 <= heights[i][j] <= 10^6'],
        testCases: [
            { input: { heights: [[1, 2, 2], [3, 8, 2], [5, 3, 5]] }, expectedOutput: 2 },
            { input: { heights: [[1, 2, 3], [3, 8, 4], [5, 3, 5]] }, expectedOutput: 1 },
            { input: { heights: [[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def minimum_effort_path(heights: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minimumEffortPath(heights) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minimumEffortPath(int[][] heights) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Swim in Rising Water',
        description: `You are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at that point \`(i, j)\`. Every value is unique.

It starts raining, and water starts rising. At time \`t\`, the water level is \`t\`, meaning any cell with elevation less than or equal to \`t\` is submerged or reachable. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most \`t\`. You can swim infinite distances in zero time.

Return the least time until you can reach the bottom right square \`(n-1, n-1)\` if you start at the top left square \`(0, 0)\`.`,
        difficulty: 'hard',
        category: 'shortest-path',
        isPremium: true,
        functionName: 'swim_in_water',
        examples: [
            { input: 'grid = [[0,2],[1,3]]', output: '3', explanation: '' },
        ],
        constraints: ['n == grid.length', 'n == grid[i].length', '1 <= n <= 50', '0 <= grid[i][j] < n^2', 'Each value grid[i][j] is unique.'],
        testCases: [
            { input: { grid: [[0, 2], [1, 3]] }, expectedOutput: 3 },
            { input: { grid: [[0, 1], [2, 3]] }, expectedOutput: 3 },
            { input: { grid: [[3, 2], [0, 1]] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def swim_in_water(grid: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function swimInWater(grid) {
    // Write your solution here
}`,
            java: `class Solution {
    public int swimInWater(int[][] grid) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // NUMBER THEORY
    {
        title: 'Happy Number',
        description: `Write an algorithm to determine if a number \`n\` is happy.

A happy number is a number defined by the following process: starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals \`1\` (where it will stay), or it loops endlessly in a cycle which does not include \`1\`. Those numbers for which this process ends in \`1\` are happy.

Return \`true\` if \`n\` is a happy number, and \`false\` if not.`,
        difficulty: 'easy',
        category: 'number-theory',
        isPremium: false,
        functionName: 'is_happy',
        examples: [
            { input: 'n = 19', output: 'true', explanation: '1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1' },
            { input: 'n = 2', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= n <= 2^31 - 1'],
        testCases: [
            { input: { n: 19 }, expectedOutput: true },
            { input: { n: 2 }, expectedOutput: false },
            { input: { n: 1 }, expectedOutput: true },
            { input: { n: 7 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_happy(n: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isHappy(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isHappy(int n) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Count Primes',
        description: `Given an integer \`n\`, return the number of prime numbers that are strictly less than \`n\`.`,
        difficulty: 'medium',
        category: 'number-theory',
        isPremium: false,
        functionName: 'count_primes',
        examples: [
            { input: 'n = 10', output: '4', explanation: 'There are 4 primes less than 10: 2, 3, 5, 7.' },
            { input: 'n = 0', output: '0', explanation: '' },
        ],
        constraints: ['0 <= n <= 5 * 10^6'],
        testCases: [
            { input: { n: 10 }, expectedOutput: 4 },
            { input: { n: 0 }, expectedOutput: 0 },
            { input: { n: 1 }, expectedOutput: 0 },
            { input: { n: 100 }, expectedOutput: 25, isHidden: true },
        ],
        starterCode: {
            python: `def count_primes(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function countPrimes(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countPrimes(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Nth Ugly Number',
        description: `An ugly number is a positive integer whose prime factors are limited to \`2\`, \`3\`, and \`5\`.

Given an integer \`n\`, return the \`nth\` ugly number.`,
        difficulty: 'medium',
        category: 'number-theory',
        isPremium: true,
        functionName: 'nth_ugly_number',
        examples: [
            { input: 'n = 10', output: '12', explanation: '[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.' },
            { input: 'n = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 1690'],
        testCases: [
            { input: { n: 10 }, expectedOutput: 12 },
            { input: { n: 1 }, expectedOutput: 1 },
            { input: { n: 15 }, expectedOutput: 24, isHidden: true },
        ],
        starterCode: {
            python: `def nth_ugly_number(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function nthUglyNumber(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int nthUglyNumber(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Integer to English Words',
        description: `Convert a non-negative integer \`num\` to its English words representation.`,
        difficulty: 'hard',
        category: 'number-theory',
        isPremium: true,
        functionName: 'number_to_words',
        examples: [
            { input: 'num = 123', output: '"One Hundred Twenty Three"', explanation: '' },
            { input: 'num = 12345', output: '"Twelve Thousand Three Hundred Forty Five"', explanation: '' },
            { input: 'num = 1234567', output: '"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"', explanation: '' },
        ],
        constraints: ['0 <= num <= 2^31 - 1'],
        testCases: [
            { input: { num: 123 }, expectedOutput: 'One Hundred Twenty Three' },
            { input: { num: 12345 }, expectedOutput: 'Twelve Thousand Three Hundred Forty Five' },
            { input: { num: 1234567 }, expectedOutput: 'One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven' },
            { input: { num: 0 }, expectedOutput: 'Zero', isHidden: true },
        ],
        starterCode: {
            python: `def number_to_words(num: int) -> str:
    # Write your solution here
    pass`,
            javascript: `function numberToWords(num) {
    // Write your solution here
}`,
            java: `class Solution {
    public String numberToWords(int num) {
        // Write your solution here
        return "";
    }
}`
        }
    },

    // BITMASK
    {
        title: 'Single Number III',
        description: `Given an integer array \`nums\` in which exactly two elements appear only once and all the other elements appear exactly twice, find the two elements that appear only once. Return them sorted in ascending order.`,
        difficulty: 'medium',
        category: 'bitmask',
        isPremium: false,
        functionName: 'single_number_iii',
        examples: [
            { input: 'nums = [1,2,1,3,2,5]', output: '[3,5]', explanation: '' },
            { input: 'nums = [-1,0]', output: '[-1,0]', explanation: '' },
        ],
        constraints: ['2 <= nums.length <= 3 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1', 'Each integer in nums will appear twice, only two integers will appear once.'],
        testCases: [
            { input: { nums: [1, 2, 1, 3, 2, 5] }, expectedOutput: [3, 5] },
            { input: { nums: [-1, 0] }, expectedOutput: [-1, 0] },
            { input: { nums: [0, 1] }, expectedOutput: [0, 1] },
            { input: { nums: [4, 1, 4, 2] }, expectedOutput: [1, 2], isHidden: true },
        ],
        starterCode: {
            python: `def single_number_iii(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function singleNumberIII(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] singleNumberIII(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Partition to K Equal Sum Subsets',
        description: `Given an integer array \`nums\` and an integer \`k\`, return \`true\` if it is possible to divide this array into \`k\` non-empty subsets whose sums are all equal.`,
        difficulty: 'medium',
        category: 'bitmask',
        isPremium: false,
        functionName: 'can_partition_k_subsets',
        examples: [
            { input: 'nums = [4,3,2,3,5,2,1], k = 4', output: 'true', explanation: 'It is possible to divide it into 4 subsets (5), (1,4), (2,3), (2,3) with equal sums.' },
            { input: 'nums = [1,2,3,4], k = 3', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= k <= nums.length <= 16', '1 <= nums[i] <= 10^4', 'The frequency of each element is in the range [1, 4].'],
        testCases: [
            { input: { nums: [4, 3, 2, 3, 5, 2, 1], k: 4 }, expectedOutput: true },
            { input: { nums: [1, 2, 3, 4], k: 3 }, expectedOutput: false },
            { input: { nums: [2, 2, 2, 2, 3, 4, 5], k: 4 }, expectedOutput: false },
            { input: { nums: [1, 1, 1, 1, 2, 2, 2, 2], k: 4 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def can_partition_k_subsets(nums: list[int], k: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canPartitionKSubsets(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Shortest Path Visiting All Nodes',
        description: `You have an undirected, connected graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an array \`graph\` where \`graph[i]\` is a list of all the nodes connected with node \`i\` by an edge.

Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.`,
        difficulty: 'hard',
        category: 'bitmask',
        isPremium: true,
        functionName: 'shortest_path_length',
        examples: [
            { input: 'graph = [[1,2,3],[0],[0],[0]]', output: '4', explanation: 'One possible path is [1,0,2,0,3]' },
            { input: 'graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]', output: '4', explanation: 'One possible path is [0,1,4,2,3]' },
        ],
        constraints: ['n == graph.length', '1 <= n <= 12', '0 <= graph[i].length < n', 'graph[i] does not contain i.', 'If graph[a] contains b, then graph[b] contains a.', 'The input graph is always connected.'],
        testCases: [
            { input: { graph: [[1, 2, 3], [0], [0], [0]] }, expectedOutput: 4 },
            { input: { graph: [[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]] }, expectedOutput: 4 },
            { input: { graph: [[1], [0]] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def shortest_path_length(graph: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function shortestPathLength(graph) {
    // Write your solution here
}`,
            java: `class Solution {
    public int shortestPathLength(int[][] graph) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Minimum XOR Sum of Two Arrays',
        description: `You are given two integer arrays \`nums1\` and \`nums2\` of length \`n\`. The XOR sum of the two arrays is the sum of \`(nums1[i] XOR nums2[i])\` for all \`0 <= i < n\`.

Rearrange the elements of \`nums2\` such that the resulting XOR sum is minimized. Return the XOR sum after the rearrangement.`,
        difficulty: 'hard',
        category: 'bitmask',
        isPremium: true,
        functionName: 'minimum_xor_sum',
        examples: [
            { input: 'nums1 = [1,2], nums2 = [2,3]', output: '2', explanation: 'Rearrange nums2 so that it becomes [3,2]. Then the XOR sum is (1 XOR 3) + (2 XOR 2) = 2 + 0 = 2.' },
            { input: 'nums1 = [1,0,3], nums2 = [5,3,4]', output: '8', explanation: '' },
        ],
        constraints: ['n == nums1.length == nums2.length', '1 <= n <= 14', '0 <= nums1[i], nums2[i] <= 10^7'],
        testCases: [
            { input: { nums1: [1, 2], nums2: [2, 3] }, expectedOutput: 2 },
            { input: { nums1: [1, 0, 3], nums2: [5, 3, 4] }, expectedOutput: 8 },
            { input: { nums1: [0], nums2: [0] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def minimum_xor_sum(nums1: list[int], nums2: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minimumXorSum(nums1, nums2) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minimumXorSum(int[] nums1, int[] nums2) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // RECURSION
    {
        title: 'Fibonacci Number',
        description: `The Fibonacci numbers, commonly denoted \`F(n)\`, form a sequence such that each number is the sum of the two preceding ones, starting from \`0\` and \`1\`. That is, \`F(0) = 0\`, \`F(1) = 1\`, \`F(n) = F(n - 1) + F(n - 2)\` for \`n > 1\`.

Given \`n\`, calculate \`F(n)\`.`,
        difficulty: 'easy',
        category: 'recursion',
        isPremium: false,
        functionName: 'fib',
        examples: [
            { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.' },
            { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' },
        ],
        constraints: ['0 <= n <= 30'],
        testCases: [
            { input: { n: 2 }, expectedOutput: 1 },
            { input: { n: 3 }, expectedOutput: 2 },
            { input: { n: 4 }, expectedOutput: 3 },
            { input: { n: 10 }, expectedOutput: 55, isHidden: true },
        ],
        starterCode: {
            python: `def fib(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function fib(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int fib(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Power of Four',
        description: `Given an integer \`n\`, return \`true\` if it is a power of four. Otherwise, return \`false\`.

An integer \`n\` is a power of four, if there exists an integer \`x\` such that \`n == 4^x\`.`,
        difficulty: 'easy',
        category: 'recursion',
        isPremium: false,
        functionName: 'is_power_of_four',
        examples: [
            { input: 'n = 16', output: 'true', explanation: '' },
            { input: 'n = 5', output: 'false', explanation: '' },
            { input: 'n = 1', output: 'true', explanation: '' },
        ],
        constraints: ['-2^31 <= n <= 2^31 - 1'],
        testCases: [
            { input: { n: 16 }, expectedOutput: true },
            { input: { n: 5 }, expectedOutput: false },
            { input: { n: 1 }, expectedOutput: true },
            { input: { n: 64 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_power_of_four(n: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isPowerOfFour(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isPowerOfFour(int n) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Unique Binary Search Trees',
        description: `Given an integer \`n\`, return the number of structurally unique BST's (binary search trees) which has exactly \`n\` nodes of unique values from \`1\` to \`n\`.`,
        difficulty: 'medium',
        category: 'recursion',
        isPremium: true,
        functionName: 'num_trees',
        examples: [
            { input: 'n = 3', output: '5', explanation: '' },
            { input: 'n = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 19'],
        testCases: [
            { input: { n: 3 }, expectedOutput: 5 },
            { input: { n: 1 }, expectedOutput: 1 },
            { input: { n: 4 }, expectedOutput: 14, isHidden: true },
        ],
        starterCode: {
            python: `def num_trees(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function numTrees(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numTrees(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: "K-th Symbol in Grammar",
        description: `We build a table of \`n\` rows (1-indexed). We start by writing a \`0\` in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of \`0\` with \`01\`, and each occurrence of \`1\` with \`10\`.

Given two integers \`n\` and \`k\`, return the \`kth\` (1-indexed) symbol in the \`nth\` row of the table.`,
        difficulty: 'hard',
        category: 'recursion',
        isPremium: true,
        functionName: 'kth_grammar',
        examples: [
            { input: 'n = 1, k = 1', output: '0', explanation: '' },
            { input: 'n = 2, k = 1', output: '0', explanation: '' },
            { input: 'n = 2, k = 2', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 30', '1 <= k <= 2^(n - 1)'],
        testCases: [
            { input: { n: 1, k: 1 }, expectedOutput: 0 },
            { input: { n: 2, k: 1 }, expectedOutput: 0 },
            { input: { n: 2, k: 2 }, expectedOutput: 1 },
            { input: { n: 4, k: 5 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def kth_grammar(n: int, k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function kthGrammar(n, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int kthGrammar(int n, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // GEOMETRY
    {
        title: 'Valid Square',
        description: `Given the coordinates of four points in 2D space \`p1\`, \`p2\`, \`p3\`, and \`p4\`, return \`true\` if the four points construct a square. Each point is given as \`[x, y]\`. The order of the points is not guaranteed.`,
        difficulty: 'medium',
        category: 'geometry',
        isPremium: false,
        functionName: 'valid_square',
        examples: [
            { input: 'p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]', output: 'true', explanation: '' },
            { input: 'p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]', output: 'false', explanation: '' },
        ],
        constraints: ['p1.length == p2.length == p3.length == p4.length == 2', '-10^4 <= xi, yi <= 10^4'],
        testCases: [
            { input: { p1: [0, 0], p2: [1, 1], p3: [1, 0], p4: [0, 1] }, expectedOutput: true },
            { input: { p1: [0, 0], p2: [1, 1], p3: [1, 0], p4: [0, 12] }, expectedOutput: false },
            { input: { p1: [0, 0], p2: [0, 0], p3: [0, 0], p4: [0, 0] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def valid_square(p1: list[int], p2: list[int], p3: list[int], p4: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function validSquare(p1, p2, p3, p4) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean validSquare(int[] p1, int[] p2, int[] p3, int[] p4) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Max Points on a Line',
        description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.`,
        difficulty: 'medium',
        category: 'geometry',
        isPremium: false,
        functionName: 'max_points',
        examples: [
            { input: 'points = [[1,1],[2,2],[3,3]]', output: '3', explanation: '' },
            { input: 'points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]', output: '4', explanation: '' },
        ],
        constraints: ['1 <= points.length <= 300', 'points[i].length == 2', '-10^4 <= xi, yi <= 10^4', 'All the points are unique.'],
        testCases: [
            { input: { points: [[1, 1], [2, 2], [3, 3]] }, expectedOutput: 3 },
            { input: { points: [[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]] }, expectedOutput: 4 },
            { input: { points: [[0, 0]] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def max_points(points: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxPoints(points) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxPoints(int[][] points) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'K Closest Points to Origin',
        description: `Given an array of \`points\` where \`points[i] = [xi, yi]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

If there are ties in distance, break ties by smaller \`x\` first, then by smaller \`y\`.`,
        difficulty: 'medium',
        category: 'geometry',
        isPremium: true,
        functionName: 'k_closest',
        examples: [
            { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]', explanation: '' },
            { input: 'points = [[3,3],[5,-1],[-2,4]], k = 2', output: '[[3,3],[-2,4]]', explanation: '' },
        ],
        constraints: ['1 <= k <= points.length <= 10^4', '-10^4 <= xi, yi <= 10^4'],
        testCases: [
            { input: { points: [[1, 3], [-2, 2]], k: 1 }, expectedOutput: [[-2, 2]] },
            { input: { points: [[3, 3], [5, -1], [-2, 4]], k: 2 }, expectedOutput: [[3, 3], [-2, 4]] },
            { input: { points: [[0, 1], [1, 0]], k: 2 }, expectedOutput: [[0, 1], [1, 0]], isHidden: true },
        ],
        starterCode: {
            python: `def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function kClosest(points, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Minimum Area Rectangle',
        description: `You are given an array of points in the X-Y plane \`points\` where \`points[i] = [xi, yi]\`. Return the minimum area of a rectangle formed from these points, with sides parallel to the X and Y axes. If there is not any such rectangle, return \`0\`.`,
        difficulty: 'hard',
        category: 'geometry',
        isPremium: true,
        functionName: 'min_area_rect',
        examples: [
            { input: 'points = [[1,1],[1,3],[3,1],[3,3],[2,2]]', output: '4', explanation: '' },
            { input: 'points = [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]', output: '2', explanation: '' },
        ],
        constraints: ['1 <= points.length <= 500', '0 <= xi, yi <= 4 * 10^4', 'All the given points are unique.'],
        testCases: [
            { input: { points: [[1, 1], [1, 3], [3, 1], [3, 3], [2, 2]] }, expectedOutput: 4 },
            { input: { points: [[1, 1], [1, 3], [3, 1], [3, 3], [4, 1], [4, 3]] }, expectedOutput: 2 },
            { input: { points: [[1, 1], [1, 3], [3, 1]] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def min_area_rect(points: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minAreaRect(points) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minAreaRect(int[][] points) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // DIVIDE AND CONQUER
    {
        title: 'Different Ways to Add Parentheses',
        description: `Given a string \`expression\` of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. The results are guaranteed to fit in a 32-bit integer. Return the results sorted in ascending order.`,
        difficulty: 'medium',
        category: 'divide-and-conquer',
        isPremium: false,
        functionName: 'diff_ways_to_compute',
        examples: [
            { input: 'expression = "2-1-1"', output: '[0,2]', explanation: '(2-1)-1 = 0, 2-(1-1) = 2' },
            { input: 'expression = "2*3-4*5"', output: '[-34,-14,-10,-10,10]', explanation: '' },
        ],
        constraints: ['1 <= expression.length <= 20', 'expression consists of digits and the operators (+, -, *).', 'All the integer values in the input expression are in the range [0, 99].'],
        testCases: [
            { input: { expression: '2-1-1' }, expectedOutput: [0, 2] },
            { input: { expression: '2*3-4*5' }, expectedOutput: [-34, -14, -10, -10, 10] },
            { input: { expression: '1' }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def diff_ways_to_compute(expression: str) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function diffWaysToCompute(expression) {
    // Write your solution here
}`,
            java: `class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        // Write your solution here
        return new ArrayList<>();
    }
}`
        }
    },
    {
        title: 'Search a 2D Matrix II',
        description: `Write an efficient algorithm that searches for a value \`target\` in an \`m x n\` integer \`matrix\`. This matrix has the following properties: integers in each row are sorted in ascending order from left to right, and integers in each column are sorted in ascending order from top to bottom.

Return \`true\` if \`target\` is in the matrix, \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'divide-and-conquer',
        isPremium: false,
        functionName: 'search_matrix',
        examples: [
            { input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5', output: 'true', explanation: '' },
            { input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20', output: 'false', explanation: '' },
        ],
        constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= n, m <= 300', '-10^9 <= matrix[i][j] <= 10^9', 'All the integers in each row are sorted in ascending order.', 'All the integers in each column are sorted in ascending order.', '-10^9 <= target <= 10^9'],
        testCases: [
            { input: { matrix: [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], target: 5 }, expectedOutput: true },
            { input: { matrix: [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], target: 20 }, expectedOutput: false },
            { input: { matrix: [[1]], target: 1 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function searchMatrix(matrix, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Count of Smaller Numbers After Self',
        description: `Given an integer array \`nums\`, return an integer array \`counts\` where \`counts[i]\` is the number of smaller elements to the right of \`nums[i]\`.`,
        difficulty: 'hard',
        category: 'divide-and-conquer',
        isPremium: true,
        functionName: 'count_smaller',
        examples: [
            { input: 'nums = [5,2,6,1]', output: '[2,1,1,0]', explanation: '' },
            { input: 'nums = [-1]', output: '[0]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        testCases: [
            { input: { nums: [5, 2, 6, 1] }, expectedOutput: [2, 1, 1, 0] },
            { input: { nums: [-1] }, expectedOutput: [0] },
            { input: { nums: [-1, -1] }, expectedOutput: [0, 0] },
            { input: { nums: [2, 0, 1] }, expectedOutput: [2, 0, 0], isHidden: true },
        ],
        starterCode: {
            python: `def count_smaller(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function countSmaller(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public List<Integer> countSmaller(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }
}`
        }
    },
    {
        title: 'The Skyline Problem',
        description: `A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively, represented as a list of "key points" \`[[x1,y1],[x2,y2],...]\` sorted by x-coordinate.

Each building is given as \`buildings[i] = [lefti, righti, heighti]\` where \`lefti\` is the x coordinate of the left edge, \`righti\` is the x coordinate of the right edge, and \`heighti\` is the height. A key point is the left endpoint of a horizontal line segment where the height changes (including a final point with height 0). The final list should not have consecutive horizontal lines of the same height.`,
        difficulty: 'hard',
        category: 'divide-and-conquer',
        isPremium: true,
        functionName: 'get_skyline',
        examples: [
            { input: 'buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]', output: '[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]', explanation: '' },
        ],
        constraints: ['1 <= buildings.length <= 10^4', '0 <= lefti < righti <= 2^31 - 1', '1 <= heighti <= 2^31 - 1', 'buildings is sorted by lefti in non-decreasing order.'],
        testCases: [
            { input: { buildings: [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]] }, expectedOutput: [[2, 10], [3, 15], [7, 12], [12, 0], [15, 10], [20, 8], [24, 0]] },
            { input: { buildings: [[0, 2, 3], [2, 5, 3]] }, expectedOutput: [[0, 3], [5, 0]] },
            { input: { buildings: [[0, 1, 1]] }, expectedOutput: [[0, 1], [1, 0]], isHidden: true },
        ],
        starterCode: {
            python: `def get_skyline(buildings: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function getSkyline(buildings) {
    // Write your solution here
}`,
            java: `class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        // Write your solution here
        return new ArrayList<>();
    }
}`
        }
    },

    // GAME THEORY
    {
        title: 'Nim Game',
        description: `You are playing the following Nim Game with your friend: initially, there is a heap of stones on the table. You and your friend will alternate taking turns, and you go first. On each turn, the person whose turn it is removes 1 to 3 stones from the heap. The one who removes the last stone is the winner.

Given \`n\`, the number of stones in the heap, return \`true\` if you can win the game assuming both you and your friend play optimally, otherwise return \`false\`.`,
        difficulty: 'easy',
        category: 'game-theory',
        isPremium: false,
        functionName: 'can_win_nim',
        examples: [
            { input: 'n = 4', output: 'false', explanation: 'No matter which move you make, your friend can always make the right choice and eventually win.' },
            { input: 'n = 1', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= n <= 2^31 - 1'],
        testCases: [
            { input: { n: 4 }, expectedOutput: false },
            { input: { n: 1 }, expectedOutput: true },
            { input: { n: 2 }, expectedOutput: true },
            { input: { n: 8 }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def can_win_nim(n: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canWinNim(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canWinNim(int n) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Predict the Winner',
        description: `You are given an integer array \`nums\`. Two players are playing a game with this array: player 1 and player 2. Player 1 and player 2 take turns, with player 1 starting first. Both players start the game with a score of 0. At each turn, the player takes one of the numbers from either end of the array, which reduces the size of the array by 1. The player adds the chosen number to their score.

Return \`true\` if Player 1 can win the game. If the scores of both players are equal, player 1 is still the winner, and you should return \`true\`. Assume both players play optimally.`,
        difficulty: 'medium',
        category: 'game-theory',
        isPremium: false,
        functionName: 'predict_the_winner',
        examples: [
            { input: 'nums = [1,5,2]', output: 'false', explanation: '' },
            { input: 'nums = [1,5,233,7]', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 20', '0 <= nums[i] <= 10^7'],
        testCases: [
            { input: { nums: [1, 5, 2] }, expectedOutput: false },
            { input: { nums: [1, 5, 233, 7] }, expectedOutput: true },
            { input: { nums: [1] }, expectedOutput: true },
            { input: { nums: [20, 30, 1] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def predict_the_winner(nums: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function predictTheWinner(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean predictTheWinner(int[] nums) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Flip Game II',
        description: `You are playing a Flip Game with your friend. You are given a string \`currentState\` that contains only \`'+'\` and \`'-'\`. You and your friend take turns to flip two consecutive \`"++"\` into \`"--"\`. The game ends when a person can no longer make a move, and therefore the other person will be the winner.

Return \`true\` if the starting player can guarantee a win, and \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'game-theory',
        isPremium: true,
        functionName: 'can_win',
        examples: [
            { input: 'currentState = "++++"', output: 'true', explanation: "The starting player can guarantee a win by flipping the middle \"++\" to become \"+--+\"." },
            { input: 'currentState = "+"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= currentState.length <= 60', "currentState[i] is either '+' or '-'."],
        testCases: [
            { input: { currentState: '++++' }, expectedOutput: true },
            { input: { currentState: '+' }, expectedOutput: false },
            { input: { currentState: '+++' }, expectedOutput: true },
            { input: { currentState: '--' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def can_win(currentState: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canWin(currentState) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canWin(String currentState) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Can I Win',
        description: `In the "100 game," two players take turns adding, to a running total, integers from \`1\` to \`maxChoosableInteger\` without reusing integers already chosen. The player who first causes the running total to reach or exceed \`desiredTotal\` wins.

Given two integers \`maxChoosableInteger\` and \`desiredTotal\`, return \`true\` if the first player to move can force a win, otherwise return \`false\`. Assume both players play optimally.`,
        difficulty: 'hard',
        category: 'game-theory',
        isPremium: true,
        functionName: 'can_i_win',
        examples: [
            { input: 'maxChoosableInteger = 10, desiredTotal = 11', output: 'false', explanation: 'No matter which number the first player chooses, the first player will lose.' },
            { input: 'maxChoosableInteger = 10, desiredTotal = 0', output: 'true', explanation: '' },
            { input: 'maxChoosableInteger = 10, desiredTotal = 1', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= maxChoosableInteger <= 20', '0 <= desiredTotal <= 300'],
        testCases: [
            { input: { maxChoosableInteger: 10, desiredTotal: 11 }, expectedOutput: false },
            { input: { maxChoosableInteger: 10, desiredTotal: 0 }, expectedOutput: true },
            { input: { maxChoosableInteger: 10, desiredTotal: 1 }, expectedOutput: true },
            { input: { maxChoosableInteger: 5, desiredTotal: 50 }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def can_i_win(maxChoosableInteger: int, desiredTotal: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canIWin(maxChoosableInteger, desiredTotal) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canIWin(int maxChoosableInteger, int desiredTotal) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Reverse Linked List',
        description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list's head.`,
        difficulty: 'easy',
        category: 'linked-list',
        isPremium: false,
        functionName: 'reverse_list',
        listNodeParams: ['head'],
        returnsListNode: true,
        examples: [
            { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: '' },
            { input: 'head = [1,2]', output: '[2,1]', explanation: '' },
            { input: 'head = []', output: '[]', explanation: '' },
        ],
        constraints: ['The number of nodes in the list is in the range [0, 5000].', '-5000 <= Node.val <= 5000'],
        testCases: [
            { input: { head: [1, 2, 3, 4, 5] }, expectedOutput: [5, 4, 3, 2, 1] },
            { input: { head: [1, 2] }, expectedOutput: [2, 1] },
            { input: { head: [] }, expectedOutput: [] },
            { input: { head: [1] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function reverseList(head) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Merge Two Sorted Lists',
        description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
        difficulty: 'easy',
        category: 'linked-list',
        isPremium: false,
        functionName: 'merge_two_lists',
        listNodeParams: ['list1', 'list2'],
        returnsListNode: true,
        examples: [
            { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: '' },
            { input: 'list1 = [], list2 = []', output: '[]', explanation: '' },
            { input: 'list1 = [], list2 = [0]', output: '[0]', explanation: '' },
        ],
        constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
        testCases: [
            { input: { list1: [1, 2, 4], list2: [1, 3, 4] }, expectedOutput: [1, 1, 2, 3, 4, 4] },
            { input: { list1: [], list2: [] }, expectedOutput: [] },
            { input: { list1: [], list2: [0] }, expectedOutput: [0] },
            { input: { list1: [1, 2, 3], list2: [] }, expectedOutput: [1, 2, 3], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1: ListNode, list2: ListNode) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function mergeTwoLists(list1, list2) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Remove Nth Node From End of List',
        description: `Given the \`head\` of a linked list, remove the \`n\`th node from the end of the list and return its head.`,
        difficulty: 'medium',
        category: 'linked-list',
        isPremium: true,
        functionName: 'remove_nth_from_end',
        listNodeParams: ['head'],
        returnsListNode: true,
        examples: [
            { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: '' },
            { input: 'head = [1], n = 1', output: '[]', explanation: '' },
            { input: 'head = [1,2], n = 1', output: '[1]', explanation: '' },
        ],
        constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
        testCases: [
            { input: { head: [1, 2, 3, 4, 5], n: 2 }, expectedOutput: [1, 2, 3, 5] },
            { input: { head: [1], n: 1 }, expectedOutput: [] },
            { input: { head: [1, 2], n: 1 }, expectedOutput: [1] },
            { input: { head: [1, 2, 3, 4, 5], n: 5 }, expectedOutput: [2, 3, 4, 5], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head: ListNode, n: int) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function removeNthFromEnd(head, n) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Reorder List',
        description: `You are given the head of a singly linked list. The list can be represented as:

\`L0 -> L1 -> ... -> Ln-1 -> Ln\`

Reorder the list to be on the following form:

\`L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed. Modify \`head\` in place, and also return \`head\`.`,
        difficulty: 'hard',
        category: 'linked-list',
        isPremium: true,
        functionName: 'reorder_list',
        listNodeParams: ['head'],
        returnsListNode: true,
        examples: [
            { input: 'head = [1,2,3,4]', output: '[1,4,2,3]', explanation: '' },
            { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]', explanation: '' },
        ],
        constraints: ['The number of nodes in the list is in the range [1, 5 * 10^4].', '1 <= Node.val <= 1000'],
        testCases: [
            { input: { head: [1, 2, 3, 4] }, expectedOutput: [1, 4, 2, 3] },
            { input: { head: [1, 2, 3, 4, 5] }, expectedOutput: [1, 5, 2, 4, 3] },
            { input: { head: [1, 2] }, expectedOutput: [1, 2], isHidden: true },
            { input: { head: [1] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reorder_list(head: ListNode) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function reorderList(head) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reorderList(ListNode head) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Implement Trie (Prefix Tree)',
        description: `A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the \`Trie\` class:
- \`Trie()\` Initializes the trie object.
- \`insert(String word)\` Inserts the string \`word\` into the trie.
- \`search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'trie',
        isPremium: false,
        functionName: 'Trie',
        executionType: 'multi-call',
        examples: [
            { input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', output: '[null,null,true,false,true,null,true]', explanation: '' },
        ],
        constraints: ['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters.', 'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'],
        testCases: [
            {
                input: {
                    operations: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
                    args: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']]
                },
                expectedOutput: [null, null, true, false, true, null, true]
            },
        ],
        starterCode: {
            python: `class Trie:
    def __init__(self):
        # Write your solution here
        pass

    def insert(self, word: str) -> None:
        # Write your solution here
        pass

    def search(self, word: str) -> bool:
        # Write your solution here
        pass

    def starts_with(self, prefix: str) -> bool:
        # Write your solution here
        pass`,
            javascript: `class Trie {
    constructor() {
        // Write your solution here
    }

    insert(word) {
        // Write your solution here
    }

    search(word) {
        // Write your solution here
    }

    startsWith(prefix) {
        // Write your solution here
    }
}`,
            java: `class Trie {
    public Trie() {
        // Write your solution here
    }

    public void insert(String word) {
        // Write your solution here
    }

    public boolean search(String word) {
        // Write your solution here
        return false;
    }

    public boolean startsWith(String prefix) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Longest Word in Dictionary',
        description: `Given an array of strings \`words\` representing an English dictionary, return the longest word in \`words\` that can be built one character at a time by other words in \`words\`.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string \`""\`.

Note that the word should be built from left to right, with each additional character added to the end of a previous word — every prefix of the returned word (including the word itself) must also appear in \`words\`.`,
        difficulty: 'medium',
        category: 'trie',
        isPremium: false,
        functionName: 'longest_word',
        examples: [
            { input: 'words = ["w","wo","wor","worl","world"]', output: '"world"', explanation: 'The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".' },
            { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"', explanation: '' },
        ],
        constraints: ['1 <= words.length <= 1000', '1 <= words[i].length <= 30', 'words[i] consists of lowercase English letters.'],
        testCases: [
            { input: { words: ['w', 'wo', 'wor', 'worl', 'world'] }, expectedOutput: 'world' },
            { input: { words: ['a', 'banana', 'app', 'appl', 'ap', 'apply', 'apple'] }, expectedOutput: 'apple' },
            { input: { words: ['yo', 'ew', 'fc', 'zrc', 'yodn', 'fcm', 'qm', 'qmo', 'fcmz', 'z', 'ewq', 'yod', 'ewqz', 'y'] }, expectedOutput: 'yodn' },
            { input: { words: ['a'] }, expectedOutput: 'a', isHidden: true },
        ],
        starterCode: {
            python: `def longest_word(words: list[str]) -> str:
    # Write your solution here
    pass`,
            javascript: `function longestWord(words) {
    // Write your solution here
}`,
            java: `class Solution {
    public String longestWord(String[] words) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Design Add and Search Words Data Structure',
        description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` Initializes the object.
- \`addWord(word)\` Adds \`word\` to the data structure, it can be matched later.
- \`search(word)\` Returns \`true\` if there is any string in the data structure that matches \`word\` or \`false\` otherwise. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.`,
        difficulty: 'medium',
        category: 'trie',
        isPremium: true,
        functionName: 'WordDictionary',
        executionType: 'multi-call',
        examples: [
            { input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', output: '[null,null,null,null,false,true,true,true]', explanation: '' },
        ],
        constraints: ['1 <= word.length <= 25', 'word in addWord consists of lowercase English letters.', 'word in search consists of "." or lowercase English letters.', 'At most 10^4 calls will be made to addWord and search.'],
        testCases: [
            {
                input: {
                    operations: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
                    args: [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']]
                },
                expectedOutput: [null, null, null, null, false, true, true, true]
            },
        ],
        starterCode: {
            python: `class WordDictionary:
    def __init__(self):
        # Write your solution here
        pass

    def add_word(self, word: str) -> None:
        # Write your solution here
        pass

    def search(self, word: str) -> bool:
        # Write your solution here
        pass`,
            javascript: `class WordDictionary {
    constructor() {
        // Write your solution here
    }

    addWord(word) {
        // Write your solution here
    }

    search(word) {
        // Write your solution here
    }
}`,
            java: `class WordDictionary {
    public WordDictionary() {
        // Write your solution here
    }

    public void addWord(String word) {
        // Write your solution here
    }

    public boolean search(String word) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Replace Words',
        description: `In English, we have a concept called **root**, which can be followed by some other word to form another longer word - let's call this word **successor**. For example, when the root \`"an"\` is followed by the successor word \`"other"\`, we can form a new word \`"another"\`.

Given a \`dictionary\` consisting of many roots and a \`sentence\` consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.

Return the \`sentence\` after the replacement.`,
        difficulty: 'medium',
        category: 'trie',
        isPremium: true,
        functionName: 'replace_words',
        examples: [
            { input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"', output: '"the cat was rat by the bat"', explanation: '' },
            { input: 'dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"', output: '"a a b c"', explanation: '' },
        ],
        constraints: ['1 <= dictionary.length <= 1000', '1 <= dictionary[i].length <= 100', 'dictionary[i] consists of only lowercase letters.', '1 <= sentence.length <= 10^6', 'sentence consists of only lowercase letters and spaces.'],
        testCases: [
            { input: { dictionary: ['cat', 'bat', 'rat'], sentence: 'the cattle was rattled by the battery' }, expectedOutput: 'the cat was rat by the bat' },
            { input: { dictionary: ['a', 'b', 'c'], sentence: 'aadsfasf absbs bbab cadsfafs' }, expectedOutput: 'a a b c' },
            { input: { dictionary: ['a', 'aa', 'aaa', 'aaaa'], sentence: 'a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa' }, expectedOutput: 'a a a a a a a a bbb baba a', isHidden: true },
        ],
        starterCode: {
            python: `def replace_words(dictionary: list[str], sentence: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function replaceWords(dictionary, sentence) {
    // Write your solution here
}`,
            java: `class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Design a Flatten 2D Vector',
        description: `Design an iterator to flatten a 2D vector. It should support the \`next\` and \`hasNext\` operations.

Implement the \`Vector2D\` class:
- \`Vector2D(int[][] vec)\` initializes the object with the 2D vector \`vec\`.
- \`next()\` returns the next element from the 2D vector and moves the pointer one step forward. You may assume that all the calls to \`next\` are valid.
- \`hasNext()\` returns \`true\` if there are still some elements in the vector, and \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: false,
        functionName: 'Vector2D',
        executionType: 'multi-call',
        examples: [
            { input: '["Vector2D","next","next","next","hasNext","hasNext","next","hasNext"]\n[[[[1,2],[3],[4]]],[],[],[],[],[],[],[]]', output: '[null,1,2,3,true,true,4,false]', explanation: '' },
        ],
        constraints: ['0 <= vec.length <= 200', '0 <= vec[i].length <= 500', '-500 <= vec[i][j] <= 500', 'At most 10^5 calls will be made to next and hasNext.'],
        testCases: [
            {
                input: {
                    operations: ['Vector2D', 'next', 'next', 'next', 'hasNext', 'hasNext', 'next', 'hasNext'],
                    args: [[[[1, 2], [3], [4]]], [], [], [], [], [], [], []]
                },
                expectedOutput: [null, 1, 2, 3, true, true, 4, false]
            },
        ],
        starterCode: {
            python: `class Vector2D:
    def __init__(self, vec: list[list[int]]):
        # Write your solution here
        pass

    def next(self) -> int:
        # Write your solution here
        pass

    def has_next(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class Vector2D {
    constructor(vec) {
        // Write your solution here
    }

    next() {
        // Write your solution here
    }

    hasNext() {
        // Write your solution here
    }
}`,
            java: `class Vector2D {
    public Vector2D(int[][] vec) {
        // Write your solution here
    }

    public int next() {
        // Write your solution here
        return 0;
    }

    public boolean hasNext() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Peeking Iterator',
        description: `Design an iterator that supports the \`peek\` operation on an existing array-based iterator in addition to the \`hasNext\` and the \`next\` operations.

Implement the \`PeekingIterator\` class:
- \`PeekingIterator(int[] nums)\` Initializes the object with the given integer array \`nums\`.
- \`next()\` Returns the next element in the array and moves the pointer to the next element.
- \`hasNext()\` Returns \`true\` if there are still elements in the array.
- \`peek()\` Returns the next element in the array **without** moving the pointer.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: false,
        functionName: 'PeekingIterator',
        executionType: 'multi-call',
        examples: [
            { input: '["PeekingIterator","peek","next","next","hasNext","next","hasNext"]\n[[[1,2,3]],[],[],[],[],[],[]]', output: '[null,1,1,2,true,3,false]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 1000', '1 <= nums[i] <= 1000', 'All calls to next and peek are valid.', 'At most 1000 calls will be made to next, hasNext, and peek.'],
        testCases: [
            {
                input: {
                    operations: ['PeekingIterator', 'peek', 'next', 'next', 'hasNext', 'next', 'hasNext'],
                    args: [[[1, 2, 3]], [], [], [], [], [], []]
                },
                expectedOutput: [null, 1, 1, 2, true, 3, false]
            },
        ],
        starterCode: {
            python: `class PeekingIterator:
    def __init__(self, nums: list[int]):
        # Write your solution here
        pass

    def peek(self) -> int:
        # Write your solution here
        pass

    def next(self) -> int:
        # Write your solution here
        pass

    def has_next(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class PeekingIterator {
    constructor(nums) {
        // Write your solution here
    }

    peek() {
        // Write your solution here
    }

    next() {
        // Write your solution here
    }

    hasNext() {
        // Write your solution here
    }
}`,
            java: `class PeekingIterator {
    public PeekingIterator(int[] nums) {
        // Write your solution here
    }

    public int peek() {
        // Write your solution here
        return 0;
    }

    public int next() {
        // Write your solution here
        return 0;
    }

    public boolean hasNext() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Zigzag Iterator',
        description: `Given two integer arrays \`v1\` and \`v2\`, implement an iterator to return their elements alternately.

Implement the \`ZigzagIterator\` class:
- \`ZigzagIterator(int[] v1, int[] v2)\` initializes the object with the two arrays \`v1\` and \`v2\`.
- \`next()\` returns the current element of the iterator and moves the pointer to the next element.
- \`hasNext()\` returns \`true\` if the iterator still has elements, and \`false\` otherwise.

If both arrays are non-empty, the returned sequence should alternate between an element from \`v1\` and an element from \`v2\`. Once one array is exhausted, continue returning the remaining elements of the other array in order.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: true,
        functionName: 'ZigzagIterator',
        executionType: 'multi-call',
        examples: [
            { input: 'v1 = [1,2], v2 = [3,4,5,6]', output: '[1,3,2,4,5,6]', explanation: 'By calling next repeatedly until hasNext returns false.' },
        ],
        constraints: ['0 <= v1.length, v2.length <= 1000', '1 <= v1.length + v2.length <= 2000', '-2^31 <= v1[i], v2[i] <= 2^31 - 1'],
        testCases: [
            {
                input: {
                    operations: ['ZigzagIterator', 'next', 'next', 'next', 'next', 'next', 'next', 'hasNext'],
                    args: [[[1, 2], [3, 4, 5, 6]], [], [], [], [], [], [], []]
                },
                expectedOutput: [null, 1, 3, 2, 4, 5, 6, false]
            },
        ],
        starterCode: {
            python: `class ZigzagIterator:
    def __init__(self, v1: list[int], v2: list[int]):
        # Write your solution here
        pass

    def next(self) -> int:
        # Write your solution here
        pass

    def has_next(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class ZigzagIterator {
    constructor(v1, v2) {
        // Write your solution here
    }

    next() {
        // Write your solution here
    }

    hasNext() {
        // Write your solution here
    }
}`,
            java: `class ZigzagIterator {
    public ZigzagIterator(int[] v1, int[] v2) {
        // Write your solution here
    }

    public int next() {
        // Write your solution here
        return 0;
    }

    public boolean hasNext() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Flatten Nested List Iterator',
        description: `You are given a nested list of integers \`nestedList\`. Each element is either an integer, or a list whose elements may also be integers or other lists (i.e. it can be arbitrarily nested).

Implement an iterator to flatten it. In this simplified representation, \`nestedList\` is passed directly as nested arrays — an element is either an integer or another array of elements (no wrapper type).

Implement the \`NestedIterator\` class:
- \`NestedIterator(nestedList)\` Initializes the iterator with the nested list \`nestedList\`.
- \`next()\` Returns the next integer in the nested list, in flattened left-to-right order.
- \`hasNext()\` Returns \`true\` if there are still elements left, and \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: true,
        functionName: 'NestedIterator',
        executionType: 'multi-call',
        examples: [
            { input: 'nestedList = [[1,1],2,[1,1]]', output: '[1,1,2,1,1]', explanation: 'By repeatedly calling next while hasNext returns true.' },
            { input: 'nestedList = [1,[4,[6]]]', output: '[1,4,6]', explanation: '' },
        ],
        constraints: ['1 <= nestedList.length <= 500', 'The values of the integers in the nested list is in the range [-10^6, 10^6].'],
        testCases: [
            {
                input: {
                    operations: ['NestedIterator', 'next', 'next', 'next', 'next', 'next', 'hasNext'],
                    args: [[[[1, 1], 2, [1, 1]]], [], [], [], [], [], []]
                },
                expectedOutput: [null, 1, 1, 2, 1, 1, false]
            },
            {
                input: {
                    operations: ['NestedIterator', 'next', 'next', 'next', 'hasNext'],
                    args: [[[1, [4, [6]]]], [], [], [], []]
                },
                expectedOutput: [null, 1, 4, 6, false],
                isHidden: true
            },
        ],
        starterCode: {
            python: `class NestedIterator:
    def __init__(self, nestedList: list):
        # Write your solution here
        # Each element of nestedList is either an int or a (possibly nested) list.
        pass

    def next(self) -> int:
        # Write your solution here
        pass

    def has_next(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class NestedIterator {
    constructor(nestedList) {
        // Write your solution here
        // Each element of nestedList is either a number or a (possibly nested) array.
    }

    next() {
        // Write your solution here
    }

    hasNext() {
        // Write your solution here
    }
}`,
            java: `class NestedIterator {
    // Each element of nestedList is either an Integer or a (possibly nested) List<Object>.
    public NestedIterator(List<Object> nestedList) {
        // Write your solution here
    }

    public Integer next() {
        // Write your solution here
        return 0;
    }

    public boolean hasNext() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Guess Number Higher or Lower',
        description: `We are playing the Guess Game. The game is as follows:

I pick a number from \`1\` to \`n\`. You have to guess which number I picked.

Every time you guess wrong, you'll be told whether the number I picked is higher or lower than your guess.

You call a pre-defined API \`int guess(int num)\`, which returns three possible results:
- \`-1\`: Your guess is higher than the number I picked (i.e. \`num > pick\`).
- \`1\`: Your guess is lower than the number I picked (i.e. \`num < pick\`).
- \`0\`: your guess is equal to the number I picked (i.e. \`num == pick\`).

Return the number that I picked.`,
        difficulty: 'easy',
        category: 'interactive',
        isPremium: false,
        functionName: 'guess_number',
        executionType: 'interactive',
        interactiveSecretKeys: ['secret'],
        examples: [
            { input: 'n = 10, pick = 6', output: '6', explanation: '' },
            { input: 'n = 1, pick = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 2^31 - 1', '1 <= pick <= n'],
        testCases: [
            { input: { n: 10, secret: 6 }, expectedOutput: 6 },
            { input: { n: 1, secret: 1 }, expectedOutput: 1 },
            { input: { n: 2126753390, secret: 1702766719 }, expectedOutput: 1702766719 },
            { input: { n: 100, secret: 1 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def guess_number(n: int) -> int:
    # You may call guess(num) to compare num against the secretly picked number.
    # It returns -1 if num is too high, 1 if num is too low, 0 if num is correct.
    # Write your solution here
    pass`,
            javascript: `function guessNumber(n) {
    // You may call guess(num) to compare num against the secretly picked number.
    // It returns -1 if num is too high, 1 if num is too low, 0 if num is correct.
    // Write your solution here
}`,
            java: `class Solution {
    public int guessNumber(int n) {
        // You may call Judge.guess(num) to compare num against the secretly picked
        // number. It returns -1 if num is too high, 1 if num is too low, 0 if correct.
        // Write your solution here
        return -1;
    }
}`
        },
        customDriver: {
            python: `def guess(num):
    secret = data["secret"]
    if num == secret:
        return 0
    return 1 if num < secret else -1`,
            javascript: `function guess(num) {
    const secret = data.secret;
    if (num === secret) return 0;
    return num < secret ? 1 : -1;
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static int guess(int num) {
        int secret = ((Number) data.get("secret")).intValue();
        if (num == secret) return 0;
        return num < secret ? 1 : -1;
    }
}`
        }
    },
    {
        title: 'First Bad Version',
        description: `You are a product manager and currently leading a team to develop a new product. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have \`n\` versions \`[1, 2, ..., n]\` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API \`bool isBadVersion(version)\` which returns whether \`version\` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.`,
        difficulty: 'easy',
        category: 'interactive',
        isPremium: false,
        functionName: 'first_bad_version',
        executionType: 'interactive',
        interactiveSecretKeys: ['bad'],
        examples: [
            { input: 'n = 5, bad = 4', output: '4', explanation: 'call isBadVersion(3) -> false; call isBadVersion(5) -> true; call isBadVersion(4) -> true. So 4 is the first bad version.' },
            { input: 'n = 1, bad = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= bad <= n <= 2^31 - 1'],
        testCases: [
            { input: { n: 5, bad: 4 }, expectedOutput: 4 },
            { input: { n: 1, bad: 1 }, expectedOutput: 1 },
            { input: { n: 2126753390, bad: 1702766719 }, expectedOutput: 1702766719 },
            { input: { n: 10, bad: 1 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def first_bad_version(n: int) -> int:
    # You may call is_bad_version(version) to check whether a version is bad.
    # Write your solution here
    pass`,
            javascript: `function firstBadVersion(n) {
    // You may call isBadVersion(version) to check whether a version is bad.
    // Write your solution here
}`,
            java: `class Solution {
    public int firstBadVersion(int n) {
        // You may call Judge.isBadVersion(version) to check whether a version is bad.
        // Write your solution here
        return 1;
    }
}`
        },
        customDriver: {
            python: `def is_bad_version(version):
    return version >= data["bad"]`,
            javascript: `function isBadVersion(version) {
    return version >= data.bad;
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static boolean isBadVersion(int version) {
        return version >= ((Number) data.get("bad")).intValue();
    }
}`
        }
    },
    {
        title: 'Find Positive Integer Solution for a Given Equation',
        description: `Given a callable function \`f(x, y)\` and a target integer \`z\`, find all pairs of positive integers \`x\` and \`y\` such that \`f(x, y) == z\`, where \`1 <= x, y <= 1000\`.

For this problem, \`f\` is implemented as \`f(x, y) = x + y\` — but treat it as a black box: only call \`f\`, don't assume you know its formula.

Return the pairs sorted in **ascending order of x** as a list of \`[x, y]\` pairs. It is guaranteed that \`f\` is monotonically increasing in both \`x\` and \`y\`.`,
        difficulty: 'medium',
        category: 'interactive',
        isPremium: true,
        functionName: 'find_solution',
        executionType: 'interactive',
        examples: [
            { input: 'z = 5 (f(x,y) = x + y)', output: '[[1,4],[2,3],[3,2],[4,1]]', explanation: '' },
            { input: 'z = 2 (f(x,y) = x + y)', output: '[[1,1]]', explanation: '' },
        ],
        constraints: ['1 <= function_id <= 9', '1 <= z <= 100', 'It is guaranteed that the values of x and y are in the range [1, 1000].'],
        testCases: [
            { input: { z: 5 }, expectedOutput: [[1, 4], [2, 3], [3, 2], [4, 1]] },
            { input: { z: 2 }, expectedOutput: [[1, 1]] },
            { input: { z: 3 }, expectedOutput: [[1, 2], [2, 1]], isHidden: true },
        ],
        starterCode: {
            python: `def find_solution(z: int) -> list[list[int]]:
    # You may call f(x, y) to evaluate the black-box function.
    # Write your solution here
    pass`,
            javascript: `function findSolution(z) {
    // You may call f(x, y) to evaluate the black-box function.
    // Write your solution here
}`,
            java: `class Solution {
    public List<List<Integer>> findSolution(int z) {
        // You may call Judge.f(x, y) to evaluate the black-box function.
        // Write your solution here
        return new ArrayList<>();
    }
}`
        },
        customDriver: {
            python: `def f(x, y):
    return x + y`,
            javascript: `function f(x, y) {
    return x + y;
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static int f(int x, int y) {
        return x + y;
    }
}`
        }
    },
    {
        title: 'Leftmost Column with at Least a One',
        description: `A row-sorted binary matrix means that all elements are \`0\` or \`1\` and each row of the matrix is sorted in non-decreasing order.

Given a row-sorted binary matrix, return the index (0-indexed) of the **leftmost column** with at least a \`1\` in it. If such an index does not exist, return \`-1\`.

You are given access to the matrix only through two API calls:
- \`get(row, col)\` returns the element of the matrix at index \`(row, col)\` (0-indexed).
- \`dimensions()\` returns a list of 2 elements: \`[rows, cols]\`, indicating the number of rows and columns.

You should minimize the number of calls to \`get\` and \`dimensions\`.`,
        difficulty: 'medium',
        category: 'interactive',
        isPremium: true,
        functionName: 'leftmost_column_with_one',
        executionType: 'interactive',
        interactiveSecretKeys: ['mat'],
        examples: [
            { input: 'mat = [[0,0],[1,1]]', output: '0', explanation: '' },
            { input: 'mat = [[0,0],[0,1]]', output: '1', explanation: '' },
            { input: 'mat = [[0,0],[0,0]]', output: '-1', explanation: '' },
        ],
        constraints: ['rows == mat.length', 'cols == mat[i].length', '1 <= rows, cols <= 100', 'mat[i][j] is either 0 or 1.', 'mat[i] is sorted in non-decreasing order.'],
        testCases: [
            { input: { mat: [[0, 0], [1, 1]] }, expectedOutput: 0 },
            { input: { mat: [[0, 0], [0, 1]] }, expectedOutput: 1 },
            { input: { mat: [[0, 0], [0, 0]] }, expectedOutput: -1 },
            { input: { mat: [[1]] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def leftmost_column_with_one() -> int:
    # You may call get(row, col) and dimensions() to inspect the hidden matrix.
    # Write your solution here
    pass`,
            javascript: `function leftmostColumnWithOne() {
    // You may call get(row, col) and dimensions() to inspect the hidden matrix.
    // Write your solution here
}`,
            java: `class Solution {
    public int leftmostColumnWithOne() {
        // You may call Judge.get(row, col) and Judge.dimensions() to inspect the
        // hidden matrix.
        // Write your solution here
        return -1;
    }
}`
        },
        customDriver: {
            python: `def get(row, col):
    return data["mat"][row][col]

def dimensions():
    mat = data["mat"]
    return [len(mat), len(mat[0])]`,
            javascript: `function get(row, col) {
    return data.mat[row][col];
}
function dimensions() {
    return [data.mat.length, data.mat[0].length];
}`,
            java: `class Judge {
    static Map<String,Object> data;
    @SuppressWarnings("unchecked")
    static int get(int row, int col) {
        List<Object> mat = (List<Object>) data.get("mat");
        List<Object> r = (List<Object>) mat.get(row);
        return ((Number) r.get(col)).intValue();
    }
    @SuppressWarnings("unchecked")
    static int[] dimensions() {
        List<Object> mat = (List<Object>) data.get("mat");
        List<Object> r0 = (List<Object>) mat.get(0);
        return new int[]{mat.size(), r0.size()};
    }
}`
        }
    },
    {
        title: 'Print in Order',
        description: `Suppose we have a class \`Foo\` with three methods: \`first\`, \`second\`, and \`third\`. The same instance of \`Foo\` will be passed to three different threads. Thread A will call \`first()\`, thread B will call \`second()\`, and thread C will call \`third()\`. Design a mechanism so that \`second()\` is executed after \`first()\`, and \`third()\` is executed after \`second()\`, regardless of the order in which the three threads are started.`,
        difficulty: 'easy',
        category: 'concurrency',
        isPremium: false,
        functionName: 'Foo',
        executionType: 'concurrent',
        examples: [
            { input: 'threads = [1,2,3] (call order: second, first, third)', output: '"firstsecondthird"', explanation: 'Regardless of the order the threads are started in, first() must run before second(), and second() before third().' },
        ],
        constraints: ['The input is only used to initialize the three threads.', 'You may modify the class as you see fit, but the three methods must get invoked as described.'],
        testCases: [
            { input: {}, expectedOutput: 'firstsecondthird' },
        ],
        starterCode: {
            python: `class Foo:
    def __init__(self):
        # Write your solution here
        pass

    def first(self, print_first) -> None:
        # print_first() outputs "first". Do not change or remove this line.
        print_first()

    def second(self, print_second) -> None:
        # print_second() outputs "second". Do not change or remove this line.
        print_second()

    def third(self, print_third) -> None:
        # print_third() outputs "third". Do not change or remove this line.
        print_third()`,
            javascript: `class Foo {
    constructor() {
        // Write your solution here
    }

    first(printFirst) {
        // printFirst() outputs "first". Do not change or remove this line.
        printFirst();
    }

    second(printSecond) {
        // printSecond() outputs "second". Do not change or remove this line.
        printSecond();
    }

    third(printThird) {
        // printThird() outputs "third". Do not change or remove this line.
        printThird();
    }
}`,
            java: `class Foo {
    public Foo() {
        // Write your solution here
    }

    public void first(Runnable printFirst) throws InterruptedException {
        // printFirst.run() outputs "first". Do not change or remove this line.
        printFirst.run();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        // printSecond.run() outputs "second". Do not change or remove this line.
        printSecond.run();
    }

    public void third(Runnable printThird) throws InterruptedException {
        // printThird.run() outputs "third". Do not change or remove this line.
        printThird.run();
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())

output = []
lock = threading.Lock()
foo = Foo()

def print_first():
    with lock: output.append("first")

def print_second():
    with lock: output.append("second")

def print_third():
    with lock: output.append("third")

t3 = threading.Thread(target=foo.third, args=(print_third,))
t2 = threading.Thread(target=foo.second, args=(print_second,))
t1 = threading.Thread(target=foo.first, args=(print_first,))
t3.start(); t2.start(); t1.start()
t1.join(); t2.join(); t3.join()
print(json.dumps("".join(output)))`,
            javascript: `const output = [];
const foo = new Foo();
const p1 = new Promise(r => setTimeout(() => r(foo.third(() => output.push('third'))), 0));
const p2 = new Promise(r => setTimeout(() => r(foo.second(() => output.push('second'))), 0));
const p3 = new Promise(r => setTimeout(() => r(foo.first(() => output.push('first'))), 0));
Promise.all([p1, p2, p3]).then(() => console.log(JSON.stringify(output.join(''))));`,
            java: `public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        scanner.useDelimiter("\\\\A").next();
        StringBuilder output = new StringBuilder();
        Object lock = new Object();
        Foo foo = new Foo();
        Thread t3 = new Thread(() -> { try { foo.third(() -> { synchronized(lock) { output.append("third"); } }); } catch (Exception e) {} });
        Thread t2 = new Thread(() -> { try { foo.second(() -> { synchronized(lock) { output.append("second"); } }); } catch (Exception e) {} });
        Thread t1 = new Thread(() -> { try { foo.first(() -> { synchronized(lock) { output.append("first"); } }); } catch (Exception e) {} });
        t3.start(); t2.start(); t1.start();
        t1.join(); t2.join(); t3.join();
        System.out.println(Json.stringify(output.toString()));
    }
}`
        }
    },
    {
        title: 'Print FooBar Alternately',
        description: `Suppose you are given the following code:

\`\`\`
class FooBar {
    public void foo() {
        for (int i = 0; i < n; i++) {
            print("foo");
        }
    }

    public void bar() {
        for (int i = 0; i < n; i++) {
            print("bar");
        }
    }
}
\`\`\`

The same instance of \`FooBar\` will be passed to two different threads:
- thread A will call \`foo()\`, while
- thread B will call \`bar()\`.

Modify the given program to output \`"foobar"\` \`n\` times, with the two threads alternating between \`foo\` and \`bar\`.`,
        difficulty: 'medium',
        category: 'concurrency',
        isPremium: false,
        functionName: 'FooBar',
        executionType: 'concurrent',
        examples: [
            { input: 'n = 1', output: '"foobar"', explanation: '' },
            { input: 'n = 2', output: '"foobarfoobar"', explanation: '"foobar" is being repeated 2 times.' },
        ],
        constraints: ['1 <= n <= 1000'],
        testCases: [
            { input: { n: 1 }, expectedOutput: 'foobar' },
            { input: { n: 2 }, expectedOutput: 'foobarfoobar' },
            { input: { n: 5 }, expectedOutput: 'foobarfoobarfoobarfoobarfoobar', isHidden: true },
        ],
        starterCode: {
            python: `class FooBar:
    def __init__(self, n):
        self.n = n
        # Write your solution here

    def foo(self, print_foo) -> None:
        for _ in range(self.n):
            # Write your solution here
            print_foo()

    def bar(self, print_bar) -> None:
        for _ in range(self.n):
            # Write your solution here
            print_bar()`,
            javascript: `class FooBar {
    constructor(n) {
        this.n = n;
        // Write your solution here
    }

    foo(printFoo) {
        for (let i = 0; i < this.n; i++) {
            // Write your solution here
            printFoo();
        }
    }

    bar(printBar) {
        for (let i = 0; i < this.n; i++) {
            // Write your solution here
            printBar();
        }
    }
}`,
            java: `class FooBar {
    private int n;

    public FooBar(int n) {
        this.n = n;
    }

    public void foo(Runnable printFoo) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            // Write your solution here
            printFoo.run();
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            // Write your solution here
            printBar.run();
        }
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
n = data["n"]

output = []
lock = threading.Lock()
fb = FooBar(n)

def print_foo():
    with lock: output.append("foo")

def print_bar():
    with lock: output.append("bar")

t2 = threading.Thread(target=fb.bar, args=(print_bar,))
t1 = threading.Thread(target=fb.foo, args=(print_foo,))
t2.start(); t1.start()
t1.join(); t2.join()
print(json.dumps("".join(output)))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const n = data.n;
    const output = [];
    const fb = new FooBar(n);
    const p1 = new Promise(r => setTimeout(() => r(fb.bar(() => output.push('bar'))), 0));
    const p2 = new Promise(r => setTimeout(() => r(fb.foo(() => output.push('foo'))), 0));
    Promise.all([p1, p2]).then(() => console.log(JSON.stringify(output.join(''))));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        int n = ((Number) data.get("n")).intValue();
        StringBuilder output = new StringBuilder();
        Object lock = new Object();
        FooBar fb = new FooBar(n);
        Thread t1 = new Thread(() -> { try { fb.foo(() -> { synchronized(lock) { output.append("foo"); } }); } catch (Exception e) {} });
        Thread t2 = new Thread(() -> { try { fb.bar(() -> { synchronized(lock) { output.append("bar"); } }); } catch (Exception e) {} });
        t2.start(); t1.start();
        t1.join(); t2.join();
        System.out.println(Json.stringify(output.toString()));
    }
}`
        }
    },
    {
        title: 'Print Zero Even Odd',
        description: `You have a function \`printNumber\` that can be called with an integer parameter and prints it to the console.

You are given an instance of the class \`ZeroEvenOdd\` that has three methods: \`zero\`, \`even\`, and \`odd\`. The same instance will be passed to three different threads:
- Thread A calls \`zero()\` and should print \`0\`s.
- Thread B calls \`even()\` and should print only the even numbers.
- Thread C calls \`odd()\` and should print only the odd numbers.

Modify the class so that the sequence printed is \`0, 1, 0, 2, 0, 3, ...\` where the total length of the sequence is \`2n\` (i.e. alternating \`0\`s with the numbers \`1\` through \`n\` in increasing order).

Return the printed sequence as an array of integers.`,
        difficulty: 'medium',
        category: 'concurrency',
        isPremium: true,
        functionName: 'ZeroEvenOdd',
        executionType: 'concurrent',
        examples: [
            { input: 'n = 2', output: '[0,1,0,2]', explanation: '' },
            { input: 'n = 5', output: '[0,1,0,2,0,3,0,4,0,5]', explanation: '' },
        ],
        constraints: ['1 <= n <= 1000'],
        testCases: [
            { input: { n: 2 }, expectedOutput: [0, 1, 0, 2] },
            { input: { n: 1 }, expectedOutput: [0, 1] },
            { input: { n: 5 }, expectedOutput: [0, 1, 0, 2, 0, 3, 0, 4, 0, 5], isHidden: true },
        ],
        starterCode: {
            python: `class ZeroEvenOdd:
    def __init__(self, n):
        self.n = n
        # Write your solution here

    def zero(self, print_number) -> None:
        for _ in range(self.n):
            # Write your solution here
            print_number(0)

    def even(self, print_number) -> None:
        for i in range(2, self.n + 1, 2):
            # Write your solution here
            print_number(i)

    def odd(self, print_number) -> None:
        for i in range(1, self.n + 1, 2):
            # Write your solution here
            print_number(i)`,
            javascript: `class ZeroEvenOdd {
    constructor(n) {
        this.n = n;
        // Write your solution here
    }

    zero(printNumber) {
        for (let i = 0; i < this.n; i++) {
            // Write your solution here
            printNumber(0);
        }
    }

    even(printNumber) {
        for (let i = 2; i <= this.n; i += 2) {
            // Write your solution here
            printNumber(i);
        }
    }

    odd(printNumber) {
        for (let i = 1; i <= this.n; i += 2) {
            // Write your solution here
            printNumber(i);
        }
    }
}`,
            java: `class ZeroEvenOdd {
    private int n;

    public ZeroEvenOdd(int n) {
        this.n = n;
    }

    public void zero(Runnable printNumber) throws InterruptedException {
        for (int i = 0; i < n; i++) {
            // Write your solution here
            printNumber.run();
        }
    }

    public void even(java.util.function.IntConsumer printNumber) throws InterruptedException {
        for (int i = 2; i <= n; i += 2) {
            // Write your solution here
            printNumber.accept(i);
        }
    }

    public void odd(java.util.function.IntConsumer printNumber) throws InterruptedException {
        for (int i = 1; i <= n; i += 2) {
            // Write your solution here
            printNumber.accept(i);
        }
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
n = data["n"]

output = []
lock = threading.Lock()
zeo = ZeroEvenOdd(n)

def print_number(x):
    with lock: output.append(x)

tZero = threading.Thread(target=zeo.zero, args=(print_number,))
tEven = threading.Thread(target=zeo.even, args=(print_number,))
tOdd = threading.Thread(target=zeo.odd, args=(print_number,))
tEven.start(); tOdd.start(); tZero.start()
tZero.join(); tEven.join(); tOdd.join()
print(json.dumps(output, separators=(",", ":")))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const n = data.n;
    const output = [];
    const zeo = new ZeroEvenOdd(n);
    const printNumber = x => output.push(x);
    const p1 = new Promise(r => setTimeout(() => r(zeo.even(printNumber)), 0));
    const p2 = new Promise(r => setTimeout(() => r(zeo.odd(printNumber)), 0));
    const p3 = new Promise(r => setTimeout(() => r(zeo.zero(printNumber)), 0));
    Promise.all([p1, p2, p3]).then(() => console.log(JSON.stringify(output)));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        int n = ((Number) data.get("n")).intValue();
        List<Object> output = new ArrayList<>();
        Object lock = new Object();
        ZeroEvenOdd zeo = new ZeroEvenOdd(n);
        Runnable printZero = () -> { synchronized(lock) { output.add(0); } };
        java.util.function.IntConsumer printNum = x -> { synchronized(lock) { output.add(x); } };
        Thread tZero = new Thread(() -> { try { zeo.zero(printZero); } catch (Exception e) {} });
        Thread tEven = new Thread(() -> { try { zeo.even(printNum); } catch (Exception e) {} });
        Thread tOdd = new Thread(() -> { try { zeo.odd(printNum); } catch (Exception e) {} });
        tEven.start(); tOdd.start(); tZero.start();
        tZero.join(); tEven.join(); tOdd.join();
        System.out.println(Json.stringify(output));
    }
}`
        }
    },
    {
        title: 'Fizz Buzz Multithreaded',
        description: `You have the four functions \`fizz\`, \`buzz\`, \`fizzbuzz\`, and \`number\`, and an integer \`n\`. Four threads will run concurrently:
- Thread A calls \`fizz()\` and should output \`"fizz"\` for every multiple of 3 (not a multiple of 5).
- Thread B calls \`buzz()\` and should output \`"buzz"\` for every multiple of 5 (not a multiple of 3).
- Thread C calls \`fizzbuzz()\` and should output \`"fizzbuzz"\` for every multiple of both 3 and 5.
- Thread D calls \`number()\` and should output the number itself for every value that is not a multiple of 3 or 5.

Modify the class so that, together, the four threads produce the standard FizzBuzz sequence for the integers \`1\` to \`n\`, in increasing order. Return the resulting sequence as an array of strings.`,
        difficulty: 'hard',
        category: 'concurrency',
        isPremium: true,
        functionName: 'FizzBuzz',
        executionType: 'concurrent',
        examples: [
            { input: 'n = 15', output: '["1","2","fizz","4","buzz","fizz","7","8","fizz","buzz","11","fizz","13","14","fizzbuzz"]', explanation: '' },
        ],
        constraints: ['1 <= n <= 50'],
        testCases: [
            { input: { n: 15 }, expectedOutput: ['1', '2', 'fizz', '4', 'buzz', 'fizz', '7', '8', 'fizz', 'buzz', '11', 'fizz', '13', '14', 'fizzbuzz'] },
            { input: { n: 5 }, expectedOutput: ['1', '2', 'fizz', '4', 'buzz'] },
            { input: { n: 1 }, expectedOutput: ['1'], isHidden: true },
        ],
        starterCode: {
            python: `class FizzBuzz:
    def __init__(self, n):
        self.n = n
        # Write your solution here

    def fizz(self, print_fizz) -> None:
        # print_fizz() outputs "fizz". Do not change or remove this line.
        # Write your solution here
        pass

    def buzz(self, print_buzz) -> None:
        # print_buzz() outputs "buzz". Do not change or remove this line.
        # Write your solution here
        pass

    def fizzbuzz(self, print_fizz_buzz) -> None:
        # print_fizz_buzz() outputs "fizzbuzz". Do not change or remove this line.
        # Write your solution here
        pass

    def number(self, print_number) -> None:
        # print_number(x) outputs x. Do not change or remove this line.
        # Write your solution here
        pass`,
            javascript: `class FizzBuzz {
    constructor(n) {
        this.n = n;
        // Write your solution here
    }

    fizz(printFizz) {
        // printFizz() outputs "fizz". Do not change or remove this line.
        // Write your solution here
    }

    buzz(printBuzz) {
        // printBuzz() outputs "buzz". Do not change or remove this line.
        // Write your solution here
    }

    fizzbuzz(printFizzBuzz) {
        // printFizzBuzz() outputs "fizzbuzz". Do not change or remove this line.
        // Write your solution here
    }

    number(printNumber) {
        // printNumber(x) outputs x. Do not change or remove this line.
        // Write your solution here
    }
}`,
            java: `class FizzBuzz {
    private int n;

    public FizzBuzz(int n) {
        this.n = n;
    }

    public void fizz(Runnable printFizz) throws InterruptedException {
        // printFizz.run() outputs "fizz". Do not change or remove this line.
        // Write your solution here
    }

    public void buzz(Runnable printBuzz) throws InterruptedException {
        // printBuzz.run() outputs "buzz". Do not change or remove this line.
        // Write your solution here
    }

    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {
        // printFizzBuzz.run() outputs "fizzbuzz". Do not change or remove this line.
        // Write your solution here
    }

    public void number(java.util.function.IntConsumer printNumber) throws InterruptedException {
        // printNumber.accept(x) outputs x. Do not change or remove this line.
        // Write your solution here
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
n = data["n"]

seq = []
lock = threading.Lock()
fb = FizzBuzz(n)

def pf():
    with lock: seq.append("fizz")

def pb():
    with lock: seq.append("buzz")

def pfb():
    with lock: seq.append("fizzbuzz")

def pn(x):
    with lock: seq.append(str(x))

tFizz = threading.Thread(target=fb.fizz, args=(pf,))
tBuzz = threading.Thread(target=fb.buzz, args=(pb,))
tFizzBuzz = threading.Thread(target=fb.fizzbuzz, args=(pfb,))
tNumber = threading.Thread(target=fb.number, args=(pn,))
tBuzz.start(); tFizzBuzz.start(); tNumber.start(); tFizz.start()
tFizz.join(); tBuzz.join(); tFizzBuzz.join(); tNumber.join()
print(json.dumps(seq, separators=(",", ":")))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const n = data.n;
    const seq = [];
    const fb = new FizzBuzz(n);
    const p1 = new Promise(r => setTimeout(() => r(fb.buzz(() => seq.push('buzz'))), 0));
    const p2 = new Promise(r => setTimeout(() => r(fb.fizzbuzz(() => seq.push('fizzbuzz'))), 0));
    const p3 = new Promise(r => setTimeout(() => r(fb.number(x => seq.push(String(x)))), 0));
    const p4 = new Promise(r => setTimeout(() => r(fb.fizz(() => seq.push('fizz'))), 0));
    Promise.all([p1, p2, p3, p4]).then(() => console.log(JSON.stringify(seq)));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        int n = ((Number) data.get("n")).intValue();
        List<Object> seq = new ArrayList<>();
        Object lock = new Object();
        FizzBuzz fb = new FizzBuzz(n);
        Thread tFizz = new Thread(() -> { try { fb.fizz(() -> { synchronized(lock) { seq.add("fizz"); } }); } catch (Exception e) {} });
        Thread tBuzz = new Thread(() -> { try { fb.buzz(() -> { synchronized(lock) { seq.add("buzz"); } }); } catch (Exception e) {} });
        Thread tFizzBuzz = new Thread(() -> { try { fb.fizzbuzz(() -> { synchronized(lock) { seq.add("fizzbuzz"); } }); } catch (Exception e) {} });
        Thread tNumber = new Thread(() -> { try { fb.number(x -> { synchronized(lock) { seq.add(String.valueOf(x)); } }); } catch (Exception e) {} });
        tBuzz.start(); tFizzBuzz.start(); tNumber.start(); tFizz.start();
        tFizz.join(); tBuzz.join(); tFizzBuzz.join(); tNumber.join();
        System.out.println(Json.stringify(seq));
    }
}`
        }
    },

    // ===================== 2026 EXPANSION BATCH =====================
    // Adds 5 more problems to every category. Appended (not interspersed)
    // so the original seed order/positions are untouched. New problems are
    // added to the live DB via scripts/addProblems.ts (safe upsert-by-title),
    // never via this file's own seed() (which wipes the collection).

    // ARRAYS
    {
        title: 'Product of Array Except Self',
        description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

You must write an algorithm that runs in \`O(n)\` time without using the division operation.`,
        difficulty: 'medium',
        category: 'arrays',
        isPremium: false,
        functionName: 'product_except_self',
        examples: [
            { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: '' },
            { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: '' },
        ],
        constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
        testCases: [
            { input: { nums: [1, 2, 3, 4] }, expectedOutput: [24, 12, 8, 6] },
            { input: { nums: [-1, 1, 0, -3, 3] }, expectedOutput: [0, 0, 9, 0, 0] },
            { input: { nums: [2, 3] }, expectedOutput: [3, 2] },
            { input: { nums: [1, 1, 1, 1] }, expectedOutput: [1, 1, 1, 1], isHidden: true },
        ],
        starterCode: {
            python: `def product_except_self(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function productExceptSelf(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Rotate Array',
        description: `Given an integer array \`nums\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative, and return the resulting array.`,
        difficulty: 'easy',
        category: 'arrays',
        isPremium: false,
        functionName: 'rotate_array',
        examples: [
            { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explanation: '' },
            { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '0 <= k <= 10^5'],
        testCases: [
            { input: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 }, expectedOutput: [5, 6, 7, 1, 2, 3, 4] },
            { input: { nums: [-1, -100, 3, 99], k: 2 }, expectedOutput: [3, 99, -1, -100] },
            { input: { nums: [1, 2], k: 3 }, expectedOutput: [2, 1] },
            { input: { nums: [1], k: 0 }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def rotate_array(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function rotateArray(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] rotateArray(int[] nums, int k) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Find the Duplicate Number',
        description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive, there is only **one repeated number** in \`nums\`. Return this repeated number.

You must solve the problem without modifying the array \`nums\` and using only constant extra space.`,
        difficulty: 'medium',
        category: 'arrays',
        isPremium: true,
        functionName: 'find_duplicate',
        examples: [
            { input: 'nums = [1,3,4,2,2]', output: '2', explanation: '' },
            { input: 'nums = [3,1,3,4,2]', output: '3', explanation: '' },
        ],
        constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'All the integers in nums appear only once except for precisely one integer which appears two or more times.'],
        testCases: [
            { input: { nums: [1, 3, 4, 2, 2] }, expectedOutput: 2 },
            { input: { nums: [3, 1, 3, 4, 2] }, expectedOutput: 3 },
            { input: { nums: [1, 1] }, expectedOutput: 1 },
            { input: { nums: [2, 2, 2, 2, 2] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def find_duplicate(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findDuplicate(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findDuplicate(int[] nums) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Find All Duplicates in an Array',
        description: `Given an integer array \`nums\` of length \`n\` where all the integers of \`nums\` are in the range \`[1, n]\` and each integer appears **once or twice**, return an array of all the integers that appear **twice**.

You must write an algorithm that runs in \`O(n)\` time and uses only constant extra space.`,
        difficulty: 'easy',
        category: 'arrays',
        isPremium: false,
        functionName: 'find_duplicates',
        examples: [
            { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]', explanation: '' },
            { input: 'nums = [1,1,2]', output: '[1]', explanation: '' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 10^5', '1 <= nums[i] <= n', 'Each element in nums appears once or twice.'],
        testCases: [
            { input: { nums: [4, 3, 2, 7, 8, 2, 3, 1] }, expectedOutput: [2, 3] },
            { input: { nums: [1, 1, 2] }, expectedOutput: [1] },
            { input: { nums: [1] }, expectedOutput: [] },
            { input: { nums: [1, 2, 3, 4, 4] }, expectedOutput: [4], isHidden: true },
        ],
        starterCode: {
            python: `def find_duplicates(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findDuplicates(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findDuplicates(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Next Permutation',
        description: `Given an array of integers \`nums\`, find the next permutation of \`nums\` in lexicographic order and return it.

The replacement must be in place and use only constant extra memory, but for grading purposes here you should simply **return** the resulting array.

If no next permutation exists (the array is sorted in descending order), return the lowest possible order (the array sorted in ascending order) instead.`,
        difficulty: 'hard',
        category: 'arrays',
        isPremium: true,
        functionName: 'next_permutation',
        examples: [
            { input: 'nums = [1,2,3]', output: '[1,3,2]', explanation: '' },
            { input: 'nums = [3,2,1]', output: '[1,2,3]', explanation: 'Descending order wraps around to the lowest order.' },
        ],
        constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 100'],
        testCases: [
            { input: { nums: [1, 2, 3] }, expectedOutput: [1, 3, 2] },
            { input: { nums: [3, 2, 1] }, expectedOutput: [1, 2, 3] },
            { input: { nums: [1, 1, 5] }, expectedOutput: [1, 5, 1] },
            { input: { nums: [1] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def next_permutation(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function nextPermutation(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] nextPermutation(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // STRINGS
    {
        title: 'Longest Palindromic Substring',
        description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

Every test case in this problem has a **unique** longest palindromic substring, so the expected output is unambiguous.`,
        difficulty: 'medium',
        category: 'strings',
        isPremium: true,
        functionName: 'longest_palindrome',
        examples: [
            { input: 's = "cbbd"', output: '"bb"', explanation: '' },
            { input: 's = "racecar"', output: '"racecar"', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 1000', 's consists of only digits and English letters.'],
        testCases: [
            { input: { s: 'cbbd' }, expectedOutput: 'bb' },
            { input: { s: 'racecar' }, expectedOutput: 'racecar' },
            { input: { s: 'abccba' }, expectedOutput: 'abccba' },
            { input: { s: 'z' }, expectedOutput: 'z', isHidden: true },
        ],
        starterCode: {
            python: `def longest_palindrome(s: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function longestPalindrome(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public String longestPalindrome(String s) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Valid Anagram',
        description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'strings',
        isPremium: false,
        functionName: 'is_anagram',
        examples: [
            { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: '' },
            { input: 's = "rat", t = "car"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
        testCases: [
            { input: { s: 'anagram', t: 'nagaram' }, expectedOutput: true },
            { input: { s: 'rat', t: 'car' }, expectedOutput: false },
            { input: { s: 'a', t: 'a' }, expectedOutput: true },
            { input: { s: 'ab', t: 'a' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def is_anagram(s: str, t: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isAnagram(s, t) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'String to Integer (atoi)',
        description: `Implement the \`myAtoi(string s)\` function, which converts a string to a 32-bit signed integer.

The algorithm:
1. Ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is \`'-'\` or \`'+'\`. Read this character in if it is either.
3. Read in the digits until a non-digit character is encountered or the end of the input is reached. If no digits were read, the result is 0.
4. Convert these digits into an integer. If no digits were read, the result is 0.
5. If the integer is out of the 32-bit signed integer range \`[-2^31, 2^31 - 1]\`, clamp it to that range.
6. Return the integer as the final result.`,
        difficulty: 'medium',
        category: 'strings',
        isPremium: false,
        functionName: 'my_atoi',
        examples: [
            { input: 's = "42"', output: '42', explanation: '' },
            { input: 's = "   -042"', output: '-42', explanation: '' },
            { input: 's = "1337c0d3"', output: '1337', explanation: '' },
        ],
        constraints: ['0 <= s.length <= 200', 's consists of English letters, digits, spaces, +, -, and .'],
        testCases: [
            { input: { s: '42' }, expectedOutput: 42 },
            { input: { s: '   -042' }, expectedOutput: -42 },
            { input: { s: '1337c0d3' }, expectedOutput: 1337 },
            { input: { s: 'words and 987' }, expectedOutput: 0, isHidden: true },
            { input: { s: '-91283472332' }, expectedOutput: -2147483648, isHidden: true },
        ],
        starterCode: {
            python: `def my_atoi(s: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function myAtoi(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public int myAtoi(String s) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Longest Common Prefix',
        description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.`,
        difficulty: 'easy',
        category: 'strings',
        isPremium: false,
        functionName: 'longest_common_prefix',
        examples: [
            { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: '' },
            { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings.' },
        ],
        constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of only lowercase English letters.'],
        testCases: [
            { input: { strs: ['flower', 'flow', 'flight'] }, expectedOutput: 'fl' },
            { input: { strs: ['dog', 'racecar', 'car'] }, expectedOutput: '' },
            { input: { strs: ['single'] }, expectedOutput: 'single' },
            { input: { strs: ['ab', 'a'] }, expectedOutput: 'a', isHidden: true },
        ],
        starterCode: {
            python: `def longest_common_prefix(strs: list[str]) -> str:
    # Write your solution here
    pass`,
            javascript: `function longestCommonPrefix(strs) {
    // Write your solution here
}`,
            java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Regular Expression Matching',
        description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:
- \`'.'\` Matches any single character.
- \`'*'\` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).`,
        difficulty: 'hard',
        category: 'strings',
        isPremium: true,
        functionName: 'is_match',
        examples: [
            { input: 's = "aa", p = "a"', output: 'false', explanation: '"a" does not match the entire string "aa".' },
            { input: 's = "aa", p = "a*"', output: 'true', explanation: '' },
            { input: 's = "ab", p = ".*"', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30', 's contains only lowercase English letters.', 'p contains only lowercase English letters, ., and *.'],
        testCases: [
            { input: { s: 'aa', p: 'a' }, expectedOutput: false },
            { input: { s: 'aa', p: 'a*' }, expectedOutput: true },
            { input: { s: 'ab', p: '.*' }, expectedOutput: true },
            { input: { s: 'mississippi', p: 'mis*is*p*.' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def is_match(s: str, p: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isMatch(s, p) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isMatch(String s, String p) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // TREES
    {
        title: 'Invert Binary Tree',
        description: `Given the \`root\` of a binary tree, invert the tree (swap every left and right child), and return its root.`,
        difficulty: 'easy',
        category: 'trees',
        isPremium: false,
        functionName: 'invert_tree',
        treeNodeParams: ['root'],
        returnsTreeNode: true,
        examples: [
            { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: '' },
            { input: 'root = [2,1,3]', output: '[2,3,1]', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
        testCases: [
            { input: { root: [4, 2, 7, 1, 3, 6, 9] }, expectedOutput: [4, 7, 2, 9, 6, 3, 1] },
            { input: { root: [2, 1, 3] }, expectedOutput: [2, 3, 1] },
            { input: { root: [] }, expectedOutput: [] },
            { input: { root: [1] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root: TreeNode) -> TreeNode:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function invertTree(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Binary Tree Level Order Traversal',
        description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level), as a list of levels.`,
        difficulty: 'medium',
        category: 'trees',
        isPremium: false,
        functionName: 'level_order',
        treeNodeParams: ['root'],
        examples: [
            { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: '' },
            { input: 'root = [1]', output: '[[1]]', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
        testCases: [
            { input: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: [[3], [9, 20], [15, 7]] },
            { input: { root: [1] }, expectedOutput: [[1]] },
            { input: { root: [] }, expectedOutput: [] },
            { input: { root: [1, 2, 3, 4] }, expectedOutput: [[1], [2, 3], [4]], isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: TreeNode) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function levelOrder(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public int[][] levelOrder(TreeNode root) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Lowest Common Ancestor of a BST',
        description: `Given the \`root\` of a binary search tree, and two values \`p\` and \`q\` that both exist as node values in the tree, return the value of the lowest common ancestor (LCA) node of the two nodes.

The lowest common ancestor is defined as the lowest node in the tree that has both nodes as descendants (where a node can be a descendant of itself).`,
        difficulty: 'medium',
        category: 'trees',
        isPremium: true,
        functionName: 'lowest_common_ancestor',
        treeNodeParams: ['root'],
        examples: [
            { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'The LCA of nodes 2 and 8 is 6.' },
            { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'A node can be a descendant of itself.' },
        ],
        constraints: ['The number of nodes in the tree is in the range [2, 10^5].', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique.', 'p and q both exist in the BST.'],
        testCases: [
            { input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 }, expectedOutput: 6 },
            { input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 }, expectedOutput: 2 },
            { input: { root: [2, 1], p: 2, q: 1 }, expectedOutput: 2 },
            { input: { root: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 3, q: 5 }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root: TreeNode, p: int, q: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function lowestCommonAncestor(root, p, q) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Symmetric Tree',
        description: `Given the \`root\` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).`,
        difficulty: 'easy',
        category: 'trees',
        isPremium: false,
        functionName: 'is_symmetric',
        treeNodeParams: ['root'],
        examples: [
            { input: 'root = [1,2,2,3,4,4,3]', output: 'true', explanation: '' },
            { input: 'root = [1,2,2,null,3,null,3]', output: 'false', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [1, 1000].', '-100 <= Node.val <= 100'],
        testCases: [
            { input: { root: [1, 2, 2, 3, 4, 4, 3] }, expectedOutput: true },
            { input: { root: [1, 2, 2, null, 3, null, 3] }, expectedOutput: false },
            { input: { root: [1] }, expectedOutput: true },
            { input: { root: [1, 2, 2] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_symmetric(root: TreeNode) -> bool:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function isSymmetric(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public boolean isSymmetric(TreeNode root) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Path Sum III',
        description: `Given the \`root\` of a binary tree and an integer \`targetSum\`, return the number of paths where the sum of the values along the path equals \`targetSum\`.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).`,
        difficulty: 'hard',
        category: 'trees',
        isPremium: true,
        functionName: 'path_sum_three',
        treeNodeParams: ['root'],
        examples: [
            { input: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8', output: '3', explanation: '' },
            { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '3', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [0, 1000].', '-10^9 <= Node.val <= 10^9', '-1000 <= targetSum <= 1000'],
        testCases: [
            { input: { root: [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], targetSum: 8 }, expectedOutput: 3 },
            { input: { root: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], targetSum: 22 }, expectedOutput: 3 },
            { input: { root: [], targetSum: 0 }, expectedOutput: 0 },
            { input: { root: [1, 2], targetSum: 1 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def path_sum_three(root: TreeNode, targetSum: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function pathSumThree(root, targetSum) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public int pathSumThree(TreeNode root, int targetSum) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // GRAPHS
    {
        title: 'Find if Path Exists in Graph',
        description: `There is a bi-directional graph with \`n\` vertices, where each vertex is labeled from \`0\` to \`n - 1\` (inclusive). The edges in the graph are represented as a 2D integer array \`edges\`, where each \`edges[i] = [ui, vi]\` denotes a bi-directional edge between vertex \`ui\` and vertex \`vi\`.

You want to determine if there is a valid path that exists from vertex \`source\` to vertex \`destination\`.

Given \`edges\` and the integers \`n\`, \`source\`, and \`destination\`, return \`true\` if there is a valid path from \`source\` to \`destination\`, or \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'graphs',
        isPremium: false,
        functionName: 'valid_path',
        examples: [
            { input: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2', output: 'true', explanation: '' },
            { input: 'n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= n <= 2 * 10^5', '0 <= edges.length <= 2 * 10^5', 'edges[i].length == 2', '0 <= ui, vi <= n - 1', 'ui != vi'],
        testCases: [
            { input: { n: 3, edges: [[0, 1], [1, 2], [2, 0]], source: 0, destination: 2 }, expectedOutput: true },
            { input: { n: 6, edges: [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], source: 0, destination: 5 }, expectedOutput: false },
            { input: { n: 1, edges: [], source: 0, destination: 0 }, expectedOutput: true },
            { input: { n: 5, edges: [[0, 1], [1, 2], [2, 3], [3, 4]], source: 0, destination: 4 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def valid_path(n: int, edges: list[list[int]], source: int, destination: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function validPath(n, edges, source, destination) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Is Graph Bipartite?',
        description: `There is an undirected graph with \`n\` nodes, where each node is numbered between \`0\` and \`n - 1\`. You are given a 2D array \`graph\`, where \`graph[u]\` is an array of nodes that node \`u\` is adjacent to. More formally, for each \`v\` in \`graph[u]\`, there is an undirected edge between node \`u\` and node \`v\`.

A graph is **bipartite** if the nodes can be partitioned into two independent sets \`A\` and \`B\` such that every edge in the graph connects a node in set \`A\` and a node in set \`B\`.

Return \`true\` if and only if it is bipartite.`,
        difficulty: 'medium',
        category: 'graphs',
        isPremium: false,
        functionName: 'is_bipartite',
        examples: [
            { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false', explanation: '' },
            { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true', explanation: '' },
        ],
        constraints: ['graph.length == n', '1 <= n <= 100', '0 <= graph[u].length < n', 'graph[u] does not contain u.', 'All the values of graph[u] are unique.', 'If graph[u] contains v, then graph[v] contains u.'],
        testCases: [
            { input: { graph: [[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]] }, expectedOutput: false },
            { input: { graph: [[1, 3], [0, 2], [1, 3], [0, 2]] }, expectedOutput: true },
            { input: { graph: [[]] }, expectedOutput: true },
            { input: { graph: [[1], [0]] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_bipartite(graph: list[list[int]]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isBipartite(graph) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isBipartite(int[][] graph) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Max Area of Island',
        description: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`'s (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value \`1\` in the island. Return the maximum area of an island in \`grid\`. If there is no island, return \`0\`.`,
        difficulty: 'medium',
        category: 'graphs',
        isPremium: false,
        functionName: 'max_area_of_island',
        examples: [
            { input: 'grid = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]', output: '4', explanation: '' },
            { input: 'grid = [[0,0,0]]', output: '0', explanation: '' },
        ],
        constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is either 0 or 1.'],
        testCases: [
            { input: { grid: [[0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 1, 1, 0, 0], [0, 0, 0, 0, 0]] }, expectedOutput: 4 },
            { input: { grid: [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1]] }, expectedOutput: 4 },
            { input: { grid: [[0]] }, expectedOutput: 0 },
            { input: { grid: [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]] }, expectedOutput: 6, isHidden: true },
        ],
        starterCode: {
            python: `def max_area_of_island(grid: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxAreaOfIsland(grid) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Rotting Oranges',
        description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.`,
        difficulty: 'medium',
        category: 'graphs',
        isPremium: true,
        functionName: 'oranges_rotting',
        examples: [
            { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', explanation: '' },
            { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1', explanation: 'The orange in the bottom left corner never rots because rotting only spreads 4-directionally.' },
        ],
        constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2.'],
        testCases: [
            { input: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] }, expectedOutput: 4 },
            { input: { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]] }, expectedOutput: -1 },
            { input: { grid: [[0, 2]] }, expectedOutput: 0 },
            { input: { grid: [[0]] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def oranges_rotting(grid: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function orangesRotting(grid) {
    // Write your solution here
}`,
            java: `class Solution {
    public int orangesRotting(int[][] grid) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Reconstruct Itinerary',
        description: `You are given a list of airline tickets where \`froms[i]\` to \`tos[i]\` represent the departure and arrival airports of one flight (i.e. ticket \`i\`). Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, return the itinerary that has the smallest lexical order when read as a single string.

You must use all the tickets once and only once.`,
        difficulty: 'hard',
        category: 'graphs',
        isPremium: true,
        functionName: 'find_itinerary',
        examples: [
            { input: 'froms = ["MUC","JFK","SFO","LHR"], tos = ["LHR","MUC","SJC","SFO"]', output: '["JFK","MUC","LHR","SFO","SJC"]', explanation: '' },
            { input: 'froms = ["JFK","JFK","SFO","ATL","ATL"], tos = ["SFO","ATL","ATL","JFK","SFO"]', output: '["JFK","ATL","JFK","SFO","ATL","SFO"]', explanation: '' },
        ],
        constraints: ['1 <= froms.length <= 300', 'froms.length == tos.length', 'froms[i].length == 3', 'tos[i].length == 3', 'froms[i] and tos[i] consist of uppercase English letters.', 'froms[i] != tos[i]'],
        testCases: [
            { input: { froms: ['MUC', 'JFK', 'SFO', 'LHR'], tos: ['LHR', 'MUC', 'SJC', 'SFO'] }, expectedOutput: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC'] },
            { input: { froms: ['JFK', 'JFK', 'SFO', 'ATL', 'ATL'], tos: ['SFO', 'ATL', 'ATL', 'JFK', 'SFO'] }, expectedOutput: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO'] },
            { input: { froms: ['JFK'], tos: ['A'] }, expectedOutput: ['JFK', 'A'] },
            { input: { froms: ['JFK', 'A', 'B'], tos: ['A', 'B', 'JFK'] }, expectedOutput: ['JFK', 'A', 'B', 'JFK'], isHidden: true },
        ],
        starterCode: {
            python: `def find_itinerary(froms: list[str], tos: list[str]) -> list[str]:
    # Write your solution here
    pass`,
            javascript: `function findItinerary(froms, tos) {
    // Write your solution here
}`,
            java: `class Solution {
    public String[] findItinerary(String[] froms, String[] tos) {
        // Write your solution here
        return new String[]{};
    }
}`
        }
    },

    // DYNAMIC PROGRAMMING
    {
        title: 'House Robber',
        description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
        difficulty: 'easy',
        category: 'dynamic-programming',
        isPremium: false,
        functionName: 'house_robber',
        examples: [
            { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.' },
            { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1, 3 and 5. Total = 2 + 9 + 1 = 12.' },
        ],
        constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
        testCases: [
            { input: { nums: [1, 2, 3, 1] }, expectedOutput: 4 },
            { input: { nums: [2, 7, 9, 3, 1] }, expectedOutput: 12 },
            { input: { nums: [5] }, expectedOutput: 5 },
            { input: { nums: [2, 1, 1, 2] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def house_robber(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function houseRobber(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int houseRobber(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Longest Increasing Subsequence',
        description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.`,
        difficulty: 'medium',
        category: 'dynamic-programming',
        isPremium: false,
        functionName: 'length_of_lis',
        examples: [
            { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,3,7,101], therefore the length is 4.' },
            { input: 'nums = [0,1,0,3,2,3]', output: '4', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
        testCases: [
            { input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] }, expectedOutput: 4 },
            { input: { nums: [0, 1, 0, 3, 2, 3] }, expectedOutput: 4 },
            { input: { nums: [7, 7, 7, 7] }, expectedOutput: 1 },
            { input: { nums: [1, 3, 6, 7, 9, 4, 10, 5, 6] }, expectedOutput: 6, isHidden: true },
        ],
        starterCode: {
            python: `def length_of_lis(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function lengthOfLis(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int lengthOfLis(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Word Break',
        description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
        difficulty: 'medium',
        category: 'dynamic-programming',
        isPremium: true,
        functionName: 'word_break',
        examples: [
            { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explanation: 'Return true because "leetcode" can be segmented as "leet code".' },
            { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20', 's and wordDict[i] consist of only lowercase English letters.'],
        testCases: [
            { input: { s: 'leetcode', wordDict: ['leet', 'code'] }, expectedOutput: true },
            { input: { s: 'applepenapple', wordDict: ['apple', 'pen'] }, expectedOutput: true },
            { input: { s: 'catsandog', wordDict: ['cats', 'dog', 'sand', 'and', 'cat'] }, expectedOutput: false },
            { input: { s: 'a', wordDict: ['b'] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def word_break(s: str, wordDict: list[str]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function wordBreak(s, wordDict) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean wordBreak(String s, String[] wordDict) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Unique Paths',
        description: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
        difficulty: 'medium',
        category: 'dynamic-programming',
        isPremium: false,
        functionName: 'unique_paths',
        examples: [
            { input: 'm = 3, n = 7', output: '28', explanation: '' },
            { input: 'm = 3, n = 2', output: '3', explanation: '' },
        ],
        constraints: ['1 <= m, n <= 100'],
        testCases: [
            { input: { m: 3, n: 7 }, expectedOutput: 28 },
            { input: { m: 3, n: 2 }, expectedOutput: 3 },
            { input: { m: 1, n: 1 }, expectedOutput: 1 },
            { input: { m: 7, n: 3 }, expectedOutput: 28, isHidden: true },
        ],
        starterCode: {
            python: `def unique_paths(m: int, n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function uniquePaths(m, n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int uniquePaths(int m, int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Partition Equal Subset Sum',
        description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or \`false\` otherwise.`,
        difficulty: 'hard',
        category: 'dynamic-programming',
        isPremium: true,
        functionName: 'can_partition',
        examples: [
            { input: 'nums = [1,5,11,5]', output: 'true', explanation: 'The array can be partitioned as [1, 5, 5] and [11].' },
            { input: 'nums = [1,2,3,5]', output: 'false', explanation: 'The array cannot be partitioned into equal sum subsets.' },
        ],
        constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
        testCases: [
            { input: { nums: [1, 5, 11, 5] }, expectedOutput: true },
            { input: { nums: [1, 2, 3, 5] }, expectedOutput: false },
            { input: { nums: [1, 1] }, expectedOutput: true },
            { input: { nums: [2, 2, 3, 5] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def can_partition(nums: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canPartition(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canPartition(int[] nums) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // SYSTEM DESIGN
    {
        title: 'Min Stack',
        description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:
- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element \`val\` onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: false,
        functionName: 'MinStack',
        executionType: 'multi-call',
        examples: [
            { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]', explanation: '' },
        ],
        constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin operations will always be called on non-empty stacks.', 'At most 3 * 10^4 calls will be made.'],
        testCases: [
            {
                input: {
                    operations: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
                    args: [[], [-2], [0], [-3], [], [], [], []]
                },
                expectedOutput: [null, null, null, null, -3, null, 0, -2]
            },
        ],
        starterCode: {
            python: `class MinStack:
    def __init__(self):
        # Write your solution here
        pass

    def push(self, val: int) -> None:
        # Write your solution here
        pass

    def pop(self) -> None:
        # Write your solution here
        pass

    def top(self) -> int:
        # Write your solution here
        pass

    def get_min(self) -> int:
        # Write your solution here
        pass`,
            javascript: `class MinStack {
    constructor() {
        // Write your solution here
    }

    push(val) {
        // Write your solution here
    }

    pop() {
        // Write your solution here
    }

    top() {
        // Write your solution here
    }

    getMin() {
        // Write your solution here
    }
}`,
            java: `class MinStack {
    public MinStack() {
        // Write your solution here
    }

    public void push(int val) {
        // Write your solution here
    }

    public void pop() {
        // Write your solution here
    }

    public int top() {
        // Write your solution here
        return -1;
    }

    public int getMin() {
        // Write your solution here
        return -1;
    }
}`
        }
    },

    // BINARY SEARCH
    {
        title: 'Find Peak Element',
        description: `A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\` where every test case has **exactly one** peak, find that peak element's index and return it.

You must write an algorithm that runs in \`O(log n)\` time.`,
        difficulty: 'medium',
        category: 'binary-search',
        isPremium: false,
        functionName: 'find_peak_element',
        examples: [
            { input: 'nums = [1,2,3,1]', output: '2', explanation: '3 is a peak element and your function should return the index number 2.' },
            { input: 'nums = [1,2,4,8,5,3,1]', output: '3', explanation: '8 is the unique peak element.' },
        ],
        constraints: ['1 <= nums.length <= 1000', '-2^31 <= nums[i] <= 2^31 - 1', 'nums[i] != nums[i + 1] for all valid i.', 'Every test case has exactly one peak.'],
        testCases: [
            { input: { nums: [1, 2, 3, 1] }, expectedOutput: 2 },
            { input: { nums: [1, 2, 4, 8, 5, 3, 1] }, expectedOutput: 3 },
            { input: { nums: [1] }, expectedOutput: 0 },
            { input: { nums: [1, 2] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def find_peak_element(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findPeakElement(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findPeakElement(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Search Insert Position',
        description: `Given a sorted array of distinct integers \`nums\` and a target value \`target\`, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
        difficulty: 'easy',
        category: 'binary-search',
        isPremium: false,
        functionName: 'search_insert',
        examples: [
            { input: 'nums = [1,3,5,6], target = 5', output: '2', explanation: '' },
            { input: 'nums = [1,3,5,6], target = 2', output: '1', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums contains distinct values sorted in ascending order.', '-10^4 <= target <= 10^4'],
        testCases: [
            { input: { nums: [1, 3, 5, 6], target: 5 }, expectedOutput: 2 },
            { input: { nums: [1, 3, 5, 6], target: 2 }, expectedOutput: 1 },
            { input: { nums: [1, 3, 5, 6], target: 7 }, expectedOutput: 4 },
            { input: { nums: [1, 3, 5, 6], target: 0 }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def search_insert(nums: list[int], target: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function searchInsert(nums, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Find First and Last Position of Element in Sorted Array',
        description: `Given an array of integers \`nums\` sorted in non-decreasing order, find the starting and ending position of a given \`target\` value.

If \`target\` is not found in the array, return \`[-1, -1]\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
        difficulty: 'medium',
        category: 'binary-search',
        isPremium: true,
        functionName: 'search_range',
        examples: [
            { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]', explanation: '' },
            { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]', explanation: '' },
        ],
        constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'nums is a non-decreasing array.', '-10^9 <= target <= 10^9'],
        testCases: [
            { input: { nums: [5, 7, 7, 8, 8, 10], target: 8 }, expectedOutput: [3, 4] },
            { input: { nums: [5, 7, 7, 8, 8, 10], target: 6 }, expectedOutput: [-1, -1] },
            { input: { nums: [], target: 0 }, expectedOutput: [-1, -1] },
            { input: { nums: [1], target: 1 }, expectedOutput: [0, 0], isHidden: true },
        ],
        starterCode: {
            python: `def search_range(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function searchRange(nums, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        // Write your solution here
        return new int[]{-1, -1};
    }
}`
        }
    },
    {
        title: 'Capacity To Ship Packages Within D Days',
        description: `A conveyor belt has packages that must be shipped from one port to another within \`days\` days.

The \`ith\` package on the conveyor belt has a weight of \`weights[i]\`. Each day, we load the ship with packages on the conveyor belt (in the order given by \`weights\`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within \`days\` days.`,
        difficulty: 'hard',
        category: 'binary-search',
        isPremium: true,
        functionName: 'ship_within_days',
        examples: [
            { input: 'weights = [1,2,3,4,5,6,7,8,9,10], days = 5', output: '15', explanation: '' },
            { input: 'weights = [3,2,2,4,1,4], days = 3', output: '6', explanation: '' },
        ],
        constraints: ['1 <= days <= weights.length <= 5 * 10^4', '1 <= weights[i] <= 500'],
        testCases: [
            { input: { weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days: 5 }, expectedOutput: 15 },
            { input: { weights: [3, 2, 2, 4, 1, 4], days: 3 }, expectedOutput: 6 },
            { input: { weights: [1, 2, 3, 1, 1], days: 4 }, expectedOutput: 3 },
            { input: { weights: [5], days: 1 }, expectedOutput: 5, isHidden: true },
        ],
        starterCode: {
            python: `def ship_within_days(weights: list[int], days: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function shipWithinDays(weights, days) {
    // Write your solution here
}`,
            java: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Find K Closest Elements',
        description: `Given a sorted integer array \`arr\`, two integers \`k\` and \`x\`, return the \`k\` closest integers to \`x\` in the array. The result should also be sorted in ascending order.

An integer \`a\` is closer to \`x\` than an integer \`b\` if:
- \`|a - x| < |b - x|\`, or
- \`|a - x| == |b - x|\` and \`a < b\``,
        difficulty: 'medium',
        category: 'binary-search',
        isPremium: false,
        functionName: 'find_closest_elements',
        examples: [
            { input: 'arr = [1,2,3,4,5], k = 4, x = 3', output: '[1,2,3,4]', explanation: '' },
            { input: 'arr = [1,2,3,4,5], k = 4, x = -1', output: '[1,2,3,4]', explanation: '' },
        ],
        constraints: ['1 <= k <= arr.length', '1 <= arr.length <= 10^4', 'arr is sorted in ascending order.', '-10^4 <= arr[i], x <= 10^4'],
        testCases: [
            { input: { arr: [1, 2, 3, 4, 5], k: 4, x: 3 }, expectedOutput: [1, 2, 3, 4] },
            { input: { arr: [1, 2, 3, 4, 5], k: 4, x: -1 }, expectedOutput: [1, 2, 3, 4] },
            { input: { arr: [1, 2, 3, 4, 5], k: 1, x: 3 }, expectedOutput: [3] },
            { input: { arr: [1, 3], k: 1, x: 2 }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def find_closest_elements(arr: list[int], k: int, x: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findClosestElements(arr, k, x) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findClosestElements(int[] arr, int k, int x) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // STACKS
    {
        title: 'Remove All Adjacent Duplicates In String',
        description: `You are given a string \`s\` consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on \`s\` until we no longer can. Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.`,
        difficulty: 'easy',
        category: 'stacks',
        isPremium: false,
        functionName: 'remove_duplicates',
        examples: [
            { input: 's = "abbaca"', output: '"ca"', explanation: 'For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, this is the only possible move. The result is "aaca", of which only "aa" is possible, so the final string is "ca".' },
            { input: 's = "azxxzy"', output: '"ay"', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
        testCases: [
            { input: { s: 'abbaca' }, expectedOutput: 'ca' },
            { input: { s: 'azxxzy' }, expectedOutput: 'ay' },
            { input: { s: 'a' }, expectedOutput: 'a' },
            { input: { s: 'aa' }, expectedOutput: '', isHidden: true },
        ],
        starterCode: {
            python: `def remove_duplicates(s: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function removeDuplicates(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public String removeDuplicates(String s) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Decode String',
        description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is being repeated exactly \`k\` times. Note that \`k\` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, \`k\`.`,
        difficulty: 'medium',
        category: 'stacks',
        isPremium: true,
        functionName: 'decode_string',
        examples: [
            { input: 's = "3[a]2[bc]"', output: '"aaabcbc"', explanation: '' },
            { input: 's = "3[a2[c]]"', output: '"accaccacc"', explanation: '' },
            { input: 's = "2[abc]3[cd]ef"', output: '"abcabccdcdcdef"', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 30', 's consists of lowercase English letters, digits, and square brackets.', 's is guaranteed to be a valid input.'],
        testCases: [
            { input: { s: '3[a]2[bc]' }, expectedOutput: 'aaabcbc' },
            { input: { s: '3[a2[c]]' }, expectedOutput: 'accaccacc' },
            { input: { s: '2[abc]3[cd]ef' }, expectedOutput: 'abcabccdcdcdef' },
            { input: { s: 'abc' }, expectedOutput: 'abc', isHidden: true },
        ],
        starterCode: {
            python: `def decode_string(s: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function decodeString(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public String decodeString(String s) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Asteroid Collision',
        description: `We are given an array \`asteroids\` of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.`,
        difficulty: 'medium',
        category: 'stacks',
        isPremium: false,
        functionName: 'asteroid_collision',
        examples: [
            { input: 'asteroids = [5,10,-5]', output: '[5,10]', explanation: 'The 10 and -5 collide resulting in 10. The 5 and 10 never collide.' },
            { input: 'asteroids = [8,-8]', output: '[]', explanation: 'The 8 and -8 collide exploding each other.' },
            { input: 'asteroids = [10,2,-5]', output: '[10]', explanation: 'The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.' },
        ],
        constraints: ['2 <= asteroids.length <= 10^4', '-1000 <= asteroids[i] <= 1000', 'asteroids[i] != 0'],
        testCases: [
            { input: { asteroids: [5, 10, -5] }, expectedOutput: [5, 10] },
            { input: { asteroids: [8, -8] }, expectedOutput: [] },
            { input: { asteroids: [10, 2, -5] }, expectedOutput: [10] },
            { input: { asteroids: [-2, -1, 1, 2] }, expectedOutput: [-2, -1, 1, 2], isHidden: true },
        ],
        starterCode: {
            python: `def asteroid_collision(asteroids: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function asteroidCollision(asteroids) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Basic Calculator II',
        description: `Given a string \`s\` which represents an expression, evaluate this expression and return its value.

The integer division should truncate toward zero. You may assume that the given expression is always valid. All intermediate results will be in the range of \`[-2^31, 2^31 - 1]\`.

The expression contains only non-negative integers, \`+\`, \`-\`, \`*\`, \`/\` operators and empty spaces. The integer division should truncate toward zero.`,
        difficulty: 'hard',
        category: 'stacks',
        isPremium: true,
        functionName: 'calculate',
        examples: [
            { input: 's = "3+2*2"', output: '7', explanation: '' },
            { input: 's = " 3/2 "', output: '1', explanation: '' },
            { input: 's = " 3+5 / 2 "', output: '5', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 3 * 10^5', 's consists of integers and operators (+, -, *, /) separated by some number of spaces.', 's represents a valid expression.'],
        testCases: [
            { input: { s: '3+2*2' }, expectedOutput: 7 },
            { input: { s: ' 3/2 ' }, expectedOutput: 1 },
            { input: { s: ' 3+5 / 2 ' }, expectedOutput: 5 },
            { input: { s: '14-3/2' }, expectedOutput: 13, isHidden: true },
        ],
        starterCode: {
            python: `def calculate(s: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function calculate(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public int calculate(String s) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Next Greater Element I',
        description: `The next greater element of some element \`x\` in an array is the first greater element that is to the right of \`x\` in the same array.

You are given two **distinct 0-indexed** integer arrays \`nums1\` and \`nums2\`, where \`nums1\` is a subset of \`nums2\`.

For each \`0 <= i < nums1.length\`, find the index \`j\` such that \`nums1[i] == nums2[j]\` and determine the next greater element of \`nums2[j]\` in \`nums2\`. If there is no next greater element, then the answer for this query is \`-1\`.

Return an array \`ans\` of length \`nums1.length\` such that \`ans[i]\` is the next greater element as described above.`,
        difficulty: 'easy',
        category: 'stacks',
        isPremium: false,
        functionName: 'next_greater_element',
        examples: [
            { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]', explanation: '' },
            { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]', explanation: '' },
        ],
        constraints: ['1 <= nums1.length <= nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 10^4', 'All integers in nums1 and nums2 are unique.', 'All the integers of nums1 also appear in nums2.'],
        testCases: [
            { input: { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] }, expectedOutput: [-1, 3, -1] },
            { input: { nums1: [2, 4], nums2: [1, 2, 3, 4] }, expectedOutput: [3, -1] },
            { input: { nums1: [1], nums2: [1] }, expectedOutput: [-1] },
            { input: { nums1: [3, 1], nums2: [3, 1, 2] }, expectedOutput: [-1, 2], isHidden: true },
        ],
        starterCode: {
            python: `def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function nextGreaterElement(nums1, nums2) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // GREEDY
    {
        title: 'Jump Game II',
        description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.

Each element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where \`0 <= j <= nums[i]\` and \`i + j < n\`.

Return the minimum number of jumps to reach \`nums[n - 1]\`. It is guaranteed that you can reach \`nums[n - 1]\`.`,
        difficulty: 'medium',
        category: 'greedy',
        isPremium: false,
        functionName: 'min_jumps',
        examples: [
            { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
            { input: 'nums = [2,3,0,1,4]', output: '2', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 1000', 'It is guaranteed that you can reach nums[n - 1].'],
        testCases: [
            { input: { nums: [2, 3, 1, 1, 4] }, expectedOutput: 2 },
            { input: { nums: [2, 3, 0, 1, 4] }, expectedOutput: 2 },
            { input: { nums: [1] }, expectedOutput: 0 },
            { input: { nums: [1, 2, 3] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def min_jumps(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minJumps(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minJumps(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Partition Labels',
        description: `You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Return a list of integers representing the size of these parts.`,
        difficulty: 'medium',
        category: 'greedy',
        isPremium: false,
        functionName: 'partition_labels',
        examples: [
            { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]', explanation: 'The partition is "ababcbaca", "defegde", "hijhklij".' },
            { input: 's = "eccbbbbdec"', output: '[10]', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 500', 's consists of lowercase English letters.'],
        testCases: [
            { input: { s: 'ababcbacadefegdehijhklij' }, expectedOutput: [9, 7, 8] },
            { input: { s: 'eccbbbbdec' }, expectedOutput: [10] },
            { input: { s: 'abc' }, expectedOutput: [1, 1, 1] },
            { input: { s: 'aaa' }, expectedOutput: [3], isHidden: true },
        ],
        starterCode: {
            python: `def partition_labels(s: str) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function partitionLabels(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] partitionLabels(String s) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Non-overlapping Intervals',
        description: `Given an array of intervals \`intervals\` where \`intervals[i] = [starti, endi]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.`,
        difficulty: 'medium',
        category: 'greedy',
        isPremium: true,
        functionName: 'erase_overlap_intervals',
        examples: [
            { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: '[1,3] can be removed and the rest of the intervals are non-overlapping.' },
            { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2', explanation: '' },
        ],
        constraints: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2', '-5 * 10^4 <= starti < endi <= 5 * 10^4'],
        testCases: [
            { input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] }, expectedOutput: 1 },
            { input: { intervals: [[1, 2], [1, 2], [1, 2]] }, expectedOutput: 2 },
            { input: { intervals: [[1, 2], [2, 3]] }, expectedOutput: 0 },
            { input: { intervals: [[1, 100], [11, 22], [1, 11], [2, 12]] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function eraseOverlapIntervals(intervals) {
    // Write your solution here
}`,
            java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Candy',
        description: `There are \`n\` children standing in a line, each assigned a rating value given in the integer array \`ratings\`.

You are giving candies to these children subject to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.`,
        difficulty: 'hard',
        category: 'greedy',
        isPremium: true,
        functionName: 'candy',
        examples: [
            { input: 'ratings = [1,0,2]', output: '5', explanation: 'You can allocate to the first, second and third child with 2, 1, 2 candies respectively.' },
            { input: 'ratings = [1,2,2]', output: '4', explanation: 'You can allocate to the first, second and third child with 1, 2, 1 candies respectively. The third child gets 1 candy because it satisfies the above two conditions.' },
        ],
        constraints: ['n == ratings.length', '1 <= n <= 2 * 10^4', '0 <= ratings[i] <= 2 * 10^4'],
        testCases: [
            { input: { ratings: [1, 0, 2] }, expectedOutput: 5 },
            { input: { ratings: [1, 2, 2] }, expectedOutput: 4 },
            { input: { ratings: [1] }, expectedOutput: 1 },
            { input: { ratings: [1, 3, 2, 2, 1] }, expectedOutput: 7, isHidden: true },
        ],
        starterCode: {
            python: `def candy(ratings: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function candy(ratings) {
    // Write your solution here
}`,
            java: `class Solution {
    public int candy(int[] ratings) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Minimum Number of Arrows to Burst Balloons',
        description: `There are some spherical balloons on a flat wall. Each balloon has \`points[i] = [xstart, xend]\` marking the horizontal diameter. You do not know the exact y-coordinates.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon bursts by an arrow if \`xstart <= x <= xend\`. There is no limit to the number of arrows that can be shot.

Given the array \`points\`, return the minimum number of arrows that must be shot to burst all balloons.`,
        difficulty: 'medium',
        category: 'greedy',
        isPremium: false,
        functionName: 'find_min_arrow_shots',
        examples: [
            { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explanation: 'One arrow at x = 6 bursts [2,8] and [1,6]. Another at x = 11 bursts [10,16] and [7,12].' },
            { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4', explanation: '' },
        ],
        constraints: ['1 <= points.length <= 10^5', 'points[i].length == 2', '-2^31 <= xstart < xend <= 2^31 - 1'],
        testCases: [
            { input: { points: [[10, 16], [2, 8], [1, 6], [7, 12]] }, expectedOutput: 2 },
            { input: { points: [[1, 2], [3, 4], [5, 6], [7, 8]] }, expectedOutput: 4 },
            { input: { points: [[1, 2], [2, 3], [3, 4], [4, 5]] }, expectedOutput: 2 },
            { input: { points: [[1, 10]] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def find_min_arrow_shots(points: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findMinArrowShots(points) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findMinArrowShots(int[][] points) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // BIT MANIPULATION
    {
        title: 'Number of 1 Bits',
        description: `Given a positive integer \`n\`, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).`,
        difficulty: 'easy',
        category: 'bit-manipulation',
        isPremium: false,
        functionName: 'hamming_weight',
        examples: [
            { input: 'n = 11', output: '3', explanation: 'The input binary string 1011 has a total of three set bits.' },
            { input: 'n = 128', output: '1', explanation: 'The input binary string 10000000 has a total of one set bit.' },
        ],
        constraints: ['1 <= n <= 2^31 - 1'],
        testCases: [
            { input: { n: 11 }, expectedOutput: 3 },
            { input: { n: 128 }, expectedOutput: 1 },
            { input: { n: 2147483645 }, expectedOutput: 30 },
            { input: { n: 1 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def hamming_weight(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function hammingWeight(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int hammingWeight(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Missing Number',
        description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
        difficulty: 'easy',
        category: 'bit-manipulation',
        isPremium: false,
        functionName: 'missing_number',
        examples: [
            { input: 'nums = [3,0,1]', output: '2', explanation: '' },
            { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8', explanation: '' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All the numbers of nums are unique.'],
        testCases: [
            { input: { nums: [3, 0, 1] }, expectedOutput: 2 },
            { input: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] }, expectedOutput: 8 },
            { input: { nums: [0, 1] }, expectedOutput: 2 },
            { input: { nums: [0] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def missing_number(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function missingNumber(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int missingNumber(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Bitwise AND of Numbers Range',
        description: `Given two integers \`left\` and \`right\` that represent the range \`[left, right]\`, return the bitwise AND of all numbers in this range, inclusive.`,
        difficulty: 'medium',
        category: 'bit-manipulation',
        isPremium: false,
        functionName: 'range_bitwise_and',
        examples: [
            { input: 'left = 5, right = 7', output: '4', explanation: '' },
            { input: 'left = 0, right = 0', output: '0', explanation: '' },
        ],
        constraints: ['0 <= left <= right <= 2^31 - 1'],
        testCases: [
            { input: { left: 5, right: 7 }, expectedOutput: 4 },
            { input: { left: 0, right: 0 }, expectedOutput: 0 },
            { input: { left: 1, right: 2147483647 }, expectedOutput: 0 },
            { input: { left: 8, right: 8 }, expectedOutput: 8, isHidden: true },
        ],
        starterCode: {
            python: `def range_bitwise_and(left: int, right: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function rangeBitwiseAnd(left, right) {
    // Write your solution here
}`,
            java: `class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Divide Two Integers',
        description: `Given two integers \`dividend\` and \`divisor\`, divide two integers without using multiplication, division, and mod operator. The integer division should truncate toward zero.

Return the quotient after dividing \`dividend\` by \`divisor\`. If the quotient is strictly greater than \`2^31 - 1\`, return \`2^31 - 1\`, and if the quotient is strictly less than \`-2^31\`, return \`-2^31\`.`,
        difficulty: 'medium',
        category: 'bit-manipulation',
        isPremium: true,
        functionName: 'divide',
        examples: [
            { input: 'dividend = 10, divisor = 3', output: '3', explanation: '10/3 = 3.33333... which is truncated to 3.' },
            { input: 'dividend = 7, divisor = -3', output: '-2', explanation: '7/-3 = -2.33333... which is truncated to -2.' },
        ],
        constraints: ['-2^31 <= dividend, divisor <= 2^31 - 1', 'divisor != 0'],
        testCases: [
            { input: { dividend: 10, divisor: 3 }, expectedOutput: 3 },
            { input: { dividend: 7, divisor: -3 }, expectedOutput: -2 },
            { input: { dividend: 0, divisor: 1 }, expectedOutput: 0 },
            { input: { dividend: -2147483648, divisor: 1 }, expectedOutput: 2147483647, isHidden: true },
        ],
        starterCode: {
            python: `def divide(dividend: int, divisor: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function divide(dividend, divisor) {
    // Write your solution here
}`,
            java: `class Solution {
    public int divide(int dividend, int divisor) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Maximum XOR of Two Numbers in an Array',
        description: `Given an integer array \`nums\`, return the maximum result of \`nums[i] XOR nums[j]\`, where \`0 <= i <= j < n\`.`,
        difficulty: 'hard',
        category: 'bit-manipulation',
        isPremium: true,
        functionName: 'find_maximum_xor',
        examples: [
            { input: 'nums = [3,10,5,25,2,8]', output: '28', explanation: 'The maximum result is 5 XOR 25 = 28.' },
            { input: 'nums = [14,70,53,83,49,91,36,80,92,51,66,70]', output: '127', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 2 * 10^5', '0 <= nums[i] <= 2^31 - 1'],
        testCases: [
            { input: { nums: [3, 10, 5, 25, 2, 8] }, expectedOutput: 28 },
            { input: { nums: [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70] }, expectedOutput: 127 },
            { input: { nums: [0, 0] }, expectedOutput: 0 },
            { input: { nums: [2, 4] }, expectedOutput: 6, isHidden: true },
        ],
        starterCode: {
            python: `def find_maximum_xor(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findMaximumXor(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findMaximumXor(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // HASH TABLE
    {
        title: 'Isomorphic Strings',
        description: `Given two strings \`s\` and \`t\`, determine if they are isomorphic.

Two strings \`s\` and \`t\` are isomorphic if the characters in \`s\` can be replaced to get \`t\`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.`,
        difficulty: 'easy',
        category: 'hash-table',
        isPremium: false,
        functionName: 'is_isomorphic',
        examples: [
            { input: 's = "egg", t = "add"', output: 'true', explanation: '' },
            { input: 's = "foo", t = "bar"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 5 * 10^4', 't.length == s.length', 's and t consist of any valid ascii character.'],
        testCases: [
            { input: { s: 'egg', t: 'add' }, expectedOutput: true },
            { input: { s: 'foo', t: 'bar' }, expectedOutput: false },
            { input: { s: 'paper', t: 'title' }, expectedOutput: true },
            { input: { s: 'badc', t: 'baba' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def is_isomorphic(s: str, t: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isIsomorphic(s, t) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Word Pattern',
        description: `Given a \`pattern\` and a string \`s\`, find if \`s\` follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in \`pattern\` and a non-empty word in \`s\` (\`s\` is a single string with words separated by single spaces).`,
        difficulty: 'easy',
        category: 'hash-table',
        isPremium: false,
        functionName: 'word_pattern',
        examples: [
            { input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true', explanation: '' },
            { input: 'pattern = "abba", s = "dog cat cat fish"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= pattern.length <= 300', 'pattern contains only lowercase English letters.', '1 <= s.length <= 3000', 's contains only lowercase English letters and spaces.'],
        testCases: [
            { input: { pattern: 'abba', s: 'dog cat cat dog' }, expectedOutput: true },
            { input: { pattern: 'abba', s: 'dog cat cat fish' }, expectedOutput: false },
            { input: { pattern: 'aaaa', s: 'dog cat cat dog' }, expectedOutput: false },
            { input: { pattern: 'abba', s: 'dog dog dog dog' }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def word_pattern(pattern: str, s: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function wordPattern(pattern, s) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean wordPattern(String pattern, String s) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Ransom Note',
        description: `Given two strings \`ransomNote\` and \`magazine\`, return \`true\` if \`ransomNote\` can be constructed by using the letters from \`magazine\` and \`false\` otherwise.

Each letter in \`magazine\` can only be used once in \`ransomNote\`.`,
        difficulty: 'easy',
        category: 'hash-table',
        isPremium: false,
        functionName: 'can_construct',
        examples: [
            { input: 'ransomNote = "a", magazine = "b"', output: 'false', explanation: '' },
            { input: 'ransomNote = "aa", magazine = "aab"', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= ransomNote.length, magazine.length <= 10^5', 'ransomNote and magazine consist of lowercase English letters.'],
        testCases: [
            { input: { ransomNote: 'a', magazine: 'b' }, expectedOutput: false },
            { input: { ransomNote: 'aa', magazine: 'ab' }, expectedOutput: false },
            { input: { ransomNote: 'aa', magazine: 'aab' }, expectedOutput: true },
            { input: { ransomNote: 'abc', magazine: 'cbaabc' }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def can_construct(ransomNote: str, magazine: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canConstruct(ransomNote, magazine) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Contiguous Array',
        description: `Given a binary array \`nums\`, return the maximum length of a contiguous subarray with an equal number of \`0\` and \`1\`.`,
        difficulty: 'medium',
        category: 'hash-table',
        isPremium: true,
        functionName: 'find_max_length',
        examples: [
            { input: 'nums = [0,1]', output: '2', explanation: '[0, 1] is the longest contiguous subarray with an equal number of 0 and 1.' },
            { input: 'nums = [0,1,0]', output: '2', explanation: '[0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.' },
        ],
        constraints: ['1 <= nums.length <= 10^5', 'nums[i] is either 0 or 1.'],
        testCases: [
            { input: { nums: [0, 1] }, expectedOutput: 2 },
            { input: { nums: [0, 1, 0] }, expectedOutput: 2 },
            { input: { nums: [0, 0, 0, 1, 1, 1] }, expectedOutput: 6 },
            { input: { nums: [1, 1, 1, 0] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def find_max_length(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function findMaxLength(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findMaxLength(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'First Missing Positive',
        description: `Given an unsorted integer array \`nums\`, return the smallest missing positive integer.

You must implement an algorithm that runs in \`O(n)\` time and uses \`O(1)\` auxiliary space.`,
        difficulty: 'hard',
        category: 'hash-table',
        isPremium: true,
        functionName: 'first_missing_positive',
        examples: [
            { input: 'nums = [1,2,0]', output: '3', explanation: '' },
            { input: 'nums = [3,4,-1,1]', output: '2', explanation: '' },
            { input: 'nums = [7,8,9,11,12]', output: '1', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1'],
        testCases: [
            { input: { nums: [1, 2, 0] }, expectedOutput: 3 },
            { input: { nums: [3, 4, -1, 1] }, expectedOutput: 2 },
            { input: { nums: [7, 8, 9, 11, 12] }, expectedOutput: 1 },
            { input: { nums: [1] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def first_missing_positive(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function firstMissingPositive(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int firstMissingPositive(int[] nums) {
        // Write your solution here
        return 1;
    }
}`
        }
    },

    // TWO POINTERS
    {
        title: 'Two Sum II - Input Array Is Sorted',
        description: `Given a **1-indexed** array of integers \`numbers\` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific \`target\` number.

Return the indices of the two numbers, \`index1\` and \`index2\`, added by one as an integer array \`[index1, index2]\` of length 2.

You may assume that each input would have exactly one solution and you may not use the same element twice.`,
        difficulty: 'easy',
        category: 'two-pointers',
        isPremium: false,
        functionName: 'two_sum_sorted',
        examples: [
            { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.' },
            { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: '' },
        ],
        constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted in non-decreasing order.', 'Exactly one valid answer exists.'],
        testCases: [
            { input: { numbers: [2, 7, 11, 15], target: 9 }, expectedOutput: [1, 2] },
            { input: { numbers: [2, 3, 4], target: 6 }, expectedOutput: [1, 3] },
            { input: { numbers: [-1, 0], target: -1 }, expectedOutput: [1, 2] },
            { input: { numbers: [1, 2, 3, 4, 4, 9], target: 8 }, expectedOutput: [4, 5], isHidden: true },
        ],
        starterCode: {
            python: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function twoSumSorted(numbers, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] twoSumSorted(int[] numbers, int target) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: '3Sum Closest',
        description: `Given an integer array \`nums\` of length \`n\` and an integer \`target\`, find three integers in \`nums\` such that the sum is closest to \`target\`.

Return the sum of the three integers. You may assume that each input would have exactly one solution.`,
        difficulty: 'medium',
        category: 'two-pointers',
        isPremium: false,
        functionName: 'three_sum_closest',
        examples: [
            { input: 'nums = [-1,2,1,-4], target = 1', output: '2', explanation: 'The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).' },
            { input: 'nums = [0,0,0], target = 1', output: '0', explanation: '' },
        ],
        constraints: ['3 <= nums.length <= 500', '-1000 <= nums[i] <= 1000', '-10^4 <= target <= 10^4'],
        testCases: [
            { input: { nums: [-1, 2, 1, -4], target: 1 }, expectedOutput: 2 },
            { input: { nums: [0, 0, 0], target: 1 }, expectedOutput: 0 },
            { input: { nums: [1, 1, 1, 0], target: -100 }, expectedOutput: 2 },
            { input: { nums: [1, 2, 5, 10, 11], target: 12 }, expectedOutput: 13, isHidden: true },
        ],
        starterCode: {
            python: `def three_sum_closest(nums: list[int], target: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function threeSumClosest(nums, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int threeSumClosest(int[] nums, int target) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Boats to Save People',
        description: `You are given an array \`people\` where \`people[i]\` is the weight of the \`ith\` person, and an infinite number of boats where each boat can carry a maximum weight of \`limit\`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most \`limit\`.

Return the minimum number of boats to carry every given person.`,
        difficulty: 'medium',
        category: 'two-pointers',
        isPremium: true,
        functionName: 'num_rescue_boats',
        examples: [
            { input: 'people = [1,2], limit = 3', output: '1', explanation: '' },
            { input: 'people = [3,2,2,1], limit = 3', output: '3', explanation: '(1, 2), (2) and (3)' },
        ],
        constraints: ['1 <= people.length <= 5 * 10^4', '1 <= people[i] <= limit <= 3 * 10^4'],
        testCases: [
            { input: { people: [1, 2], limit: 3 }, expectedOutput: 1 },
            { input: { people: [3, 2, 2, 1], limit: 3 }, expectedOutput: 3 },
            { input: { people: [3, 5, 3, 4], limit: 5 }, expectedOutput: 4 },
            { input: { people: [5, 1, 4, 2], limit: 6 }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def num_rescue_boats(people: list[int], limit: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function numRescueBoats(people, limit) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numRescueBoats(int[] people, int limit) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Squares of a Sorted Array',
        description: `Given an integer array \`nums\` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.`,
        difficulty: 'easy',
        category: 'two-pointers',
        isPremium: false,
        functionName: 'sorted_squares',
        examples: [
            { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]', explanation: '' },
            { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order.'],
        testCases: [
            { input: { nums: [-4, -1, 0, 3, 10] }, expectedOutput: [0, 1, 9, 16, 100] },
            { input: { nums: [-7, -3, 2, 3, 11] }, expectedOutput: [4, 9, 9, 49, 121] },
            { input: { nums: [0] }, expectedOutput: [0] },
            { input: { nums: [-5, -3, -1] }, expectedOutput: [1, 9, 25], isHidden: true },
        ],
        starterCode: {
            python: `def sorted_squares(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function sortedSquares(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] sortedSquares(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Longest Mountain in Array',
        description: `You may recall that an array \`arr\` is a mountain array if and only if:
- \`arr.length >= 3\`
- There exists some index \`i\` (0-indexed) with \`0 < i < arr.length - 1\` such that:
  - \`arr[0] < arr[1] < ... < arr[i - 1] < arr[i]\`
  - \`arr[i] > arr[i + 1] > ... > arr[arr.length - 1]\`

Given an integer array \`arr\`, return the length of the longest subarray, which is a mountain. Return \`0\` if there is no mountain subarray.`,
        difficulty: 'hard',
        category: 'two-pointers',
        isPremium: true,
        functionName: 'longest_mountain',
        examples: [
            { input: 'arr = [2,1,4,7,3,2,5]', output: '5', explanation: 'The largest mountain is [1,4,7,3,2] which has length 5.' },
            { input: 'arr = [2,2,2]', output: '0', explanation: 'There is no mountain.' },
        ],
        constraints: ['1 <= arr.length <= 10^4', '0 <= arr[i] <= 10^4'],
        testCases: [
            { input: { arr: [2, 1, 4, 7, 3, 2, 5] }, expectedOutput: 5 },
            { input: { arr: [2, 2, 2] }, expectedOutput: 0 },
            { input: { arr: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1] }, expectedOutput: 10 },
            { input: { arr: [1, 2, 1] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def longest_mountain(arr: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function longestMountain(arr) {
    // Write your solution here
}`,
            java: `class Solution {
    public int longestMountain(int[] arr) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // HEAP
    {
        title: 'Top K Frequent Elements',
        description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. Return the result **sorted in ascending order**.`,
        difficulty: 'medium',
        category: 'heap',
        isPremium: false,
        functionName: 'top_k_frequent',
        examples: [
            { input: 'nums = [4,4,4,5,5,6,7,7,7,7], k = 2', output: '[4,7]', explanation: '4 appears 3 times and 7 appears 4 times; those are the two most frequent values.' },
            { input: 'nums = [1], k = 1', output: '[1]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', 'k is in the range [1, the number of distinct elements in nums].', 'It is guaranteed that the answer is unique.'],
        testCases: [
            { input: { nums: [4, 4, 4, 5, 5, 6, 7, 7, 7, 7], k: 2 }, expectedOutput: [4, 7] },
            { input: { nums: [1], k: 1 }, expectedOutput: [1] },
            { input: { nums: [3, 3, 3, 3, 2, 2, 1], k: 3 }, expectedOutput: [1, 2, 3] },
            { input: { nums: [1, 2, 2, 3, 3, 3], k: 1 }, expectedOutput: [3], isHidden: true },
        ],
        starterCode: {
            python: `def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function topKFrequent(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Kth Largest Element in a Stream',
        description: `Design a class to find the \`kth\` largest element in a stream. Note that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element.

Implement \`KthLargest\` class:
- \`KthLargest(int k, int[] nums)\` Initializes the object with the integer \`k\` and the stream of integers \`nums\`.
- \`int add(int val)\` Appends the integer \`val\` to the stream and returns the element representing the \`kth\` largest element in the stream.`,
        difficulty: 'medium',
        category: 'heap',
        isPremium: false,
        functionName: 'KthLargest',
        executionType: 'multi-call',
        examples: [
            { input: '["KthLargest","add","add","add","add","add"]\n[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]', output: '[null,4,5,5,8,8]', explanation: '' },
        ],
        constraints: ['1 <= k <= 10^4', '0 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', '-10^4 <= val <= 10^4', 'At least k elements will exist in the stream before an add call.'],
        testCases: [
            {
                input: {
                    operations: ['KthLargest', 'add', 'add', 'add', 'add', 'add'],
                    args: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
                },
                expectedOutput: [null, 4, 5, 5, 8, 8]
            },
        ],
        starterCode: {
            python: `class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        # Write your solution here
        pass

    def add(self, val: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class KthLargest {
    constructor(k, nums) {
        // Write your solution here
    }

    add(val) {
        // Write your solution here
    }
}`,
            java: `class KthLargest {
    public KthLargest(int k, int[] nums) {
        // Write your solution here
    }

    public int add(int val) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Minimum Cost to Connect Sticks',
        description: `You have some number of sticks with positive integer lengths. These lengths are given as an array \`sticks\`, where \`sticks[i]\` is the length of the \`ith\` stick.

You can connect any two sticks of lengths \`x\` and \`y\` into one stick by paying a cost of \`x + y\`. You must connect all the sticks until there is only one stick remaining.

Return the minimum cost of connecting all the given sticks into one stick in this way.`,
        difficulty: 'medium',
        category: 'heap',
        isPremium: false,
        functionName: 'connect_sticks',
        examples: [
            { input: 'sticks = [2,4,3]', output: '14', explanation: 'Connect 2 and 3 for a cost of 5. Now we have sticks = [5, 4]. Connect 5 and 4 for a cost of 9. There is only one stick left, so return 14.' },
            { input: 'sticks = [1,8,3,5]', output: '30', explanation: '' },
        ],
        constraints: ['1 <= sticks.length <= 10^4', '1 <= sticks[i] <= 10^4'],
        testCases: [
            { input: { sticks: [2, 4, 3] }, expectedOutput: 14 },
            { input: { sticks: [1, 8, 3, 5] }, expectedOutput: 30 },
            { input: { sticks: [5] }, expectedOutput: 0 },
            { input: { sticks: [1, 2] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def connect_sticks(sticks: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function connectSticks(sticks) {
    // Write your solution here
}`,
            java: `class Solution {
    public int connectSticks(int[] sticks) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Furthest Building You Can Reach',
        description: `You are given an integer array \`heights\` representing the heights of buildings, some \`bricks\`, and some \`ladders\`.

You start your journey from building \`0\` and move to the next building by possibly using bricks or ladders. While moving from building \`i\` to building \`i + 1\` (0-indexed):
- If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
- If the current building's height is less than the next building's height, you can either use one ladder or \`(h[i+1] - h[i])\` bricks.

Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.`,
        difficulty: 'medium',
        category: 'heap',
        isPremium: true,
        functionName: 'furthest_building',
        examples: [
            { input: 'heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1', output: '4', explanation: '' },
            { input: 'heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2', output: '7', explanation: '' },
        ],
        constraints: ['1 <= heights.length <= 10^5', '1 <= heights[i] <= 10^6', '0 <= bricks <= 10^9', '0 <= ladders <= heights.length'],
        testCases: [
            { input: { heights: [4, 2, 7, 6, 9, 14, 12], bricks: 5, ladders: 1 }, expectedOutput: 4 },
            { input: { heights: [4, 12, 2, 7, 3, 18, 20, 3, 19], bricks: 10, ladders: 2 }, expectedOutput: 7 },
            { input: { heights: [14, 3, 19, 3], bricks: 17, ladders: 0 }, expectedOutput: 3 },
            { input: { heights: [1, 2, 3], bricks: 0, ladders: 0 }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def furthest_building(heights: list[int], bricks: int, ladders: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function furthestBuilding(heights, bricks, ladders) {
    // Write your solution here
}`,
            java: `class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Trapping Rain Water II',
        description: `Given an \`m x n\` integer matrix \`heightMap\` representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.`,
        difficulty: 'hard',
        category: 'heap',
        isPremium: true,
        functionName: 'trap_rain_water_grid',
        examples: [
            { input: 'heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]', output: '4', explanation: '' },
        ],
        constraints: ['m == heightMap.length', 'n == heightMap[i].length', '1 <= m, n <= 200', '0 <= heightMap[i][j] <= 2 * 10^4'],
        testCases: [
            { input: { heightMap: [[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]] }, expectedOutput: 4 },
            { input: { heightMap: [[3, 3, 3, 3, 3], [3, 2, 2, 2, 3], [3, 2, 1, 2, 3], [3, 2, 2, 2, 3], [3, 3, 3, 3, 3]] }, expectedOutput: 10 },
            { input: { heightMap: [[1, 2], [3, 4]] }, expectedOutput: 0 },
            { input: { heightMap: [[12, 13, 1, 12], [13, 4, 13, 12], [13, 8, 10, 12], [12, 13, 12, 12], [13, 13, 13, 13]] }, expectedOutput: 14, isHidden: true },
        ],
        starterCode: {
            python: `def trap_rain_water_grid(heightMap: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function trapRainWaterGrid(heightMap) {
    // Write your solution here
}`,
            java: `class Solution {
    public int trapRainWaterGrid(int[][] heightMap) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // SLIDING WINDOW
    {
        title: 'Longest Substring with At Most K Distinct Characters',
        description: `Given a string \`s\` and an integer \`k\`, return the length of the longest substring of \`s\` that contains at most \`k\` distinct characters.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: true,
        functionName: 'length_of_longest_substring_k_distinct',
        examples: [
            { input: 's = "eceba", k = 2', output: '3', explanation: 'The substring is "ece" with length 3.' },
            { input: 's = "aa", k = 1', output: '2', explanation: 'The substring is "aa" with length 2.' },
        ],
        constraints: ['1 <= s.length <= 5 * 10^4', '0 <= k <= 50'],
        testCases: [
            { input: { s: 'eceba', k: 2 }, expectedOutput: 3 },
            { input: { s: 'aa', k: 1 }, expectedOutput: 2 },
            { input: { s: 'a', k: 0 }, expectedOutput: 0 },
            { input: { s: 'abcabcabc', k: 2 }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def length_of_longest_substring_k_distinct(s: str, k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function lengthOfLongestSubstringKDistinct(s, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Fruit Into Baskets',
        description: `You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array \`fruits\` where \`fruits[i]\` is the type of fruit the \`ith\` tree produces.

You want to collect as much fruit as possible, subject to these rules:
- You only have two baskets, and each basket can only hold a single type of fruit. There is no limit to the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. Once you reach a tree with fruit that your baskets cannot hold, you stop.

Given the integer array \`fruits\`, return the maximum number of fruits you can pick.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: false,
        functionName: 'total_fruit',
        examples: [
            { input: 'fruits = [1,2,1]', output: '3', explanation: 'We can pick from all 3 trees.' },
            { input: 'fruits = [0,1,2,2]', output: '3', explanation: 'We can pick from trees [1,2,2].' },
        ],
        constraints: ['1 <= fruits.length <= 10^5', '0 <= fruits[i] < fruits.length'],
        testCases: [
            { input: { fruits: [1, 2, 1] }, expectedOutput: 3 },
            { input: { fruits: [0, 1, 2, 2] }, expectedOutput: 3 },
            { input: { fruits: [1, 2, 3, 2, 2] }, expectedOutput: 4 },
            { input: { fruits: [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4] }, expectedOutput: 5, isHidden: true },
        ],
        starterCode: {
            python: `def total_fruit(fruits: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function totalFruit(fruits) {
    // Write your solution here
}`,
            java: `class Solution {
    public int totalFruit(int[] fruits) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Find All Anagrams in a String',
        description: `Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s anagrams in \`s\`. You may return the answer in any order — but here, always return the indices in ascending order.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: false,
        functionName: 'find_anagrams',
        examples: [
            { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]', explanation: '' },
            { input: 's = "abab", p = "ab"', output: '[0,1,2]', explanation: '' },
        ],
        constraints: ['1 <= s.length, p.length <= 3 * 10^4', 's and p consist of lowercase English letters.'],
        testCases: [
            { input: { s: 'cbaebabacd', p: 'abc' }, expectedOutput: [0, 6] },
            { input: { s: 'abab', p: 'ab' }, expectedOutput: [0, 1, 2] },
            { input: { s: 'a', p: 'a' }, expectedOutput: [0] },
            { input: { s: 'ab', p: 'c' }, expectedOutput: [], isHidden: true },
        ],
        starterCode: {
            python: `def find_anagrams(s: str, p: str) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findAnagrams(s, p) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findAnagrams(String s, String p) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Max Consecutive Ones III',
        description: `Given a binary array \`nums\` and an integer \`k\`, return the maximum number of consecutive \`1\`'s in the array if you can flip at most \`k\` \`0\`'s.`,
        difficulty: 'medium',
        category: 'sliding-window',
        isPremium: false,
        functionName: 'longest_ones',
        examples: [
            { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6', explanation: '' },
            { input: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3', output: '10', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', 'nums[i] is either 0 or 1.', '0 <= k <= nums.length'],
        testCases: [
            { input: { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2 }, expectedOutput: 6 },
            { input: { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3 }, expectedOutput: 10 },
            { input: { nums: [0, 0, 0], k: 0 }, expectedOutput: 0 },
            { input: { nums: [1, 1, 1], k: 0 }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def longest_ones(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function longestOnes(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int longestOnes(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Subarrays with K Different Integers',
        description: `Given an integer array \`nums\` and an integer \`k\`, return the number of good subarrays of \`nums\`.

A good array is an array where the number of different integers in that array is exactly \`k\`.`,
        difficulty: 'hard',
        category: 'sliding-window',
        isPremium: true,
        functionName: 'subarrays_with_k_distinct',
        examples: [
            { input: 'nums = [1,2,1,2,3], k = 2', output: '7', explanation: 'Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].' },
            { input: 'nums = [1,2,1,3,4], k = 3', output: '3', explanation: 'Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].' },
        ],
        constraints: ['1 <= nums.length <= 2 * 10^4', '1 <= nums[i], k <= nums.length'],
        testCases: [
            { input: { nums: [1, 2, 1, 2, 3], k: 2 }, expectedOutput: 7 },
            { input: { nums: [1, 2, 1, 3, 4], k: 3 }, expectedOutput: 3 },
            { input: { nums: [1, 1, 1], k: 1 }, expectedOutput: 6 },
            { input: { nums: [1, 2, 3], k: 1 }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def subarrays_with_k_distinct(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function subarraysWithKDistinct(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // MATRIX
    {
        title: 'Image Smoother',
        description: `An image smoother is a filter of the size \`3 x 3\` that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average (i.e., the average of the four cells in the red smoother).

Given an \`m x n\` integer matrix \`img\` representing the grayscale of an image, return the image after applying the smoother on each cell of it.`,
        difficulty: 'medium',
        category: 'matrix',
        isPremium: false,
        functionName: 'image_smoother',
        examples: [
            { input: 'img = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[0,0,0],[0,0,0],[0,0,0]]', explanation: '' },
            { input: 'img = [[100,200,100],[200,50,200],[100,200,100]]', output: '[[137,141,137],[123,138,123],[137,141,137]]', explanation: '' },
        ],
        constraints: ['m == img.length', 'n == img[i].length', '1 <= m, n <= 200', '0 <= img[i][j] <= 255'],
        testCases: [
            { input: { img: [[1, 1, 1], [1, 0, 1], [1, 1, 1]] }, expectedOutput: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] },
            { input: { img: [[100, 200, 100], [200, 50, 200], [100, 200, 100]] }, expectedOutput: [[137, 141, 137], [123, 138, 123], [137, 141, 137]] },
            { input: { img: [[0]] }, expectedOutput: [[0]] },
            { input: { img: [[2, 2], [2, 2]] }, expectedOutput: [[2, 2], [2, 2]], isHidden: true },
        ],
        starterCode: {
            python: `def image_smoother(img: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function imageSmoother(img) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] imageSmoother(int[][] img) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Search a 2D Matrix',
        description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` if \`target\` is in \`matrix\` or \`false\` otherwise.

You must write a solution in \`O(log(m * n))\` time complexity.`,
        difficulty: 'medium',
        category: 'matrix',
        isPremium: false,
        functionName: 'search_matrix',
        examples: [
            { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true', explanation: '' },
            { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false', explanation: '' },
        ],
        constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
        testCases: [
            { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 }, expectedOutput: true },
            { input: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 }, expectedOutput: false },
            { input: { matrix: [[1]], target: 1 }, expectedOutput: true },
            { input: { matrix: [[1, 3]], target: 3 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function searchMatrix(matrix, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Diagonal Traverse',
        description: `Given an \`m x n\` matrix \`mat\`, return an array of all the elements of the array in a diagonal order (zigzagging up-right then down-left, LeetCode-style).`,
        difficulty: 'medium',
        category: 'matrix',
        isPremium: false,
        functionName: 'find_diagonal_order',
        examples: [
            { input: 'mat = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,4,7,5,3,6,8,9]', explanation: '' },
            { input: 'mat = [[1,2],[3,4]]', output: '[1,2,3,4]', explanation: '' },
        ],
        constraints: ['m == mat.length', 'n == mat[i].length', '1 <= m, n <= 10^4', '1 <= m * n <= 10^4', '-10^5 <= mat[i][j] <= 10^5'],
        testCases: [
            { input: { mat: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }, expectedOutput: [1, 2, 4, 7, 5, 3, 6, 8, 9] },
            { input: { mat: [[1, 2], [3, 4]] }, expectedOutput: [1, 2, 3, 4] },
            { input: { mat: [[1]] }, expectedOutput: [1] },
            { input: { mat: [[1, 2, 3]] }, expectedOutput: [1, 2, 3], isHidden: true },
        ],
        starterCode: {
            python: `def find_diagonal_order(mat: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findDiagonalOrder(mat) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findDiagonalOrder(int[][] mat) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Word Search',
        description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
        difficulty: 'medium',
        category: 'matrix',
        isPremium: true,
        functionName: 'exist',
        examples: [
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true', explanation: '' },
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false', explanation: '' },
        ],
        constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15', 'board and word consist of only uppercase and lowercase English letters.'],
        testCases: [
            { input: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'ABCCED' }, expectedOutput: true },
            { input: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'SEE' }, expectedOutput: true },
            { input: { board: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], word: 'ABCB' }, expectedOutput: false },
            { input: { board: [['A']], word: 'A' }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def exist(board: list[list[str]], word: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function exist(board, word) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Valid Sudoku',
        description: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
1. Each row must contain the digits \`1-9\` without repetition.
2. Each column must contain the digits \`1-9\` without repetition.
3. Each of the nine \`3 x 3\` sub-boxes must contain the digits \`1-9\` without repetition.

Note: A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated according to the mentioned rules. Empty cells are represented by \`'.'\`.`,
        difficulty: 'hard',
        category: 'matrix',
        isPremium: true,
        functionName: 'is_valid_sudoku',
        examples: [
            { input: 'board = [["5","3",".",".","7",".",".",".","."], ...]', output: 'true', explanation: 'A standard partially-filled valid Sudoku board.' },
        ],
        constraints: ['board.length == 9', 'board[i].length == 9', "board[i][j] is a digit 1-9 or '.'."],
        testCases: [
            {
                input: {
                    board: [
                        ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
                        ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
                        ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
                        ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
                        ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
                        ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
                        ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
                        ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
                        ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
                    ]
                }, expectedOutput: true
            },
            {
                input: {
                    board: [
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                    ]
                }, expectedOutput: true
            },
            {
                input: {
                    board: [
                        ['1', '1', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                    ]
                }, expectedOutput: false, isHidden: true
            },
        ],
        starterCode: {
            python: `def is_valid_sudoku(board: list[list[str]]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isValidSudoku(board) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // SORTING
    {
        title: 'Relative Sort Array',
        description: `Given two arrays \`arr1\` and \`arr2\`, the elements of \`arr2\` are distinct, and all elements in \`arr2\` are also in \`arr1\`.

Sort the elements of \`arr1\` such that the relative ordering of items in \`arr1\` are the same as in \`arr2\`. Elements that do not appear in \`arr2\` should be placed at the end of \`arr1\` in **ascending** order.`,
        difficulty: 'easy',
        category: 'sorting',
        isPremium: false,
        functionName: 'relative_sort_array',
        examples: [
            { input: 'arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]', output: '[2,2,2,1,4,3,3,9,6,7,19]', explanation: '' },
            { input: 'arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]', output: '[22,28,8,6,17,44]', explanation: '' },
        ],
        constraints: ['1 <= arr1.length, arr2.length <= 1000', '0 <= arr1[i], arr2[i] <= 1000', 'All the elements of arr2 are distinct.', 'Each arr2[i] is in arr1.'],
        testCases: [
            { input: { arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], arr2: [2, 1, 4, 3, 9, 6] }, expectedOutput: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19] },
            { input: { arr1: [28, 6, 22, 8, 44, 17], arr2: [22, 28, 8, 6] }, expectedOutput: [22, 28, 8, 6, 17, 44] },
            { input: { arr1: [1, 1], arr2: [1] }, expectedOutput: [1, 1] },
            { input: { arr1: [5, 3, 1], arr2: [1] }, expectedOutput: [1, 3, 5], isHidden: true },
        ],
        starterCode: {
            python: `def relative_sort_array(arr1: list[int], arr2: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function relativeSortArray(arr1, arr2) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Meeting Rooms',
        description: `Given an array of meeting time \`intervals\` where \`intervals[i] = [starti, endi]\`, determine if a person could attend all meetings.`,
        difficulty: 'easy',
        category: 'sorting',
        isPremium: false,
        functionName: 'can_attend_meetings',
        examples: [
            { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explanation: '' },
            { input: 'intervals = [[7,10],[2,4]]', output: 'true', explanation: '' },
        ],
        constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti < endi <= 10^6'],
        testCases: [
            { input: { intervals: [[0, 30], [5, 10], [15, 20]] }, expectedOutput: false },
            { input: { intervals: [[7, 10], [2, 4]] }, expectedOutput: true },
            { input: { intervals: [] }, expectedOutput: true },
            { input: { intervals: [[1, 5], [5, 10]] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function canAttendMeetings(intervals) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Height Checker',
        description: `A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height.

Given an integer array \`heights\` representing the current order that the students are standing in, return the number of indices where \`heights[i]\` does not match the expected (sorted) order.`,
        difficulty: 'easy',
        category: 'sorting',
        isPremium: false,
        functionName: 'height_checker',
        examples: [
            { input: 'heights = [1,1,4,2,1,3]', output: '3', explanation: 'expected = [1,1,1,2,3,4]. Indices 2, 4, and 5 do not match.' },
            { input: 'heights = [5,1,2,3,4]', output: '5', explanation: '' },
        ],
        constraints: ['1 <= heights.length <= 100', '1 <= heights[i] <= 100'],
        testCases: [
            { input: { heights: [1, 1, 4, 2, 1, 3] }, expectedOutput: 3 },
            { input: { heights: [5, 1, 2, 3, 4] }, expectedOutput: 5 },
            { input: { heights: [1, 2, 3, 4, 5] }, expectedOutput: 0 },
            { input: { heights: [1] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def height_checker(heights: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function heightChecker(heights) {
    // Write your solution here
}`,
            java: `class Solution {
    public int heightChecker(int[] heights) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Sort Array by Increasing Frequency',
        description: `Given an array of integers \`nums\`, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.`,
        difficulty: 'medium',
        category: 'sorting',
        isPremium: false,
        functionName: 'frequency_sort',
        examples: [
            { input: 'nums = [1,1,2,2,2,3]', output: '[3,1,1,2,2,2]', explanation: '"3" has a frequency of 1, "1" has a frequency of 2, and "2" has a frequency of 3.' },
            { input: 'nums = [2,3,1,3,2]', output: '[1,3,3,2,2]', explanation: '"2" and "3" both have a frequency of 2, so they are sorted in decreasing order.' },
        ],
        constraints: ['1 <= nums.length <= 100', '-1000 <= nums[i] <= 1000'],
        testCases: [
            { input: { nums: [1, 1, 2, 2, 2, 3] }, expectedOutput: [3, 1, 1, 2, 2, 2] },
            { input: { nums: [2, 3, 1, 3, 2] }, expectedOutput: [1, 3, 3, 2, 2] },
            { input: { nums: [-1, 1, -6, 4, 5, -6, 1, 4, 1] }, expectedOutput: [5, -1, 4, 4, -6, -6, 1, 1, 1] },
            { input: { nums: [1] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `def frequency_sort(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function frequencySort(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] frequencySort(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Maximum Gap',
        description: `Given an integer array \`nums\`, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return \`0\`.

You must write an algorithm that runs in linear time and uses linear extra space.`,
        difficulty: 'hard',
        category: 'sorting',
        isPremium: true,
        functionName: 'maximum_gap',
        examples: [
            { input: 'nums = [3,6,9,1]', output: '3', explanation: 'The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.' },
            { input: 'nums = [10]', output: '0', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '0 <= nums[i] <= 10^9'],
        testCases: [
            { input: { nums: [3, 6, 9, 1] }, expectedOutput: 3 },
            { input: { nums: [10] }, expectedOutput: 0 },
            { input: { nums: [1, 10, 100] }, expectedOutput: 90 },
            { input: { nums: [1, 1, 1, 1] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def maximum_gap(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maximumGap(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maximumGap(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // UNION FIND
    {
        title: 'Most Stones Removed with Same Row or Column',
        description: `On a 2D plane, we place \`n\` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

Given an array \`stones\` of length \`n\` where \`stones[i] = [xi, yi]\` represents the location of the \`ith\` stone, return the largest possible number of stones that can be removed.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: false,
        functionName: 'remove_stones',
        examples: [
            { input: 'stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]', output: '5', explanation: '' },
            { input: 'stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]', output: '3', explanation: '' },
        ],
        constraints: ['1 <= stones.length <= 1000', '0 <= xi, yi <= 10^4', 'No two stones are at the same coordinate point.'],
        testCases: [
            { input: { stones: [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]] }, expectedOutput: 5 },
            { input: { stones: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]] }, expectedOutput: 3 },
            { input: { stones: [[0, 0]] }, expectedOutput: 0 },
            { input: { stones: [[0, 0], [1, 1]] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def remove_stones(stones: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function removeStones(stones) {
    // Write your solution here
}`,
            java: `class Solution {
    public int removeStones(int[][] stones) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Smallest String With Swaps',
        description: `You are given a string \`s\`, and an array of pairs of indices \`pairs\` where \`pairs[i] = [a, b]\` indicates 2 indices (0-indexed) of the string.

You can swap the characters at any pair of indices in the given \`pairs\` **any number of times**.

Return the lexicographically smallest string that \`s\` can be changed to after using the swaps.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: true,
        functionName: 'smallest_string_with_swaps',
        examples: [
            { input: 's = "dcab", pairs = [[0,3],[1,2]]', output: '"bacd"', explanation: '' },
            { input: 's = "dcab", pairs = [[0,3],[1,2],[0,2]]', output: '"abcd"', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^5', '0 <= pairs.length <= 10^5', 'pairs[i].length == 2', '0 <= a, b < s.length', 's consists of only lowercase English letters.'],
        testCases: [
            { input: { s: 'dcab', pairs: [[0, 3], [1, 2]] }, expectedOutput: 'bacd' },
            { input: { s: 'dcab', pairs: [[0, 3], [1, 2], [0, 2]] }, expectedOutput: 'abcd' },
            { input: { s: 'cba', pairs: [[0, 1], [1, 2]] }, expectedOutput: 'abc' },
            { input: { s: 'a', pairs: [] }, expectedOutput: 'a', isHidden: true },
        ],
        starterCode: {
            python: `def smallest_string_with_swaps(s: str, pairs: list[list[int]]) -> str:
    # Write your solution here
    pass`,
            javascript: `function smallestStringWithSwaps(s, pairs) {
    // Write your solution here
}`,
            java: `class Solution {
    public String smallestStringWithSwaps(String s, int[][] pairs) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Number of Islands II',
        description: `You are given an empty 2D binary grid \`grid\` of size \`m x n\`. The grid represents a map where \`0\`'s represent water and \`1\`'s represent land. Initially, all the cells of \`grid\` are water cells (i.e., all the cells are \`0\`).

We may perform an add land operation which turns the water at position into a land. You are given an array \`positions\` where \`positions[i] = [ri, ci]\` is the position to operate on \`grid[ri][ci]\`.

Return an array of integers \`answer\` where \`answer[i]\` is the number of islands after turning the cell in the \`ith\` position into land.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
        difficulty: 'hard',
        category: 'union-find',
        isPremium: true,
        functionName: 'num_islands2',
        examples: [
            { input: 'm = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]', output: '[1,1,2,3]', explanation: '' },
        ],
        constraints: ['1 <= m, n, positions.length <= 10^4', '1 <= m * n <= 10^4', 'positions[i].length == 2', '0 <= ri < m', '0 <= ci < n'],
        testCases: [
            { input: { m: 3, n: 3, positions: [[0, 0], [0, 1], [1, 2], [2, 1]] }, expectedOutput: [1, 1, 2, 3] },
            { input: { m: 1, n: 1, positions: [[0, 0]] }, expectedOutput: [1] },
            { input: { m: 2, n: 2, positions: [[0, 0], [1, 1], [0, 1], [1, 0]] }, expectedOutput: [1, 2, 1, 1] },
            { input: { m: 3, n: 3, positions: [[0, 0], [0, 0]] }, expectedOutput: [1, 1], isHidden: true },
        ],
        starterCode: {
            python: `def num_islands2(m: int, n: int, positions: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function numIslands2(m, n, positions) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] numIslands2(int m, int n, int[][] positions) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Satisfiability of Equality Equations',
        description: `You are given an array of strings \`equations\` that represent relationships between variables where each string \`equations[i]\` is of length 4 and takes one of two different forms: \`"xi==yi"\` or \`"xi!=yi"\`. Here, \`xi\` and \`yi\` are lowercase letters (not necessarily different) that represent one-letter variable names.

Return \`true\` if it is possible to assign integers to variable names so as to satisfy all the given equations, or \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: false,
        functionName: 'equations_possible',
        examples: [
            { input: 'equations = ["a==b","b!=a"]', output: 'false', explanation: '' },
            { input: 'equations = ["b==a","a==b"]', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= equations.length <= 500', 'equations[i].length == 4', 'equations[i][0] and equations[i][3] are lowercase letters.', "equations[i][1] is either '=' or '!'.", "equations[i][2] is '='."],
        testCases: [
            { input: { equations: ['a==b', 'b!=a'] }, expectedOutput: false },
            { input: { equations: ['b==a', 'a==b'] }, expectedOutput: true },
            { input: { equations: ['a==b', 'b==c', 'a==c'] }, expectedOutput: true },
            { input: { equations: ['a==b', 'b!=c', 'c==a'] }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def equations_possible(equations: list[str]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function equationsPossible(equations) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean equationsPossible(String[] equations) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Number of Operations to Make Network Connected',
        description: `There are \`n\` computers numbered from \`0\` to \`n - 1\` connected by ethernet cables \`connections\` forming a network where \`connections[i] = [ai, bi]\` represents a connection between computers \`ai\` and \`bi\`. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network \`connections\`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return \`-1\`.`,
        difficulty: 'medium',
        category: 'union-find',
        isPremium: false,
        functionName: 'make_connected',
        examples: [
            { input: 'n = 4, connections = [[0,1],[0,2],[1,2]]', output: '1', explanation: '' },
            { input: 'n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]', output: '2', explanation: '' },
        ],
        constraints: ['1 <= n <= 10^5', '1 <= connections.length <= min(n * (n - 1) / 2, 10^5)', 'connections[i].length == 2', '0 <= ai, bi < n', 'ai != bi', 'There are no repeated connections.'],
        testCases: [
            { input: { n: 4, connections: [[0, 1], [0, 2], [1, 2]] }, expectedOutput: 1 },
            { input: { n: 6, connections: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]] }, expectedOutput: 2 },
            { input: { n: 6, connections: [[0, 1], [0, 2], [0, 3], [1, 2]] }, expectedOutput: -1 },
            { input: { n: 5, connections: [[0, 1], [0, 2], [3, 4], [2, 3]] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def make_connected(n: int, connections: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function makeConnected(n, connections) {
    // Write your solution here
}`,
            java: `class Solution {
    public int makeConnected(int n, int[][] connections) {
        // Write your solution here
        return -1;
    }
}`
        }
    },

    // TOPOLOGICAL SORT
    {
        title: 'Alien Dictionary',
        description: `There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings \`words\` from the alien language's dictionary, where the strings in \`words\` are **sorted lexicographically** by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \`""\`. If there are multiple valid solutions, return **any of them** — but every test case in this problem has a unique valid ordering.`,
        difficulty: 'hard',
        category: 'topological-sort',
        isPremium: true,
        functionName: 'alien_order',
        examples: [
            { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"', explanation: '' },
            { input: 'words = ["z","x"]', output: '"zx"', explanation: '' },
            { input: 'words = ["z","x","z"]', output: '""', explanation: 'The order is invalid, so return "".' },
        ],
        constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'words[i] consists of only lowercase English letters.'],
        testCases: [
            { input: { words: ['wrt', 'wrf', 'er', 'ett', 'rftt'] }, expectedOutput: 'wertf' },
            { input: { words: ['z', 'x'] }, expectedOutput: 'zx' },
            { input: { words: ['z', 'x', 'z'] }, expectedOutput: '' },
            { input: { words: ['abc', 'ab'] }, expectedOutput: '', isHidden: true },
        ],
        starterCode: {
            python: `def alien_order(words: list[str]) -> str:
    # Write your solution here
    pass`,
            javascript: `function alienOrder(words) {
    // Write your solution here
}`,
            java: `class Solution {
    public String alienOrder(String[] words) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Parallel Courses',
        description: `You are given an integer \`n\`, which indicates that there are \`n\` courses labeled from \`1\` to \`n\`. You are also given an array \`relations\` where \`relations[i] = [prevCoursei, nextCoursei]\`, representing a prerequisite relationship between course \`prevCoursei\` and course \`nextCoursei\`: course \`prevCoursei\` has to be taken before course \`nextCoursei\`.

In one semester, you can take **any number** of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking.

Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return \`-1\`.`,
        difficulty: 'medium',
        category: 'topological-sort',
        isPremium: false,
        functionName: 'minimum_semesters',
        examples: [
            { input: 'n = 3, relations = [[1,3],[2,3]]', output: '2', explanation: '' },
            { input: 'n = 3, relations = [[1,2],[2,3],[3,1]]', output: '-1', explanation: 'No course can be studied because they are prerequisites of each other.' },
        ],
        constraints: ['1 <= n <= 5000', '1 <= relations.length <= 5000', 'relations[i].length == 2', '1 <= prevCoursei, nextCoursei <= n', 'prevCoursei != nextCoursei'],
        testCases: [
            { input: { n: 3, relations: [[1, 3], [2, 3]] }, expectedOutput: 2 },
            { input: { n: 3, relations: [[1, 2], [2, 3], [3, 1]] }, expectedOutput: -1 },
            { input: { n: 1, relations: [] }, expectedOutput: 1 },
            { input: { n: 4, relations: [[1, 2], [2, 3], [3, 4]] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def minimum_semesters(n: int, relations: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minimumSemesters(n, relations) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minimumSemesters(int n, int[][] relations) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Longest Increasing Path in a Matrix',
        description: `Given an \`m x n\` integers \`matrix\`, return the length of the longest increasing path in \`matrix\`.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary.`,
        difficulty: 'hard',
        category: 'topological-sort',
        isPremium: true,
        functionName: 'longest_increasing_path',
        examples: [
            { input: 'matrix = [[9,9,4],[6,6,8],[2,1,1]]', output: '4', explanation: 'The longest increasing path is [1, 2, 6, 9].' },
            { input: 'matrix = [[3,4,5],[3,2,6],[2,2,1]]', output: '4', explanation: 'The longest increasing path is [3, 4, 5, 6].' },
        ],
        constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '0 <= matrix[i][j] <= 2^31 - 1'],
        testCases: [
            { input: { matrix: [[9, 9, 4], [6, 6, 8], [2, 1, 1]] }, expectedOutput: 4 },
            { input: { matrix: [[3, 4, 5], [3, 2, 6], [2, 2, 1]] }, expectedOutput: 4 },
            { input: { matrix: [[1]] }, expectedOutput: 1 },
            { input: { matrix: [[1, 2], [4, 3]] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def longest_increasing_path(matrix: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function longestIncreasingPath(matrix) {
    // Write your solution here
}`,
            java: `class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'All Ancestors of a Node in a Directed Acyclic Graph',
        description: `You are given a positive integer \`n\` representing the number of nodes of a Directed Acyclic Graph (DAG). The nodes are numbered from \`0\` to \`n - 1\` (inclusive).

You are also given a 2D integer array \`edges\`, where \`edges[i] = [fromi, toi]\` denotes that there is a **unidirectional edge** from \`fromi\` to \`toi\`.

Return a list \`answer\`, where \`answer[i]\` is the list of ancestors of the \`ith\` node, sorted in **ascending order**.

A node \`u\` is an ancestor of another node \`v\` if \`u\` can reach \`v\` via a set of edges.`,
        difficulty: 'medium',
        category: 'topological-sort',
        isPremium: false,
        functionName: 'get_ancestors',
        examples: [
            { input: 'n = 8, edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]', output: '[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]', explanation: '' },
        ],
        constraints: ['1 <= n <= 1000', '0 <= edges.length <= min(2000, n * (n - 1) / 2)', 'edges[i].length == 2', '0 <= fromi, toi <= n - 1', 'fromi != toi', 'There are no duplicate edges.', 'The graph is directed and acyclic.'],
        testCases: [
            { input: { n: 8, edges: [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]] }, expectedOutput: [[], [], [], [0, 1], [0, 2], [0, 1, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3]] },
            { input: { n: 1, edges: [] }, expectedOutput: [[]] },
            { input: { n: 2, edges: [[0, 1]] }, expectedOutput: [[], [0]] },
            { input: { n: 3, edges: [[0, 1], [1, 2]] }, expectedOutput: [[], [0], [0, 1]], isHidden: true },
        ],
        starterCode: {
            python: `def get_ancestors(n: int, edges: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function getAncestors(n, edges) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] getAncestors(int n, int[][] edges) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Minimum Number of Vertices to Reach All Nodes',
        description: `Given a directed acyclic graph, with \`n\` vertices numbered from \`0\` to \`n - 1\`, and \`edges\`, where \`edges[i] = [fromi, toi]\` represents a directed edge from node \`fromi\` to node \`toi\`.

Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists. Return the answer sorted in **ascending order**.`,
        difficulty: 'medium',
        category: 'topological-sort',
        isPremium: false,
        functionName: 'find_smallest_set_of_vertices',
        examples: [
            { input: 'n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]', output: '[0,3]', explanation: '' },
            { input: 'n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]', output: '[0,2,3]', explanation: '' },
        ],
        constraints: ['2 <= n <= 10^5', '1 <= edges.length <= min(10^5, n * (n - 1) / 2)', 'edges[i].length == 2', '0 <= fromi, toi < n', 'All pairs (fromi, toi) are distinct.'],
        testCases: [
            { input: { n: 6, edges: [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]] }, expectedOutput: [0, 3] },
            { input: { n: 5, edges: [[0, 1], [2, 1], [3, 1], [1, 4], [2, 4]] }, expectedOutput: [0, 2, 3] },
            { input: { n: 3, edges: [] }, expectedOutput: [0, 1, 2] },
            { input: { n: 4, edges: [[0, 1], [1, 2], [2, 3]] }, expectedOutput: [0], isHidden: true },
        ],
        starterCode: {
            python: `def find_smallest_set_of_vertices(n: int, edges: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findSmallestSetOfVertices(n, edges) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findSmallestSetOfVertices(int n, int[][] edges) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // SIMULATION
    {
        title: 'Design Parking System',
        description: `Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.

Implement the \`ParkingSystem\` class:
- \`ParkingSystem(int big, int medium, int small)\` Initializes object of the \`ParkingSystem\` class. The number of slots for each parking space are given as part of the constructor.
- \`bool addCar(int carType)\` Checks whether there is a parking space of \`carType\` for the car that wants to get into the parking lot. \`carType\` can be of three kinds: big, medium, or small, which are represented by \`1\`, \`2\`, and \`3\` respectively. A car can only park in a parking space of its \`carType\`. If there is no space available, return \`false\`, else park the car in that size space and return \`true\`.`,
        difficulty: 'easy',
        category: 'simulation',
        isPremium: false,
        functionName: 'ParkingSystem',
        executionType: 'multi-call',
        examples: [
            { input: '["ParkingSystem","addCar","addCar","addCar","addCar"]\n[[1,1,0],[1],[2],[3],[1]]', output: '[null,true,true,false,false]', explanation: '' },
        ],
        constraints: ['0 <= big, medium, small <= 1000', 'carType is 1, 2, or 3.', 'At most 1000 calls will be made to addCar.'],
        testCases: [
            {
                input: {
                    operations: ['ParkingSystem', 'addCar', 'addCar', 'addCar', 'addCar'],
                    args: [[1, 1, 0], [1], [2], [3], [1]]
                },
                expectedOutput: [null, true, true, false, false]
            },
        ],
        starterCode: {
            python: `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        # Write your solution here
        pass

    def add_car(self, carType: int) -> bool:
        # Write your solution here
        pass`,
            javascript: `class ParkingSystem {
    constructor(big, medium, small) {
        // Write your solution here
    }

    addCar(carType) {
        // Write your solution here
    }
}`,
            java: `class ParkingSystem {
    public ParkingSystem(int big, int medium, int small) {
        // Write your solution here
    }

    public boolean addCar(int carType) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Count Square Submatrices with All Ones',
        description: `Given a \`m * n\` matrix of ones and zeros, return how many square submatrices have all ones.`,
        difficulty: 'medium',
        category: 'simulation',
        isPremium: false,
        functionName: 'count_squares',
        examples: [
            { input: 'matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]', output: '15', explanation: '' },
            { input: 'matrix = [[1,0,1],[1,1,0],[1,1,0]]', output: '7', explanation: '' },
        ],
        constraints: ['1 <= matrix.length <= 300', '1 <= matrix[i].length <= 300', 'matrix[i][j] is 0 or 1.'],
        testCases: [
            { input: { matrix: [[0, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]] }, expectedOutput: 15 },
            { input: { matrix: [[1, 0, 1], [1, 1, 0], [1, 1, 0]] }, expectedOutput: 7 },
            { input: { matrix: [[0]] }, expectedOutput: 0 },
            { input: { matrix: [[1]] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def count_squares(matrix: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function countSquares(matrix) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countSquares(int[][] matrix) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Minesweeper',
        description: `You are given an \`m x n\` char matrix \`board\` representing the game board where \`'M'\` represents an unrevealed mine, \`'E'\` represents an unrevealed empty square, \`'B'\` represents a revealed blank square that has no adjacent mines, a digit (\`'1'\` to \`'8'\`) represents how many mines are adjacent to this revealed square, and \`'X'\` represents a revealed mine.

You are also given an integer array \`click\` where \`click = [clickr, clickc]\` represents the next click position among all the unrevealed squares (\`'M'\` or \`'E'\`).

Return the board after revealing this position according to the following rules:
1. If a mine \`'M'\` is revealed, then the game is over. Change it to \`'X'\`.
2. If an empty square \`'E'\` with no adjacent mines is revealed, change it to a revealed blank \`'B'\` and all of its adjacent unrevealed squares should be revealed recursively.
3. If an empty square \`'E'\` with at least one adjacent mine is revealed, change it to a digit (\`'1'\` to \`'8'\`) representing the number of adjacent mines.
4. Return the board when no more squares will be revealed.`,
        difficulty: 'medium',
        category: 'simulation',
        isPremium: true,
        functionName: 'update_board',
        examples: [
            { input: 'board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]', output: '[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]', explanation: '' },
        ],
        constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 50', "board[i][j] is 'M', 'E', 'B', or a digit from '1' to '8'.", 'click.length == 2', '0 <= clickr < m', '0 <= clickc < n', "board[clickr][clickc] is either 'M' or 'E'."],
        testCases: [
            { input: { board: [['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'M', 'E', 'E'], ['E', 'E', 'E', 'E', 'E'], ['E', 'E', 'E', 'E', 'E']], click: [3, 0] }, expectedOutput: [['B', '1', 'E', '1', 'B'], ['B', '1', 'M', '1', 'B'], ['B', '1', '1', '1', 'B'], ['B', 'B', 'B', 'B', 'B']] },
            { input: { board: [['B', '1', 'E', '1', 'B'], ['B', '1', 'M', '1', 'B'], ['B', '1', '1', '1', 'B'], ['B', 'B', 'B', 'B', 'B']], click: [1, 2] }, expectedOutput: [['B', '1', 'E', '1', 'B'], ['B', '1', 'X', '1', 'B'], ['B', '1', '1', '1', 'B'], ['B', 'B', 'B', 'B', 'B']] },
            { input: { board: [['M']], click: [0, 0] }, expectedOutput: [['X']], isHidden: true },
        ],
        starterCode: {
            python: `def update_board(board: list[list[str]], click: list[int]) -> list[list[str]]:
    # Write your solution here
    pass`,
            javascript: `function updateBoard(board, click) {
    // Write your solution here
}`,
            java: `class Solution {
    public char[][] updateBoard(char[][] board, int[] click) {
        // Write your solution here
        return board;
    }
}`
        }
    },
    {
        title: 'Path Crossing',
        description: `Given a string \`path\`, where \`path[i] = 'N'\`, \`'S'\`, \`'E'\` or \`'W'\`, each representing moving one unit north, south, east, or west, respectively. You start at the origin \`(0, 0)\` on a 2D plane and walk on the path specified by \`path\`.

Return \`true\` if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'simulation',
        isPremium: false,
        functionName: 'is_path_crossing',
        examples: [
            { input: 'path = "NES"', output: 'false', explanation: 'The path does not cross itself.' },
            { input: 'path = "NESWW"', output: 'true', explanation: 'The path visits the origin a second time.' },
        ],
        constraints: ['1 <= path.length <= 10^4', "path[i] is one of 'N', 'S', 'E', or 'W'."],
        testCases: [
            { input: { path: 'NES' }, expectedOutput: false },
            { input: { path: 'NESWW' }, expectedOutput: true },
            { input: { path: 'N' }, expectedOutput: false },
            { input: { path: 'NS' }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_path_crossing(path: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isPathCrossing(path) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isPathCrossing(String path) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Number of Steps to Reduce a Number to Zero',
        description: `Given an integer \`num\`, return the number of steps to reduce it to zero.

In one step, if the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.`,
        difficulty: 'easy',
        category: 'simulation',
        isPremium: false,
        functionName: 'number_of_steps',
        examples: [
            { input: 'num = 14', output: '6', explanation: 'Step 1) 14 is even; divide by 2 and obtain 7. Step 2) 7 is odd; subtract 1 and obtain 6. Step 3) 6 is even; divide by 2 and obtain 3. Step 4) 3 is odd; subtract 1 and obtain 2. Step 5) 2 is even; divide by 2 and obtain 1. Step 6) 1 is odd; subtract 1 and obtain 0.' },
            { input: 'num = 8', output: '4', explanation: '' },
        ],
        constraints: ['0 <= num <= 10^6'],
        testCases: [
            { input: { num: 14 }, expectedOutput: 6 },
            { input: { num: 8 }, expectedOutput: 4 },
            { input: { num: 123 }, expectedOutput: 12 },
            { input: { num: 0 }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def number_of_steps(num: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function numberOfSteps(num) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numberOfSteps(int num) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // COUNTING
    {
        title: 'Majority Element II',
        description: `Given an integer array \`nums\` of size \`n\`, return all elements that appear more than \`⌊ n/3 ⌋\` times, sorted in **ascending order**.`,
        difficulty: 'medium',
        category: 'counting',
        isPremium: false,
        functionName: 'find_majority_elements',
        examples: [
            { input: 'nums = [3,2,3]', output: '[3]', explanation: '' },
            { input: 'nums = [1]', output: '[1]', explanation: '' },
            { input: 'nums = [1,2]', output: '[1,2]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
        testCases: [
            { input: { nums: [3, 2, 3] }, expectedOutput: [3] },
            { input: { nums: [1] }, expectedOutput: [1] },
            { input: { nums: [1, 2] }, expectedOutput: [1, 2] },
            { input: { nums: [2, 2] }, expectedOutput: [2], isHidden: true },
        ],
        starterCode: {
            python: `def find_majority_elements(nums: list[int]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function findMajorityElements(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] findMajorityElements(int[] nums) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },
    {
        title: 'Minimum Number of Frogs Croaking',
        description: `You are given the string \`croakOfFrogs\`, which represents a combination of the string \`"croak"\` from multiple frogs, that is, multiple frogs can croak at the same time, so multiple \`"croak"\` are mixed. Return the minimum number of different frogs to finish all the croaks in the given string.

A valid \`"croak"\` means a frog is printing five letters \`'c'\`, \`'r'\`, \`'o'\`, \`'a'\`, and \`'k'\` sequentially. The frogs have to print all five letters to finish a croak. If the given string is not a combination of a valid \`"croak"\` return \`-1\`.`,
        difficulty: 'hard',
        category: 'counting',
        isPremium: true,
        functionName: 'min_number_of_frogs',
        examples: [
            { input: 'croakOfFrogs = "croakcroak"', output: '1', explanation: 'One frog yelling "croak" twice.' },
            { input: 'croakOfFrogs = "crcoakroak"', output: '2', explanation: 'The minimum number of frogs is two.' },
        ],
        constraints: ['1 <= croakOfFrogs.length <= 10^5', "croakOfFrogs is either 'c', 'r', 'o', 'a', or 'k'."],
        testCases: [
            { input: { croakOfFrogs: 'croakcroak' }, expectedOutput: 1 },
            { input: { croakOfFrogs: 'crcoakroak' }, expectedOutput: 2 },
            { input: { croakOfFrogs: 'croak' }, expectedOutput: 1 },
            { input: { croakOfFrogs: 'croakcrook' }, expectedOutput: -1, isHidden: true },
        ],
        starterCode: {
            python: `def min_number_of_frogs(croakOfFrogs: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function minNumberOfFrogs(croakOfFrogs) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minNumberOfFrogs(String croakOfFrogs) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'First Unique Character in a String',
        description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return \`-1\`.`,
        difficulty: 'easy',
        category: 'counting',
        isPremium: false,
        functionName: 'first_uniq_char',
        examples: [
            { input: 's = "leetcode"', output: '0', explanation: '' },
            { input: 's = "loveleetcode"', output: '2', explanation: '' },
            { input: 's = "aabb"', output: '-1', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase English letters.'],
        testCases: [
            { input: { s: 'leetcode' }, expectedOutput: 0 },
            { input: { s: 'loveleetcode' }, expectedOutput: 2 },
            { input: { s: 'aabb' }, expectedOutput: -1 },
            { input: { s: 'z' }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def first_uniq_char(s: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function firstUniqChar(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public int firstUniqChar(String s) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Check if a String Contains All Binary Codes of Size K',
        description: `Given a binary string \`s\` and an integer \`k\`, return \`true\` if every binary code of length \`k\` is a substring of \`s\`. Otherwise, return \`false\`.`,
        difficulty: 'medium',
        category: 'counting',
        isPremium: true,
        functionName: 'has_all_codes',
        examples: [
            { input: 's = "00110110", k = 2', output: 'true', explanation: 'The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.' },
            { input: 's = "0110", k = 1', output: 'true', explanation: '' },
            { input: 's = "0110", k = 2', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 5 * 10^5', "s[i] is '0' or '1'.", '1 <= k <= 20'],
        testCases: [
            { input: { s: '00110110', k: 2 }, expectedOutput: true },
            { input: { s: '0110', k: 1 }, expectedOutput: true },
            { input: { s: '0110', k: 2 }, expectedOutput: false },
            { input: { s: '0000000001011100', k: 4 }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def has_all_codes(s: str, k: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function hasAllCodes(s, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean hasAllCodes(String s, int k) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Maximum Number of Balloons',
        description: `Given a string \`text\`, you want to use the characters of \`text\` to form as many instances of the word \`"balloon"\` as possible.

You can use each character in \`text\` at most once. Return the maximum number of instances that can be formed.`,
        difficulty: 'easy',
        category: 'counting',
        isPremium: false,
        functionName: 'max_number_of_balloons',
        examples: [
            { input: 'text = "nlaebolko"', output: '1', explanation: '' },
            { input: 'text = "loonbalxballpoon"', output: '2', explanation: '' },
            { input: 'text = "leetcode"', output: '0', explanation: '' },
        ],
        constraints: ['1 <= text.length <= 10^4', 'text consists of lowercase English letters.'],
        testCases: [
            { input: { text: 'nlaebolko' }, expectedOutput: 1 },
            { input: { text: 'loonbalxballpoon' }, expectedOutput: 2 },
            { input: { text: 'leetcode' }, expectedOutput: 0 },
            { input: { text: 'balloonballoon' }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def max_number_of_balloons(text: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxNumberOfBalloons(text) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxNumberOfBalloons(String text) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // SHORTEST PATH
    {
        title: 'Number of Ways to Arrive at Destination',
        description: `You are in a city that consists of \`n\` intersections numbered from \`0\` to \`n - 1\` with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

You are given an integer \`n\` and a 2D integer array \`roads\` where \`roads[i] = [ui, vi, timei]\` means that there is a road between intersections \`ui\` and \`vi\` that takes \`timei\` minutes to travel.

Return the number of ways to travel from intersection \`0\` to intersection \`n - 1\` in the **shortest amount of time**, modulo \`10^9 + 7\`.`,
        difficulty: 'hard',
        category: 'shortest-path',
        isPremium: true,
        functionName: 'count_paths',
        examples: [
            { input: 'n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]', output: '4', explanation: 'The shortest amount of time is 7, and there are 4 ways to reach it.' },
        ],
        constraints: ['1 <= n <= 200', 'n - 1 <= roads.length <= n * (n - 1) / 2', 'roads[i].length == 3', '0 <= ui, vi <= n - 1', '1 <= timei <= 10^9', 'ui != vi'],
        testCases: [
            { input: { n: 7, roads: [[0, 6, 7], [0, 1, 2], [1, 2, 3], [1, 3, 3], [6, 3, 3], [3, 5, 1], [6, 5, 1], [2, 5, 1], [0, 4, 5], [4, 6, 2]] }, expectedOutput: 4 },
            { input: { n: 2, roads: [[1, 0, 10]] }, expectedOutput: 1 },
            { input: { n: 3, roads: [[0, 1, 1], [1, 2, 1], [0, 2, 2]] }, expectedOutput: 2 },
            { input: { n: 1, roads: [] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def count_paths(n: int, roads: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function countPaths(n, roads) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countPaths(int n, int[][] roads) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
        description: `There are \`n\` cities numbered from \`0\` to \`n - 1\`. Given the array \`edges\` where \`edges[i] = [fromi, toi, weighti]\` represents a bidirectional and weighted edge between cities \`fromi\` and \`toi\`, and given the integer \`distanceThreshold\`.

Return the city with the smallest number of cities that are reachable through some path and whose distance is **at most** \`distanceThreshold\`. If there are multiple such cities, return the city with the greatest number.`,
        difficulty: 'medium',
        category: 'shortest-path',
        isPremium: false,
        functionName: 'find_the_city',
        examples: [
            { input: 'n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4', output: '3', explanation: '' },
            { input: 'n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2', output: '0', explanation: '' },
        ],
        constraints: ['2 <= n <= 100', '1 <= edges.length <= n * (n - 1) / 2', 'edges[i].length == 3', '0 <= fromi < toi < n', '1 <= weighti, distanceThreshold <= 10^4'],
        testCases: [
            { input: { n: 4, edges: [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], distanceThreshold: 4 }, expectedOutput: 3 },
            { input: { n: 5, edges: [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], distanceThreshold: 2 }, expectedOutput: 0 },
            { input: { n: 2, edges: [[0, 1, 1]], distanceThreshold: 1 }, expectedOutput: 1 },
            { input: { n: 3, edges: [[0, 1, 1], [1, 2, 1]], distanceThreshold: 1 }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def find_the_city(n: int, edges: list[list[int]], distanceThreshold: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function findTheCity(n, edges, distanceThreshold) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Minimum Cost to Make at Least One Valid Path in a Grid',
        description: `Given an \`m x n\` grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of \`grid[i][j]\` can be \`1\`, \`2\`, \`3\`, or \`4\` meaning going right, left, down, or up respectively.

You can modify the sign on a cell with a cost of \`1\`. You can move to any adjacent cell in one direction (does not have a sign because you are not moving with the original signs).

Return the minimum cost to make the grid have at least one valid path from cell \`(0, 0)\` to cell \`(m - 1, n - 1)\`.`,
        difficulty: 'hard',
        category: 'shortest-path',
        isPremium: true,
        functionName: 'min_cost_valid_path',
        examples: [
            { input: 'grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]', output: '3', explanation: '' },
            { input: 'grid = [[1,1,3],[3,2,2],[1,1,4]]', output: '0', explanation: '' },
        ],
        constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 100', '1 <= grid[i][j] <= 4'],
        testCases: [
            { input: { grid: [[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]] }, expectedOutput: 3 },
            { input: { grid: [[1, 1, 3], [3, 2, 2], [1, 1, 4]] }, expectedOutput: 0 },
            { input: { grid: [[1, 2], [4, 3]] }, expectedOutput: 1 },
            { input: { grid: [[2, 2, 2], [2, 2, 2]] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def min_cost_valid_path(grid: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minCostValidPath(grid) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minCostValidPath(int[][] grid) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Shortest Path in Binary Matrix',
        description: `Given an \`n x n\` binary matrix \`grid\`, return the length of the shortest clear path in the matrix. If there is no clear path, return \`-1\`.

A clear path in a binary matrix is a path from the top-left cell (i.e., \`(0, 0)\`) to the bottom-right cell (i.e., \`(n - 1, n - 1)\`) such that all the visited cells are \`0\` and all adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).

The length of a clear path is the number of visited cells of this path.`,
        difficulty: 'medium',
        category: 'shortest-path',
        isPremium: false,
        functionName: 'shortest_path_binary_matrix',
        examples: [
            { input: 'grid = [[0,1],[1,0]]', output: '2', explanation: '' },
            { input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]', output: '4', explanation: '' },
        ],
        constraints: ['n == grid.length', 'n == grid[i].length', '1 <= n <= 100', 'grid[i][j] is 0 or 1.'],
        testCases: [
            { input: { grid: [[0, 1], [1, 0]] }, expectedOutput: 2 },
            { input: { grid: [[0, 0, 0], [1, 1, 0], [1, 1, 0]] }, expectedOutput: 4 },
            { input: { grid: [[1, 0, 0], [1, 1, 0], [1, 1, 0]] }, expectedOutput: -1 },
            { input: { grid: [[0]] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def shortest_path_binary_matrix(grid: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function shortestPathBinaryMatrix(grid) {
    // Write your solution here
}`,
            java: `class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Shortest Path with Alternating Colors',
        description: `You are given an integer \`n\`, the number of nodes in a directed graph where the nodes are labeled from \`0\` to \`n - 1\`. Each edge is red or blue in this graph, and there could be self-edges and parallel edges.

You are given two arrays \`redEdges\` and \`blueEdges\` where \`redEdges[i] = [ai, bi]\` indicates that there is a directed red edge from node \`ai\` to node \`bi\` in the graph, and \`blueEdges[j] = [uj, vj]\` indicates that there is a directed blue edge from node \`uj\` to node \`vj\` in the graph.

Return an array \`answer\` of length \`n\`, where each \`answer[x]\` is the length of the shortest path from node \`0\` to node \`x\` such that the edge colors alternate along the path, or \`-1\` if such a path does not exist.`,
        difficulty: 'medium',
        category: 'shortest-path',
        isPremium: true,
        functionName: 'shortest_alternating_paths',
        examples: [
            { input: 'n = 3, redEdges = [[0,1],[1,2]], blueEdges = []', output: '[0,1,2]', explanation: '' },
            { input: 'n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]', output: '[0,1,-1]', explanation: '' },
        ],
        constraints: ['1 <= n <= 100', '0 <= redEdges.length, blueEdges.length <= 400', 'redEdges[i].length == blueEdges[j].length == 2', '0 <= ai, bi, uj, vj < n'],
        testCases: [
            { input: { n: 3, redEdges: [[0, 1], [1, 2]], blueEdges: [] }, expectedOutput: [0, 1, 2] },
            { input: { n: 3, redEdges: [[0, 1]], blueEdges: [[2, 1]] }, expectedOutput: [0, 1, -1] },
            { input: { n: 1, redEdges: [], blueEdges: [] }, expectedOutput: [0] },
            { input: { n: 2, redEdges: [[0, 1]], blueEdges: [[0, 1]] }, expectedOutput: [0, 1], isHidden: true },
        ],
        starterCode: {
            python: `def shortest_alternating_paths(n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function shortestAlternatingPaths(n, redEdges, blueEdges) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // NUMBER THEORY
    {
        title: 'Perfect Number',
        description: `A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself.

Given an integer \`num\`, return \`true\` if \`num\` is a perfect number, otherwise return \`false\`.`,
        difficulty: 'easy',
        category: 'number-theory',
        isPremium: false,
        functionName: 'check_perfect_number',
        examples: [
            { input: 'num = 28', output: 'true', explanation: '28 = 1 + 2 + 4 + 7 + 14.' },
            { input: 'num = 7', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= num <= 10^8'],
        testCases: [
            { input: { num: 28 }, expectedOutput: true },
            { input: { num: 7 }, expectedOutput: false },
            { input: { num: 6 }, expectedOutput: true },
            { input: { num: 1 }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def check_perfect_number(num: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function checkPerfectNumber(num) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean checkPerfectNumber(int num) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Excel Sheet Column Number',
        description: `Given a string \`columnTitle\` that represents the column title as appears in an Excel sheet, return its corresponding column number.

For example, \`A -> 1\`, \`B -> 2\`, \`C -> 3\`, ..., \`Z -> 26\`, \`AA -> 27\`, \`AB -> 28\`, ...`,
        difficulty: 'easy',
        category: 'number-theory',
        isPremium: false,
        functionName: 'title_to_number',
        examples: [
            { input: 'columnTitle = "A"', output: '1', explanation: '' },
            { input: 'columnTitle = "AB"', output: '28', explanation: '' },
            { input: 'columnTitle = "ZY"', output: '701', explanation: '' },
        ],
        constraints: ['1 <= columnTitle.length <= 7', 'columnTitle consists only of uppercase English letters.', '1 <= columnTitle <= 7 * 10^8'],
        testCases: [
            { input: { columnTitle: 'A' }, expectedOutput: 1 },
            { input: { columnTitle: 'AB' }, expectedOutput: 28 },
            { input: { columnTitle: 'ZY' }, expectedOutput: 701 },
            { input: { columnTitle: 'Z' }, expectedOutput: 26, isHidden: true },
        ],
        starterCode: {
            python: `def title_to_number(columnTitle: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function titleToNumber(columnTitle) {
    // Write your solution here
}`,
            java: `class Solution {
    public int titleToNumber(String columnTitle) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Excel Sheet Column Title',
        description: `Given an integer \`columnNumber\`, return its corresponding column title as it appears in an Excel sheet.

For example, \`1 -> A\`, \`2 -> B\`, \`3 -> C\`, ..., \`26 -> Z\`, \`27 -> AA\`, \`28 -> AB\`, ...`,
        difficulty: 'easy',
        category: 'number-theory',
        isPremium: false,
        functionName: 'convert_to_title',
        examples: [
            { input: 'columnNumber = 1', output: '"A"', explanation: '' },
            { input: 'columnNumber = 28', output: '"AB"', explanation: '' },
            { input: 'columnNumber = 701', output: '"ZY"', explanation: '' },
        ],
        constraints: ['1 <= columnNumber <= 2^31 - 1'],
        testCases: [
            { input: { columnNumber: 1 }, expectedOutput: 'A' },
            { input: { columnNumber: 28 }, expectedOutput: 'AB' },
            { input: { columnNumber: 701 }, expectedOutput: 'ZY' },
            { input: { columnNumber: 26 }, expectedOutput: 'Z', isHidden: true },
        ],
        starterCode: {
            python: `def convert_to_title(columnNumber: int) -> str:
    # Write your solution here
    pass`,
            javascript: `function convertToTitle(columnNumber) {
    // Write your solution here
}`,
            java: `class Solution {
    public String convertToTitle(int columnNumber) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Super Pow',
        description: `Your task is to calculate \`ab\` mod \`1337\` where \`a\` is a positive integer and \`b\` is an extremely large positive integer given in the form of an array of its digits \`b\`.`,
        difficulty: 'medium',
        category: 'number-theory',
        isPremium: true,
        functionName: 'super_pow',
        examples: [
            { input: 'a = 2, b = [3]', output: '8', explanation: '' },
            { input: 'a = 2, b = [1,0]', output: '1024', explanation: '' },
        ],
        constraints: ['1 <= a <= 2^31 - 1', '1 <= b.length <= 2000', '0 <= b[i] <= 9', 'b does not contain leading zeros.'],
        testCases: [
            { input: { a: 2, b: [3] }, expectedOutput: 8 },
            { input: { a: 2, b: [1, 0] }, expectedOutput: 1024 },
            { input: { a: 1, b: [4, 3, 3, 8, 5, 2] }, expectedOutput: 1 },
            { input: { a: 2, b: [2] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def super_pow(a: int, b: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function superPow(a, b) {
    // Write your solution here
}`,
            java: `class Solution {
    public int superPow(int a, int[] b) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Integer Break',
        description: `Given an integer \`n\`, break it into the sum of \`k\` positive integers, where \`k >= 2\`, and maximize the product of those integers.

Return the maximum product you can get.`,
        difficulty: 'medium',
        category: 'number-theory',
        isPremium: false,
        functionName: 'integer_break',
        examples: [
            { input: 'n = 2', output: '1', explanation: '2 = 1 + 1, 1 x 1 = 1.' },
            { input: 'n = 10', output: '36', explanation: '10 = 3 + 3 + 4, 3 x 3 x 4 = 36.' },
        ],
        constraints: ['2 <= n <= 58'],
        testCases: [
            { input: { n: 2 }, expectedOutput: 1 },
            { input: { n: 10 }, expectedOutput: 36 },
            { input: { n: 8 }, expectedOutput: 18 },
            { input: { n: 4 }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def integer_break(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function integerBreak(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int integerBreak(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // BITMASK
    {
        title: 'Count Number of Maximum Bitwise-OR Subsets',
        description: `Given an integer array \`nums\`, find the maximum possible bitwise OR of a subset of \`nums\` and return the number of different **non-empty** subsets with the maximum bitwise OR.`,
        difficulty: 'medium',
        category: 'bitmask',
        isPremium: false,
        functionName: 'count_max_or_subsets',
        examples: [
            { input: 'nums = [3,1]', output: '2', explanation: 'The maximum possible bitwise OR is 3. It can be achieved in 2 ways: 3, or 3 | 1.' },
            { input: 'nums = [2,2,2]', output: '7', explanation: 'All subsets except the empty subset have a bitwise OR of 2.' },
        ],
        constraints: ['1 <= nums.length <= 16', '1 <= nums[i] <= 10^5'],
        testCases: [
            { input: { nums: [3, 1] }, expectedOutput: 2 },
            { input: { nums: [2, 2, 2] }, expectedOutput: 7 },
            { input: { nums: [3, 2, 1, 5] }, expectedOutput: 6 },
            { input: { nums: [1] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def count_max_or_subsets(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function countMaxOrSubsets(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countMaxOrSubsets(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Maximum Score Words Formed by Letters',
        description: `Given a list of \`words\`, a string \`letters\` that represents all letters you can use (with repetition, as one flat string instead of a character array), and a score array of 26 integers representing the score of each letter from \`'a'\` to \`'z'\`.

Return the maximum score of any set of words you can form, where each letter can only be used once across all the words in the set (subject to the number of times that letter appears in \`letters\`).

Each word's score is the sum of scores of its letters (not counting multiplicity in the word's score itself, only when checking letter availability).`,
        difficulty: 'hard',
        category: 'bitmask',
        isPremium: true,
        functionName: 'max_score_words',
        examples: [
            { input: 'words = ["ab","cd"], letters = "abcd", score = [1,2,3,4,0,0,...,0]', output: '10', explanation: '"ab" scores 1+2=3, "cd" scores 3+4=7. Both can be formed at once, for a total of 10.' },
        ],
        constraints: ['1 <= words.length <= 14', '1 <= words[i].length <= 15', '1 <= letters.length <= 100', 'score.length == 26', '0 <= score[i] <= 10'],
        testCases: [
            { input: { words: ['ab', 'cd'], letters: 'abcd', score: [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, expectedOutput: 10 },
            { input: { words: ['dog', 'cat'], letters: 'dogcat', score: [5, 0, 4, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0] }, expectedOutput: 21 },
            { input: { words: ['a'], letters: '', score: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, expectedOutput: 0 },
            { input: { words: ['aa'], letters: 'a', score: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def max_score_words(words: list[str], letters: str, score: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxScoreWords(words, letters, score) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxScoreWords(String[] words, String letters, int[] score) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Partition Array Into Two Arrays to Minimize Sum Difference',
        description: `You are given an integer array \`nums\` of \`2 * n\` integers. You need to partition \`nums\` into two arrays of length \`n\` to minimize the absolute difference of the sums of the arrays. To partition \`nums\`, put each element of \`nums\` into one of the two arrays.

Return the minimum possible absolute difference.`,
        difficulty: 'hard',
        category: 'bitmask',
        isPremium: true,
        functionName: 'minimum_difference',
        examples: [
            { input: 'nums = [3,9,7,3]', output: '2', explanation: '' },
            { input: 'nums = [-36,36]', output: '72', explanation: '' },
        ],
        constraints: ['1 <= n <= 15', 'nums.length == 2 * n', '-10^7 <= nums[i] <= 10^7'],
        testCases: [
            { input: { nums: [3, 9, 7, 3] }, expectedOutput: 2 },
            { input: { nums: [-36, 36] }, expectedOutput: 72 },
            { input: { nums: [2, -1, 0, 4, -2, -9] }, expectedOutput: 0 },
            { input: { nums: [1, 1, 1, 1] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def minimum_difference(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minimumDifference(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minimumDifference(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Beautiful Arrangement',
        description: `Suppose you have \`n\` integers labeled \`1\` through \`n\`. A permutation of those \`n\` integers \`perm\` (1-indexed) is considered a **beautiful arrangement** if for every \`i\` (1-indexed), either of the following is true:
- \`perm[i]\` is divisible by \`i\`.
- \`i\` is divisible by \`perm[i]\`.

Given an integer \`n\`, return the **number** of beautiful arrangements that you can construct.`,
        difficulty: 'medium',
        category: 'bitmask',
        isPremium: false,
        functionName: 'count_arrangement',
        examples: [
            { input: 'n = 2', output: '2', explanation: '' },
            { input: 'n = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 15'],
        testCases: [
            { input: { n: 2 }, expectedOutput: 2 },
            { input: { n: 1 }, expectedOutput: 1 },
            { input: { n: 3 }, expectedOutput: 3 },
            { input: { n: 4 }, expectedOutput: 8, isHidden: true },
        ],
        starterCode: {
            python: `def count_arrangement(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function countArrangement(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countArrangement(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Minimum Number of Work Sessions to Finish the Tasks',
        description: `There are \`n\` tasks assigned to you. The task times are represented as an integer array \`tasks\` of length \`n\`, where the \`ith\` task takes \`tasks[i]\` hours to finish. A work session is when you work for at most \`sessionTime\` consecutive hours and then take a break.

You should finish the given tasks in a way that satisfies the following conditions:
- If you start a task in a work session, you must complete it in the same work session.
- You can start a new task immediately after finishing the previous one.
- You may complete the tasks in any order.

Given \`tasks\` and \`sessionTime\`, return the **minimum** number of work sessions needed to finish all the tasks.`,
        difficulty: 'medium',
        category: 'bitmask',
        isPremium: true,
        functionName: 'min_sessions',
        examples: [
            { input: 'tasks = [1,2,3], sessionTime = 3', output: '2', explanation: '' },
            { input: 'tasks = [3,1,3,1,1], sessionTime = 8', output: '2', explanation: '' },
        ],
        constraints: ['1 <= tasks.length <= 14', '1 <= tasks[i] <= 10', '1 <= sessionTime <= 15', 'max(tasks[i]) <= sessionTime'],
        testCases: [
            { input: { tasks: [1, 2, 3], sessionTime: 3 }, expectedOutput: 2 },
            { input: { tasks: [3, 1, 3, 1, 1], sessionTime: 8 }, expectedOutput: 2 },
            { input: { tasks: [1, 2, 3, 4, 5], sessionTime: 15 }, expectedOutput: 1 },
            { input: { tasks: [1, 1, 1, 1], sessionTime: 1 }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def min_sessions(tasks: list[int], sessionTime: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function minSessions(tasks, sessionTime) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minSessions(int[] tasks, int sessionTime) {
        // Write your solution here
        return 0;
    }
}`
        }
    },

    // RECURSION
    {
        title: 'Reverse String (Recursive)',
        description: `Write a **recursive** function that reverses a string \`s\` and returns the reversed string.`,
        difficulty: 'easy',
        category: 'recursion',
        isPremium: false,
        functionName: 'reverse_string_recursive',
        examples: [
            { input: 's = "hello"', output: '"olleh"', explanation: '' },
            { input: 's = "Hannah"', output: '"hannaH"', explanation: '' },
        ],
        constraints: ['0 <= s.length <= 10^4'],
        testCases: [
            { input: { s: 'hello' }, expectedOutput: 'olleh' },
            { input: { s: 'Hannah' }, expectedOutput: 'hannaH' },
            { input: { s: 'a' }, expectedOutput: 'a' },
            { input: { s: '' }, expectedOutput: '', isHidden: true },
        ],
        starterCode: {
            python: `def reverse_string_recursive(s: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function reverseStringRecursive(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public String reverseStringRecursive(String s) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Sum of Left Leaves',
        description: `Given the \`root\` of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.`,
        difficulty: 'easy',
        category: 'recursion',
        isPremium: false,
        functionName: 'sum_of_left_leaves',
        treeNodeParams: ['root'],
        examples: [
            { input: 'root = [3,9,20,null,null,15,7]', output: '24', explanation: 'There are two left leaves in the binary tree, with values 9 and 15 respectively.' },
            { input: 'root = [1]', output: '0', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [1, 1000].', '-1000 <= Node.val <= 1000'],
        testCases: [
            { input: { root: [3, 9, 20, null, null, 15, 7] }, expectedOutput: 24 },
            { input: { root: [1] }, expectedOutput: 0 },
            { input: { root: [1, 2] }, expectedOutput: 2 },
            { input: { root: [1, 2, 3] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sum_of_left_leaves(root: TreeNode) -> int:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function sumOfLeftLeaves(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public int sumOfLeftLeaves(TreeNode root) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Power of Three',
        description: `Given an integer \`n\`, return \`true\` if it is a power of three. Otherwise, return \`false\`.

An integer \`n\` is a power of three, if there exists an integer \`x\` such that \`n == 3^x\`.`,
        difficulty: 'easy',
        category: 'recursion',
        isPremium: false,
        functionName: 'is_power_of_three',
        examples: [
            { input: 'n = 27', output: 'true', explanation: '' },
            { input: 'n = 0', output: 'false', explanation: '' },
        ],
        constraints: ['-2^31 <= n <= 2^31 - 1'],
        testCases: [
            { input: { n: 27 }, expectedOutput: true },
            { input: { n: 0 }, expectedOutput: false },
            { input: { n: 1 }, expectedOutput: true },
            { input: { n: 45 }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `def is_power_of_three(n: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isPowerOfThree(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isPowerOfThree(int n) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Merge Two Binary Trees',
        description: `You are given two binary trees \`root1\` and \`root2\`.

Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the non-null node will be used as the node of the new tree.

Return the merged tree.`,
        difficulty: 'medium',
        category: 'recursion',
        isPremium: false,
        functionName: 'merge_trees',
        treeNodeParams: ['root1', 'root2'],
        returnsTreeNode: true,
        examples: [
            { input: 'root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]', output: '[3,4,5,5,4,null,7]', explanation: '' },
            { input: 'root1 = [1], root2 = [1,2]', output: '[2,null,2]', explanation: '' },
        ],
        constraints: ['The number of nodes in both trees is in the range [0, 2000].', '-10^4 <= Node.val <= 10^4'],
        testCases: [
            { input: { root1: [1, 3, 2, 5], root2: [2, 1, 3, null, 4, null, 7] }, expectedOutput: [3, 4, 5, 5, 4, null, 7] },
            { input: { root1: [1], root2: [1, 2] }, expectedOutput: [2, null, 2] },
            { input: { root1: [], root2: [1] }, expectedOutput: [1] },
            { input: { root1: [1], root2: [] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def merge_trees(root1: TreeNode, root2: TreeNode) -> TreeNode:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function mergeTrees(root1, root2) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Scramble String',
        description: `We can scramble a string \`s\` to get a string \`t\` using the following algorithm:
1. If the length of the string is 1, stop.
2. If the length of the string is \`> 1\`, split the string into two non-empty substrings at a random index.
3. Randomly decide to swap the two substrings or to keep them in the same order.
4. Apply step 1 recursively on each of the two substrings.

Given two strings \`s1\` and \`s2\` of the same length, return \`true\` if \`s2\` is a scrambled string of \`s1\`, otherwise return \`false\`.`,
        difficulty: 'hard',
        category: 'recursion',
        isPremium: true,
        functionName: 'is_scramble',
        examples: [
            { input: 's1 = "great", s2 = "rgeat"', output: 'true', explanation: '' },
            { input: 's1 = "abcde", s2 = "caebd"', output: 'false', explanation: '' },
        ],
        constraints: ['s1.length == s2.length', '1 <= s1.length <= 30', 's1 and s2 consist of lowercase English letters.'],
        testCases: [
            { input: { s1: 'great', s2: 'rgeat' }, expectedOutput: true },
            { input: { s1: 'abcde', s2: 'caebd' }, expectedOutput: false },
            { input: { s1: 'a', s2: 'a' }, expectedOutput: true },
            { input: { s1: 'ab', s2: 'ba' }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_scramble(s1: str, s2: str) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isScramble(s1, s2) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isScramble(String s1, String s2) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // GEOMETRY
    {
        title: 'Check if It Is a Straight Line',
        description: `You are given an array \`coordinates\`, \`coordinates[i] = [x, y]\`, where \`[x, y]\` represents the coordinate of a point. Check if these points make a straight line in the XY plane.`,
        difficulty: 'easy',
        category: 'geometry',
        isPremium: false,
        functionName: 'check_straight_line',
        examples: [
            { input: 'coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]', output: 'true', explanation: '' },
            { input: 'coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]', output: 'false', explanation: '' },
        ],
        constraints: ['2 <= coordinates.length <= 1000', 'coordinates[i].length == 2', '-10^4 <= x, y <= 10^4', 'All the given points are unique.'],
        testCases: [
            { input: { coordinates: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]] }, expectedOutput: true },
            { input: { coordinates: [[1, 1], [2, 2], [3, 4], [4, 5], [5, 6], [7, 7]] }, expectedOutput: false },
            { input: { coordinates: [[0, 0], [1, 1]] }, expectedOutput: true },
            { input: { coordinates: [[0, 0], [0, 5], [0, 10]] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def check_straight_line(coordinates: list[list[int]]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function checkStraightLine(coordinates) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean checkStraightLine(int[][] coordinates) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Minimum Time Visiting All Points',
        description: `On a 2D plane, there are \`n\` points with integer coordinates \`points[i] = [xi, yi]\`. Return the minimum time in seconds to visit all the points in the order given by \`points\`.

You can move according to these rules:
- In \`1\` second, you can either move vertically, horizontally by one unit, or diagonally (which means moving in one second both vertically and horizontally by one unit).
- You have to visit the points in the same order as they appear in the array.`,
        difficulty: 'easy',
        category: 'geometry',
        isPremium: false,
        functionName: 'min_time_to_visit_all_points',
        examples: [
            { input: 'points = [[1,1],[3,4],[-1,0]]', output: '7', explanation: '' },
            { input: 'points = [[3,2],[-2,2]]', output: '5', explanation: '' },
        ],
        constraints: ['1 <= points.length <= 100', 'points[i].length == 2', '-1000 <= points[i][0], points[i][1] <= 1000'],
        testCases: [
            { input: { points: [[1, 1], [3, 4], [-1, 0]] }, expectedOutput: 7 },
            { input: { points: [[3, 2], [-2, 2]] }, expectedOutput: 5 },
            { input: { points: [[0, 0]] }, expectedOutput: 0 },
            { input: { points: [[0, 0], [0, 5]] }, expectedOutput: 5, isHidden: true },
        ],
        starterCode: {
            python: `def min_time_to_visit_all_points(points: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minTimeToVisitAllPoints(points) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minTimeToVisitAllPoints(int[][] points) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Number of Boomerangs',
        description: `You are given \`n\` points in the plane that are all distinct, where \`points[i] = [xi, yi]\`. A boomerang is a tuple of points \`(i, j, k)\` such that the distance between \`i\` and \`j\` equals the distance between \`i\` and \`k\` (the order of the tuple matters).

Return the number of boomerangs.`,
        difficulty: 'medium',
        category: 'geometry',
        isPremium: false,
        functionName: 'number_of_boomerangs',
        examples: [
            { input: 'points = [[0,0],[1,0],[2,0]]', output: '2', explanation: 'The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].' },
            { input: 'points = [[1,1]]', output: '0', explanation: '' },
        ],
        constraints: ['n == points.length', '1 <= n <= 500', 'points[i].length == 2', '-10^4 <= xi, yi <= 10^4', 'All the points are unique.'],
        testCases: [
            { input: { points: [[0, 0], [1, 0], [2, 0]] }, expectedOutput: 2 },
            { input: { points: [[1, 1]] }, expectedOutput: 0 },
            { input: { points: [[0, 0]] }, expectedOutput: 0 },
            { input: { points: [[0, 0], [1, 1], [2, 2]] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def number_of_boomerangs(points: list[list[int]]) -> int:
    # Write your solution here
    pass`,
            javascript: `function numberOfBoomerangs(points) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numberOfBoomerangs(int[][] points) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Max Area of a Piece of Cake After Horizontal and Vertical Cuts',
        description: `You are given a rectangular cake of size \`h x w\` and two arrays of integers \`horizontalCuts\` and \`verticalCuts\` where \`horizontalCuts[i]\` is the distance from the top of the rectangular cake to the \`ith\` horizontal cut and similarly, \`verticalCuts[j]\` is the distance from the left of the rectangular cake to the \`jth\` vertical cut.

Return the maximum area of a piece of cake after you cut at each horizontal and vertical position provided in the arrays \`horizontalCuts\` and \`verticalCuts\`.`,
        difficulty: 'medium',
        category: 'geometry',
        isPremium: true,
        functionName: 'max_area_after_cuts',
        examples: [
            { input: 'h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]', output: '4', explanation: '' },
            { input: 'h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]', output: '6', explanation: '' },
        ],
        constraints: ['2 <= h, w <= 10^9', '1 <= horizontalCuts.length <= min(h - 1, 10^5)', '1 <= verticalCuts.length <= min(w - 1, 10^5)', '1 <= horizontalCuts[i] < h', '1 <= verticalCuts[i] < w', 'All the elements in horizontalCuts are distinct.', 'All the elements in verticalCuts are distinct.'],
        testCases: [
            { input: { h: 5, w: 4, horizontalCuts: [1, 2, 4], verticalCuts: [1, 3] }, expectedOutput: 4 },
            { input: { h: 5, w: 4, horizontalCuts: [3, 1], verticalCuts: [1] }, expectedOutput: 6 },
            { input: { h: 5, w: 4, horizontalCuts: [3], verticalCuts: [3] }, expectedOutput: 9 },
            { input: { h: 10, w: 10, horizontalCuts: [5], verticalCuts: [5] }, expectedOutput: 25, isHidden: true },
        ],
        starterCode: {
            python: `def max_area_after_cuts(h: int, w: int, horizontalCuts: list[int], verticalCuts: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxAreaAfterCuts(h, w, horizontalCuts, verticalCuts) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxAreaAfterCuts(int h, int w, int[] horizontalCuts, int[] verticalCuts) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Rectangle Overlap',
        description: `An axis-aligned rectangle is represented as a list \`[x1, y1, x2, y2]\`, where \`(x1, y1)\` is the coordinate of its bottom-left corner, and \`(x2, y2)\` is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

Two rectangles overlap if the area of their intersection is **positive**. Given two axis-aligned rectangles \`rec1\` and \`rec2\`, return \`true\` if they overlap, otherwise return \`false\`.`,
        difficulty: 'easy',
        category: 'geometry',
        isPremium: false,
        functionName: 'is_rectangle_overlap',
        examples: [
            { input: 'rec1 = [0,0,2,2], rec2 = [1,1,3,3]', output: 'true', explanation: '' },
            { input: 'rec1 = [0,0,1,1], rec2 = [1,0,2,1]', output: 'false', explanation: '' },
        ],
        constraints: ['rec1.length == 4', 'rec2.length == 4', '-10^9 <= rec1[i], rec2[i] <= 10^9', 'rec1 and rec2 represent a valid rectangle with a non-zero area.'],
        testCases: [
            { input: { rec1: [0, 0, 2, 2], rec2: [1, 1, 3, 3] }, expectedOutput: true },
            { input: { rec1: [0, 0, 1, 1], rec2: [1, 0, 2, 1] }, expectedOutput: false },
            { input: { rec1: [0, 0, 1, 1], rec2: [2, 2, 3, 3] }, expectedOutput: false },
            { input: { rec1: [-1, 0, 2, 2], rec2: [1, 1, 3, 3] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def is_rectangle_overlap(rec1: list[int], rec2: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function isRectangleOverlap(rec1, rec2) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean isRectangleOverlap(int[] rec1, int[] rec2) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // DIVIDE AND CONQUER
    {
        title: 'Count of Range Sum',
        description: `Given an integer array \`nums\` and two integers \`lower\` and \`upper\`, return the number of range sums that lie in \`[lower, upper]\` inclusive.

Range sum \`S(i, j)\` is defined as the sum of the elements in \`nums\` between indices \`i\` and \`j\` inclusive, where \`i <= j\`.`,
        difficulty: 'hard',
        category: 'divide-and-conquer',
        isPremium: true,
        functionName: 'count_range_sum',
        examples: [
            { input: 'nums = [-2,5,-1], lower = -2, upper = 2', output: '3', explanation: 'The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.' },
            { input: 'nums = [0], lower = 0, upper = 0', output: '1', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '-10^5 <= lower <= upper <= 10^5'],
        testCases: [
            { input: { nums: [-2, 5, -1], lower: -2, upper: 2 }, expectedOutput: 3 },
            { input: { nums: [0], lower: 0, upper: 0 }, expectedOutput: 1 },
            { input: { nums: [1, 1, 1], lower: 2, upper: 3 }, expectedOutput: 3 },
            { input: { nums: [1], lower: 2, upper: 3 }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def count_range_sum(nums: list[int], lower: int, upper: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function countRangeSum(nums, lower, upper) {
    // Write your solution here
}`,
            java: `class Solution {
    public int countRangeSum(int[] nums, int lower, int upper) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Reverse Pairs',
        description: `Given an integer array \`nums\`, return the number of reverse pairs in the array.

A reverse pair is a pair \`(i, j)\` where \`0 <= i < j < nums.length\` and \`nums[i] > 2 * nums[j]\`.`,
        difficulty: 'hard',
        category: 'divide-and-conquer',
        isPremium: true,
        functionName: 'reverse_pairs',
        examples: [
            { input: 'nums = [1,3,2,3,1]', output: '2', explanation: '' },
            { input: 'nums = [2,4,3,5,1]', output: '3', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 5 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
        testCases: [
            { input: { nums: [1, 3, 2, 3, 1] }, expectedOutput: 2 },
            { input: { nums: [2, 4, 3, 5, 1] }, expectedOutput: 3 },
            { input: { nums: [1] }, expectedOutput: 0 },
            { input: { nums: [5, 4, 3, 2, 1] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def reverse_pairs(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function reversePairs(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int reversePairs(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Maximum Sum Circular Subarray',
        description: `Given a **circular integer array** \`nums\` of length \`n\`, return the maximum possible sum of a non-empty subarray of \`nums\`.

A circular array means the end of the array connects to the beginning of the array. A subarray may only include each element of the fixed buffer \`nums\` at most once.`,
        difficulty: 'medium',
        category: 'divide-and-conquer',
        isPremium: false,
        functionName: 'max_subarray_sum_circular',
        examples: [
            { input: 'nums = [1,-2,3,-2]', output: '3', explanation: '' },
            { input: 'nums = [5,-3,5]', output: '10', explanation: 'Subarray [5,5] using the wraparound.' },
        ],
        constraints: ['n == nums.length', '1 <= n <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4'],
        testCases: [
            { input: { nums: [1, -2, 3, -2] }, expectedOutput: 3 },
            { input: { nums: [5, -3, 5] }, expectedOutput: 10 },
            { input: { nums: [-3, -2, -3] }, expectedOutput: -2 },
            { input: { nums: [3, -1, 2, -1] }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `def max_subarray_sum_circular(nums: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxSubarraySumCircular(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Super Ugly Number',
        description: `A super ugly number is a positive integer whose prime factors are in the array \`primes\`.

Given an integer \`n\` and an array of integers \`primes\`, return the \`nth\` super ugly number.

The \`1st\` super ugly number is \`1\`.`,
        difficulty: 'medium',
        category: 'divide-and-conquer',
        isPremium: true,
        functionName: 'nth_super_ugly_number',
        examples: [
            { input: 'n = 12, primes = [2,7,13,19]', output: '32', explanation: '[1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers given primes = [2,7,13,19] of size 4.' },
            { input: 'n = 1, primes = [2,3,5]', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 10^6', '1 <= primes.length <= 100', '2 <= primes[i] <= 1000', 'primes[i] is guaranteed to be a prime number.', 'All the values of primes are unique and sorted in ascending order.'],
        testCases: [
            { input: { n: 12, primes: [2, 7, 13, 19] }, expectedOutput: 32 },
            { input: { n: 1, primes: [2, 3, 5] }, expectedOutput: 1 },
            { input: { n: 5, primes: [2, 3, 5] }, expectedOutput: 6 },
            { input: { n: 9, primes: [2, 3, 5] }, expectedOutput: 12, isHidden: true },
        ],
        starterCode: {
            python: `def nth_super_ugly_number(n: int, primes: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function nthSuperUglyNumber(n, primes) {
    // Write your solution here
}`,
            java: `class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Convert Sorted Array to Binary Search Tree',
        description: `Given an integer array \`nums\` where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree, built by picking the middle element of the current range as the root and recursing on the left and right halves.

To make the output unique, when a range has an even number of elements (so there are two possible middle elements), always use the one with the **smaller index** as the root.`,
        difficulty: 'medium',
        category: 'divide-and-conquer',
        isPremium: false,
        functionName: 'sorted_array_to_bst',
        returnsTreeNode: true,
        examples: [
            { input: 'nums = [-10,-3,0,5,9]', output: '[0,-10,5,null,-3,null,9]', explanation: '' },
            { input: 'nums = [1,3]', output: '[1,null,3]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in a strictly increasing order.'],
        testCases: [
            { input: { nums: [-10, -3, 0, 5, 9] }, expectedOutput: [0, -10, 5, null, -3, null, 9] },
            { input: { nums: [1, 3] }, expectedOutput: [1, null, 3] },
            { input: { nums: [1] }, expectedOutput: [1] },
            { input: { nums: [1, 2, 3, 4] }, expectedOutput: [2, 1, 3, null, null, null, 4], isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sorted_array_to_bst(nums: list[int]) -> TreeNode:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function sortedArrayToBst(nums) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public TreeNode sortedArrayToBst(int[] nums) {
        // Write your solution here
        return null;
    }
}`
        }
    },

    // GAME THEORY
    {
        title: 'Stone Game',
        description: `Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row, and each pile has a positive integer number of stones \`piles[i]\`.

The objective of the game is to end with the most stones. The total number of stones across all the piles is odd, so there are no ties.

Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile of stones either from the beginning or from the end of the row. This continues until there are no more piles left, at which point the person with the most stones wins.

Assuming Alice and Bob play optimally, return \`true\` if Alice wins the game, or \`false\` if Bob wins.`,
        difficulty: 'medium',
        category: 'game-theory',
        isPremium: false,
        functionName: 'stone_game',
        examples: [
            { input: 'piles = [5,3,4,5]', output: 'true', explanation: '' },
            { input: 'piles = [3,7,2,3]', output: 'true', explanation: '' },
        ],
        constraints: ['2 <= piles.length <= 500', 'piles.length is even.', '1 <= piles[i] <= 500', 'sum(piles[i]) is odd.'],
        testCases: [
            { input: { piles: [5, 3, 4, 5] }, expectedOutput: true },
            { input: { piles: [3, 7, 2, 3] }, expectedOutput: true },
            { input: { piles: [1, 100] }, expectedOutput: true },
            { input: { piles: [2, 1, 9, 5] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def stone_game(piles: list[int]) -> bool:
    # Write your solution here
    pass`,
            javascript: `function stoneGame(piles) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean stoneGame(int[] piles) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Divisor Game',
        description: `Alice and Bob take turns playing a game, with Alice starting first.

Initially, there is a number \`n\` on the chalkboard. On each player's turn, that player makes a move consisting of:
- Choosing any \`x\` with \`0 < x < n\` and \`n % x == 0\`.
- Replacing the number \`n\` on the chalkboard with \`n - x\`.

Also, if a player cannot make a move, they lose the game.

Return \`true\` if and only if Alice wins the game, assuming both players play optimally.`,
        difficulty: 'easy',
        category: 'game-theory',
        isPremium: false,
        functionName: 'divisor_game',
        examples: [
            { input: 'n = 2', output: 'true', explanation: 'Alice chooses 1, and Bob has no more moves.' },
            { input: 'n = 3', output: 'false', explanation: 'Alice chooses 1, Bob chooses 1, and Alice has no more moves.' },
        ],
        constraints: ['1 <= n <= 1000'],
        testCases: [
            { input: { n: 2 }, expectedOutput: true },
            { input: { n: 3 }, expectedOutput: false },
            { input: { n: 1 }, expectedOutput: false },
            { input: { n: 4 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def divisor_game(n: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function divisorGame(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean divisorGame(int n) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Stone Game II',
        description: `Alice and Bob continue their games with piles of stones. There are a number of piles arranged in a row, and each pile has a positive integer number of stones \`piles[i]\`. The objective of the game is to end with the most stones.

Alice and Bob take turns, with Alice starting first. Initially, \`M = 1\`.

On each player's turn, that player can take **all the stones** in the first \`X\` remaining piles, where \`1 <= X <= 2M\`. Then, \`M = max(M, X)\`.

This continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.`,
        difficulty: 'hard',
        category: 'game-theory',
        isPremium: true,
        functionName: 'stone_game_max_score',
        examples: [
            { input: 'piles = [2,7,9,4,4]', output: '10', explanation: '' },
            { input: 'piles = [1,2,3,4,5,100]', output: '104', explanation: '' },
        ],
        constraints: ['1 <= piles.length <= 100', '1 <= piles[i] <= 10^4'],
        testCases: [
            { input: { piles: [2, 7, 9, 4, 4] }, expectedOutput: 10 },
            { input: { piles: [1, 2, 3, 4, 5, 100] }, expectedOutput: 104 },
            { input: { piles: [1] }, expectedOutput: 1 },
            { input: { piles: [1, 1] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def stone_game_max_score(piles: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function stoneGameMaxScore(piles) {
    // Write your solution here
}`,
            java: `class Solution {
    public int stoneGameMaxScore(int[] piles) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Guess Number Higher or Lower II',
        description: `We are playing the Guessing Game. The game will work as follows:
1. I pick a number between \`1\` and \`n\`.
2. You guess a number.
3. If you guess the right number, you win the game.
4. If you guess the wrong number, then I will tell you whether the number I picked is higher or lower, and you will continue guessing.
5. Every time you guess a wrong number \`x\`, you will pay \`x\` dollars. If you run out of money, you lose the game.

Given a particular \`n\`, return the minimum amount of money you need to guarantee a win regardless of what number I pick.`,
        difficulty: 'medium',
        category: 'game-theory',
        isPremium: true,
        functionName: 'get_money_amount',
        examples: [
            { input: 'n = 10', output: '16', explanation: '' },
            { input: 'n = 1', output: '0', explanation: '' },
        ],
        constraints: ['1 <= n <= 200'],
        testCases: [
            { input: { n: 10 }, expectedOutput: 16 },
            { input: { n: 1 }, expectedOutput: 0 },
            { input: { n: 2 }, expectedOutput: 1 },
            { input: { n: 3 }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def get_money_amount(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function getMoneyAmount(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int getMoneyAmount(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Stone Game III',
        description: `Alice and Bob continue their games with piles of stones. There are several stones **arranged in a row**, and each stone has an associated value which is an integer given in the array \`stoneValue\`.

Alice and Bob take turns, with Alice starting first. On each player's turn, that player can take \`1\`, \`2\`, or \`3\` stones from the first remaining stones in the row.

The score of each player is the sum of the values of the stones taken. The score of each player is 0 initially.

The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. Both players play optimally.

Return \`"Alice"\` if Alice will win, \`"Bob"\` if Bob will win, or \`"Tie"\` if they will end the game with the same score.`,
        difficulty: 'hard',
        category: 'game-theory',
        isPremium: true,
        functionName: 'stone_game_three',
        examples: [
            { input: 'stoneValue = [1,2,3,7]', output: '"Bob"', explanation: '' },
            { input: 'stoneValue = [1,2,3,-9]', output: '"Alice"', explanation: '' },
            { input: 'stoneValue = [1,2,3,6]', output: '"Tie"', explanation: '' },
        ],
        constraints: ['1 <= stoneValue.length <= 5 * 10^4', '-1000 <= stoneValue[i] <= 1000'],
        testCases: [
            { input: { stoneValue: [1, 2, 3, 7] }, expectedOutput: 'Bob' },
            { input: { stoneValue: [1, 2, 3, -9] }, expectedOutput: 'Alice' },
            { input: { stoneValue: [1, 2, 3, 6] }, expectedOutput: 'Tie' },
            { input: { stoneValue: [-1, -2, -3] }, expectedOutput: 'Tie', isHidden: true },
        ],
        starterCode: {
            python: `def stone_game_three(stoneValue: list[int]) -> str:
    # Write your solution here
    pass`,
            javascript: `function stoneGameThree(stoneValue) {
    // Write your solution here
}`,
            java: `class Solution {
    public String stoneGameThree(int[] stoneValue) {
        // Write your solution here
        return "";
    }
}`
        }
    },

    // LINKED LIST
    {
        title: 'Add Two Numbers',
        description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
        difficulty: 'medium',
        category: 'linked-list',
        isPremium: false,
        functionName: 'add_two_numbers',
        listNodeParams: ['l1', 'l2'],
        returnsListNode: true,
        examples: [
            { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807.' },
            { input: 'l1 = [0], l2 = [0]', output: '[0]', explanation: '' },
        ],
        constraints: ['The number of nodes in each linked list is in the range [1, 100].', '0 <= Node.val <= 9', 'It is guaranteed that the list represents a number that does not have leading zeros.'],
        testCases: [
            { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expectedOutput: [7, 0, 8] },
            { input: { l1: [0], l2: [0] }, expectedOutput: [0] },
            { input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] }, expectedOutput: [8, 9, 9, 9, 0, 0, 0, 1] },
            { input: { l1: [5], l2: [5] }, expectedOutput: [0, 1], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def add_two_numbers(l1: ListNode, l2: ListNode) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function addTwoNumbers(l1, l2) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Middle of the Linked List',
        description: `Given the \`head\` of a singly linked list, return the value of the middle node of the linked list.

If there are two middle nodes, return the value of the **second** middle node.`,
        difficulty: 'easy',
        category: 'linked-list',
        isPremium: false,
        functionName: 'middle_node_value',
        listNodeParams: ['head'],
        examples: [
            { input: 'head = [1,2,3,4,5]', output: '3', explanation: '' },
            { input: 'head = [1,2,3,4,5,6]', output: '4', explanation: 'There are two middle nodes with values 3 and 4, and we return the second one.' },
        ],
        constraints: ['The number of nodes in the list is in the range [1, 100].', '1 <= Node.val <= 100'],
        testCases: [
            { input: { head: [1, 2, 3, 4, 5] }, expectedOutput: 3 },
            { input: { head: [1, 2, 3, 4, 5, 6] }, expectedOutput: 4 },
            { input: { head: [1] }, expectedOutput: 1 },
            { input: { head: [1, 2] }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def middle_node_value(head: ListNode) -> int:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function middleNodeValue(head) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public int middleNodeValue(ListNode head) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Palindrome Linked List',
        description: `Given the \`head\` of a singly linked list, return \`true\` if it is a palindrome or \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'linked-list',
        isPremium: false,
        functionName: 'is_palindrome_list',
        listNodeParams: ['head'],
        examples: [
            { input: 'head = [1,2,2,1]', output: 'true', explanation: '' },
            { input: 'head = [1,2]', output: 'false', explanation: '' },
        ],
        constraints: ['The number of nodes in the list is in the range [1, 10^5].', '0 <= Node.val <= 9'],
        testCases: [
            { input: { head: [1, 2, 2, 1] }, expectedOutput: true },
            { input: { head: [1, 2] }, expectedOutput: false },
            { input: { head: [1] }, expectedOutput: true },
            { input: { head: [1, 2, 3, 2, 1] }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def is_palindrome_list(head: ListNode) -> bool:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function isPalindromeList(head) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public boolean isPalindromeList(ListNode head) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Odd Even Linked List',
        description: `Given the \`head\` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The **first** node is considered **odd**, and the **second** node is **even**, and so on.

The relative order inside both the even and odd groups should remain as it was in the input.`,
        difficulty: 'medium',
        category: 'linked-list',
        isPremium: false,
        functionName: 'odd_even_list',
        listNodeParams: ['head'],
        returnsListNode: true,
        examples: [
            { input: 'head = [1,2,3,4,5]', output: '[1,3,5,2,4]', explanation: '' },
            { input: 'head = [2,1,3,5,6,4,7]', output: '[2,3,6,7,1,5,4]', explanation: '' },
        ],
        constraints: ['The number of nodes in the linked list is in the range [0, 10^4].', '-10^6 <= Node.val <= 10^6'],
        testCases: [
            { input: { head: [1, 2, 3, 4, 5] }, expectedOutput: [1, 3, 5, 2, 4] },
            { input: { head: [2, 1, 3, 5, 6, 4, 7] }, expectedOutput: [2, 3, 6, 7, 1, 5, 4] },
            { input: { head: [] }, expectedOutput: [] },
            { input: { head: [1] }, expectedOutput: [1], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def odd_even_list(head: ListNode) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function oddEvenList(head) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode oddEvenList(ListNode head) {
        // Write your solution here
        return null;
    }
}`
        }
    },
    {
        title: 'Swap Nodes in Pairs',
        description: `Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).`,
        difficulty: 'medium',
        category: 'linked-list',
        isPremium: false,
        functionName: 'swap_pairs',
        listNodeParams: ['head'],
        returnsListNode: true,
        examples: [
            { input: 'head = [1,2,3,4]', output: '[2,1,4,3]', explanation: '' },
            { input: 'head = []', output: '[]', explanation: '' },
        ],
        constraints: ['The number of nodes in the list is in the range [0, 100].', '0 <= Node.val <= 100'],
        testCases: [
            { input: { head: [1, 2, 3, 4] }, expectedOutput: [2, 1, 4, 3] },
            { input: { head: [] }, expectedOutput: [] },
            { input: { head: [1] }, expectedOutput: [1] },
            { input: { head: [1, 2, 3] }, expectedOutput: [2, 1, 3], isHidden: true },
        ],
        starterCode: {
            python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def swap_pairs(head: ListNode) -> ListNode:
    # Write your solution here
    pass`,
            javascript: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function swapPairs(head) {
    // Write your solution here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode swapPairs(ListNode head) {
        // Write your solution here
        return null;
    }
}`
        }
    },

    // SYSTEM DESIGN (continued)
    {
        title: 'Design HashMap',
        description: `Design a HashMap without using any built-in hash table libraries.

Implement the \`MyHashMap\` class:
- \`MyHashMap()\` initializes the object with an empty map.
- \`void put(int key, int value)\` inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
- \`int get(int key)\` returns the value to which the specified key is mapped, or \`-1\` if this map contains no mapping for the key.
- \`void remove(int key)\` removes the key and its corresponding value if the map contains the mapping for the key.`,
        difficulty: 'easy',
        category: 'system-design',
        isPremium: false,
        functionName: 'MyHashMap',
        executionType: 'multi-call',
        examples: [
            { input: '["MyHashMap","put","put","get","get","put","get","remove","get"]\n[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]', output: '[null,null,null,1,-1,null,1,null,-1]', explanation: '' },
        ],
        constraints: ['0 <= key, value <= 10^6', 'At most 10^4 calls will be made to put, get, and remove.'],
        testCases: [
            {
                input: {
                    operations: ['MyHashMap', 'put', 'put', 'get', 'get', 'put', 'get', 'remove', 'get'],
                    args: [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
                },
                expectedOutput: [null, null, null, 1, -1, null, 1, null, -1]
            },
        ],
        starterCode: {
            python: `class MyHashMap:
    def __init__(self):
        # Write your solution here
        pass

    def put(self, key: int, value: int) -> None:
        # Write your solution here
        pass

    def get(self, key: int) -> int:
        # Write your solution here
        pass

    def remove(self, key: int) -> None:
        # Write your solution here
        pass`,
            javascript: `class MyHashMap {
    constructor() {
        // Write your solution here
    }

    put(key, value) {
        // Write your solution here
    }

    get(key) {
        // Write your solution here
    }

    remove(key) {
        // Write your solution here
    }
}`,
            java: `class MyHashMap {
    public MyHashMap() {
        // Write your solution here
    }

    public void put(int key, int value) {
        // Write your solution here
    }

    public int get(int key) {
        // Write your solution here
        return -1;
    }

    public void remove(int key) {
        // Write your solution here
    }
}`
        }
    },
    {
        title: 'Design Circular Queue',
        description: `Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle.

Implement the \`MyCircularQueue\` class:
- \`MyCircularQueue(int k)\` Initializes the object with the size of the queue to be \`k\`.
- \`boolean enQueue(int value)\` Inserts an element into the circular queue. Return \`true\` if the operation is successful.
- \`boolean deQueue()\` Deletes an element from the circular queue. Return \`true\` if the operation is successful.
- \`int Front()\` Gets the front item from the queue. If the queue is empty, return \`-1\`.
- \`int Rear()\` Gets the last item from the queue. If the queue is empty, return \`-1\`.
- \`boolean isEmpty()\` Checks whether the circular queue is empty or not.
- \`boolean isFull()\` Checks whether the circular queue is full or not.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: false,
        functionName: 'MyCircularQueue',
        executionType: 'multi-call',
        examples: [
            { input: '["MyCircularQueue","enQueue","enQueue","enQueue","enQueue","Rear","isFull","deQueue","enQueue","Rear"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]', output: '[null,true,true,true,false,3,true,true,true,4]', explanation: '' },
        ],
        constraints: ['1 <= k <= 1000', '0 <= value <= 1000', 'At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.'],
        testCases: [
            {
                input: {
                    operations: ['MyCircularQueue', 'enQueue', 'enQueue', 'enQueue', 'enQueue', 'Rear', 'isFull', 'deQueue', 'enQueue', 'Rear'],
                    args: [[3], [1], [2], [3], [4], [], [], [], [4], []]
                },
                expectedOutput: [null, true, true, true, false, 3, true, true, true, 4]
            },
        ],
        starterCode: {
            python: `class MyCircularQueue:
    def __init__(self, k: int):
        # Write your solution here
        pass

    def en_queue(self, value: int) -> bool:
        # Write your solution here
        pass

    def de_queue(self) -> bool:
        # Write your solution here
        pass

    def front(self) -> int:
        # Write your solution here
        pass

    def rear(self) -> int:
        # Write your solution here
        pass

    def is_empty(self) -> bool:
        # Write your solution here
        pass

    def is_full(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class MyCircularQueue {
    constructor(k) {
        // Write your solution here
    }

    enQueue(value) {
        // Write your solution here
    }

    deQueue() {
        // Write your solution here
    }

    Front() {
        // Write your solution here
    }

    Rear() {
        // Write your solution here
    }

    isEmpty() {
        // Write your solution here
    }

    isFull() {
        // Write your solution here
    }
}`,
            java: `class MyCircularQueue {
    public MyCircularQueue(int k) {
        // Write your solution here
    }

    public boolean enQueue(int value) {
        // Write your solution here
        return false;
    }

    public boolean deQueue() {
        // Write your solution here
        return false;
    }

    public int Front() {
        // Write your solution here
        return -1;
    }

    public int Rear() {
        // Write your solution here
        return -1;
    }

    public boolean isEmpty() {
        // Write your solution here
        return true;
    }

    public boolean isFull() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Time Based Key-Value Store',
        description: `Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the \`TimeMap\` class:
- \`TimeMap()\` Initializes the object of the data structure.
- \`void set(String key, String value, int timestamp)\` Stores the key \`key\` with the value \`value\` at the given time \`timestamp\`.
- \`String get(String key, int timestamp)\` Returns a value such that \`set\` was called previously, with \`timestamp_prev <= timestamp\`. If there are multiple such values, it returns the value associated with the largest \`timestamp_prev\`. If there are no values, it returns \`""\`.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: true,
        functionName: 'TimeMap',
        executionType: 'multi-call',
        examples: [
            { input: '["TimeMap","set","get","get","set","get","get"]\n[[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]', output: '[null,null,"bar","bar",null,"bar2","bar2"]', explanation: '' },
        ],
        constraints: ['1 <= key.length, value.length <= 100', 'key and value consist of lowercase English letters and digits.', '1 <= timestamp <= 10^7', 'All the timestamps timestamp of set are strictly increasing.', 'At most 2 * 10^5 calls will be made to set and get.'],
        testCases: [
            {
                input: {
                    operations: ['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get'],
                    args: [[], ['foo', 'bar', 1], ['foo', 1], ['foo', 3], ['foo', 'bar2', 4], ['foo', 4], ['foo', 5]]
                },
                expectedOutput: [null, null, 'bar', 'bar', null, 'bar2', 'bar2']
            },
        ],
        starterCode: {
            python: `class TimeMap:
    def __init__(self):
        # Write your solution here
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Write your solution here
        pass

    def get(self, key: str, timestamp: int) -> str:
        # Write your solution here
        pass`,
            javascript: `class TimeMap {
    constructor() {
        // Write your solution here
    }

    set(key, value, timestamp) {
        // Write your solution here
    }

    get(key, timestamp) {
        // Write your solution here
    }
}`,
            java: `class TimeMap {
    public TimeMap() {
        // Write your solution here
    }

    public void set(String key, String value, int timestamp) {
        // Write your solution here
    }

    public String get(String key, int timestamp) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Design a Stack With Increment Operation',
        description: `Design a stack that supports increment operations on its elements.

Implement the \`CustomStack\` class:
- \`CustomStack(int maxSize)\` Initializes the object with \`maxSize\` which is the maximum number of elements in the stack.
- \`void push(int x)\` Adds \`x\` to the top of the stack if the stack has not reached \`maxSize\`.
- \`int pop()\` Pops and returns the top of the stack, or \`-1\` if the stack is empty.
- \`void increment(int k, int val)\` Increments the bottom \`k\` elements of the stack by \`val\`. If there are fewer than \`k\` elements in the stack, increments all the elements in the stack.`,
        difficulty: 'medium',
        category: 'system-design',
        isPremium: false,
        functionName: 'CustomStack',
        executionType: 'multi-call',
        examples: [
            { input: '["CustomStack","push","push","pop","push","push","push","increment","pop","pop","pop","pop"]\n[[3],[1],[2],[],[2],[3],[4],[5,100],[],[],[],[]]', output: '[null,null,null,2,null,null,null,null,103,102,101,-1]', explanation: '' },
        ],
        constraints: ['1 <= maxSize, x, k <= 1000', '0 <= val <= 100', 'At most 1000 calls will be made to push, pop, and increment.'],
        testCases: [
            {
                input: {
                    operations: ['CustomStack', 'push', 'push', 'pop', 'push', 'push', 'push', 'increment', 'pop', 'pop', 'pop', 'pop'],
                    args: [[3], [1], [2], [], [2], [3], [4], [5, 100], [], [], [], []]
                },
                expectedOutput: [null, null, null, 2, null, null, null, null, 103, 102, 101, -1]
            },
        ],
        starterCode: {
            python: `class CustomStack:
    def __init__(self, maxSize: int):
        # Write your solution here
        pass

    def push(self, x: int) -> None:
        # Write your solution here
        pass

    def pop(self) -> int:
        # Write your solution here
        pass

    def increment(self, k: int, val: int) -> None:
        # Write your solution here
        pass`,
            javascript: `class CustomStack {
    constructor(maxSize) {
        // Write your solution here
    }

    push(x) {
        // Write your solution here
    }

    pop() {
        // Write your solution here
    }

    increment(k, val) {
        // Write your solution here
    }
}`,
            java: `class CustomStack {
    public CustomStack(int maxSize) {
        // Write your solution here
    }

    public void push(int x) {
        // Write your solution here
    }

    public int pop() {
        // Write your solution here
        return -1;
    }

    public void increment(int k, int val) {
        // Write your solution here
    }
}`
        }
    },

    // TRIE
    {
        title: 'Map Sum Pairs',
        description: `Design a map that allows you to do the following:
- Maps a string key to a given value.
- Returns the sum of the values that have a key with a prefix equal to a given string.

Implement the \`MapSum\` class:
- \`MapSum()\` Initializes the \`MapSum\` object.
- \`void insert(String key, int val)\` Inserts the pair (key, val) into the map. If the key already existed, the original key-value pair will be overridden to the new one.
- \`int sum(String prefix)\` Returns the sum of all the pairs' value whose key starts with \`prefix\`.`,
        difficulty: 'medium',
        category: 'trie',
        isPremium: false,
        functionName: 'MapSum',
        executionType: 'multi-call',
        examples: [
            { input: '["MapSum","insert","sum","insert","sum"]\n[[],["apple",3],["ap"],["app",2],["ap"]]', output: '[null,null,3,null,5]', explanation: '' },
        ],
        constraints: ['1 <= key.length, prefix.length <= 50', '1 <= val <= 1000', 'key and prefix consist of only lowercase English letters.', 'At most 50 calls will be made to insert and sum.'],
        testCases: [
            {
                input: {
                    operations: ['MapSum', 'insert', 'sum', 'insert', 'sum'],
                    args: [[], ['apple', 3], ['ap'], ['app', 2], ['ap']]
                },
                expectedOutput: [null, null, 3, null, 5]
            },
        ],
        starterCode: {
            python: `class MapSum:
    def __init__(self):
        # Write your solution here
        pass

    def insert(self, key: str, val: int) -> None:
        # Write your solution here
        pass

    def sum(self, prefix: str) -> int:
        # Write your solution here
        pass`,
            javascript: `class MapSum {
    constructor() {
        // Write your solution here
    }

    insert(key, val) {
        // Write your solution here
    }

    sum(prefix) {
        // Write your solution here
    }
}`,
            java: `class MapSum {
    public MapSum() {
        // Write your solution here
    }

    public void insert(String key, int val) {
        // Write your solution here
    }

    public int sum(String prefix) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Stream of Characters',
        description: `Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings \`words\`.

Implement the \`StreamChecker\` class:
- \`StreamChecker(String[] words)\` Initializes the object with the strings array \`words\`.
- \`boolean query(String letter)\` Accepts a new character (given as a length-1 string) from the stream and returns \`true\` if any non-empty suffix from the stream forms a word that is in \`words\`.`,
        difficulty: 'hard',
        category: 'trie',
        isPremium: true,
        functionName: 'StreamChecker',
        executionType: 'multi-call',
        examples: [
            { input: '["StreamChecker","query","query","query","query","query","query","query","query","query","query","query","query"]\n[[["cd","f","kl"]],["a"],["b"],["c"],["d"],["e"],["f"],["g"],["h"],["i"],["j"],["k"],["l"]]', output: '[null,false,false,false,true,false,true,false,false,false,false,false,true]', explanation: '' },
        ],
        constraints: ['1 <= words.length <= 2000', '1 <= words[i].length <= 200', 'words[i] consists of lowercase English letters.', 'letter is a length-1 string consisting of a lowercase English letter.', 'At most 4 * 10^4 calls will be made to query.'],
        testCases: [
            {
                input: {
                    operations: ['StreamChecker', 'query', 'query', 'query', 'query', 'query', 'query', 'query', 'query', 'query', 'query', 'query', 'query'],
                    args: [[['cd', 'f', 'kl']], ['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l']]
                },
                expectedOutput: [null, false, false, false, true, false, true, false, false, false, false, false, true]
            },
        ],
        starterCode: {
            python: `class StreamChecker:
    def __init__(self, words: list[str]):
        # Write your solution here
        pass

    def query(self, letter: str) -> bool:
        # Write your solution here
        pass`,
            javascript: `class StreamChecker {
    constructor(words) {
        // Write your solution here
    }

    query(letter) {
        // Write your solution here
    }
}`,
            java: `class StreamChecker {
    public StreamChecker(String[] words) {
        // Write your solution here
    }

    public boolean query(String letter) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Index Pairs of a String',
        description: `Given a \`text\` string and \`words\` (a list of strings), return all index pairs \`[i, j]\` so that the substring \`text[i...j]\` (inclusive) is in the list of \`words\`.

Return the pairs sorted by \`i\` ascending, then by \`j\` ascending (if two pairs have the same \`i\`, sort by \`j\`).`,
        difficulty: 'medium',
        category: 'trie',
        isPremium: false,
        functionName: 'index_pairs',
        examples: [
            { input: 'text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]', output: '[[3,7],[9,13],[10,17]]', explanation: '' },
            { input: 'text = "ababa", words = ["aba","ab"]', output: '[[0,1],[0,2],[2,3],[2,4]]', explanation: '' },
        ],
        constraints: ['1 <= text.length <= 100', '1 <= words.length <= 20', '1 <= words[i].length <= 50', 'text and words[i] consist of lowercase English letters.', 'All the strings of words are unique.'],
        testCases: [
            { input: { text: 'thestoryofleetcodeandme', words: ['story', 'fleet', 'leetcode'] }, expectedOutput: [[3, 7], [9, 13], [10, 17]] },
            { input: { text: 'ababa', words: ['aba', 'ab'] }, expectedOutput: [[0, 1], [0, 2], [2, 3], [2, 4]] },
            { input: { text: 'abc', words: ['z'] }, expectedOutput: [] },
            { input: { text: 'a', words: ['a'] }, expectedOutput: [[0, 0]], isHidden: true },
        ],
        starterCode: {
            python: `def index_pairs(text: str, words: list[str]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function indexPairs(text, words) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] indexPairs(String text, String[] words) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Extra Characters in a String',
        description: `You are given a 0-indexed string \`s\` and a dictionary of words \`dictionary\`. You have to break \`s\` into one or more non-overlapping substrings such that each substring is present in \`dictionary\`. There may be some extra characters in \`s\` which are not present in any of the substrings.

Return the minimum number of extra characters left over if you break up \`s\` optimally.`,
        difficulty: 'medium',
        category: 'trie',
        isPremium: true,
        functionName: 'min_extra_char',
        examples: [
            { input: 's = "leetscode", dictionary = ["leet","code","leetcode"]', output: '1', explanation: 'We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.' },
            { input: 's = "sayhelloworld", dictionary = ["hello","world"]', output: '3', explanation: 'We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used, so we return 3.' },
        ],
        constraints: ['1 <= s.length <= 50', '1 <= dictionary.length <= 50', '1 <= dictionary[i].length <= 50', 's and dictionary[i] consist of only lowercase English letters.', 'dictionary contains distinct words.'],
        testCases: [
            { input: { s: 'leetscode', dictionary: ['leet', 'code', 'leetcode'] }, expectedOutput: 1 },
            { input: { s: 'sayhelloworld', dictionary: ['hello', 'world'] }, expectedOutput: 3 },
            { input: { s: 'abc', dictionary: ['a', 'b', 'c'] }, expectedOutput: 0 },
            { input: { s: 'xyz', dictionary: ['a', 'b'] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def min_extra_char(s: str, dictionary: list[str]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minExtraChar(s, dictionary) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Concatenated Words',
        description: `Given an array of strings \`words\` (without duplicates), return all the concatenated words in the given list of \`words\`.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct) in the given array.

Return the result **sorted alphabetically**.`,
        difficulty: 'hard',
        category: 'trie',
        isPremium: true,
        functionName: 'find_all_concatenated_words',
        examples: [
            { input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]', output: '["catsdogcats","dogcatsdog","ratcatdogcat"]', explanation: '' },
            { input: 'words = ["cat","dog","catdog"]', output: '["catdog"]', explanation: '' },
        ],
        constraints: ['1 <= words.length <= 10^4', '1 <= words[i].length <= 30', 'words[i] consists of only lowercase English letters.', 'All the strings of words are unique.'],
        testCases: [
            { input: { words: ['cat', 'cats', 'catsdogcats', 'dog', 'dogcatsdog', 'hippopotamuses', 'rat', 'ratcatdogcat'] }, expectedOutput: ['catsdogcats', 'dogcatsdog', 'ratcatdogcat'] },
            { input: { words: ['cat', 'dog', 'catdog'] }, expectedOutput: ['catdog'] },
            { input: { words: ['a', 'b', 'ab'] }, expectedOutput: ['ab'] },
            { input: { words: ['a', 'b'] }, expectedOutput: [], isHidden: true },
        ],
        starterCode: {
            python: `def find_all_concatenated_words(words: list[str]) -> list[str]:
    # Write your solution here
    pass`,
            javascript: `function findAllConcatenatedWords(words) {
    // Write your solution here
}`,
            java: `class Solution {
    public String[] findAllConcatenatedWords(String[] words) {
        // Write your solution here
        return new String[]{};
    }
}`
        }
    },

    // ITERATOR
    {
        title: 'Iterator for Combination',
        description: `Design the \`CombinationIterator\` class:
- \`CombinationIterator(String characters, int combinationLength)\` Initializes the object with a string \`characters\` of sorted, distinct lowercase English letters and a number \`combinationLength\`. Combinations are ordered lexicographically according to the order of \`characters\`.
- \`String next()\` Returns the next combination of length \`combinationLength\` in lexicographical order.
- \`boolean hasNext()\` Returns \`true\` if and only if there exists a next combination.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: false,
        functionName: 'CombinationIterator',
        executionType: 'multi-call',
        examples: [
            { input: '["CombinationIterator","next","hasNext","next","hasNext","next","hasNext"]\n[["abc",2],[],[],[],[],[],[]]', output: '[null,"ab",true,"ac",true,"bc",false]', explanation: '' },
        ],
        constraints: ['1 <= combinationLength <= characters.length <= 15', 'All the characters of characters are unique.', 'At most 10^4 calls will be made to next and hasNext.'],
        testCases: [
            {
                input: {
                    operations: ['CombinationIterator', 'next', 'hasNext', 'next', 'hasNext', 'next', 'hasNext'],
                    args: [['abc', 2], [], [], [], [], [], []]
                },
                expectedOutput: [null, 'ab', true, 'ac', true, 'bc', false]
            },
        ],
        starterCode: {
            python: `class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        # Write your solution here
        pass

    def next(self) -> str:
        # Write your solution here
        pass

    def has_next(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class CombinationIterator {
    constructor(characters, combinationLength) {
        // Write your solution here
    }

    next() {
        // Write your solution here
    }

    hasNext() {
        // Write your solution here
    }
}`,
            java: `class CombinationIterator {
    public CombinationIterator(String characters, int combinationLength) {
        // Write your solution here
    }

    public String next() {
        // Write your solution here
        return "";
    }

    public boolean hasNext() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Design Compressed String Iterator',
        description: `Design and implement a data structure for a compressed string iterator. It should support the following operations: \`next\` and \`hasNext\`.

The given compressed string will be in the form of each letter followed by a positive integer representing the number of this letter existing in the original uncompressed string.

Implement the \`StringIterator\` class:
- \`StringIterator(String compressedString)\` Initializes the object with the given compressed string.
- \`String next()\` Returns the next character (as a length-1 string) if the original string still has uncompressed characters, otherwise returns a single space \`" "\`.
- \`boolean hasNext()\` Returns \`true\` if there is still a character to iterate through, otherwise returns \`false\`.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: false,
        functionName: 'StringIterator',
        executionType: 'multi-call',
        examples: [
            { input: '["StringIterator","next","next","next","hasNext"]\n[["L1e2t1C1o1d1e1"],[],[],[],[]]', output: '[null,"L","e","e",true]', explanation: '' },
        ],
        constraints: ['1 <= compressedString.length <= 1000', 'compressedString consists of lowercase and uppercase English letters and digits.', 'The number of a single character repetitions in compressedString is in the range [1, 10^9]', 'At most 100 calls will be made to next and hasNext.'],
        testCases: [
            {
                input: {
                    operations: ['StringIterator', 'next', 'next', 'next', 'hasNext'],
                    args: [['L1e2t1C1o1d1e1'], [], [], [], []]
                },
                expectedOutput: [null, 'L', 'e', 'e', true]
            },
            {
                input: {
                    operations: ['StringIterator', 'next', 'hasNext'],
                    args: [['a1'], [], []]
                },
                expectedOutput: [null, 'a', false]
            },
        ],
        starterCode: {
            python: `class StringIterator:
    def __init__(self, compressedString: str):
        # Write your solution here
        pass

    def next(self) -> str:
        # Write your solution here
        pass

    def has_next(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class StringIterator {
    constructor(compressedString) {
        // Write your solution here
    }

    next() {
        // Write your solution here
    }

    hasNext() {
        // Write your solution here
    }
}`,
            java: `class StringIterator {
    public StringIterator(String compressedString) {
        // Write your solution here
    }

    public String next() {
        // Write your solution here
        return " ";
    }

    public boolean hasNext() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Range Sum Query - Immutable',
        description: `Given an integer array \`nums\`, handle multiple queries of the following type:
- Calculate the sum of the elements of \`nums\` between indices \`left\` and \`right\` inclusive where \`left <= right\`.

Implement the \`NumArray\` class:
- \`NumArray(int[] nums)\` Initializes the object with the integer array \`nums\`.
- \`int sumRange(int left, int right)\` Returns the sum of the elements of \`nums\` between indices \`left\` and \`right\` inclusive.`,
        difficulty: 'easy',
        category: 'iterator',
        isPremium: false,
        functionName: 'NumArray',
        executionType: 'multi-call',
        examples: [
            { input: '["NumArray","sumRange","sumRange","sumRange"]\n[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]', output: '[null,1,-1,-3]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5', '0 <= left <= right < nums.length', 'At most 10^4 calls will be made to sumRange.'],
        testCases: [
            {
                input: {
                    operations: ['NumArray', 'sumRange', 'sumRange', 'sumRange'],
                    args: [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
                },
                expectedOutput: [null, 1, -1, -3]
            },
        ],
        starterCode: {
            python: `class NumArray:
    def __init__(self, nums: list[int]):
        # Write your solution here
        pass

    def sum_range(self, left: int, right: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class NumArray {
    constructor(nums) {
        // Write your solution here
    }

    sumRange(left, right) {
        // Write your solution here
    }
}`,
            java: `class NumArray {
    public NumArray(int[] nums) {
        // Write your solution here
    }

    public int sumRange(int left, int right) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Range Sum Query 2D - Immutable',
        description: `Given a 2D matrix \`matrix\`, handle multiple queries of the following type:
- Calculate the sum of the elements of \`matrix\` inside the rectangle defined by its upper left corner \`(row1, col1)\` and lower right corner \`(row2, col2)\`.

Implement the \`NumMatrix\` class:
- \`NumMatrix(int[][] matrix)\` Initializes the object with the integer matrix \`matrix\`.
- \`int sumRegion(int row1, int col1, int row2, int col2)\` Returns the sum of the elements of \`matrix\` inside the rectangle defined by its upper left corner \`(row1, col1)\` and lower right corner \`(row2, col2)\`.`,
        difficulty: 'medium',
        category: 'iterator',
        isPremium: true,
        functionName: 'NumMatrix',
        executionType: 'multi-call',
        examples: [
            { input: '["NumMatrix","sumRegion","sumRegion","sumRegion"]\n[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]', output: '[null,8,11,12]', explanation: '' },
        ],
        constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '-10^5 <= matrix[i][j] <= 10^5', '0 <= row1 <= row2 < m', '0 <= col1 <= col2 < n', 'At most 10^4 calls will be made to sumRegion.'],
        testCases: [
            {
                input: {
                    operations: ['NumMatrix', 'sumRegion', 'sumRegion', 'sumRegion'],
                    args: [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
                },
                expectedOutput: [null, 8, 11, 12]
            },
        ],
        starterCode: {
            python: `class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        # Write your solution here
        pass

    def sum_region(self, row1: int, col1: int, row2: int, col2: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class NumMatrix {
    constructor(matrix) {
        // Write your solution here
    }

    sumRegion(row1, col1, row2, col2) {
        // Write your solution here
    }
}`,
            java: `class NumMatrix {
    public NumMatrix(int[][] matrix) {
        // Write your solution here
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Design HashSet',
        description: `Design a HashSet without using any built-in hash table libraries.

Implement the \`MyHashSet\` class:
- \`MyHashSet()\` Initializes the object with an empty set.
- \`void add(int key)\` Inserts the value \`key\` into the HashSet.
- \`void remove(int key)\` Removes the value \`key\` in the HashSet. If \`key\` does not exist in the HashSet, do nothing.
- \`boolean contains(int key)\` Returns whether the value \`key\` exists in the HashSet or not.`,
        difficulty: 'easy',
        category: 'iterator',
        isPremium: false,
        functionName: 'MyHashSet',
        executionType: 'multi-call',
        examples: [
            { input: '["MyHashSet","add","add","contains","contains","add","contains","remove","contains"]\n[[],[1],[2],[1],[3],[2],[2],[2],[2]]', output: '[null,null,null,true,false,null,true,null,false]', explanation: '' },
        ],
        constraints: ['0 <= key <= 10^6', 'At most 10^4 calls will be made to add, remove, and contains.'],
        testCases: [
            {
                input: {
                    operations: ['MyHashSet', 'add', 'add', 'contains', 'contains', 'add', 'contains', 'remove', 'contains'],
                    args: [[], [1], [2], [1], [3], [2], [2], [2], [2]]
                },
                expectedOutput: [null, null, null, true, false, null, true, null, false]
            },
        ],
        starterCode: {
            python: `class MyHashSet:
    def __init__(self):
        # Write your solution here
        pass

    def add(self, key: int) -> None:
        # Write your solution here
        pass

    def remove(self, key: int) -> None:
        # Write your solution here
        pass

    def contains(self, key: int) -> bool:
        # Write your solution here
        pass`,
            javascript: `class MyHashSet {
    constructor() {
        // Write your solution here
    }

    add(key) {
        // Write your solution here
    }

    remove(key) {
        // Write your solution here
    }

    contains(key) {
        // Write your solution here
    }
}`,
            java: `class MyHashSet {
    public MyHashSet() {
        // Write your solution here
    }

    public void add(int key) {
        // Write your solution here
    }

    public void remove(int key) {
        // Write your solution here
    }

    public boolean contains(int key) {
        // Write your solution here
        return false;
    }
}`
        }
    },

    // INTERACTIVE
    {
        title: 'Search in a Sorted Array of Unknown Size',
        description: `This is an interactive problem.

You have a sorted array of unique elements, but its size is not known to you. You do not have direct access to the array; instead, you can only access it through a pre-defined API \`int get(int index)\`:
- \`get(index)\` returns the value at \`index\` in the array if \`index\` is a valid index, or \`2147483647\` (a sentinel value representing "out of bounds") otherwise.

Given a target value \`target\`, return the index \`k\` such that the hidden array's value at index \`k\` equals \`target\`, or \`-1\` if no such index exists. You must write an algorithm that runs in \`O(log n)\` time, where \`n\` is the (unknown) size of the array.`,
        difficulty: 'medium',
        category: 'interactive',
        isPremium: false,
        functionName: 'search_unknown_size',
        executionType: 'interactive',
        interactiveSecretKeys: ['arr'],
        examples: [
            { input: 'arr = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in arr and its index is 4.' },
            { input: 'arr = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in arr so return -1.' },
        ],
        constraints: ['1 <= arr.length <= 10^4', '-10^4 <= arr[i], target <= 10^4', 'arr is sorted in ascending order.'],
        testCases: [
            { input: { target: 9, arr: [-1, 0, 3, 5, 9, 12] }, expectedOutput: 4 },
            { input: { target: 2, arr: [-1, 0, 3, 5, 9, 12] }, expectedOutput: -1 },
            { input: { target: 5, arr: [-1, 0, 3, 5, 9, 12] }, expectedOutput: 3 },
            { input: { target: -1, arr: [-1, 0, 3, 5, 9, 12] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def search_unknown_size(target: int) -> int:
    # You may call get(index) to read the hidden array. It returns 2147483647
    # if index is out of bounds.
    # Write your solution here
    pass`,
            javascript: `function searchUnknownSize(target) {
    // You may call get(index) to read the hidden array. It returns 2147483647
    // if index is out of bounds.
    // Write your solution here
}`,
            java: `class Solution {
    public int searchUnknownSize(int target) {
        // You may call Judge.get(index) to read the hidden array. It returns
        // 2147483647 if index is out of bounds.
        // Write your solution here
        return -1;
    }
}`
        },
        customDriver: {
            python: `def get(index):
    arr = data["arr"]
    if index < 0 or index >= len(arr):
        return 2147483647
    return arr[index]`,
            javascript: `function get(index) {
    const arr = data.arr;
    if (index < 0 || index >= arr.length) return 2147483647;
    return arr[index];
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static int get(int index) {
        List<Object> arr = (List<Object>) data.get("arr");
        if (index < 0 || index >= arr.size()) return 2147483647;
        return ((Number) arr.get(index)).intValue();
    }
}`
        }
    },
    {
        title: 'The Celebrity Problem',
        description: `This is an interactive problem.

Suppose you are at a party with \`n\` people labeled from \`0\` to \`n - 1\`, and among them there may exist one celebrity. The definition of a celebrity is that all the other \`n - 1\` people know the celebrity, but the celebrity does not know any of them.

You are given a helper function \`bool knows(a, b)\` which tells you whether \`a\` knows \`b\`. Find the celebrity, and return their label. If there is no celebrity, return \`-1\`. You must minimize the number of calls to \`knows\`.`,
        difficulty: 'medium',
        category: 'interactive',
        isPremium: false,
        functionName: 'find_celebrity',
        executionType: 'interactive',
        interactiveSecretKeys: ['know'],
        examples: [
            { input: 'n = 3, know = [[0,1,1],[0,0,0],[0,1,0]]', output: '1', explanation: 'Person 0 and 2 both know person 1, and person 1 knows nobody.' },
            { input: 'n = 2, know = [[0,1],[1,0]]', output: '-1', explanation: 'They know each other, so neither is a celebrity.' },
        ],
        constraints: ['1 <= n <= 100', 'know is an n x n grid of 0s and 1s.'],
        testCases: [
            { input: { n: 3, know: [[0, 1, 1], [0, 0, 0], [0, 1, 0]] }, expectedOutput: 1 },
            { input: { n: 2, know: [[0, 1], [1, 0]] }, expectedOutput: -1 },
            { input: { n: 1, know: [[0]] }, expectedOutput: 0 },
            { input: { n: 4, know: [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0]] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def find_celebrity(n: int) -> int:
    # You may call knows(a, b) to check whether a knows b.
    # Write your solution here
    pass`,
            javascript: `function findCelebrity(n) {
    // You may call knows(a, b) to check whether a knows b.
    // Write your solution here
}`,
            java: `class Solution {
    public int findCelebrity(int n) {
        // You may call Judge.knows(a, b) to check whether a knows b.
        // Write your solution here
        return -1;
    }
}`
        },
        customDriver: {
            python: `def knows(a, b):
    return bool(data["know"][a][b])`,
            javascript: `function knows(a, b) {
    return !!data.know[a][b];
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static boolean knows(int a, int b) {
        List<Object> know = (List<Object>) data.get("know");
        List<Object> row = (List<Object>) know.get(a);
        return ((Number) row.get(b)).intValue() != 0;
    }
}`
        }
    },
    {
        title: 'Find the Index of the Large Integer',
        description: `This is an interactive problem.

We have an integer array \`nums\`, where all the integers in \`nums\` are 0 or positive, and exactly one integer is strictly larger than all the others. You cannot access the array directly. Instead, you can call the API \`int compareSub(int l, int r, int x, int y)\`, which compares the sum of the subrange \`nums[l..r]\` with the sum of the subrange \`nums[x..y]\` (the two subranges have the same length, \`r - l == y - x\`), returning \`1\` if the first sum is bigger, \`-1\` if the second sum is bigger, and \`0\` if they are equal.

Given the size \`n\` of the array, find and return the index of the largest integer. You must minimize the number of calls made to \`compareSub\`.`,
        difficulty: 'hard',
        category: 'interactive',
        isPremium: true,
        functionName: 'get_index',
        executionType: 'interactive',
        interactiveSecretKeys: ['nums'],
        examples: [
            { input: 'n = 5, nums = [7,7,7,7,10]', output: '4', explanation: '' },
            { input: 'n = 4, nums = [9,3,3,3]', output: '0', explanation: '' },
        ],
        constraints: ['2 <= n <= 100', '0 <= nums[i] <= 100', 'Exactly one index has a value strictly greater than every other value.'],
        testCases: [
            { input: { n: 5, nums: [7, 7, 7, 7, 10] }, expectedOutput: 4 },
            { input: { n: 4, nums: [9, 3, 3, 3] }, expectedOutput: 0 },
            { input: { n: 3, nums: [1, 1, 5] }, expectedOutput: 2 },
            { input: { n: 2, nums: [5, 1] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def get_index(n: int) -> int:
    # You may call compare_sub(l, r, x, y) to compare the sum of nums[l..r]
    # against nums[x..y] (equal-length ranges). Returns 1, -1, or 0.
    # Write your solution here
    pass`,
            javascript: `function getIndex(n) {
    // You may call compareSub(l, r, x, y) to compare the sum of nums[l..r]
    // against nums[x..y] (equal-length ranges). Returns 1, -1, or 0.
    // Write your solution here
}`,
            java: `class Solution {
    public int getIndex(int n) {
        // You may call Judge.compareSub(l, r, x, y) to compare the sum of
        // nums[l..r] against nums[x..y] (equal-length ranges). Returns 1, -1, or 0.
        // Write your solution here
        return -1;
    }
}`
        },
        customDriver: {
            python: `def compare_sub(l, r, x, y):
    nums = data["nums"]
    sum1 = sum(nums[l:r+1])
    sum2 = sum(nums[x:y+1])
    if sum1 > sum2:
        return 1
    if sum1 < sum2:
        return -1
    return 0`,
            javascript: `function compareSub(l, r, x, y) {
    const nums = data.nums;
    let sum1 = 0, sum2 = 0;
    for (let i = l; i <= r; i++) sum1 += nums[i];
    for (let i = x; i <= y; i++) sum2 += nums[i];
    if (sum1 > sum2) return 1;
    if (sum1 < sum2) return -1;
    return 0;
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static int compareSub(int l, int r, int x, int y) {
        List<Object> nums = (List<Object>) data.get("nums");
        long sum1 = 0, sum2 = 0;
        for (int i = l; i <= r; i++) sum1 += ((Number) nums.get(i)).longValue();
        for (int i = x; i <= y; i++) sum2 += ((Number) nums.get(i)).longValue();
        if (sum1 > sum2) return 1;
        if (sum1 < sum2) return -1;
        return 0;
    }
}`
        }
    },
    {
        title: 'Guess the Word',
        description: `This is an interactive problem.

You are given an array of unique strings \`wordlist\` where every word has the same length, and there is a secret word among them that you must discover. You may call the API \`int guess(String word)\` up to a limited number of times; it returns the number of exact character-position matches between \`word\` and the secret word.

Return the secret word once you have deduced it.`,
        difficulty: 'hard',
        category: 'interactive',
        isPremium: true,
        functionName: 'find_secret_word',
        executionType: 'interactive',
        interactiveSecretKeys: ['secret'],
        examples: [
            { input: 'wordlist = ["acckzz","ccbazz","eiowzz","abcczz"], secret = "acckzz"', output: '"acckzz"', explanation: '' },
            { input: 'wordlist = ["abc","abd","abe"], secret = "abd"', output: '"abd"', explanation: '' },
        ],
        constraints: ['1 <= wordlist.length <= 100', '1 <= wordlist[i].length <= 10', 'All strings in wordlist have the same length.', 'The secret word is guaranteed to be present in wordlist.'],
        testCases: [
            { input: { wordlist: ['acckzz', 'ccbazz', 'eiowzz', 'abcczz'], secret: 'acckzz' }, expectedOutput: 'acckzz' },
            { input: { wordlist: ['abc', 'abd', 'abe'], secret: 'abd' }, expectedOutput: 'abd' },
            { input: { wordlist: ['a'], secret: 'a' }, expectedOutput: 'a' },
            { input: { wordlist: ['xy', 'xz'], secret: 'xz' }, expectedOutput: 'xz', isHidden: true },
        ],
        starterCode: {
            python: `def find_secret_word(wordlist: list[str]) -> str:
    # You may call guess(word) to compare word against the secret word. It
    # returns the number of characters that match in the same position.
    # Write your solution here
    pass`,
            javascript: `function findSecretWord(wordlist) {
    // You may call guess(word) to compare word against the secret word. It
    // returns the number of characters that match in the same position.
    // Write your solution here
}`,
            java: `class Solution {
    public String findSecretWord(String[] wordlist) {
        // You may call Judge.guess(word) to compare word against the secret
        // word. It returns the number of characters that match in the same position.
        // Write your solution here
        return "";
    }
}`
        },
        customDriver: {
            python: `def guess(word):
    secret = data["secret"]
    return sum(1 for a, b in zip(word, secret) if a == b)`,
            javascript: `function guess(word) {
    const secret = data.secret;
    let count = 0;
    for (let i = 0; i < word.length; i++) if (word[i] === secret[i]) count++;
    return count;
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static int guess(String word) {
        String secret = (String) data.get("secret");
        int count = 0;
        for (int i = 0; i < word.length(); i++) if (word.charAt(i) == secret.charAt(i)) count++;
        return count;
    }
}`
        }
    },
    {
        title: 'Guess the Majority in a Hidden Array',
        description: `This is an interactive problem.

You have a hidden array of \`n\` non-negative integers. You cannot access the array directly, but you can call the API \`int query(int a, int b, int c, int d)\`, which takes four distinct indices and returns the number of equal pairs among the four hidden values at those indices (there are 6 possible pairs among 4 indices).

Given \`n\`, return the value that appears more than \`n / 2\` times in the hidden array, or \`-1\` if no such value exists.`,
        difficulty: 'hard',
        category: 'interactive',
        isPremium: true,
        functionName: 'find_majority_value',
        executionType: 'interactive',
        interactiveSecretKeys: ['arr'],
        examples: [
            { input: 'n = 5, arr = [0,0,1,0,1]', output: '0', explanation: '0 appears 3 times out of 5, which is more than 2.5.' },
            { input: 'n = 3, arr = [0,1,2]', output: '-1', explanation: 'No value appears more than 1.5 times.' },
        ],
        constraints: ['4 <= n <= 100', '0 <= arr[i] <= 1'],
        testCases: [
            { input: { n: 5, arr: [0, 0, 1, 0, 1] }, expectedOutput: 0 },
            { input: { n: 4, arr: [0, 1, 0, 1] }, expectedOutput: -1 },
            { input: { n: 5, arr: [1, 1, 1, 1, 0] }, expectedOutput: 1 },
            { input: { n: 4, arr: [1, 1, 1, 0] }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def find_majority_value(n: int) -> int:
    # You may call query(a, b, c, d) with four distinct indices; it returns
    # how many of the 6 pairs among those four hidden values are equal.
    # Write your solution here
    pass`,
            javascript: `function findMajorityValue(n) {
    // You may call query(a, b, c, d) with four distinct indices; it returns
    // how many of the 6 pairs among those four hidden values are equal.
    // Write your solution here
}`,
            java: `class Solution {
    public int findMajorityValue(int n) {
        // You may call Judge.query(a, b, c, d) with four distinct indices; it
        // returns how many of the 6 pairs among those four hidden values are equal.
        // Write your solution here
        return -1;
    }
}`
        },
        customDriver: {
            python: `def query(a, b, c, d):
    arr = data["arr"]
    idxs = [a, b, c, d]
    count = 0
    for i in range(4):
        for j in range(i + 1, 4):
            if arr[idxs[i]] == arr[idxs[j]]:
                count += 1
    return count`,
            javascript: `function query(a, b, c, d) {
    const arr = data.arr;
    const idxs = [a, b, c, d];
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            if (arr[idxs[i]] === arr[idxs[j]]) count++;
        }
    }
    return count;
}`,
            java: `class Judge {
    static Map<String,Object> data;
    static int query(int a, int b, int c, int d) {
        List<Object> arr = (List<Object>) data.get("arr");
        int[] idxs = {a, b, c, d};
        int count = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = i + 1; j < 4; j++) {
                if (((Number) arr.get(idxs[i])).intValue() == ((Number) arr.get(idxs[j])).intValue()) count++;
            }
        }
        return count;
    }
}`
        }
    },

    // CONCURRENCY
    {
        title: 'Concurrent Counter with Increment',
        description: `Design a \`ThreadSafeCounter\` class that starts at \`0\` and supports an \`increment()\` operation. Multiple threads will call \`increment()\` on the same instance concurrently, and \`getValue()\` should always report the correct total once every thread has finished — no increments may be lost to a race condition.

Implement:
- \`ThreadSafeCounter()\` initializes the counter to \`0\`.
- \`void increment()\` atomically adds \`1\` to the counter.
- \`int getValue()\` returns the current value of the counter.`,
        difficulty: 'medium',
        category: 'concurrency',
        isPremium: false,
        functionName: 'ThreadSafeCounter',
        executionType: 'concurrent',
        examples: [
            { input: 'threadCount = 4, incrementsPerThread = 250', output: '1000', explanation: 'Each of the 4 threads calls increment() 250 times; the final value must be exactly 4 * 250 = 1000.' },
        ],
        constraints: ['1 <= threadCount <= 8', '1 <= incrementsPerThread <= 500'],
        testCases: [
            { input: { threadCount: 4, incrementsPerThread: 250 }, expectedOutput: 1000 },
            { input: { threadCount: 2, incrementsPerThread: 100 }, expectedOutput: 200 },
            { input: { threadCount: 1, incrementsPerThread: 1 }, expectedOutput: 1 },
            { input: { threadCount: 5, incrementsPerThread: 100 }, expectedOutput: 500, isHidden: true },
        ],
        starterCode: {
            python: `class ThreadSafeCounter:
    def __init__(self):
        # Write your solution here
        pass

    def increment(self) -> None:
        # Write your solution here
        pass

    def get_value(self) -> int:
        # Write your solution here
        pass`,
            javascript: `class ThreadSafeCounter {
    constructor() {
        // Write your solution here
    }

    increment() {
        // Write your solution here
    }

    getValue() {
        // Write your solution here
    }
}`,
            java: `class ThreadSafeCounter {
    public ThreadSafeCounter() {
        // Write your solution here
    }

    public void increment() {
        // Write your solution here
    }

    public int getValue() {
        // Write your solution here
        return 0;
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
thread_count = data["threadCount"]
increments_per_thread = data["incrementsPerThread"]

counter = ThreadSafeCounter()

def worker():
    for _ in range(increments_per_thread):
        counter.increment()

threads = [threading.Thread(target=worker) for _ in range(thread_count)]
for t in threads: t.start()
for t in threads: t.join()
print(json.dumps(counter.get_value()))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const threadCount = data.threadCount;
    const incrementsPerThread = data.incrementsPerThread;
    const counter = new ThreadSafeCounter();
    const worker = () => new Promise(r => setTimeout(() => {
        for (let i = 0; i < incrementsPerThread; i++) counter.increment();
        r();
    }, 0));
    const promises = [];
    for (let i = 0; i < threadCount; i++) promises.push(worker());
    Promise.all(promises).then(() => console.log(JSON.stringify(counter.getValue())));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        int threadCount = ((Number) data.get("threadCount")).intValue();
        int incrementsPerThread = ((Number) data.get("incrementsPerThread")).intValue();

        ThreadSafeCounter counter = new ThreadSafeCounter();
        Thread[] threads = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < incrementsPerThread; j++) counter.increment();
            });
        }
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        System.out.println(Json.stringify(counter.getValue()));
    }
}`
        }
    },
    {
        title: 'Parallel Range Sum',
        description: `Design a \`ParallelRangeSum\` class that computes the sum of a subrange of a shared integer array from multiple threads at once, each thread summing a different chunk of the array.

Implement:
- \`ParallelRangeSum(int[] nums)\` stores the array to be summed.
- \`int sumRange(int lo, int hi)\` returns the sum of \`nums[lo..hi]\` (inclusive). This method will be called from several different threads at the same time, each with a disjoint \`[lo, hi]\` range, and must return the correct sum for its own range regardless of what the other threads are doing.`,
        difficulty: 'easy',
        category: 'concurrency',
        isPremium: false,
        functionName: 'ParallelRangeSum',
        executionType: 'concurrent',
        examples: [
            { input: 'nums = [1,2,3,4,5,6,7,8], threadCount = 4', output: '36', explanation: 'Threads sum [1,2], [3,4], [5,6], and [7,8]; the results (3, 7, 11, 15) add up to 36.' },
        ],
        constraints: ['1 <= nums.length <= 1000', '1 <= threadCount <= 8', 'nums.length is a multiple of threadCount.', '-1000 <= nums[i] <= 1000'],
        testCases: [
            { input: { nums: [1, 2, 3, 4, 5, 6, 7, 8], threadCount: 4 }, expectedOutput: 36 },
            { input: { nums: [10, 20, 30, 40, 50, 60], threadCount: 3 }, expectedOutput: 210 },
            { input: { nums: [5], threadCount: 1 }, expectedOutput: 5 },
            { input: { nums: [1, 1, 1, 1], threadCount: 2 }, expectedOutput: 4, isHidden: true },
        ],
        starterCode: {
            python: `class ParallelRangeSum:
    def __init__(self, nums: list[int]):
        # Write your solution here
        pass

    def sum_range(self, lo: int, hi: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class ParallelRangeSum {
    constructor(nums) {
        // Write your solution here
    }

    sumRange(lo, hi) {
        // Write your solution here
    }
}`,
            java: `class ParallelRangeSum {
    public ParallelRangeSum(int[] nums) {
        // Write your solution here
    }

    public int sumRange(int lo, int hi) {
        // Write your solution here
        return 0;
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
nums = data["nums"]
thread_count = data["threadCount"]
n = len(nums)
chunk = n // thread_count

solver = ParallelRangeSum(nums)
results = [0] * thread_count

def worker(i):
    lo = i * chunk
    hi = lo + chunk - 1
    results[i] = solver.sum_range(lo, hi)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(thread_count)]
for t in threads: t.start()
for t in threads: t.join()
print(json.dumps(sum(results)))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const nums = data.nums;
    const threadCount = data.threadCount;
    const n = nums.length;
    const chunkSize = Math.floor(n / threadCount);
    const solver = new ParallelRangeSum(nums);
    const results = new Array(threadCount).fill(0);
    const worker = (i) => new Promise(r => setTimeout(() => {
        const lo = i * chunkSize;
        const hi = lo + chunkSize - 1;
        results[i] = solver.sumRange(lo, hi);
        r();
    }, 0));
    const promises = [];
    for (let i = 0; i < threadCount; i++) promises.push(worker(i));
    Promise.all(promises).then(() => console.log(JSON.stringify(results.reduce((a, b) => a + b, 0))));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        List<Object> numsList = (List<Object>) data.get("nums");
        int n = numsList.size();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = ((Number) numsList.get(i)).intValue();
        int threadCount = ((Number) data.get("threadCount")).intValue();
        int chunk = n / threadCount;

        ParallelRangeSum solver = new ParallelRangeSum(nums);
        int[] results = new int[threadCount];
        Thread[] threads = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            final int idx = i;
            threads[i] = new Thread(() -> {
                int lo = idx * chunk;
                int hi = lo + chunk - 1;
                results[idx] = solver.sumRange(lo, hi);
            });
        }
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        int total = 0;
        for (int r : results) total += r;
        System.out.println(Json.stringify(total));
    }
}`
        }
    },
    {
        title: 'Parallel Range Maximum',
        description: `Design a \`ParallelRangeMax\` class that finds the maximum value within a subrange of a shared integer array from multiple threads at once, each thread scanning a different chunk of the array.

Implement:
- \`ParallelRangeMax(int[] nums)\` stores the array to be scanned.
- \`int maxRange(int lo, int hi)\` returns the maximum value of \`nums[lo..hi]\` (inclusive). This method will be called from several different threads at the same time, each with a disjoint \`[lo, hi]\` range, and must return the correct maximum for its own range regardless of what the other threads are doing.`,
        difficulty: 'easy',
        category: 'concurrency',
        isPremium: false,
        functionName: 'ParallelRangeMax',
        executionType: 'concurrent',
        examples: [
            { input: 'nums = [3,7,2,9,4,1,8,5], threadCount = 4', output: '9', explanation: 'Threads scan [3,7], [2,9], [4,1], and [8,5]; the overall maximum is 9.' },
        ],
        constraints: ['1 <= nums.length <= 1000', '1 <= threadCount <= 8', 'nums.length is a multiple of threadCount.', '-1000 <= nums[i] <= 1000'],
        testCases: [
            { input: { nums: [3, 7, 2, 9, 4, 1, 8, 5], threadCount: 4 }, expectedOutput: 9 },
            { input: { nums: [1, 2, 3, 4, 5, 6], threadCount: 3 }, expectedOutput: 6 },
            { input: { nums: [100], threadCount: 1 }, expectedOutput: 100 },
            { input: { nums: [-5, -2, -9, -1], threadCount: 2 }, expectedOutput: -1, isHidden: true },
        ],
        starterCode: {
            python: `class ParallelRangeMax:
    def __init__(self, nums: list[int]):
        # Write your solution here
        pass

    def max_range(self, lo: int, hi: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class ParallelRangeMax {
    constructor(nums) {
        // Write your solution here
    }

    maxRange(lo, hi) {
        // Write your solution here
    }
}`,
            java: `class ParallelRangeMax {
    public ParallelRangeMax(int[] nums) {
        // Write your solution here
    }

    public int maxRange(int lo, int hi) {
        // Write your solution here
        return 0;
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
nums = data["nums"]
thread_count = data["threadCount"]
n = len(nums)
chunk = n // thread_count

solver = ParallelRangeMax(nums)
results = [None] * thread_count

def worker(i):
    lo = i * chunk
    hi = lo + chunk - 1
    results[i] = solver.max_range(lo, hi)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(thread_count)]
for t in threads: t.start()
for t in threads: t.join()
print(json.dumps(max(results)))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const nums = data.nums;
    const threadCount = data.threadCount;
    const n = nums.length;
    const chunkSize = Math.floor(n / threadCount);
    const solver = new ParallelRangeMax(nums);
    const results = new Array(threadCount).fill(null);
    const worker = (i) => new Promise(r => setTimeout(() => {
        const lo = i * chunkSize;
        const hi = lo + chunkSize - 1;
        results[i] = solver.maxRange(lo, hi);
        r();
    }, 0));
    const promises = [];
    for (let i = 0; i < threadCount; i++) promises.push(worker(i));
    Promise.all(promises).then(() => console.log(JSON.stringify(Math.max(...results))));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        List<Object> numsList = (List<Object>) data.get("nums");
        int n = numsList.size();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = ((Number) numsList.get(i)).intValue();
        int threadCount = ((Number) data.get("threadCount")).intValue();
        int chunk = n / threadCount;

        ParallelRangeMax solver = new ParallelRangeMax(nums);
        int[] results = new int[threadCount];
        Thread[] threads = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            final int idx = i;
            threads[i] = new Thread(() -> {
                int lo = idx * chunk;
                int hi = lo + chunk - 1;
                results[idx] = solver.maxRange(lo, hi);
            });
        }
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        int best = results[0];
        for (int r : results) if (r > best) best = r;
        System.out.println(Json.stringify(best));
    }
}`
        }
    },
    {
        title: 'Parallel Contains Check',
        description: `Design a \`ParallelContains\` class that checks whether a target value exists within a subrange of a shared integer array from multiple threads at once, each thread checking a different chunk of the array.

Implement:
- \`ParallelContains(int[] nums, int target)\` stores the array and the value being searched for.
- \`boolean containsInRange(int lo, int hi)\` returns \`true\` if \`target\` appears anywhere in \`nums[lo..hi]\` (inclusive). This method will be called from several different threads at the same time, each with a disjoint \`[lo, hi]\` range, and must return the correct result for its own range regardless of what the other threads are doing.`,
        difficulty: 'easy',
        category: 'concurrency',
        isPremium: false,
        functionName: 'ParallelContains',
        executionType: 'concurrent',
        examples: [
            { input: 'nums = [1,2,3,4,5,6,7,8], target = 5, threadCount = 4', output: 'true', explanation: '5 falls in the chunk [5,6], so at least one thread reports true.' },
        ],
        constraints: ['1 <= nums.length <= 1000', '1 <= threadCount <= 8', 'nums.length is a multiple of threadCount.', '-1000 <= nums[i], target <= 1000'],
        testCases: [
            { input: { nums: [1, 2, 3, 4, 5, 6, 7, 8], target: 5, threadCount: 4 }, expectedOutput: true },
            { input: { nums: [1, 2, 3, 4], target: 9, threadCount: 2 }, expectedOutput: false },
            { input: { nums: [7], target: 7, threadCount: 1 }, expectedOutput: true },
            { input: { nums: [2, 4, 6, 8], target: 3, threadCount: 2 }, expectedOutput: false, isHidden: true },
        ],
        starterCode: {
            python: `class ParallelContains:
    def __init__(self, nums: list[int], target: int):
        # Write your solution here
        pass

    def contains_in_range(self, lo: int, hi: int) -> bool:
        # Write your solution here
        pass`,
            javascript: `class ParallelContains {
    constructor(nums, target) {
        // Write your solution here
    }

    containsInRange(lo, hi) {
        // Write your solution here
    }
}`,
            java: `class ParallelContains {
    public ParallelContains(int[] nums, int target) {
        // Write your solution here
    }

    public boolean containsInRange(int lo, int hi) {
        // Write your solution here
        return false;
    }
}`
        },
        customDriver: {
            python: `data = json.loads(sys.stdin.read())
nums = data["nums"]
target = data["target"]
thread_count = data["threadCount"]
n = len(nums)
chunk = n // thread_count

solver = ParallelContains(nums, target)
results = [False] * thread_count

def worker(i):
    lo = i * chunk
    hi = lo + chunk - 1
    results[i] = solver.contains_in_range(lo, hi)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(thread_count)]
for t in threads: t.start()
for t in threads: t.join()
print(json.dumps(any(results)))`,
            javascript: `const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const data = JSON.parse(chunks.join(''));
    const nums = data.nums;
    const target = data.target;
    const threadCount = data.threadCount;
    const n = nums.length;
    const chunkSize = Math.floor(n / threadCount);
    const solver = new ParallelContains(nums, target);
    const results = new Array(threadCount).fill(false);
    const worker = (i) => new Promise(r => setTimeout(() => {
        const lo = i * chunkSize;
        const hi = lo + chunkSize - 1;
        results[i] = solver.containsInRange(lo, hi);
        r();
    }, 0));
    const promises = [];
    for (let i = 0; i < threadCount; i++) promises.push(worker(i));
    Promise.all(promises).then(() => console.log(JSON.stringify(results.some(x => x))));
});`,
            java: `public class Main {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.useDelimiter("\\\\A").next();
        Map<String, Object> data = (Map<String, Object>) Json.parse(input);
        List<Object> numsList = (List<Object>) data.get("nums");
        int n = numsList.size();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = ((Number) numsList.get(i)).intValue();
        int target = ((Number) data.get("target")).intValue();
        int threadCount = ((Number) data.get("threadCount")).intValue();
        int chunk = n / threadCount;

        ParallelContains solver = new ParallelContains(nums, target);
        boolean[] results = new boolean[threadCount];
        Thread[] threads = new Thread[threadCount];
        for (int i = 0; i < threadCount; i++) {
            final int idx = i;
            threads[i] = new Thread(() -> {
                int lo = idx * chunk;
                int hi = lo + chunk - 1;
                results[idx] = solver.containsInRange(lo, hi);
            });
        }
        for (Thread t : threads) t.start();
        for (Thread t : threads) t.join();
        boolean found = false;
        for (boolean r : results) if (r) found = true;
        System.out.println(Json.stringify(found));
    }
}`
        }
    },

    // ===================== QUEUE / DEQUE / BACKTRACKING BATCH =====================

    // QUEUE
    {
        title: 'Implement Queue using Stacks',
        description: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (\`push\`, \`peek\`, \`pop\`, and \`empty\`).

Implement the \`MyQueue\` class:
- \`MyQueue()\` Initializes the queue object.
- \`void push(int x)\` Pushes element \`x\` to the back of the queue.
- \`int pop()\` Removes the element from the front of the queue and returns it.
- \`int peek()\` Returns the element at the front of the queue.
- \`boolean empty()\` Returns \`true\` if the queue is empty, \`false\` otherwise.`,
        difficulty: 'easy',
        category: 'queue',
        isPremium: false,
        functionName: 'MyQueue',
        executionType: 'multi-call',
        examples: [
            { input: '["MyQueue","push","push","peek","pop","empty"]\n[[],[1],[2],[],[],[]]', output: '[null,null,null,1,1,false]', explanation: '' },
        ],
        constraints: ['1 <= x <= 9', 'At most 100 calls will be made to push, pop, peek, and empty.', 'All the calls to pop and peek are valid.'],
        testCases: [
            {
                input: {
                    operations: ['MyQueue', 'push', 'push', 'peek', 'pop', 'empty'],
                    args: [[], [1], [2], [], [], []]
                },
                expectedOutput: [null, null, null, 1, 1, false]
            },
        ],
        starterCode: {
            python: `class MyQueue:
    def __init__(self):
        # Write your solution here
        pass

    def push(self, x: int) -> None:
        # Write your solution here
        pass

    def pop(self) -> int:
        # Write your solution here
        pass

    def peek(self) -> int:
        # Write your solution here
        pass

    def empty(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class MyQueue {
    constructor() {
        // Write your solution here
    }

    push(x) {
        // Write your solution here
    }

    pop() {
        // Write your solution here
    }

    peek() {
        // Write your solution here
    }

    empty() {
        // Write your solution here
    }
}`,
            java: `class MyQueue {
    public MyQueue() {
        // Write your solution here
    }

    public void push(int x) {
        // Write your solution here
    }

    public int pop() {
        // Write your solution here
        return -1;
    }

    public int peek() {
        // Write your solution here
        return -1;
    }

    public boolean empty() {
        // Write your solution here
        return true;
    }
}`
        }
    },
    {
        title: 'Number of Recent Calls',
        description: `You have a \`RecentCounter\` class which counts the number of recent requests within a certain time frame.

Implement the \`RecentCounter\` class:
- \`RecentCounter()\` Initializes the counter with zero recent requests.
- \`int ping(int t)\` Adds a new request at time \`t\`, where \`t\` represents some time in milliseconds, and returns the number of requests that have happened in the past \`3000\` milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range \`[t - 3000, t]\`.

It is guaranteed that every call to \`ping\` uses a strictly larger value of \`t\` than the previous call.`,
        difficulty: 'easy',
        category: 'queue',
        isPremium: false,
        functionName: 'RecentCounter',
        executionType: 'multi-call',
        examples: [
            { input: '["RecentCounter","ping","ping","ping","ping"]\n[[],[1],[100],[3001],[3002]]', output: '[null,1,2,3,3]', explanation: '' },
        ],
        constraints: ['1 <= t <= 10^9', 'Each test case will call ping with strictly increasing values of t.', 'At most 10^4 calls will be made to ping.'],
        testCases: [
            {
                input: {
                    operations: ['RecentCounter', 'ping', 'ping', 'ping', 'ping'],
                    args: [[], [1], [100], [3001], [3002]]
                },
                expectedOutput: [null, 1, 2, 3, 3]
            },
        ],
        starterCode: {
            python: `class RecentCounter:
    def __init__(self):
        # Write your solution here
        pass

    def ping(self, t: int) -> int:
        # Write your solution here
        pass`,
            javascript: `class RecentCounter {
    constructor() {
        // Write your solution here
    }

    ping(t) {
        // Write your solution here
    }
}`,
            java: `class RecentCounter {
    public RecentCounter() {
        // Write your solution here
    }

    public int ping(int t) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Design Front Middle Back Queue',
        description: `Design a queue that supports push and pop operations in the front, middle, and back.

Implement the \`FrontMiddleBackQueue\` class:
- \`FrontMiddleBackQueue()\` Initializes the queue.
- \`void pushFront(int val)\` Adds \`val\` to the front of the queue.
- \`void pushMiddle(int val)\` Adds \`val\` to the middle of the queue.
- \`void pushBack(int val)\` Adds \`val\` to the back of the queue.
- \`int popFront()\` Removes the front element of the queue and returns it. If the queue is empty, return \`-1\`.
- \`int popMiddle()\` Removes the middle element of the queue and returns it. If the queue is empty, return \`-1\`.
- \`int popBack()\` Removes the back element of the queue and returns it. If the queue is empty, return \`-1\`.

Notice that when there are two middle position choices, the operation is performed on the frontmost middle position choice. For example:
- Pushing \`6\` into the middle of \`[1, 2, 3, 4, 5]\` results in \`[1, 2, 6, 3, 4, 5]\`.
- Popping the middle from \`[1, 2, 3, 4, 5, 6]\` returns \`3\` and results in \`[1, 2, 4, 5, 6]\`.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: true,
        functionName: 'FrontMiddleBackQueue',
        executionType: 'multi-call',
        examples: [
            { input: '["FrontMiddleBackQueue","pushFront","pushBack","pushMiddle","pushMiddle","popFront","popMiddle","popMiddle","popBack"]\n[[],[1],[2],[3],[4],[],[],[],[]]', output: '[null,null,null,null,null,1,3,4,2]', explanation: '' },
        ],
        constraints: ['1 <= val <= 10^9', 'At most 1000 calls will be made to pushFront, pushMiddle, pushBack, popFront, popMiddle, and popBack.'],
        testCases: [
            {
                input: {
                    operations: ['FrontMiddleBackQueue', 'pushFront', 'pushBack', 'pushMiddle', 'pushMiddle', 'popFront', 'popMiddle', 'popMiddle', 'popBack'],
                    args: [[], [1], [2], [3], [4], [], [], [], []]
                },
                expectedOutput: [null, null, null, null, null, 1, 3, 4, 2]
            },
        ],
        starterCode: {
            python: `class FrontMiddleBackQueue:
    def __init__(self):
        # Write your solution here
        pass

    def push_front(self, val: int) -> None:
        # Write your solution here
        pass

    def push_middle(self, val: int) -> None:
        # Write your solution here
        pass

    def push_back(self, val: int) -> None:
        # Write your solution here
        pass

    def pop_front(self) -> int:
        # Write your solution here
        pass

    def pop_middle(self) -> int:
        # Write your solution here
        pass

    def pop_back(self) -> int:
        # Write your solution here
        pass`,
            javascript: `class FrontMiddleBackQueue {
    constructor() {
        // Write your solution here
    }

    pushFront(val) {
        // Write your solution here
    }

    pushMiddle(val) {
        // Write your solution here
    }

    pushBack(val) {
        // Write your solution here
    }

    popFront() {
        // Write your solution here
    }

    popMiddle() {
        // Write your solution here
    }

    popBack() {
        // Write your solution here
    }
}`,
            java: `class FrontMiddleBackQueue {
    public FrontMiddleBackQueue() {
        // Write your solution here
    }

    public void pushFront(int val) {
        // Write your solution here
    }

    public void pushMiddle(int val) {
        // Write your solution here
    }

    public void pushBack(int val) {
        // Write your solution here
    }

    public int popFront() {
        // Write your solution here
        return -1;
    }

    public int popMiddle() {
        // Write your solution here
        return -1;
    }

    public int popBack() {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Walls and Gates',
        description: `You are given an \`m x n\` grid \`rooms\` initialized with these three possible values:
- \`-1\` A wall or an obstacle.
- \`0\` A gate.
- \`2147483647\` (representing \`INF\`) An empty room.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, the room should remain filled with \`INF\`.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: false,
        functionName: 'walls_and_gates',
        examples: [
            { input: 'rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]', output: '[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]', explanation: '' },
        ],
        constraints: ['m == rooms.length', 'n == rooms[i].length', '1 <= m, n <= 250', "rooms[i][j] is -1, 0, or 2^31 - 1."],
        testCases: [
            { input: { rooms: [[2147483647, -1, 0, 2147483647], [2147483647, 2147483647, 2147483647, -1], [2147483647, -1, 2147483647, -1], [0, -1, 2147483647, 2147483647]] }, expectedOutput: [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]] },
            { input: { rooms: [[0]] }, expectedOutput: [[0]] },
            { input: { rooms: [[-1]] }, expectedOutput: [[-1]] },
            { input: { rooms: [[2147483647, 0], [2147483647, -1]] }, expectedOutput: [[1, 0], [2, -1]], isHidden: true },
        ],
        starterCode: {
            python: `def walls_and_gates(rooms: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function wallsAndGates(rooms) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] wallsAndGates(int[][] rooms) {
        // Write your solution here
        return rooms;
    }
}`
        }
    },
    {
        title: 'Open the Lock',
        description: `You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: \`'0'\` to \`'9'\`. The wheels can rotate freely and wrap around: for example we can turn \`'9'\` to be \`'0'\`, or \`'0'\` to be \`'9'\`. Each move consists of turning one wheel one slot.

The lock initially starts at \`'0000'\`. You are given a list of \`deadends\` dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it. Given a \`target\` representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or \`-1\` if it is impossible.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: false,
        functionName: 'open_lock',
        examples: [
            { input: 'deadends = ["0201","0101","0102","1212","2002"], target = "0202"', output: '6', explanation: '' },
            { input: 'deadends = ["8888"], target = "0009"', output: '1', explanation: '' },
        ],
        constraints: ['1 <= deadends.length <= 500', 'deadends[i].length == 4', 'target.length == 4', 'target is not in the list deadends.', 'target and deadends[i] consist of digits only.'],
        testCases: [
            { input: { deadends: ['0201', '0101', '0102', '1212', '2002'], target: '0202' }, expectedOutput: 6 },
            { input: { deadends: ['8888'], target: '0009' }, expectedOutput: 1 },
            { input: { deadends: ['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'], target: '8888' }, expectedOutput: -1 },
            { input: { deadends: [], target: '0000' }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def open_lock(deadends: list[str], target: str) -> int:
    # Write your solution here
    pass`,
            javascript: `function openLock(deadends, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int openLock(String[] deadends, String target) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Perfect Squares',
        description: `Given an integer \`n\`, return the least number of perfect square numbers that sum to \`n\`.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, \`1\`, \`4\`, \`9\`, and \`16\` are perfect squares while \`3\` and \`11\` are not.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: false,
        functionName: 'num_squares',
        examples: [
            { input: 'n = 12', output: '3', explanation: '12 = 4 + 4 + 4.' },
            { input: 'n = 13', output: '2', explanation: '13 = 4 + 9.' },
        ],
        constraints: ['1 <= n <= 10^4'],
        testCases: [
            { input: { n: 12 }, expectedOutput: 3 },
            { input: { n: 13 }, expectedOutput: 2 },
            { input: { n: 1 }, expectedOutput: 1 },
            { input: { n: 4 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def num_squares(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function numSquares(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int numSquares(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: '01 Matrix',
        description: `Given an \`m x n\` binary matrix \`mat\`, return the distance of the nearest \`0\` for each cell.

The distance between two adjacent cells is \`1\`.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: false,
        functionName: 'update_matrix',
        examples: [
            { input: 'mat = [[0,0,0],[0,1,0],[0,0,0]]', output: '[[0,0,0],[0,1,0],[0,0,0]]', explanation: '' },
            { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]', explanation: '' },
        ],
        constraints: ['m == mat.length', 'n == mat[i].length', '1 <= m, n <= 10^4', '1 <= m * n <= 10^4', "mat[i][j] is either 0 or 1.", 'There is at least one 0 in mat.'],
        testCases: [
            { input: { mat: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] }, expectedOutput: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
            { input: { mat: [[0, 0, 0], [0, 1, 0], [1, 1, 1]] }, expectedOutput: [[0, 0, 0], [0, 1, 0], [1, 2, 1]] },
            { input: { mat: [[0]] }, expectedOutput: [[0]] },
            { input: { mat: [[1, 1], [1, 0]] }, expectedOutput: [[2, 1], [1, 0]], isHidden: true },
        ],
        starterCode: {
            python: `def update_matrix(mat: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function updateMatrix(mat) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] updateMatrix(int[][] mat) {
        // Write your solution here
        return mat;
    }
}`
        }
    },
    {
        title: 'Minimum Genetic Mutation',
        description: `A gene string can be represented by an 8-character long string, with choices from \`'A'\`, \`'C'\`, \`'G'\`, and \`'T'\`.

Suppose we need to investigate a mutation from a gene string \`startGene\` to a gene string \`endGene\` where one mutation is defined as one single character changed in the gene string.
- For example, \`"AACCGGTT" --> "AACCGGTA"\` is one mutation.

There is also a gene bank \`bank\` that records all the valid gene mutations. A gene must be in \`bank\` to make it a valid gene string.

Given the two gene strings \`startGene\` and \`endGene\` and the gene bank \`bank\`, return the minimum number of mutations needed to mutate from \`startGene\` to \`endGene\`. If there is no such a mutation, return \`-1\`.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: true,
        functionName: 'min_mutation',
        examples: [
            { input: 'startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]', output: '1', explanation: '' },
            { input: 'startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]', output: '2', explanation: '' },
        ],
        constraints: ['0 <= bank.length <= 10', 'startGene.length == endGene.length == bank[i].length == 8', 'startGene, endGene, and bank[i] consist of only the characters A, C, G, and T.'],
        testCases: [
            { input: { startGene: 'AACCGGTT', endGene: 'AACCGGTA', bank: ['AACCGGTA'] }, expectedOutput: 1 },
            { input: { startGene: 'AACCGGTT', endGene: 'AAACGGTA', bank: ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'] }, expectedOutput: 2 },
            { input: { startGene: 'AAAAACCC', endGene: 'AACCCCCC', bank: ['AAAACCCC', 'AAACCCCC', 'AACCCCCC'] }, expectedOutput: 3 },
            { input: { startGene: 'AAAAAAAA', endGene: 'AAAAAAAA', bank: [] }, expectedOutput: 0, isHidden: true },
        ],
        starterCode: {
            python: `def min_mutation(startGene: str, endGene: str, bank: list[str]) -> int:
    # Write your solution here
    pass`,
            javascript: `function minMutation(startGene, endGene, bank) {
    // Write your solution here
}`,
            java: `class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Binary Tree Right Side View',
        description: `Given the \`root\` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.`,
        difficulty: 'medium',
        category: 'queue',
        isPremium: false,
        functionName: 'right_side_view',
        treeNodeParams: ['root'],
        examples: [
            { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]', explanation: '' },
            { input: 'root = [1,null,3]', output: '[1,3]', explanation: '' },
        ],
        constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
        testCases: [
            { input: { root: [1, 2, 3, null, 5, null, 4] }, expectedOutput: [1, 3, 4] },
            { input: { root: [1, null, 3] }, expectedOutput: [1, 3] },
            { input: { root: [] }, expectedOutput: [] },
            { input: { root: [1, 2] }, expectedOutput: [1, 2], isHidden: true },
        ],
        starterCode: {
            python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def right_side_view(root: TreeNode) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function rightSideView(root) {
    // Write your solution here
}`,
            java: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public int[] rightSideView(TreeNode root) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // DEQUE
    {
        title: 'Design Circular Deque',
        description: `Design your implementation of the circular double-ended queue (deque).

Implement the \`MyCircularDeque\` class:
- \`MyCircularDeque(int k)\` Initializes the deque with a maximum size of \`k\`.
- \`boolean insertFront()\` Adds an item at the front of the deque. Returns \`true\` if the operation is successful, or \`false\` otherwise.
- \`boolean insertLast()\` Adds an item at the rear of the deque. Returns \`true\` if the operation is successful, or \`false\` otherwise.
- \`boolean deleteFront()\` Deletes an item from the front of the deque. Returns \`true\` if the operation is successful, or \`false\` otherwise.
- \`boolean deleteLast()\` Deletes an item from the rear of the deque. Returns \`true\` if the operation is successful, or \`false\` otherwise.
- \`int getFront()\` Returns the front item from the deque. Returns \`-1\` if the deque is empty.
- \`int getRear()\` Returns the last item from the deque. Returns \`-1\` if the deque is empty.
- \`boolean isEmpty()\` Returns \`true\` if the deque is empty, or \`false\` otherwise.
- \`boolean isFull()\` Returns \`true\` if the deque is full, or \`false\` otherwise.

Note that \`insertFront\` and \`insertLast\` take the value to insert as an argument.`,
        difficulty: 'medium',
        category: 'deque',
        isPremium: false,
        functionName: 'MyCircularDeque',
        executionType: 'multi-call',
        examples: [
            { input: '["MyCircularDeque","insertLast","insertLast","insertFront","insertFront","getRear","isFull","deleteLast","insertFront","getFront"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]', output: '[null,true,true,true,false,2,true,true,true,4]', explanation: '' },
        ],
        constraints: ['1 <= k <= 1000', '0 <= value <= 1000', 'At most 2000 calls will be made to insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull.'],
        testCases: [
            {
                input: {
                    operations: ['MyCircularDeque', 'insertLast', 'insertLast', 'insertFront', 'insertFront', 'getRear', 'isFull', 'deleteLast', 'insertFront', 'getFront'],
                    args: [[3], [1], [2], [3], [4], [], [], [], [4], []]
                },
                expectedOutput: [null, true, true, true, false, 2, true, true, true, 4]
            },
        ],
        starterCode: {
            python: `class MyCircularDeque:
    def __init__(self, k: int):
        # Write your solution here
        pass

    def insert_front(self, value: int) -> bool:
        # Write your solution here
        pass

    def insert_last(self, value: int) -> bool:
        # Write your solution here
        pass

    def delete_front(self) -> bool:
        # Write your solution here
        pass

    def delete_last(self) -> bool:
        # Write your solution here
        pass

    def get_front(self) -> int:
        # Write your solution here
        pass

    def get_rear(self) -> int:
        # Write your solution here
        pass

    def is_empty(self) -> bool:
        # Write your solution here
        pass

    def is_full(self) -> bool:
        # Write your solution here
        pass`,
            javascript: `class MyCircularDeque {
    constructor(k) {
        // Write your solution here
    }

    insertFront(value) {
        // Write your solution here
    }

    insertLast(value) {
        // Write your solution here
    }

    deleteFront() {
        // Write your solution here
    }

    deleteLast() {
        // Write your solution here
    }

    getFront() {
        // Write your solution here
    }

    getRear() {
        // Write your solution here
    }

    isEmpty() {
        // Write your solution here
    }

    isFull() {
        // Write your solution here
    }
}`,
            java: `class MyCircularDeque {
    public MyCircularDeque(int k) {
        // Write your solution here
    }

    public boolean insertFront(int value) {
        // Write your solution here
        return false;
    }

    public boolean insertLast(int value) {
        // Write your solution here
        return false;
    }

    public boolean deleteFront() {
        // Write your solution here
        return false;
    }

    public boolean deleteLast() {
        // Write your solution here
        return false;
    }

    public int getFront() {
        // Write your solution here
        return -1;
    }

    public int getRear() {
        // Write your solution here
        return -1;
    }

    public boolean isEmpty() {
        // Write your solution here
        return true;
    }

    public boolean isFull() {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Shortest Subarray with Sum at Least K',
        description: `Given an integer array \`nums\` and an integer \`k\`, return the length of the shortest non-empty subarray of \`nums\` with a sum of at least \`k\`. If there is no such subarray, return \`-1\`.`,
        difficulty: 'hard',
        category: 'deque',
        isPremium: true,
        functionName: 'shortest_subarray',
        examples: [
            { input: 'nums = [1], k = 1', output: '1', explanation: '' },
            { input: 'nums = [1,2], k = 4', output: '-1', explanation: '' },
            { input: 'nums = [2,-1,2], k = 3', output: '3', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-10^5 <= nums[i] <= 10^5', '1 <= k <= 10^9'],
        testCases: [
            { input: { nums: [1], k: 1 }, expectedOutput: 1 },
            { input: { nums: [1, 2], k: 4 }, expectedOutput: -1 },
            { input: { nums: [2, -1, 2], k: 3 }, expectedOutput: 3 },
            { input: { nums: [17, 85, 93, -45, -21], k: 150 }, expectedOutput: 2, isHidden: true },
        ],
        starterCode: {
            python: `def shortest_subarray(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function shortestSubarray(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int shortestSubarray(int[] nums, int k) {
        // Write your solution here
        return -1;
    }
}`
        }
    },
    {
        title: 'Constrained Subsequence Sum',
        description: `Given an integer array \`nums\` and an integer \`k\`, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, \`nums[i]\` and \`nums[j]\`, where \`i < j\`, the condition \`j - i <= k\` is satisfied.

A subsequence of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.`,
        difficulty: 'hard',
        category: 'deque',
        isPremium: true,
        functionName: 'constrained_subset_sum',
        examples: [
            { input: 'nums = [10,2,-10,5,20], k = 2', output: '37', explanation: '' },
            { input: 'nums = [-1,-2,-3], k = 1', output: '-1', explanation: '' },
        ],
        constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        testCases: [
            { input: { nums: [10, 2, -10, 5, 20], k: 2 }, expectedOutput: 37 },
            { input: { nums: [-1, -2, -3], k: 1 }, expectedOutput: -1 },
            { input: { nums: [10, -2, -10, -5, 20], k: 2 }, expectedOutput: 23 },
            { input: { nums: [5], k: 1 }, expectedOutput: 5, isHidden: true },
        ],
        starterCode: {
            python: `def constrained_subset_sum(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function constrainedSubsetSum(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Jump Game VI',
        description: `You are given a 0-indexed integer array \`nums\` and an integer \`k\`.

You are initially standing at index \`0\`. In one move, you can jump at most \`k\` steps forward without going outside the boundaries of the array. That is, you can jump from index \`i\` to any index in the range \`[i + 1, min(n - 1, i + k)]\` inclusive.

You want to reach the last index of the array (index \`n - 1\`). Your score is the sum of all \`nums[j]\` for each index \`j\` you visited in the array.

Return the maximum score you can get.`,
        difficulty: 'medium',
        category: 'deque',
        isPremium: true,
        functionName: 'max_result',
        examples: [
            { input: 'nums = [1,-1,-2,4,-7,3], k = 2', output: '7', explanation: 'You can choose your jumps forming the subsequence [1,-1,4,3] (underlined above). The sum is 7.' },
            { input: 'nums = [10,-5,-2,4,0,3], k = 3', output: '17', explanation: '' },
        ],
        constraints: ['1 <= nums.length, k <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        testCases: [
            { input: { nums: [1, -1, -2, 4, -7, 3], k: 2 }, expectedOutput: 7 },
            { input: { nums: [10, -5, -2, 4, 0, 3], k: 3 }, expectedOutput: 17 },
            { input: { nums: [1, -5, -20, 4, -1, 3, -6, -3], k: 2 }, expectedOutput: 0 },
            { input: { nums: [1], k: 1 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def max_result(nums: list[int], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function maxResult(nums, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int maxResult(int[] nums, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Dota2 Senate',
        description: `In the world of Dota2, there are two parties: the Radiant and the Dire.

The senate consists of senators coming from these two parties. Each senator can exercise one of the two rights:
- Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
- Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.

Given a string \`senate\` representing each senator's party belonging, return the party that will announce the victory and change the Dota2 game. The senator who is representing the Radiant party is \`'R'\` and the Dire party is \`'D'\` respectively.

The change of victory party rule is: rounds happen in order, from the first senator to the last senator in the given order, and repeats until a winner is determined.`,
        difficulty: 'medium',
        category: 'deque',
        isPremium: false,
        functionName: 'predict_party_victory',
        examples: [
            { input: 'senate = "RD"', output: '"Radiant"', explanation: '' },
            { input: 'senate = "RDD"', output: '"Dire"', explanation: '' },
        ],
        constraints: ['n == senate.length', '1 <= n <= 10^4', "senate[i] is either 'R' or 'D'."],
        testCases: [
            { input: { senate: 'RD' }, expectedOutput: 'Radiant' },
            { input: { senate: 'RDD' }, expectedOutput: 'Dire' },
            { input: { senate: 'R' }, expectedOutput: 'Radiant' },
            { input: { senate: 'DDRRR' }, expectedOutput: 'Dire', isHidden: true },
        ],
        starterCode: {
            python: `def predict_party_victory(senate: str) -> str:
    # Write your solution here
    pass`,
            javascript: `function predictPartyVictory(senate) {
    // Write your solution here
}`,
            java: `class Solution {
    public String predictPartyVictory(String senate) {
        // Write your solution here
        return "";
    }
}`
        }
    },
    {
        title: 'Sum of Subarray Minimums',
        description: `Given an array of integers \`arr\`, find the sum of \`min(b)\`, where \`b\` ranges over every (contiguous) subarray of \`arr\`. Since the answer may be large, return the answer modulo \`10^9 + 7\`.`,
        difficulty: 'medium',
        category: 'deque',
        isPremium: true,
        functionName: 'sum_subarray_mins',
        examples: [
            { input: 'arr = [3,1,2,4]', output: '17', explanation: 'Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1. Sum is 17.' },
            { input: 'arr = [11,81,94,43,3]', output: '444', explanation: '' },
        ],
        constraints: ['1 <= arr.length <= 3 * 10^4', '1 <= arr[i] <= 3 * 10^4'],
        testCases: [
            { input: { arr: [3, 1, 2, 4] }, expectedOutput: 17 },
            { input: { arr: [11, 81, 94, 43, 3] }, expectedOutput: 444 },
            { input: { arr: [1] }, expectedOutput: 1 },
            { input: { arr: [1, 1] }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def sum_subarray_mins(arr: list[int]) -> int:
    # Write your solution here
    pass`,
            javascript: `function sumSubarrayMins(arr) {
    // Write your solution here
}`,
            java: `class Solution {
    public int sumSubarrayMins(int[] arr) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Max Value of Equation',
        description: `You are given an array \`points\` containing the coordinates of points on a 2D plane, sorted by the x-values, where \`points[i] = [xi, yi]\` such that \`xi < xj\` for all \`1 <= i < j <= points.length\`. You are also given an integer \`k\`.

Return the maximum value of the equation \`yi + yj + |xi - xj|\` where \`|xi - xj| <= k\` and \`1 <= i < j <= points.length\`.

It is guaranteed that there exists at least one pair of points that satisfy the constraint \`|xi - xj| <= k\`.`,
        difficulty: 'hard',
        category: 'deque',
        isPremium: true,
        functionName: 'find_max_value_of_equation',
        examples: [
            { input: 'points = [[1,3],[2,0],[5,10],[6,-10]], k = 1', output: '4', explanation: 'Use points (1,3) and (2,0), the value is 3 + 0 + |1 - 2| = 4.' },
            { input: 'points = [[0,0],[3,0],[9,2]], k = 3', output: '3', explanation: '' },
        ],
        constraints: ['2 <= points.length <= 10^5', 'points[i].length == 2', '-10^8 <= xi, yi <= 10^8', '0 <= k <= 2 * 10^8'],
        testCases: [
            { input: { points: [[1, 3], [2, 0], [5, 10], [6, -10]], k: 1 }, expectedOutput: 4 },
            { input: { points: [[0, 0], [3, 0], [9, 2]], k: 3 }, expectedOutput: 3 },
            { input: { points: [[1, 1], [2, 2]], k: 1 }, expectedOutput: 4 },
            { input: { points: [[0, 0], [1, 5]], k: 1 }, expectedOutput: 6, isHidden: true },
        ],
        starterCode: {
            python: `def find_max_value_of_equation(points: list[list[int]], k: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function findMaxValueOfEquation(points, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findMaxValueOfEquation(int[][] points, int k) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit',
        description: `Given an array of integers \`nums\` and an integer \`limit\`, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to \`limit\`.`,
        difficulty: 'medium',
        category: 'deque',
        isPremium: false,
        functionName: 'longest_subarray',
        examples: [
            { input: 'nums = [8,2,4,7], limit = 4', output: '2', explanation: '' },
            { input: 'nums = [10,1,2,4,7,2], limit = 5', output: '4', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^9', '0 <= limit <= 10^9'],
        testCases: [
            { input: { nums: [8, 2, 4, 7], limit: 4 }, expectedOutput: 2 },
            { input: { nums: [10, 1, 2, 4, 7, 2], limit: 5 }, expectedOutput: 4 },
            { input: { nums: [4, 2, 2, 2, 4, 4, 2, 2], limit: 0 }, expectedOutput: 3 },
            { input: { nums: [1], limit: 0 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def longest_subarray(nums: list[int], limit: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function longestSubarray(nums, limit) {
    // Write your solution here
}`,
            java: `class Solution {
    public int longestSubarray(int[] nums, int limit) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'First Negative Number in Every Window of Size K',
        description: `Given an array \`arr\` of integers and a positive integer \`k\`, return an array of the first negative number for each window of size \`k\`. If a window does not contain a negative number, use \`0\` for that window.`,
        difficulty: 'easy',
        category: 'deque',
        isPremium: false,
        functionName: 'print_first_negatives',
        examples: [
            { input: 'arr = [12,-1,-7,8,-15,30,16,28], k = 3', output: '[-1,-1,-7,-15,-15,0]', explanation: '' },
            { input: 'arr = [-8,2,3,-6,10], k = 2', output: '[-8,0,-6,-6]', explanation: '' },
        ],
        constraints: ['1 <= k <= arr.length <= 10^5', '-10^5 <= arr[i] <= 10^5'],
        testCases: [
            { input: { arr: [12, -1, -7, 8, -15, 30, 16, 28], k: 3 }, expectedOutput: [-1, -1, -7, -15, -15, 0] },
            { input: { arr: [-8, 2, 3, -6, 10], k: 2 }, expectedOutput: [-8, 0, -6, -6] },
            { input: { arr: [1, 2, 3], k: 2 }, expectedOutput: [0, 0] },
            { input: { arr: [-1, -2, -3], k: 1 }, expectedOutput: [-1, -2, -3], isHidden: true },
        ],
        starterCode: {
            python: `def print_first_negatives(arr: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
            javascript: `function printFirstNegatives(arr, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[] printFirstNegatives(int[] arr, int k) {
        // Write your solution here
        return new int[]{};
    }
}`
        }
    },

    // BACKTRACKING
    {
        title: 'N-Queens II',
        description: `The n-queens puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return the number of distinct solutions to the n-queens puzzle.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'total_n_queens',
        examples: [
            { input: 'n = 4', output: '2', explanation: '' },
            { input: 'n = 1', output: '1', explanation: '' },
        ],
        constraints: ['1 <= n <= 9'],
        testCases: [
            { input: { n: 4 }, expectedOutput: 2 },
            { input: { n: 1 }, expectedOutput: 1 },
            { input: { n: 2 }, expectedOutput: 0 },
            { input: { n: 8 }, expectedOutput: 92, isHidden: true },
        ],
        starterCode: {
            python: `def total_n_queens(n: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function totalNQueens(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public int totalNQueens(int n) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Combinations',
        description: `Given two integers \`n\` and \`k\`, return all possible combinations of \`k\` numbers chosen from the range \`[1, n]\`.

Return the answer sorted in ascending order: each combination's numbers in ascending order, and the list of combinations in lexicographic order.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'combine',
        examples: [
            { input: 'n = 4, k = 2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', explanation: '' },
            { input: 'n = 1, k = 1', output: '[[1]]', explanation: '' },
        ],
        constraints: ['1 <= n <= 20', '1 <= k <= n'],
        testCases: [
            { input: { n: 4, k: 2 }, expectedOutput: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
            { input: { n: 1, k: 1 }, expectedOutput: [[1]] },
            { input: { n: 3, k: 3 }, expectedOutput: [[1, 2, 3]] },
            { input: { n: 3, k: 1 }, expectedOutput: [[1], [2], [3]], isHidden: true },
        ],
        starterCode: {
            python: `def combine(n: int, k: int) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function combine(n, k) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] combine(int n, int k) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Generate Parentheses',
        description: `Given \`n\` pairs of parentheses, generate all combinations of well-formed parentheses.

Return the result in lexicographic order (treating \`'('\` as less than \`')'\`).`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'generate_parenthesis',
        examples: [
            { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: '' },
            { input: 'n = 1', output: '["()"]', explanation: '' },
        ],
        constraints: ['0 <= n <= 8'],
        testCases: [
            { input: { n: 3 }, expectedOutput: ['((()))', '(()())', '(())()', '()(())', '()()()'] },
            { input: { n: 1 }, expectedOutput: ['()'] },
            { input: { n: 2 }, expectedOutput: ['(())', '()()'] },
            { input: { n: 0 }, expectedOutput: [''], isHidden: true },
        ],
        starterCode: {
            python: `def generate_parenthesis(n: int) -> list[str]:
    # Write your solution here
    pass`,
            javascript: `function generateParenthesis(n) {
    // Write your solution here
}`,
            java: `class Solution {
    public String[] generateParenthesis(int n) {
        // Write your solution here
        return new String[]{};
    }
}`
        }
    },
    {
        title: 'Permutations',
        description: `Given an array \`nums\` of distinct integers, return all the possible permutations, sorted in lexicographic order.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'permute',
        examples: [
            { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', explanation: '' },
            { input: 'nums = [0,1]', output: '[[0,1],[1,0]]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique.'],
        testCases: [
            { input: { nums: [1, 2, 3] }, expectedOutput: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
            { input: { nums: [0, 1] }, expectedOutput: [[0, 1], [1, 0]] },
            { input: { nums: [1] }, expectedOutput: [[1]] },
            { input: { nums: [1, 2] }, expectedOutput: [[1, 2], [2, 1]], isHidden: true },
        ],
        starterCode: {
            python: `def permute(nums: list[int]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function permute(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] permute(int[] nums) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Combination Sum',
        description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.

The same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

Return the answer sorted in ascending order: each combination's numbers in non-decreasing order, and the list of combinations in lexicographic order.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: true,
        functionName: 'combination_sum',
        examples: [
            { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]', explanation: '' },
            { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]', explanation: '' },
        ],
        constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements of candidates are distinct.', '1 <= target <= 40'],
        testCases: [
            { input: { candidates: [2, 3, 6, 7], target: 7 }, expectedOutput: [[2, 2, 3], [7]] },
            { input: { candidates: [2, 3, 5], target: 8 }, expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
            { input: { candidates: [2], target: 1 }, expectedOutput: [] },
            { input: { candidates: [2, 3, 5], target: 5 }, expectedOutput: [[2, 3], [5]], isHidden: true },
        ],
        starterCode: {
            python: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function combinationSum(candidates, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] combinationSum(int[] candidates, int target) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Restore IP Addresses',
        description: `A valid IP address consists of exactly four integers separated by single dots. Each integer is between \`0\` and \`255\` (inclusive) and cannot have leading zeros (except for \`0\` itself).

Given a string \`s\` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into \`s\`. You are not allowed to reorder or remove any digits in \`s\`.

Return the result sorted in ascending (lexicographic) order.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'restore_ip_addresses',
        examples: [
            { input: 's = "25525511135"', output: '["255.255.11.135","255.255.111.35"]', explanation: '' },
            { input: 's = "0000"', output: '["0.0.0.0"]', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 20', 's consists of digits only.'],
        testCases: [
            { input: { s: '25525511135' }, expectedOutput: ['255.255.11.135', '255.255.111.35'] },
            { input: { s: '0000' }, expectedOutput: ['0.0.0.0'] },
            { input: { s: '101023' }, expectedOutput: ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3'] },
            { input: { s: '1111' }, expectedOutput: ['1.1.1.1'], isHidden: true },
        ],
        starterCode: {
            python: `def restore_ip_addresses(s: str) -> list[str]:
    # Write your solution here
    pass`,
            javascript: `function restoreIpAddresses(s) {
    // Write your solution here
}`,
            java: `class Solution {
    public String[] restoreIpAddresses(String s) {
        // Write your solution here
        return new String[]{};
    }
}`
        }
    },
    {
        title: 'Letter Combinations of a Phone Number',
        description: `Given a string \`digits\` containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent, using the standard telephone keypad mapping (2="abc", 3="def", 4="ghi", 5="jkl", 6="mno", 7="pqrs", 8="tuv", 9="wxyz"). Return the answer in ascending (lexicographic) order.

Return an empty list if \`digits\` is empty.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'letter_combinations',
        examples: [
            { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: '' },
            { input: 'digits = ""', output: '[]', explanation: '' },
        ],
        constraints: ['0 <= digits.length <= 4', "digits[i] is a digit in the range ['2', '9']."],
        testCases: [
            { input: { digits: '23' }, expectedOutput: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] },
            { input: { digits: '' }, expectedOutput: [] },
            { input: { digits: '2' }, expectedOutput: ['a', 'b', 'c'] },
            { input: { digits: '9' }, expectedOutput: ['w', 'x', 'y', 'z'], isHidden: true },
        ],
        starterCode: {
            python: `def letter_combinations(digits: str) -> list[str]:
    # Write your solution here
    pass`,
            javascript: `function letterCombinations(digits) {
    // Write your solution here
}`,
            java: `class Solution {
    public String[] letterCombinations(String digits) {
        // Write your solution here
        return new String[]{};
    }
}`
        }
    },
    {
        title: 'Subsets II',
        description: `Given an integer array \`nums\` that may contain duplicates, return all possible subsets (the power set), with no duplicate subsets.

Return the answer sorted in ascending order: each subset's numbers in non-decreasing order, and the list of subsets in lexicographic order (the empty subset first).`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: false,
        functionName: 'subsets_with_dup',
        examples: [
            { input: 'nums = [1,2,2]', output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]', explanation: '' },
            { input: 'nums = [0]', output: '[[],[0]]', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
        testCases: [
            { input: { nums: [1, 2, 2] }, expectedOutput: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
            { input: { nums: [0] }, expectedOutput: [[], [0]] },
            { input: { nums: [1, 1] }, expectedOutput: [[], [1], [1, 1]] },
            { input: { nums: [1, 2] }, expectedOutput: [[], [1], [1, 2], [2]], isHidden: true },
        ],
        starterCode: {
            python: `def subsets_with_dup(nums: list[int]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function subsetsWithDup(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] subsetsWithDup(int[] nums) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Combination Sum II',
        description: `Given a collection of candidate numbers \`candidates\` (which may contain duplicates) and a target number \`target\`, return all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.

Each number in \`candidates\` may only be used once in each combination.

Return the answer sorted in ascending order: each combination's numbers in non-decreasing order, and the list of combinations in lexicographic order.`,
        difficulty: 'medium',
        category: 'backtracking',
        isPremium: true,
        functionName: 'combination_sum_unique',
        examples: [
            { input: 'candidates = [10,1,2,7,6,1,5], target = 8', output: '[[1,1,6],[1,2,5],[1,7],[2,6]]', explanation: '' },
            { input: 'candidates = [2,5,2,1,2], target = 5', output: '[[1,2,2],[5]]', explanation: '' },
        ],
        constraints: ['1 <= candidates.length <= 100', '1 <= candidates[i] <= 50', '1 <= target <= 30'],
        testCases: [
            { input: { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8 }, expectedOutput: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
            { input: { candidates: [2, 5, 2, 1, 2], target: 5 }, expectedOutput: [[1, 2, 2], [5]] },
            { input: { candidates: [1, 1], target: 1 }, expectedOutput: [[1]] },
            { input: { candidates: [1], target: 2 }, expectedOutput: [], isHidden: true },
        ],
        starterCode: {
            python: `def combination_sum_unique(candidates: list[int], target: int) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function combinationSumUnique(candidates, target) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] combinationSumUnique(int[] candidates, int target) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },

    // INTERVALS
    {
        title: 'Insert Interval',
        description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [starti, endi]\` represent the start and the end of the \`ith\` interval and \`intervals\` is sorted in ascending order by \`starti\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`starti\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return \`intervals\` after the insertion.`,
        difficulty: 'medium',
        category: 'intervals',
        isPremium: false,
        functionName: 'insert',
        examples: [
            { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]', explanation: '' },
            { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', explanation: '' },
        ],
        constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= starti <= endi <= 10^5', 'intervals is sorted by starti in ascending order.', 'newInterval.length == 2', '0 <= start <= end <= 10^5'],
        testCases: [
            { input: { intervals: [[1, 3], [6, 9]], newInterval: [2, 5] }, expectedOutput: [[1, 5], [6, 9]] },
            { input: { intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval: [4, 8] }, expectedOutput: [[1, 2], [3, 10], [12, 16]] },
            { input: { intervals: [], newInterval: [5, 7] }, expectedOutput: [[5, 7]] },
            { input: { intervals: [[1, 5]], newInterval: [6, 8] }, expectedOutput: [[1, 5], [6, 8]], isHidden: true },
        ],
        starterCode: {
            python: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function insert(intervals, newInterval) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Interval List Intersections',
        description: `You are given two lists of closed intervals, \`firstList\` and \`secondList\`, where \`firstList[i] = [starti, endi]\` and \`secondList[j] = [startj, endj]\`. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval \`[a, b]\` (with \`a <= b\`) denotes the set of real numbers \`x\` with \`a <= x <= b\`.

The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of \`[1, 3]\` and \`[2, 4]\` is \`[2, 3]\`.`,
        difficulty: 'medium',
        category: 'intervals',
        isPremium: false,
        functionName: 'interval_intersection',
        examples: [
            { input: 'firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]', output: '[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]', explanation: '' },
            { input: 'firstList = [[1,3],[5,9]], secondList = []', output: '[]', explanation: '' },
        ],
        constraints: ['0 <= firstList.length, secondList.length <= 1000', 'firstList.length + secondList.length >= 1', '0 <= starti < endi <= 10^9', 'endi < starti+1', '0 <= startj < endj <= 10^9', 'endj < startj+1'],
        testCases: [
            { input: { firstList: [[0, 2], [5, 10], [13, 23], [24, 25]], secondList: [[1, 5], [8, 12], [15, 24], [25, 26]] }, expectedOutput: [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]] },
            { input: { firstList: [[1, 3], [5, 9]], secondList: [] }, expectedOutput: [] },
            { input: { firstList: [], secondList: [[4, 8]] }, expectedOutput: [] },
            { input: { firstList: [[1, 7]], secondList: [[3, 10]] }, expectedOutput: [[3, 7]], isHidden: true },
        ],
        starterCode: {
            python: `def interval_intersection(firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
            javascript: `function intervalIntersection(firstList, secondList) {
    // Write your solution here
}`,
            java: `class Solution {
    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'My Calendar I',
        description: `You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.

A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events).

The event can be represented as a pair of integers \`start\` and \`end\` that represents a booking on the half-open interval \`[start, end)\`, the range of real numbers \`x\` such that \`start <= x < end\`.

Implement the \`MyCalendar\` class:
- \`MyCalendar()\` Initializes the calendar object.
- \`boolean book(int start, int end)\` Returns \`true\` if the event can be added to the calendar successfully without causing a double booking. Otherwise, return \`false\` and do not add the event to the calendar.`,
        difficulty: 'medium',
        category: 'intervals',
        isPremium: true,
        functionName: 'MyCalendar',
        executionType: 'multi-call',
        examples: [
            { input: '["MyCalendar","book","book","book"]\n[[],[10,20],[15,25],[20,30]]', output: '[null,true,false,true]', explanation: '' },
        ],
        constraints: ['0 <= start < end <= 10^9', 'At most 1000 calls will be made to book.'],
        testCases: [
            {
                input: {
                    operations: ['MyCalendar', 'book', 'book', 'book'],
                    args: [[], [10, 20], [15, 25], [20, 30]]
                },
                expectedOutput: [null, true, false, true]
            },
        ],
        starterCode: {
            python: `class MyCalendar:
    def __init__(self):
        # Write your solution here
        pass

    def book(self, start: int, end: int) -> bool:
        # Write your solution here
        pass`,
            javascript: `class MyCalendar {
    constructor() {
        // Write your solution here
    }

    book(start, end) {
        // Write your solution here
    }
}`,
            java: `class MyCalendar {
    public MyCalendar() {
        // Write your solution here
    }

    public boolean book(int start, int end) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Car Pooling',
        description: `There is a car with \`capacity\` empty seats. The vehicle only drives east.

You are given the integer \`capacity\` and an array \`trips\` where \`trips[i] = [numPassengersi, fromi, toi]\` indicates that the \`ith\` trip has \`numPassengersi\` passengers and the locations to pick them up and drop them off are \`fromi\` and \`toi\` respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return \`true\` if it is possible to pick up and drop off all passengers for all the given trips, or \`false\` otherwise.`,
        difficulty: 'medium',
        category: 'intervals',
        isPremium: false,
        functionName: 'car_pooling',
        examples: [
            { input: 'trips = [[2,1,5],[3,3,7]], capacity = 4', output: 'false', explanation: '' },
            { input: 'trips = [[2,1,5],[3,3,7]], capacity = 5', output: 'true', explanation: '' },
        ],
        constraints: ['1 <= trips.length <= 1000', 'trips[i].length == 3', '1 <= numPassengersi <= 100', '0 <= fromi < toi <= 1000', '1 <= capacity <= 10^5'],
        testCases: [
            { input: { trips: [[2, 1, 5], [3, 3, 7]], capacity: 4 }, expectedOutput: false },
            { input: { trips: [[2, 1, 5], [3, 3, 7]], capacity: 5 }, expectedOutput: true },
            { input: { trips: [[2, 1, 5]], capacity: 2 }, expectedOutput: true },
            { input: { trips: [[3, 2, 7], [3, 7, 9], [8, 3, 9]], capacity: 11 }, expectedOutput: true, isHidden: true },
        ],
        starterCode: {
            python: `def car_pooling(trips: list[list[int]], capacity: int) -> bool:
    # Write your solution here
    pass`,
            javascript: `function carPooling(trips, capacity) {
    // Write your solution here
}`,
            java: `class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        // Write your solution here
        return false;
    }
}`
        }
    },
    {
        title: 'Range Module',
        description: `A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals and query about them.

A half-open interval \`[left, right)\` denotes all the real numbers \`x\` where \`left <= x < right\`.

Implement the \`RangeModule\` class:
- \`RangeModule()\` Initializes the object of the data structure.
- \`void addRange(int left, int right)\` Adds the half-open interval \`[left, right)\`, tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval \`[left, right)\` that are not already tracked.
- \`boolean queryRange(int left, int right)\` Returns \`true\` if every real number in the interval \`[left, right)\` is currently being tracked, and \`false\` otherwise.
- \`void removeRange(int left, int right)\` Stops tracking every real number currently being tracked in the half-open interval \`[left, right)\`.`,
        difficulty: 'hard',
        category: 'intervals',
        isPremium: true,
        functionName: 'RangeModule',
        executionType: 'multi-call',
        examples: [
            { input: '["RangeModule","addRange","removeRange","queryRange","queryRange","queryRange"]\n[[],[10,20],[14,16],[10,14],[13,15],[16,17]]', output: '[null,null,null,true,false,true]', explanation: '' },
        ],
        constraints: ['1 <= left < right <= 10^9', 'At most 10^4 calls will be made to addRange, queryRange, and removeRange.'],
        testCases: [
            {
                input: {
                    operations: ['RangeModule', 'addRange', 'removeRange', 'queryRange', 'queryRange', 'queryRange'],
                    args: [[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
                },
                expectedOutput: [null, null, null, true, false, true]
            },
        ],
        starterCode: {
            python: `class RangeModule:
    def __init__(self):
        # Write your solution here
        pass

    def add_range(self, left: int, right: int) -> None:
        # Write your solution here
        pass

    def query_range(self, left: int, right: int) -> bool:
        # Write your solution here
        pass

    def remove_range(self, left: int, right: int) -> None:
        # Write your solution here
        pass`,
            javascript: `class RangeModule {
    constructor() {
        // Write your solution here
    }

    addRange(left, right) {
        // Write your solution here
    }

    queryRange(left, right) {
        // Write your solution here
    }

    removeRange(left, right) {
        // Write your solution here
    }
}`,
            java: `class RangeModule {
    public RangeModule() {
        // Write your solution here
    }

    public void addRange(int left, int right) {
        // Write your solution here
    }

    public boolean queryRange(int left, int right) {
        // Write your solution here
        return false;
    }

    public void removeRange(int left, int right) {
        // Write your solution here
    }
}`
        }
    },
    {
        title: 'Summary Ranges',
        description: `You are given a sorted unique integer array \`nums\`.

A range \`[a,b]\` is the set of all integers from \`a\` to \`b\` (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of \`nums\` is covered by exactly one of the ranges, and there is no integer \`x\` such that \`x\` is in one of the ranges but not in \`nums\`.

Each range \`[a,b]\` in the list should be output as:
- \`"a->b"\` if \`a != b\`
- \`"a"\` if \`a == b\``,
        difficulty: 'easy',
        category: 'intervals',
        isPremium: false,
        functionName: 'summary_ranges',
        examples: [
            { input: 'nums = [0,1,2,4,5,7]', output: '["0->2","4->5","7"]', explanation: '' },
            { input: 'nums = [0,2,3,4,6,8,9]', output: '["0","2->4","6","8->9"]', explanation: '' },
        ],
        constraints: ['0 <= nums.length <= 20', '-2^31 <= nums[i] <= 2^31 - 1', 'All the values of nums are unique.', 'nums is sorted in ascending order.'],
        testCases: [
            { input: { nums: [0, 1, 2, 4, 5, 7] }, expectedOutput: ['0->2', '4->5', '7'] },
            { input: { nums: [0, 2, 3, 4, 6, 8, 9] }, expectedOutput: ['0', '2->4', '6', '8->9'] },
            { input: { nums: [] }, expectedOutput: [] },
            { input: { nums: [1] }, expectedOutput: ['1'], isHidden: true },
        ],
        starterCode: {
            python: `def summary_ranges(nums: list[int]) -> list[str]:
    # Write your solution here
    pass`,
            javascript: `function summaryRanges(nums) {
    // Write your solution here
}`,
            java: `class Solution {
    public String[] summaryRanges(int[] nums) {
        // Write your solution here
        return new String[]{};
    }
}`
        }
    },
    {
        title: 'Data Stream as Disjoint Intervals',
        description: `Given a data stream input of non-negative integers \`a1, a2, ..., an\`, summarize the numbers seen so far as a list of disjoint intervals.

Implement the \`SummaryRanges\` class:
- \`SummaryRanges()\` Initializes the object with an empty stream.
- \`void addNum(int value)\` Adds the integer \`value\` to the stream.
- \`int[][] getIntervals()\` Returns a summary of the integers in the stream currently as a sorted list of disjoint intervals \`[starti, endi]\`.`,
        difficulty: 'hard',
        category: 'intervals',
        isPremium: true,
        functionName: 'SummaryRanges',
        executionType: 'multi-call',
        examples: [
            { input: '["SummaryRanges","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals"]\n[[],[1],[],[3],[],[7],[],[2],[],[6],[]]', output: '[null,null,[[1,1]],null,[[1,1],[3,3]],null,[[1,1],[3,3],[7,7]],null,[[1,3],[7,7]],null,[[1,3],[6,7]]]', explanation: '' },
        ],
        constraints: ['0 <= value <= 10^4', 'At most 3 * 10^4 calls will be made to addNum and getIntervals.'],
        testCases: [
            {
                input: {
                    operations: ['SummaryRanges', 'addNum', 'getIntervals', 'addNum', 'getIntervals', 'addNum', 'getIntervals', 'addNum', 'getIntervals', 'addNum', 'getIntervals'],
                    args: [[], [1], [], [3], [], [7], [], [2], [], [6], []]
                },
                expectedOutput: [null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]
            },
        ],
        starterCode: {
            python: `class SummaryRanges:
    def __init__(self):
        # Write your solution here
        pass

    def add_num(self, value: int) -> None:
        # Write your solution here
        pass

    def get_intervals(self) -> list[list[int]]:
        # Write your solution here
        pass`,
            javascript: `class SummaryRanges {
    constructor() {
        // Write your solution here
    }

    addNum(value) {
        // Write your solution here
    }

    getIntervals() {
        // Write your solution here
    }
}`,
            java: `class SummaryRanges {
    public SummaryRanges() {
        // Write your solution here
    }

    public void addNum(int value) {
        // Write your solution here
    }

    public int[][] getIntervals() {
        // Write your solution here
        return new int[][]{};
    }
}`
        }
    },
    {
        title: 'Teemo Attacking',
        description: `Our hero Teemo is attacking an enemy Ashe with poison attacks! When Teemo attacks Ashe, Ashe gets poisoned for exactly \`duration\` seconds. More formally, an attack at second \`t\` will mean Ashe is poisoned during the time period \`[t, t + duration - 1]\` (inclusive). If Teemo attacks again before the poison effect ends, the timer resets, and the poison effect will end \`duration\` seconds after the new attack.

You are given a non-decreasing integer array \`timeSeries\`, where \`timeSeries[i]\` denotes that Teemo attacks Ashe at second \`timeSeries[i]\`, and an integer \`duration\`.

Return the total number of seconds that Ashe is poisoned.`,
        difficulty: 'easy',
        category: 'intervals',
        isPremium: false,
        functionName: 'find_poisoned_duration',
        examples: [
            { input: 'timeSeries = [1,4], duration = 2', output: '4', explanation: 'At second 1, Ashe gets poisoned in the range [1,2]. At second 4, Ashe gets poisoned in the range [4,5]. So the total number of seconds is 4.' },
            { input: 'timeSeries = [1,2], duration = 2', output: '3', explanation: '' },
        ],
        constraints: ['1 <= timeSeries.length <= 10^4', '0 <= timeSeries[i], duration <= 10^7', 'timeSeries is sorted in non-decreasing order.'],
        testCases: [
            { input: { timeSeries: [1, 4], duration: 2 }, expectedOutput: 4 },
            { input: { timeSeries: [1, 2], duration: 2 }, expectedOutput: 3 },
            { input: { timeSeries: [1], duration: 5 }, expectedOutput: 5 },
            { input: { timeSeries: [1, 2, 3], duration: 1 }, expectedOutput: 3, isHidden: true },
        ],
        starterCode: {
            python: `def find_poisoned_duration(timeSeries: list[int], duration: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function findPoisonedDuration(timeSeries, duration) {
    // Write your solution here
}`,
            java: `class Solution {
    public int findPoisonedDuration(int[] timeSeries, int duration) {
        // Write your solution here
        return 0;
    }
}`
        }
    },
    {
        title: 'Video Stitching',
        description: `You are given a series of video clips from a sporting event that lasted \`time\` seconds. These video clips can be overlapping with each other and have varying lengths.

Each video clip is described by an array \`clips\` where \`clips[i] = [starti, endi]\` indicates that the ith clip started at \`starti\` and ended at \`endi\`.

We can cut these clips into segments freely.
- For example, a clip \`[0, 7]\` can be cut into segments \`[0, 1] + [1, 3] + [3, 7]\`.

Return the minimum number of clips needed so that we can cut the clips into segments that cover the entire sporting event \`[0, time]\`. If the task is impossible, return \`-1\`.`,
        difficulty: 'medium',
        category: 'intervals',
        isPremium: false,
        functionName: 'video_stitching',
        examples: [
            { input: 'clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10', output: '3', explanation: 'We take the clips [0,2], [8,10], [1,9]; a total of 3 clips.' },
            { input: 'clips = [[0,1],[1,2]], time = 5', output: '-1', explanation: '' },
        ],
        constraints: ['1 <= clips.length <= 100', '0 <= starti <= endi <= 100', '1 <= time <= 100'],
        testCases: [
            { input: { clips: [[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], time: 10 }, expectedOutput: 3 },
            { input: { clips: [[0, 1], [1, 2]], time: 5 }, expectedOutput: -1 },
            { input: { clips: [[0, 4], [2, 8]], time: 5 }, expectedOutput: 2 },
            { input: { clips: [[0, 4]], time: 4 }, expectedOutput: 1, isHidden: true },
        ],
        starterCode: {
            python: `def video_stitching(clips: list[list[int]], time: int) -> int:
    # Write your solution here
    pass`,
            javascript: `function videoStitching(clips, time) {
    // Write your solution here
}`,
            java: `class Solution {
    public int videoStitching(int[][] clips, int time) {
        // Write your solution here
        return -1;
    }
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

// Guard against the destructive seed() running as a side effect of other
// scripts simply `import`ing `problems` from this file (e.g. addProblems.ts)
// — only run it when this file is executed directly (`npm run seed`).
if (import.meta.url === `file://${process.argv[1]}`) {
    seed().catch(console.error);
}