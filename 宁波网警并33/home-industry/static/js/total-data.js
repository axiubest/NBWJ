//通报单传参
var chart1y3=[];//过期单
var chart1y2=[];//完成率
var chart1y1=[];//通报单总数
var chart1x=[];//总数
var alltotal1=0;//总通报单
var alloutdate=0;//总过期单
var allrate=0;//总完成率
var allfinished=0;//总完成数
var allcom=0;//算总数完成率
//通报单横屏
var chart5y3=[];//过期单
var chart5y2=[];//完成率
var chart5y1=[];//通报单总数
var chart5x=[];//总数
var alltotal5=0;//总通报单
var alloutdate5=0;//总过期单
var allrate5=0;//总完成率
var allfinished5=0;//总完成数
var allcom5=0;//算总数完成率
//搜索数据
var schmon='';var schbegin='';var schend='';var schyear='';
schmon=$('#a0').attr('data-mon');
schend=$('#a0').attr('data-mon');

var days5=month5(5);
var days11=month5(11);

bulletin();
function bulletin(){
	http.post('/mobile/hyzg_statistics/disposal.html',{
		begin:days5,end:schend
	}).done(function(data) {
		console.log(data);
		 chart1y3=[];//过期单
		 chart1y2=[];//完成率
		 chart1y1=[];//通报单总数
		 chart1x=[];//总数
		 alltotal1=0;//总通报单
		 alloutdate=0;//总过期单
		 allrate=0;//总完成率
		 allfinished=0;//总完成数
		 allcom=0;//算总数完成率	
		for(var i = 0; i <data.length; i++) {
			alltotal1+=data[i].finished+data[i].outdated+data[i].unFinished;
			alloutdate+=data[i].outdated;
			allfinished+=data[i].finished;
			allcom+=data[i].finished+data[i].outdated;		
			chart1y1[i]=data[i].finished;
			chart1y2[i]=parseInt((data[i].finished/(data[i].finished+data[i].outdated))*100);
			chart1y3[i]=data[i].outdated;
			chart1x[i]=data[i].name;

		}
		if(data.length==0){
			allrate=0;
			$('#sheet1 h1').html(0);
			$('#overdue1 h1').html(0);
			$('#rate1 h1').html(0+'%');			
		}else{
			allrate=parseInt((allfinished/allcom)*100);
			$('#sheet1 h1').html(allfinished);
			$('#overdue1 h1').html(alloutdate);
			$('#rate1 h1').html(allrate+'%');
		}
		chart1();
	});
}

bulletin2();
function bulletin2(){
	http.post('/mobile/hyzg_statistics/disposal.html',{
		begin:days11,end:schend
	}).done(function(data) {
		console.log(data);
		 chart5y3=[];//过期单
		 chart5y2=[];//完成率
		 chart5y1=[];//通报单总数
		 chart5x=[];//总数
		 alltotal5=0;//总通报单
		 alloutdate5=0;//总过期单
		 allrate5=0;//总完成率
		 allfinished5=0;//总完成数
		 allcom5=0;//算总数完成率	
		for(var i = 0; i <data.length; i++) {
			alltotal5+=data[i].finished+data[i].outdated+data[i].unFinished;
			alloutdate5+=data[i].outdated;
			allfinished5+=data[i].finished;
			allcom5+=data[i].finished+data[i].outdated;		
			chart5y1[i]=data[i].finished+data[i].outdated+data[i].unFinished;
			chart5y2[i]=parseInt((data[i].finished/(data[i].finished+data[i].outdated))*100);
			chart5y3[i]=data[i].outdated;
			chart5x[i]=data[i].name;
		}
		if(data.length==0){
			allrate5=0;
			$('#sheet5').html(0);
			$('#overdue5').html(0);
			$('#rate5').html(0+'%');			
		}else{
			allrate5=parseInt((allfinished5/allcom5)*100);
			$('#sheet5').html(allfinished5);
			$('#overdue5').html(alloutdate5);
			$('#rate5').html(allrate5+'%');
		}
//		chart5();
	});
}

//漏洞传参
var chart2y2=[[],[],[],[],[],[],[],[],[],[]];//通报单总数
var chart2y1=[];//漏洞数据
var chart2x=[];//top名字
//搜索数据
var schmon2='';var schbegin2='';var schend2='';var schyear2='';
schmon2=$('#a0').attr('data-mon');
leak();
function leak(){
	http.post('/mobile/statistics/vul.html',{
		month:schmon2,begin:schbegin2,end:schend2,year:schyear2
	}).done(function(data) {
		console.log(data);
		chart2y1='';chart2y2='';	
		 chart2y1=[[],[],[],[],[],[],[],[],[],[]];
		 chart2y2=[[],[],[],[],[],[],[],[],[],[]];
		 chart2x=[];
		for(var i = 0; i <data.length; i++) {
			for(var y = 0; y <2; y++) {
				if(y=='0'){
					chart2y1[i][0]=data[i].xcount;					
				}
				if(y=='1'){
					chart2y1[i][1]=data[i].ywebcount;
				}
			}
			chart2x[i]=data[i].name;
		}
		if(data.length==0){
			allrate2=0;
			$('#sheet2 h1,#sheet6').html(0);
			$('#overdue2 h1,#overdue6').html(0);
			$('.top-leak div,#top-data,#top-i').hide();
			$('#top,#top2,#topname2').text('');
		}else{
			$('.top-leak div,#top-data,#top-i').show();
			$('#sheet2 h1,#sheet6').html(chart2y1[0][0]);
			$('#top,#top2').text('1');
			$('#topname,#topname2').text(data[0].name);
			$('#overdue2 h1,#overdue6').html(chart2y1[0][1]);
		}
		chart2();
	});
}
//dns传参
var chart3y2=[];
var chart3y1=[];
var chart3x=[];//总数
var alltotal3=0;
function dns(){
	http.post('/mobile/desktop/analyze30/dnshj.html').done(function(data) {
		console.log(data);
		alltotal3=data.this_count;
		$('#sheet3 h1,#overdue7').text(data.last_count);
		$('#overdue3 h1,#sheet7').text(alltotal3);
		for(var i = 0; i <data.this_time.length; i++) {
			chart3y2[i]=data.this_time[i].value;
			var name='';
			name=data.this_time[i].name;
			chart3x[i]=name.substr(5,2)+'月'+name.substr(8,2)+'日';
		}
		for(var i = 0; i < data.last_time.length; i++) {
			chart3y1[i]=data.last_time[i].value;
		}
		chart3();
	});	
}

//中断传参
var chart4y2=[];
var chart4y1=[];
var chart4x=[];
var alltotal4=0;
function midbreak(){
	http.post('/mobile/desktop/analyze30/avail.html').done(function(data) {
		console.log(data);
		alltotal4=data.this_count;
		$('#overdue4 h1,#overdue8').text(data.last_count);
		$('#sheet4 h1,#sheet8').text(alltotal4);
		for(var i = 0; i <data.this_time.length; i++) {
			chart4y2[i]=data.this_time[i].value;
			var name='';
			name=data.this_time[i].name;
			chart4x[i]=name.substr(5,2)+'月'+name.substr(8,2)+'日';
		}
		for(var i = 0; i < data.last_time.length; i++) {
			chart4y1[i]=data.last_time[i].value;
		}
		chart4();
	});	
}
setTimeout(function(){
	dns();midbreak();
},1000)
