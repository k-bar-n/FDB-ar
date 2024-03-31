function redirectToAnotherPage1() {
    window.location.href = '/'
}
function redirectToAnotherPage2() {
    window.location.href = '/map'
}
function redirectToAnotherPage3() {
    window.location.href = '/founder'
}
function redirectToAnotherPage4() {
    window.location.href = '/page3'
}

// Стеллажи
function redirectToAnotherPage5() {
    window.location.href = '/map/stellazh1'
}
function redirectToAnotherPage6() {
    window.location.href = '/map/stellazh2'
}
function redirectToAnotherPage7() {
    window.location.href = '/map/stellazh3'
}

// Стеллаж 2
function redirectToAnotherPage61() {
    window.location.href = '/map/stellazh2/shelf1'
}
function redirectToAnotherPage62() {
    window.location.href = '/map/stellazh2/shelf2'
}
function redirectToAnotherPage63() {
    window.location.href = '/map/stellazh2/shelf3'
}
function redirectToAnotherPage64() {
    window.location.href = '/map/stellazh2/shelf4'
}
function redirectToAnotherPage65() {
    window.location.href = '/map/stellazh2/shelf5'
}
function redirectToAnotherPage66() {
    window.location.href = '/map/stellazh2/shelf6'
}
function redirectToAnotherPage67() {
    window.location.href = '/map/stellazh2/shelf7'
}

// Стеллаж 3
function redirectToAnotherPage91() {
    window.location.href = '/map/stellazh3/shelf1'
}
function redirectToAnotherPage92() {
    window.location.href = '/map/stellazh3/shelf2'
}
function redirectToAnotherPage93() {
    window.location.href = '/map/stellazh3/shelf3'
}






// запрещает делать скриншот на странице
/*
document.addEventListener("keyup", function (e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 44) {
        stopPrntScr();
    }
});
function stopPrntScr() {

    var inpFld = document.createElement("input");
    inpFld.setAttribute("value", ".");
    inpFld.setAttribute("width", "0");
    inpFld.style.height = "0px";
    inpFld.style.width = "0px";
    inpFld.style.border = "0px";
    document.body.appendChild(inpFld);
    inpFld.select();
    document.execCommand("copy");
    inpFld.remove(inpFld);
}
function AccessClipboardData() {
    try {
        window.clipboardData.setData('text', "Access   Restricted");
    } catch (err) {
    }
}
setInterval("AccessClipboardData()", 300);
*/


// запрещает нажатие правой кнопки мыши на сайте
// document.oncontextmenu = cmenu; function cmenu() { return false; }



// запрещает выделение мышкой и комбинации клавиш Ctrl + U и Ctrl + S и Ctrl + P
function preventSelection(element) {
    var preventSelection = false;
    function addHandler(element, event, handler) {
        if (element.attachEvent) element.attachEvent('on' + event, handler);
        else if (element.addEventListener) element.addEventListener(event, handler, false);
    }
    function removeSelection() {
        if (window.getSelection) { window.getSelection().removeAllRanges(); }
        else if (document.selection && document.selection.clear)
            document.selection.clear();
    }

    // запрещаем выделять текст мышкой
    // addHandler(element, 'mousemove', function () { if (preventSelection) removeSelection(); });
    // addHandler(element, 'mousedown', function (event) { var event = event || window.event; var sender = event.target || event.srcElement; preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i); });

    // запрещаем нажатие клавищ Ctrl + U и Ctrl + S и Ctrl + P
    function killCtrl(event) {
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        if (sender.tagName.match(/INPUT|TEXTAREA/i)) return;
        var key = event.keyCode || event.which;
        if ((event.ctrlKey && key == 'U'.charCodeAt(0)) || (event.ctrlKey && key == 'S'.charCodeAt(0)) || (event.ctrlKey && key == 'P'.charCodeAt(0)))  // 'A'.charCodeAt(0) можно заменить на 65
        {
            removeSelection();
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
        }
    }
    addHandler(element, 'keydown', killCtrl);
    addHandler(element, 'keyup', killCtrl);
}
preventSelection(document);
