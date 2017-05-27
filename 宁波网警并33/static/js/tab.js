function nTabs(thisObj, Num) {
	
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
	if (thisObj.className == "active")
		return;
	for (i = 0; i < tabList.length; i++) {
		if (i == Num) {
			thisObj.className = "active";
			document.getElementById(tabObj+ i).style.display = "block";
		} else {
			tabList[i].className = "normal";
			document.getElementById(tabObj+ i).style.display = "none";
		}
	}
}

