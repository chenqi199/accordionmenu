Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
	}
/**
* 重置form表单
* @param formId form的id
*/
function resetQuery(formId){
var fid = "#" + formId;
var str = $(fid).serialize();
//str= cardSelectDate=3&startdate=2012-02-01&enddate=2012-02-04
var ob= strToObj(str);
alert(ob.startdate); //2012-02-01
}
function strToObj(str){
str = str.replace(/&/g, "','" );
str = str.replace(/=/g, "':'" );
str = "({'" +str + "'})" ;
obj = eval(str);
return obj;
}