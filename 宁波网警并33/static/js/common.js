var ipurl='http://192.168.1.27:8080';
(function(w){
// 空函数
function shield(){
	return false;
}
document.addEventListener('touchstart',shield,false);//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.oncontextmenu=shield;//屏蔽选择函数
// H5 plus事件处理
var ws=null,as='pop-in';//slide-in-right
// 处理点击事件
var openw=null,waiting=null;
/**
 * 打开新窗口
 * @param {URIString} id : 要打开页面url
 * @param {boolean} wa : 是否显示等待框
 * @param {boolean} ns : 是否不自动显示
 * @param {JSON} ws : Webview窗口属性
 */
w.clicked=function(id,wa,ns,ws){
	if(openw){//避免多次打开同一个页面
		return null;
	}
	if(w.plus){
		wa&&(waiting=plus.nativeUI.showWaiting());
		ws=ws||{};
		ws.scrollIndicator||(ws.scrollIndicator='none');
		ws.scalable||(ws.scalable=false);
		var pre='';//'http://192.168.1.178:8080/h5/';
		openw=plus.webview.create(pre+id,id,{render:'always'});//原来ws
		ns||openw.addEventListener('loaded',function(){//页面加载完成后才显示
//		setTimeout(function(){//延后显示可避免低端机上动画时白屏
			openw.show(as);
//		},200);
		},false);
		openw.addEventListener('close',function(){//页面关闭后可再次打开
			openw=null;
		},false);
		return openw;
	}else{
		w.open(id);
	}
	return null;
};

//clicked2()
w.clicked2=function(id,wa,ns,ws){
	if(openw){//避免多次打开同一个页面
		return null;
	}
	if(w.plus){
		wa&&(waiting=plus.nativeUI.showWaiting());
		ws=ws||{};
		ws.scrollIndicator||(ws.scrollIndicator='none');
		ws.scalable||(ws.scalable=false);
		var pre='';//'http://192.168.1.178:8080/h5/';
		openw=plus.webview.create(pre+id,id,'always');//原来ws{render:'always'}
		ns||openw.addEventListener('loaded',function(){//页面加载完成后才显示
//		setTimeout(function(){//延后显示可避免低端机上动画时白屏
			openw.show('none');
//		},200);
		},false);
		openw.addEventListener('close',function(){//页面关闭后可再次打开
			openw=null;
		},false);
		return openw;
	}else{
		w.open(id);
	}
	return null;
};

})(window);
//时间格式转换今天
function   formatDate(now)   {     
	var d=new Date();//
    var n=new Date(d.getTime());
    var hour=n.getHours();
    var mon=n.getMonth()+1;
    var timestamp = Date.parse(new Date(now)); //时间戳
    var dates=n.getDate();
    var min=n.getMinutes();
    var s=n.getSeconds();
    if(dates<10){dates='0'+dates}
    if(mon<10){mon='0'+mon}
    if(hour<10){hour='0'+hour}
    if(min<10){min='0'+min}
    if(s<10){s='0'+s}
    //时间
    now=n.getFullYear()+"-"+mon+"-"+ dates+" "+hour+":"+min+":"+s; 
    return now
}   
//获取链接参数
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
//newId=name;
if (r != null) return unescape(r[2]); return null; 

}
//时间减月份数
function month5(index){
var ds = new Date();
ds.setMonth(ds.getMonth()-index);
var bulday=ds;
var buln=new Date(bulday);
var bulmon=buln.getMonth()+1;
var buldates=buln.getDate();
if(buldates<10){buldates='0'+buldates}
if(bulmon<10){bulmon='0'+bulmon}
    //时间-5月
bulnow=buln.getFullYear()+"-"+bulmon+"-"+ buldates; 
return bulnow;	
}
//时间格式转化
function   formatDate2(time)   {     
	var d=new Date(time);//
    var n=new Date(d.getTime());
    var hour=n.getHours();
    var mon=n.getMonth()+1;
    var dates=n.getDate();
    var min=n.getMinutes();
    var s=n.getSeconds();
    if(dates<10){dates='0'+dates}
    if(mon<10){mon='0'+mon}
    if(hour<10){hour='0'+hour}
    if(min<10){min='0'+min}
    if(s<10){s='0'+s}
    //时间
    now=n.getFullYear()+"-"+mon+"-"+ dates+" "+hour+":"+min+":"+s; 
    return now
}  

//竖屏不全屏

mui.plusReady(function() {

plus.screen.lockOrientation("portrait-primary");
plus.navigator.setFullscreen(false); 
});		

