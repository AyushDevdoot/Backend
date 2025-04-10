const Dequeue = require('../src/Helpers/helper.dequeue');






test('dequeue from 0 to 100', () => {

	let arr = [];
	for (let i = 0; i<1000; i++){
		arr.push(i)
	}
	let dq = new Dequeue(arr);
	let array = [];
	let length = 0
	while (dq.valueOf()){
		length+=1;
		let popped = dq.popleft();
		if (0 <= popped){
			array.push(popped);
		}
	} 
	expect(array.length).toBe(1000);

});

test('arr ->',()=>{
	let arr = [];
	for (let i=0;i<1000;i++){
		arr.push(i)
	}
	let n = [];
	while (arr.length){
		let a = arr.shift()
		if (0 <= a){
			n.push(a);
		}

	}

	expect(n.length).toBe(1000);
});
