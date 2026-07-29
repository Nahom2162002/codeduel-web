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