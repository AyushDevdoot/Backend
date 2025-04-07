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
		let val = this.end.val;
		this.end = this.end.prev;
		this.end.next = null;
		return val;

	}

	/**
		* Remove from the Front O(1)
		* @returns {Object|number|string|boolean}
		*/

	popleft(){
		let val = this.root.val
		this.root = this.root.next
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
		return this.start.val;
	}

	toString(){
		let tmp = this.root
		let str = ''
		while (tmp){
			str+=tmp.val+' ,'
			tmp = tmp.next;
		}
		return `[ ${str} ]`

	}

}


module.exports = Dequeue;
