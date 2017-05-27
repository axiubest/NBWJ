/**
 * author:申屠
 */
mui.init();
//遍历写入颜色
function color(){
	$('.state span:contains("处理中")').each(function(){
	$(this).css('background','#35bcf8');
	});
	$('.state span:contains("未完成")').each(function(){
	$(this).css('background','#ff8a00');
	});
}

var billId='';

billId=getQueryString("bill_id");
var url='../bulletin-threat/bulletin-threat.html?billId='+billId;


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
        vul:"",
        leak:'',
        dns:'',
        cfName:''
    }
})

//jquery加载数据
function load(){	
//获取数据
http.post('/mobile/desktop/browseBillWorking.html',{billId:billId}).done(function(data) {
	console.log(data);

app1.websiteUrl=data.website.websiteUrl;
app1.websiteName=data.website.websiteName;
app1.yzdwName=data.website.yzdwName;
app1.fzrName=data.website.fzrName;
app1.phone=data.website.phone;
app1.mail=data.website.mail;
var state=data.website.websiteState;

if(state==0){app1.status='已过期';}
if(state==1){app1.status='未完成';}
if(state==2){app1.status='已完成';}
var span='<span>'+app1.status+'</span>'
$('.state').append(span);color();

app1.cfName=data.bill.tlName;
app1.billDjhm=data.bill.billDjhm;
app1.vul=data.data.vul.count;
app1.leak=data.data.link.count;
app1.dns=data.data.dns.count;
app1.wadw=data.bill.billTbdw;
app1.billCreateDate=formatDate2(data.bill.billCreateDate);
app1.billRectifyDate=formatDate2(data.bill.billRectifyDate);
});

}
load();

