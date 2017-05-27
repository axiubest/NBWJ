var billId='';
billId=getQueryString("bill_id");
var app1=new Vue({ 
    el: "#info",
    data: {
    	websiteUrl:"",
        websiteName: "",
        yzdwName:"",
        fzrName:"",
        phone:"",
        mail:"",
        status: "",
        wadw:"",
        billCreateDate: "",
        billRectifyDate:"",
        billDjhm: "",
        vul:"0",
        leak:'0',
        dns:'0',
        cfName:'',
        all:'0',
        cfid:'',
        fzrid:''
    }
})
load();
var today='';
function load(){	
	//获取数据
	http.post('/mobile/hyzg_desktop/webdetail.html',{webId:billId}).done(function(data) {
		console.log(data);

	app1.websiteUrl=data.web.webUrl;
	app1.websiteName=data.web.webName;
	app1.yzdwName=data.web.deptName;
	app1.fzrName=data.web.fzrName;
	app1.phone=data.web.phone;
	app1.mail=data.web.mail;
	app1.billRectifyDate=formatDate(data.data.billRectifyDate).substr(0,10);
	var d=new Date(app1.billRectifyDate);
	var n=new Date(d.getTime());
	var mon=n.getMonth()+1;
	var dates=n.getDate()+5;
	if(dates<10){dates='0'+dates}
	if(mon<10){mon='0'+mon}
	today=n.getFullYear()+"-"+ mon+"-"+ dates;
	app1.billRectifyDate=today;
	defualtDay=today;
	app1.vul=data.data.vul.count;
	app1.leak=data.data.link.count;
	app1.dns=data.data.dns.count;
	app1.all=app1.dns+app1.leak+app1.vul;
	clickTotal();
	//漏洞数量
	var result2 = '';
	var arrLen2 = data.data.vul.list.length;
	var dataVul=data.data.vul;
	for(var i = 0; i < arrLen2; i++) {
		if(dataVul.list[i].isWorking=='0'){
			result2 +='<li><div><input type="checkbox" class="check3" data-vulid="'+dataVul.list[i].vulId+
			'"/><div onclick="clicked(this.id)" id="../../leak-detail/leak-detail.html?bill_id='+
			dataVul.list[i].vulId+'"><h1>'+dataVul.list[i].vulName+'</h1><div class="state"><span>'+
			dataVul.list[i].vulDangerLevel+'</span></div><br /><h2 class="log">'+dataVul.list[i].vulDescription+
			'</h2><h3>'+formatDate2(dataVul.list[i].vulCreateDate)+'</h3></div></div></li>';
		}			
	}
	$('.leak-ul').append(result2);
	colors();
	//暗链数量
	var result3 = '';
	var arrLen3 = data.data.link.list.length;
	var dataDark=data.data.link;
	for(var i = 0; i < arrLen3; i++) {
		if(dataDark.list[i].isWorking=='0'){
		result3 +='<li><div><input type="checkbox" class="check4" data-darkid="'+dataDark.list[i].hidId+'"/>'+
		'<div onclick="clicked(this.id)" id="../../dark-detail/dark-detail.html?bill_id='+
		dataDark.list[i].hidId+'">'+'<h1>'+dataDark.list[i].hidPageurl+'</h1><h2 class="log">类型：'+
		dataDark.list[i].hidType+'</h2><h3>'+formatDate2(dataDark.list[i].hidHappenedTime)+
		'</h3></div></div></li>';
		}			
	}
	$('.dark-ul').append(result3);
	//dns数量
	var result4 = '';
	var arrLen4 = data.data.dns.list.length;
	var dataDns=data.data.dns;
	for(var i = 0; i < arrLen4; i++) {
		if(dataDns.list[i].isWorking=='0'){
		result4 +='<li><div><input type="checkbox" class="check5" data-dnsid="'+dataDns.list[i].dnsId+'"/>'+
		'<div onclick="clicked(this.id)" id="../../hijack-detail/hijack-detail.html?bill_id='+
		dataDns.list[i].dnsId+'">'+'<h1>劫持地址：'+dataDns.list[i].dnsDomain+'</h1><h2 class="log">原IP：'+
		dataDns.list[i].dnsHjdns+'</h2><h3>'+formatDate2(dataDns.list[i].dnsHappenedTime)+
		'</h3></div></div></li>';
		}			
	}
	$('.dns-ul').append(result4);
});
}
//dnsIds：'1,2,3'dsn 漏洞 暗链  必须选择至少一个
var dnsIds='';
var linkIds='';
var vulIds='';	
var token=localStorage.getItem("appToken");//token
token=token.replace(/\"/g,"");
var urls=ipurl+'/mobile/desktop/saveBillWorking.html';//在common.js里布局
//提交数据
function submit(){
	checktotal();
	$.ajax({
	   type: "POST",
	   url: urls,
	   data: {
		   	websiteId:billId,
			billRectifyDate:app1.billRectifyDate,
			fzrName:app1.fzrName,
			fzrid:app1.fzrid,	
			websiteName:app1.websiteName,
			linkIds:linkIds,
			dnsIds:dnsIds,
			tlId:app1.cfid,
			vulIds:vulIds,
			usIds:'',//没有
			token:token
	   },
	   success: function(data){
	     console.log(data);
	     var states=JSON.parse(data).status;
	     if(states=='0'){
	     	layer.msg('提交成功！', {time: 2000});
	     	clicked('../monitor/monitor.html')
	     }
	   }
	});

}
//id选择统计
function checktotal(){
	//漏洞id选择
	var b=$('.check3').length;
	var result1='';
	for(var i = 0; i < b; i++) {
		if($('.check3').eq(i).prop("checked")==true){
			result1 +=$('.check3').eq(i).attr('data-vulid')+',';
		}
	}
	vulIds=result1;
	//漏洞id选择
	var e=$('.check3').length;
	var result2='';
	for(var i = 0; i < e; i++) {
		if($('.check4').eq(i).prop("checked")==true){
			result2 +=$('.check4').eq(i).attr('data-darkid')+',';
		}
	}
	linkIds=result2;
	//dnsid选择
	var h=$('.check5').length;
	var result3='';
	for(var i = 0; i < h; i++) {
		if($('.check5').eq(i).prop("checked")==true){
			result3 +=$('.check5').eq(i).attr('data-dnsid')+',';
		}
	}
	dnsIds=result3;
}

