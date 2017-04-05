var request = require('request'),
	base64topjpg = require('base64-to-jpg'),
	fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


var options = {
  headers: {
    "Referer" : "https://vivaldi.dspl.ru/ca0000001/view",
	"Accept" : "*/*",
	"Accept-Encoding": "gzip, deflate, sdch, br",
	"Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4",
	"Cache-Control": "no-cache",
	"Connection": "keep-alive",
	"Host": "vivaldi.dspl.ru",
	"Pragma": "no-cache",
	"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
	"X-Requested-With": "XMLHttpRequest",
	"X-Viva-Client": "Web/1.0",
	"Cookie": "_ym_uid=1491308912476978366; _ym_isad=2; wctx_autosignin=wctx=aHR0cDovL3ZpdmFsZGkuZHNwbC5ydS91c2VyL2F1dG9zaWduaW4=&keepCookie=True; ASP.NET_SessionId=qzdrstyh5xdj0xenebwxflrh"
  }
};

 
var book = 'ca0000001',
	end = 5,
	cur = 1,
	out = {},
	callback = function(error, response, body) {
	  if (!error && response.statusCode == 200) {
		// var info = JSON.parse(body);
			// out[cur++] = body;
			base64topjpg(body, cur + '.jpg')
				.then(function(path){
					//console.log('success !!');
				})
				.catch(function(err){
					console.error(err);
				});
			cur++
			if (cur < end) {
				getNext();
			} else {
				console.log('Done: ', cur);
				// fs.writeFileSync(book + '.css', JSON.stringify(out, null, 2));
			}
	  }
	}

function getNext() {
	var src = 'https://vivaldi.dspl.ru/' + book + '/page/' + cur + '/image/36/base64?_=1491310330952';
	console.log('File ' + cur + ': ', src);
	request.get(src, options, callback);
}

getNext();
