/**
 * author:申屠
 */
//是否为安卓
function isandriod(){
	var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//  alert('是否是Android：'+isAndroid);
if(isAndroid){
	var css='<link rel="stylesheet" href="../static/css/andriod.css" />'
	$('head').append(css);
	
}else{
	$('#topmenu1').hide();$('#topmenu2').show();
}
}
isandriod();

//是否为ios
//function isios(){
//var u = navigator.userAgent;	
//var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//if(isiOS){
//	var css='<link rel="stylesheet" href="../static/css/ios.css" />'
//	$('head').append(css);
//}
//}
//isios();