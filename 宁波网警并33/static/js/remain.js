/**
 * author:申屠
 */
function loadData(){

//vul/hiddenlink/availability/dnshj 漏洞/暗链/可用性中断/dns劫持
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
  {type:'vul'}).done(function(data) {
  	console.log(data);
	var arrlen = data.length;var result="";
	for(var i = 0,x=1; i < arrlen; i++) {
		if(i<10){x="0"+x}
		result += '<li><span>'+x+'</span><span>'+data[i].name+'</span><span>'+
		data[i].value+'</span></li>';
	}
	$('#Tab0 ul').html(result);  	
  })
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
{type:'hiddenlink'}).done(function(data) {
	console.log(data);
	var arrlen = data.length;var result="";
	for(var i = 0,x=1; i < arrlen; i++) {
		if(i<10){x="0"+x}
		result += '<li><span>'+x+'</span><span>'+data[i].name+'</span><span>'+
		data[i].value+'</span></li>';
	}
	$('#Tab1 ul').html(result);  

})
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
{type:'availability'}).done(function(data) {
	console.log(data);
	var arrlen = data.length;var result="";
	for(var i = 0,x=1; i < arrlen; i++) {
		if(i<10){x="0"+x}
		result += '<li><span>'+x+'</span><span>'+data[i].name+'</span><span>'+
		data[i].value+'</span></li>';
	}
	$('#Tab2 ul').html(result);  

})
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
{type:'dnshj'}).done(function(data) {
	console.log(data);
	var arrlen = data.length;var result="";
	for(var i = 0,x=1; i < arrlen; i++) {
		if(i<10){x="0"+x}
		result += '<li><span>'+x+'</span><span>'+data[i].name+'</span><span>'+
		data[i].value+'</span></li>';
	}
	$('#Tab3 ul').html(result);  
})
}
  loadData();