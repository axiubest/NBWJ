//通报单
function chart1(){
$('#chart1').highcharts({	
	 credits: { enabled: false //不显示LOGO 
	},
	 plotOptions:{column:{pointPadding:0.1,borderWidth:0},
	 series: { 
	 	 cursor: 'pointer', 
            events: { 
                click: function(e) { 
                	var i=e.point.x;//获取点击x坐标序列0开始
                	if(chart1y1[i]==undefined){chart1y1[i]=0}
                	if(chart1y2[i]==undefined){chart1y2[i]=0}
                	if(chart1y3[i]==undefined){chart1y3[i]=0}
                	$('#sheet1 h1').text(chart1y1[i]);//通报单
                	$('#rate1 h1').text(chart1y2[i]+'%');//完成率
                	$('#overdue1 h1').text(chart1y3[i]);//过期单

                } 
            } ,
		 marker:{ 
		        radius:4,  //曲线点半径，默认是4圆点大小
		        symbol:'circle',
		        fillColor:'#00eeff',
		        lineColor:'#00eeff',
		        lineWidth:0,
		        border:0,		
		//可以用图标直接进行替换
        states:{
            hover:{
                radius:0,
                fillColor:'#00eeff',
                lineColor:'#00eeff', // 黑圈 试试修改为空值 或者将states整个注释掉
                lineWidth:0,
                border:0
                }
            }
		}
		    }
	 	},//去边框
    chart: {      
        backgroundColor: 'none', //背景色
       
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: [    
    {
    	lineColor:'#5a5a5d',
        lineWidth:1,
        tickLength:0,//x轴竖刻度线
        categories: chart1x,
        crosshair: true
    }],
    yAxis: [
   
    { // Primary yAxis

 min:0,
    labels: {
        format: '{value}',
        style: {
            color:'#5a5a5d'
        }
    },
    title: {
        text: '',
        style: {
            color: '#5a5a5d'
        }
    }
    }, { // Secondary yAxis
    	min:0,max:100,
    	gridLineColor:'#5a5a5d',
        title: {
            text: '',               
        },
        labels: {
            format: '{value} %',
            style: {
                color:'#5a5a5d'
            }
        },
        opposite: true
    }],
    tooltip: {
        style: {display:"none"}
    },   
        series: [{
            name: '通报单',showInLegend: false,
            type: 'column',
//          yAxis: 1,
            data:  chart1y1,
            color:'#6f85f2',
            tooltip: {
                valueSuffix: '张'
            }
        }, {
            name: '完成率',showInLegend: false,color:'#00eeff',
            type: 'line',
            yAxis: 1,
            data: chart1y2,
            tooltip: {
                valueSuffix: '%'
            }
        }]
});
}
//chart2();
function chart2(){
 $('#chart2').highcharts({
 	 credits: { enabled: false //不显示LOGO 
	},
 	chart: {
 		type: 'scatter',
 		backgroundColor:'none'
 	},
 	title: {
 		text: ''
 	},
 	subtitle: {
 		text: ''
 	},
 	xAxis: {
 		 labels:{ 
        step:1 
    }, 
 		title: {
 			enabled: true,
 			text: '次数'
 		},
        startOnTick: true,//显示前后一个值，数据点起始位置
        endOnTick: true,
        showLastLabel: true,
   		tickInterval: 1,
     		min:0,
// 		categories: [0,1,2,3,4,5,6,7],
   		allowDecimals: false,  	//显示为整数
   		lineColor:'#5a5a5d',
        lineWidth:1,
        tickLength:0,//x轴竖刻度线
 	},
 	yAxis: {
 		title: {
 			text: '网站数量'
 		},
// 		categories: [1,2,3,4,5,6,7,8,9,10],
        min: 0,
        allowDecimals: false, //控制数轴是否显示小数
        gridLineWidth:0,//隐藏横线0
        lineWidth:1,
        lineColor:'#5a5a5d' 		
 	},
 	plotOptions: {
 		column: {
 			pointPadding: 0,
 			borderWidth: 0
 		},
 		series: {
 			cursor: 'pointer',
 			events: {
 				click: function(e) {
//					console.log(e.point);
				$('#top').text(e.point.index+1);
				$('#topname').text(chart2x[e.point.index]);
				$('#overdue2 h1').text(e.point.x);
				$('#sheet2 h1').text(e.point.y);
 				}
 			},
 			marker: {
 				radius: 5, //曲线点半径，默认是4圆点大小
 				symbol: 'circle',
 				fillColor: '#ff3f3a',
 				lineColor: '#ff3f3a',
 				lineWidth: 0,
 				border: 0
 			}
 		}
 	},
 	tooltip: {
 		style: {
 			display: "none"
 		}
 	},
 	series: [{
 		name: '',
 		color: '#fd3f3f',
 		showInLegend: false,
 		data:
 		//[[1,1]]
   		chart2y1
 	}]
 });
}		


function chart3(){
	$('#overdue3 h1').text(alltotal3);
//dns
//折线图
$('#chart3').highcharts({
	 credits: { enabled: false //不显示LOGO 
	},
    title: {text: ''},
    subtitle: {text: ''},
    chart: {backgroundColor:'none'},//背景色
    plotOptions: {series: {
    		cursor: 'pointer', 
            events: { 
                click: function(e) { 
                	var i=e.point.x;//获取点击x坐标序列0开始
                	if(chart3y1[i]==undefined){chart3y1[i]=0}
                	if(chart3y2[i]==undefined){chart3y2[i]=0}
                	$('#sheet3 h1').text(chart3y1[i]);//通报单
                	$('#overdue3 h1').text(chart3y2[i]);//完成率
                } 
            } ,
    		 marker:{ 
		        radius:4,  //曲线点半径，默认是4圆点大小
		        symbol:'circle',
//		        fillColor:'#00eeff',
		        lineColor:'rgba(0,0,0,0)',
		        lineWidth:0,
		        border:0,		
		},
// events:{legendItemClick:function(event){return false;}}
   },
   //数据字体大小
    line: {
        	dataLabels: 
        	{enabled: true,
        	style: {color: 'red',
        	textShadow:'none',
        	fontSize:'16px',
        	display:'none'//隐藏圆点上数据
        	}
        	}
    	},
   column: {pointPadding: 0,borderWidth: 0}
   },
    xAxis: {
    //gridLineWidth:1,gridLineColor:'red',//x横线样式
    lineColor:'#5a5a5d',	lineWidth:1,
    tickColor:'red',tickLength:0,//x轴竖刻度线    
    categories: chart3x,
    labels: {style: {color: '#5a5a5d'}},
    },
    
    yAxis: {
    	gridLineWidth:1,//隐藏横线0
    	gridLineColor:'#5a5a5d',
        title:{text:'次数'},
//      tickPixelInterval:20,//间隔
		labels:{style:{color:'#5a5a5d'},
		allowDecimals:false, //是否允许刻度有小数
		enabled: true//显示y轴数字
		}
    },
     tooltip: {style: {display:"none"}},
    series: [{
        name: '',color: "#ffb20d",showInLegend: false,
        data: chart3y1
    },
		{
        name: '',color: "#68ba67",showInLegend: false,
            data: chart3y2
			}
]
})	
}
function chart4(){
//中断
$('#chart4').highcharts({
	 credits: { enabled: false //不显示LOGO 
	},
    title: {text: ''},
    subtitle: {text: ''},
    chart: {backgroundColor:'none'},//背景色
    plotOptions: {series: {
    		cursor: 'pointer', 
            events: { 
                click: function(e) { 
                	var i=e.point.x;//获取点击x坐标序列0开始
                	if(chart4y1[i]==undefined){chart4y1[i]=0}
                	if(chart4y2[i]==undefined){chart4y2[i]=0}
                	$('#sheet4 h1').text(chart4y2[i]);//通报单
                	$('#overdue4 h1').text(chart4y1[i]);//完成率
                } 
            } ,
    		 marker:{ 
		        radius:4,  //曲线点半径，默认是4圆点大小
		        symbol:'circle',
//		        fillColor:'#00eeff',
		        lineColor:'rgba(0,0,0,0)',
		        lineWidth:0,
		        border:0,		
		},
// events:{legendItemClick:function(event){return false;}}
   },
   //数据字体大小
    line: {
        	dataLabels: 
        	{enabled: true,
        	style: {color: 'red',
        	textShadow:'none',
        	fontSize:'16px',
        	display:'none'//隐藏圆点上数据
        	}
        	}
    	},
   column: {pointPadding: 0,borderWidth: 0}
   },
    xAxis: {
    //gridLineWidth:1,gridLineColor:'red',//x横线样式
    lineColor:'#5a5a5d',	lineWidth:1,
    tickColor:'red',tickLength:0,//x轴竖刻度线    
    categories: chart4x,
    labels: {style: {color: '#5a5a5d'}},
    },
    
    yAxis: {
    	gridLineWidth:1,//隐藏横线0
    	gridLineColor:'#5a5a5d',
        title:{text:'次数'},
//      tickPixelInterval:20,//间隔
		labels:{style:{color:'#5a5a5d'},
		allowDecimals:false, //是否允许刻度有小数
		enabled: true//显示y轴数字
		}
    },
     tooltip: {style: {display:"none"}},
    series: [{
        name: '',color: "#ffb20d",showInLegend: false,
        data: chart4y1
        },
		{
        name: '',color: "#68ba67",showInLegend: false,
            data: chart4y2
			}
]
})		
}


//横屏
//通报单
function chart5(){	
	$('#chart5').highcharts({	
	 credits: { enabled: false //不显示LOGO 
	},
    chart: {      
        backgroundColor: 'none', //背景色
        zoomType: 'x', //控制xy缩放
        	resetZoomButton: {
        		theme: {
        			style: {
        				display: 'none'
        			}
        		}
        	}
    },
	 plotOptions:{column:{pointPadding:0.1,borderWidth:0},
	 series: { 
	 	 cursor: 'pointer', 
            events: { 
                click: function(e) { 
                	var i=e.point.x;//获取点击x坐标序列0开始
                	if(chart1y1[i]==undefined){chart1y1[i]=0}
                	if(chart1y2[i]==undefined){chart1y2[i]=0}
                	if(chart1y3[i]==undefined){chart1y3[i]=0}
                	$('#overdue5').text(chart1y3[i]);//过期单
                	$('#sheet5').text(chart1y1[i]);//通报单
                	$('#rate5').text(chart1y2[i]+'%');//完成率
                } 
            } ,
		 marker:{ 
		        radius:4,  //曲线点半径，默认是4圆点大小
		        symbol:'circle',
		        fillColor:'#00eeff',
		        lineColor:'#00eeff',
		        lineWidth:0,
		        border:0,		
		//可以用图标直接进行替换
        states:{
            hover:{
                radius:0,
                fillColor:'#00eeff',
                lineColor:'#00eeff', // 黑圈 试试修改为空值 或者将states整个注释掉
                lineWidth:0,
                border:0
                }
            }
		}
        	}
	 	},//去边框
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: [    
    {
    	lineColor:'#5a5a5d',
        lineWidth:1,
        tickLength:0,//x轴竖刻度线
        categories: chart1x,
        crosshair: true
    }],
    yAxis: [
   
    { // Primary yAxis
 min:0,
    labels: {
        format: '{value}',
        style: {
            color:'#5a5a5d'
        }
    },
    title: {
        text: '',
        style: {
            color: '#5a5a5d'
        }
    }
    }, { // Secondary yAxis
    	max:100,min:0,
        title: {
            text: '',               
        },
        labels: {
            format: '{value} %',
            style: {
                color:'#5a5a5d'
            }
        },
        opposite: true
    }],
    tooltip: {
        style: {display:"none"}
    },   
        series: [{
            name: '通报单',showInLegend: false,
            type: 'column',
//          yAxis: 1,
            data: chart1y1,
            color:'#6f85f2',
            tooltip: {
                valueSuffix: '张'
            }
        }, {
            name: '完成率',showInLegend: false,color:'#00eeff',
            type: 'line',
            yAxis: 1,
            data: chart1y2,
            tooltip: {
                valueSuffix: '%'
            }
        }]
});
}

//漏洞
function chart6(){
 $('#chart6').highcharts({
 	 credits: { enabled: false //不显示LOGO 
	},
 	chart: {
 		type: 'scatter',
 		zoomType: 'xy',
 		backgroundColor:'none',
        zoomType: 'x', //控制xy缩放
        	resetZoomButton: {
        		theme: {
        			style: {
        				display: 'none'
        			}
        		}
        	} 		
 	},
 	title: {
 		text: ''
 	},
 	subtitle: {
 		text: ''
 	},
 	xAxis: {
 		 labels:{ 
        step:1 
    }, 
 		title: {
 			enabled: true,
 			text: '次数'
 		},
        startOnTick: true,//显示前后一个值，数据点起始位置
        endOnTick: true,
        showLastLabel: true,
   		tickInterval: 1,
     		min:0,
// 		categories: [0,1,2,3,4,5,6,7],
   		allowDecimals: false,  	//显示为整数
   		lineColor:'#5a5a5d',
        lineWidth:1,
        tickLength:0,//x轴竖刻度线
 	},
 	yAxis: {
 		title: {
 			text: '网站数量'
 		},
// 		categories: [1,2,3,4,5,6,7,8,9,10],
        min: 0,allowDecimals: false, //控制数轴是否显示小数
        gridLineWidth:0,//隐藏横线0
        lineWidth:1,
        lineColor:'#5a5a5d',
        allowDecimals:false, //是否允许刻度有小数
 	},
 	plotOptions: {
 		column: {
 			pointPadding: 0.1,
 			borderWidth: 0,
 		},
 		series: {
 			cursor: 'pointer',
 			events: {
 				click: function(e) {	
                	$('#top2').text(e.point.index+1);
                	$('#topname2').text(chart2x[e.point.index]);
					$('#sheet6').text(e.point.y);
					$('#overdue6').text(e.point.x);
 				}
 			},
 			marker: {
 				radius: 6, //曲线点半径，默认是4圆点大小
 				symbol: 'circle',
 				fillColor: '#ff3f3a',
 				lineColor: '#ff3f3a',
 				lineWidth: 0,
 				border: 0
 			}
 		}
 	},
 	tooltip: {
 		style: {
 			display: "none"
 		}
 	},
 	series: [{
 		name: '',
 		showInLegend: false,
 		color:'#fd3f3f',
 		data: 
   		chart2y1
 	}]
 });
}


//折线图
function chart7(){
	$('#sheet7').text(alltotal3);
	$('#chart7').highcharts({
		 credits: { enabled: false //不显示LOGO 
	},
    chart: {      
        backgroundColor: 'none', //背景色
//      zoomType: 'x', //控制xy缩放
        	resetZoomButton: {
        		theme: {
        			style: {
        				display: 'none'
        			}
        		}
        	}
    },		
    title: {text: ''},
    subtitle: {text: ''},
    chart: {backgroundColor:'none'},//背景色
    plotOptions: {series: {
    		cursor: 'pointer', 
            events: { 
                click: function(e) { 
                	var i=e.point.x;//获取点击x坐标序列0开始
                	if(chart3y1[i]==undefined){chart7y1[i]=0}
                	if(chart3y2[i]==undefined){chart7y2[i]=0}
                	$('#overdue7').text(chart3y1[i]);//通报单
                	$('#sheet7').text(chart3y2[i]);//完成率
                } 
            } ,
    		 marker:{ 
		        radius:4,  //曲线点半径，默认是4圆点大小
		        symbol:'circle',
//		        fillColor:'#00eeff',
		        lineColor:'rgba(0,0,0,0)',
		        lineWidth:0,
		        border:0,		
		},
   },
   //数据字体大小
    line: {
        	dataLabels: 
        	{enabled: true,
        	style: {color: 'red',
        	textShadow:'none',
        	fontSize:'16px',
        	display:'none'//隐藏圆点上数据
        	}
        	}
    	},
   column: {pointPadding: 0,borderWidth: 0}
   },
    xAxis: {
    //gridLineWidth:1,gridLineColor:'red',//x横线样式
    lineColor:'#5a5a5d',	lineWidth:1,
    tickColor:'red',tickLength:0,//x轴竖刻度线    
    categories: chart3x,
    labels: {style: {color: '#5a5a5d'}},
    },
    
    yAxis: {
    	gridLineWidth:1,//隐藏横线0
    	gridLineColor:'#5a5a5d',
        title:{text:'次数'},
//      tickPixelInterval:20,//间隔
		labels:{style:{color:'#5a5a5d'},
		allowDecimals:false, //是否允许刻度有小数
		enabled: true//显示y轴数字
		}
    },
     tooltip: {style: {display:"none"}},
    series: [{
        name: '',color: "#ffb20d",showInLegend: false,
        data: chart3y1
        },
		{
        name: '',color: "#68ba67",showInLegend: false,
            data: chart3y2
			}
]
})
}


//中断
function chart8(){
	$('#sheet8').text(alltotal4);
	$('#chart8').highcharts({
		 credits: { enabled: false //不显示LOGO 
	},
    chart: {      
        backgroundColor: 'none', //背景色
//      zoomType: 'x', //控制xy缩放
        	resetZoomButton: {
        		theme: {
        			style: {
        				display: 'none'
        			}
        		}
        	}
    },		
    title: {text: ''},
    subtitle: {text: ''},
    chart: {backgroundColor:'none'},//背景色
    plotOptions: {series: {
    		cursor: 'pointer', 
            events: { 
                click: function(e) { 
                	var i=e.point.x;//获取点击x坐标序列0开始
                	if(chart4y1[i]==undefined){chart4y1[i]=0}
                	if(chart4y2[i]==undefined){chart4y2[i]=0}
                	$('#sheet8').text(chart4y2[i]);//通报单
                	$('#overdue8').text(chart4y1[i]);//完成率
                } 
            } ,
    		 marker:{ 
		        radius:4,  //曲线点半径，默认是4圆点大小
		        symbol:'circle',
		        lineColor:'rgba(0,0,0,0)',
		        lineWidth:0,
		        border:0,		
		},
   },
   //数据字体大小
    line: {
        	dataLabels: 
        	{enabled: true,
        	style: {color: 'red',
        	textShadow:'none',
        	fontSize:'16px',
        	display:'none'//隐藏圆点上数据
        	}
        	}
    	},
   column: {pointPadding: 0,borderWidth: 0}
   },
    xAxis: {
    lineColor:'#5a5a5d',	lineWidth:1,
    tickColor:'red',tickLength:0,//x轴竖刻度线    
    categories: chart4x,
    labels: {style: {color: '#5a5a5d'}},
    }, 
    yAxis: {
    	gridLineWidth:1,//隐藏横线0
    	gridLineColor:'#5a5a5d',
        title:{text:'次数'},
        allowDecimals:false, //是否允许刻度有小数
//      tickPixelInterval:20,//间隔
		labels:{style:{color:'#5a5a5d'},
		enabled: true//显示y轴数字
		}
    },
     tooltip: {style: {display:"none"}},
    series: [{
        name: '',color: "#ffb20d",showInLegend: false,
        data: chart4y1
        },
		{
        name: '',color: "#68ba67",showInLegend: false,
            data: chart4y2
			}
]
})
}
