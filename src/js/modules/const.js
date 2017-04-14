

const variable = {
	appVersion:'0.1',
	author:'ruanjq',
	since:'2017-04-13',
	serviceUrl: function(){
		if(process.env === 'dev'){
			return "http://localhost:8891/src/json/";
		}else{
			return "";
		}
	}
}

export { variable }