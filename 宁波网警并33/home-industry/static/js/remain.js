/**
 * author:申屠
 */
mui.init();

//获取存储数据
function load(){	
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
  {type:'vul'}).done(function(data) {
  	if(data.length>0){
  		$('#leak').html(data[0].value);
  	}  	
  })
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
{type:'hiddenlink'}).done(function(data) {
	if(data.length>0){
  		$('#dark').html(data[0].value);  
  }	
})
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
{type:'availability'}).done(function(data) {
	if(data.length>0){
  		$('#break').html(data[0].value);  
  }	
})
http.post('/mobile/desktop/yiliu_30/xiaqulist.html', 
{type:'dnshj'}).done(function(data) {
	if(data.length>0){
 		$('#dns').html(data[0].value);  
  }
})  
}
load();