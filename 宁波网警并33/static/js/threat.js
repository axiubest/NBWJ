/**
 * author:申屠
 */

//点击变色
function color(){
	$(".info li").click(function(){
$(this).each(function(){
$(this).addClass('active')
});
});
}

//动态一次点击变色
//$(".info li").one("click", function() {
//	$(this).each(function() {
//		$(this).addClass('active')
//	});
//});
