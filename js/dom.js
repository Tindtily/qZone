"use strict";
(function () {
    var dom = {
        offset: function (ele) {
            var eleLeft = ele.offsetLeft,
                left = null,
                eleTop = ele.offsetTop,
                top = null,
                eleParent = ele.offsetParent,
                isIE8 = /'MSIE 8.0'/.test(window.navigator.userAgent);

            left += eleLeft;
            top += eleTop;
            while (eleParent) {
                left += eleParent.clientLeft + isIE8 ? 0 : eleParent.offsetLeft;
                top += eleParent.clientTop + isIE8 ? 0 : eleParent.offsetTop;
                eleParent = eleParent.offsetParent;
            }
            return {left: left, top: top};
        }
    };
    window.domUtil = dom;
})();