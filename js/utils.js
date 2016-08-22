var utils = {
    jsonParse: function (s) {
        return 'JSON' in window ? JSON.parse(s) : eval('(' + s + ')')
    },
    getCss: function (ele, attr) {
        var val, reg;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(ele, null)[attr];
        }
        else {
            if (attr == 'opactiy') {
                val = ele.currentStyle['filter'];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            }
            else {
                val = ele.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    },
    setCss: function (ele, attr, val) {
        if (attr == 'opacity') {
            ele.style[attr] = val;
            ele.style['filter'] = 'alpha(opacity=' + val * 100 + ')';
        }
        else {
            ele.style[attr] = val + 'px';
        }
    },
    setGroupCss: function (ele, attrs) {
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                utils.setCss(ele, key, attrs[key])
            }
        }
    }
}