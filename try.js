var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

/*
var promise = new Promise(function(resolve,reject){
	if(false){
		resolve('It worked');
	}
	else{
		reject(Error('It broke'));
	}
});

promise.then(function(result){
	console.log(result);
}, function(err){
	console.error(err);
});
*/

/*
function get(url){
	return new Promise(function(resolve, reject){
		fs.readFile(url, 'utf8', function(err, file){
			if(err){
				reject(err);
			}
			else{
				resolve(file.toString());
			}
		})
	});
}
*/

function get(url){
	return fs.readFileAsync(url, 'utf8');
}


/*
get('story.json').then(function(response){
	//console.log('Success!\n', response);
	return JSON.parse(response);
}).then(function(response){
	console.log('JSON\n',response);
}, function(err){
	console.error('Failed!', err);
});
*/

/*
get('story.json').then(JSON.parse).then(function(response){
	console.log('JSON\n',response);
}, function(err){
	console.error('Failed!', err);
});
*/

/*
function getJSON(url){
	return get(url).then(JSON.parse);
}
*/

function getJSON(url){
	return get(url).then(JSON.parse).catch(function(err){
		console.log('getJSON failed for', url, err);
		throw err;
	});
}


/*
getJSON('story.json').then(function(response){
	console.log('JSON\n',response);
}, function(err){
	console.error('Failed!', err);
});
*/

// ------------

/*
var promise = new Promise(function(resolve, reject){
	resolve(1);
});

promise.then(function(val){
	console.log(val);
	return val + 2;
}).then(function(val){
	console.log(val);
});
*/

/*
getJSON('story.json').then(function(story){
	return getJSON(story.chapterUrls[0]);
}).then(function(chapter1){
	console.log('Got chapter 1 : ', chapter1);
}, function(err){
	console.error('Failed: ', err);
});
*/

/*
var storyPromise = null;

function getChapter(i){
	storyPromise = storyPromise || getJSON('story.json');

	return storyPromise.then(function(story){
		return getJSON(story.chapterUrls[i]);
	});
}

getChapter(0).then(function(chapter){
	console.log(chapter);
	return getChapter(1);
}).then(function(chapter){
	console.log(chapter);
}).catch(function(err){
	console.error('Failed!', err);
});
*/

/*
var jsonPromise = new Promise(function(resolve, reject){
	resolve(JSON.parse('This ain"t JSON'));
});

jsonPromise.then(function(data){
	console.log('It worked!',data);
}).catch(function(err){
	console.log('It failed!', err);
})
*/

/*
get('try.js').then(JSON.parse).then(function(data){
	console.log('It worked!', data);
}).catch(function(err){
	console.error('It failed!', err);
});
*/

/*
getJSON('story.json').then(function(story){
	return getJSON(story.chapterUrls[0]);
}).then(function(ch1){
	console.log(ch1);
}).catch(function(){
	console.log('Failed');
}).then(function(){
	console.log('End');
});
*/

getJSON('story.json').then(function(story){
	console.log(story.heading);

	// get chapters
	/*
	var sequence = Promise.resolve();
	story.chapterUrls.forEach(function(chapterUrl){
		sequence = sequence.then(function(){
			return getJSON(chapterUrl);
		}).then(function(chapter){
			console.log(chapter);
		});
	});
	*/

	/*
	return story.chapterUrls.reduce(function(sequence, chapterUrl){
		return sequence.then(function(){
			return getJSON(chapterUrl);
		}).then(function(chapter){
			console.log(chapter);
		});
	}, Promise.resolve());
	*/

	/*
	return Promise.all(
		story.chapterUrls.map(getJSON)
	).then(function(chapters){
		chapters.forEach(function(chapter){
			console.log(chapter);
		});
	});
	*/

	return story.chapterUrls.map(getJSON)
		.reduce(function(sequence, chapterPromise){
			return sequence.then(function(){
				return chapterPromise;
			}).then(function(chapter){
				console.log(chapter);
			});
		}, Promise.resolve() );

}).then(function(){
	console.log('All done!');
}).catch(function(err){
	console.log('Failed: ', err.message);
}).then(function(){
	console.log('Done');
});





