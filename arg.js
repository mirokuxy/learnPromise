var Promise = require('bluebird');

/*
function ya(a,b){
	return new Promise(function(resolve,reject){
		resolve([a,b]);
	});
}

ya(1,2).then(function(arg){
	console.log(arg);
});


Promise.resolve([1,2,3]).spread(function(a,b,c){
	console.log(a , b , c);
})

ya(1,2).spread(function(arg1,arg2){
	console.log(arg1,arg2);
})
*/

function hah(){
	return new Promise(function(resolve, reject){
		(function yo(){
			resolve(1);
		}) ();
		reject(2);
		resolve(3);
		return ;
		console.log('yoyp');
	});
}

function yoy(){
	return new Promise(function(resolve, reject){
		
		Promise.resolve()
		.then(function(){
			resolve(1);
			return;
		})
		.then(function(){
			console.log(2);
		})

		//resolve(2);
	})
}

yoy()
.then(function(val){
	console.log(val);
}, function(val){
	console.log(val);
})
.then(function(){
	return Promise.reject();
});
