/**
 * @flupkejs/yallist — yallist
 * @see https://www.npmjs.com/package/yallist
 */
class Node {
  constructor(v, p, n) {
    this.value = v;
    this.prev = p || null;
    this.next = n || null;
  }
}
class Yallist {
  constructor(arr) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (arr) for (const v of arr) this.push(v);
  }
  push(v) {
    const n = new Node(v, this.tail, null);
    if (this.tail) this.tail.next = n;
    else this.head = n;
    this.tail = n;
    this.length++;
    return this.length;
  }
  pop() {
    if (!this.tail) return;
    const v = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    this.length--;
    return v;
  }
  shift() {
    if (!this.head) return;
    const v = this.head.value;
    this.head = this.head.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.length--;
    return v;
  }
  unshift(v) {
    const n = new Node(v, null, this.head);
    if (this.head) this.head.prev = n;
    else this.tail = n;
    this.head = n;
    this.length++;
    return this.length;
  }
  forEach(fn) {
    let n = this.head;
    let i = 0;
    while (n) {
      fn(n.value, i++);
      n = n.next;
    }
  }
  toArray() {
    const a = [];
    for (const v of this) a.push(v);
    return a;
  }
  *[Symbol.iterator]() {
    let n = this.head;
    while (n) { yield n.value; n = n.next; }
  }
}
module.exports = Yallist;
