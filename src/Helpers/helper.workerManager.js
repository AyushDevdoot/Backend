const Worker = require('worker');
const path = require('path');

//singleton design pattern

class WorkerManager {
	static instance;

	constructor(poolSize) {

		this.workers = [];
		if (!WorkerManager.instance){
			this.poolSize = poolSize;
			for (let i=0;i<this.poolSize;i++){
				const worker = new Worker(path.resolve(__dirname, 'generateTimeSlots.js'));
				this.workers.push(worker);
			}

			WorkerManager.instance = this;
		}
		return WorkerManager.instance;

	}

	assignTask(task){
		if (this)


	}

}
