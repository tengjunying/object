(function () {
    var effect = {
        linear: function (t, c, b, d) {
            return c * t / d + b
        }
    };
    var move = function (ele, target, duration) {
        var time = 0, change = {}, begin = {}, temp = {}, interval = 10;
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.getCss(ele, key);
                change[key] = target[key] - begin[key];
            }
        }
        window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function () {
            time += interval;
            if (time >= duration) {
                utils.setGroupCss(ele, target);
                window.clearInterval(ele.timer);
            }
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    temp[key] = effect.linear(time, change[key], begin[key], duration)
                }
            }
            utils.setGroupCss(ele, temp);
        }, interval)
    };
    window.animate = move;
})();
