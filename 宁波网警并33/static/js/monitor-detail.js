/**
 * author:申屠
 */
mui.init();
function colors(){
	$('.state span:contains("中危")').each(function(){
	$(this).css('background','#aa71e5');
	});
	$('.state span:contains("高危")').each(function(){
	$(this).css('background','#ff2d42');
	});
	$('.state span:contains("处理中")').each(function(){
	$(this).css('background','#35bcf8');
	});
	$('.state span:contains("未处理")').each(function(){
	$(this).css('background','#ff8a00');
	});
}
function GetDateStr(AddDayCount) { 
var dd = new Date(); 
dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
var y = dd.getFullYear(); 
var m = dd.getMonth()+1;//获取当前月份的日期 
var d = dd.getDate(); 
if(d<10){d='0'+d}
if(m<10){m='0'+m}
return y+"-"+m+"-"+d; 
}

//初始化日期控件
var currYear = (new Date()).getFullYear();	
var defualtDay='';
//var today=n.getFullYear()+"-"+ (n.getMonth()+1)+"-"+ (n.getDate()+5);
$(function() {
   	$('#appDate').mobiscroll().date({
	theme: "android-ics light",
	dateFormat:'yyyy-mm-dd',
	minDate:new Date(new Date()),//最小日期
   		defaultValue:new Date(GetDateStr(5)),
   		endYear: currYear + 5

   	})
//	$('#appDate').val(today);
})	

//分母为0，禁用点击
function noclick(){
	if($('#num4').text()==0){$('#p1').addClass('no');}
	if($('#num6').text()==0){$('#p2').addClass('no');}
	if($('#num8').text()==0){$('#p3').addClass('no');}
}
noclick();


//全选checkbox框
function allcheck(){
    var a=$('.check2').prop("checked");
    var b=$('#check1').prop("checked");
    var c=$('#check2').prop("checked");
    var d=$('#check3').prop("checked");
   if(a==false){
	$('.check').prop("checked",false);
	}else if(a==true){
	$('.check').prop("checked",true);    
}
	leak();dark();hijack();
}
//选择框赋值
var num1=parseInt($('#num1').text());
var num2=parseInt($('#num2').text());
var num3=parseInt($('#num3').text());
var num4=parseInt($('#num4').text());
var num5=parseInt($('#num5').text());
var num6=parseInt($('#num6').text());
var num7=parseInt($('#num7').text());
var num8=parseInt($('#num8').text());


//网站总数
//$('#num2').text(num4+num6+num8);
//威胁总数
function allnum(){
	var a=$('.check3').length;	
	var b=$('.check4').length;
	var c=$('.check5').length;
	var d=$('.check3:checked').length;
	var e=$('.check4:checked').length;
	var f=$('.check5:checked').length;
	var all=a+b+c;
	var allcheck=d+e+f;
//	$('#num2').text(all);
	$('#num1').text(allcheck);
}
allnum();
//选择漏洞总数
function leak(){
	var num4=parseInt($('#num4').text());
	var a=$('#check1').prop("checked");
	if(a==false){
	 $('#num3,#num1').text(0);
	 $('.check2,.check3').prop("checked",false);
	 $('#no1').hide();$('#all1').show(); 

	}
	if(a==true){
	$('#num3').text(num4);$('.check3').prop("checked",true);
	$('#no1').show();$('#all1').hide();
	}	

	allnum();checks();
}
//暗链选择
function dark(){
	var num6=parseInt($('#num6').text());
	var a=$('#check2').prop("checked");
	if(a==false){
	 $('#num5').text(0);$('.check2,.check4').prop("checked",false);
	 $('#no2').hide();$('#all2').show();
	}
	if(a==true){
	$('#num5').text(num6);
	$('#no2').show();$('#all2').hide();$('.check4').prop("checked",true);	
	}
	allnum();checks()
}
//劫持选择
function hijack(){
	var num8=parseInt($('#num8').text());
	var a=$('#check3').prop("checked");
	if(a==false){
	 $('#num7').text(0);$('.check2,.check5').prop("checked",false);
	 //漏洞数
	$('#no3').hide();$('#all3').show();
	}
	if(a==true){
	$('#num7').text(num8);$('.check5').prop("checked",true);
	$('#no3').show();$('#all3').hide();

	}
	allnum();
	checks();
}
//全选状态
function checks(){
	var a=$('#check1').prop("checked");
	var b=$('#check2').prop("checked");
	var c=$('#check3').prop("checked");
	if(a==true && b==true && c==true){
		$('.check2').prop("checked",true);
	}else{
		$('.check2').prop("checked",false);
	}
}
//分子与分母是否相同
function checkto(){
	var num1=parseInt($('#num1').text());
	var num2=parseInt($('#num2').text());
	var num3=parseInt($('#num3').text());
	var num4=parseInt($('#num4').text());
	var num5=parseInt($('#num5').text());
	var num6=parseInt($('#num6').text());
	var num7=parseInt($('#num7').text());
	var num8=parseInt($('#num8').text());
	if(num2!==0){
		if(num1==num2){$('#check0,#check1,#check2,#check3').prop("checked",true);}
	}
	if(num4!==0){
		if(num3==num4){$('#check1').prop("checked",true);}
	}	
	if(num6!==0){
		if(num5==num6){$('#check2').prop("checked",true);}
	}	
	if(num8!==0){	
		if(num7==num8){$('#check3').prop("checked",true);}	
	}
	if(num2==0){
		if(num1==num2){$('#check3').prop("checked",false);}
	}
	if(num4==0){
		if(num3==num4){$('#check1').prop("checked",false);}
	}	
	if(num6==0){
		if(num5==num6){$('#check2').prop("checked",false);}
	}	
	if(num8==0){	
		if(num7==num8){$('#check3').prop("checked",false);}	
	}
	
}

//弹窗
$(function(){
    $('.click').click(function(){
        $('.bg,.content').show();
    });
    $('.bg,.close').click(function(){
        $('.bg,.content').hide();
    });
});

//通报内容取值
function clickTotal() {
	$(".ul li").click(function() {
		$(this).each(function() {
			$('.advice').text($(this).text());
			app1.cfid=$(this).attr('data-id');
			$('.bg,.content').hide();
		});
	});
}

//确认变色
function color(){		
	if($('#num1').text()!==0){
		$('.collect').css('background','#0d86ff').css('pointer-events','all');
	}
	if($('#num1').text()==0){
		$('.collect').css('background','#cecece').css('pointer-events','none');
	}　
}

setInterval(color,50);

//设置返回键
function unbacks(){
mui.init({
        keyEventBind: {
            backbutton: true 
        }
    });
    mui.back = function () {
//history.go(-1);
//mui.back()
//		old_back();
		mui.currentWebview.close();//关闭当前页

    }	
}

function unback1(){
mui.init({
        keyEventBind: {
            backbutton: true 
        }
    });
    mui.back = function () {
    	$('#leak-rt').click();
		unbacks();
    }	

} 
function unback2(){
mui.init({
        keyEventBind: {
            backbutton: true 
        }
    });
    mui.back = function () {
    	$('#dark-rt').click();
		unbacks();
    }	

} 
function unback3(){
mui.init({
        keyEventBind: {
            backbutton: true
        }
    });
    mui.back = function () {
    	$('#dns-rt').click();
		unbacks();
    }
} 
	
 
//漏洞
//右侧菜单
function right(){
$(".leak-right").animate({"left": "-=100%"},200);	
unback1();
}
function right2(){
$(".dark-right").animate({"left": "-=100%"},200);
unback2();
}
function right3(){
$(".dns-right").animate({"left": "-=100%"},200);
unback3();
}

$('#leak-rt').click(function(){
  $(".leak-right").animate({"left": "+=100%"},200);
unbacks()
});

$('#dark-rt').click(function(){
  $(".dark-right").animate({"left": "+=100%"},200);
unbacks()
});

$('#dns-rt').click(function(){
  $(".dns-right").animate({"left": "+=100%"},200);
unbacks()
});
//遍历写入颜色
function colorLeak(){
	$('.state span:contains("中危")').each(function(){
	$(this).css('background','#aa71e5');
	});
	$('.state span:contains("高危")').each(function(){
	$(this).css('background','#ff2d42');
	});
	$('.state span:contains("处理中")').each(function(){
	$(this).css('background','#35bcf8');
	});
	$('.state span:contains("未处理")').each(function(){
	$(this).css('background','#ff8a00');
	});
}
colorLeak();
//漏洞全选
$('#all1').click(function(){
	$('#no1').show();$('#all1').hide();
	$('.check3,#check1').prop("checked",true);
});
$('#no1').click(function(){
	$('#no1').hide();$('#all1').show();
	$('.check3,#check1').prop("checked",false);
});
//漏洞选择框
$('.check3').click(function(){
leakcheck()
});
//漏洞返回
$('#leak-rt').click(function(){
	leakcheck();checks()
})
function leakcheck(){
	var a=$('.check3').prop("checked");
	var b=$('.check3').length;
	var c=$('.check3:checked').length;
	var num3=parseInt($('#num3').text());	
	var num5=parseInt($('#num5').text());
	var num7=parseInt($('#num7').text());
	$('#num3').text(c);checkto();
	if(b==c&&b!=0){
	$('#no1').show();$('#all1').hide();$('#check1').prop("checked",true);
	}else{
	$('#no1').hide();$('#all1').show();$('#check1').prop("checked",false);	
	}
	//网站统计数
//	$('#num1').text(c+num5+num7); 
	allnum();
}



//暗链
//暗链全选
$('#all2').click(function(){
	$('#no2').show();$('#all2').hide();
	$('.check4,#check2').prop("checked",true);
});
$('#no2').click(function(){
	$('#no2').hide();$('#all2').show();
	$('.check4,#check2').prop("checked",false);
});
//暗链选择框
$('.check4').click(function(){
darkcheck()
});
//暗链返回
$('#dark-rt').click(function(){
	darkcheck();checks()
})
function darkcheck(){
	var a=$('.check4').prop("checked");
	var b=$('.check4').length;
	var c=$('.check4:checked').length;
	var num3=parseInt($('#num3').text());	
	var num5=parseInt($('#num5').text());
	var num7=parseInt($('#num7').text());
	$('#num5').text(c);checkto();
	if(b==c&&b!=0){
	$('#no2').show();$('#all2').hide();$('#check2').prop("checked",true);
	}else{
	$('#no2').hide();$('#all2').show();$('#check2').prop("checked",false);	
	}
	//网站统计数
//	$('#num1').text(c+num3+num7); 
	allnum();
}
//劫持
//劫持全选
$('#all3').click(function(){
	$('#no3').show();$('#all3').hide();
	$('.check5,#check3').prop("checked",true);
});
$('#no3').click(function(){
	$('#no3').hide();$('#all3').show();
	$('.check5,#check3').prop("checked",false);
});
//劫持选择框
$('.check5').click(function(){
	dnscheck()
});
//劫持返回
$('#dns-rt').click(function(){
	dnscheck();checks()
})
function dnscheck(){
	var a=$('.check5').prop("checked");
	var b=$('.check5').length;
	var c=$('.check5:checked').length;
	var num3=parseInt($('#num3').text());	
	var num5=parseInt($('#num5').text());
	var num7=parseInt($('#num7').text());
	$('#num7').text(c);
	checkto();
	if(b==c&&b!=0){
	$('#no3').show();$('#all3').hide();$('#check3').prop("checked",true);			
	}else{
	$('#no3').hide();$('#all3').show();$('#check3').prop("checked",false);	
	}
	allnum();
}