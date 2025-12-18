---
title: Slow and Fast Pointer in LinkedList
tags: Algorithms  Java
lang: en
---

**Slow pointer and fast pointer** are simply the names given to two pointer variables.
## **Slow Pointer**
Travels the linked list one node at a time

## **Fast Pointer**
Travels the linked list two nodes at a time.

## Most Use Cases
1. getting middle element of linked list in one pass.
1. whether loop is present in Linked list. etc

## Example
Getting middle element of linked list in one pass, lets see how:
![](https://1.bp.blogspot.com/-BYaZ6jhttf8/WZA3j_f-ZtI/AAAAAAAACD8/cY6RO6cYn9ojZtawiteI-r_ztdtfHgESgCLcBGAs/s1600/middle-element-of-linked-list-algorithm-approach2.png)
1. Take 2 pointers, fastPointer and slowPointer and initialise both to list head.
1. Iterate through list and move slowPointer 1 node at a time and fastPointer 2 nodes at a time.
1. When fastPointer reaches end of list, slowPointer will be pointing to middle element of list.

```
public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
```



**Reference**

*http://javabypatel.blogspot.com/2016/10/find-middle-element-of-linked-list.html*
*https://leetcode.com/problems/middle-of-the-linked-list/solution/*