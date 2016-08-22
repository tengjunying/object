var oDiv = document.getElementById('div1');
var inputList = document.getElementById('inputList');
var dingwei2 = document.getElementById('dingwei2');
var dingwei = document.getElementById('dingwei');
var banner = document.getElementById('banner');
var oInner = document.getElementById('inner');
var imgList = banner.getElementsByTagName('img');
var oTip = document.getElementById('tip');
var oLis = oTip.getElementsByTagName('li');
var lbtn = document.getElementById('lbtn');
var rbtn = document.getElementById('rbtn');
var duration = 500, step = 0, jsonData, interval = 2000;
oDiv.onclick = function () {
    inputList.style.display = 'block';
    oDiv.style.borderColor = 'orange';
    oDiv.style.borderBottom = 'none';
    oDiv.style.borderRight = 'none';
    dingwei2.style.borderColor = 'orange';
    dingwei.style.display = 'none'
};


!function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
            jsonData = utils.jsonParse(xhr.responseText)
        }
    };
    xhr.send(null)
}();

!function () {
    var imgStr = "", tipStr = "";
    for (var i = 0; i < jsonData.length; i++) {
        imgStr += '<div><img src="" truesrc=' + jsonData[i].img + ' ></div>'
        tipStr += '<li></li>'
    }
    imgStr += '<div><img src="" truesrc="' + jsonData[0].img + '"></div>';
    oInner.innerHTML = imgStr
    oInner.style.width = imgList.length * 1226 + 'px'
    oTip.innerHTML = tipStr
    for (var i = 0; i < imgList.length; i++) {
        delayLoad(imgList[i]);
    }
    focusAlign();// 焦点对齐
    banner.timer = autoMove();
}();

function delayLoad(img) {
    var temp = new Image;
    temp.src = img.getAttribute('truesrc');
    temp.onload = function () {
        img.src = this.src;
        animate(img, {'opacity': 1}, duration);
        temp = null
    }
}

function focusAlign() {
    for (var i = 0; i < oLis.length; i++) {
        var curTip = oLis[i];
        var temp = step == oLis.length ? 0 : step;
        curTip.className = temp == i ? 'cur' : '';
    }
}

function moveLeft() {
    if (step == 0) {
        utils.setCss(oInner, 'left', -(imgList.length - 1) * 1226)
        step = imgList.length - 1
    }
    step--;
    moveCore()
}

function moveRight() {
    if (step == imgList.length - 1) {
        utils.setCss(oInner, 'left', 0);
        step = 0;
    }
    step++;
    moveCore();
}
(function () {
    //点击焦点对应图片
    for (var i = 0; i < oLis.length; i++) {
        var curTip = oLis[i];
        curTip.index = i;
        curTip.onclick = function () {
            step = this.index;
            moveCore();
        }
    }
})();
function autoMove() {
    return window.setInterval(moveRight, interval);
}
function moveCore() {
    focusAlign();
    animate(oInner, {'left': -step * 1226}, duration);
}

lbtn.onclick = moveLeft;
rbtn.onclick = moveRight;
(function () {
    for (var i = 0; i < imgList.length; i++) {
        var curTip = imgList[i];
        curTip.index = i;
        curTip.onclick = function () {
            step = this.index;
            moveCore();
        }
    }
})();
banner.onmouseover = function () {
    window.clearInterval(this.timer);
    lbtn.style.display = 'block';
    rbtn.style.display = 'block';
};
banner.onmouseleave = function () {
    this.timer = autoMove();
    lbtn.style.display = 'none';
    rbtn.style.display = 'none';
};