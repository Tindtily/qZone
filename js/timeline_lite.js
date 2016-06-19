var addPlus = document.getElementById("add_event_plus");
var line = document.getElementById("line");
line.onmousemove = function (e) {
    var y = e.pageY;
    var _t = domUtil.offset(this).top;
    var plus_t = Math.floor(parseInt(window.getComputedStyle(addPlus).height) / 2);
    var pos = y - _t;
    if (pos < 0 || pos > parseInt(window.getComputedStyle(this).height)) {
        return;
    }
    addPlus.style.top = pos - plus_t + "px";
    addPlus.style.display = "block";
}
line.onmouseleave = function (e) {
    addPlus.style.display = "none";
}