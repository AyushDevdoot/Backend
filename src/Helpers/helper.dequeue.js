const Node = require('./helpers.node'); 


/**
 *Reprensts a double ended arr
 *@class
 */


class Dequeue{
	/**
		* Create a Dequeue
		* @param {object} arr 
		*/
	constructor(arr){
		/** @private*/
		if (typeof arr != 'object'){
			throw "Expected an array Object";
		}
		this.root = null
		this.end = this.root
		let temp = null;
		for (let idx of arr){
			let point = new Node(idx)
			if (!this.root){
				this.root = point;
				this.end = point;

			}else{
				this.end.next = point;
				point.prev = this.end;
				this.end = point;
			}
		}
	}
	/**
		* Add value to the back of object [arr]
		* @param {string|Object|number} val
		*/

	push(val){
		let tmp = new Node(val);
		this.end.next = tmp;
		tmp.prev = this.end
		this.end = tmp;
	}

	/**
		* Remove from the End O(1)
		* @returns {Object|number|string|boolean}
		*/

	pop(){
		if (this.root == null){
			return 
		}
		let val = this.end.val;
		this.end = this.end.prev;
		if (this.root == null){
			return val;
		}
		this.end.next = null;
		return val;

	}

	/**
		* Remove from the Front O(1)
		* @returns {Object|number|string|boolean}
		*/

	popleft(){
		if (this.root == null){
			return
		}
		let val = this.root.val;
		this.root = this.root.next;
		if (this.root == null){
			return val;
		}
		this.root.prev = null;
		return val;
	}

	/**
		* Remove from the Front O(1)
		* @returns {Object|number|string|boolean}
		*/

	peek(){
		return this.end.val;
	}

	/**
		* Remove from the Front O(1)
		* @returns {Object|number|string|boolean}
		*/
	peekleft(){
		return this.root.val;
	}

	valueOf(){
		return this.root == null? false : true;
	}

	toString(){
		let tmp = this.root
		if (tmp == null){
			return '[]';
		}
		let str = `${tmp.val}`
		tmp = tmp.next;
		while (tmp){
			str+=', '+tmp.val
			tmp = tmp.next;
		}
		return `[ ${str} ]`

	}

}

module.exports = Dequeue;
