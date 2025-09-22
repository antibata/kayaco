/**
* Declaration variables
*/
var selectedTab = "";
var screenHeight = window.screen.availHeight;
var screenWidth = window.screen.availWidth;
var colorDepth = window.screen.colorDepth;
var timeNow = new Date();
var referrer = escape(document.referrer);
var windows, mac, linux;
var ie, op, moz, misc, browsercode, browsername, browserversion, operatingsys;
var dom, ienew, ie4, ie5, ie6, moz_rv, moz_rv_sub, ie5mac, ie5xwin, opnu, op4, op5, op6, op7, saf, konq;
var appName, appVersion, userAgent;
var appname = navigator.appName;
var appVersion = navigator.appVersion;
var userAgent = navigator.userAgent.toLowerCase();
var title = document.title;
var checktoggle = 1;
var DOMBROWSER = "default";
var loadedStates = new Array();
var followupStates = new Array();

windows = (appVersion.indexOf('Win') != -1);
mac = (appVersion.indexOf('Mac') != -1);
linux = (appVersion.indexOf('Linux') != -1);

/**
* DOM Compatible?
*/
if (!document.layers)
{
	dom = (document.getElementById ) ? document.getElementById : false;
} else {
	dom = false;
}

if (document.getElementById)
{
	DOMBROWSER = "default";
} else if (document.layers) {
	DOMBROWSER = "NS4";
} else if (document.all) {
	DOMBROWSER = "IE4";
}

misc=(appVersion.substring(0,1) < 4);
op=(userAgent.indexOf('opera') != -1);
moz=(userAgent.indexOf('gecko') != -1);
ie=(document.all && !op);
saf=((userAgent.indexOf('safari') != -1) || (navigator.vendor == "Apple Computer, Inc."));
konq=(userAgent.indexOf('konqueror') != -1);

if (op) {
	op_pos = userAgent.indexOf('opera');
	opnu = userAgent.substr((op_pos+6),4);
	op5 = (opnu.substring(0,1) == 5);
	op6 = (opnu.substring(0,1) == 6);
	op7 = (opnu.substring(0,1) == 7);
} else if (moz){
	rv_pos = userAgent.indexOf('rv');
	moz_rv = userAgent.substr((rv_pos+3),3);
	moz_rv_sub = userAgent.substr((rv_pos+7),1);
	if (moz_rv_sub == ' ' || isNaN(moz_rv_sub)) {
		moz_rv_sub='';
	}
	moz_rv = moz_rv + moz_rv_sub;
} else if (ie){
	ie_pos = userAgent.indexOf('msie');
	ienu = userAgent.substr((ie_pos+5),3);
	ie4 = (!dom);
	ie5 = (ienu.substring(0,1) == 5);
	ie6 = (ienu.substring(0,1) == 6);
}

if (konq) {
	browsercode = "KO";
	browserversion = appVersion;
	browsername = "Knoqueror";
} else if (saf) {
	browsercode = "SF";
	browserversion = appVersion;
	browsername = "Safari";
} else if (op) {
	browsercode = "OP";
	if (op5) {
		browserversion = "5";
	} else if (op6) {
		browserversion = "6";
	} else if (op7) {
		browserversion = "7";
	} else {
		browserversion = appVersion;
	}
	browsername = "Opera";
} else if (moz) {
	browsercode = "MO";
	browserversion = appVersion;
	browsername = "Mozilla";
} else if (ie) {
	browsercode = "IE";
	if (ie4) {
		browserversion = "4";
	} else if (ie5) {
		browserversion = "5";
	} else if (ie6) {
		browserversion = "6";
	} else {
		browserversion = appVersion;
	}
	browsername = "Internet Explorer";
}

if (windows) {
	operatingsys = "Windows";
} else if (linux) {
	operatingsys = "Linux";
} else if (mac) {
	operatingsys = "Mac";
} else {
	operatingsys = "Unkown";
}

function browserObject(objid)
{
	if (DOMBROWSER == "default")
	{
		return document.getElementById(objid);
	} else if (DOMBROWSER == "NS4") {
		return document.layers[objid];
	} else if (DOMBROWSER == "IE4") {
		return document.all[objid];
	}
}

// This is IE4 legacy, and it causes problems in IE8
// Testing remove; if no problems by 3.60, TODO REMOVE
//
// ======= KEYBOARD SHORTCUTS =======
//if (window.Event)
//{
//	document.captureEvents(Event.KEYDOWN);
//}
document.onkeydown = keyHandler;

var isTicketList = false;
var isTicketPage = false;

function keyHandler(e)
{
	var isShift = isCtrl = false;

	var eventSrc = null;

	if (!window.event)
	{
		if (e.altKey == true) {
			return true;
		}

		if (e.shiftKey == true)
		{
			isShift = true;
		} else if (e.ctrlKey == true) {
			isCtrl = true;
		}

		keyPress = e.which;

		try {
			if (e.srcElement) {
				eventSrc = e.srcElement;
			} else if (e.target) {
				eventSrc = e.target;
			}
		} catch (e) {

		}
	} else {
		if (window.event.altKey == true)
		{
			return true;
		} else if (window.event.shiftKey == true) {
			isShift = true;
		} else if (window.event.ctrlKey == true) {
			isCtrl = true;
		}

		keyPress = window.event.keyCode;

		try {
			if (window.event.srcElement) {
				eventSrc = window.event.srcElement;
			} else if (window.event.target) {
				eventSrc = window.event.target;
			}
		} catch (e) {

		}
	}

	keyPressChar = String.fromCharCode(keyPress);

	if (isCtrl && isTicketPage && keyPress == 13)
	{
		if (selectedTab == "ttpostreply")
		{
			document.replyform.submit();
		} else if (selectedTab == "ttforward") {
			document.forwardform.submit();
		} else if (selectedTab == "ttfollowup") {
			document.followupform.submit();
		} else if (selectedTab == "ttrelease") {
			document.releaseform.submit();
		} else if (selectedTab == "ttbilling") {
			document.billingform.submit();
		} else if (selectedTab == "ttaddnotes") {
			document.noteform.submit();
		}

		return true;
	}

	if (isCtrl && keyPress == 69 && isTicketPage == true)
	{
		setTimeout('focusIRS()', 100);

		return true;
	}

	// Loop through DOM Nodes
	for (var eHandler = eventSrc; eHandler != null; eHandler = eHandler.parentNode) {
		if (eHandler.nodeName == "TEXTAREA" || eHandler.nodeName == "SELECT" || eHandler.nodeName == "INPUT" || eHandler.nodeName == "BUTTON") {
			return true;
		}
	}

	// Ticket List + Shift + ] = Previous Department
	if (isTicketList == true && isShift == true && keyPress == 221)
	{


	// Ticket List + Shift + [ = Next Department
	} else if (isTicketList == true && isShift == true && keyPress == 219) {


	// Ticket List + Shift + | = View All
	} else if (isTicketList == true && isShift == true && keyPress == 220) {
	

	// Search Keywords
	} else if (isShift == true && keyPressChar == "S" && (isTicketList == true || isTicketPage == true)) {
		CustomPopup('ticketsearch', e, 'linkticketsearch', 'ticketsearch');
		setTimeout('document.tiqform.query.focus();', 400);
	// Search Ticket ID
	} else if (isShift == true && keyPressChar == "T" && (isTicketList == true || isTicketPage == true)) {
		CustomPopup('ticketsearch', e, 'linkticketsearch', 'ticketsearch');
		setTimeout('document.tidform.ticketid.focus();', 400);
	} else if (isShift == true && keyPressChar == "K") {
		setTimeout('focusIRS()', 100);
	} else if (isShift == true && keyPressChar == "P" && isTicketPage == true) {
		switchGridTab('ttpostreply', 'tickets');
		setTimeout('document.replyform.replycontents.focus();', 400);
	} else if (isShift == true && keyPressChar == "G" && isTicketPage == true) {
		switchGridTab('ttgeneral', 'tickets')
	} else if (isShift == true && keyPressChar == "F" && isTicketPage == true) {
		switchGridTab('ttforward', 'tickets');
		fetchData('forward', ticketPageTicketID);
	} else if (isShift == true && keyPressChar == "U" && isTicketPage == true) {
		switchGridTab('ttfollowup', 'tickets');
		
		if (!loadedStates["followup"])
		{
			fetchData('followup', ticketPageTicketID);
		}
	} else if (isShift == true && keyPressChar == "B" && isTicketPage == true) {
		switchGridTab('ttbilling', 'tickets');
		fetchData('billing', ticketPageTicketID);
	} else if (isShift == true && keyPressChar == "N" && isTicketPage == true) {
		switchGridTab('ttaddnotes', 'tickets');
		fetchData('addnotes', ticketPageTicketID);
	} else if (isShift == true && keyPressChar == "R" && isTicketPage == true) {
		switchGridTab('ttrelease', 'tickets');
		fetchData('release', ticketPageTicketID);
	} else if (isShift == true && keyPressChar == "H" && isTicketPage == true) {
		switchGridTab('tthistory', 'tickets');
		//fetchData('history', ticketPageTicketEmail); // user emails can  be empty we now try with username
		fetchData('history', ticketPageTicketUserID);
	// Shift + ->
	} else if (isShift == true && keyPress == 39 && isTicketPage == true) {
		window.location.href = swiftpath+ "staff/index.php?_m=tickets&_a=ticketactions&action=jump&t=next&ticketid="+ticketPageTicketID;
	// Shift + -<
	} else if (isShift == true && keyPress == 37 && isTicketPage == true) {
		window.location.href = swiftpath+ "staff/index.php?_m=tickets&_a=ticketactions&action=jump&t=previous&ticketid="+ticketPageTicketID;
	}


//	alert(keyPress);
}

function displayObject(objid)
{
	result = browserObject(objid);
	if (!result)
	{
		alert("Invalid Display Object: "+objid+"\nPlease make sure that all correct display objects are on the page");
		return;
	}

	result.style.display = "";
}

function hideObject(objid)
{
	result = browserObject(objid);
	if (!result)
	{
		alert("Invalid Display Object: "+objid+"\nPlease make sure that all correct display objects are on the page");
		return;
	}

	result.style.display = "none";
}

function displayTicketEdit() {
	displayObject('ticketedit');
	displayObject('ticketsubmit');
	hideObject('tickettext');
}

function hideTicketEdit() {
	hideObject('ticketedit');
	hideObject('ticketsubmit');
	displayObject('tickettext');
}

function switchDisplay(objid)
{
	result = browserObject(objid);
	if (!result)
	{
		alert("Invalid Display Object: "+objid+"\nPlease make sure that all correct display objects are on the page");
		return;
	}

	if (result.style.display == "none")
	{
		result.style.display = "";
	} else {
		result.style.display = "none";
	}
}

function blurObject(objid) {
	var objM = browserObject(objid);
	if (objM)
	{
		objM.blur();
	}
}

function displayGridTabData(gridname, dodisplay) {
	if (dodisplay)
	{
		displayObject("gridtableopt"+gridname);
	} else {
		switchDisplay("gridtableopt"+gridname);
	}
	hideTab("massaction");
	hideTab("search");
	hideTab("settings");
}

function displayTab(objid) {
	if (objid != "addresscards" && objid != "detailedcards")
	{
		result = browserObject("tab_"+objid);
		if (!result)
		{
	//		alert("Invalid Display Object: "+objid+"\nPlease make sure that all correct display objects are on the page");
			return;
		}

		result.style.display = "";
	}

	resultlink = browserObject(objid);
	if (!resultlink)
	{
		return;
	}
	resultlink.className = "currenttab";
}

function hideTab(objid) {
	if (objid != "addresscards" && objid != "detailedcards")
	{
		var result = browserObject("tab_"+objid);
		if (!result)
		{
	//		alert("Invalid Display Object: "+objid+"\nPlease make sure that all correct display objects are on the page");
			return;
		}

		result.style.display = "none";
	}
	resultlink = browserObject(objid);
	if (!resultlink)
	{
		return;
	}
	resultlink.className = "";
}

function iif(cond, success, failure) {
	return cond ? success : failure;
}

function switchGridTab(object, tabgroup) {
	if (tabgroup == "gridoptions")
	{
		var gridtabs = new Array("search", "massaction", "settings");
		hideTabObj(object, gridtabs);
	} else if (tabgroup == "tickets") {
		selectedTab = object;
		var tickettabs = new Array("ttgeneral", "ttpostreply", "ttforward", "ttfollowup", "ttaddnotes", "ttbilling", "tthistory", "ttlog", "ttedit", "ttrelease", "ttlschats");
		hideTabObj(object, tickettabs);
	} else if (tabgroup == "teamwork") {
		selectedTab = object;
		var twtabs = new Array("twday", "twworkweek", "twweek", "twmonth");
		hideTabObj(object, twtabs);
	} else if (tabgroup == "contacts") {
		selectedTab = object;
		var cltabs = new Array("addresscards", "detailedcards");
		hideTabObj(object, cltabs);
	} else if (tabgroup == "contactform") {
		selectedTab = object;
		var cftabs = new Array("clgeneral", "clbusiness", "clpersonal", "clmisc", "cltickets", "clchats", "clcustom");
		hideTabObj(object, cftabs);
	} else if (tabgroup == "eventform") {
		selectedTab = object;
		var cftabs = new Array("efgeneral", "efmisc", "efcustom");
		hideTabObj(object, cftabs);
	} else if (tabgroup == "taskform") {
		selectedTab = object;
		var cftabs = new Array("tfgeneral", "tfmisc", "tfcustom");
		hideTabObj(object, cftabs);
	} else if (tabgroup == "userform") {
		selectedTab = object;
		var cftabs = new Array("suedit", "sutickets", "suchats", "suticketreports");
		hideTabObj(object, cftabs);
	}
}

function hideTabObj(showtab, tablist) {
	displayTab(showtab);
	for (i=0;i<tablist.length;i++)
	{
		if (tablist[i] != showtab)
		{
			hideTab(tablist[i]);
		}
	}
}


function hideTabOn(objid, displaytype) {
	result = browserObject(objid);
	if (!result)
	{
		alert("Invalid Display Object: "+objid+"\nPlease make sure that all correct display objects are on the page");
		return;
	}

	if (result.style.display == "none")
	{
		// hidden
		hideTab("search");
		hideTab("massaction");
		hideTab("settings");
	} else {
		if (displaytype == "search")
		{
			displayTab("search");
		} else if (displaytype == "settings") {
			displayTab("settings");
		} else {
			displayTab("massaction");
		}
	}
}

function toggleAll(formname) {
	var currForm = formname;
	var isChecked = checktoggle;
	var itercount = 1;
	var trassignid;

	if (checktoggle == 1) {
		checktoggle = 0;
	} else {
		checktoggle = 1;
	}

	for (var elementIdx=0; elementIdx<currForm.elements.length; elementIdx++) {
		if (!currForm.elements)
		{
			break;
		}

		if (currForm.elements[elementIdx].type == 'checkbox') {
			currForm.elements[elementIdx].checked = isChecked;
		} else if (currForm.elements[elementIdx].type == 'hidden') {
			hidval = currForm.elements[elementIdx].name;

			if (hidval.substr(0, 13) == 'itemhighlight')
			{
				trassignid = hidval.substr(13, hidval.length);
				currForm.elements[elementIdx].value = isChecked;
				highlightTR("trid"+trassignid, isChecked, itercount);
				itercount++;
			}
		}
	}
}

function highlightTR(element, isChecked, ditercount){

	var mgobj = browserObject(element);
	if (!mgobj)
	{
		return;
	}
		
	var altdecide = ditercount%2;

	if (isChecked == 1)
	{
		mgobj.className="rowselect";
	} else {	
		if (altdecide == 0)
		{
			mgobj.className="row1";
	} else {
			mgobj.className="row2";
		}
	}
}

function showHighlight(name)
{
	if (name.className != "rowselect")
	{
		name.style.backgroundColor = "";
		name.className = 'rowhighlight';
	}
}

function clearHighlight(name, classname, bgcolor)
{
	if (name.className != "rowselect")
	{
		name.style.backgroundColor = bgcolor;
		name.className = classname;
	}
}

function doConfirm(question,url) {
	var x = confirm(question);
	if (x) {
		window.location.href = url;
	}
}

function submitGridForm(dosubmit)
{
	if (dosubmit)
	{
		document.ticketlistform.submit();
	}
	return true;
}

function doFormConfirm(confirmmessage, object) {
	if (object.value == "")
	{
		return false;
	}

	var x = confirm(confirmmessage);
	if (x) {
		object.form.submit();
		return true;
	}

	return false;
}

function selectjump(object){
	object.form.submit();
	return true;
}

function htmlize(str){
        str = str.replace(/\&/g,"&amp;");
        str = str.replace(/\</g,"&lt;");
        str = str.replace(/\>/g,"&gt;");
        str = str.replace(/\"/g,"&quot;");
        str = str.replace(/\n/g,"<br/>\n");
        return str;
}

function preloadImages() {
    if (document.images) {
        var imgFiles = arguments;
        if (document.preloadArray == null) {
            document.preloadArray = new Array();
        }
        var i = document.preloadArray.length;
        with (document) {
            for (var j = 0; j < imgFiles.length; j++) {
                if (imgFiles[j].charAt(0) != "#") {
                    document.preloadArray[i] = new Image();
                    document.preloadArray[i++].src = imgFiles[j];
                }
            }
        }
    }
}

/**
* MENU TAB RELATED FUNCTIONS
*/
function switchTabClass(tabname, classname) {
	var t_tab = browserObject(tabname);
	if (t_tab)
	{
		t_tab.className = classname;
	}
}

function resetTabDefault() {
	var tabClass = "menusectiondefault";
	if (swiftiswinapp == "1")
	{
		tabClass = "menusectionwinapp";
	}
	for (i = 1; i <= 10; i++)
	{
		switchTabClass("tb_menusection"+i, tabClass);
	}
}

function switchTab(tabitem, classid) {
	var t_ml = browserObject("tb_menuline");
	var t_mlnk = browserObject("tb_menulinks");
	var t_md = browserObject("linksdiv");

	t_md.innerHTML = menulinks[tabitem];
	t_ml.className = "menuline"+classid;
	t_mlnk.className = "menulinks"+classid;
	t_md.className = "menulinks"+classid;

	resetTabDefault();
	switchTabClass("tb_menusection"+tabitem, "menusection"+classid);
}

function LoadBarMenu(obj, tdobj){
	if(document.getElementById){
	var el = document.getElementById(obj);
	var ar = document.getElementById("parent").getElementsByTagName("span");
		if(el.style.display != "block"){
			for (var i=0; i<ar.length; i++){
				if (ar[i].className=="BarOptions" || ar[i].className=="BarOptionsDisplay")
				ar[i].style.display = "none";
			}
			el.style.display = "block";
		}else{
			el.style.display = "none";
		}
	}

	if (tdobj)
	{
		tdobj.style.background='#FFFFFF';
	}
}

function navigateWindow(navlocation) {
	window.location.href = navlocation;
}

function doRand()
{
	var num;
	now=new Date();
	num=(now.getSeconds());
	num=num+1;
	return num;
}

function popupInfoWindow(url) {
	screen_width = screen.width;
	screen_height = screen.height;
	widthm = (screen_width-400)/2;
	heightm = (screen_height-500)/2;
	window.open(url,"infowindow"+doRand(), "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=400,height=500,left="+widthm+",top="+heightm);
}

function popupSmallWindow(url) {
	screen_width = screen.width;
	screen_height = screen.height;
	widthm = (screen_width-400)/2;
	heightm = (screen_height-300)/2;
	window.open(url,"infowindow"+doRand(), "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=400,height=300,left="+widthm+",top="+heightm);
}

function changeImage(imgid, newpath)
{
	imgObj = browserObject(imgid);
	if (imgObj)
	{
		imgObj.src = newpath;
	}
}

function popupDataWindow(url) {
	screen_width = screen.width;
	screen_height = screen.height;
	widthm = (screen_width-700)/2;
	heightm = (screen_height-600)/2;
	window.open(url,"datawindow"+doRand(), "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=700,height=600,left="+widthm+",top="+heightm);
}

function changeColorTable(inputname, value) {
	tableid = browserObject("color"+inputname);
	
	tableid.style.backgroundColor = value;
	return true;
}

function enableField(field) {
	if (document.all || document.getElementById) {
		field.disabled = false;
	}
}

function disableField(field) {
	if (document.all || document.getElementById) {
		if (!field)
		{
			return;
		}
		field.disabled = true;
	}
}

function initEditor() {
	htmlAreaLoaded = true;

	editor = new HTMLArea("contents");
	var config = editor.config;
	config.pageStyle = 'body { font-family: Verdana, Sans-Serif; font-size: 12px; } ';
	config.statusBar = false;
	config.toolbar = [
		[ "fontname", "space",
		  "fontsize", "space",
		  "formatblock", "space",
		  "bold", "italic", "underline", "strikethrough", "separator",
		  "subscript", "superscript", "separator",
		  "copy", "cut", "paste", "space", "undo", "redo", "space"],

		[ "justifyleft", "justifycenter", "justifyright", "justifyfull", "separator",
		  "lefttoright", "righttoleft", "separator",
		  "orderedlist", "unorderedlist", "outdent", "indent", "separator",
		  "forecolor", "hilitecolor", "separator",
		  "inserthorizontalrule", "createlink", "insertimage", "inserttable", "htmlmode"]
	];
	if (loadTablePlugin == true)
	{
//		editor.registerPlugin("TableOperations");
	}
	editor.registerPlugin("ContextMenu");
	editor.generate();
	return false;
}

function clearAllMenus(doignore) {
	return;

	if (!window.CMenuList)
	{
		return;
	}
	for (var i = 0;i<window.CMenuList.length;i++)
	{
		var itemKey = window.CMenuList[i];
		if ((window.CMenuClick == false || doignore == true) && window.CMenus[itemKey].isover == false)
		{
			window.CMenus[itemKey].cancelQueued();
			window.CMenus[itemKey]._setVisibility(false);
//			window.CMenus[itemKey].showLevel(null, 0);
		}
	}
}

function listMoveItem(from, to)
{
	var f;
	var SI;

	from = document.forms["viewform"][from];
	to = document.forms["viewform"][to];

	if (from.options.length > 0)
	{
		for (i=0;i<from.length;i++)
		{
			if (from.options[i].selected)
			{
				SI = from.selectedIndex;
				f = from.options[SI].index;
				to.options[to.length] = new Option(from.options[SI].text,from.options[SI].value);
				from.options[f] = null;
				i--;
			}
		}
	}
}

function listMoveUpList(listField) {
	listField = document.forms["viewform"][listField];

	if ( listField.length == -1)
	{
//		alert("There are no values which can be moved!");
	} else {
		var selected = listField.selectedIndex;
		if (selected == -1)
		{
//			alert("You must select an entry to be moved!");
		} else {
			if (listField.length == 0 )
			{
//				alert("There is only one entry!\nThe one entry will remain in place.");
			} else {
				if ( selected == 0 ) {
//					alert("The first entry in the list cannot be moved up.");
				} else {
					var moveText1 = listField[selected-1].text;
					var moveText2 = listField[selected].text;
					var moveValue1 = listField[selected-1].value;
					var moveValue2 = listField[selected].value;
					listField[selected].text = moveText1;
					listField[selected].value = moveValue1;
					listField[selected-1].text = moveText2;
					listField[selected-1].value = moveValue2;
					listField.selectedIndex = selected-1;
				}
			}
		}
	}
}

function listMoveDownList(listField) {
	listField = document.forms["viewform"][listField];

	if (listField.length == -1) {
//		alert("There are no values which can be moved!");
	} else {
		var selected = listField.selectedIndex;
		if (selected == -1) {
//			alert("You must select an entry to be moved!");
		} else {
			if ( listField.length == 0 ) {
//				alert("There is only one entry!\nThe one entry will remain in place.");
			} else {
				if ( selected == listField.length-1 ) {
//					alert("The last entry in the list cannot be moved down.");
				} else {
					var moveText1 = listField[selected+1].text;
					var moveText2 = listField[selected].text;
					var moveValue1 = listField[selected+1].value;
					var moveValue2 = listField[selected].value;
					listField[selected].text = moveText1;
					listField[selected].value = moveValue1;
					listField[selected+1].text = moveText2;
					listField[selected+1].value = moveValue2;
					listField.selectedIndex = selected+1;
				}
			}
		}
	}
}

function processViewForm() {
	leftField = document.forms["viewform"]["leftfields[]"];
	mainField = document.forms["viewform"]["fields[]"];

	if (leftField.options.length > 0)
	{
		for (i=0;i<leftField.length;i++)
		{
			leftField.options[i].selected = true;
		}
	}
	if (mainField.options.length > 0)
	{
		for (i=0;i<mainField.length;i++)
		{
			mainField.options[i].selected = true;
		}
	}

	return true
}

function refreshPage() {
	//window.location.reload(true);
	window.location.href = swiftpath+"staff/index.php?_m=tickets&_a=manage";
}

function absX(o) {
	if (o == document.body) return 0;
	var x = o.offsetLeft;
	if (o.offsetParent && o.offsetParent != o)
		x += absX(o.offsetParent);
	return x;
}

function absX2(o, dotype) {
	if (o == document.body) return 0;

	var x = o.offsetLeft;
	if (dotype == 1)
	{
		x += o.offsetWidth;
	}

	if (o.offsetParent && o.offsetParent != o)
		x += absX2(o.offsetParent, 0);
	return x;
}

function absY(o) {
	if (o == document.body) return 0;
	var y = o.offsetTop;
	if (o.offsetParent && o.offsetParent != o)
		y += absY(o.offsetParent);
	return y;
}

function absY2(o, dotype) {
	if (o == document.body) return 0;
	var y = o.offsetTop;
	if (dotype == 1)
	{
		y += o.offsetHeight;
	}
	if (o.offsetParent && o.offsetParent != o)
		y += absY2(o.offsetParent, 0);
	return y;
}

function CustomOver(text, id, id2) {
	var o1 = browserObject(id); var o2 = browserObject(id2);
	if (!o1 || !o2)
	{
		return;
	}

//	return overlib(text, RELX, absX(o1), RELY, absY2(o2, 1), WIDTH, 300, FGCLASS, "stickyfg", BGCLASS, "stickybg", TEXTFONTCLASS, "stickyfont", CAPTIONFONTCLASS, "stickyfont", CLOSEFONTCLASS, "stickyfont");
	return overlib(text, FOLLOWMOUSE, WIDTH, 300, FGCLASS, "stickyfg", BGCLASS, "stickybg", TEXTFONTCLASS, "stickyfont", CAPTIONFONTCLASS, "stickyfont", CLOSEFONTCLASS, "stickyfont");
}

function CustomPopup(menu, e, id, datam) {
	var o1 = browserObject(id), o2 = browserObject('popupRef');
	if (!o1 || !o2)
		return;

	CMenuPopUpXY(menu, absX(o1), absY(o2));
}

function CustomPopupRef(menu, e, id, datam, refobject, refvar) {
	if (!refvar)
	{
		return false;
	}

	var o1 = browserObject(id), o2 = browserObject(refobject);
	if (!o1 || !o2)
		return;

	if (menu == "tviewmenu" || menu == "tlabelmenu")
	{
		if (browsercode == "IE")
		{
			var minval = 1;
		} else {
			var minval = 1;
		}
		var yCord = absY2(o2, 1)-minval;
	} else if (menu == "kbcachemenu" || menu == "prcachemenu" || menu == "dlcachemenu" || menu == "fwquotemenu") {
		var yCord = absY2(o2, 1);
	} else {
		var yCord = absY(o2);
	}
	CMenuPopUpXY(menu, absX2(o1), yCord);
}

function CustomPopupRefRight(menu, id, refobject) {
	var o1 = browserObject(id), o2 = browserObject(refobject);
	if (!o1 || !o2)
		return;

	if (menu == "tviewmenu")
	{
		var yCord = absY(o2)-1;
	} else {
		var yCord = absY(o2);
	}
	CMenuPopUpXY(menu, absX2(o1, 1), yCord);
}

function mEventRef(m, node_index, e, refvar) {
	if (!refvar)
	{
		return false
	}
}

function hideMenu(menu) {
//	window.CMenus[menu].hide();
}

function storeCaret (textEl) {
	if (textEl.createTextRange) 
		textEl.caretPos = document.selection.createRange().duplicate();
}

function insertAtCaret (textEl, text) {
	if (textEl.createTextRange && textEl.caretPos) {
		var caretPos = textEl.caretPos;
		caretPos.text =
		caretPos.text.charAt(caretPos.text.length - 1) == ' ' ?
		text + '' : text;
	} else {
		textEl.value = textEl.value+ "" + text;
	}
}

var popupCalendar = null;

function showCalendar(id, format, showsTime, showsOtherMonths) {
	var el = document.getElementById(id);
	if (popupCalendar != null) {
		popupCalendar.hide();
	} else {
		var cal = new Calendar(1, null, calSelected, calCloseHandler);
		if (typeof showsTime == "string") {
			cal.showsTime = true;
			cal.time24 = (showsTime == "24");
		}
		if (showsOtherMonths) {
			cal.showsOtherMonths = true;
		}
		popupCalendar = cal;
		cal.setRange(1900, 2070);
		cal.create();
	}
	popupCalendar.setDateFormat(format);
	popupCalendar.parseDate(el.value);
	popupCalendar.sel = el;

	popupCalendar.showAtElement(el, "Br");

	return false;
}

function calSelected(cal, date) {
	cal.sel.value = date;
	if (cal.dateClicked && (cal.sel.id == "opt_due"))
	cal.callCloseHandler();
}

function calCloseHandler(cal) {
	cal.hide();
	popupCalendar = null;
}

// =========== XML HTTP REQUEST STUFF ==============
var xmlhttp;
var xmlaction = "";
var xmlsubset = "";

function AjaxAlert(nosupport)
{
  if (!nosupport)
  {
    alert("XMLHttpRequest::open failed!  This usually occurs due to the URL of your Kayako installation being different from the one specified under Admin CP >> Settings >> General.  Due to limitations inherent in AJAX, the product URL needs to be exactly the same as the one specified in the settings; this includes \"www.\" and trailing slashes.");
  }
  else
  {
    alert("Your browser does not have the JavaScript support required to use this application. Please make sure that full JavaScript support is enabled in your browser and that your browser is recent and up to date.");
  }
}

function loadXMLHTTPRequest(url)
{
  if (window.XMLHttpRequest)
  {
    // Not Internet Explorer
    try
    {
      xmlhttp = new XMLHttpRequest();
    }
    catch (e)
    {
      // Appears as if Ajax is not even supported.
      AjaxAlert(true);
    }
    
    if (xmlhttp)
    {
      xmlhttp.onreadystatechange = processStatusChange;
      
      try
      {
        xmlhttp.open("POST", url, true);
	    xmlhttp.send();		// SWIFTTHREE-217
      }
      catch (e)
      {
         AjaxAlert(false);
      }               
    }
  }
  else if (window.ActiveXObject)
  {
    // Internet Explorer
    try
    {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
      try
      {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e)
      {
        // Appears as if Ajax is not even supported.
        AjaxAlert(true);
      }
    }

    if (xmlhttp)
    {
      xmlhttp.onreadystatechange = processStatusChange;

      try
      {
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
      }
      catch (e)
      {
        AjaxAlert(false);
      }
    }
  }
}

var oldKeyword = "";
function processStatusChange() {
  try {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
			formname = getActiveFormName();
			if (xmlaction == "tp" && formname == "replyform")
			{
				switchGridTab('ttpostreply', 'tickets');
				document.replyform.replycontents.focus();
			}

			if (xmlaction == "kb" || xmlaction == "pr" || xmlaction == "tp" || xmlaction == "forwardquote" || xmlaction == "forwardquoteall")
			{
				if (selectedTab == 'ttrelease' || selectedTab == 'ttfollowup')
				{
					insertAtCaret(document.forms[formname].fureplycontents, xmlhttp.responseText);
				} else {
					insertAtCaret(document.forms[formname].replycontents, xmlhttp.responseText);
				}
			} else if (xmlaction == "updatestatusgeneralform" || xmlaction == "updatestatusreplyform" || xmlaction == "updatestatusreleaseform" || xmlaction == "updatestatusforwardform" || xmlaction == "updatestatusfollowupform") {
				statusObject = browserObject(xmlaction);
				if (statusObject)
				{
					var statuslist = new Array();
					var stafflist = new Array();
					var departmentlist = new Array();
//					alert(xmlhttp.responseText);
					eval(xmlhttp.responseText);

					statusSelectFieldObject = document.forms[statusFormName][statusPrefixName+"tt_ticketstatusid"];
					statusSelectFieldObject.options.length = 0;
					for (var loop=0; loop < statuslist.length; loop++) {
						statusSelectFieldObject.options[statusSelectFieldObject.length] = new Option(statuslist[loop][1],statuslist[loop][0]);
						if (statuslist[loop][3])
						{
							statusSelectFieldObject.options[statusSelectFieldObject.length-1].selected = true;
						}
					}
					statusSelectFieldObject.disabled = false;

					departmentSelectFieldObject = document.forms[statusFormName][statusPrefixName+"tt_departmentid"];
					departmentSelectFieldObject.options.length = 0;
					for (var loop=0; loop < departmentlist.length; loop++) {
						departmentSelectFieldObject.options[departmentSelectFieldObject.length] = new Option(departmentlist[loop][1],departmentlist[loop][0]);
						if (departmentlist[loop][3])
						{
							departmentSelectFieldObject.options[departmentSelectFieldObject.length-1].selected = true;
						}
					}
					departmentSelectFieldObject.disabled = false;

					staffSelectFieldObject = document.forms[statusFormName][statusPrefixName+"tt_staffid"];
					staffSelectFieldObject.options.length = 0;
					for (var loop=0; loop < stafflist.length; loop++) {
						staffSelectFieldObject.options[staffSelectFieldObject.length] = new Option(stafflist[loop][1],stafflist[loop][0]);
						if (stafflist[loop][3])
						{
							staffSelectFieldObject.options[staffSelectFieldObject.length-1].selected = true;
						}
					}
					staffSelectFieldObject.disabled = false;
					submitbutton1 = browserObject(statusFormName+'submit1');
					submitbutton2 = browserObject(statusFormName+'submit2');
					if (submitbutton1)
					{
						submitbutton1.disabled = false;
					}
					if (submitbutton2)
					{
						submitbutton2.disabled = false;
					}
				}
			} else if (xmlaction == "updatemassaction") {
				massActionObject = browserObject('maselectcontainer');
				if (massActionObject)
				{
					massActionObject.innerHTML = xmlhttp.responseText;
					ticketstatusfield = document.forms['ticketlist'].ma_ticketstatusid;
					departmentfield = document.forms['ticketlist'].ma_departmentid;
					staffidfield = document.forms['ticketlist'].ma_staffid;
					submitbutton = browserObject('gridsubmit1');
					if (submitbutton)
					{
						submitbutton.disabled = false;
					}
					ticketstatusfield.disabled = false;
					staffidfield.disabled = false;
					departmentfield.disabled = false;
				}
			} else if (xmlaction == "updatequeueticketstatus") {
				actionObject = browserObject('gridstatuscontainer');
				if (actionObject)
				{
					actionObject.innerHTML = xmlhttp.responseText;
					ticketstatusfield = document.forms['queueform'].ticketstatusid;
					departmentfield = document.forms['queueform'].departmentid;
					submitbutton = browserObject('submitbutton');
					if (submitbutton)
					{
						submitbutton.disabled = false;
					}

					ticketstatusfield.disabled = false;
					departmentfield.disabled = false;
				}
			} else if (xmlaction == "history" || xmlaction == "forward" || xmlaction == "followup" || xmlaction == "addnotes" || xmlaction == "edit" || xmlaction == "billing" || xmlaction == "release" || xmlaction == "lschats") {
				ticketDataObj = browserObject("tab_tt"+xmlaction);
				if (ticketDataObj)
				{
					ticketDataObj.innerHTML = xmlhttp.responseText;
					loadedStates[xmlaction] = true;
				}

				if (xmlaction == "addnotes")
				{
					setTimeout('document.noteform.notecontents.focus();', 100);
				} else if (xmlaction == "forward") {
					setTimeout('document.forwardform.opt_to.focus();', 100);
				} else if (xmlaction == "release") {
					setTimeout('document.releaseform.tt_staffid.focus();', 100);
				} else if (xmlaction == "billing") {
					setTimeout('document.billingform.tworked.focus();', 100);
				}
			} else if (xmlaction == "auditlog") {
				logObj = browserObject("tab_ttlog");
				if (logObj)
				{
					logObj.innerHTML = xmlhttp.responseText;
				}
			} else if (xmlaction == "followupss") {
				if (xmlsubset)
				{
					followupDataObj = browserObject(xmlsubset+"followupstore");
					if (followupDataObj)
					{
						followupDataObj.innerHTML = xmlhttp.responseText;
						followupStates[xmlsubset] = true;
					}
				}
			} else if (xmlaction == "userlookup") {
//				alert(xmlhttp.responseText);
				eval(xmlhttp.responseText);
			} else if (xmlaction == "twday" || xmlaction == "twworkweek" || xmlaction == "twweek" || xmlaction == "twmonth") {
				tabObj = browserObject("tab_"+xmlaction);
				if (tabObj)
				{
					tabObj.innerHTML = xmlhttp.responseText;
				}
			} else if (xmlaction == "addresscards" || xmlaction == "detailedcards") {
				tabObj = browserObject("contactscontainer");
				if (tabObj)
				{
					tabObj.innerHTML = xmlhttp.responseText;
					recalcContactHeight();
					document.realtimesearch.searchquery.focus();
				}
			} else if (xmlaction == "cltickets" || xmlaction == "clchats" || xmlaction == "sutickets" || xmlaction == "suchats" || xmlaction == "suticketreports") {
				tabObj = browserObject("tab_"+xmlaction);
				if (tabObj)
				{
					tabObj.innerHTML = xmlhttp.responseText;
				}
			} else if (xmlaction == "kbirs" && window.$IRS.isThreadRunning == true && xmlhttp.responseText != "") {
				window.$IRS.render(xmlhttp.responseText);
			} else if (xmlaction == "kbirs") {
				window.$IRS.changeSearchBoxClass('staffcpirs');
			}
		} else {
			alert("There was a problem retrieving the XML data from Server:\n" +xmlhttp.statusText);
		}
	}

  }	catch (e)
  {
    // Ajax object .status threw an exception.
    // KACT 5/pages/357
    // For the case when the ticket UI is being refreshed (department + status lists), if the ajax request fails,
    // we show an alert here.
    if (xmlaction == "updatestatusgeneralform" || xmlaction == "updatestatusreplyform" || xmlaction == "updatestatusreleaseform" || xmlaction == "updatestatusforwardform")
    {
        alert("A network connection to the server could not be established.  Please check your connection to the Internet, then refresh this page.");
    }
  }
}

function windowPlaceEmail(email, formname, formfield)
{
	if (!window.opener)
	{
		alert("Couldnt find window opener. Unable to append email");
		return;
	}

	var fieldValue = window.opener.document.forms[formname].elements[formfield].value;

	var appendValue = "";
	if (fieldValue == "")
	{
		appendValue = email;
	} else {
		appendValue = fieldValue+","+email;
	}

	window.opener.document.forms[formname].elements[formfield].value = appendValue;
	window.close();
}

function fetchData(datatype, dataid, ticketlabelid, ticketid, userID) {
	if (datatype == "kb")
	{
		xmlaction = "kb";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=knowledgebase&_a=ajax&type=fetcharticle&randno="+doRand()+"&kbarticleid="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "kbirs") {
		xmlaction = "kbirs";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=knowledgebase&_a=ajax&type=irs&randno="+doRand()+"&query="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "pr") {
		xmlaction = "pr";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&randno="+doRand()+"&predefinedreplyid="+dataid+"&sessionid="+swiftsessionid);
    } else if (datatype == "prd") {
        xmlaction = "pr";
        loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&randno="+doRand()+"&predefinedreplyid="+dataid+"&ticketid="+ticketid+"&usedynamicfields=true"+"&sessionid="+swiftsessionid);
	} else if (datatype === "predefineReplyForOutboundTickets") {
		xmlaction = "pr";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&randno="+doRand()+"&predefinedreplyid="+dataid+"&sessionid="+"&usedynamicfields=true&userID="+userID);
	} else if (datatype == "tp" || datatype == "tpf") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&randno="+doRand()+"&ticketpostid="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "history") {
		xmlaction = "history";
		//loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=history&randno="+doRand()+"&email="+dataid+"&sessionid="+swiftsessionid);
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=history&randno="+doRand()+"&userid="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "followupss") {
		xmlaction = "followupss"; xmlsubset = ticketlabelid;
		if (xmlsubset == 'fo' || xmlsubset == 'pr')
		{
			loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=followup&ticketid="+dataid+"&noform=1&randno="+doRand()+"&nomenus=1&sessionid="+swiftsessionid);
		} else {
			loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=followup&ticketid="+dataid+"&noform=1&randno="+doRand()+"&sessionid="+swiftsessionid);
		}
	} else if (datatype == "auditlog" || datatype == "forward" || datatype == "followup" || datatype == "release" || datatype == "addnotes" || datatype == "forwardquote" || datatype == "forwardquoteall") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action="+datatype+"&randno="+doRand()+"&ticketid="+dataid+"&ticketlabelid="+ticketlabelid+"&sessionid="+swiftsessionid);
	} else if (datatype == "edit") {
		xmlaction = "edit";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=edit&randno="+doRand()+"&ticketid="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "billing") {
		xmlaction = "billing";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=billing&randno="+doRand()+"&ticketid="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "twday" || datatype == "twworkweek" || datatype == "twweek" || datatype == "twmonth") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=teamwork&_a=ajax&action="+datatype+"&customtype="+dataid+"&randno="+doRand()+"&sessionid="+swiftsessionid);
	} else if (datatype == "addresscards" || datatype == "detailedcards") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=teamwork&_a=ajax&action="+datatype+"&randno="+doRand()+"&sessionid="+swiftsessionid+"&searchquery="+dataid);
	} else if (datatype == "cltickets" || datatype == "sutickets") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=history&randno="+doRand()+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "suticketreports") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=ticketreports&randno="+doRand()+"&userid="+dataid+"&sessionid="+swiftsessionid);
	} else if (datatype == "clchats" || datatype == "suchats" || datatype == "lschats") {
		xmlaction = datatype;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=livesupport&_a=ajax&action=history&randno="+doRand()+dataid+"&sessionid="+swiftsessionid);
	}
}

function keywordCheck(formname, formfield)
{
	newKeyword = document.userlookupform.searchquery.value;
	if (oldKeyword != newKeyword)
	{
		oldKeyword = newKeyword;
/*		searchdivObj = browserObject("searchdiv");
		if (searchdivObj)
		{
			searchdivObj.innerHTML = newKeyword;
		}*/
		// Fetch the keyword
		xmlaction = "userlookup";
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=core&_a=userlookup&action=search&randno="+doRand()+"&query="+encodeURIComponent(newKeyword)+"&formname="+encodeURIComponent(formname)+"&formfield="+encodeURIComponent(formfield)+"&sessionid="+swiftsessionid);
	}
	setTimeout("keywordCheck('"+formname+"', '"+formfield+"');", 1000);
}

function keywordCheckContacts()
{
	newKeyword = document.realtimesearch.searchquery.value;
	if (oldKeyword != newKeyword)
	{
		oldKeyword = newKeyword;
		// Fetch the keyword
		xmlaction = selectedTab;
		loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=teamwork&_a=ajax&action="+selectedTab+"&randno="+doRand()+"&searchquery="+encodeURIComponent(newKeyword)+"&sessionid="+swiftsessionid);
	}
	setTimeout("keywordCheckContacts();", 1000);
}

function autoInsertKB(kbarticleid) {
	formname = getActiveFormName();

	if (!document.forms[formname])
	{
		window.location.href = swiftpath+"staff/index.php?_m=knowledgebase&_a=editquestion&kbarticleid="+kbarticleid;
	} else {
		fetchData("kb", kbarticleid);
	}
}

/**
 * Fetches prefedined reply based on the parameters
 * @param predefinedreplyid
 * @param useDynamicFields whether to dynamically replace fields such as {{username}}
 * @param ticketid
 * @param userID
 * @returns {boolean}
 */
function autoInsertPR(predefinedreplyid, useDynamicFields, ticketid, userID) {
   if (useDynamicFields && userID) {
		//predefined reply for outbound tickets
		fetchData('predefineReplyForOutboundTickets', predefinedreplyid, '', '', userID);
	} else if (useDynamicFields && ticketid) {
    	//dynamic predefined reply
        fetchData("prd", predefinedreplyid, '', ticketid);
    } else {
    	//predefined reply
        fetchData("pr", predefinedreplyid);
    }

    return true;
}

function autoInsertTP(ticketpostid, fetchtype) {
	fetchData("tp", ticketpostid);
}

function autoInsertDL(downloaditemid, link, title) {
	formname = getActiveFormName();
	if (formname == "forwardform" || formname == "newticketform")
	{
		fprefix = "f";
	} else {
		fprefix = "";
	}

	if (!document.forms[formname])
	{
		window.location.href = swiftpath+"staff/index.php?_m=downloads&_a=editfile&downloaditemid="+downloaditemid;
	} else if (link != "") {
		// Simply append the link to the contents
		insertAtCaret(document.forms[formname].replycontents, link);
	} else {
		// Add the download to select box
		displayObject(fprefix+"downloads1");
		displayObject(fprefix+"downloads2");
		to = document.forms[formname]["opt_downloads[]"];
		to.options[to.length] = new Option(title,downloaditemid);
	}
}

function removeDLItem() {
	formname = getActiveFormName();
	to = document.forms[formname]["opt_downloads[]"];

	if (to.options.length > 0)
	{
		for (i=0;i<to.length;i++)
		{
			if (to.options[i].selected)
			{
				to.options[i] = null;
			}
		}
	}
}

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

	output.replace("\n", "<br>");
	output.replace("<", "&lt;");
	output.replace(">", "&gt;");

	return output;
}

function getActiveFormName()
{
	var formname = "";
	if (selectedTab == "ttforward")
	{
		formname = "forwardform";
	} else if (selectedTab == "ttfollowup") {
		formname = "followupform";
	} else if (selectedTab == "newticket") {
		formname = "newticketform";
	} else if (selectedTab == "ttrelease") {
		formname = "releaseform";
	} else {
		formname = "replyform";
	}

	return formname;
}

function clearDLItems() {
	formname = getActiveFormName();
	if (formname == "forwardform" || formname == "newticketform")
	{
		fprefix = "f";
	} else {
		fprefix = "";
	}

	to = document.forms[formname]["opt_downloads[]"];

	if (to.options.length > 0)
	{
		for (i=0;i<to.length;i++)
		{
			to.options[i] = null;
		}
	}
	hideObject(fprefix+"downloads1");
	hideObject(fprefix+"downloads2");
}

function processReplyForm() {
	formname = getActiveFormName();
	selField = document.forms[formname]["opt_downloads[]"];
	if (selField)
	{
		if (selField.options.length > 0)
		{
			for (i=0;i<selField.length;i++)
			{
				selField.options[i].selected = true;
			}
		}
	}

	return true
}

function openSpellChecker() {
	formname = getActiveFormName();
	var text1 = document.forms[formname].replycontents;
	var speller = new spellChecker(text1);
	speller.openChecker();
}

/**
* ###############################################
* BEGIN COOLMENUPRO CODE, MERGED INTO ONE FILE.
* ###############################################
*/

var kbmenuloaded = false;
var prmenuloaded = false;
var dlmenuloaded = false;
var htmlAreaLoaded = false;
var VSTYLE = {"border":1, "borders":[1,0,1,1], "shadow":1, "color":{"border":"#6393DF", "shadow":"#DBD8D1", "bgON":"#FFFFFF","bgOVER":"#F7FAFF"}, "css":{"ON":"clsCMOn", "OVER":"clsCMOver"}};
var VSTYLEBORDER = {"border":1, "borders":[1,1,1,1], "shadow":1, "color":{"border":"#6393DF", "shadow":"#DBD8D1", "bgON":"#FFFFFF","bgOVER":"#F7FAFF"}, "css":{"ON":"clsCMOn", "OVER":"clsCMOver"}};
var VSTYLESEL = {"border":1, "borders":[1,0,1,1], "shadow":1, "color":{"border":"#6393DF", "shadow":"#DBD8D1", "bgON":"#FFF6E2","bgOVER":"#F7FAFF"}, "css":{"ON":"clsCMOn", "OVER":"clsCMOver"}};
var VSTYLESELBORDER = {"border":1, "borders":[1,1,1,1], "shadow":1, "color":{"border":"#6393DF", "shadow":"#DBD8D1", "bgON":"#FFF6E2","bgOVER":"#F7FAFF"}, "css":{"ON":"clsCMOn", "OVER":"clsCMOver"}};
var SUBPOPUPTOP = {"border":1, "borders":[1,1,1,1], "shadow":1, "color":{"border":"#6393DF", "shadow":"#DBD8D1", "bgON":"#FFFFFF","bgOVER":"#F7FAFF"}, "css":{"ON":"clsCMOn", "OVER":"clsCMOver"}};
var SUBPOPUP = {"border":1, "borders":[1,0,1,1], "shadow":1, "color":{"border":"#6393DF", "shadow":"#DBD8D1", "bgON":"#FFFFFF","bgOVER":"#F7FAFF"}, "css":{"ON":"clsCMOn", "OVER":"clsCMOver"}};
var STYLEPOPUP = {"border":1, "borders":[1,1,1,1], "shadow":1, "color":{"border":"#6393DF", "bgON":"#FFFFFF","bgOVER":"#F7FAFF",shadow:'#DBD8D1'}, "css":{"ON":"popupOn", "OVER":"popupOver"}};

// Title: COOLjsMenu
// URL: http://javascript.cooldev.com/scripts/coolmenu/
// Version: 2.4.8
// Last Modify: 5 Jul 2005
// Author: Alex Kunin <alx@cooldev.com>
// Notes: Registration needed to use this script on your web site.
// Copyright (c) 2001-2005 by CoolDev.Com
// Copyright (c) 2001-2005 by Sergey Nosenko

// Options: PROFESSIONAL, COMPRESSED, COMPATIBLE

// jch
//   added conditional at column 14139 to verify that this._9[0] exists
//   removed '7' from regex at col 667 to make MSIE8 detectable as 7
//   added conditional at column 14219 to verify that this._9[0] exists
//   value strictness at col 22079 (cannot use negative heighths and widths in runtime styles, apparently, despite that the css standard explicitly allows it)

function _u(_2){return typeof(_2)=='undefined'};function _M(_2){return typeof(_2)=='number'};function _2n(_2){return typeof(_2)=='object'};_k=document;_1L=RegExp;_h=window;_k._2v=_k.getElementById;_2u=_k._2v?function(_H){return _k.getElementById(_H)}:function(_H){return _k.all[_H]};_2t={_f:1,_g:0,_d:3,_e:2};_2x={};for(var i in _2t)_2x[_2t[i]]=i;_1w=1;_23=2;_h.CMenus=_h.$CM=_h._B=[];_1={};_1._2d=navigator.appVersion;_1._1K=navigator.userAgent;_1._1y=_h.opera;_1._3x=_1._1K.match(/opera.[789]/i);_1._1j=_1._1y&&!_1._3x;_1._15=_k._2v;_1._2z=_1._2d.match(/MSIE 5.5/)&&_1._15&&!_1._1y;_1._3q=_1._2d.match(/MSIE 5/)&&_1._15&&!_1._2z&&!_1._1y;_1._2e=_1._2d.match(/MSIE /)&&_1._15&&!_1._1y;if (!_1._2e) {_1._2e=_1._2d.match(/MSIE 6/)&&_1._15&&!_1._1y;}_1._3A=_k.all&&!_1._15&&!_1._1y;_1._14=_1._3A||_1._3q||_1._2e;_1._1s=_1._1K.match(/Mac/);_1._3P=_1._1K.match(/hotjava/i);_1._E=_k.layers&&!_1._15&&!_1._3P;_1._1J=_1._1K.match(/gecko/i);_1._R=_1._14&&!_1._1s;_3O={zIndex:1000,pos:'relative',dynamic:false,delay:[0,800],popupoff:[0,0],blankImage:'img/b.gif'};_2y={main:false,image:null,color:'',cssStyle:'',cssClass:'',attributes:'',size:['+item','+item'],offset:[0,0],code:_1._1j?'&nbsp;':'',_f:0,_g:0,_d:0,_e:0,_n:true,align:'left',valign:'top',_1c:function(){with(this){_1c=_J;if(!main){_f=Number.NaN;_g=Number.NaN;_f=size[1](_3,this);_g=size[0](_3,this);if(isNaN(_f)||isNaN(_g)){_f=_._1V();_g=_._1U();_f=size[1](_3,this);_g=size[0](_3,this)};_._W(_f,_g)};_d=offset[1](_3,this)+((this._2H&&this._3._3S)||0);_e=offset[0](_3,this);_._T(_d,_e);_3._8._6._2E(this)}},_2D:function(){if(this._n!=this._3._2A(this.visibility))this._._q(this._n=!this._n);this._1c()},_3L:function(){if(this._n!=this._3._2A(this.visibility)){this._n=!this._n;var _L=(this._3._8._6._2p&&_1._14&&this[this._n?'fadeIn':'fadeOut'])||'';var _R=(_1._14&&!_1._1s&&this.filters)||'';if(_L||_R)this._._4.filter=_L+' '+_R;with(this._){if(_L)_.filters[0].apply();_q(this._n);if(_L)_.filters[0].play()}};this._1c()}};_3C={};function _1z(_O,_2B){for(var i in _2B)if(_u(_O[i]))_O[i]=_2B[i]};BLANK_IMAGE='img/b.gif';function COOLjsMenuPRO(_s,_j){_1z(_j[0],_3O);this._2o=_j[0].dynamic&&((_1._15&&!_1._1j&&!(_1._14&&_1._1s))||_1._E);this._2F=_j[0].autosize;this._2C=_1._14||_1._1J;this._1u={};_j[0].blankImage=BLANK_IMAGE;if(!_s){_s='menu_';do _s+=Math.round(Math.random()*10);while(!_u(_h._B[_s]))};_h._B[this._s=_s]=this;this._r='$CM.'+_s;this._1f=_j[0].popup;this._21=_j[0].frames;this._2G=this._21&&_j[0].frames[0]==_h.name;this._1a=!this._1f&&_j[0].pos=='relative'&&(!this._21||this._2G);this.$root=this._a={_5:this,_s:this._s,_r:this._r+'.$root',_8:null,_d:0,_e:0,_7:_j[0],frameoff:_j[0].pos?_j[0].pos:[0,0],_12:_J,_t:'R',_1e:true,_1N:-1,_1t:_j,_2w:function(){return[]},_Q:function(){return[]},_l:_1Q.prototype._l,_1Z:_1Q.prototype._1Z};if(this._21&&!this._2G){this._a._d=0;this._a._e=0}else if(!this._1a&&!this._1f){this._a._d=_j[0].pos[0];this._a._e=_j[0].pos[1]};this._30=this._3c=0;this._a.$level=this._a._6=new _1M(this,this._a);with(this._a){if(_M(_7.delay))_7.delay=[400,_7.delay];_7._3H=_7.delay[0];_7._1$=_7.delay[1]};this.items=this._j=[];this._3d='';this._1r=[];this._3e=null;this._1x=null;this._20=null;this._3g={name:'trigger',size:['+item','+item'],zIndex:1000,code:'{trigger}'};this._19(this._3g);if(_u(_h._16)){_h._16=_h.onload;_h.onload=function(){CLoadNotify();if(_h._16){var _o=_h._16;_h._16=null;return _o()}}};if(_1._1j)_w=_1G;else if(_1._E)_w=_1l;else{_w=_1o};_w._3b={}};$=COOLjsMenuPRO.prototype;$._l=function(_1A){return this._s+'_'+_1A};$.$ev=$._3_=function(_F,_t,_3$){var _b=true,_3=this._j[_t];if(_3){_b=this['$'+_F](_3);if(this[_F])this[_F](_3)};return _b};$._36=function(){return this._a._7.blankImage};$._16=function(){if(!this._1f){if(_1._E&&this._1a)with(_k.anchors[this._l('da')]){this._a._d=x;this._a._e=y};this._37()};this._16=_J};$.initTop=function(){this._1u._f=this._39();this._1u._g=this._3h();var w=0,h=0,i,s;if(!this._2C)for(i in this)if(i.match(/^\$(on.*)$/))this._3d+=_S(_1L.$1,'return '+this._r+'.$ev(\'' + _1L.$1 + '\', {index})');this._a._6._34();this.root=this._a;this.root.cd=this._a._6._9;if(this._a._7.placeholder)with(this._a._7){w=placeholder[1];h=placeholder[0]}else with(this._a._6){var x=0,y=0;for(i=0;i<_9.length;i++){if(i>0){x+=_9[i]._1I[1](_9[i]);y+=_9[i]._1I[0](_9[i])};w=Math.max(w,x+_9[i]._3m[1](_9[i]));h=Math.max(h,y+_9[i]._3m[0](_9[i]))}};this._1_=_M(w+h)&&w+h==w+h;if(!_1._E){s='<div id="'+this._l('r')+'" style="z-index:'+this._a._1t[0].zIndex+';position:';if(this._1a)s+='relative;'+(this._1_?'width:'+w+'px;height:'+h+'px;':'');else s+='absolute;left:'+this._a._d+'px;top:'+this._a._e+'px;';s+='">'+(this._2o?'':this._a._6._1C())+'</div>';_k.write(s);this._17=_w._P(this._l('r'))}else if(this._1a)_k.write('<div><a name="'+this._l('da')+'" href="#"><img src="'+this._36()+'"'+(this._1_?'width="'+w+'" height="'+h+'"':'width="1" height="1"')+' border="0" /></a></div>');if(_1._2e){this.$$$onclick=new Function('return '+this._r+".$$onclick(event)");this._3n=_k.body.onclick;_k.body.onclick=this.$$$onclick}else if(_1._15/*&&!_1._1s*/){this.$$$onclick=new Function('event','return '+this._r+".$$onclick(event)");_k.addEventListener('click',this.$$$onclick,true)}};$._3K=function(ev,offX,offY){var x=ev.pageX||ev.x;var y=ev.pageY||ev.y;if(_1._14&&_k.body&&_k.body.parentElement){x+=_k.body.parentElement.scrollLeft;y+=_k.body.parentElement.scrollTop};var _3l=this._a._7.popupoff;x+=_u(offX)?_3l[1]:offX;y+=_u(offY)?_3l[0]:offY;this._2I(x,y)};$._2I=function(_O,_R){this._Y(_O,_R);_h.setTimeout(this._r+'._37()',10);this._3j()};$._3J=function(){this._z(null,this._a._7._1$)};$._3G=function(_F){var _1D=_F.srcElement||_F.target;while(_1D){if(_1D==this._17._)return true;_1D=_1D.parentNode};return false};$.$$onclick=function(_F){if(!this._3G(_F)){this._1k();this._z(null);this._11(null)};if(this._3n)this._3n()};$._37=function(){this._z(this._a._6)};$.init=_J;$.show=$._37;$.hide=function(){this._z(null)};$.moveXY=function(_O,_R){this._Y(_O,_R)};$._Y=function(_O,_R){if(_1._E){this._30=_O;this._3c=_R;this._a._6._2m()}else this._17._T(_O,_R)};$._2l=function(_3F,_2J,_I){this._1r[this._1r.length]=_h.setTimeout(this._r+'.'+_3F+'('+(_2J?_2J._r:'null')+')',_I)};$.cancelQueued=$._1k=function(){for(var i in this._1r)_h.clearTimeout(this._1r[i]);this._1r=[]};$.setActiveItem=$._11=function(_3,_I){if(_I)this._2l('setActiveItem',_3,_I);else{if(this._1B)this._1B._3B();var _$=_2Q(this._3e,_3),i;for(i in _$[0])_$[0][i]._12(_1w);for(i in _$[1])_$[1][i]._12(_23);this._3e=_3;if(_3)this._3j();if(_3&&_3._c.hasControls){this._1B=_3;_3._3D()}else this._1B=null}};$.setSelectedItem=$._3E=function(_3,_I){if(_I)this._2l('setSelectedItem',_3,_I);else{var _3M=this._20;this._20=_3;(_3M||this._a)._12('',true);(_3||this._a)._12('',true)}};$.showLevel=$._z=function(_6,_I){if(_I)this._2l('showLevel',_6,_I);else{if(_6&&_6._3T)_6=_6._8._8._6;if(!_6&&!this._1f)_6=this._a._6;var _$=_2Q(this._1x,_6),i;_q(_$[0],false);_q(_$[1],true);this._1x=_6;this._3U()}};$._3j=function(){if(this._a._7.exclusive)for(i in _h._B)if(_h._B[i]!=this){_h._B[i]._z(null);_h._B[i]._11(null)}};$._3U=function(){if(_1._1J){if(this._1a){var o=this._17._.parentNode;if(o.tagName!='BODY'){o.style.width=this._17._.offsetWidth+'px';o.style.height=this._17._.offsetHeight+'px'}}}};$.$onfocus=function(_3){_3._2s();this._1k();this._z(_3._8._6);_3._1T(true);this._11(_3)};$.$_3Z=function(_3){this._1k();if(this._1B)return true;if(!_3._c.sticky)this._z(null);this._11(null);_3._1T(false)};$.$onmouseover=function(_3){_3._2s();this._1k();this._z(_3._6,this._a._7._3H);_3._1T(true);this._11(_3);return true};$.$onclick=function(_3){this._1k();this._3E(_3);if(_3._c.url){_h.open(_3._c.url,_3._c.target||'_'+'self');if(!_3._c.sticky)this._z(null)}else{this._z(_3._6._n?_3._6._8._8._6:_3._6)};return false};$.$onkeydown=function(_3){if(_1._14){var _V=null;switch(event.keyCode){case 38:_V=_3._3X()||_3._8._6._2N();break;case 40:_V=_3._3W()||_3._8._6._2r();break;case 27:case 37:if(_3._8!=this._a)_V=_3._8;else{_3._1R().blur();this._11(null)};break;case 39:if(_3._1e){this._z(_3._6);_V=_3._6._2r()};break;case 36:_V=_3._8._6._2r();break;case 35:_V=_3._8._6._2N();break};if(_V){_V._1R().focus();return false}};return true};$.$onmouseout=function(_3){this._1k();if(this._1B)return true;this._z(this._1f&&this._1x?this._a._6:null,this._a._7._1$);this._11(null,this._a._7._1$);_3._1T(false);return true};$.$resizeHandler=function(){this._1u._f=this._39();this._1u._g=this._3h();this._a._6._Y();return this._2L?this._2L():true};$._2M=function(){this._2L=window.onresize;window.onresize=new Function('return '+this._r+'.$resizeHandler()');this._2M=_J};$._39=function(){return document.body.clientWidth};$._3h=function(){return document.body.clientHeight};$._1d=function(_10,__){if(!_u(_10)&&typeof(_10[0])!='function'){_10[1]=this._2T(_10[1],__,1);_10[0]=this._2T(_10[0],__,0)};return _10};var _2q={};$._2T=function(_2,__,_2k){var _22=_2+'|'+__+'|'+_2k;if(!_u(_2q[_22]))return _2q[_22];var _p='return Math.round(';if(_M(_2))_p+=_2;else{_p='with(i)'+_p;var _3z=_2$(_2k),_3Y,_m;while(_m=_2.match(/^([-+\.\d+]*)\*?(\w+)/)){if(_m[1]=='')__=_m[2];else _p+=_K(_m[1])+(_m[2]=='px'?'':'*'+_m[2]+_3z);if(_m[2]=='body')this._2M();_2=_2.slice(_m[0].length)}};if(__){var _2h=_2$(_2k+2);_p+='+i.'+__+_2h;switch(__){case'item':case'previousItem':break;case'parentItem':_p+='+i.parentLevel'+_2h;default:_p+='-i.level'+_2h}};_p+='+0)';var _b=_2q[_22]=new Function('i,self',_p);return _b};$._19=function(_,_1Y){if(!_._27){_._27=true;if(!_.size&&(_.main||_.code))_.size=['+self','+self'];_1z(_,_2y);if(_1._R&&(_.fadeIn||_.fadeOut))_._2D=_._3L;with(_){if(image)code='<img src="'+image+'" width="'+size[1]+'" height="'+size[0]+'"'+(_1._E?'':' style="display:block"')+' />';else if(code&&code!='{trigger}')code='<table cellspacing="0" cellpadding="0" border="0"><tr><td nowrap="nowrap"><div'+_S('class',cssClass)+_S('style',cssStyle)+'>'+code+'</div></td></tr></table>';code='<div'+attributes+' id="" style="position:absolute;'+(_1._1j?'width:1px;':'')+(color?'background-color:'+color+';':'')+cssStyle+'"'+_S('class',cssClass)+'>'+code+'</div>'+"\n";if(_1._E)code=code.replace(/background([-\w]*:)/g,'layer-background$1');offset=_G(offset);size=_G(size);if(_M(offset[0]))offset[0]=_K(offset[0])+'px';if(_M(offset[1]))offset[1]=_K(offset[1])+'px';switch(_.align){case'center':offset[1]+='+0.5'+_1Y+'-0.5self';break;case'right':offset[1]+='+'+_1Y+'-self';break};switch(_.valign){case'middle':offset[0]+='+0.5'+_1Y+'-0.5self';break;case'bottom':offset[0]='+'+_1Y+'-self';break};if(!_u(_.margin)){var _d,_e,_1X,_1W;if(_M(_.margin))_d=_e=_1X=_1W=_.margin;else if(_.margin.length==2){_e=_1W=_.margin[0];_d=_1X=_.margin[1]}else{_e=_.margin[0];_1X=_.margin[1];_1W=_.margin[2];_d=_.margin[3]};if(_M(size[0]))size[0]=_K(size[0])+'px';if(_M(size[1]))size[1]=_K(size[1])+'px';if(!main){size[0]+=_K(-_e-_1W)+'px';size[1]+=_K(-_d-_1X)+'px'};offset[0]+=_K(_e)+'px';offset[1]+=_K(_d)+'px'};this._1d(size);this._1d(offset,'item')}};return _};$._3N=function(_4){if(!_4._27){var i,j;_4._27=true;_4.layers=[];_4._5=this;_4._1n=function(_){this._5._19(this.layers[this.layers.length]=_,'item')};var b=_4.border||0,_L=_4.transition||{};b=(b&&_4.borders)||[b,b,b,b];var _1v=_4._1v=b[0],_28=_4._28=b[1],_31=_4._31=b[2],_32=_4._32=b[3],_26=_4._26=_1v+_31,_25=_4._25=_28+_32;var _1E=0,_1S=0;if(_M(_4.shadow))_1E=_1S=_4.shadow;else if(_2n(this._7.shadow)){_1E=_4.shadow[0];_1S=_4.shadow[1]};if(!_4.color)_4.color={};if(!_4.css)_4.css={};if(_4.color.shadow&&(_1E||_1S))_4._1n({_1b:1,color:_4.color.shadow,offset:[_1S,_1E]});if(_4.color.border&&(_26||_25))_4._1n({_1b:1,color:_4.color.border});_={size:['+item-'+_25+'px','+item-'+_26+'px'],offset:[_28,_1v]};if(_4.color.bgON)_4._1n(_G(_,{_1b:1,color:_4.color.bgON,visibility:_L.fadeIn||_L.fadeOut?'':'n'}));if(_4.color.bgOVER)_4._1n(_G(_,{_1b:1,color:_4.color.bgOVER,visibility:'o',fadeIn:_L.fadeIn,fadeOut:_L.fadeOut}));if(this._2F)_.size=0;_4._1n(_G(_,{main:this._2F,code:'<div class="'+_4.css.ON+'">{code}</div>',visibility:'h',_2H:1}));_4._1n(_G(_,{code:'<div class="'+_4.css.OVER+'">{ocode}</div>',visibility:'H',_2H:1}));_1z(_4,_3C)};return _4};function _1M(_5,_8){this._5=_5;this._8=_8;this._1F=_8==_5._a;this._1P=!_5._1f&&this._1F;this._r=this._8._r+'.$level';this._2_={_f:0,_g:0};this._s=this._5._l('l'+this._8._t)};$=_1M.prototype;$._9=[];$._d=0;$._e=0;$._1m=false;$._2p=false;$._34=function(){if(!this._9.length){var i,_j=this._8._1t,_29=_j.length-1;if(_u(_j[_29]))_29--;this._9=_j.slice(1,_29+1);if(this._9.length==1&&this._9[0].array){var _13=this._9[0];this._9=[];for(i=0;i<_13.array.count;i++){this._9[i]=_G(_13);this._9[i].array.prepare(this._9[i],i)}};with(this)for(i in _9)_9[i]=new _1Q(_5,_8,_9[i],parseInt(i),_5._j.length)}};$._l=function(_1A){return this._s+'_'+_1A};$._2r=function(){return this._9[0]};$._2N=function(){return this._9[this._9.length-1]};$._1H=function(){return!this._1P&&(_1._2z||_1._2e)&&!this._2V(true)&&!this._2a(true)&&!this._2a(false)};$._2m=function(){if(this._A){this._A._T(this._5._30,this._5._3c);for(var i in this._9)this._9[i]._6._2m()}};$._Y=function(){this._2f();for(var i in this._9)this._9[i]._Y();this._2W()};$._1C=function(){this._34();var i,_b='<div id="'+this._l('l')+'" style="position:absolute;visibility:hidden;">';for(i in this._9)_b+=this._9[i]._2X;_b+='</div>';if(!this._5._2o){_b='<div id="'+this._l('d')+'" style="position:absolute;visibility:hidden;left:0;top:0;width:1px;height:1px;">'+_b+'</div>';for(i in this._9)_b+=this._9[i]._6._1C()};if(this._1H())_b='<iframe tabindex="-1" frameborder="0" id="'+this._l('f')+'" src="'+(location.protocol=='https:'?this._5._a._7.https_fix_blank_doc:'')+'" scroll="none" style="filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);visibility:hidden;height:1px;position:absolute;width:1px;"></iframe>'+_b;return _b};$._Q=function(){with(this._8)return _8?_8._6._Q().concat([this]):[this]};$._2E=function(_O){this._C=Math.min(this._C,_O._d);this._D=Math.min(this._D,_O._e);this._1p=Math.max(this._1p,_O._d+_O._f);this._1q=Math.max(this._1q,_O._e+_O._g)};$._2f=function(){this._C=this._D=65535;this._1p=this._1q=-65535};$._2V=function(){return _1._R?((this._9[0])?this._9[0]._7.filters:'')||'':''};$._2a=function(_3Q){return!this._1P&&_1._R?((this._9[0])?(this._9[0]._7[_3Q?'fadeIn':'fadeOut']||''):''):''};$._2W=function(){if(!this._1F){this._d+=this._9[0]._2R[1](this._9[0]);this._e+=this._9[0]._2R[0](this._9[0])}else if(_1._E){this._d=this._5._a._d;this._e=this._5._a._e};this._._T(-this._C,-this._D);this._A._T(this._d+this._C,this._e+this._D);this._._W(this._1p-this._C,this._1q-this._D);this._A._W(this._1p-this._C,this._1q-this._D);if(_1._E){with(this._A._.clip){left=this._C;top=this._D};with(this._._.clip){left=this._C;top=this._D}};if(!_1._E&&!_1._1j&&this._1P&&this._5._1a&&!this._5._1_)this._5._17._W(this._f,this._g);if(this._1H())this._2g._q(this._n);else if(this._1P){var i,_18=this._5._a._7.forms_to_hide;if(_18)for(i in _18)_w._P(_18[i])._q(!this._5._1x||this._5._1x==this._5._a._6)}};$._q=function(_2){if(this._n!=_2){this._2p=false;var i;this._n=_2;this._8._12('',true);if(!this._2Y){this._2Y=true;if(this._5._2o)this._A=_w._2Z(this._1C(),this._5._17||1);else this._A=_w._P(this._l('d'));if(this._1H())this._2g=_w._P(this._l('f'));this._=_w._P(this._l('l'));this._2f();for(i in this._9)this._9[i]._3w();for(i in this._9)this._9[i]._2U();this._f=this._1p-this._C;this._g=this._1q-this._D;this._2f()};var _R='';if(_1._R){_R=this._2a(_2)+' '+this._2V();var _1m=_R!=' ';if(_1m!=this._1m){this._A._4.filter=_R;this._1m=_1m};if(_1m)for(i=0;i<this._A._.filters.length;i++)this._A._.filters[i].apply()};_q(this._9,_2);this._2W();if(this._1H()){this._2g._T(this._d+this._C,this._e+this._D);this._2g._W(this._1p-this._C,this._1q-this._D)};this._A._q(_2);this._._q(_2);if(_R)for(var i=0;i<this._A._.filters.length;i++)this._A._.filters[i].play()};this._2p=_2};function _1Q(_5,_8,_c,_X,_t){_5._j[_t]=this;this.index=_t;if(_u(_c.ocode))_c.ocode=_c.code;_c.index=_t;_c.$0=null;var _4=this._4=(_c.format||{}).style||_8._1t[0].style||_8._7.style;this._1N=_8._1N+1;if(_2n(_4)&&_4.length)_4=_4[this._1N]||_4[0];this._7=_G(_8._7,_4==_8._4?{}:_5._3N(_4),_8._1t[0],_c.format||{});_1z(this,{_5:_5,_t:_t,_8:_8,_X:_X,_s:_5._l('i'+_t),_d:0,_e:0,_f:0,_g:0,_r:_5._r+'.items['+_t+']',_N:{},_n:false,_Z:_1w,_i:[],_2X:'',_2K:_8._6._9[_X-1],_1F:_8==_5._a,_3u:_X==0,_3v:_X==_8._6._9.length-1,_c:_G(_c,this._7.parameters),_1t:_c.sub,_1e:_c.sub&&_c.sub.length>1,_3m:_5._1d(this._7.size),_2R:_5._1d(this._7.leveloff,'parentItem'),_1I:_5._1d(this._7.itemoff,'previousItem'),_2O:_5._1d(this._7.wrapoff,'previousItem')});this.$level=this._6=this._1e?new _1M(_5,this):{_3T:true,_8:this,_r:this._r+'.$level',_Q:_1M.prototype._Q,_1C:_J,_2m:_J,_Y:_J};this._c.trigger='<a'+_S('class',this._7.trigger)+_S('accesskey',this._c.key)+' href="'+(this._c.url||'#')+'" '+_S('target',this._c.target)+this._5._3d+'>'+(_1._1j?'':'<img src="'+this._5._36()+'" width="100%" height="100%"'+_S('alt',this._c[this._7.alt||'alt'])+' border="0" />')+'</a>';_1z(this,{main:this._N,maxMain:_8._6._2_,item:this,previousItem:this._2K,level:_8._6,parentItem:_8,body:this._5._1u,parentLevel:this._1F?null:_8._8._6});var _2b=[],_2c=[];if(this._7.imgsize&&this._7.image){this._3S=this._7.imgsize[1];_2b[0]=_5._19({_1b:1,image:this._7.image,size:this._7.imgsize,offset:[0,this._7._1v],valign:'middle',visibility:'n'},'item');_2b[1]=_5._19({_1b:1,image:this._7.oimage||this._7.image,size:this._7.imgsize,offset:[0,this._7._1v],valign:'middle',visibility:'o'},'item')};if(this._7.arrsize&&this._7.arrow){_2c[0]=_5._19({image:this._7.arrow,size:this._7.arrsize,align:'right',valign:'middle',visibility:'nc'},'item');_2c[1]=_5._19({image:this._7.oarrow||this._7.arrow,size:this._7.arrsize,align:'right',valign:'middle',visibility:'oc'},'item')};with(this)_1i(_7.levelLayers),_1i(_7.itemLayers),_1i(_7.layers),_1i(_2b),_1i(_2c),_1i([_5._3g])};$=_1Q.prototype;$._3X=function(){return this._8._6._9[this._X-1]||null};$._3W=function(){return this._8._6._9[this._X+1]||null};$._1Z=function(_1O){if(this!=this._5._a){with(this._1R()){tabIndex=_1O++}};if(this._6._n)for(var i in this._6._9)_1O=this._6._9[i]._1Z(_1O);return _1O};$._1R=function(){return this._i[this._i.length-1]._._.childNodes[0]};$._2s=function(_2S){if(this._5._2C&&!this._3y){for(i in _2S?{$onmouseover:1,$onfocus:1}:this._5)if(i.match(/^\$(on.*)$/))this._1R()[_1L.$1]=new Function('return '+this._5._r+'.$ev(\'' + _1L.$1 + '\', '+this._t+')');this._3y=!_2S}};$._l=function(_1A){return this._s+'_'+_1A};$.getData=function(){return this._c};$._1T=function(_3s){var _33=this._c[this._7.status||'status'];if(_33)_h.status=_3s?_33:_h.defaultStatus};$._Q=function(){return this._8._Q().concat([this])};$._2w=function(){return this._8._2w().concat([this._X])};$._1i=function(_18){for(var i in _18||[]){var _13=_18[i];if(this._3t(_13.visibility)){var i,_p=_13.code,_m;if(!_13._1b){while(_m=_p.match(/\{([\w\d]+)=([^}]*)\}/))_p=_p.replace(new _1L(_m[0],'g'),_u(this._c[_m[1]])?_m[2]:this._c[_m[1]]);while(_m=_p.match(/\{([\w\d]+)\}/)){if(_u(this._c[_m[1]]))break;_p=_p.replace(new _1L(_m[0],'g'),this._c[_m[1]])}};i=this._i.length;this._i[i]=_G(_13);this._2X+=_p.replace('id=""','id="'+this._l(i)+'"')}}};$._3w=function(){var i,_24,_1h;for(i in this._i){with(this._i[i]._=_w._P(this._l(i)))if(this._i[i].main){if(!_u(_24))this._i[_24].main=false;_1h={_f:Number.NaN,_g:Number.NaN};this._i[i]._f=this._N._f=this._i[i].size[1](this,_1h);this._i[i]._g=this._N._g=this._i[i].size[0](this,_1h);if(isNaN(this._N._f)||isNaN(this._N._g)){_1h={_f:_1V(),_g:_1U()};this._i[i]._f=this._N._f=this._i[i].size[1](this,_1h);this._i[i]._g=this._N._g=this._i[i].size[0](this,_1h)};with(this._8._6._2_){_f=Math.max(_f,this._N._f);_g=Math.max(_g,this._N._g)};_24=i};this._i[i]._3=this};this._2s(true)};$._2U=function(){with(this){_f=_7.size[1](this);_g=_7.size[0](this);if(_2K){if(_c.wrapPoint){_d=_2O[1](this);_e=_2O[0](this)}else{_d=_1I[1](this);_e=_1I[0](this)}};_8._6._2E(this)}};$._q=function(_2){this._n=_2;this._12(this._Z,true)};$._3t=function(_U){if(_U){var j,_2,_v=false;for(j=0;j<_U.length;j++){_2=null;switch(_U.charAt(j)){case'!':_v=!_v;break;case'G':_2=!!_1._1J;break;case'c':_2=!!this._1e;break;case'C':_2=_v!=!!this._1e;break;case'H':_2=!this._c.hasControls&&!_v;break;case'h':case's':case'n':case'N':case'o':case'O':_2=!_v;break;case'f':_2=this._3u;break;case'l':_2=this._3v;break;default:_2=_U.charAt(j)==this._1N;break};if(_2!==null)if(_2==_v)return false;else _v=false}};return true};$._2A=function(_U){if(!this._n)return false;if(_U){var j,_2,_v=false;for(j=0;j<_U.length;j++){_2=null;switch(_U.charAt(j)){case'!':_v=!_v;break;case'G':_2=!!_1._1J;break;case'C':_2=!!(this._1e&&this._6._n);break;case's':_2=this._5._20==this;break;case'h':_2=this._c.hasControls?!_v:this._Z==_1w;break;case'n':_2=this._Z==_1w;break;case'N':_2=this._8._Z==_1w;break;case'H':case'o':_2=this._Z==_23;break;case'O':_2=this._8._Z==_23;break;default:_2=!_v;break};if(_2!==null)if(_2==_v)return false;else _v=false}};return true};$._12=function(_2,_3p){with(this)if(_2!=_Z||_3p){if(_2)_Z=_2;for(var i in _i)_i[i]._2D()}};$._Y=function(){this._2U();for(var i in this._i){this._i[i]._1c=_2y._1c;this._i[i]._1c()};if(this._6._2Y)this._6._Y()};$._3B=function(){this._i[this._i.length-1]._._q(true)};$._3D=function(){this._i[this._i.length-1]._._q(false)};_w=_J;function _2P(_1g){for(var i in _1g){_w._3b[_1g[i].id]=_1g[i];if(_1g[i].layers&&_1g[i].layers.length)_2P(_1g[i].layers)}};function _1o(){};$=_1o.prototype;_1o._P=function(_H){var _b=new _1o;_b._=_2u(_H);_b._38();return _b};_1o._2Z=function(_3o,_8){_b=new _1o;_b._=_k.createElement('div');with(_b._.style){position='absolute';left=top=-1000;visibility='hidden'};_b._.innerHTML=_3o;_8._.appendChild(_b._);_b._38();return _b};$._38=function(){this._4=this._.style;this._3k=_1._1s?this._:this._.childNodes[0]};$._q=function(_2){this._4.visibility=_2?'inherit':'hidden'};$._1V=function(){return this._3k.offsetWidth};$._1U=function(){return this._3k.offsetHeight};$._T=function(_d,_e){with(this._4){left=_d+'px';top=_e+'px'}};$._W=function(_f,_g){with(this._4){width=((_f<0)?0:_f)+'px';height=((_g<0)?0:_g)+'px'}};function _1G(){};$=_1G.prototype;_1G._P=function(_H){var _b=new _1G;_b._=_2u(_H);_b._4=_b._.style;return _b};$._q=function(_2){this._4.visibility=_2?'visible':'hidden'};$._1V=function(){return this._4.pixelWidth};$._1U=function(){return this._4.pixelHeight};$._T=function(_d,_e){with(this._4){left=_d;top=_e}};$._W=function(_f,_g){with(this._4){width=_f;height=_g}};function _1l(){};$=_1l.prototype;_1l._P=function(_H){var _b=new _1l;_b._=_w._3b[_H];return _b};_1l._2Z=function(_3o){var _b=new _1l;_W._=new Layer(1000);with(_b._){visibility='hide';document.open('text/html');document.write(_H);document.close();_2P(layers)};return _b};$._q=function(_2){this._.visibility=_2?'inherit':'hide'};$._1V=function(){return this._.clip.width};$._1U=function(){return this._.clip.height};$._T=function(_d,_e){this._.moveTo(_d,_e)};$._W=function(_f,_g){this._.resize(_f,_g)};function _J(){return''};function _S(_s,_2){return _2?' '+_s+'="'+_2+'"':''};function _G(_O){if(!_u(_O.length)&&_O.concat)return([]).concat(_O);var i,j,_b={};for(j=0;j<arguments.length;j++)if(_2n(arguments[j]))for(i in arguments[j])_b[i]=arguments[j][i];return _b};function _2$(_t){return'.'+_2x[_t]};function _K(_2){switch(_2){case'':_2='+';case'-':case'+':return _2+1;default:return(_2>=0?'+':'')+parseFloat(_2)}};function _2Q(_3i,_35){var _2i=_3i?_3i._Q():[],_2j=_35?_35._Q():[],i=0;while(i<_2i.length&&i<_2j.length&&_2i[i]==_2j[i])i++;return[_2i.slice(i),_2j.slice(i)]};function _q(_3f,_2){for(var i in _3f)_3f[i]._q(_2)};function CMenuPopUp(_5,_3r,_3R,_3V){_h._B[_5]._3K(_3r,_3R,_3V)};function CMenuPopUpXY(_5,_O,_R){_h._B[_5]._2I(_O,_R)};function CMenuPopDown(_5){_h._B[_5]._3J()};function mEvent(_3I,_3a,_F){with(_B[_3I])switch(_F){case'o':$onmouseover(_j[_3a]);break;case't':$onmouseout(_j[_3a]);break}};function CLoadNotify(){for(var i in _h._B)_h._B[i]._16()}

if (!themepath)
{
	var themepath = "";
}

var BLANK_IMAGE=themepath+"space.gif";

// +-----------------------------------------------------------------------+
// | Copyright (c) 2002-2003, Richard Heyes, Harald Radi                        |
// | All rights reserved.                                                  |
// |                                                                       |
// | Redistribution and use in source and binary forms, with or without    |
// | modification, are permitted provided that the following conditions    |
// | are met:                                                              |
// |                                                                       |
// | o Redistributions of source code must retain the above copyright      |
// |   notice, this list of conditions and the following disclaimer.       |
// | o Redistributions in binary form must reproduce the above copyright   |
// |   notice, this list of conditions and the following disclaimer in the |
// |   documentation and/or other materials provided with the distribution.|
// | o The names of the authors may not be used to endorse or promote      |
// |   products derived from this software without specific prior written  |
// |   permission.                                                         |
// |                                                                       |
// | THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS   |
// | "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT     |
// | LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR |
// | A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT  |
// | OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, |
// | SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT      |
// | LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, |
// | DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY |
// | THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT   |
// | (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE |
// | OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  |
// |                                                                       |
// +-----------------------------------------------------------------------+
// | Author: Richard Heyes <richard@phpguru.org>                           |
// |         Harald Radi <harald.radi@nme.at>                              |
// +-----------------------------------------------------------------------+
//
// $Id: main.js,v 1.80 2010/03/17 11:11:14 uid10005 Exp $

/**
* ###############################################
* REMOVED HARD CODED IMAGE WIDTHS [VARUN]
* ###############################################
*/


/**
* Function to create copies of objects which are
* normally passed around by references (Arrays for example)
*/
function arrayCopy(input)
{
	var output = new Array(input.length);

	for (i in input) {
		if (typeof(input[i]) == 'array') {
			output[i] = arrayCopy(input[i]);
		} else {
			output[i] = input[i];
		}
	}

	return output;
}

/**
* TreeMenu class
*/
	function TreeMenu(iconpath, myname, linkTarget, defaultClass, usePersistence, noTopLevelImages)
	{
		// Properties
		this.iconpath         = iconpath;
		this.myname           = myname;
		this.linkTarget       = linkTarget;
		this.defaultClass     = defaultClass;
		this.usePersistence   = usePersistence;
		this.noTopLevelImages = noTopLevelImages;
		this.n                = new Array();
		this.output           = '';

		this.nodeRefs       = new Array();
		this.branches       = new Array();
		this.branchStatus   = new Array();
		this.layerRelations = new Array();
		this.childParents   = new Array();
		this.cookieStatuses = new Array();

		this.preloadImages();
	}

/**
* Adds a node to the tree
*/
	TreeMenu.prototype.addItem = function (newNode)
	{
		newIndex = this.n.length;
		this.n[newIndex] = newNode;
		
		return this.n[newIndex];
	}

/**
* Preload images hack for Mozilla
*/
	TreeMenu.prototype.preloadImages = function ()
	{
		var plustop    = new Image; plustop.src    = this.iconpath + '/plustop.gif';
		var plusbottom = new Image; plusbottom.src = this.iconpath + '/plusbottom.gif';
		var plus       = new Image; plus.src       = this.iconpath + '/plus.gif';
	
		var minustop    = new Image; minustop.src    = this.iconpath + '/minustop.gif';
		var minusbottom = new Image; minusbottom.src = this.iconpath + '/minusbottom.gif';
		var minus       = new Image; minus.src       = this.iconpath + '/minus.gif';
	
		var branchtop    = new Image; branchtop.src    = this.iconpath + '/branchtop.gif';
		var branchbottom = new Image; branchbottom.src = this.iconpath + '/branchbottom.gif';
		var branch       = new Image; branch.src       = this.iconpath + '/branch.gif';
	
		var linebottom = new Image; linebottom.src = this.iconpath + '/linebottom.gif';
		var line       = new Image; line.src       = this.iconpath + '/line.gif';
	}

/**
* Main function that draws the menu and assigns it
* to the layer (or document.write()s it)
*/
	TreeMenu.prototype.drawMenu = function ()// OPTIONAL ARGS: nodes = [], level = [], prepend = '', expanded = false, visbility = 'inline', parentLayerID = null
	{
		/**
	    * Necessary variables
	    */
		var output        = '';
		var modifier      = '';
		var layerID       = '';
		var parentLayerID = '';
	
		/**
	    * Parse any optional arguments
	    */
		var nodes         = arguments[0] ? arguments[0] : this.n
		var level         = arguments[1] ? arguments[1] : [];
		var prepend       = arguments[2] ? arguments[2] : '';
		var expanded      = arguments[3] ? arguments[3] : false;
		var visibility    = arguments[4] ? arguments[4] : 'inline';
		var parentLayerID = arguments[5] ? arguments[5] : null;

		var currentlevel  = level.length;

		for (var i=0; i<nodes.length; i++) {
		
			level[currentlevel] = i+1;
			layerID = this.myname + '_' + 'node_' + this.implode('_', level);

			/**
            * Store this object in the nodeRefs array
            */
			this.nodeRefs[layerID] = nodes[i];

			/**
	        * Store the child/parent relationship
	        */
			this.childParents[layerID] = parentLayerID;
	
			/**
	        * Gif modifier
	        */
			if (i == 0 && parentLayerID == null) {
				modifier = nodes.length > 1 ? "top" : 'single';
			} else if(i == (nodes.length-1)) {
				modifier = "bottom";
			} else {
				modifier = "";
			}
	
			/**
	        * Single root branch is always expanded
	        */
			if (!this.doesMenu() || (parentLayerID == null && (nodes.length == 1 || this.noTopLevelImages))) {
				expanded = true;
	
			} else if (nodes[i].expanded) {
				expanded = true;
	
			} else {
				expanded = false;
			}
	
			/**
	        * Make sure visibility is correct based on parent status
	        */
			visibility =  this.checkParentVisibility(layerID) ? visibility : 'none';

			/**
	        * Setup branch status and build an indexed array
			* of branch layer ids
	        */
			if (nodes[i].n.length > 0) {
				this.branchStatus[layerID] = expanded;
				this.branches[this.branches.length] = layerID;
			}
	
			/**
	        * Setup toggle relationship
	        */
			if (!this.layerRelations[parentLayerID]) {
				this.layerRelations[parentLayerID] = new Array();
			}
			this.layerRelations[parentLayerID][this.layerRelations[parentLayerID].length] = layerID;
	
			/**
	        * Branch images
	        */
			var gifname  = nodes[i].n.length && this.doesMenu() && nodes[i].isDynamic ? (expanded ? 'minus' : 'plus') : 'branch';
			var iconName = expanded && nodes[i].expandedIcon ? nodes[i].expandedIcon : nodes[i].icon;
			var iconimg  = nodes[i].icon ? this.stringFormat('<img src="{0}/{1}" align="top" id="icon_{2}">', this.iconpath, iconName, layerID) : '';
			
			/**
			* Add event handlers
			*/
			var eventHandlers = "";
			for (j in nodes[i].events) {
				eventHandlers += this.stringFormat('{0}="{1}" ', j, nodes[i].events[j]);
			}

			/**
	        * Build the html to write to the document
			* IMPORTANT:
			* document.write()ing the string: '<div style="display:...' will screw up nn4.x
	        */
			var layerTag  = this.doesMenu() ? this.stringFormat('<div id="{0}" style="display: {1}" class="{2}">', layerID, visibility, (nodes[i].cssClass ? nodes[i].cssClass : this.defaultClass)) : this.stringFormat('<div class="{0}">', nodes[i].cssClass ? nodes[i].cssClass : this.defaultClass);
			var onMDown   = this.doesMenu() && nodes[i].n.length  && nodes[i].isDynamic ? this.stringFormat('onmousedown="{0}.toggleBranch(\'{1}\', true)" style="cursor: pointer; cursor: hand"', this.myname, layerID) : '';
			var imgTag    = this.stringFormat('<img src="{0}/{1}{2}.gif" align="top" border="0" name="img_{3}" {4}>', this.iconpath, gifname, modifier, layerID, onMDown);
			var linkTarget= nodes[i].linkTarget ? nodes[i].linkTarget : this.linkTarget;
			var linkStart = nodes[i].link ? this.stringFormat('<a href="{0}" target="{1}">', nodes[i].link, linkTarget) : '';

			var linkEnd   = nodes[i].link ? '</a>' : '';

			this.output += this.stringFormat('{0}<nobr>{1}{2}{3}{4}<span {5}>{6}</span>{7}</nobr><br></div>',
			                  layerTag,
							  prepend,
			                  parentLayerID == null && (nodes.length == 1 || this.noTopLevelImages) ? '' : imgTag,
							  iconimg,
							  linkStart,
							  eventHandlers,
							  nodes[i].title,
							  linkEnd);

			/**
	        * Traverse sub nodes ?
	        */
			if (nodes[i].n.length) {
				/**
	            * Determine what to prepend. If there is only one root
				* node then the prepend to pass to children is nothing.
				* Otherwise it depends on where we are in the tree.
	            */
				if (parentLayerID == null && (nodes.length == 1 || this.noTopLevelImages)) {
					var newPrepend = '';
	
				} else if (i < (nodes.length - 1)) {
					var newPrepend = prepend + this.stringFormat('<img src="{0}/line.gif" align="top">', this.iconpath);
	
				} else {
					var newPrepend = prepend + this.stringFormat('<img src="{0}/linebottom.gif" align="top">', this.iconpath);
				}

				this.drawMenu(nodes[i].n,
				              arrayCopy(level),
				              newPrepend,
				              nodes[i].expanded,
				              expanded ? 'inline' : 'none',
				              layerID);
			}
		}
	}

/**
* Writes the output generated by drawMenu() to the page
*/
	TreeMenu.prototype.writeOutput = function (customdiv)
	{
		if (customdiv != "")
		{
			customDivObj = browserObject(customdiv);
			if (customDivObj)
			{
				customDivObj.innerHTML = this.output;
			}
		} else {
			document.write(this.output);
		}
	}

/**
* Expand all Nodes
*/
	TreeMenu.prototype.expandAllNodes = function ()
	{
		var nodes = this.n;
		var level = new Array();

		var currentlevel  = level.length;
		var parentLayerID = null;
		var visibility = 'inline';

		for (var i=0; i<nodes.length; i++) {
			level[currentlevel] = i+1;
			layerID = this.myname + '_' + 'node_' + this.implode('_', level);

			if (this.layerRelations[layerID]) {
				this.toggleBranch(layerID, true);
			}
		}

		return true;
	}


/**
* Toggles a branches visible status. Called from resetBranches()
* and also when a +/- graphic is clicked.
*/
	TreeMenu.prototype.toggleBranch = function (layerID, updateStatus) // OPTIONAL ARGS: fireEvents = true
	{
		var currentDisplay = this.getLayer(layerID).style.display;
		var newDisplay     = (this.branchStatus[layerID] && currentDisplay == 'inline') ? 'none' : 'inline';
		var fireEvents     = arguments[2] != null ? arguments[2] : true;

		for (var i=0; i<this.layerRelations[layerID].length; i++) {

			if (this.branchStatus[this.layerRelations[layerID][i]]) {
				this.toggleBranch(this.layerRelations[layerID][i], false);
			}
	
			this.getLayer(this.layerRelations[layerID][i]).style.display = newDisplay;
		}
	
		if (updateStatus) {
			this.branchStatus[layerID] = !this.branchStatus[layerID];
	
			/**
	        * Persistence
	        */
			if (this.doesPersistence() && !arguments[2] && this.usePersistence) {
				this.setExpandedStatusForCookie(layerID, this.branchStatus[layerID]);
			}

			/**
			* Fire custom events
			*/
			if (fireEvents) {
				nodeObject = this.nodeRefs[layerID];
	
				if (nodeObject.ontoggle != null) {
					eval(nodeObject.ontoggle);
				}
				
				if (newDisplay == 'none' && nodeObject.oncollapse != null) {
					eval(nodeObject.oncollapse);
				} else if (newDisplay == 'inline' && nodeObject.onexpand != null){
					eval(nodeObject.onexpand);
				}
			}

			// Swap image
			this.swapImage(layerID);
		}

		// Swap icon
		this.swapIcon(layerID);
	}

/**
* Swaps the plus/minus branch images
*/
	TreeMenu.prototype.swapImage = function (layerID)
	{
		var imgSrc = document.images['img_' + layerID].src;
	
		var re = /^(.*)(plus|minus)(bottom|top|single)?.gif$/;	//	SWIFTTHREE-246
		if (matches = imgSrc.match(re)) {
	
			document.images['img_' + layerID].src = this.stringFormat('{0}{1}{2}{3}',
			                                                matches[1],
															matches[2] == 'plus' ? 'minus' : 'plus',
															matches[3] ? matches[3] : '',
															'.gif');
		}
	}

/**
* Swaps the icon for the expanded icon if one
* has been supplied.
*/
	TreeMenu.prototype.swapIcon = function (layerID)
	{
		if (document.images['icon_' + layerID]) {
			var imgSrc = document.images['icon_' + layerID].src;
	
			if (this.nodeRefs[layerID].icon && this.nodeRefs[layerID].expandedIcon) {
				var newSrc = (imgSrc.indexOf(this.nodeRefs[layerID].expandedIcon) == -1 ? this.nodeRefs[layerID].expandedIcon : this.nodeRefs[layerID].icon);
	
				document.images['icon_' + layerID].src = this.iconpath + '/' + newSrc;
			}
		}
	}

/**
* Can the browser handle the dynamic menu?
*/
	TreeMenu.prototype.doesMenu = function ()
	{
		return (is_ie4up || is_nav6up || is_gecko || is_opera7);
	}

/**
* Can the browser handle save the branch status
*/
	TreeMenu.prototype.doesPersistence = function ()
	{
		return (is_ie4up || is_gecko || is_nav6up || is_opera7);
	}

/**
* Returns the appropriate layer accessor
*/
	TreeMenu.prototype.getLayer = function (layerID)
	{
		if (is_ie4) {
			return document.all(layerID);
	
		} else if (document.getElementById(layerID)) {
			return document.getElementById(layerID);
	
		} else if (document.all(layerID)) {
			return document.all(layerID);
		}
	}

/**
* Save the status of the layer
*/
	TreeMenu.prototype.setExpandedStatusForCookie = function (layerID, expanded)
	{
		this.cookieStatuses[layerID] = expanded;
		this.saveCookie();
	}

/**
* Load the status of the layer
*/
	TreeMenu.prototype.getExpandedStatusFromCookie = function (layerID)
	{
		if (this.cookieStatuses[layerID]) {
			return this.cookieStatuses[layerID];
		}

		return false;
	}

/**
* Saves the cookie that holds which branches are expanded.
* Only saves the details of the branches which are expanded.
*/
	TreeMenu.prototype.saveCookie = function ()
	{
		var cookieString = new Array();

		for (var i in this.cookieStatuses) {
			if (this.cookieStatuses[i] == true) {
				cookieString[cookieString.length] = i;
			}
		}
		
		// ======= PERMANENT COOKIE PATCH [VARUN] =======
		var expire = new Date();
		expire.setTime(expire.getTime() + 365*24*60*60*1000);

		document.cookie = 'TreeMenuBranchStatus=' + cookieString.join(':')+"; expires="+expire.toUTCString();
	}

/**
* Reads cookie parses it for status info and
* stores that info in the class member.
*/
	TreeMenu.prototype.loadCookie = function ()
	{
		var cookie = document.cookie.split('; ');

		for (var i=0; i < cookie.length; i++) {
			var crumb = cookie[i].split('=');
			if ('TreeMenuBranchStatus' == crumb[0] && crumb[1]) {
				var expandedBranches = crumb[1].split(':');
				for (var j=0; j<expandedBranches.length; j++) {
					this.cookieStatuses[expandedBranches[j]] = true;
				}
			}
		}
	}

/**
* Reset branch status
*/
	TreeMenu.prototype.resetBranches = function ()
	{
		if (!this.doesPersistence()) {
			return false;
		}
		
		this.loadCookie();

		for (var i=0; i<this.branches.length; i++) {
			var status = this.getExpandedStatusFromCookie(this.branches[i]);
			// Only update if it's supposed to be expanded and it's not already
			if (status == true && this.branchStatus[this.branches[i]] != true) {
				if (this.checkParentVisibility(this.branches[i])) {
					this.toggleBranch(this.branches[i], true, false);
				} else {
					this.branchStatus[this.branches[i]] = true;
					this.swapImage(this.branches[i]);
				}
			}
		}
	}

/**
* Checks whether a branch should be open
* or not based on its parents' status
*/
	TreeMenu.prototype.checkParentVisibility = function (layerID)
	{
		if (this.in_array(this.childParents[layerID], this.branches)
		    && this.branchStatus[this.childParents[layerID]]
			&& this.checkParentVisibility(this.childParents[layerID]) ) {
			
			return true;
	
		} else if (this.childParents[layerID] == null) {
			return true;
		}
		
		return false;
	}

/**
* New C# style string formatter
*/
	TreeMenu.prototype.stringFormat = function (strInput)
	{
		var idx = 0;
	
		for (var i=1; i<arguments.length; i++) {
			while ((idx = strInput.indexOf('{' + (i - 1) + '}', idx)) != -1) {
				strInput = strInput.substring(0, idx) + arguments[i] + strInput.substr(idx + 3);
			}
		}
		
		return strInput;
	}

/**
* Also much adored, the PHP implode() function
*/
	TreeMenu.prototype.implode = function (seperator, input)
	{
		var output = '';
	
		for (var i=0; i<input.length; i++) {
			if (i == 0) {
				output += input[i];
			} else {
				output += seperator + input[i];
			}
		}
		
		return output;
	}

/**
* Aah, all the old favourites are coming out...
*/
	TreeMenu.prototype.in_array = function (item, arr)
	{
		for (var i=0; i<arr.length; i++) {
			if (arr[i] == item) {
				return true;
			}
		}
	
		return false;
	}

/**
* TreeNode Class
*/
	function TreeNode(title, icon, link, expanded, isDynamic, cssClass, linkTarget, expandedIcon)
	{
		this.title        = title;
		this.icon         = icon;
		this.expandedIcon = expandedIcon;
		this.link         = link;
		this.expanded     = expanded;
		this.isDynamic    = isDynamic;
		this.cssClass     = cssClass;
		this.linkTarget   = linkTarget;
		this.n            = new Array();
		this.events       = new Array();
		this.handlers     = null;
		this.oncollapse   = null;
		this.onexpand     = null;
		this.ontoggle     = null;
	}

/**
* Adds a node to an already existing node
*/
	TreeNode.prototype.addItem = function (newNode)
	{
		newIndex = this.n.length;
		this.n[newIndex] = newNode;
		
		return this.n[newIndex];
	}

/**
* Sets an event for this particular node
*/
	TreeNode.prototype.setEvent = function (eventName, eventHandler)
	{
		switch (eventName.toLowerCase()) {
			case 'onexpand':
				this.onexpand = eventHandler;
				break;

			case 'oncollapse':
				this.oncollapse = eventHandler;
				break;

			case 'ontoggle':
				this.ontoggle = eventHandler;
				break;

			default:
				this.events[eventName] = eventHandler;
		}
	}

/**
* That's the end of the tree classes. What follows is
* the browser detection code.
*/
	

//<!--
// Ultimate client-side JavaScript client sniff. Version 3.03
// (C) Netscape Communications 1999-2001.  Permission granted to reuse and distribute.
// Revised 17 May 99 to add is_nav5up and is_ie5up (see below).
// Revised 20 Dec 00 to add is_gecko and change is_nav5up to is_nav6up
//                      also added support for IE5.5 Opera4&5 HotJava3 AOLTV
// Revised 22 Feb 01 to correct Javascript Detection for IE 5.x, Opera 4,
//                      correct Opera 5 detection
//                      add support for winME and win2k
//                      synch with browser-type-oo.js
// Revised 26 Mar 01 to correct Opera detection
// Revised 02 Oct 01 to add IE6 detection

// Everything you always wanted to know about your JavaScript client
// but were afraid to ask. Creates "is_" variables indicating:
// (1) browser vendor:
//     is_nav, is_ie, is_opera, is_hotjava, is_webtv, is_TVNavigator, is_AOLTV
// (2) browser version number:
//     is_major (integer indicating major version number: 2, 3, 4 ...)
//     is_minor (float   indicating full  version number: 2.02, 3.01, 4.04 ...)
// (3) browser vendor AND major version number
//     is_nav2, is_nav3, is_nav4, is_nav4up, is_nav6, is_nav6up, is_gecko, is_ie3,
//     is_ie4, is_ie4up, is_ie5, is_ie5up, is_ie5_5, is_ie5_5up, is_ie6, is_ie6up, is_hotjava3, is_hotjava3up,
//     is_opera2, is_opera3, is_opera4, is_opera5, is_opera5up
// (4) JavaScript version number:
//     is_js (float indicating full JavaScript version number: 1, 1.1, 1.2 ...)
// (5) OS platform and version:
//     is_win, is_win16, is_win32, is_win31, is_win95, is_winnt, is_win98, is_winme, is_win2k
//     is_os2
//     is_mac, is_mac68k, is_macppc
//     is_unix
//     is_sun, is_sun4, is_sun5, is_suni86
//     is_irix, is_irix5, is_irix6
//     is_hpux, is_hpux9, is_hpux10
//     is_aix, is_aix1, is_aix2, is_aix3, is_aix4
//     is_linux, is_sco, is_unixware, is_mpras, is_reliant
//     is_dec, is_sinix, is_freebsd, is_bsd
//     is_vms
//
// See http://www.it97.de/JavaScript/JS_tutorial/bstat/navobj.html and
// http://www.it97.de/JavaScript/JS_tutorial/bstat/Browseraol.html
// for detailed lists of userAgent strings.
//
// Note: you don't want your Nav4 or IE4 code to "turn off" or
// stop working when new versions of browsers are released, so
// in conditional code forks, use is_ie5up ("IE 5.0 or greater")
// is_opera5up ("Opera 5.0 or greater") instead of is_ie5 or is_opera5
// to check version in code which you want to work on future
// versions.

/**
* Severly curtailed all this as only certain elements
* are required by TreeMenu, specifically:
*  o is_ie4up
*  o is_nav6up
*  o is_gecko
*/

    // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();

    // *** BROWSER VERSION ***
    // Note: On IE5, these return 4, so use is_ie5up to detect IE5.
    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);

    // Note: Opera and WebTV spoof Navigator.  We do strict client detection.
    // If you want to allow spoofing, take out the tests for opera and webtv.
    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav6up = (is_nav && (is_major >= 5));
    var is_gecko = (agt.indexOf('gecko') != -1);


    var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
    var is_ie4up  = (is_ie && (is_major >= 4));
	
	var is_opera  = (agt.indexOf("opera") != -1);
	var is_opera7 = is_opera && (agt.indexOf("opera 7") != -1);

	// Patch from Harald Fielker
    if (agt.indexOf('konqueror') != -1) {
        var is_nav    = false;
        var is_nav6up = false;
        var is_gecko  = false;
        var is_ie     = true;
        var is_ie4    = true;
        var is_ie4up  = true;
    }
//--> end hide JavaScript


/**
* ###############################################
* MAIN CACHE FUNCTIONS - ADDED IN 3.00.26
* ###############################################
*/

function print_r(theObj){
  if(theObj.constructor == Array ||
     theObj.constructor == Object){
    document.write("<ul>")
    for(var p in theObj){
      if(theObj[p].constructor == Array||
         theObj[p].constructor == Object){
document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
        document.write("<ul>")
        print_r(theObj[p]);
        document.write("</ul>")
      } else {
document.write("<li>["+p+"] => "+theObj[p]+"</li>");
      }
    }
    document.write("</ul>")
  }
}

function buildMainMenus()
{
	var sendemail = new Array();
	var phoneticket = new Array();
	var itemstyle;

	if (swticketdepartments.length != 0)
	{
	sendemail.push({"itemoff":[21,0]});
	phoneticket.push({"itemoff":[21,0]});

	for (var ii=0; ii<swticketdepartments.length; ii++)
	{
		if (swticketdepartments[ii] == null)
		{
			continue;
		}
		if (swticketdepartments[ii][2] == 1)
		{
			itemstyle = SUBPOPUPTOP;
		} else {
			itemstyle = SUBPOPUP;
		}

		if (swticketdepartments[ii][0].length > 16)
		{
			swticketdepartments[ii][0] = swticketdepartments[ii][0].substr(0,16)+"...";
		}

		sendemail.push({code:swticketdepartments[ii][0], "format":{"image":themepath+"menu_folderblue.gif", "oimage":themepath+"menu_folderblue.gif", "style":itemstyle, "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=newticket&type=generic&departmentid="+swticketdepartments[ii][1]});
		phoneticket.push({code:swticketdepartments[ii][0], "format":{"image":themepath+"menu_folderblue.gif", "oimage":themepath+"menu_folderblue.gif", "style":itemstyle, "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=newticket&type=phone&departmentid="+swticketdepartments[ii][1]});
	}

	MENU_TICKETNEW =
[
	{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[22,180], "itemoff":[21,0], "leveloff":[10,59], "delay":1000, "style":VSTYLE, "imgsize":[20,17], dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
	{code:"Send E-mail", "format":{"itemoff":[0,0], "leveloff":[5,179], "arrow":themepath+"icon_rightarrowblue.gif", "oarrow":themepath+"icon_rightarrowblue.gif", "arrsize":[10,10], "image":themepath+"menu_ticketnormal.gif", "oimage":themepath+"menu_ticketnormal.gif", "imgsize":[20,22]}, url:"javascript:void(0);",
					sub: sendemail
	},
	{code:"Phone Ticket", url:"javascript:void(0);", "format":{"itemoff":[21,0], "leveloff":[5,179], "arrow":themepath+"icon_rightarrowblue.gif", "oarrow":themepath+"icon_rightarrowblue.gif", "arrsize":[10,10], "image":themepath+"menu_ticketphone.gif", "oimage":themepath+"menu_ticketphone.gif", "imgsize":[20,22]},
					sub: phoneticket
	}
];
	}

CLoadNotify();

if (kbmenuloaded)
{
	var kbmenu = new COOLjsMenuPRO("kbcachemenu", MENU_JSCACHE_KNOWLEDGEBASE);
	kbmenu.initTop();
}
if (prmenuloaded)
{
	var prmenu = new COOLjsMenuPRO("prcachemenu", MENU_JSCACHE_PREDEFINED);
	prmenu.initTop();
}
if (dlmenuloaded)
{
	var dlmenu = new COOLjsMenuPRO("dlcachemenu", MENU_JSCACHE_DOWNLOADS);
	dlmenu.initTop();
}

	if (swmenulist.length != 0)
	{
		for (var ii=0; ii<swmenulist.length; ii++)
		{
			if (swmenulist[ii] == null)
			{
				continue;
			}

			eval('var menu'+ ii +' = new COOLjsMenuPRO("'+ swmenulist[ii][0] +'", '+ swmenulist[ii][1] +'); menu'+ ii +'.initTop();');
		}
	}
}

function buildViewTicketMenus(swphrases, swticketid)
{

MENU_FORWARDQUOTE =
[
	{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[23,180], "itemoff":[21,0], "leveloff":[10,59], "delay":1000, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
	{code:"Quote Client Posts", "format":{"itemoff":[0,0], "image":themepath+"menu_quoteclient.gif", "oimage":themepath+"menu_quoteclient.gif", "imgsize":[20,22], "style":VSTYLEBORDER}, url:"javascript:fetchData(\'forwardquote\', \'"+swticketid+"\');"},
	{code:"Quote All Posts", url:"javascript:fetchData(\'forwardquoteall\', \'"+swticketid+"\');", "format":{"image":themepath+"menu_quoteall.gif", "oimage":themepath+"menu_quoteall.gif", "imgsize":[20,22]}}
];

MENU_FLAGTICKET =
[
	{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[22,180], "itemoff":[20,0], "leveloff":[10,59], "delay":1500, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
	{code:swphrases['purpleflag'], "format":{"style":VSTYLEBORDER, "itemoff":[0,0], "image":themepath+"menu_purpleflag.gif", "oimage":themepath+"menu_purpleflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=purple"},
	{code:swphrases['redflag'], "format":{"image":themepath+"menu_redflag.gif", "oimage":themepath+"menu_redflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=red"},
	{code:swphrases['orangeflag'], "format":{"image":themepath+"menu_orangeflag.gif", "oimage":themepath+"menu_orangeflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=orange"},
	{code:swphrases['yellowflag'], "format":{"image":themepath+"menu_yellowflag.gif", "oimage":themepath+"menu_yellowflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=yellow"},
	{code:swphrases['blueflag'], "format":{"image":themepath+"menu_blueflag.gif", "oimage":themepath+"menu_blueflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=blue"},
	{code:swphrases['greenflag'], "format":{"image":themepath+"menu_greenflag.gif", "oimage":themepath+"menu_greenflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=green"},
	{code:swphrases['clearflag'], "format":{"image":themepath+"menu_clearflag.gif", "oimage":themepath+"menu_clearflag.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=flagticket&flag=clear"}
];
MENU_EXPORTTICKET =
[
	{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[22,180], "itemoff":[20,0], "leveloff":[10,59], "delay":1500, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
	{code:swphrases['exportpdf'], "format":{"style":VSTYLEBORDER, "itemoff":[0,0], "image":themepath+"menu_pdf.gif", "oimage":themepath+"menu_pdf.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=export&type=pdf"},
	{code:swphrases['exportxml'], "format":{"image":themepath+"menu_exportxml.gif", "oimage":themepath+"menu_exportxml.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=export&type=xml"},
];
MENU_TICKETOPTIONS =
[
	{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[22,180], "itemoff":[20,0], "leveloff":[10,59], "delay":1500, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
	{code:swphrases['printticket'], "format":{"style":VSTYLEBORDER, "itemoff":[0,0], "image":themepath+"menu_print.gif", "oimage":themepath+"menu_print.gif", "imgsize":[20,22]}, url:"javascript:popupDataWindow('index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=options&type=print');"},
	{code:swphrases['mergeticket'], "format":{"image":themepath+"menu_mergeticket.gif", "oimage":themepath+"menu_mergeticket.gif", "imgsize":[20,22]}, url:"javascript:switchGridTab(\'ttedit\', \'tickets\');fetchData(\'edit\', \'"+swticketid+"\');"},
	{code:swphrases['ban'], "format":{"image":themepath+"menu_ban.gif", "oimage":themepath+"menu_ban.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=options&type=ban"},
	{code:swphrases['bandelete'], "format":{"image":themepath+"menu_bandelete.gif", "oimage":themepath+"menu_bandelete.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=options&type=bandelete"},
	{code:swphrases["dodelete"], "format":{"image":themepath+"menu_delete.gif", "oimage":themepath+"menu_delete.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=options&type=delete"},
];
MENU_MARKDUE =
[
	{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[22,180], "itemoff":[20,0], "leveloff":[10,59], "delay":1500, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
	{code:swphrases['markasdue'], "format":{"style":VSTYLEBORDER, "itemoff":[0,0], "image":themepath+"menu_markdue.gif", "oimage":themepath+"menu_markdue.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=markdue&type=due"},
	{code:swphrases['markduetf'], "format":{"image":themepath+"menu_markdue24.gif", "oimage":themepath+"menu_markdue24.gif", "imgsize":[20,22]}, url:"index.php?_m=tickets&_a=ticketactions&ticketid="+swticketid+"&action=markdue&type=due24"}
];

var tflagmenu = new COOLjsMenuPRO("tflagmenu", MENU_FLAGTICKET);
tflagmenu.initTop();
tflagmenu.init();
var texportticket = new COOLjsMenuPRO("texportticket", MENU_EXPORTTICKET);
texportticket.initTop();
texportticket.init();
var tticketoptions = new COOLjsMenuPRO("tticketoptions", MENU_TICKETOPTIONS);
tticketoptions.initTop();
tticketoptions.init();
var tmarkdue = new COOLjsMenuPRO("tmarkdue", MENU_MARKDUE);
tmarkdue.initTop();
tmarkdue.init();
var fwquotemenu = new COOLjsMenuPRO("fwquotemenu", MENU_FORWARDQUOTE);
fwquotemenu.initTop();
fwquotemenu.init();
}

function buildTopTabMenu()
{
	document.write('<table width="100%"  border="0" cellspacing="0" cellpadding="0"><tr>');
	for (var ii=0; ii<swtabmenu.length; ii++)
	{
		if (swtabmenu[ii] == null)
		{
			continue;
		}

		document.write('<td '+swtabmenutype+'="javascript:switchTab('+swtabmenu[ii][0]+', '+swtabmenu[ii][2]+');"><table width="'+swtabmenu[ii][1]+'"  border="0" cellspacing="0" cellpadding="0"><tr height="21">');
		if (swtabmenu[ii][0] != 1)
		{
			document.write('<td bgcolor="#414142" width="1"><img src="'+themepath+'space.gif" width="1" height="1"></td><td width="1" class="'+swmenubg1+'"><img src="'+themepath+'space.gif" width="1" height="21"></td>');
		}

		var tabmenbg = swmenubg2;
		if (swtabselmenu == swtabmenu[ii][0])
		{
			tabmenbg = "menusection"+swtabmenu[ii][2];
		}

		document.write('<td id="tb_menusection'+swtabmenu[ii][0]+'" align="center" class="'+ tabmenbg +'">'+ swtabmenu[ii][3] +'</td></tr></table></td>');
	}

	document.write('<td><table width="100%"  border="0" cellspacing="0" cellpadding="0"><tr><td bgcolor="#414142" width="1"><img src="'+themepath+'space.gif" width="1" height="1"></td><td width="1" class="menudefbg"><img src="'+themepath+'space.gif" width="1" height="21"></td><td class="'+swmenubg2+'">&nbsp;</td></tr></table></td><td width="100%" class="'+swmenubg2+'"><table width="100%"  border="0" cellspacing="0" cellpadding="0"><tr><td><img src="'+themepath+'space.gif" width="1" height="21"></td></tr></table></td></tr>');

	document.write('<tr id="tb_menuline" class="menuline'+swtabselmenuclass+'" height="1"><td colspan="'+swtabmenucolspan+'"><img src="'+themepath+'space.gif" width="1" height="5"></td></tr><tr id="tb_menulinks" align="left" class="menulinks'+swtabselmenuclass+'" valign="middle"><td colspan="'+swtabmenucolspan+'"> <table width="100%"  border="0" cellspacing="0" cellpadding="0" height="5" height="100%"><tr valign="middle"><td width="94%" valign="middle"><div id="linksdiv" class="menulinks'+swtabselmenuclass+'" style="padding-left:5px;padding-top:5px;padding-bottom:5px;width:100%;height:13px;">');

	document.write(menulinks[swtabselmenu]);

	document.write('</div></td><td width="6%"><img src="'+themepath+'space.gif" width="1"></td></tr></table></td></tr></table>');
}

function buildTicketViewMenus(newlabeltext, tdeletetext, tvdepid, tvtsid, tlabelid)
{
	if (tlabelid != 0)
	{
		var MENU_TICKETLABELS =
		[
			{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[50,180], "itemoff":[50,0], "leveloff":[10,59], "delay":1000, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
			{code:"<table width='100%'  border='0' cellspacing='0' cellpadding='2'><tr><td width='1'><img src='"+themepath+"doublearrows.gif' border='0' /></td><td width='100%'><span class='smalltext'>"+newlabeltext+"</span></td></tr><tr><td colspan='2'><form name='tlabform' action='index.php' method='POST'><input type='text' name='title' class='swifttext' id='ticketlabel' style='width:160px;' /><input type='hidden' name='_m' value='tickets' /><input type='hidden' name='_a' value='ticketactions' /><input type='hidden' name='action' value='newlabel' /><input type='hidden' name='departmentid' value='"+tvdepid+"' /><input type='hidden' name='ticketstatusid' value='"+tvtsid+"' /></form></td></tr></table>", hasControls:true, "format":{"size":[50,180], "itemoff":[0,0],"style":VSTYLEBORDER}},
			{code:tdeletetext, "format":{"image":themepath+"menu_delete.gif", "oimage":themepath+"menu_delete.gif", "imgsize":[20,22],"size":[22,180]}, url:"index.php?_m=tickets&_a=manage&do=dellabel&ticketlabelid="+tlabelid},
		];
	} else {
		var MENU_TICKETLABELS =
		[
			{"popup":1, "popupoff":[0,0], "pos":[0,0], "zindex":50, "size":[50,180], "itemoff":[50,0], "leveloff":[10,59], "delay":1000, "style":VSTYLE, dynamic: true, https_fix_blank_doc:themepath+'blank.html'},
			{code:"<table width='100%'  border='0' cellspacing='0' cellpadding='2'><tr><td width='1'><img src='"+themepath+"doublearrows.gif' border='0' /></td><td width='100%'><span class='smalltext'>"+newlabeltext+"</span></td></tr><tr><td colspan='2'><form name='tlabform' action='index.php' method='POST'><input type='text' name='title' class='swifttext' id='ticketlabel' style='width:160px;' /><input type='hidden' name='_m' value='tickets' /><input type='hidden' name='_a' value='ticketactions' /><input type='hidden' name='action' value='newlabel' /><input type='hidden' name='departmentid' value='"+tvdepid+"' /><input type='hidden' name='ticketstatusid' value='"+tvtsid+"' /></form></td></tr></table>", hasControls:true, "format":{"size":[50,180], "itemoff":[0,0],"style":VSTYLEBORDER}}
		];
	}
	tlabelmenu = new COOLjsMenuPRO("tlabelmenu", MENU_TICKETLABELS);
	tlabelmenuloaded = true;
	tlabelmenu.initTop();
	tlabelmenu.init();
}


/**
* ###############################################
* AUTO COMPLETE FOR STAFF CP IRS - By Zichun
* This code has been modified to use AJAX
* ###############################################
*/

/* Event Functions */

// Add an event to the obj given
// event_name refers to the event trigger, without the "on", like click or mouseover
// func_name refers to the function callback when event is triggered
function addEvent(obj,event_name,func_name){
	if (obj.attachEvent){
		obj.attachEvent("on"+event_name, func_name);
	}else if(obj.addEventListener){
		obj.addEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = func_name;
	}
}

// Removes an event from the object
function removeEvent(obj,event_name,func_name){
	if (obj.detachEvent){
		obj.detachEvent("on"+event_name,func_name);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = null;
	}
}

// Stop an event from bubbling up the event DOM
function stopEvent(evt){
	evt || window.event;
	if (evt.stopPropagation){
		evt.stopPropagation();
		evt.preventDefault();
	}else if(typeof evt.cancelBubble != "undefined"){
		evt.cancelBubble = true;
		evt.returnValue = false;
	}
	return false;
}

// Get the obj that starts the event
function getElement(evt){
	if (window.event){
		return window.event.srcElement;
	}else{
		return evt.currentTarget;
	}
}
// Get the obj that triggers off the event
function getTargetElement(evt){
	if (window.event){
		return window.event.srcElement;
	}else{
		return evt.target;
	}
}
// For IE only, stops the obj from being selected
function stopSelect(obj){
	if (typeof obj.onselectstart != 'undefined'){
		addEvent(obj,"selectstart",function(){ return false;});
	}
}

/*    Caret Functions     */

// Get the end position of the caret in the object. Note that the obj needs to be in focus first
function getCaretEnd(obj){
	if(typeof obj.selectionEnd != "undefined"){
		return obj.selectionEnd;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToEnd",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// Get the start position of the caret in the object
function getCaretStart(obj){
	if(typeof obj.selectionStart != "undefined"){
		return obj.selectionStart;
	}else if(document.selection&&document.selection.createRange){
		var M=document.selection.createRange();
		try{
			var Lp = M.duplicate();
			Lp.moveToElementText(obj);
		}catch(e){
			var Lp=obj.createTextRange();
		}
		Lp.setEndPoint("EndToStart",M);
		var rb=Lp.text.length;
		if(rb>obj.value.length){
			return -1;
		}
		return rb;
	}
}
// sets the caret position to l in the object
function setCaret(obj,l){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(l,l);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',l);
		m.collapse();
		m.select();
	}
}
// sets the caret selection from s to e in the object
function setSelection(obj,s,e){
	obj.focus();
	if (obj.setSelectionRange){
		obj.setSelectionRange(s,e);
	}else if(obj.createTextRange){
		m = obj.createTextRange();		
		m.moveStart('character',s);
		m.moveEnd('character',e);
		m.select();
	}
}

/*    Escape function   */
String.prototype.addslashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};
/* --- Escape --- */

/* Offset position from top of the screen */
function curTop(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return toreturn;
}
function curLeft(obj){
	toreturn = 0;
	while(obj){
		toreturn += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return toreturn;
}
/* ------ End of Offset function ------- */

/* Types Function */

// is a given input a number?
function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}

/* Object Functions */

function replaceHTML(obj,text){
	while(el = obj.childNodes[0]){
		obj.removeChild(el);
	};
	obj.appendChild(document.createTextNode(text));
}

/**
* ###############################################
* IRS AUTO COMPLETE OBJECT
* ###############################################
*/
function IRSAutoComplete(obj)
{
	this.textObject = obj;
	this.isThreadRunning = false;
	this.cachedContents;
	this.itemMap = new Array();
	this.selectedItem = 0;
	this.itemRange = 0;
	this.isIRSDisplayed = false;

	var keyHandled = false;
	var thisObject = this;

	addEvent(this.textObject, "focus", _startIRS);

	function _startIRS()
	{
		addEvent(document, "keydown", _keyDown);
		addEvent(thisObject.textObject, "blur", _clear);
		addEvent(document, "keypress", _keyPress);

		if (thisObject.isThreadRunning == false)
		{
			setTimeout('window.$IRS.lookupThread()',2000);
		}
	}

	function _keyDown(evt)
	{
		if (!evt) evt = event;
		var currentKeyCode = evt.keyCode;

		keyHandled = false;

		switch (currentKeyCode){
			case 38:
				// Up Arrow
				if (!window.$IRS.isIRSDisplayed)
				{
					return true;
				}

				window.$IRS.moveSelectionUp();
				keyHandled = true;

				return true;
				break;
			case 40: case 9:
				// Down Arrow & Tab
				if (!window.$IRS.isIRSDisplayed)
				{
					return true;
				}

				window.$IRS.moveSelectionDown();
				keyHandled = true;

				return true;
				break;
			case 13:
				// Enter
				window.$IRS.clickHandler();
				keyHandled = true;

				return true;
				break;

			case 27:
				window.$IRS.cleanup();

				return true;
				break;
			default:
				break;
		}
	}

	function _clear(evt)
	{
		if (!evt) evt = event;
		removeEvent(document, "keydown", _keyDown);
		removeEvent(thisObject.textObject, "blur", _clear);
		removeEvent(document, "keypress", _keyPress);

		window.$IRS.cleanup();
	}

	function _keyPress(evt)
	{
		if (!evt) evt = event;

		if (keyHandled) stopEvent(evt);
		return !keyHandled;
	}
}

IRSAutoComplete.prototype.lookupThread = function (x) {
	this.isThreadRunning = true;

	var currentValue = this.textObject.value;

	if (currentValue == "" && this.cachedContents != "")
	{
		window.$IRS.cleanup();
	} else if (currentValue != this.cachedContents && currentValue != "") {
		// Run IRS
		this.changeSearchBoxClass('staffcpirsloading');
		fetchData('kbirs', currentValue, '');
	}

	this.cachedContents = currentValue;
	setTimeout('window.$IRS.lookupThread()',2000);
}

IRSAutoComplete.prototype.render = function (rawdata) {
	var listMain = rawdata.split("\n");

		if (browserObject("coreIRSTable"))
		{
			document.body.removeChild(document.getElementById('coreIRSTable'));
		}

		this.selectedItem = 0;
		this.itemMap = new Array();
		this.itemRange = 0;

		this.changeSearchBoxClass('staffcpirs');
		a = document.createElement('div');
		a.style.position='absolute';
		a.style.top = eval(curTop(this.textObject) + this.textObject.offsetHeight - 1) + "px";
		a.style.left = curLeft(this.textObject) + "px";
		a.id = 'coreIRSTable';
		a.className = 'IRSCoreDiv';

		document.body.appendChild(a);

		this.isIRSDisplayed = true;

		if (rawdata == "0")
		{
			return;
		}

		var itemOffset = 1;
		for (var ii=0;ii<listMain.length;ii++){
			if (listMain[ii] == "" || !listMain[ii])
			{
				continue;
			}

			this.itemRange = itemOffset;

			var listItem = listMain[ii].split("~!~!");
			var itemSubject = listItem[0];
			var itemID = listItem[1];
			var itemRelevance = listItem[2];

			row = document.createElement('div');
			row.className = 'IRSCoreItem';
			row.id = 'coreIRSItem'+itemOffset;
			row.innerHTML = '<div style="FLOAT: left" class="IRSCoreItemRel">'+itemSubject+'</div><div class="IRSCoreItemRel" style="FLOAT: right">'+itemRelevance+'%</div>';

			row.onmousedown = new Function('return window.$IRS.clickHandler("'+itemID+'");');
			row.onmouseover = new Function('return window.$IRS.hoverHandler("'+itemOffset+'");');

			a.appendChild(row);

			this.itemMap[itemOffset] = itemID;
			itemOffset++;
		}
}

IRSAutoComplete.prototype.cleanup = function (x) {
	if (browserObject("coreIRSTable"))
	{
		document.body.removeChild(document.getElementById('coreIRSTable'));
	}

	this.isIRSDisplayed = false;
}

IRSAutoComplete.prototype.moveSelectionUp = function (x) {
	if (this.selectedItem == 0 || (this.selectedItem-1) == 0)
	{
		return false;
	}

	var previousItem = browserObject("coreIRSItem"+this.selectedItem);
	if (previousItem)
	{
		previousItem.className = 'IRSCoreItem';
	}

	this.selectedItem--;
	var newItem = browserObject("coreIRSItem"+this.selectedItem);

	if (newItem)
	{
		newItem.className = 'IRSCoreItemHighlight';
	}
}

IRSAutoComplete.prototype.moveSelectionDown = function (customSelectedItem) {
	if ((this.selectedItem-1) >= this.itemRange && this.itemRange >= 1)
	{
		return false;
	}

	if (this.itemRange == 1)
	{
		this.selectedItem = 0;
	}

	var previousSelectedItem = this.selectedItem;

	var previousItem = browserObject("coreIRSItem"+this.selectedItem);

	if (customSelectedItem)
	{
		this.selectedItem = customSelectedItem;
	} else {
		this.selectedItem++;
	}
	var newItem = browserObject("coreIRSItem"+this.selectedItem);

	if (previousItem && newItem)
	{
		previousItem.className = 'IRSCoreItem';
	} else if (previousItem && !newItem) {
		this.selectedItem = previousSelectedItem;
		previousItem.className = 'IRSCoreItemHighlight';
	}

	if (newItem)
	{
		newItem.className = 'IRSCoreItemHighlight';
	}
}

IRSAutoComplete.prototype.hoverHandler = function (x) {
	this.moveSelectionDown(x);
}

IRSAutoComplete.prototype.clickHandler = function (x) {
	var kbarticleid;

	if (this.isIRSDisplayed == false)
	{
		this.changeSearchBoxClass('staffcpirsloading');
		fetchData('kbirs', this.textObject.value, '');

		return false;
	}

	if (!x)
	{
		kbarticleid = this.itemMap[this.selectedItem];
		if (!kbarticleid)
		{
			return false;
		}
	} else {
		kbarticleid = x;
	}

	if (isTicketPage == true)
	{
		switchGridTab('ttpostreply', 'tickets');
		document.replyform.replycontents.focus();
		autoInsertKB(kbarticleid);
	} else {
		popupDataWindow(swiftpath+"staff/index.php?_m=knowledgebase&_a=preview&kbarticleid="+kbarticleid);
	}
}

IRSAutoComplete.prototype.changeSearchBoxClass = function (newClass) {
	this.textObject.className = newClass;
}

function focusIRS()
{
	if (window.$IRS)
	{
		window.$IRS.textObject.focus();
	}
}

		function followupTrigger(type, noform)
		{
			if (type == "custom")
			{
				displayObject("fucalblock");
				hideObject("fuvalblock");
			} else {
				displayObject("fuvalblock");
				hideObject("fucalblock");
				if (!noform)
				{
					document.followupform.followupvalue.focus();
				}
			}
		}


/**
* ###############################################
* FOLLOW-UP FUNCTIONS
* ###############################################
*/
/**
* 
*/
function followupHandleItems(type)
{
	formname = getActiveFormName();
	if (type == "general")
	{
		if (document.forms[formname].fugeneral.checked == true)
		{
			displayObject("fumgeneral");
		} else {
			hideObject("fumgeneral");
		}
	} else if (type == "addnotes") {
		if (document.forms[formname].fuaddnotes.checked == true)
		{
			displayObject("fumaddnotes");
		} else {
			hideObject("fumaddnotes");
		}
	} else if (type == "postreply") {
		if (document.forms[formname].fupostreply.checked == true)
		{
			displayObject("fumpostreply");
		} else {
			hideObject("fumpostreply");
		}
	} else if (type == "forward") {
		if (document.forms[formname].fuforward.checked == true)
		{
			displayObject("fumforward");
		} else {
			hideObject("fumforward");
		}
	}
}

/**
* 
*/
function renderFollowUpSubSection(type, ticketid)
{
	if (type == 'release' && !followupStates['rel'])
	{
		displayObject('reldescfollowup');
		displayObject('relfollowupstoredisp');
		fetchData('followupss', ticketid, 'rel');
	} else if (type == 'release' && followupStates['rel']) {
		hideObject('reldescfollowup');
		hideObject('relfollowupstoredisp');
		followupStates['rel'] = false;
	} else if (type == 'forward' && !followupStates['fo']) {
		displayObject('fodescfollowup');
		displayObject('fofollowupstoredisp');
		fetchData('followupss', ticketid, 'fo');
	} else if (type == 'forward' && followupStates['fo']) {
		hideObject('fodescfollowup');
		hideObject('fofollowupstoredisp');
		followupStates['fo'] = false;
	} else if (type == 'reply' && !followupStates['pr']) {
		displayObject('prdescfollowup');
		displayObject('prfollowupstoredisp');
		fetchData('followupss', ticketid, 'pr');
	} else if (type == 'reply' && followupStates['pr']) {
		hideObject('prdescfollowup');
		hideObject('prfollowupstoredisp');
		followupStates['pr'] = false;
	}
}

/**
* 
*/
function processFollowUpForm(errormsg)
{
	formname = getActiveFormName();
	if (!formname)
	{
		return true;
	}

	if (document.forms[formname].dofollowup)
	{
		if ((document.forms[formname].followuptype.value != 'custom' && document.forms[formname].followupvalue.value == '') || (document.forms[formname].followuptype.value == 'custom' && document.forms[formname].followupcalvalue.value == ''))
		{
			alert(errormsg);
			return false;
		}
	}

	return true;
}

/**
* ###############################################
* NEW TICKET LOCK STUFF
* ###############################################
*/

// =========== XML HTTP REQUEST STUFF ==============
var lockhandler;

function loadLockRequest(url) {
	if (window.XMLHttpRequest) {
		lockhandler = new XMLHttpRequest();
		lockhandler.onreadystatechange = handleLockUpdate;
		try {
			lockhandler.open("GET", url, true);
			lockhandler.send(null);
		} catch (e) {
			alert("XMLHttpRequest Open Failed!\nThis can happen if the URL you are accessing the product from (http://www.domain.com/support) is different than the one specified under Admin CP > Settings > General (Ex: http://support.domain.com/). Due to limitations of AJAX, The URL should be *exactly* the same as specified under Product URL setting.");
		}
	} else if (window.ActiveXObject) {
		lockhandler = new ActiveXObject("Microsoft.XMLHTTP");
		if (lockhandler) {
			lockhandler.onreadystatechange = handleLockUpdate;
			try {
				lockhandler.open("GET", url, true);
				lockhandler.send();
			} catch (e) {
				alert("XMLHttpRequest Open Failed!\nThis can happen if the URL you are accessing the product from (http://www.domain.com/support) is different than the one specified under Admin CP > Settings > General (Ex: http://support.domain.com/). Due to limitations of AJAX, The URL should be *exactly* the same as specified under Product URL setting.");
			}
		}
	}
}

/**
* Start the Lock
*/
function startTicketLock(ticketid)
{
	// Load the request
	loadLockRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=ticketlocks&randno="+doRand()+"&ticketid="+ticketid+"&sessionid="+swiftsessionid+"&postcontents=");

	// Set the timer
	setTimeout("triggerTicketLockTimer('"+ticketid+"');", 1000);
}

/**
* The timer that is triggered
*/
var oldReplyValue = '';
function triggerTicketLockTimer(ticketid)
{
	var replyValue = document.replyform.replycontents.value;
	if (replyValue != oldReplyValue)
	{
		loadLockRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=ticketlocks&randno="+doRand()+"&ticketid="+ticketid+"&sessionid="+swiftsessionid+"&postcontents="+encodeURIComponent(replyValue.substring(0,1000)));

		oldReplyValue = replyValue;
	}
	setTimeout("triggerTicketLockTimer('"+ticketid+"');", 2000);
}

function handleLockUpdate() {
	if (lockhandler.readyState == 4) {
		if (lockhandler.status == 200 && lockhandler.responseText != '0' && lockhandler.responseText != '') {
			trObject = browserObject('ticketpostlocktr');
			if (trObject)
			{
				trObject.style.display = '';
			}
			divObject = browserObject('ticketpostlockui');
			if (divObject)
			{
				divObject.innerHTML = lockhandler.responseText;
			}
		}
	}
}

function updateTicketStatusDiv(departmentid, ticketstatusid, formname, ticketid, prefixname) {
	if (formname == 'followupform')
	{
		ticketstatusfield = document.forms[formname].futt_ticketstatusid;
		departmentfield = document.forms[formname].futt_departmentid;
		staffidfield = document.forms[formname].futt_staffid;
	} else {
		ticketstatusfield = document.forms[formname].tt_ticketstatusid;
		departmentfield = document.forms[formname].tt_departmentid;
		staffidfield = document.forms[formname].tt_staffid;
	}
	submitbutton1 = browserObject(formname+'submit1');
	submitbutton2 = browserObject(formname+'submit2');
	if (submitbutton1)
	{
		submitbutton1.disabled = true;
	}
	if (submitbutton2)
	{
		submitbutton2.disabled = true;
	}
	selectname = prefixname+'tt_ticketstatusid';
	ticketstatusfield.disabled = true;
	staffidfield.disabled = true;
	departmentfield.disabled = true;
	divObject = browserObject('ticketstatusbox');

	xmlaction = "updatestatus"+formname;
	//alert(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=departmentstatus&formname="+escape(formname)+"&randno="+doRand()+"&departmentid="+departmentfield.options[departmentfield.selectedIndex].value+"&ticketid="+ticketid+"&ticketstatusid="+ticketstatusfield.options[ticketstatusfield.selectedIndex].value+"&sessionid="+swiftsessionid+"&fieldname="+selectname);
	loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=departmentstatus&formname="+encodeURIComponent(formname)+"&randno="+doRand()+"&ownerstaffid="+staffidfield.options[staffidfield.selectedIndex].value+"&departmentid="+departmentfield.options[departmentfield.selectedIndex].value+"&ticketid="+ticketid+"&ticketstatusid="+ticketstatusfield.options[ticketstatusfield.selectedIndex].value+"&sessionid="+swiftsessionid+"&fieldname="+selectname+"&prefixname="+prefixname);
}

function UpdateAdminQueueTicketStatus() {
	ticketstatusfield = document.forms['queueform'].ticketstatusid;
	departmentfield = document.forms['queueform'].departmentid;
	
  if (departmentfield.options[departmentfield.selectedIndex].value == '0') {
    return false;
  }
	
	submitbutton = browserObject('submitbutton');
	if (submitbutton)
	{
		submitbutton.disabled = true;
	}

	submitbutton.disabled = true;
	ticketstatusfield.disabled = true;
	departmentfield.disabled = true;

	xmlaction = "updatequeueticketstatus";
	loadXMLHTTPRequest(swiftpath+"admin/index.php?_m=tickets&_a=ajax&action=getstatusselect&randno="+doRand()+"&departmentid="+departmentfield.options[departmentfield.selectedIndex].value+"&ticketstatusid="+ticketstatusfield.options[ticketstatusfield.selectedIndex].value+"&sessionid="+swiftsessionid);
}

function updateMassActionDiv() {
	ticketstatusfield = document.forms['ticketlist'].ma_ticketstatusid;
	departmentfield = document.forms['ticketlist'].ma_departmentid;
	staffidfield = document.forms['ticketlist'].ma_staffid;
	submitbutton = browserObject('gridsubmit1');
	if (submitbutton)
	{
		submitbutton.disabled = true;
	}
	ticketstatusfield.disabled = true;
	staffidfield.disabled = true;
	departmentfield.disabled = true;
	submitbutton.disabled = true;

	xmlaction = "updatemassaction";
	loadXMLHTTPRequest(swiftpath+"staff/index.php?_m=tickets&_a=ajax&action=massaction&departmentid="+departmentfield.options[departmentfield.selectedIndex].value+"&ticketstatusid="+ticketstatusfield.options[ticketstatusfield.selectedIndex].value+"&ownerstaffid="+staffidfield.options[staffidfield.selectedIndex].value);
}





// John Haugeland, May 29 2008
var limitTextOldBorders = [];
function limitText(widgetname, maxsize) {

  // to accomodate all browsers and cover pasting, call this from each of onChange, onKeyDown and onKeyUp.
  // pass false as the third arg to disable highlighting.
  // example usage:
  //   <textarea id="ta" onChange="limitText('ta', 6)" onKeyDown="limitText('ta', 6)" onKeyUp="limitText('ta', 6)"></textarea>

  var widget = document.getElementById(widgetname);

  // var oldBorders is to get around Microsoft's broken inline cascade
  if (widget.currentStyle) {
    if (!(limitTextOldBorders[widgetname])) { limitTextOldBorders[widgetname] = widget.currentStyle.borderWidth + ' ' + widget.currentStyle.borderColor + ' ' + widget.currentStyle.borderStyle; }
  }

  if (widget.value.length >= maxsize) {
    if (widget.value.length > maxsize) { widget.value = widget.value.substring(0, maxsize); } // don't set the val at max size, only over it
    widget.style.border = '1px solid #dd7700';
  } else {
    if (widget.currentStyle) {
      widget.style.border = limitTextOldBorders[widgetname]; // hack to get around IE's broken style cascade
    } else {
      widget.style.border = '';
    }
  }
}





// John Haugeland, Feb 9 2009
function AddClassIfMissing(Tag, tclass) {

  switch (Tag.className) {
    case ''        : Tag.className = tclass; break;
    case undefined : Tag.className = tclass; break;
    default :
      var Classes = Tag.className.split(' ');
      for (i in Classes) { if (Classes[i] == tclass) { return; } }
      Tag.className += (' ' + tclass);
  }
}





// only removes the first instance of the class if repeated
function RemoveClassIfPresent(Tag, tclass) {
  var Classes = Tag.className.split(' ');
  for (i in Classes) {
    if (Classes[i] == tclass) {
      Classes.splice(i, 1);
      Tag.className = Classes.join(' ');
      return;
    }
  }
}





function HasClass(Tag, tclass) {
  var Classes = Tag.className.split(' ');
  for (i in Classes) { if (Classes[i] == tclass) { return true; } }
  return false;
}





function ToggleCollapsed(Tag) {

  if (HasClass(Tag, 'collapsed')) {
    RemoveClassIfPresent(Tag, 'collapsed');
  } else {
    AddClassIfMissing(Tag, 'collapsed');
  }

}
