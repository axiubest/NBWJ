/**
 * author:申屠
 */
mui.init();
var id='';
id=getQueryString("id");
var app1=new Vue({ 
    el: ".info",
    data: {
    	publishDate:"",
        news_title: "",
        news_content:"",
    }
})

//jquery加载数据
function load(){	
//获取数据
http.post('/mobile/threatinfo/detail.html',{id:id}).done(function(data) {
	console.log(data);
app1.publishDate=data.publishDate;
app1.news_title=data.news_title;
app1.news_content=data.news_content;
//app1.fzrName=data.website.fzrName;
//app1.phone=data.website.phone;
//app1.mail=data.website.mail;
//var state=data.website.websiteState;
//
//if(state==0){app1.status='已过期';}
//if(state==1){app1.status='未完成';}
//if(state==2){app1.status='已完成';}
//var span='<span>'+app1.status+'</span>'
//$('.state').append(span);color();
//app1.wadw=data.wadw;
//app1.billCreateDate=formatDate(data.bill.billCreateDate).substr(0,10);
//app1.billRectifyDate=formatDate(data.bill.billRectifyDate).substr(0,10);
//app1.cfName=data.bill.tlName;
//app1.billDjhm=data.bill.billDjhm;
//app1.vul=data.data.vul.count;
//app1.leak=data.data.link.count;
//app1.dns=data.data.dns.count;

});

}
load();