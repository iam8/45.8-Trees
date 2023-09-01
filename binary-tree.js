
/** BinaryTreeNode: node for a binary tree. */
class BinaryTreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


class BinaryTree {
    constructor(root = null) {
        this.root = root;
    }

    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */
    minDepth() {

        // Empty tree
        if (!this.root) return 0;

        const minDepthRecursive = (startNode) => {

            // Base case: tree has one node (it is a leaf node)
            if (!startNode.left && !startNode.right) return 1;

            // Recursive case: tree has both children
            if (startNode.left && startNode.right) {
                const leftResult = minDepthRecursive(startNode.left) + 1;
                const rightResult = minDepthRecursive(startNode.right) + 1;

                // Determine minimum
                return (leftResult < rightResult) ? leftResult : rightResult;
            }

            // Recursive case: only one child
            const onlyChild = (startNode.left) ? startNode.left : startNode.right;
            return minDepthRecursive(onlyChild) + 1;
        }

        return minDepthRecursive(this.root);
    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */
    maxDepth() {
        if (!this.root) return 0;

        const maxDepthRecursive = (startNode) => {

            if (!startNode.left && !startNode.right) return 1;

            if (startNode.left && startNode.right) {
                const leftResult = maxDepthRecursive(startNode.left) + 1;
                const rightResult = maxDepthRecursive(startNode.right) + 1;

                // Determine maximum
                return (leftResult > rightResult) ? leftResult : rightResult;
            }

            const onlyChild = (startNode.left) ? startNode.left : startNode.right;
            return maxDepthRecursive(onlyChild) + 1;
        }

        return maxDepthRecursive(this.root);
    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */
    maxSum() {
        let maxSum = 0;

        const maxSumRecursive = (startNode) => {
            if (!startNode) return 0;

            const leftMaxSum = maxSumRecursive(startNode.left);
            const rightMaxSum = maxSumRecursive(startNode.right);

            maxSum = Math.max(maxSum, leftMaxSum + rightMaxSum + startNode.val);
            return Math.max(leftMaxSum + startNode.val, rightMaxSum + startNode.val);
        }

        maxSumRecursive(this.root);
        return maxSum;
    }

    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */
    nextLarger(lowerBound) {
        if (!this.root) return null;

        let nextLarger = null;

        const nextLargerRecursive = (startNode) => {

            // Check value of current node
            if (startNode.val > lowerBound) {
                if (nextLarger === null || startNode.val < nextLarger) {
                    nextLarger = startNode.val;
                }
            }

            // Recurse on children
            if (startNode.left) nextLargerRecursive(startNode.left);
            if (startNode.right) nextLargerRecursive(startNode.right);

            return;
        }

        nextLargerRecursive(this.root);
        return nextLarger;
    }
}

module.exports = { BinaryTree, BinaryTreeNode };
