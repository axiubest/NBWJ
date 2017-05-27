//日历
var showmonth = ''; //显示月份数
var showyear='';//显示年份
var showjidu='';//显示季度
var minyear=2016;//最小年份
var show_day = new Array('一', '二', '三', '四', '五', '六', '日'); // show_day[day-1]
var time = new Date();
var year = time.getFullYear(); //年份
var month = time.getMonth() + 1; //月份
var dates = time.getDate(); //日
var day = time.getDay(); //星期
var dateweek1 = year + '/' + month + '/01'; //当月1号星期
var week1 = new Date(dateweek1).getDay();
dates < 10 ? dates = '0' + dates : dates;
var mon = year + '-' + month; //年月
var mon2 = year + '年' + month + '月'; //年月
var years = time.getFullYear();
var currMonth = time.getMonth() + 1;
var jidu = Math.floor((currMonth % 3 == 0 ? (currMonth / 3) : (currMonth / 3 + 1)));
var jidumon = ''; //季度月
var jiduend = '';
var jiduval = jidu;
showmonth=(year-minyear)*12+month;
showyear=year+1-minyear;
showjidu=(year-minyear)*4+jidu;
function jidutime() {
	jiduval = jidu;
	if(jiduval == '1') {
		jidumon = '01';
		jiduend = '03'
	}
	if(jiduval == '2') {
		jidumon = '04';
		jiduend = '06'
	}
	if(jiduval == '3') {
		jidumon = '07';
		jiduend = '09'
	}
	if(jiduval == '4') {
		jidumon = '10';
		jiduend = '12'
	}
}
jidutime();
//遍历月份
function showTime() {
	var week = show_day[day - 1];
	var now = year + '-' + month + '-' + dates; //今天 
	var days = new Date(year, month, 0); //当月总天数
	var daycount = days.getDate();
	//遍历月份数
	for(var z = 0; z < showmonth; z++) {
		if(month < 10) {
			month = '0' + month;
		}
		mon = year + '-' + month;
		mon2 = year + '年' + month + '月';
		var riqi = '';
		var riqi = '<li id="a' + z + '" data-mon="' + mon + '"><span>' + mon2 + '</span></li>';
		$('#time1,#time4').append(riqi);
		month--;
		if(month <= 0) {
			month = 12;
			year = year - 1;
		}
	}
	$('#srt1 span,#srt2 span,#cross-srt1,#cross-srt2').text($('#a0').text()); //今天年月	
	//遍历年份数	
	var year3 = time.getFullYear();
	for(var x = 0; x < showyear; x++) {
		var year2 = year3 + '年';
		var riqi2 = '';
		var riqi2 = '<li id="b' + x + '" data-year="' + year3 + '"><span>' + year2 + '</span></li>';
		$('#time3,#time6').append(riqi2);
		year3--;

	}
	//季度
	for(var y = 0; y < showjidu; y++) {
		var jidu2 = years + '年' + jidu + '季度';
		var jidu3 = years + jidu;
		var riqi3 = '';
		riqi3 = '<li id="c' + y + '" data-begin="' + years + '-' + jidumon + '" data-end="' + years + '-' + jiduend + '"><span>' + jidu2 + '</span></li>';
		$('#time2,#time5').append(riqi3);
		jidu--;
		if(jidu <= 0) {
			jidu = 4;
			years = years - 1;
		}
		jidutime();
	}
}
showTime();