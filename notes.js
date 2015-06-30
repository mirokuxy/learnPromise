var Promise = require('bluebird');

var promise = new Promise(function(resolve,reject){
	if(false){
		resolve('It worked');
	}
	else{
		reject(Error('It broke'));
	}
});

function get(url){
	return new Promise(function(resolve, reject){ /* ... */ });
}

get('story.json').then(JSON.parse).then(function(response){
	console.log('JSON\n',response);
});

function getJSON(url){
	return get(url).then(JSON.parse).catch(function(err){
		console.log('getJSON failed for', url, err);
		throw err;
	});
}

var promise = new Promise(function(resolve, reject){
	resolve(1);
});

promise.then(function(val){
	console.log(val);
	return val + 2;
}).then(function(val){
	console.log(val);
});

storyPromise = storyPromise || getJSON('story.json');


return story.chapterUrls.reduce(function(sequence, chapterUrl){
	return sequence.then(function(){
		return getJSON(chapterUrl);
	}).then(function(chapter){
		console.log(chapter);
	});
}, Promise.resolve());

return Promise.all(
	story.chapterUrls.map(getJSON)
).then(function(chapters){
	chapters.forEach(function(chapter){
		console.log(chapter);
	});
});

return story.chapterUrls.map(getJSON)
		.reduce(function(sequence, chapterPromise){
			return sequence.then(function(){
				return chapterPromise;
			}).then(function(chapter){
				console.log(chapter);
			});
		}, Promise.resolve() );