/**
 * author:申屠
 */
mui.init();
var billId='';

billId=getQueryString("billId");
function color(){
	$('.state span:contains("中危")').each(function(){
	$(this).css('background','#aa71e5');
	});
	$('.state span:contains("高危")').each(function(){
	$(this).css('background','#ff2d42');
	});

}
//tab列表
function load(){

$('#Tab0 ul,#Tab1 ul,#Tab2 ul').html('');	
//获取数据
http.post('/mobile/desktop/browseBillWorking.html',{billId:billId}).done(function(data) {
	console.log(data);
var vul = data.data.vul.count;
var leak = data.data.link.count;
var dns = data.data.dns.count;

var result1='';var result2='';var result3='';
for(var i=0;i<vul;i++){
result1+='<li><div onclick=clicked("../leak-detail/leak-detail.html?bill_id='+
data.data.vul.list[i].vulId+
'")><h1>'+data.data.vul.list[i].vulName+
'</h1><div class="state"><span>'+data.data.vul.list[i].vulDangerLevel+'</span></div><br />'+
'<h2 class="log">'+data.data.vul.list[i].vulDescription+'</h2>'+
'<h3>'+formatDate2(data.data.vul.list[i].vulCreateDate)+'</h3></div></li>';
}
$('#Tab0 ul').append(result1);
for(var i=0;i<leak;i++){
result2+='<li><div onclick=clicked("../dark-detail/dark-detail.html?bill_id='+
data.data.link.list[i].hidId+
'")><h1>'+''+'<h1>'+data.data.link.list[i].hidDomain+
'</h1><h2 class="log">类型：'+data.data.link.list[i].hidType+'</h2><h3>'+
formatDate2(data.data.link.list[i].hidCreateDate)+'</h3></div></li>';
}
$('#Tab1 ul').append(result2);color();

for(var i=0;i<dns;i++){
result3+='<li><div onclick=clicked("../hijack-detail/hijack-detail.html?bill_id='+
data.data.dns.list[i].dnsId+
'")><h1>'+''+'<h1>劫持地址：'+data.data.dns.list[i].dnsDomain+
'</h1><h2 class="log">原IP：'+data.data.dns.list[i].dnsHjdns+'</h2><h3>'+
formatDate2(data.data.dns.list[i].dnsCreateDate)+'</h3></div></li>';
}
$('#Tab2 ul').append(result3);	

});

	
}
load();

