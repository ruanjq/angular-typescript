
export class Variable {
	

	appVersion:'0.1';
	author:'ruanjq';
	since:'2017-04-13';
	serviceUrl () {
		if(process.env === 'dev'){
			return "http://localhost:8891/src/json/";
		}else{
			return "http://www.windhome.win/src/json/";
		}
	}

	constructor() {
		// code
	}
}

