var fs = require('fs');
var path = require('path');
var pwd;

function getRelativeFilePath(filepath)
{
	return path.relative(pwd, filepath);
}

function addLink(dir, callback) {
	var filepaths = fs.readdirSync(dir);
	for(var i in filepaths) {
		var filepath = path.join(dir, filepaths[i]);
		if (fs.statSync(filepath).isDirectory()) {
			addLink(filepath, callback);
		} else if (path.extname(filepath) == ".html") {
			callback(filepath, getRelativeFilePath(filepath));
		}
	}
}

function addAllLink(dir, callback) {
	pwd = dir;
	addLink(dir, callback);
}

module.exports = addAllLink;

