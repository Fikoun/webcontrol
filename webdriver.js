var webdriver = require(`selenium-webdriver`);

exports.platform= "safari";
exports.log="";
exports.setPlatform= function(p){
	this.platform = p;
}

exports.driver= null;
exports.start = function () {
	return new webdriver.Builder().forBrowser(this.platform).build();
}

exports.js= function (js){
	this.log = this.driver.executeScript(js).then(function(r){console.log(r)})
}
exports.browse = function(url){
	this.driver.get(url);
}

exports.popLogin = function (obj){
	this.driver.get(obj.protocol +"://"+ obj.username +":"+ obj.password +"@"+obj.url);
}

exports.jsLogin = function (obj){
	
}

//.        var d = require(`./webdriver`);d.openWindow();d.browse(`https://educanet.euceni.eu/student/index.php`);
//$.popLogin({username: "jankfi", password: "ae3012fiko2AC", protocol:"https", url:"educanet.euceni.eu/student/index.php"})