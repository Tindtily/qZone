if (window.QZAPP && QZAPP.Monitor) {
    QZAPP.Monitor.setReportID(100002);
    QZAPP.Monitor.setReportRate(100);
    QZAPP.Monitor.setConfig({reportPattern: /timeline/});
}
(function () {
    if (window.Timeline) {
        throw ('Timeline already defined.');
    }
    window.Timeline = {};
    TCISD.createTimeStat('TimelineJsStart', [176, 222, 1]).mark(1).report();
    TCISD.createTimeStat('TimelineFirstScreen', [176, 222, 1]).setZero();
})();
var PAGE_EVENT = {
    EVENT_LIST: [],
    fireEvent: function (event, arg) {
        var result = [],
            _arg = QZFL.lang.arg2arr(arguments).slice(1),
            found = false;
        for (var i = 0; i < this.EVENT_LIST.length; i++) {
            var ev = this.EVENT_LIST[i];
            if (ev['event'] == event && ev['handler']) {
                result.push(ev['handler'].apply(this, _arg));
                this.EVENT_LIST[i].fired = true;
                this.EVENT_LIST[i].args = _arg;
                found = true;
            }
        }
        if (!found) {
            this.EVENT_LIST.push({'handler': null, 'event': event, 'fired': true, 'args': _arg});
        }
        if (!result.length) {
            return null;
        }
        return result;
    },
    addEvent: function (ev, handler) {
        if (ev == '' || !handler) {
            throw ("event params error");
        }
        this.EVENT_LIST.push({'handler': handler, 'event': ev});
        return this;
    },
    triggerEvent: function (event, handler) {
        for (var i = 0; i < this.EVENT_LIST.length; i++) {
            var ev = this.EVENT_LIST[i];
            if (ev['event'] == event && ev.fired == true) {
                handler.apply(this, ev.args);
            }
        }
        return this.addEvent(event, handler);
    },
    removeEvent: function (ev, handler) {
        for (var i = 0; i < this.EVENT_LIST.length; i++) {
            if (this.EVENT_LIST[i] && (this.EVENT_LIST[i]['event'] == ev)) {
                var hdl = this.EVENT_LIST[i]['handler'];
                if (!handler) {
                    this.EVENT_LIST[i] = null;
                } else if (handler == hdl) {
                    this.EVENT_LIST[i] = null;
                }
            }
        }
    }
};
var LunarMaker = (function () {
    var lunarInfo = new Array(0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2, 0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977, 0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970, 0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f, 0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557, 0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0, 0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0, 0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6, 0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570, 0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0, 0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5, 0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930, 0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530, 0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45, 0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0, 0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef, 0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4, 0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0, 0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260, 0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252, 0xd520);
    var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var moonMonths = "正二三四五六七八九十冬腊".split("");
    var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
    var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
    var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
    var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var nStr2 = new Array('初', '十', '廿', '卅', '　');
    var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
    var SolarTermException = {
        "2011-11-22": "",
        "2011-11-23": "小雪",
        "2012-1-20": "",
        "2012-1-21": "大寒",
        "2012-5-20": "小满",
        "2012-5-21": "",
        "2012-12-6": "",
        "2012-12-7": "大雪",
        "2013-2-3": "",
        "2013-2-4": "立春",
        "2013-7-22": "大暑",
        "2013-7-23": "",
        "2013-12-21": "",
        "2013-12-22": "冬至",
        "2014-3-5": "",
        "2014-3-6": "惊蛰",
        "2015-1-5": "",
        "2015-1-6": "小寒",
        "2016-6-6": "",
        "2016-6-7": "大雪",
        "2017-7-22": "大暑",
        "2017-7-23": "",
        "2017-12-21": "",
        "2017-12-22": "冬至",
        "2018-2-18": "",
        "2018-2-19": "雨水",
        "2018-3-20": "",
        "2018-3-21": "春分",
        "2019-2-4": "立春",
        "2019-2-5": "",
        "2019-6-21": "夏至",
        "2019-6-22": "",
        "2020-7-6": "小暑",
        "2020-7-7": "",
        "2020-8-22": "处暑",
        "2020-8-23": "",
        "2020-12-6": "",
        "2020-12-7": "大雪"
    };
    var sFtv = new Array("0101 元旦节", "0214 情人节", "0305 学雷锋纪念日", "0308 妇女节", "0312 植树节", "0315 消费者权益日", "0401 愚人节", "0407 世界卫生日", "0422 世界地球日", "0501 劳动节", "0502 劳动节", "0503 劳动节", "0504 青年节", "0508 世界红十字日", "0512 国际护士节", "0515 国际家庭日", "0517 国际电信日", "0531 世界无烟日", "0601 国际儿童节", "0605 世界环境保护日", "0606 全国爱眼日", "0625 全国土地日", "0626 国际禁毒日", "0701 建党节", "0707 抗日战争纪念日", "0801 建军节", "0815 抗日战争胜利纪念", "0909 毛主席逝世纪念", "0908 国际扫盲日", "0910 教师节", "0920 爱牙日", "0927 世界旅游日", "0928 孔子诞辰", "1001 国庆节", "1002 国庆节", "1003 国庆节", "1006 老人节", "1009 世界邮政日", "1014 世界标准日", "1016 世界粮食日", "1024 联合国日", "1120 彝族年", "1121 彝族年", "1122 彝族年", "1112 孙中山诞辰纪念", "1205 国际志愿人员日", "1220 澳门回归纪念", "1224 平安夜", "1225 圣诞节", "1226 毛主席诞辰纪念");
    var lFtv = new Array("0101 春节", "0102 春节", "0103 春节", "0115 元宵节", "0505 端午节", "0624 火把节", "0625 火把节", "0626 火把节", "0707 七夕情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年", "0100 除夕");
    var wFtv = new Array("0520 母亲节", "0630 父亲节", "0730 被奴役国家周", "1144 感恩节");

    function lYearDays(y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + leapDays(y));
    }

    function leapDays(y) {
        if (leapMonth(y)) return ((lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29);
        else return (0);
    }

    function leapMonth(y) {
        var lm = lunarInfo[y - 1900] & 0xf;
        return (lm == 0xf ? 0 : lm);
    }

    function monthDays(y, m) {
        return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    }

    function solarDays(y, m) {
        if (m == 1) {
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        } else {
            return (solarMonth[m]);
        }
    }

    function cyclical(num) {
        return (Gan[num % 10] + Zhi[num % 12]);
    }

    function sTerm(y, n) {
        var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        return (offDate.getUTCDate());
    }

    function cDay(d) {
        var s;
        switch (d) {
            case 10:
                s = '初十';
                break;
            case 20:
                s = '二十';
                break;
                break;
            case 30:
                s = '叁十';
                break;
                break;
            default:
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return (s);
    }

    function cMonth(m) {
        return moonMonths[m];
    }

    function Lunar(objDate) {
        var i, leap = 0,
            temp = 0;
        var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2100 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        this.year = i;
        leap = leapMonth(i);
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
                --i;
                this.isLeap = true;
                temp = leapDays(this.year);
            } else {
                temp = monthDays(this.year, i);
            }
            if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;
            offset -= temp;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) {
                this.isLeap = false;
            } else {
                this.isLeap = true;
                --i;
            }
        if (offset < 0) {
            offset += temp;
            --i;
        }
        this.month = i;
        this.day = offset + 1;
    }

    return {
        getLunarDate: function (aDate) {
            var lDObj = new Lunar(aDate);
            var y = aDate.getFullYear();
            var m = aDate.getMonth();
            var d = aDate.getDate();
            var sDObj = new Date(y, m, 1, 0, 0, 0, 0);
            var len = solarDays(y, m);
            var firstWeek = sDObj.getDay();
            var cY, cM, cD;
            if (m < 2) {
                cY = cyclical(y - 1900 + 36 - 1);
            } else {
                cY = cyclical(y - 1900 + 36);
            }
            var term2 = sTerm(y, 2);
            var firstNode = sTerm(y, m * 2)
            cM = cyclical((y - 1900) * 12 + m + 12);
            var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
            if (m == 1 && d >= term2) {
                cY = cyclical(y - 1900 + 36);
            }
            if (d >= firstNode) {
                cM = cyclical((y - 1900) * 12 + m + 13);
            }
            cD = cyclical(dayCyclical + d - 1);
            var st1 = sTerm(y, m * 2) - 1;
            var st2 = sTerm(y, m * 2 + 1) - 1;
            var strST = "";
            if (aDate.getDate() == st1 + 1) {
                strST = solarTerm[m * 2];
            } else if (aDate.getDate() == st2 + 1) {
                strST = solarTerm[m * 2 + 1];
            }
            if (SolarTermException[[y, m + 1, d].join("-")] != undefined) {
                strST = SolarTermException[[y, m + 1, d].join("-")];
            }
            var sFestival = "",
                tmp1, tmp2;
            for (var i = 0; i < sFtv.length; i++) {
                if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
                    if (Number(RegExp.$1) == (m + 1) && Number(RegExp.$2) == d) {
                        sFestival += RegExp.$4 + " ";
                    }
                }
            }
            for (var i = 0; i < wFtv.length; i++) {
                if (wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
                    if (Number(RegExp.$1) == (m + 1)) {
                        tmp1 = Number(RegExp.$2);
                        tmp2 = Number(RegExp.$3);
                        if (((firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - firstWeek == d - 1) {
                            sFestival += RegExp.$5 + ' ';
                        }
                    }
                }
            }
            var lFestival = "";
            var aObj, lY, lM, lD = 1,
                lL, lX = 0,
                tmp1, tmp2;
            var objCals = [];
            var lDPOS = new Array(3);
            var n = 0;
            var firstLM = 0;
            for (var i = 0; i < len; i++) {
                sDObj = new Date(y, m, i + 1);
                aObj = new Lunar(sDObj);
                objCals.push(aObj);
                if (lD > lX) {
                    lY = aObj.year;
                    lM = aObj.month;
                    lD = aObj.day;
                    lL = aObj.isLeap;
                    lX = lL ? leapDays(lY) : monthDays(lY, lM);
                    if (n == 0) firstLM = lM;
                    lDPOS[n++] = i - lD + 1;
                }
                lD++;
            }
            for (var i = 0; i < lFtv; i++) {
                if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
                    tmp1 = Number(RegExp.$1) - firstLM;
                    if (tmp1 == -11) tmp1 = 1;
                    if (tmp1 >= 0 && tmp1 < n) {
                        tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
                        if (tmp2 >= 0 && tmp2 < len && tmp2 == d - 1 && objCals[tmp2].isLeap != true) {
                            lFestival += RegExp.$4 + ' ';
                        }
                    }
                }
            }
            return {
                lYear: lDObj.year,
                lMonth: (lDObj.isLeap ? '闰' : '') + cMonth(lDObj.month - 1) + '月',
                lDay: cDay(lDObj.day),
                cYear: cY,
                cMonth: cM,
                cDay: cD,
                solarTerm: strST,
                sFestival: sFestival,
                lFestival: lFestival,
                aYear: Animals[(lDObj.year - 4) % 12]
            }
        }
    }
})();
(function () {
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    this.Class = function () {
    };
    Class.extend = function (prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
                return function () {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        function Class() {
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
(function () {
    var cache = {};
    this.tmpl = function tmpl(str, data) {
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn
    }
})();
var TEMPLATE = TEMPLATE || {};
TEMPLATE.SUMMARY_TPL = '<ul class="scrubber_list"><% var i,j,aItem,aYear,aMonth; for(i=0;i<items.length;i++){  aItem=items[i];  if(aItem.type=="ages" || aItem.type == "point"){%><li><a href="javascript:void(0);" title="<%=aItem.title%>" rel="<%=aItem.rel%>"><%=aItem.text%></a></li><%}else if(aItem.type=="year"){  aYear=aItem.data; %><li><a href="javascript:void(0);" title="<%=aItem.title%>" rel="<%=aItem.rel%>"<%if(aYear.year==cyear && aYear.month[0].month==cmonth){%> class="cur"<%}%>><%=aItem.text%></a><%if(aYear.year==cyear){%><ul class="scrubber_list_m"><%for(j=0;j<aYear.month.length;j++){if(j==0){continue;/*第一个月不做处理*/}aMonth=aYear.month[j];%><li><a href="javascript:void(0);"  title="<%=aMonth.title%>" rel="<%=aMonth.rel%>"<%if(aYear.year==cyear && aMonth.month==cmonth){%> class="cur"<%}%>><%=aMonth.text%></a></li><%}%></ul><%}%></li><%}%><%}%></ul>';
TEMPLATE.PERIOD_TPL = '<div class="period_header"><h3 id="period_header_<%=periodId%>"><%=periodName%></h3></div><h4 class="tml_placeholder" id="expand_<%=periodId%>" rel="<%=periodId%>" style="display:<%=(!!collapsed)?"":"none"%>"></h4><ol class="feeds_list" id="period_list_<%=periodId%>" style="display:<%=(!!collapsed)?"none":""%>"></ol>';
TEMPLATE.PERIOD_HINT_TPL = '<%if(hintType=="click"){%><a href="javascript:void(0);" title="" class="placeholder_tit" id="expand_link_<%=periodId%>"><%=periodShowHint%><span class="ui_left_arrow placeholder_arrow"><span class="ui_arrow"></span><span class="ui_arrow_bg"></span><span class="arrow_dot ellipsis_dot"></span></span></a><%}else{%><span class="placeholder_tit"><%=periodShowHint%><span class="ui_left_arrow placeholder_arrow"><span class="ui_arrow"></span><span class="ui_arrow_bg"></span><span class="arrow_dot ellipsis_dot"></span></span></span><%}%>';
TEMPLATE.PERIOD_BIRTHDAY_TPL = '<i class="ico_birthday"></i><%if(hasBirth){%><%=data.year%>年<%=data.month%>月<%=data.day%>日 [ <%if(lunarDate.lYear>1900){%><%=lunarDate.cYear%>年(<%=lunarDate.aYear%>年)<%}%><%if(lunarDate.lMonth!=\'undefined月\'){%>  &nbsp;<%=lunarDate.lMonth%><%=lunarDate.lDay%><%}%><%if(lunarDate.solarTerm){%>&nbsp;<%=lunarDate.solarTerm%><%}%><%if(lunarDate.sFestival){%>&nbsp;<%=lunarDate.sFestival%><%}%><%if(lunarDate.lFestival){%>&nbsp;<%=lunarDate.lFestival%><%}%>] <%if(Timeline.core.isOwnerMode()){%><a href="http://user.qzone.qq.com/<%=QZONE.FrontPage.getQzoneConfig().loginUin%>/profile/qzbase" target="_blank" hottag="Index.editbirthday">修改生日</a><%}%><%}else{%> 我出生了<%}%>';
TEMPLATE.BUTTON_MONTHMORE_TPL = '<a href="javascript:void(0);" title="" class="placeholder_tit"><%=text%><span class="ui_left_arrow placeholder_arrow"><span class="ui_arrow"></span><span class="ui_arrow_bg"></span><span class="arrow_dot ellipsis_dot"></span></span></a>';
TEMPLATE.PROFILE_TPL = '<div class="tml_message bg_op7 transition_s tml_message_hidden" style="display:none"><i class="ui_icon icon_message"></i><p><span id="tips_content"></span><a href="javascript:void(0)" onclick="return false" class="ui_close" id="tips_close" hottag="Header.closeTips" title="关闭">×</a></p></div><div class="tml_header_inner"><div class="user_essential_info"><div class="avatar_box"><img id="avatar" src="<%=portrait%>" /></div><div class="user_name"><strong id="user_info_nickname" class="nickname textoverflow" hottag="Header.name"></strong><span class="vip_icon" id="vip_icon"></span><span class="user_op op_add none" hottag="Header.addFriend" ><i class="ui_icon"></i>添加好友</span><span class="user_op op_care none"hottag="Header.addCare" ><i class="ui_icon"></i>特别关心</span><span title="点击取消特别关心" class="user_op op_care_done none"><i class="ui_icon"></i>已关心</span></div><div id="newest_mood" class="user_shuo"></div><div class="user_info_list"><ul><li><i class="icon_gender"></i><span id="user_info_sex"></span></li><li><i class="icon_hometown"></i><span id="user_info_hometown"></span></li><li><i class="icon_emotion"></i><span id="user_info_marriage"></span></li><li><i class="icon_apartment"></i><span id="user_info_place"></span></li><li><i class="icon_const"></i><span id="user_info_constellation"></span></li></ul><a href="http://user.qzone.qq.com/<%=uin%>/profile/normal" target="_blank" class="user_info_more" title="查看详情" hottag="Header.more">查看详情</a></div></div><div class="user_itemize_info"><div class="itemize_info"><ul class="itemize_info_list"><li class="info_photo"><a href="http://user.qzone.qq.com/<%=uin%>/photo/" target="_blank" title="相册"><i class="ui_ico icon_photo" hottag="Header.picture"></i><em id="count_photo" hottag="Header.picture"></em></a></li><li class="info_shuoshuo"><a href="http://user.qzone.qq.com/<%=uin%>/mood/" target="_blank" title="说说"><i class="ui_ico icon_shuo" hottag="Header.shuoshuo"></i><em id="count_mood" hottag="Header.shuoshuo"></em></a></li><li class="info_log"><a href="http://user.qzone.qq.com/<%=uin%>/blog/" target="_blank" title="日志"><i class="ui_ico icon_log" hottag="Header.diary"></i><em id="count_blog" hottag="Header.diary"></em></a></li><li class="info_mes_board"><a href="http://user.qzone.qq.com/<%=uin%>/msgboard" target="_blank" title="留言板"><i class="ui_ico icon_mes_board" hottag="Header.page"></i><em id="count_msg_board"></em></a></li></ul></div><div class="other_info" style="display:<%=isOwner?\'block\':\'none\'%>"><span class="at_name_wrap" style="display:none"><a href="javascript:void(0)" target="_blank" class="at_name" id="inviter"></a>提到了我    </span><a href="javascript:void(0)" onclick="return false" id="mention_me" class="at_num" title="提到我的"><i class="ui_ico ico_at" hottag="Header.at"></i><sup class="ui_sup" style="display:none"><b id="invite_num">0</b></sup></a><a href="javascript:void(0)" onclick="return false" id="global_set" class="global_set" title="设置"><i class="ui_ico ico_set" hottag="Header.setting"></i></a></div></div></div>';
TEMPLATE.EVENT_TPL = '<div class="box_con" id="event_cont_<%=escHTML(eventId)%>"><div class="box_hd"><div class="feed_date <%=timeData.className%>"><i class="ui_ico ico_lunar" id="lunar_<%=escHTML(eventId)%>"></i><div class="date_text"><div class="date_days"><%=timeData.date%></div><%if(timeData.time){%><div class="date_moment"><i class="ico_moment"></i><%=timeData.time%></div><%}%></div></div></div><div class="box_bd"><%if(fullColumn){%><i class="feed_imp_icon"></i><%}%><%if(title||fullColumn){%><h4 class="feed_title"><%if(titleLink){%><a href="<%=escHTML(titleLink)%>" hottag="Event.title" target="_blank"><%=escHTML(title)%></a><%}else{%><span><%=escHTML(title)%></span><%}%></h4><%}%><%if(moodContent){%><div class="feed_quote"><i class="ui_ico quote_before"></i><%=moodContent%><i class="ui_ico quote_after"></i></div><%}else if(otherContent){%><p class="feed_text"><%=otherContent%></p><%}%><%if(imageOnly&&photos.length==1){%><div class="img_box" id="i_container_<%=escHTML(eventId)%>"><div class="img_box_item"><a href="javascript:void(0)" onclick="return false" id="i_wrap_<%=escHTML(eventId)%>" style="display:none"><img src="<%=escHTML(photos[0])%>" class="j_view_photo" style="visibility:hidden" data-id="<%=escHTML(eventId)%>" onload="Timeline.EventNormal.imageLoaded(this, {specialTreat:<%=fullColumn%>,maxH:<%=(fullColumn?778:370)*1/1%>})" onerror="Timeline.EventNormal.imageLoaded(this, {failed:true})" /></a><div class="img_loading" id="i_loading_<%=escHTML(eventId)%>"></div></div><%if(picNum){%><span class="feed_album_num bg_op7 transition_m"><%=picNum%>张</span><%}%></div><%}else if(imageOnly&&photos.length>1){%><div class="img_box img_box_multiple"><%for(var i=0;i<photos.length;i++){%><div class="img_box_item item_<%=(i+1)%>"><a href="javascript:void(0)" onclick="return false" id="i_wrap_<%=escHTML(eventId)%>_<%=i%>" style="display:none"><img src="<%=escHTML(photos[i])%>" class="j_view_photo" style="visibility:hidden" data-id="<%=escHTML(eventId)%>" data-index="<%=i%>" onload="Timeline.EventNormal.imageLoaded(this)" onerror="Timeline.EventNormal.imageLoaded(this, {failed:true})" /></a><div class="img_loading" id="i_loading_<%=escHTML(eventId)%>_<%=i%>"></div></div><%}%><%if(picNum){%><span class="feed_album_num bg_op7 transition_m"><%=picNum%>张</span><%}%></div><%}else if(videoOnly){%><div class="img_box <%=fullColumn?\'img_box_vedio_min\':\'\'%>"><div class="img_box_item"><a href="javascript:void(0)" onclick="return false" id="v_wrap_<%=escHTML(eventId)%>" style="display:none"><img src="<%=escHTML(videoUrl)%>" class="j_play_video" data-id="<%=escHTML(eventId)%>" onload="this.width=370;Timeline.EventNormal.videoPreview(this);" onerror="Timeline.EventNormal.videoPreview(this, true)" /><span class="ico_play transition_m j_play_video" data-id="<%=escHTML(eventId)%>"></span></a><div id="v_loading_<%=escHTML(eventId)%>" class="img_loading"></div></div></div><%}else if(imageAndVideo){%><div class="img_box img_box_mix"><div class="img_box_item item_vedio"><a href="javascript:void(0)" onclick="return false" id="v_wrap_<%=escHTML(eventId)%>" style="display:none"><img src="<%=escHTML(videoUrl)%>" class="j_play_video" data-id="<%=escHTML(eventId)%>" onload="this.width=<%=fullColumn?379:179%>;Timeline.EventNormal.videoPreview(this);" onerror="Timeline.EventNormal.videoPreview(this, true)" /><span class="ico_play transition_m j_play_video" data-id="<%=escHTML(eventId)%>"></span></a><div id="v_loading_<%=escHTML(eventId)%>" class="img_loading"></div></div><%if(photos.length==3){%><div class="img_box_item item_thumbs item_thumbs_mt<%=photos.length%>"><%for(var i=0;i<photos.length;i++){%><div class="img_box_item item_<%=(i+1)%>"><a href="javascript:void(0)" onclick="return false" id="i_wrap_<%=escHTML(eventId)%>_<%=i%>" style="display:none"><img src="<%=escHTML(photos[i])%>" class="j_view_photo" style="visibility:hidden" data-id="<%=escHTML(eventId)%>" data-index="<%=i%>" onload="Timeline.EventNormal.imageLoaded(this)" onerror="Timeline.EventNormal.imageLoaded(this, {failed:true})" /></a><div class="img_loading" id="i_loading_<%=escHTML(eventId)%>_<%=i%>"></div></div><%}%><%if(picNum){%><span class="feed_album_num bg_op7 transition_m"><%=picNum%>张</span><%}%></div><%}else{%><div class="img_box_item item_thumbs item_thumbs_mt<%=photos.length%>"><%for(var i=0;i<photos.length;i++){%><div class="img_box_item"><a href="javascript:void(0)" onclick="return false" id="i_wrap_<%=escHTML(eventId)%>_<%=i%>" style="display:none"><img src="<%=escHTML(photos[i])%>" class="j_view_photo" style="visibility:hidden" data-id="<%=escHTML(eventId)%>" data-index="<%=i%>" onload="Timeline.EventNormal.imageLoaded(this)" onerror="Timeline.EventNormal.imageLoaded(this, {failed:true})" /></a><div class="img_loading" id="i_loading_<%=escHTML(eventId)%>_<%=i%>"></div></div><%}%><%if(picNum){%><span class="feed_album_num bg_op7 transition_m <%=(i==4?\'j_view_photo\':\'\')%>" data-id="<%=escHTML(eventId)%>" data-index="<%=(i-1)%>"><%=picNum%>张</span><%}%></div><%}%></div><%}%></div><div class="box_ft"><%if(inviter||place){%><div class="feed_info"><%if(inviter){%><div class="feed_with_list"><a href="http://user.qzone.qq.com/<%=inviter.uin%>/main?mode=gfp_timeline" target="_blank"><img src="<%=inviter.pUrl%>" alt="<%=escHTML(inviter.name)%>" title="<%=escHTML(inviter.name)%>" class="avatar" /></a><span>和</span><%for(var i=0;i<friends.length;i++){%><a href="http://user.qzone.qq.com/<%=friends[i].uin%>/main?mode=gfp_timeline" target="_blank"><img src="<%=friends[i].pUrl%>" alt="<%=escHTML(friends[i].name)%>" title="<%=escHTML(friends[i].name)%>" class="avatar" /></a><%}%></div><%}%><%if(place&&placeLink){%><div class="feed_place_txt"><i class="ui_ico ico_place"></i><a href="javascript:void(0)" onclick="return false" class="j_map" data-id="<%=escHTML(eventId)%>"><%=escHTML(place)%></a></div><%}else if(place){%><div class="feed_place_txt"><i class="ui_ico ico_place"></i><%=escHTML(place)%></div><%}%></div><%}%><div class="feed_op"><span class="zan_wrap j_like"></span><a href="javascript:void(0)" onclick="return false" class="op_com j_show_comment_box" data-id="<%=escHTML(eventId)%>"><i class="ui_ico ico_com" title="评论">评论</i><span id="cmt_num_<%=escHTML(eventId)%>"><%=cmtNum==0?\'\':\'(\'+cmtNum+\')\'%></span></a></div><div class="like_info j_like_info" style="display:none"></div></div><div class="tml_feed_comments" id="uni_comment_<%=escHTML(eventId)%>" style="display:none"><div class="j_placeholder"></div></div></div><div class="edit_op transition_s"><a href="javascript:void(0)" onclick="return false" class="ui_ico ico_edit j_edit" data-id="<%=escHTML(eventId)%>" hottag="Event.edit" title="编辑">编辑</a><a href="javascript:void(0)" onclick="return false" class="ui_ico ico_delete j_delete" data-id="<%=escHTML(eventId)%>" hottag="Event.delete" title="删除">删除</a></div><div class="ie_shadow"></div><div class="feed_arrow"><div class="arrow_i"></div><div class="arrow_bg"></div><span class="arrow_dot<%=fullColumn?\' dot_imp\':\'\'%>"></span><span class="arrow_line transition_l"></span></div><div class="feed_limits_info j_permit icon_feed_lock" data-id="<%=escHTML(eventId)%>" style="display:<%=private?\'\':\'none\'%>" title="本内容仅对自己可见"><i class="ui_icon j_permit" data-id="<%=escHTML(eventId)%>"></i>仅限自己</div><div class="feed_limits_info j_permit icon_feed_unlock" style="display:none" title="本内容对他人可见"><i class="ui_icon"></i>访客可见</div>';
TEMPLATE.GLOBALDIV_TPL = '<div id="addbar_date_container" class="feed_add_bar add_time_bar" style="display:none"></div><div class="tml_poster_fixed" style="display:none"><div class="tml_poster" id="post_area_float"></div></div><div id="place_selector_wrap" class="bubble_wrap bubble_add_place" style="display:none"><div class="bubble_tips"><span class="ui_up_arrow"><i class="ui_arrow"></i><i class="ui_arrow_bg"></i></span><div class="bubble_con"><input type="text" size="40" class="textinput j_input" /><a href="javascript:void(0)" onclick="return false" class="btn_submit j_submit">确定</a></div><a href="javascript:void(0)" onclick="return false" class="ui_close j_close" title="关闭">×</a></div></div><div id="friend_selector_wrap" class="bubble_wrap" style="z-index:100;display:none"><div class="bubble_tips"><span class="ui_up_arrow"><i class="ui_arrow"></i><i class="ui_arrow_bg"></i></span><div class="tml_warn_tip selector_tip" id="friend_selector_tips"><div class="tml_warn_tip_con">    发表的事件会同步展示在所选好友的时光轴上   </div></div><div class="bubble_con" id="friend_selector"></div></div></div><div id="video_wrap" class="pop_wrap video_play" style="z-index:5001;display:none"><div class="pop_con">视频内容</div><span class="pop_close" id="close_video">关闭</span><div class="pop_mask"></div></div><div id="g_wrap" class="bubble_wrap" style="display:none"><div class="bubble_tips"><span class="ui_up_arrow"><i class="ui_arrow"></i><i class="ui_arrow_bg"></i></span><div id="g_wrap_con"></div></div></div>';
Timeline.CONST = {
    MSG_TYPE_HINT: 0,
    MSG_TYPE_SUCC: 4,
    MSG_TYPE_ERROR: 5,
    MSG_TYPE_LOADING: 6,
    MSG_DEFAULT_TIP: '对不起，网络繁忙，请稍后再试。',
    DOMAIN_CGI: "time.qzone.qq.com",
    CGI_CREATE: 'time_cgi_create',
    CGI_GET_SUMMARY: "time_cgi_get_brief",
    CGI_GET_EVENT_DATA: "time_cgi_get_bytime",
    CGI_GET_EVENT_BY_ID: "time_cgi_get_byeventid",
    CGI_GET_FEEDS_DATA: "time_cgi_feedlist",
    CGI_GET_STATE: "time_cgi_state",
    CGI_APPLY_APP: "time_cgi_apply",
    IMP_EVENT_INFO: {
        '1': {
            'eventName': '学业',
            'differClass': 'feed_school',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '入学', 'fieldName': {0: '学校名称', 1: '班级'}, 'curUse': [0, 1]},
                '2': {'title': '读研', 'fieldName': {0: '学校名称', 1: '班级'}, 'curUse': [0, 1]},
                '3': {'title': '读博', 'fieldName': {0: '学校名称', 1: '班级'}, 'curUse': [0, 1]},
                '4': {'title': '进修', 'fieldName': {0: '学校名称', 1: '班级'}, 'curUse': [0, 1]},
                '5': {'title': '毕业', 'fieldName': {0: '学校名称', 1: '班级'}, 'curUse': [0, 1]},
                '6': {'title': '辍学', 'fieldName': {0: '学校名称', 1: '班级'}, 'curUse': [0, 1]},
                '7': {'title': '高考 考前最刻苦的时光', 'fieldName': {0: '地点'}, 'curUse': [0]},
                '8': {'title': '高考 走出考场的那一刻', 'fieldName': {0: '心情'}, 'curUse': [0]},
                '9': {'title': '高考 考试结束后，最想做的事', 'fieldName': {0: '描述'}, 'curUse': [0]},
                '10': {'title': '毕业 与同窗的囧事', 'fieldName': {0: '描述'}, 'curUse': [0]},
                '11': {'title': '毕业 最大的遗憾', 'fieldName': {0: '描述'}, 'curUse': [0]},
                '12': {'title': '毕业 最难舍的毕业聚餐', 'fieldName': {0: '心情'}, 'curUse': [0]},
                '13': {'title': '毕业 朝夕相处的舍友们', 'fieldName': {0: '姓名'}, 'curUse': [0]},
                '14': {'title': '毕业 毕业照那点事', 'fieldName': {0: '描述'}, 'curUse': [0]}
            }
        },
        '2': {
            'eventName': '事业',
            'differClass': 'feed_cause',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '入职', 'fieldName': {0: '公司名称'}, 'curUse': [0]},
                '2': {'title': '培训', 'fieldName': {0: '公司名称', 1: '课程'}, 'curUse': [0, 1]},
                '3': {'title': '晋升', 'fieldName': {0: '公司名称', 1: '新职务'}, 'curUse': [0, 1]},
                '4': {'title': '离职', 'fieldName': {0: '公司名称'}, 'curUse': [0]},
                '5': {'title': '实习', 'fieldName': {0: '公司名称'}, 'curUse': [0]},
                '6': {'title': '荣誉', 'fieldName': {0: '公司名称', 1: '荣誉项'}, 'curUse': [0, 1]},
                '7': {'title': '业务突破', 'fieldName': {0: '公司名称', 1: '项目名称'}, 'curUse': [0, 1]}
            }
        },
        '3': {
            'eventName': '爱情',
            'differClass': 'feed_love',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '邂逅', 'fieldName': {0: '场景', 1: '是否一见钟情'}, 'curUse': [0, 1]},
                '2': {'title': '初吻', 'fieldName': {0: '第几次见面', 1: '谁主动'}, 'curUse': [0, 1]},
                '3': {'title': '表白', 'fieldName': {0: '表白语', 1: '谁主动'}, 'curUse': [0, 1]},
                '4': {'title': '分手', 'fieldName': {0: '当时情绪', 1: '谁提出'}, 'curUse': [0, 1]},
                '5': {'title': '求婚', 'fieldName': {0: '求婚词', 1: '创意构思'}, 'curUse': [0, 1]},
                '6': {'title': '订婚', 'fieldName': {0: '气氛', 1: '到场人'}, 'curUse': [0, 1]},
                '7': {'title': '结婚', 'fieldName': {0: '婚礼形式', 1: '到场人'}, 'curUse': [0, 1]},
                '8': {'title': '婚纱照', 'fieldName': {0: '风格', 1: '旅行线路'}, 'curUse': [0, 1]},
                '9': {'title': '蜜月', 'fieldName': {0: '时长', 1: '旅行线路'}, 'curUse': [0, 1]},
                '10': {'title': '纪念日', 'fieldName': {0: '类型', 1: '创意构思'}, 'curUse': [0, 1]}
            }
        },
        '4': {
            'eventName': '家庭',
            'differClass': 'feed_family',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '租房', 'fieldName': {0: '户型', 1: '租金'}, 'curUse': [0, 1]},
                '2': {'title': '买房', 'fieldName': {0: '户型', 1: '单价'}, 'curUse': [0, 1]},
                '3': {'title': '装修', 'fieldName': {0: '花费'}, 'curUse': [0]},
                '4': {'title': '购车', 'fieldName': {0: '车型', 1: '花费'}, 'curUse': [0, 1]},
                '5': {'title': '生子', 'fieldName': {0: '体重', 1: '性别'}, 'curUse': [0, 1]},
                '6': {'title': '养宠物', 'fieldName': {0: '品种', 1: '名字'}, 'curUse': [0, 1]},
                '7': {'title': '生日/纪念日', 'fieldName': {0: '类型', 1: '花费'}, 'curUse': [0, 1]},
                '8': {'title': '受孕', 'fieldName': {0: '计划了多久'}, 'curUse': [0]},
                '9': {'title': '孕检', 'fieldName': {0: '第几次'}, 'curUse': [0]},
                '10': {'title': '妊娠反应', 'fieldName': {0: '主要症状'}, 'curUse': [0]}
            }
        },
        '5': {
            'eventName': '健康/餐饮',
            'differClass': 'feed_health',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '减肥', 'fieldName': {0: '当前体重', 1: '目标体重'}, 'curUse': [0, 1]},
                '2': {'title': '长高', 'fieldName': {0: '当前身高'}, 'curUse': [0]},
                '3': {'title': '受伤', 'fieldName': {0: '创伤部位', 1: '是否严重'}, 'curUse': [0, 1]},
                '4': {'title': '患病', 'fieldName': {0: '疾病', 1: '是否严重'}, 'curUse': [0, 1]},
                '5': {'title': '戒烟', 'fieldName': {0: '烟龄', 1: '预期戒除时间'}, 'curUse': [0, 1]},
                '6': {'title': '戒酒', 'fieldName': {0: '酒龄', 1: '预期戒除时间'}, 'curUse': [0, 1]}
            }
        },
        '6': {
            'eventName': '运动/锻炼',
            'differClass': 'feed_sport',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '跑步/登山/徒步', 'fieldName': {0: '类型', 1: '强度'}, 'curUse': [0, 1]},
                '2': {'title': '游泳', 'fieldName': {0: '时长', 1: '强度'}, 'curUse': [0, 1]},
                '3': {'title': '骑车', 'fieldName': {0: '路况', 1: '距离', 2: '强度'}, 'curUse': [0, 1, 2]},
                '4': {'title': '打球/踢球', 'fieldName': {0: '类型', 1: '赛制'}, 'curUse': [0, 1]},
                '5': {'title': '滑雪/滑冰', 'fieldName': {0: '类型', 1: '难度'}, 'curUse': [0, 1]},
                '6': {'title': '舞蹈/健身', 'fieldName': {0: '类型', 1: '难度'}, 'curUse': [0, 1]}
            }
        },
        '7': {
            'eventName': '兴趣/爱好',
            'differClass': 'feed_hobby',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '烹饪', 'fieldName': {0: '菜肴名称', 1: '耗费时间'}, 'curUse': [0, 1]},
                '2': {'title': '品尝', 'fieldName': {0: '菜肴名称', 1: '花费'}, 'curUse': [0, 1]},
                '3': {'title': '电影/电视剧', 'fieldName': {0: '名称'}, 'curUse': [0]},
                '4': {'title': '游戏', 'fieldName': {0: '名称'}, 'curUse': [0]},
                '5': {'title': '泡吧', 'fieldName': {0: '名称', 1: '花费'}, 'curUse': [0, 1]},
                '6': {'title': '发呆/宅', 'fieldName': {0: '时长'}, 'curUse': [0]}
            }
        },
        '8': {
            'eventName': '记忆/期待',
            'differClass': 'feed_memory',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '1': {'title': '旅行', 'fieldName': {0: '交通方式', 1: '旅程'}, 'curUse': [0, 1]},
                '2': {'title': '出差', 'fieldName': {0: '交通方式'}, 'curUse': [0]},
                '3': {'title': '奇遇', 'fieldName': {0: '当时感觉'}, 'curUse': [0]},
                '4': {'title': '第一次……', 'fieldName': {0: '类型'}, 'curUse': [0]},
                '5': {'title': '囧……', 'fieldName': {0: '类型'}, 'curUse': [0]}
            }
        },
        '9': {
            'eventName': '友情',
            'differClass': 'feed_friendship',
            'subType': {
                '0': {'title': '其他', 'fieldName': {0: '场景'}, 'curUse': [0]},
                '1': {'title': '相识', 'fieldName': {0: '场景'}, 'curUse': [0]},
                '2': {'title': '相知', 'fieldName': {0: '场景'}, 'curUse': [0]},
                '3': {'title': '聚会', 'fieldName': {0: '场景'}, 'curUse': [0]},
                '4': {'title': '倾诉', 'fieldName': {0: '主题'}, 'curUse': [0]},
                '5': {'title': '奋斗', 'fieldName': {0: '项目'}, 'curUse': [0]},
                '6': {'title': '卧谈', 'fieldName': {0: '主题'}, 'curUse': [0]},
                '7': {'title': '误会', 'fieldName': {0: '事由'}, 'curUse': [0]},
                '8': {'title': '支持', 'fieldName': {0: '事由'}, 'curUse': [0]},
                '9': {'title': '重逢', 'fieldName': {0: '多久不曾见面'}, 'curUse': [0]}
            }
        }
    },
    TOOLBAR_OFFSET: 34,
    HEADER_OFFSET: 200,
    SUMMARY_LEFT: 5,
    ADD_EVENT_PLUS_OFFSET: 13,
    ADD_EVENT_DATE_OFFSET_LEFT: -80,
    ADD_EVENT_DATE_OFFSET_TOP: -25,
    ADD_EVENT_TYPEBAR_OFFSET: -74,
    EVENT_COUNT_PER_LOAD: 10,
    EVENT_HIGHLIST_TIMER: 3000,
    EVENT_PRESHOW_HEIGHT_TOP: 500,
    EVENT_PRESHOW_HEIGHT_BOTTOM: 1000,
    SMART_SCROLL_MAX_PIXEL: 200,
    SMART_SCROLL_DELAY_CALC: 600,
    PRELOAD_HEIGHT: 200,
    PRELOAD_BG_OFFSET: 500,
    PERIOD_AREA_FROM_BOTTOM: 200,
    PREFIX_PANEL: "period_",
    PREFIX_EXPAND: "expand_",
    PREFIX_LIST: "period_list_",
    PREFIX_EXPAND_LINK: "expand_link_",
    PREFIX_HEADER: "period_header_",
    STATE_NODATA: 0,
    STATE_INITIALING: 1,
    STATE_INITIALED: 2,
    STATE_UNKNOWN: 3,
    DEFAULT_FIRST_DATE: "1902/1/1",
    DEFAULT_LAST_DATE: "2038/1/19",
    APPEND_EVENT_TIMER: 30,
    PREPARE_INDEX_TIMER: 500,
    LUNAR_MAP: {
        '初一': 1,
        '初二': 2,
        '初三': 3,
        '初四': 4,
        '初五': 5,
        '初六': 6,
        '初七': 7,
        '初八': 8,
        '初九': 9,
        '初十': 10,
        '十一': 11,
        '十二': 12,
        '十三': 13,
        '十四': 14,
        '十五': 15,
        '十六': 16,
        '十七': 17,
        '十八': 18,
        '十九': 19,
        '二十': 20,
        '廿一': 21,
        '廿二': 22,
        '廿三': 23,
        '廿四': 24,
        '廿五': 25,
        '廿六': 26,
        '廿七': 27,
        '廿八': 28,
        '廿九': 29,
        '叁十': 30,
        '立春': 31,
        '雨水': 32,
        "惊蛰": 33,
        "春分": 34,
        "清明": 35,
        "谷雨": 36,
        "立夏": 37,
        "小满": 38,
        "芒种": 39,
        "夏至": 40,
        "小暑": 41,
        "大暑": 42,
        "立秋": 43,
        "处暑": 44,
        "白露": 45,
        "秋分": 46,
        "寒露": 47,
        "霜降": 48,
        "立冬": 49,
        "小雪": 50,
        "大雪": 51,
        "冬至": 52,
        "小寒": 53,
        "大寒": 54,
        '妇女节': 55,
        '愚人节': 56,
        '劳动节': 57,
        '世界地球日': 58,
        '母亲节': 59,
        '建党节': 60,
        '建军节': 61,
        '腊八节': 62,
        '端午节': 63,
        '元旦节': 64,
        '世界无烟日': 65,
        '父亲节': 66,
        '教师节': 67,
        '植树节': 68,
        '七夕情人节': 69,
        '中秋节': 70,
        '重阳节': 71,
        '世界环境保护日': 72,
        '劳动节重复了。。': 73,
        '爱牙日': 74,
        '除夕': 75,
        '春节': 76,
        '青年节': 77,
        '国际儿童节': 78,
        '国庆节': 79,
        '元宵节': 80,
        '情人节': 81,
        '中元节': 82,
        '平安夜': 83,
        '感恩节': 84,
        "甲子": 85,
        "乙丑": 86,
        "丙寅": 87,
        "丁卯": 88,
        "戊辰": 89,
        "己巳": 90,
        "庚午": 91,
        "辛未": 92,
        "壬申": 93,
        "癸酉": 94,
        "甲戌": 95,
        "乙亥": 96,
        "丙子": 97,
        "丁丑": 98,
        "戊寅": 99,
        "己卯": 100,
        "庚辰": 101,
        "辛巳": 102,
        "壬午": 103,
        "癸未": 104,
        "甲申": 105,
        "乙酉": 106,
        "丙戌": 107,
        "丁亥": 108,
        "戊子": 109,
        "己丑": 110,
        "庚寅": 111,
        "辛卯": 112,
        "壬辰": 113,
        "癸巳": 114,
        "甲午": 115,
        "乙未": 116,
        "丙申": 117,
        "丁酉": 118,
        "戊戌": 119,
        "己亥": 120,
        "庚子": 121,
        "辛丑": 122,
        "壬寅": 123,
        "癸卯": 124,
        "甲辰": 125,
        "乙巳": 126,
        "丙午": 127,
        "丁未": 128,
        "戊申": 129,
        "己酉": 130,
        "庚戌": 131,
        "辛亥": 132,
        "壬子": 133,
        "癸丑": 134,
        "甲寅": 135,
        "乙卯": 136,
        "丙辰": 137,
        "丁巳": 138,
        "戊午": 139,
        "己未": 140,
        "庚申": 141,
        "辛酉": 142,
        "壬戌": 143,
        "癸亥": 144
    },
    LIFE_COMPARE_MAP: ['再为自己补充一些x岁的记忆吧', '我的x岁有什么故事呢？还是空白啊', '为我的x岁再添置一些想法吧', '等我到了x岁，会有怎样的打算呢'],
    ACT_NAME_INFO_HASH: {
        'annual2012': {
            CGI_GET_EVENT_DATA: 'time_cgi_get_sumup',
            CGI_DELETE: 'time_cgi_del_sumup',
            CGI_GET_SUMMARY: "time_cgi_sumup_brief",
            name: 'annual2012',
            start: new Date(2011, 11, 20, 0, 0, 0),
            end: new Date(2012, 11, 31, 23, 59, 59),
            selectionMinYear: 2012,
            selectionMaxYear: 2012,
            globalBg: {
                name: '2012年终盘点',
                url: 'http://qzonestyle.gtimg.cn/qzone_v6/proj_timeline/img/count2012/bg_count.jpg?max_age=20130131&d=20121228110042',
                thumbUrl: '/qzone_v6/proj_timeline/img/tml_default_bgs_vip/thumb/1.jpg'
            },
            customizedEventTplName: 'ACT_ANNUAL2012_TPL2',
            disableSwapBg: false,
            disableCreation: true,
            customizeHeader: true,
            hideSummary: true,
            headerHeight: 653,
            css: 'http://qzonestyle.gtimg.cn/qzone_v6/proj_timeline/timeline_count2012.css?max_age=20130204',
            script: '/qzone/app/timeline/script/act/annual2012.js?max_age=20130204'
        }
    }
}
Timeline.utils = (function () {
    "use strict";
    window.log = location.hash.indexOf('debug') !== -1 && window.console && console.log ? QZFL.bind(console, console.log) : function () {
    };
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var processReturnCode = function (response, method, args, errCb) {
        var verify_type = 1;
        switch (response.code) {
            case -3000:
                Timeline.utils.checkLogin(function (uin) {
                    if (args[0].indexOf(Timeline.CONST.CGI_GET_SUMMARY) != -1) {
                        location.reload();
                        return;
                    }
                    args[1].uin = uin;
                    Timeline.utils[method].apply(this, args);
                });
                break;
            case -3001:
                verify_type = 0;
            case -3002:
                QZONE.FP.showVerifyBox(verify_type, function (verify_code) {
                    args[1].verify = verify_code;
                    Timeline.utils[method].apply(this, args);
                }, true);
                break;
            default:
                errCb();
        }
    };
    var valueStatIdMap = {
        'time_cgi_get_brief': 400547,
        'time_cgi_get_headmodule': 400548,
        'time_cgi_get_bytime': 400549,
        'time_cgi_get_byeventid': 400550,
        'time_cgi_create': 400551,
        'time_cgi_update': 400552,
        'time_cgi_delete': 400553,
        'time_cgi_handle_invite': 400573,
        'time_cgi_mend': 400592,
        'time_cgi_feedlist': 400609,
        'time_cgi_state': 400610,
        'time_cgi_apply': 400611,
        'emotion_cgi_firstutf8': 400612,
        'emotion_cgi_get_tweetsset_v6': 400613,
        'emotion_cgi_signset_v6': 400614,
        'emotion_cgi_delete_v6': 400615,
        'emotion_cgi_lock': 400616
    };
    return {
        isFuture: function (aData) {
            var _realTime = Timeline.utils.getDateFromTick(QZONE.FP.getSvrTime());
            return Timeline.utils.judgeDate(_realTime, aData) < 0;
        },
        getLastMomentOfMonth: function (aDate) {
            var t;
            t = [aDate.year, aDate.month];
            if (t[1] == "12") {
                t[0]++;
            }
            t[1] = (t[1] % 12) + 1;
            return new Date(t[0] + "/" + t[1] + "/1") - 1;
        },
        getDeltaDate: function (dataA, dataB) {
            return (dataA.year - dataB.year) * 12 + (dataA.month - dataB.month);
        },
        getAddDate: function (date, month) {
            var _d = {};
            var total = date.year * 12 + date.month + month - 1;
            _d.year = parseInt(total / 12, 10);
            _d.month = total % 12 + 1;
            return _d;
        },
        judgeDate: function (dataA, dataB) {
            var _dA = new Date(dataA.year + "/" + dataA.month + "/1").getTime();
            var _dB = new Date(dataB.year + "/" + dataB.month + "/1").getTime();
            var rtnValue;
            if (!_dA || !_dB) {
                rtnValue = -2;
            } else if (_dA < _dB) {
                rtnValue = -1;
            } else if (_dA > _dB) {
                rtnValue = 1
            } else {
                rtnValue = 0;
            }
            return rtnValue;
        },
        getTitleFromDate: function (date) {
            return date.year + "年" + date.month + "月"
        },
        getDateFromTick: function (time) {
            var _d = new Date(time);
            return {year: _d.getFullYear(), month: _d.getMonth() + 1}
        },
        dataLoader: function (url, data, sucCb, errCb, options) {
            var sTime = new Date().getTime();
            var origin_url = url;
            sucCb = sucCb || QZFL.emptyFn;
            errCb = errCb || QZFL.emptyFn;
            options = QZFL.extend({showTips: false}, options || {});
            data = QZFL.extend({
                uin: QZONE.FP.getQzoneConfig('loginUin'),
                hostUin: QZONE.FP.getQzoneConfig('ownerUin'),
                format: 'jsonp',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'qzone',
                callbackFun: ''
            }, data);
            var p = [],
                successCallback = function (response) {
                    Timeline.utils.sendReturnCode(origin_url, response.code, new Date().getTime() - sTime);
                    if (response.code == 0 || response.code == -22010) {
                        sucCb(options.retOrigResponse ? response : response.data);
                    } else {
                        response.message = response.message || Timeline.CONST.MSG_DEFAULT_TIP;
                        processReturnCode(response, 'dataLoader', [origin_url, data, sucCb, errCb, options], function () {
                            if (options.showTips) {
                                QZONE.FP.showMsgbox(response.message, Timeline.CONST.MSG_TYPE_HINT, 2000);
                            }
                            errCb(response);
                        });
                    }
                },
                errorCallback = function () {
                    var response = {'code': -1, 'message': Timeline.CONST.MSG_DEFAULT_TIP};
                    Timeline.utils.sendReturnCode(origin_url, response.code, new Date().getTime() - sTime);
                    if (options.showTips) {
                        QZONE.FP.showMsgbox(response.message, Timeline.CONST.MSG_TYPE_HINT, 2000);
                    }
                    errCb(response);
                };
            for (var i in data) {
                p.push(URIencode(i) + "=" + URIencode(data[i] + ""));
            }
            url += url.indexOf("?") >= 0 ? "&" + p.join("&") : "?" + p.join("&");
            if (window.$j && $j.jsonGet) {
                $j.jsonGet(url, null, {
                    "callback": successCallback,
                    "onerror": errorCallback,
                    "charset": options.charset || data.outCharset
                });
            } else {
                var loader = new QZFL.JSONGetter(url, void(0), null, options.charset || data.outCharset);
                loader.onSuccess = successCallback;
                loader.onError = errorCallback;
                loader.send(data.callbackFun + '_Callback');
            }
        },
        dataSender: function (url, data, sucCb, errCb, options) {
            var sTime = new Date().getTime();
            sucCb = sucCb || QZFL.emptyFn;
            errCb = errCb || QZFL.emptyFn;
            options = QZFL.extend({showTips: true}, options || {});
            data = QZFL.extend({
                uin: QZONE.FP.getQzoneConfig('loginUin'),
                hostUin: QZONE.FP.getQzoneConfig('ownerUin'),
                format: 'fs',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'qzone'
            }, data);
            var sender = new QZFL.FormSender(url, 'post', data, options.charset || data.outCharset);
            sender.onSuccess = function (response) {
                Timeline.utils.sendReturnCode(url, response.code, new Date().getTime() - sTime);
                if (response.code == 0) {
                    sucCb(options.retOrigResponse ? response : response.data);
                } else {
                    response.message = response.message || Timeline.CONST.MSG_DEFAULT_TIP;
                    processReturnCode(response, 'dataSender', [url, data, sucCb, errCb, options], function () {
                        if (options.showTips) {
                            QZONE.FP.showMsgbox(response.message, Timeline.CONST.MSG_TYPE_HINT, 2000);
                        }
                        errCb(response);
                    });
                }
            };
            sender.onError = function () {
                var response = {'code': -1, 'message': Timeline.CONST.MSG_DEFAULT_TIP};
                Timeline.utils.sendReturnCode(url, response.code, new Date().getTime() - sTime);
                if (options.showTips) {
                    QZONE.FP.showMsgbox(response.message, Timeline.CONST.MSG_TYPE_HINT, 2000);
                }
                errCb(response);
            };
            sender.send();
        },
        checkLogin: function (callback) {
            var real_uin;
            if (real_uin = Timeline.utils.getRealLoginUin()) {
                callback(real_uin);
            } else {
                QZONE.FP.showLoginBox('timeline', function () {
                    if (real_uin = Timeline.utils.getRealLoginUin()) {
                        callback(real_uin);
                    }
                });
            }
        },
        getRealLoginUin: function () {
            var g = QZFL.cookie.get,
                u, uin;
            uin = (u = g('uin').replace(/\D/g, '') - 0) && g('skey') && u > 10000 && u || 0;
            return uin;
        },
        sendReturnCode: function (url, code, time) {
            var cgi, stat_id, result_type, return_value, duration;
            cgi = url.match(/\/([^\/]*)$/)[1];
            result_type = code == 0 ? 1 : 2;
            return_value = {'0': 11, '-1': 12}[code] || code;
            if ((stat_id = valueStatIdMap[cgi]) && TCISD) {
                TCISD.valueStat(stat_id, result_type, return_value, {duration: time});
            }
        },
        fixDigit: function (n) {
            return (~~n < 10 ? '0' : '') + ~~n;
        },
        timestampToText: function (timestamp, accuracy) {
            var D = new Date(timestamp || (+new Date));
            var ret = {dateText: '', timeText: '', feedText: ''};
            if (!accuracy || accuracy > 5) {
                accuracy = 3;
            }
            ret.dateText += D.getFullYear();
            ret.feedText += D.getFullYear() + '年';
            if (accuracy > 1) {
                ret.dateText += '-' + this.fixDigit(D.getMonth() + 1);
                ret.feedText += this.fixDigit(D.getMonth() + 1) + '月';
            }
            if (accuracy > 2) {
                ret.dateText += '-' + this.fixDigit(D.getDate());
                ret.feedText += this.fixDigit(D.getDate()) + '日';
            }
            if (accuracy == 4) {
                ret.timeText = this.fixDigit(D.getHours()) + '时';
                ret.feedText += this.fixDigit(D.getHours()) + '时';
            } else if (accuracy == 5) {
                ret.timeText = this.fixDigit(D.getHours()) + ':' + this.fixDigit(D.getMinutes());
                ret.feedText += this.fixDigit(D.getHours()) + '时' + this.fixDigit(D.getMinutes()) + '分';
            }
            return ret;
        },
        hotClick: function (tag, domain) {
            domain = domain || 'timeline.qzone.qq.com';
            TCISD.hotClick(tag, domain, '/index');
        },
        tween: function (obj, prop, v1, v2, opt) {
            var currentTime, interval, duration;
            var opt = QZFL.extend({
                duration: 1000, callback: function () {
                }, compatRAF: false, forbidAlphaFilter: false, skipLag: false, functor: function (t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                }
            }, opt);
            currentTime = 0;
            interval = 32;
            duration = parseInt(opt.duration / interval);
            var endTween = function () {
                if (prop == 'opacity') {
                    obj.style.opacity = v2.toFixed(2);
                    if (!opt.forbidAlphaFilter) {
                        obj.style.filter = 'alpha(opacity=' + (v2 * 100) + ')';
                    }
                    v2 == 0 && (obj.style.display = 'none');
                } else {
                    obj.style[prop] = v2 + 'px';
                }
                opt.callback();
            };
            if (prop == 'opacity' && v1 == 0) {
                obj.style.display = '';
            }
            if (!requestAnimationFrame && !opt.compatRAF) {
                endTween();
                return;
            }
            var moment = +new Date,
                result;
            (function _fn(t) {
                var t = t || +new Date;
                if (opt.skipLag && t - moment > 64) {
                    endTween();
                    return;
                } else {
                    moment = t;
                }
                result = opt.functor(currentTime, v1, v2 - v1, duration);
                if (prop == 'opacity') {
                    obj.style.opacity = result.toFixed(2);
                    if (!opt.forbidAlphaFilter) {
                        obj.style.filter = 'alpha(opacity=' + Math.ceil(result * 100) + ')';
                    }
                } else {
                    obj.style[prop] = Math.ceil(result) + 'px';
                }
                if (currentTime++ < duration) {
                    requestAnimationFrame ? requestAnimationFrame(_fn) : setTimeout(_fn, interval);
                } else {
                    endTween();
                }
            })(+new Date);
        },
        random: function (n1, n2) {
            return Math.floor(Math.random() * n2 + n1);
        },
        inVisibleArea: function (elem, buffer) {
            var pos = QZFL.dom.getPosition(elem);
            buffer = buffer || 0;
            if (pos.height == 0 || pos.top + pos.height - buffer < QZFL.dom.getScrollTop() || pos.top + buffer > QZFL.dom.getScrollTop() + QZFL.dom.getClientHeight()) {
                return false;
            }
            return true;
        },
        scrollTo: function (dest, opt) {
            var dest_top;
            opt = opt || {};
            if (typeof dest == 'number') {
                dest_top = dest;
            } else if (dest.nodeType && dest.nodeType == 1) {
                dest_top = QZFL.dom.getPosition(dest).top - (opt.margin || 0);
            }
            if (typeof dest_top == 'undefined') {
                return;
            }
            if (opt.noTween) {
                QZFL.dom.setScrollTop(dest_top);
            } else {
                var original_top = QZFL.dom.getScrollTop();
                var tween = new QZFL.tweenMaker(original_top, dest_top, opt.duration || 1000, 1000 / 60, {
                    functor: function (t, b, c, d) {
                        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                    }
                });
                tween.onChange = function (percent) {
                    var top = original_top + ((dest_top - original_top) * (percent * 0.01));
                    QZFL.dom.setScrollTop(top);
                };
                tween.onEnd = function () {
                    opt.callback && opt.callback();
                };
                tween.start();
            }
        },
        getLunarSpriteId: function (d, accuracy, lunar_info) {
            var lunar = lunar_info || LunarMaker.getLunarDate(this.getProperDate(d)),
                lunarMap = Timeline.CONST.LUNAR_MAP,
                trim = QZFL.string.trim;
            var lunar_day = lunarMap[trim(lunar.sFestival)] || lunarMap[trim(lunar.lFestival)] || lunarMap[trim(lunar.solarTerm)] || lunarMap[trim(lunar.lDay)] || '';
            var lunar_year = lunarMap[trim(lunar.cYear)] || '';
            if (accuracy >= 3) {
                return lunar_day || lunar_year;
            } else {
                return lunar_year;
            }
        },
        getProperDate: function (d, accuracy) {
            switch (accuracy) {
                case 1:
                    d = new Date(d.getFullYear(), 6 - 1, 15);
                    break;
                case 2:
                    d = new Date(d.getFullYear(), d.getMonth(), 15);
                    break;
                default:
                    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
            }
            return d;
        },
        getLastMoment: function (date) {
            var date = date ? (typeof date == 'number' ? new Date(date) : date) : QZONE.FP.getSvrTime();
            return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
        },
        require: function (file, callback) {
            if (file.indexOf('http://') == -1) {
                file = 'http://' + siDomain + '/qzone/app/timeline/script/' + file;
            }
            QZFL.imports(file, callback);
        },
        showMaskLayout: function (z_index) {
            if (!QZFL.maskLayout.getRef()) {
                QZFL.maskLayout(z_index);
            } else if (z_index) {
                QZFL.maskLayout.getRef().style.zIndex = z_index;
            }
        },
        hideMaskLayout: function () {
            QZFL.maskLayout.remove(true);
        },
        getUrlParam: function (name, loc) {
            loc = loc || window.location;
            var r = new RegExp('(\\?|#|&)' + name + '=(.*?)(&|#|$)');
            var m = (loc.href || '').match(r);
            return (m ? m[2] : '');
        },
        getStrBytesLength: function (str) {
            return str.replace(/[^\x00-\xff]/g, 'xx').length;
        },
        subStringByBytes: function (str, len, postFix) {
            if (this.getStrBytesLength(str) <= len) {
                return str;
            }
            postFix = postFix || '';
            var l;
            if (postFix) {
                l = len = Math.max(0, len - this.getStrBytesLength(postFix));
            } else {
                l = len;
            }
            do {
                str = str.slice(0, l--);
            } while (this.getStrBytesLength(str) > len);
            return str + postFix;
        }
    }
})();
Timeline.core = (function () {
    var
        _ownerUin = 0,
        _loginUin = 0,
        _eventSummary = {},
        _eventDataIndex = {},
        _eventData = [],
        _birthdayData = null,
        _dataState = Timeline.CONST.STATE_UNKNOWN,
        _indexInitialized = false,
        _dataIncomplete = false;

    function _getCGIURL(cgiName) {
        return "http://" + Timeline.CONST.DOMAIN_CGI + "/cgi-bin/" + cgiName;
    };

    function _sortEventData(data) {
        (data || _eventData).sort(function (a, b) {
            return (a.time < b.time) ? 1 : -1;
        });
    }

    function _createSummaryItem(count) {
        if (!count) {
            count = 0;
        }
        return {eventCount: count, eventStorage: []};
    }

    function _updateSummary(options) {
        var aMonth;
        if (!options.year || !options.month) {
            return;
        }
        if (!_eventSummary[options.year]) {
            _eventSummary[options.year] = {};
        }
        aMonth = _eventSummary[options.year][options.month]
        if (!aMonth) {
            aMonth = _eventSummary[options.year][options.month] = _createSummaryItem();
        }
        if (options.count != undefined) {
            aMonth.eventCount = options.count;
        }
    }

    function _deleteSummary(date) {
        if (!date.year || !date.month) {
            return;
        }
        if (!!_eventSummary[date.year] && _eventSummary[date.year][date.month]) {
            delete _eventSummary[date.year][date.month];
        }
    }

    function _descSort(a, b) {
        return ((parseInt(a) < parseInt(b)) ? 1 : -1);
    }

    function _traverseSummary(func) {
        var y, m, aYear = [],
            aMonth;
        QZFL.object.each(_eventSummary, function (o, y) {
            aYear.push(y);
        });
        aYear.sort(_descSort);
        for (y = 0; y < aYear.length; y++) {
            aMonth = [];
            for (m in _eventSummary[aYear[y]]) {
                aMonth.push(m);
            }
            ;
            aMonth.sort(_descSort);
            for (m = 0; m < aMonth.length; m++) {
                if (func({year: parseInt(aYear[y]), month: parseInt(aMonth[m])}, _eventSummary[aYear[y]][aMonth[m]])) {
                    return;
                }
            }
        }
    }

    function _getItemIndex(item) {
        var index = -1;
        QZFL.object.each(_eventData, function (v, i) {
            if (item === v) {
                index = i;
            }
        });
        return index;
    }

    function _getSummaryByDate(date, blnForce) {
        var y, m;
        if (y = _eventSummary[date.year]) {
            if (m = y[date.month]) {
                return m;
            }
        }
        if (blnForce) {
            _updateSummary(date);
            return _eventSummary[date.year][date.month];
        } else {
            return null;
        }
    }

    function _getSummaryData() {
        return _eventSummary;
    }

    function _getFixedDataParam(options) {
        var startMonth, sTime, startIndex = 0,
            rePosed = false,
            offset = 0,
            aItem, i, needNum = options.num,
            realStart = options.startTime,
            emptyNum = 0;
        var loadedNum = 0;
        sTime = new Date(options.startTime);
        startMonth = [sTime.getFullYear(), sTime.getMonth() + 1];
        _traverseSummary(function (date, summary) {
            if (Timeline.utils.judgeDate(Timeline.core.getLastMonth(), date) == 0 && summary.eventStorage.length == summary.eventCount) {
                needNum = emptyNum;
                offset += summary.eventCount;
                return true;
            }
            if (date.year > sTime.getFullYear() || (date.year == sTime.getFullYear() && date.month > sTime.getMonth() + 1)) {
                startIndex += summary.eventStorage.length;
                return;
            }
            if (!rePosed) {
                QZFL.object.each(summary.eventStorage, function (item, index) {
                    if (item.ignoreCache) {
                        return;
                    }
                    if (item.time < options.startTime && loadedNum < needNum) {
                        loadedNum++;
                        if (!rePosed) {
                            startIndex = _getItemIndex(item);
                            rePosed = true;
                        }
                        realStart = item.time - 1;
                    }
                });
                if (!rePosed && !!summary.eventStorage.length) {
                    i = summary.eventStorage.length;
                    while (aItem = summary.eventStorage[--i]) {
                        if (!aItem.ignoreCache) {
                            startIndex = _getItemIndex(aItem) + 1;
                            realStart = aItem.time - 1;
                            break;
                        }
                    }
                }
                rePosed = true;
                offset = loadedNum;
                if (loadedNum >= needNum) {
                    needNum = 0;
                    return true;
                } else {
                    needNum -= loadedNum;
                    emptyNum = summary.eventCount - summary.eventStorage.length;
                    if (emptyNum < 0) {
                        emptyNum = 0;
                    }
                    if (emptyNum >= needNum) {
                        return true;
                    }
                }
            } else {
                if (summary.eventStorage.length) {
                    if (emptyNum == 0) {
                        needNum -= summary.eventStorage.length;
                        offset += summary.eventStorage.length;
                        while (aItem = summary.eventStorage[--i]) {
                            if (!aItem.ignoreCache) {
                                realStart = aItem.time - 1;
                                break;
                            }
                        }
                        if (needNum <= 0) {
                            needNum = 0;
                            return true;
                        }
                        emptyNum = summary.eventCount - summary.eventStorage.length;
                    } else {
                        needNum = Math.min(needNum, emptyNum);
                        return true;
                    }
                } else {
                    emptyNum += summary.eventCount;
                    if (emptyNum >= needNum) {
                        return true;
                    }
                }
            }
        });
        return {offset: offset, startIndex: startIndex, startTime: realStart, num: needNum};
    }

    function _addEventData(item, inOrder) {
        var _date, aEvent, aSummary;
        if (!!_eventDataIndex[item.id]) {
            return null;
        } else {
            _eventDataIndex[item.id] = true;
        }
        aEvent = new Timeline.Event(item, {readOnly: !!item.readOnly, ignoreCache: !!item.ignoreCache});
        _date = Timeline.utils.getDateFromTick(aEvent.time);
        aSummary = _getSummaryByDate(_date, true);
        aSummary.eventStorage.push(aEvent);
        _eventData.push(aEvent);
        if (!!inOrder) {
            _sortEventData();
        }
        return aEvent;
    }

    function _updateEvent(aEvent, orgTime, inOrder) {
        var _date, _orgDate, aSummary, _idx, _d;
        if (!_eventDataIndex[aEvent.id]) {
            return false;
        }
        _orgDate = Timeline.utils.getDateFromTick(orgTime);
        _date = Timeline.utils.getDateFromTick(aEvent.time);
        aSummary = _getSummaryByDate(_orgDate);
        if (!aSummary) {
            return false;
        }
        if (Timeline.utils.judgeDate(_orgDate, _date) != 0) {
            _idx = -1;
            QZFL.object.each(aSummary.eventStorage, function (item, i) {
                if (item.id == aEvent.id) {
                    _idx = i;
                }
            });
            if (_idx == -1) {
                return false;
            }
            aSummary.eventStorage.splice(_idx, 1);
            aSummary.eventCount--;
            if (aSummary.eventCount <= 0) {
                _deleteSummary(_orgDate);
            }
            aSummary = _getSummaryByDate(_date, true);
            aSummary.eventStorage.push(aEvent);
            aSummary.eventCount++;
        }
        if (!!inOrder) {
            _sortEventData();
        } else {
            _sortEventData(aSummary.eventStorage);
        }
        return true;
    }

    function _deleteEvent(eventId) {
        var aEvent = Timeline.core.getEventById(eventId);
        if (!aEvent) {
            return false;
        }
        var _idx, _date = Timeline.utils.getDateFromTick(aEvent.time);
        var aSummary = _getSummaryByDate(_date);
        if (!aSummary) {
            return false;
        }
        _idx = -1;
        QZFL.object.each(aSummary.eventStorage, function (item, i) {
            if (item.id == aEvent.id) {
                _idx = i;
            }
        });
        aSummary.eventStorage.splice(_idx, 1);
        aSummary.eventCount--;
        if (aSummary.eventCount <= 0) {
            _deleteSummary(_date);
        }
        _eventData.splice(Timeline.core.getEventIndexById(eventId), 1);
        delete aEvent;
        return true;
    }

    function _buildSummary(o) {
        var _b = Timeline.core.getBirthday();
        var year, month;
        QZFL.object.each(o.data, function (item) {
            year = 1900 + parseInt(item.offset / 12);
            month = item.offset % 12 + 1;
            if (_b.hasBirth && Timeline.utils.judgeDate(_b.data, {year: year, month: month}) > 0) {
                return;
            }
            if (!_eventSummary[year]) {
                _eventSummary[year] = {};
            }
            _eventSummary[year][month] = _createSummaryItem(item.num);
        });
    }

    function _storeEventData(o, endTime) {
        var _lastMonth;
        QZFL.object.each(o.event, function (item, index) {
            var _date, _summary;
            if (endTime && item.time * 1000 < endTime) {
                return;
            }
            if (Timeline.UI.act) {
                if (item.id == Timeline.Event.calendarId || item.id == Timeline.Event.setHomepageId || item.id == Timeline.Event.visitorId) {
                    return;
                }
            }
            _date = Timeline.utils.getDateFromTick(item.time * 1000);
            if (!_lastMonth) {
                _lastMonth = _date;
            }
            if (Timeline.utils.judgeDate(_lastMonth, _date) != 0) {
                _summary = _getSummaryByDate(_lastMonth);
                if (!!_summary && !!_summary.eventStorage.length) {
                    _summary.eventCount = _summary.eventStorage.length;
                }
                _lastMonth = {year: _date.year, month: _date.month};
            }
            _addEventData(item);
        });
        _sortEventData();
    }

    return {
        init: function () {
            _eventSummary = {};
            _eventDataIndex = {};
            _eventData = [];
            _indexInitialized = false;
            _ownerUin = QZONE.FP.getQzoneConfig().ownerUin;
            _loginUin = QZONE.FP.getQzoneConfig().loginUin;
        },
        isOwnerMode: function () {
            return QZONE.FP.getQzoneConfig('isOwner');
        },
        getEventSummary: function (callbackSucc, callbackState, callbackError) {
            var i, data;
            var loadingDiv;
            var loaded = false;
            if (_indexInitialized) {
                callbackSucc(_eventSummary);
            } else {
                if (Timeline.UI.act && Timeline.UI.act.script) {
                    QZFL.imports(Timeline.UI.act.script, function () {
                        if (!loaded && Timeline.UI.act.scriptObj.startLoading) {
                            $e('#loadingHint').hide();
                            Timeline.UI.act.scriptObj.startLoading();
                        }
                    });
                }
                (function doGet() {
                    data = {rnd: Math.random()};
                    Timeline.utils.dataLoader(_getCGIURL(Timeline.UI.act && Timeline.UI.act.CGI_GET_SUMMARY ? Timeline.UI.act.CGI_GET_SUMMARY : Timeline.CONST.CGI_GET_SUMMARY), data, function (o) {
                        if (Timeline.UI.act) {
                            if (o.code == -22010 || o.code == 0 && o.data.state == Timeline.CONST.STATE_INITIALING) {
                                setTimeout(doGet, 5000);
                                return;
                            } else if (o.data.state == Timeline.CONST.STATE_NODATA) {
                                Timeline.utils.dataSender("http://" + Timeline.CONST.DOMAIN_CGI + "/cgi-bin/" + Timeline.CONST.CGI_APPLY_APP, {}, function () {
                                    setTimeout(doGet, 3000);
                                }, function () {
                                    QZONE.FP.showMsgbox('目前参加活动的人过多，请您稍后刷新重试。', 2, 2000);
                                }, {showTips: false});
                                return;
                            }
                            loaded = true;
                            if (Timeline.UI.act && Timeline.UI.act.script) {
                                QZFL.imports(Timeline.UI.act.script, function () {
                                    if (Timeline.UI.act.scriptObj.endLoading) {
                                        Timeline.UI.act.scriptObj.endLoading();
                                    }
                                });
                            }
                            if (!(o.data.data && o.data.data.length)) {
                                Timeline.UI.act.noData = true;
                                $e('.tml_header').addClass('nodata_tips_header');
                                $e('.tml_header .nodata_tips_txt').show();
                                $e('#line').hide();
                                $e('#timelineContent').addClass('nodata_tips').show();
                                return;
                            } else {
                                $e('.tml_header .count_log').show();
                            }
                        } else {
                            _dataState = o.data.state;
                            if ((_dataIncomplete = _dataState != Timeline.CONST.STATE_INITIALED) && (Timeline.appMode || Timeline.mainMode) && (!QZONE.FP.noShareDb.get('TimelineNovicePageGuided' + _loginUin) || !Timeline.core.isOwnerMode())) {
                                if (typeof callbackState == "function") {
                                    callbackState(_dataState);
                                }
                                return;
                            } else if (_dataIncomplete) {
                                setTimeout(function () {
                                    Timeline.utils.dataLoader(_getCGIURL(Timeline.CONST['CGI_GET_FEEDS_DATA']), data, function (o) {
                                        _buildSummary(o);
                                        _storeEventData(o);
                                        _indexInitialized = true;
                                        callbackSucc(_eventSummary);
                                    }, function (o) {
                                        callbackError && callbackError(o);
                                    });
                                }, 0);
                                if (_dataState == Timeline.CONST.STATE_NODATA) {
                                    Timeline.utils.dataSender("http://" + Timeline.CONST.DOMAIN_CGI + "/cgi-bin/" + Timeline.CONST.CGI_APPLY_APP, {}, QZFL.emptyFn, QZFL.emptyFn, {showTips: false});
                                }
                                return;
                            }
                        }
                        _buildSummary(o.data);
                        _indexInitialized = true;
                        callbackSucc(_eventSummary);
                    }, function (o) {
                        if (Timeline.UI.act && Timeline.UI.act.script) {
                            QZONE.FP.showMsgbox('目前参加活动的人过多，请您稍后刷新重试。', 2, 4000);
                            QZFL.imports(Timeline.UI.act.script, function () {
                                if (Timeline.UI.act.scriptObj.endLoading) {
                                    Timeline.UI.act.scriptObj.endLoading();
                                }
                            });
                        }
                        callbackError && callbackError(o);
                    }, {retOrigResponse: true, showTips: true});
                })();
            }
        },
        getSummaryData: _getSummaryData,
        getSummaryByDate: _getSummaryByDate,
        getEventDataById: function (eId, callbackSucc, callbackError) {
            var data = {tids: eId, plattype: 0}
            Timeline.utils.dataLoader(_getCGIURL(Timeline.CONST.CGI_GET_EVENT_BY_ID), data, callbackSucc, callbackError);
        },
        getEventData: function (options) {
            var data, fixed, offset = 0,
                startIndex;
            if (!options.nocache) {
                if (!!options.nofix) {
                    startIndex = 0;
                    _traverseSummary(function (date, summary) {
                        if (Timeline.utils.judgeDate(date, Timeline.utils.getDateFromTick(options.startTime)) > 0) {
                            startIndex += summary.eventStorage.length;
                            return;
                        }
                    });
                    fixed = {startTime: options.startTime, num: options.num}
                } else {
                    fixed = _getFixedDataParam(options);
                    startIndex = fixed.startIndex;
                    offset = fixed.offset;
                }
                data = {user_time: fixed.startTime, num: fixed.num}
            } else {
                data = {user_time: options.startTime, num: options.num, is_cache_request: 1}
                startIndex = 0;
            }
            if (data.num == 0) {
                options.callbackSucc(_eventData.slice(startIndex, startIndex + offset + data.num));
            } else {
                if (options.endTime) {
                    data.end_time = parseInt(options.endTime / 1000);
                }
                data.user_time = parseInt(data.user_time / 1000);
                data.rnd = Math.random();
                Timeline.utils.dataLoader(_getCGIURL(Timeline.UI.act && Timeline.UI.act.CGI_GET_EVENT_DATA ? Timeline.UI.act.CGI_GET_EVENT_DATA : Timeline.CONST['CGI_GET_EVENT_DATA']), data, function (o) {
                    PAGE_EVENT.fireEvent('eventVisitor.mixData', o);
                    _storeEventData(o, options.endTime);
                    options.callbackSucc(_eventData.slice(startIndex, startIndex + offset + data.num));
                    if (Timeline.UI.act) {
                        if (Timeline.UI.act.data) {
                            Timeline.UI.act.data.event = Timeline.UI.act.data.event.concat(o.event);
                        } else {
                            Timeline.UI.act.data = o;
                        }
                        setTimeout(function () {
                            if (Timeline.UI.act && Timeline.UI.act.script) {
                                QZFL.imports(Timeline.UI.act.script, function () {
                                    if (Timeline.UI.act.scriptObj.endRenderEvents) {
                                        Timeline.UI.act.scriptObj.endRenderEvents();
                                    }
                                });
                            }
                        }, 1000);
                    }
                }, function (o) {
                    options.callbackError && options.callbackError(o);
                });
            }
        },
        getCurEventData: function () {
            return _eventData;
        },
        refreshSummary: function (callback) {
            _eventSummary = {};
            _indexInitialized = false;
            Timeline.core.getEventSummary(callback);
        },
        refreshData: function (callback) {
        },
        getEventById: function (aId) {
            var aEvent = null;
            QZFL.object.each(_eventData, function (item, i) {
                if (aId == item.id) {
                    aEvent = item;
                }
            });
            return aEvent;
        },
        getEventIndexById: function (eventId) {
            var _index = -1;
            QZFL.object.each(_eventData, function (item, i) {
                if (eventId == item.id) {
                    _index = i;
                }
            });
            return _index;
        },
        sortEventData: _sortEventData,
        addEventData: _addEventData,
        updateEvent: _updateEvent,
        deleteEvent: _deleteEvent,
        traverseSummary: _traverseSummary,
        getRealTime: QZONE.FP.getSvrTime,
        updateSummary: _updateSummary,
        deleteSummary: _deleteSummary,
        getRealDate: function () {
            var t = QZONE.FP.getSvrTime();
            return {year: t.getFullYear(), month: t.getMonth() + 1}
        },
        getBirthday: function () {
            var _data, _date, _blnHasBirth = true;
            if (!!_birthdayData) {
                _data = _birthdayData;
            } else {
                _date = new Date(window.ownerProfileSummary[6].replace(/-/g, "\/"));
                if (window.ownerProfileSummary[6] == "0-0-0") {
                    _date = new Date(Timeline.CONST.DEFAULT_FIRST_DATE);
                    _blnHasBirth = false;
                }
                _birthdayData = {
                    hasBirth: _blnHasBirth,
                    date: _date,
                    data: {year: _date.getFullYear(), month: _date.getMonth() + 1, day: _date.getDate()},
                    lunarDate: LunarMaker.getLunarDate(_date)
                }
                _data = _birthdayData;
            }
            return _data;
        },
        getFirstMonth: function () {
            var _date;
            _traverseSummary(function (date, s) {
                _date = date;
                return true;
            });
            return _date;
        },
        getLastMonth: function () {
            var _date;
            _traverseSummary(function (date, s) {
                _date = date;
            });
            return _date;
        },
        getDataState: function () {
            return _dataState;
        },
        getTotalNum: function () {
            var total_num = 0;
            QZFL.object.each(_eventSummary, function (item) {
                QZFL.object.each(item, function (_item) {
                    total_num += _item.eventCount;
                });
            });
            return total_num;
        },
        dataIncomplete: function () {
            return _dataIncomplete;
        }
    }
})();
Timeline.core = QZFL.object.extend(Timeline.core, PAGE_EVENT);
Timeline.summary = (function () {
    var _container;
    var _top;
    var _isNow;
    var _currentDate = {year: 0, month: 0};
    var _currentDateCached;
    var _data, _fixedData;

    function _bindEvent() {
        var tgt = QZFL.event.getTarget();
        var t, _d = _getFixedData();
        if (tgt.tagName.toLowerCase() == "a") {
            t = tgt.rel;
            if (t.indexOf(".") == -1) {
                Timeline.summary.fireEvent("onGotoPoint", t);
            } else {
                t = tgt.rel.split(".");
                Timeline.summary.fireEvent("onSelectDate", {year: t[0], month: t[1]}, {
                    nocache: false,
                    noscroll: false
                });
            }
            Timeline.utils.hotClick('Index.index');
        }
    }

    function _getNearestMonth(aDate, direction) {
        var _nearest = null;
        var minDelta = Infinity;
        var _delta;
        direction = !!direction ? direction : 0;
        Timeline.core.traverseSummary(function (date, summary) {
            if (direction == 1 && Timeline.utils.judgeDate(date, aDate) <= 0) {
                return;
            } else if (direction == -1 && Timeline.utils.judgeDate(date, aDate) >= 0) {
                return;
            } else {
                _delta = Math.abs(Timeline.utils.getDeltaDate(date, aDate));
                if (_delta < minDelta) {
                    _nearest = date;
                    minDelta = _delta;
                }
            }
        });
        return _nearest;
    }

    function _getAgesData() {
        var _arrAges = [],
            _curAge, aAge, _curIndex = -1;
        var aItem, _fIndex = -1;
        var _realTime = Timeline.utils.getDateFromTick(QZONE.FP.getSvrTime());
        var _virtualNow;
        var hasNow = false;
        var _getAgeFromYear = function (y) {
            return y.toString().replace(/\d$/, "0");
        }
        QZFL.object.each(_fixedData, function (item, i) {
            if (_getAgeFromYear(item.year) == _getAgeFromYear(_currentDate.year)) {
                _curAge = 0;
                aItem = {
                    type: "year",
                    title: item.year + "年",
                    rel: item.year + "." + item.month[0].month,
                    date: {year: item.year, month: item.month[0].month},
                    text: item.year,
                    data: item
                }
                _arrAges.push(aItem);
            } else {
                aAge = item.year.toString().replace(/\d$/, "0");
                if (aAge != _curAge || Timeline.utils.judgeDate({
                        year: item.year,
                        month: item.month[0].month
                    }, _realTime) > 0) {
                    _curAge = aAge;
                    _arrAges.push({
                        type: "ages",
                        age: _curAge,
                        title: _curAge + "年代",
                        rel: item.year + "." + item.month[0].month,
                        text: _curAge + "s",
                        start: {year: item.year, month: item.month[0].month},
                        end: {year: item.year, month: item.month[item.month.length - 1].month}
                    });
                } else {
                    _arrAges[_arrAges.length - 1].end = {
                        year: item.year,
                        month: item.month[item.month.length - 1].month
                    }
                }
                _arrAges[_arrAges.length - 1].date = _arrAges[_arrAges.length - 1].end;
            }
        });
        if (Timeline.utils.judgeDate(_currentDate, _realTime) <= 0) {
            QZFL.object.each(_arrAges, function (item, i) {
                if (Timeline.utils.judgeDate(_realTime, item.date) < 0) {
                    _fIndex = i;
                    item.text = "未来";
                }
            });
            if (_fIndex != -1) {
                _arrAges.splice(0, _fIndex);
            }
        }
        _fIndex = -1;
        QZFL.object.each(_arrAges, function (item, i) {
            var _dCompare = Timeline.utils.judgeDate(_realTime, item.date);
            if (_dCompare < 0) {
                _fIndex = i;
                if (item.type == "year" && item.date.year == _realTime.year && _realTime.year == _currentDate.year) {
                    QZFL.object.each(item.data.month, function (m, j) {
                        if (_realTime.month < m.month) {
                            _fIndex = j;
                        } else if (_realTime.month == m.month) {
                            hasNow = true;
                            m.text = "现在";
                        }
                    })
                    if (!hasNow) {
                        _virtualNow = _getNearestMonth(Timeline.utils.getAddDate(_realTime, 1), -1) || _realTime;
                        item.data.month.splice(_fIndex + 1, 0, {
                            title: _realTime.year + "年" + _realTime.month + "月",
                            month: _realTime.month,
                            rel: _virtualNow.year + "." + _virtualNow.month,
                            text: "现在"
                        });
                        hasNow = true;
                    }
                }
            } else if (_dCompare == 0) {
                hasNow = true;
                item.text = "现在";
            }
        });
        if (!hasNow) {
            _virtualNow = _getNearestMonth(Timeline.utils.getAddDate(_realTime, 1), -1) || _realTime;
            _arrAges.splice(_fIndex + 1, 0, {
                type: "year",
                title: _realTime.year + "年",
                rel: _virtualNow.year + "." + _virtualNow.month,
                date: _virtualNow,
                text: "现在",
                data: {year: _realTime.year, month: [{month: _realTime.month}]}
            });
        }
        _arrAges.push({type: "point", title: "出生", rel: "period_birthday_panel", text: "出生"});
        return _arrAges;
    }

    function _getFixedData() {
        var i, j, arrYear = [],
            arrMonth;
        for (i in _data) {
            arrMonth = [];
            for (j in _data[i]) {
                arrMonth.push({
                    year: parseInt(i),
                    month: parseInt(j),
                    title: i + "年" + j + "月",
                    text: j + "月",
                    rel: i + "." + j,
                    data: _data[i][j]
                });
            }
            if (arrMonth.length) {
                arrMonth.sort(function (a, b) {
                    return (parseInt(a.month) > parseInt(b.month)) ? -1 : 1
                });
                arrYear.push({year: parseInt(i), month: arrMonth});
            }
        }
        arrYear.sort(function (a, b) {
            return (parseInt(a.year) > parseInt(b.year)) ? -1 : 1
        });
        return arrYear;
    }

    return {
        init: function (container, data, date) {
            _container = container;
            Timeline.summary.setData(data);
            QZFL.event.addEvent(_container, "click", _bindEvent);
        },
        refreshView: function () {
            if (_currentDateCached && _currentDateCached.year == _currentDate.year && _currentDateCached.month == _currentDate.month) {
                return;
            }
            var _realTime = QZONE.FP.getSvrTime();
            var data = {
                cyear: _currentDate.year,
                cmonth: _currentDate.month,
                ryear: _realTime.getFullYear(),
                rmonth: _realTime.getMonth() + 1
            };
            data.items = _getAgesData();
            if (!(Timeline.UI.act && Timeline.UI.act.hideSummary)) {
                _container.innerHTML = tmpl(TEMPLATE.SUMMARY_TPL, data);
            }
            _currentDateCached = QZFL.extend({}, _currentDate);
        },
        setCurrentDate: function (date) {
            var srvTime = Timeline.core.getRealTime();
            if (!!date) {
                _currentDate = date;
            } else {
                _currentDate.year = srvTime.getFullYear();
                _currentDate.month = srvTime.getMonth() + 1;
            }
        },
        setData: function (data) {
            _data = data;
            _fixedData = _getFixedData();
        },
        getNearestMonth: _getNearestMonth,
        fixPos: function (force) {
            var _pos, _p;
            var scrollTop = QZFL.dom.getScrollTop();
            var pageOffset = QZFL.dom.getPosition($('pageContent')).top;
            if (Timeline.customMode) {
                pageOffset -= $e('#QZ_Custom_Container').getSize()[1] - $e('#cpFixWidth').getSize()[1];
            }
            pageOffset -= $e('#headContainer').getSize()[1]
            _top = QZFL.dom.getPosition($('timelineContent')).top;
            if (ua.ie == 6) {
                QZFL.effect.run(_container, {
                    top: scrollTop < _top ? _top : scrollTop + 10,
                    left: QZFL.dom.getRect($('timelineContent')).left
                }, {duration: 500});
            } else {
                _pos = (scrollTop + pageOffset < _top ? "absolute" : "fixed");
                if (_pos == "fixed" && (_container.style.position == "absolute" || _container.style.position == "" || force)) {
                    _container.style.left = QZFL.dom.getRect($('timelineContent')).left + "px";
                    _container.style.top = pageOffset + 10 + "px";
                    _container.style.position = "fixed";
                } else if (_pos == "absolute" && _container.style.position == "fixed" || force) {
                    _container.style.position = "absolute";
                    _container.style.left = QZFL.dom.getRect($('timelineContent')).left + "px";
                    _container.style.top = _top + "px";
                }
            }
        }
    }
})();
Timeline.summary = QZFL.object.extend(Timeline.summary, PAGE_EVENT);
Timeline.line = (function () {
    var _line;
    var _container;
    var _addEventPlus, _addBarDate;
    var _defaultBgDiv, _bgDiv, _bgImageDiv;
    var _maskDiv, _curDateDiv;
    var _periodData = {};
    var _inAddEvent = false;
    var _futureShown = false;
    var _birthdayPanel = null;
    var _timerBG = null;
    var _currentStageBG = "";
    var _currentEventBG = "";
    var _alpha = 0;
    var _bgCache = {};
    var _bgTimer;
    var _canvas_supported;
    var _isCurrentQzoneBG;
    var _canvas_in_tween;
    var _tween_tm_id;
    var _body_css_text;
    var _lay_background_css_text;

    function _createPeriod(date, summary) {
        if (Timeline.UI.act) {
            if (Timeline.utils.judgeDate({
                    year: Timeline.UI.act.start.getFullYear(),
                    month: Timeline.UI.act.start.getMonth() + 1
                }, {year: date.year, month: date.month}) > 0) {
                return null;
            }
            if (Timeline.utils.judgeDate({
                    year: Timeline.UI.act.end.getFullYear(),
                    month: Timeline.UI.act.end.getMonth() + 1
                }, {year: date.year, month: date.month}) < 0) {
                return null;
            }
        }
        var _p;
        _p = _periodData[date.year + "_" + date.month] = new Timeline.Period(date);
        _p.init(_container, summary);
        return _p;
    }

    function _getPeriod(date) {
        if (!date) {
            return null;
        }
        var _period = _periodData[date.year + "_" + date.month];
        return !!_period ? _period : null;
    }

    function _deletePeriod(date) {
        var _p = _getPeriod(date);
        if (_p) {
            QZFL.dom.removeElement(_p.panel);
            delete _p;
            Timeline.core.deleteSummary(date);
        }
    }

    function _hideAddCursor() {
        if (_inAddEvent) {
            return;
        }
        $e(_addEventPlus).hide();
        $e(_addBarDate).hide();
        Timeline.line.fireEvent("onHideAddCursor");
    }

    function _initAddEventCursor() {
        if (Timeline.UI.act && Timeline.UI.act.disableCreation) {
            return;
        }
        _addBarDate = $("addbar_date_container");
        _addBarDate.innerHTML = tmpl(TEMPLATE.ADD_BAR_DATE_TPL, {});
        QZFL.dom.setStyle(_addBarDate, "left", (QZFL.dom.getPosition(_line).left + Timeline.CONST.ADD_EVENT_DATE_OFFSET_LEFT) + "px");
        QZFL.event.addEvent(_line, "mouseover", function () {
            if (_inAddEvent) {
                return;
            }
            $e(_addEventPlus).show();
            $e(_addBarDate).show();
            Timeline.line.fireEvent("onShowAddCursor");
        });
        QZFL.event.addEvent(_line, "mousemove", function () {
            if (_inAddEvent) {
                return;
            }
            var _lh = QZFL.dom.getPosition($("timeline_start_point")).top;
            if (QZFL.event.mouseY() > _lh) {
                _hideAddCursor();
                return;
            }
            var _t = QZFL.event.mouseY() - QZFL.dom.getPosition(_line).top - Timeline.CONST.ADD_EVENT_PLUS_OFFSET;
            QZFL.dom.setStyle(_addEventPlus, "top", _t + "px");
            QZFL.dom.setStyle(_addBarDate, "top", (QZFL.event.mouseY() + Timeline.CONST.ADD_EVENT_DATE_OFFSET_TOP) + "px");
            Timeline.line.fireEvent("onMoveAddCursor", QZFL.event.mouseY());
        });
        QZFL.event.addEvent(_line, "mouseout", _hideAddCursor);
        QZFL.event.addEvent(_addEventPlus, "click", function () {
            var _t = QZFL.event.mouseY();
            Timeline.line.fireEvent("onAddEvent", _t);
        });
    }

    function _setStageBG(aUrl) {
        var _cb = _currentEventBG || _currentStageBG;
        if (!aUrl) {
            aUrl = _currentStageBG;
        } else {
            _currentStageBG = aUrl;
        }
        _currentEventBG = "";
        if ((_cb != aUrl) || !(_isCurrentQzoneBG === false)) {
            _swapBGImage(_currentStageBG);
        }
    }

    function _setEventBG(aUrl) {
        var _cb = _currentEventBG || _currentStageBG;
        if ((_cb != aUrl) || !(_isCurrentQzoneBG === false)) {
            _currentEventBG = aUrl;
            _swapBGImage(_currentEventBG);
        }
    }

    function _getFixedImgeSize(_canvas, _img) {
        var _sw = _img.width || 1,
            _sh = _img.height || 1,
            _dw = _canvas.width,
            _dh = _canvas.height;
        var _scale, _rtnSize = [0, 0];
        _scale = Math.max(_dw / _sw, _dh / _sh);
        _rtnSize[0] = parseInt(_sw * _scale, 10);
        _rtnSize[1] = parseInt(_sh * _scale, 10);
        return _rtnSize;
    }

    function _swapBGImage(url) {
        if (Timeline.UI.act && Timeline.UI.act.disableSwapBg) {
            return;
        }
        if (ua.ie == 6) {
            url = url.replace('tml_default_bgs/', 'tml_default_bgs/ie6/').replace('tml_event_bgs/', 'tml_event_bgs/ie6/');
            url = url.replace('tml_default_bgs_vip/', 'tml_default_bgs_vip/ie6/').replace('tml_event_bgs_vip/', 'tml_event_bgs_vip/ie6/');
        }
        if (url.indexOf("http://") == 0) {
        } else {
            url = "http://" + siDomain + url;
        }
        clearTimeout(_bgTimer);
        _bgTimer = null;
        var b = document.getElementsByTagName("body")[0];
        var _img = _bgCache[url];
        var _alpha = 0;
        var context, _size;
        var _funcTween = function (img) {
            context.save();
            _alpha += 0.1;
            context.globalAlpha = _alpha;
            context.drawImage(img, 0, 0, _size[0], _size[1]);
            context.restore();
            if (_alpha < 1) {
                _bgTimer = setTimeout(function () {
                    _funcTween(img);
                }, 50);
            } else {
                _alpha = 0;
                _canvas_in_tween = false;
            }
        }
        if (_canvas_supported) {
            context = _bgDiv.getContext("2d");
            if (!_img) {
                _bgCache[url] = _img = new Image();
                _img.onload = function () {
                    _size = _getFixedImgeSize(context.canvas, _img);
                    _funcTween(_img);
                    _canvas_in_tween = true;
                }
                _img.src = url;
            } else {
                _size = _getFixedImgeSize(context.canvas, _img);
                _funcTween(_img);
                _canvas_in_tween = true;
            }
        } else {
            if (!_img) {
                _bgCache[url] = _img = new Image();
                _img.onload = function () {
                    b.style.background = 'url("' + url + '") fixed';
                }
                _img.src = url;
            } else {
                b.style.background = 'url("' + url + '") fixed';
            }
        }
    }

    function _getCurBgImage() {
        return _currentEventBG;
    }

    function _setEditStatus(blnInEdit) {
        _inAddEvent = !!blnInEdit;
        if (!blnInEdit) {
            $e(_addBarDate).hide();
        }
        $e(_addEventPlus).hide();
    }

    function _createFuturePeriod(container, fCount, date) {
        var initData = {periodName: "未来", periodId: "period_future", collapsed: true}
        var _futurePanel = QZFL.dom.createElementIn("div", container, true, {id: "period_future_panel"});
        QZFL.css.addClassName(_futurePanel, "tml_period period_future");
        _futurePanel.innerHTML = tmpl(TEMPLATE.PERIOD_TPL, initData);
        $(Timeline.CONST.PREFIX_EXPAND + initData.periodId).innerHTML = tmpl(TEMPLATE.PERIOD_HINT_TPL, {
            periodId: initData.periodId,
            periodShowHint: "展开未来的" + fCount + "条信息",
            hintType: "click"
        });
        $e("#" + Timeline.CONST.PREFIX_EXPAND_LINK + initData.periodId).onClick(function () {
            Timeline.line.fireEvent("onExpandMonth", date);
        });
    }

    function _createBirthdayPeriod(container, birthday) {
        if (Timeline.UI.act && Timeline.UI.act.start) {
            return;
        }
        var initData = {periodName: "出生", periodId: "period_birthday", collapsed: true}
        _birthdayPanel = QZFL.dom.createElementIn("div", container, false, {id: "period_birthday_panel"});
        QZFL.css.addClassName(_birthdayPanel, "tml_period period_born");
        _birthdayPanel.innerHTML = tmpl(TEMPLATE.PERIOD_TPL, initData);
        $(Timeline.CONST.PREFIX_EXPAND + initData.periodId).innerHTML = tmpl(TEMPLATE.PERIOD_HINT_TPL, {
            periodId: initData.periodId,
            periodShowHint: birthday,
            hintType: "hint"
        });
    }

    function _showFuture(blnShow) {
        var _p;
        if (_futureShown) {
            return;
        }
        Timeline.core.traverseSummary(function (date, summary) {
            if (Timeline.utils.isFuture(date)) {
                _p = Timeline.line.getPeriod(date);
                if (!!_p) {
                    $(Timeline.CONST.PREFIX_PANEL + _p.id).style.display = blnShow ? "" : "none";
                    if (!!blnShow) {
                        _futureShown = true;
                        QZFL.dom.removeElement($("period_future_panel"));
                    }
                }
            }
        });
    }

    function _reset() {
        var _fDate = null,
            _fCount = 0;
        _container.innerHTML = "";
        _periodData = {};
        Timeline.core.traverseSummary(function (date, summary) {
            _createPeriod(date, summary);
            if (Timeline.utils.isFuture(date)) {
                _fDate = date;
                _fCount += summary.eventCount;
            }
        });
        if (!!_fDate) {
            _showFuture(false);
            _createFuturePeriod(_container, _fCount, _fDate);
        }
        _createBirthdayPeriod(_container, tmpl(TEMPLATE.PERIOD_BIRTHDAY_TPL, Timeline.core.getBirthday()));
        Timeline.line.updatePeriodHeader();
    }

    function _saveQzoneBGdData() {
        _body_css_text = document.body.style.cssText || '';
        _lay_background_css_text = $('layBackground').style.cssText || '';
    }

    function _setStageBGData(url) {
        _currentStageBG = url;
    }

    function _shouldQzoneBGBeShown() {
        return !Timeline.appMode && QZFL.dom.getScrollTop() < Math.max(QZFL.dom.getClientHeight(), 600);
    }

    function _handleBGImage(date, base_line) {
        if (Timeline.appMode) {
            Timeline.line.checkBGImage(date, base_line);
        } else {
            if (_canvas_in_tween) {
                clearTimeout(_tween_tm_id);
                _tween_tm_id = setTimeout(function () {
                    _doHandleBGImage(date, base_line);
                }, 300);
            } else {
                _doHandleBGImage(date, base_line);
            }
        }
    }

    function _doHandleBGImage(date, base_line) {
        if (_shouldQzoneBGBeShown()) {
            if (!_isCurrentQzoneBG) {
                if (_bgDiv) {
                    _fadeCanvas('OUT');
                } else if (typeof _body_css_text != 'undefined') {
                    document.body.style.cssText = _body_css_text;
                    $('layBackground').style.cssText = _lay_background_css_text;
                }
            }
            _isCurrentQzoneBG = true;
        } else {
            if (_isCurrentQzoneBG || typeof _isCurrentQzoneBG == 'undefined') {
                if (_bgDiv) {
                    _fadeCanvas('IN');
                } else {
                    $('layBackground').style.background = 'none';
                }
            }
            if (!_canvas_in_tween) {
                Timeline.line.checkBGImage(date, base_line);
            }
            _isCurrentQzoneBG = false;
        }
    }

    function _fadeCanvas(type) {
        var img = _bgCache[_currentEventBG || _currentStageBG];
        if (!img) {
            return;
        }
        var type = type || 'OUT',
            context = _bgDiv.getContext('2d'),
            alpha = type == 'OUT' ? 1 : 0,
            size = _getFixedImgeSize(context.canvas, img);
        var func = function () {
            context.save();
            context.globalAlpha = type == 'OUT' ? Math.max((alpha -= 0.1), 0) : Math.min((alpha += 0.1), 1);
            context.clearRect(0, 0, size[0], size[1]);
            context.drawImage(img, 0, 0, size[0], size[1]);
            context.restore();
            if ((type == 'OUT' && alpha > 0) || (type == 'IN' && alpha < 1)) {
                setTimeout(func, 50);
            } else {
                _canvas_in_tween = false;
            }
        };
        func();
        _canvas_in_tween = true;
    }

    return {
        init: function () {
            _line = $("line");
            _line.setAttribute('hideFocus', true);
            _container = $("event_content");
            _addEventPlus = $("add_event_plus");
            if (_canvas_supported = !!document.createElement('canvas').getContext) {
                _bgDiv = QZFL.dom.createElementIn("canvas", $('layPositionRoot') || document.body, false, {
                    id: "bg_timeline",
                    width: QZFL.dom.getClientWidth(),
                    height: QZFL.dom.getClientHeight(),
                    style: "position:fixed;top:0px;left:0px;z-index:3;width:100%;height:100%;"
                });
            }
            if (ua.ie != 6) {
                _maskDiv = QZFL.dom.createElementIn("div", $('layPositionRoot') || document.body, false, {
                    id: "bg_mask",
                    className: "bg_mask"
                });
            }
            if (!Timeline.core.isOwnerMode() && !Timeline.core.getBirthday().hasBirth) {
                _curDateDiv = QZFL.dom.createElementIn("div", $('layPositionRoot') || document.body, false, {
                    id: "currentDateInfo",
                    style: "font-style:italic",
                    className: "tml_datum_line datum_line_init datum_line_hide transition_m"
                });
            }
            if (Timeline.core.isOwnerMode()) {
                _initAddEventCursor();
            }
            Timeline.line.addEvent("onExpandPeriod", function (date) {
                Timeline.line.fireEvent("onExpandMonth", date);
            });
            _reset();
            _saveQzoneBGdData();
        },
        createPeriod: _createPeriod,
        reset: _reset,
        getPeriod: _getPeriod,
        deletePeriod: _deletePeriod,
        updatePeriodHeader: function () {
            var _year = 0,
                _p;
            Timeline.core.traverseSummary(function (date, summary) {
                _p = Timeline.line.getPeriod(date);
                if (!_p) {
                    return
                }
                ;
                if (date.year != _year) {
                    _year = date.year;
                    _p.setHeader(_year);
                } else {
                    _p.setHeader(date.month + "月");
                }
            })
        },
        showExtraDiv: function (blnShow) {
            var _show = blnShow ? "" : "none";
            if (_bgDiv && !Timeline.appMode) {
                _bgDiv.style.display = _show;
            }
            if (_maskDiv && !Timeline.appMode) {
                _maskDiv.style.display = _show;
            }
            if (_curDateDiv) {
                _curDateDiv.style.display = _show;
            }
            if ($('timeline_fixed_container')) {
                $('timeline_fixed_container').style.display = _show;
            }
            if ($('timeline_absolute_container')) {
                $('timeline_absolute_container').style.display = _show;
            }
            Timeline.utils.hideMaskLayout();
            if (blnShow) {
                $e(document.body).addClass('mode_timeline');
                if (Timeline.smartscroll) {
                    Timeline.smartscroll.execute();
                }
                _handleBGImage();
                setTimeout(function () {
                    Timeline.summary.fixPos(true);
                }, 1000);
            } else {
                if (!Timeline.appMode && !_canvas_supported) {
                    document.body.style.cssText = _body_css_text;
                    $('layBackground').style.cssText = _lay_background_css_text;
                }
                QZFL.widget.bubble.hideAll();
                $e('#fixed_postbar').addClass('tml_fixed_poster_hidden');
                if (!Timeline.appMode) {
                    $e(document.body).removeClass('mode_timeline');
                }
            }
            PAGE_EVENT.fireEvent('qzMessagePanel.hide');
        },
        setStageBG: _setStageBG,
        setEventBG: _setEventBG,
        getCurBgImage: _getCurBgImage,
        showFuture: _showFuture,
        setEditStatus: _setEditStatus,
        checkBGImage: function (aDate, baseline) {
            var _arrPos = [],
                _arrEvent, _d;
            var _p = aDate ? Timeline.core.getSummaryByDate(aDate) : null;
            if (_p) {
                _arrEvent = _p.eventStorage;
                _d = Timeline.summary.getNearestMonth(aDate, -1);
                if (_d) {
                    _p = Timeline.core.getSummaryByDate(_d);
                    if (_p) {
                        _arrEvent = _arrEvent.concat(_p.eventStorage);
                    }
                }
                _d = Timeline.summary.getNearestMonth(aDate, 1);
                if (_d) {
                    _p = Timeline.core.getSummaryByDate(_d);
                    if (_p) {
                        _arrEvent = _arrEvent.concat(_p.eventStorage);
                    }
                }
                QZFL.object.each(_arrEvent, function (item, i) {
                    if ((item.isImpEvent || item.isOpTopic) && item.data.sp_event && item.data.sp_event.bgimg) {
                        _arrPos.push({
                            offset: Math.abs(baseline - parseInt((item.top + item.bottom) / 2)),
                            img: item.data.sp_event.bgimg
                        });
                    }
                });
                _arrPos.sort(function (a, b) {
                    return (a.offset < b.offset) ? -1 : 1;
                });
                if (_arrPos.length && _arrPos[0].offset < (Timeline.CONST.PRELOAD_BG_OFFSET)) {
                    _setEventBG(_arrPos[0].img);
                } else {
                    _setStageBG("");
                }
            } else if (_isCurrentQzoneBG || typeof _isCurrentQzoneBG == 'undefined') {
                _setStageBG("");
            }
        },
        setStageBGData: _setStageBGData,
        shouldQzoneBGBeShown: _shouldQzoneBGBeShown,
        handleBGImage: _handleBGImage
    }
})();
Timeline.line = QZFL.object.extend(Timeline.line, PAGE_EVENT);
Timeline.Period = function (date) {
    QZFL.object.extend(this, PAGE_EVENT);
    this.year = date.year;
    this.month = date.month;
    this.id = date.year + "_" + date.month;
    this.expanded = false;
    this.panel = null;
    this.eventShownCount = 0;
    this.loadAll = false;
    this.top = -1;
    this.bottom = -1;
    this.eventLRTag = 0;
    this.hasLoadTag = false;
    this.container = null;
}
Timeline.Period.prototype.init = function (container, summary) {
    var _ = this;
    var pName = _.month + "月";
    var initData = {periodName: pName, periodId: _.id, collapsed: true};
    this.panel = document.createElement("div");
    this.panel.setAttribute("id", Timeline.CONST.PREFIX_PANEL + _.id);
    this.panel.style.display = "none";
    this.container = container;
    this.container.appendChild(this.panel);
    QZFL.css.addClassName(this.panel, "tml_period last_months");
    this.panel.innerHTML = tmpl(TEMPLATE.PERIOD_TPL, initData);
    this.setHint("展开" + _.year + "年" + _.month + "月", "click");
}
Timeline.Period.prototype.expand = function () {
    $e("#" + Timeline.CONST.PREFIX_EXPAND + this.id).hide();
    $e("#" + Timeline.CONST.PREFIX_LIST + this.id).show();
    this.panel.style.display = "";
    this.expanded = true;
}
Timeline.Period.prototype.setHint = function (str, hintType) {
    hintType = !!hintType ? hintType : "click";
    $(Timeline.CONST.PREFIX_EXPAND + this.id).innerHTML = tmpl(TEMPLATE.PERIOD_HINT_TPL, {
        periodId: this.id,
        periodShowHint: str,
        hintType: hintType
    });
    var _this = this;
    if (hintType == "click") {
        QZFL.event.addEvent($(Timeline.CONST.PREFIX_EXPAND_LINK + _this.id), "click", function () {
            _this.fireEvent("onExpandPeriod", {year: _this.year, month: _this.month});
        });
    }
}
Timeline.Period.prototype.setHeader = function (str) {
    $(Timeline.CONST.PREFIX_HEADER + this.id).innerHTML = str;
}
Timeline.Period.prototype.addLoadTag = function (sTime, text) {
    var _tag = document.createElement("h4");
    var _text;
    var _this = this;
    this.panel.appendChild(_tag);
    QZFL.css.addClassName(_tag, "tml_placeholder");
    _tag.innerHTML = tmpl(TEMPLATE.BUTTON_MONTHMORE_TPL, {text: text});
    QZFL.event.addEvent(_tag, "click", function () {
        QZFL.dom.removeElement(_tag);
        _this.hasLoadTag = false;
        _this.fireEvent("onContinueLoad", sTime);
    });
    this.hasLoadTag = true;
}
Timeline.UI = (function () {
    var _lastTimePoint = 0,
        _currentTimePoint = Timeline.core.getRealTime().getTime(),
        _endTimePoint = (new Date("1902/1/1")).getTime(),
        _curPageHeight = 0,
        _preloadHeight = 0;
    var _switchSL = true;
    var _inFetching = false;
    var _eventTop = [];
    var _timerScroll, _timerCurDate;
    var _currentDate;
    var _lastShownEvent = null;
    var _bgLock = false;
    var _dateIndexInfo = {lastCalc: 0, lastIndex: -1};
    var _baseLine;
    var _baseDate;
    var _loadedNum = 0;
    var _expandingPeriod = [];
    var _debugInfo = {};
    Timeline.appMode = location.href.indexOf('/main?mode=gfp_timeline') !== -1;
    Timeline.customMode = /\/main\/(mall||custom)/.test(location.href) || QZONE.custom && QZONE.custom.isDressMode();
    Timeline.previewMode = location.href.indexOf('/preview') !== -1;
    Timeline.mainMode = !Timeline.appMode && !Timeline.customMode && !Timeline.previewMode;

    function _fetchDataErrorHandler(o) {
        var _p = Timeline.line.getPeriod(_currentDate);
        if (!!_p) {
            _p.setHint('<i class="ico_load_fail"></i>' + o.message, "click");
        } else {
            QZONE.FP.showMsgbox(o.message, Timeline.CONST.MSG_TYPE_ERROR, 2000);
        }
        _inFetching = false;
    }

    function _fetchData(options) {
        _inFetching = true;
        var _opt = {
            startTime: options.startTime,
            endTime: _endTimePoint,
            num: Timeline.CONST.EVENT_COUNT_PER_LOAD,
            nocache: options.nocache,
            nofix: options.nofix,
            callbackSucc: function (o) {
                var aPeriod = Timeline.line.getPeriod(Timeline.utils.getDateFromTick(options.startTime));
                _lastTimePoint = _currentTimePoint;
                _appendEvents(o);
            },
            callbackError: _fetchDataErrorHandler
        };
        Timeline.core.getEventData(_opt);
    }

    function _getSiblingEventsFromLinePoint(pTop) {
        var pos, dStart, dEnd;
        if (!_eventTop.length) {
            var _pos = QZFL.dom.getPosition($e('#period_birthday_panel span.placeholder_tit').elements[0]);
            return [{
                top: -1000,
                time: (new Date(Timeline.CONST.DEFAULT_LAST_DATE)).getTime()
            }, {top: _pos.top + parseInt(_pos.height / 2), time: Timeline.core.getBirthday().date.getTime()}];
        }
        pos = _binarySearch(_eventTop, pTop, function (item) {
            return item.top
        });
        dStart = _eventTop[pos];
        dEnd = _eventTop[pos + 1];
        return [dStart, dEnd];
    }

    function _getTimeFromLinePoint(pTop) {
        var dStart, dEnd;
        var arrEvents = _getSiblingEventsFromLinePoint(pTop);
        dStart = arrEvents[0];
        dEnd = arrEvents[1];
        if (dStart.top == dEnd.top) {
            return new Date(parseInt((dEnd.time + dStart.time) / 2));
        } else {
            return new Date(parseInt(dEnd.time + (pTop - dEnd.top) * (dStart.time - dEnd.time) / (dStart.top - dEnd.top)));
        }
    }

    function _getDensityFromtLinePoint(pTop) {
        var _timeArea, _accur;
        var arrEvents = _getSiblingEventsFromLinePoint(pTop);
        var DAY_TICK = 1000 * 60 * 60 * 24;
        var MONTH_TICK = DAY_TICK * 30;
        var YEAR_TICK = MONTH_TICK * 12;
        _timeArea = arrEvents[0].time - arrEvents[1].time;
        if (_timeArea < MONTH_TICK) {
            _accur = 3;
        } else if (_timeArea < YEAR_TICK) {
            _accur = 2;
        } else {
            _accur = 1;
        }
        return _accur;
    }

    function _binarySearch(data, key, func) {
        var index = -1;
        var low = 0;
        var high = data.length - 1;
        var middle = -1;
        var loopMax = 30;
        if (!func) {
            func = function (item) {
                return item;
            }
        }
        while (low < high && !!loopMax) {
            loopMax--;
            middle = (low + high) >> 1;
            if (middle == low || middle == high || key == func(data[middle])) {
                index = middle;
                break;
            } else if (key > func(data[middle])) {
                low = middle;
                index = low;
            } else if (key < func(data[middle])) {
                high = middle;
                index = high;
            }
        }
        _addDInfo({
            "loopMax": loopMax,
            "data.length": data.length,
            "index": index,
            "low": low,
            "high": high,
            "middle": middle,
            "key": key,
            "func(data[middle])": func(data[middle]),
            "func(data[index])": func(data[index])
        });
        return index;
    }

    function _preparePeriodIndex() {
        Timeline.core.traverseSummary(function (date, s) {
            var _p = Timeline.line.getPeriod(date);
            if (_p && _p.expanded) {
                var _pos = QZFL.dom.getPosition(_p.panel);
                _p.top = _pos.top;
                _p.bottom = _pos.top + _pos.height;
            }
        });
    }

    function _prepareDateIndex(eventId) {
        var _now = (new Date()).getTime();
        var sIndex;
        if (!!eventId) {
            sIndex = Timeline.core.getEventIndexById(eventId);
        } else {
            sIndex = 0;
        }
        sIndex = (sIndex == -1) ? 0 : sIndex;
        if (_dateIndexInfo.lastIndex == -1) {
            _dateIndexInfo.lastIndex = sIndex;
        } else {
            _dateIndexInfo.lastIndex = Math.min(sIndex, _dateIndexInfo.lastIndex);
        }
        if (_now - _dateIndexInfo.lastCalc < Timeline.CONST.PREPARE_INDEX_TIMER || _curPageHeight == QZFL.dom.getScrollHeight()) {
            return;
        }
        _curPageHeight = QZFL.dom.getScrollHeight();
        _preparePeriodIndex();
        _dateIndexInfo.lastCalc = _now;
        var _ed = Timeline.core.getCurEventData();
        var _pos;
        _eventTop = [{top: -1000, time: (new Date(Timeline.CONST.DEFAULT_LAST_DATE)).getTime()}];
        _ed = _ed.slice(_dateIndexInfo.lastIndex);
        _dateIndexInfo.lastIndex = -1;
        QZFL.object.each(_ed, function (item) {
            if (item.shown) {
                if (Timeline.UI.act) {
                    try {
                        _pos = QZFL.dom.getPosition(item.panel);
                    } catch (e) {
                        return;
                    }
                } else {
                    _pos = QZFL.dom.getPosition(item.panel);
                }
                item.top = _pos.top;
                item.bottom = _pos.top + _pos.height;
                _eventTop.push({top: item.top, time: item.time});
            }
        });
        Timeline.core.traverseSummary(function (date, s) {
            var _p = Timeline.line.getPeriod(date);
            if (_p && _p.expanded) {
                _eventTop.push({top: _p.bottom, time: (new Date(date.year + "/" + date.month + "/1")).getTime()});
            }
        });
        _eventTop.sort(function (a, b) {
            return a.top < b.top ? -1 : 1
        });
        if (!(Timeline.UI.act && Timeline.UI.act.start)) {
            _pos = QZFL.dom.getPosition($e('#period_birthday_panel span.placeholder_tit').elements[0]);
            _eventTop.push({
                top: _pos.top + parseInt(_pos.height / 2),
                time: Timeline.core.getBirthday().date.getTime()
            });
        }
        _eventTop.push({
            top: QZFL.dom.getScrollHeight(),
            time: (new Date(Timeline.CONST.DEFAULT_FIRST_DATE)).getTime()
        });
    }

    function _setBGLocked(blnLocked) {
        _bgLock = !!blnLocked;
    }

    var _bgSwitch = false;

    function _bindScrollEvent(evtObj, dataObj) {
        if (!$e(document.body).hasClass('mode_timeline')) {
            return;
        }
        Timeline.smartscroll.execute();
        if (new Date().getTime() - _dateIndexInfo.lastCalc < Timeline.CONST.PREPARE_INDEX_TIMER) {
            _timerScroll = setTimeout(function () {
                _bindScrollEvent(evtObj, dataObj);
            }, Timeline.CONST.PREPARE_INDEX_TIMER);
            return;
        }
        clearTimeout(_timerScroll);
        _timerScroll = null;
        var _date;
        var heightToBottom = dataObj.heightToBottom;
        var _sh = QZFL.dom.getScrollHeight(document);
        _prepareDateIndex();
        _baseLine = parseInt((QZFL.dom.getScrollHeight() - heightToBottom + QZONE.FP.getScrollTop()) / 2);
        _baseDate = _getTimeFromLinePoint(_baseLine);
        _addDInfo({"heightToBottom": heightToBottom});
        _date = Timeline.utils.getDateFromTick(_baseDate);
        if (!!_date) {
            Timeline.summary.setCurrentDate(_date);
            Timeline.summary.refreshView();
            if (!Timeline.core.isOwnerMode() && $("currentDateInfo")) {
                QZFL.css.replaceClassName($("currentDateInfo"), "datum_line_hide", "datum_line_show");
                var birthInfo = Timeline.core.getBirthday();
                var _age = (new Date(_baseDate)).getFullYear() - birthInfo.data.year;
                if (birthInfo.hasBirth & _age >= 0) {
                    $("currentDateInfo").innerHTML = "那年" + (QZONE.FP.getGender() ? "他" : "她") + _age + "岁...";
                } else {
                    $("currentDateInfo").innerHTML = _baseDate.getFullYear() + "-" + (_baseDate.getMonth() + 1) + "-" + _baseDate.getDate() + "";
                }
                if (!!_timerCurDate) {
                    clearTimeout(_timerCurDate);
                }
                _timerCurDate = setTimeout(function () {
                    QZFL.css.replaceClassName($("currentDateInfo"), "datum_line_show", "datum_line_hide");
                }, 2000);
            }
            if (!_bgLock) {
                Timeline.line.handleBGImage(_date, _baseLine);
            }
        }
        _fixLineHeightForIE6();
        Timeline.summary.fixPos();
        if (ua.ie != 6) {
            var _top = QZONE.FP.getScrollTop() + Timeline.CONST.TOOLBAR_OFFSET + 23;
            if (Timeline.core.isOwnerMode()) {
                Timeline.Post.handleFixedBar(+_getTimeFromLinePoint(_top), _getDensityFromtLinePoint(_top), _top);
            } else {
                PAGE_EVENT.fireEvent('onScrolling', +_getTimeFromLinePoint(_top), _top);
            }
        }
        if (Timeline.core.dataIncomplete()) {
            return;
        }
        if (_switchSL && !_inFetching && !Timeline.UI.act) {
            if (!!_lastShownEvent) {
                _preloadHeight = QZFL.dom.getScrollHeight(document) - QZFL.dom.getPosition(_lastShownEvent.panel).top + Timeline.CONST.PRELOAD_HEIGHT;
            }
            if (heightToBottom < _preloadHeight && (_lastTimePoint != _currentTimePoint)) {
                _fetchData({startTime: _currentTimePoint, nocache: false});
            }
        }
    }

    function _gotoAppointedEvent(eId, callback) {
        var date = Timeline.utils.getDateFromTick(_currentTimePoint ? _currentTimePoint : 0);
        var aEvent = Timeline.core.getEventById(eId);
        if (!!aEvent && aEvent.shown) {
            _createContinueLoadTag(date);
            _scrollTo(aEvent.panel, 1000, callback);
        } else {
            Timeline.core.getEventDataById(eId, function (o) {
                if (o.event[0]) {
                    _currentDate = Timeline.utils.getDateFromTick(o.event[0].time * 1000);
                    if (Timeline.utils.judgeDate(Timeline.core.getRealDate(), _currentDate) != 0) {
                        _createContinueLoadTag(Timeline.core.getRealDate());
                    }
                    Timeline.UI.addEventToView(o.event[0], {callback: callback});
                } else {
                    QZONE.FP.showMsgbox('对应事件已经隐藏或被删除', Timeline.CONST.MSG_TYPE_HINT, 2000);
                    location.hash = '';
                    Timeline.UI.scrollToDate(Timeline.core.getRealDate(), {nocache: true, noscroll: true});
                }
            }, function (o) {
                QZONE.FP.showMsgbox(o.message, Timeline.CONST.MSG_TYPE_HINT, 2000);
                location.hash = '';
                Timeline.UI.scrollToDate(Timeline.core.getRealDate(), {nocache: true, noscroll: true});
            });
        }
    }

    function _scrollTo(elem, time, callback) {
        var startHeight, endHeight;
        startHeight = QZFL.dom.getScrollTop(_elem);
        endHeight = Math.min(QZFL.dom.getPosition(elem).top - Timeline.CONST.TOOLBAR_OFFSET - 50, QZFL.dom.getScrollHeight() - QZFL.dom.getClientHeight());
        if (startHeight == endHeight) {
            if (typeof callback == "function") {
                callback()
            }
            ;
            return;
        }
        time = !!time ? time : 1000;
        var _doc = document;
        var _elem = _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"];
        endHeight = Math.min(endHeight, _elem.scrollHeight);
        var tween = new QZFL.tweenMaker(startHeight, endHeight, time, 1000 / 60, {
            functor: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            }
        });
        tween.onChange = function (percent) {
            var _top = startHeight + ((endHeight - startHeight) * (percent * 0.01));
            _elem.scrollTop = _top;
        };
        tween.onEnd = function () {
            if (typeof callback == "function") {
                callback()
            }
            ;
        };
        tween.start();
    }

    function _appendEvents(o, callback) {
        var _monthTag = {};
        var _offsetTimer = 0;
        QZFL.object.each(o, function (item, index) {
            var _date = Timeline.utils.getDateFromTick(item.time);
            var _p = Timeline.line.getPeriod(_date);
            var _class;
            _monthTag[_date.year + "_" + _date.month] = true;
            if (!_p) {
                return;
            }
            if (!_p.expanded) {
                _p.expand();
            }
            if (!item.shown) {
                if (item.isImpEvent || item.from7year || Timeline.UI.act) {
                    _p.eventLRTag = 0;
                    _class = "one_col";
                } else {
                    _class = _p.eventLRTag++ % 2 ? "r_col" : "l_col";
                }
                _p.eventShownCount++;
                setTimeout((function (aClass) {
                    return function () {
                        item.show({panelClass: aClass});
                        _lastShownEvent = item;
                        _currentTimePoint = item.time;
                        if (index == o.length - 1 && typeof callback == "function") {
                            callback();
                        }
                        if (++_loadedNum == 4) {
                            TCISD.markTime(2, 'TimelineFirstScreen').report();
                        }
                    }
                })(_class), _offsetTimer++ * Timeline.CONST.APPEND_EVENT_TIMER);
            }
            ;
        });
        QZFL.object.each(_expandingPeriod, function (item) {
            !item.expanded && item.expand();
        });
        _expandingPeriod = [];
        _fixLineHeightForIE6();
        QZFL.object.each(_monthTag, function (bln, item) {
            var _d = item.split("_");
            var _date = {year: _d[0], month: _d[1]};
            var _p = Timeline.line.getPeriod(_date);
            var _s = Timeline.core.getSummaryByDate(_date);
            if (!!_s && !!_p && _p.eventShownCount >= _s.eventCount) {
                _s.eventCount = _p.eventShownCount;
                _p.loadAll = true;
            }
        });
        _inFetching = false;
    }

    function _createPeriod(date) {
        if (Timeline.line.getPeriod(date)) {
            return
        }
        var _nextDate = Timeline.summary.getNearestMonth(date, -1);
        var _p = Timeline.line.createPeriod(date, {});
        if (!_p) {
            return;
        }
        var _nextPeriod;
        var _pData = {year: date.year, month: date.month, count: 0}
        if (_nextDate) {
            _nextPeriod = Timeline.line.getPeriod(_nextDate);
            _p.container.insertBefore(_p.panel, _nextPeriod.panel);
        } else {
            _p.container.insertBefore(_p.panel, $("period_birthday_panel"));
        }
        Timeline.line.updatePeriodHeader();
        Timeline.core.updateSummary(_pData);
        Timeline.core.getEventSummary(function (o) {
            Timeline.summary.setData(o);
        });
    }

    function _createContinueLoadTag(aDate, aStopDate) {
        var aPeriod;
        var tagText, endMonth;
        if (!aStopDate) {
            aStopDate = Timeline.core.getLastMonth();
        }
        Timeline.core.traverseSummary(function (dd, summary) {
            var _p = Timeline.line.getPeriod(dd);
            if (Timeline.utils.judgeDate(dd, aDate) > 0) {
                return;
            } else if (_p && _p.eventShownCount != 0) {
                endMonth = dd;
                if (Timeline.utils.judgeDate(dd, aDate) < 0) {
                    return true;
                }
            } else if (Timeline.utils.judgeDate(dd, aStopDate) == 0) {
                endMonth = dd;
                return true;
            }
        });
        if (endMonth && Timeline.utils.judgeDate(endMonth, aDate) < 0) {
            tagText = "加载" + Timeline.utils.getTitleFromDate(aDate) + "以来的所有事件...";
        } else {
            tagText = "加载" + Timeline.utils.getTitleFromDate(aDate) + "早些时候的事件...";
        }
        aPeriod = Timeline.line.getPeriod(aDate);
        if (!aPeriod) {
            aPeriod = Timeline.line.getPeriod(Timeline.summary.getNearestMonth(aDate, -1));
        }
        if (!!aPeriod && !!Timeline.utils.judgeDate(aDate, endMonth) && (!aPeriod.loadAll || Timeline.utils.getDeltaDate(aDate, endMonth) != 1) && !aPeriod.hasLoadTag) {
            if (!aPeriod.expaned) {
                aPeriod.expand();
            }
            aPeriod.addLoadTag(_currentTimePoint, tagText);
        }
    }

    function _makeEventHighlight(aEvent) {
        QZFL.css.addClassName(aEvent.panel, "feed_box_focus");
        setTimeout(function () {
            QZFL.css.removeClassName(aEvent.panel, "feed_box_focus");
        }, Timeline.CONST.EVENT_HIGHLIST_TIMER);
    }

    function _fixLineHeightForIE6() {
        if (ua.ie == 6) {
            setTimeout(function () {
                $("line").style.height = QZFL.dom.getPosition($("line").parentNode).height + "px";
            }, 100);
        }
    }

    function _addDInfo(options) {
        QZFL.object.each(options, function (value, key) {
            _debugInfo[key] = value;
        });
    }

    function _checkLifeCompare() {
        return ua.ie != 6 && QZONE.FP.getQzoneConfig('loginUin') && !Timeline.core.isOwnerMode() && Timeline.core.getBirthday().hasBirth && !Timeline.core.dataIncomplete();
    }

    return {
        act: Timeline.appMode ? Timeline.CONST.ACT_NAME_INFO_HASH[Timeline.utils.getUrlParam('act')] : null,
        init: function () {
            var act = this.act;
            if (act && act.css) {
                QZFL.css.insertCSSLink(act.css);
            }
            if (act && act.script) {
                QZFL.imports(act.script, function () {
                    if (act.scriptObj.init) {
                        act.scriptObj.init();
                    }
                });
            }
            if (false) {
                $("loadingHint").innerHTML = "对不起，您暂时无法使用或该空间未开放此功能……";
            } else {
                $e(document.body).addClass('mode_timeline');
                if (QZONE.FP.checkIsDeepColor()) {
                    $e(document.body).addClass('timeline_dark');
                } else {
                    $e(document.body).addClass('timeline_tint');
                }
                Timeline.core.init();
                _endTimePoint = Timeline.core.getBirthday().date.getTime();
                QZFL.css.addClassName($("loadingHint"), "tips_hide");
                Timeline.core.getEventSummary(function (data) {
                    if (!Timeline.core.isOwnerMode()) {
                        QZFL.css.addClassName($("timelineContent"), "tml_guest");
                    }
                    var _h = QZFL.dom.getSize($("loadingHint"))[1];
                    QZFL.dom.setStyle($("loadingHint"), {"display": "none"});
                    QZFL.dom.setStyle($("timelineContent"), {"display": ""});
                    var div = document.createElement('div');
                    div.id = 'timeline_fixed_container';
                    div.className = 'lay_tml_fixed';
                    $('layBackground') ? document.body.insertBefore(div, $('layBackground')) : document.body.appendChild(div);
                    Timeline.summary.init(QZFL.dom.createElementIn('div', div, false, {
                        className: 'tml_scrubber',
                        style: 'left:' + (QZFL.dom.getRect($('timelineContent')).left) + 'px;'
                    }), data);
                    if (Timeline.customMode) {
                        setTimeout(function () {
                            Timeline.summary.fixPos(true)
                        }, 1000);
                    }
                    Timeline.summary.triggerEvent('onSelectDate', QZFL.object.bind(Timeline.UI, Timeline.UI.scrollToDate));
                    QZFL.event.addEvent(window, "resize", function () {
                        if (window.Timeline) {
                            Timeline.summary.fixPos(true);
                        }
                    });
                    Timeline.summary.triggerEvent('onGotoPoint', function (elemId) {
                        var date = Timeline.utils.getDateFromTick(_currentTimePoint ? _currentTimePoint : 0);
                        _createContinueLoadTag(date);
                        Timeline.UI.switchScrollLoad(false);
                        _scrollTo($(elemId), 1000, function () {
                        });
                    });
                    Timeline.UI.addEvent('onContinueLoad', function (sTime) {
                        Timeline.UI.switchScrollLoad(true);
                        _fetchData({startTime: sTime});
                    });
                    Timeline.line.init();
                    _fixLineHeightForIE6();
                    Timeline.line.triggerEvent("onAddEvent", function (t) {
                        var _d = _getTimeFromLinePoint(t);
                        if (Timeline.UI.act && _d > Timeline.UI.act.end) {
                            _d = Timeline.UI.act.end;
                        } else if (Timeline.UI.act && _d < Timeline.UI.act.start) {
                            _d = Timeline.UI.act.start;
                        }
                        Timeline.post2 && Timeline.post2.showPostBox(t, _d.getTime(), _getDensityFromtLinePoint(t));
                        Timeline.utils.hotClick('Attach.anywhere');
                    });
                    Timeline.line.triggerEvent("onShowAddCursor", function (eventId) {
                        if (!act) {
                            _prepareDateIndex(eventId);
                        }
                    });
                    Timeline.UI.triggerEvent("onSetStageBG", function (aUrl) {
                        Timeline.line.setStageBG(aUrl);
                    });
                    Timeline.line.triggerEvent("onMoveAddCursor", function (topHeight) {
                        var _d = _getTimeFromLinePoint(topHeight);
                        var _accur = _getDensityFromtLinePoint(topHeight);
                        var _text;
                        if (Timeline.utils.isFuture(Timeline.utils.getDateFromTick(_d.getTime()))) {
                            if (Timeline.UI.act && QZONE.FP.getSvrTime() > Timeline.UI.act.end) {
                                _text = Timeline.UI.act.end.getFullYear() + "-" + (Timeline.UI.act.end.getMonth() + 1);
                            } else {
                                _text = "未来";
                            }
                        } else {
                            if (Timeline.UI.act && _d > Timeline.UI.act.end) {
                                _text = Timeline.UI.act.end.getFullYear() + "-" + (Timeline.UI.act.end.getMonth() + 1);
                            } else if (Timeline.UI.act && _d < Timeline.UI.act.start) {
                                _text = Timeline.UI.act.start.getFullYear() + "-" + (Timeline.UI.act.start.getMonth() + 1);
                            } else {
                                switch (_accur) {
                                    case 3:
                                        _text = (_d.getMonth() + 1) + "-" + _d.getDate();
                                        break;
                                    case 2:
                                        _text = _d.getFullYear() + "-" + (_d.getMonth() + 1);
                                        break;
                                    case 1:
                                        _text = _d.getFullYear();
                                }
                            }
                        }
                        $("addbar_date").innerHTML = _text;
                    });
                    Timeline.line.triggerEvent("onExpandMonth", function (date) {
                        Timeline.UI.scrollToDate(date, {nocache: false, noscroll: false});
                    });
                    Timeline.profile.init();
                    if (QZONE.FP.getQzoneConfig('isOwner')) {
                        if (!act) {
                            $e('#post_area').show();
                        }
                        Timeline.post = new Timeline.Post($('post_area'), {type: 1});
                        setTimeout(function () {
                            Timeline.post2 = new Timeline.Post($('post_area_float'), {type: 2});
                        }, 1000);
                        Timeline.Post.addEvent("onAdded", function (o, opt) {
                            Timeline.UI.addEventToView(o, opt);
                        });
                        Timeline.Post.addEvent("onBeginAdd", function () {
                            Timeline.line.setEditStatus(true);
                        });
                        Timeline.Post.addEvent("onEndAdd", function () {
                            Timeline.line.setEditStatus(false);
                        });
                        Timeline.Post.addEvent("onSetBGLocked", function (blnLocked) {
                            _setBGLocked(!!blnLocked);
                        });
                        if (act) {
                            TCISD.pv('timeline.qzone.qq.com', 'Timeline_master/act/' + act.name);
                        } else {
                            TCISD.pv('timeline.qzone.qq.com', 'Timeline_master');
                        }
                    } else {
                        if (act) {
                            TCISD.pv('timeline.qzone.qq.com', 'Timeline_guest/act/' + act.name);
                        } else {
                            TCISD.pv('timeline.qzone.qq.com', 'Timeline_guest');
                        }
                    }
                    QZONE.qzEvent.addEventListener("QZ_SCROLL", _bindScrollEvent);
                    QZONE.qzEvent.addEventListener("QZ_JUMP_ENTER_APP", function (evtObj, dataObj) {
                        Timeline.line.showExtraDiv(false);
                        QZONE.qzEvent.removeEventListener("QZ_SCROLL", _bindScrollEvent);
                    });
                    QZONE.qzEvent.addEventListener("QZ_JUMP_ENTER_BASE_APP", function (evtObj, dataObj) {
                        Timeline.line.showExtraDiv(false);
                        QZONE.qzEvent.removeEventListener("QZ_SCROLL", _bindScrollEvent);
                    });
                    QZONE.qzEvent.addEventListener("QZ_JUMP_ENTER_DEFAULT", function (evtObj, dataObj) {
                        Timeline.line.showExtraDiv(true);
                        QZONE.qzEvent.addEventListener("QZ_SCROLL", _bindScrollEvent);
                    });
                    Timeline.UI.triggerEvent("onRemove", Timeline.UI.removeEventFromView);
                    Timeline.UI.triggerEvent("onMoveto", Timeline.UI.moveEventTo);
                    Timeline.UI.triggerEvent("onBGChange", Timeline.line.setEventBG);
                    Timeline.UI.triggerEvent("onHide", Timeline.UI.hideEvent);
                    Timeline.UI.triggerEvent("onRefresh", Timeline.UI.refreshEvent);
                    Timeline.UI.triggerEvent("onEventLoaded", function (eId) {
                        var item = Timeline.core.getEventById(eId);
                        if (!!item) {
                            Timeline.smartscroll.addItem(item);
                        }
                    });
                    Timeline.UI.triggerEvent("onHeightChange", function () {
                        if (!act) {
                            _prepareDateIndex();
                        }
                    });
                    PAGE_EVENT.triggerEvent('qzMessagePanel.show', function () {
                        QZONE.qzMessagePanel && QZONE.qzMessagePanel.clickHotBar(null, false, false, true);
                    });
                    PAGE_EVENT.triggerEvent('qzMessagePanel.hide', function () {
                        QZONE.qzMessagePanel && QZONE.qzMessagePanel.working && QZONE.qzMessagePanel.slideDown(QZONE.qzMessagePanel.working, QZONE.emptyFn);
                    });
                    if (QZONE.FP.getParameter(location.href, "debug") == "true") {
                        var _debugger = QZFL.dom.createElementIn("div", document.body, true, {style: "z-index:9999;border:1px solid gray;color:black;background:#eee;position:fixed;top:100px;right:100px;padding:3px;opacity:0.8;"});
                        setInterval(function () {
                            var arr = [];
                            var _date = Timeline.utils.getDateFromTick(_baseDate);
                            QZFL.object.each(_debugInfo, function (value, key) {
                                arr.push(key + " : " + value);
                            });
                            arr.push("_baseLine : " + _baseLine);
                            arr.push("_baseDate : " + new Date(_baseDate));
                            arr.push("_date : " + obj2str(_date));
                            arr.push("_lastTimePoint : " + new Date(_lastTimePoint));
                            arr.push("_currentTimePoint : " + new Date(_currentTimePoint));
                            arr.push("_endTimePoint : " + new Date(_endTimePoint));
                            arr.push("_curPageHeight : " + _curPageHeight);
                            arr.push("_preloadHeight : " + _preloadHeight);
                            arr.push("_switchSL : " + _switchSL);
                            arr.push("_inFetching : " + _inFetching);
                            arr.push("_currentDate : " + obj2str(_currentDate));
                            arr.push("_lastShownEvent : " + _lastShownEvent);
                            arr.push("_eventTop.length : " + _eventTop.length);
                            arr.push("_dateIndexInfo : " + new Date(_dateIndexInfo.lastCalc) + "/" + _dateIndexInfo.lastIndex);
                            _debugger.innerHTML = arr.join("<br />");
                        }, 50);
                    }
                    var date, time, eId;
                    time = parseInt(QZONE.FP.getParameter(location.href, "time"), 10);
                    eId = QZONE.FP.getParameter(location.href, "eid");
                    if (!!eId) {
                        _gotoAppointedEvent(eId, function () {
                            if (Timeline.core.isOwnerMode() && QZONE.FP.getParameter(location.href, 'action') == 'OPEN_TIPS') {
                                Timeline.UI.fireEvent('showOpenTips', eId);
                            }
                        });
                    } else if (!!time) {
                        date = Timeline.utils.getDateFromTick(time * 1000);
                        Timeline.UI.scrollToDate(date, {nocache: !Timeline.core.dataIncomplete()});
                    } else {
                        Timeline.UI.scrollToDate(Timeline.core.getRealDate(), {
                            nocache: !Timeline.core.dataIncomplete(),
                            noscroll: true
                        });
                    }
                    var _topic;
                    if (Timeline.core.isOwnerMode() && (_topic = QZONE.FP.getParameter(location.href, "topic"))) {
                        Timeline.post.enable();
                        _topic = _topic.split('|');
                        Timeline.UI.fireEvent('Set_Post_Topic', _topic[0], _topic[1]);
                    }
                    PAGE_EVENT.fireEvent('storeSummaryData', data);
                    if (Timeline.EventCalendar && Timeline.EventCalendar.check() && !act) {
                        Timeline.UI.fireEvent('onAdded', {id: Timeline.Event.calendarId}, {
                            noscroll: true,
                            highlight: false,
                            loadNearby: false
                        });
                    }
                    if (Timeline.core.isOwnerMode() && Timeline.appMode && QZONE.dressDataCenter.getMode() != 99 && !act) {
                        if (QZONE.FP.getParameter(location.href, 'action') == 'SET_HOMEPAGE') {
                            setTimeout(function () {
                                Timeline.EventSetHomepage.setHomepage();
                                location.hash = '';
                            }, 5000);
                        } else if (Timeline.EventSetHomepage && Timeline.EventSetHomepage.check()) {
                            Timeline.UI.fireEvent('onAdded', {id: Timeline.Event.setHomepageId}, {
                                noscroll: true,
                                highlight: false,
                                loadNearby: false
                            });
                        }
                    }
                    if (_checkLifeCompare() && !act) {
                        setTimeout(function () {
                            Timeline.utils.require('life_compare.js', function () {
                                Timeline.lifeCompare.init();
                            });
                        }, 2000);
                    }
                    var age;
                    if (age = +QZONE.FP.getParameter(location.href, 'age')) {
                        PAGE_EVENT.fireEvent('guideAgePost', age);
                    }
                }, function (aState) {
                    Timeline.utils.require('importguide.js', function () {
                        Timeline.UI.fireEvent("onInitGuide", aState);
                    });
                }, function (o) {
                    QZFL.css.removeClassName($("loadingHint"), "tips_hide");
                    $("loadingHint").innerHTML = o.message;
                });
            }
        },
        scrollToDate: function (date, options) {
            var aPeriod;
            var d = !!_currentTimePoint ? Timeline.utils.getDateFromTick(_currentTimePoint) : date;
            if (Timeline.utils.judgeDate(date, d) < 0) {
                _createContinueLoadTag(d, date);
            } else if (Timeline.utils.judgeDate(date, d) > 0) {
                _createContinueLoadTag(d);
            }
            _currentDate = date;
            Timeline.summary.setCurrentDate(date);
            Timeline.summary.fixPos(true);
            Timeline.summary.refreshView();
            aPeriod = Timeline.line.getPeriod(date);
            if (!aPeriod) {
                aPeriod = Timeline.line.getPeriod(Timeline.summary.getNearestMonth(date, -1));
            }
            if (!!aPeriod && !aPeriod.expaned) {
                aPeriod.panel.style.display = "";
                _expandingPeriod.push(aPeriod);
            }
            Timeline.UI.switchScrollLoad(false);
            var _callback = function () {
                var t;
                Timeline.UI.switchScrollLoad(true);
                if (!options.noData) {
                    t = Timeline.utils.getLastMomentOfMonth(date);
                    _fetchData({startTime: t, nocache: options.nocache, nofix: options.nofix});
                }
                if (typeof options.callback == "function") {
                    options.callback();
                }
            }
            if (Timeline.utils.isFuture(date)) {
                Timeline.line.showFuture(true);
            }
            if (!!aPeriod) {
                aPeriod.setHint('<i class="ico_loading"></i>正在加载，请稍候...', "loading");
            }
            _fixLineHeightForIE6();
            if (!!aPeriod && !options.noscroll) {
                _scrollTo(aPeriod.panel, 1000, _callback);
            } else {
                _callback();
            }
            ;
        },
        appendEvents: _appendEvents,
        addEventToView: function (o, opt) {
            var _event, _next, _prev, _idx, _date, _withNext, _withPrev;
            var _tempTimeStamp;
            opt = QZFL.object.extend({noscroll: false, highlight: true, callback: QZFL.emptyFn, loadNearby: true}, opt);
            o.ignoreCache = true;
            _event = Timeline.core.addEventData(o, true);
            if (_event) {
                _date = Timeline.utils.getDateFromTick(_event.time);
                _idx = Timeline.core.getEventIndexById(_event.id);
                _next = Timeline.core.getCurEventData()[_idx + 1];
                _prev = Timeline.core.getCurEventData()[_idx - 1];
                _withNext = (!!_next && _next.shown && _event.year == _next.year && _event.month == _next.month);
                _withPrev = (!!_prev && _prev.shown && _event.year == _prev.year && _event.month == _prev.month);
                if (_withNext || _withPrev) {
                    _appendEvents([_event], function () {
                        if (_withNext) {
                            _event.container.insertBefore(_event.panel, _next.panel);
                        }
                        if (!opt.noscroll) {
                            _scrollTo(_event.panel, 1000, function () {
                                if (opt.highlight) {
                                    _makeEventHighlight(_event);
                                }
                                opt.callback();
                            });
                        } else if (opt.highlight) {
                            _makeEventHighlight(_event);
                        }
                    });
                } else {
                    _createPeriod(_date);
                    if (opt.loadNearby) {
                        Timeline.UI.scrollToDate(_date, {
                            nocache: false,
                            noscroll: !!opt.noscroll,
                            nofix: true,
                            noData: !!opt.noData,
                            callback: opt.callback
                        });
                    }
                    _appendEvents([_event], function () {
                        if (opt.highlight) {
                            _makeEventHighlight(_event);
                        }
                    });
                }
            }
        },
        moveEventTo: function (aEvent, orgTime) {
            var _date, _idx, _next, _orgDate;
            if (aEvent.time == orgTime) {
                return
            }
            _date = Timeline.utils.getDateFromTick(aEvent.time);
            _orgDate = Timeline.utils.getDateFromTick(orgTime);
            _createPeriod(_date);
            Timeline.core.sortEventData();
            Timeline.core.updateEvent(aEvent, orgTime);
            Timeline.core.getEventSummary(function (o) {
                Timeline.summary.setData(o);
            });
            _idx = Timeline.core.getEventIndexById(aEvent.id);
            _next = Timeline.core.getCurEventData()[_idx + 1];
            if (Timeline.utils.judgeDate(_orgDate, _date) != 0) {
                if (Timeline.utils.isFuture(_date)) {
                    Timeline.line.showFuture();
                }
                if (!(aEvent.container = $(Timeline.CONST.PREFIX_LIST + aEvent.year + "_" + aEvent.month))) {
                    return false;
                }
                if (!Timeline.core.getSummaryByDate(_orgDate)) {
                    Timeline.line.deletePeriod(_orgDate);
                }
            }
            if (!!_next && _next.shown && aEvent.year == _next.year && aEvent.month == _next.month) {
                _next.container.insertBefore(aEvent.panel, _next.panel);
                _scrollTo(aEvent.panel, 1000);
            } else {
                aEvent.container.appendChild(aEvent.panel);
                Timeline.UI.scrollToDate(_date, {
                    nocache: false, noscroll: false, nofix: true, callback: function () {
                        aEvent.restore();
                    }
                });
            }
        },
        removeEventFromView: function (aEvent) {
            var _doRemove = function () {
                var _date = Timeline.utils.getDateFromTick(aEvent.time);
                aEvent.panel.innerHTML = "";
                QZFL.dom.removeElement(aEvent.panel);
                Timeline.core.deleteEvent(aEvent.id);
                Timeline.smartscroll.removeItem(aEvent.id);
                Timeline.core.getEventSummary(function (o) {
                    Timeline.summary.setData(o);
                    Timeline.summary.refreshView();
                });
                if (!Timeline.core.getSummaryByDate(_date)) {
                    Timeline.line.deletePeriod(_date);
                }
            }
            if (!ua.ie) {
                var _h = QZFL.dom.getSize(aEvent.panel)[1];
                QZFL.dom.setStyle(aEvent.panel, {"overflow": "hidden", "height": _h + "px"});
                var tween = new QZFL.tweenMaker(_h, 0, 1000, 1000 / 60, {
                    functor: function (t, b, c, d) {
                        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                    }
                });
                tween.onChange = function (percent) {
                    QZFL.dom.setStyle(aEvent.panel, {
                        "opacity": (1 - percent * 0.01),
                        "height": _h * (1 - percent * 0.01) + "px"
                    });
                    QZFL.dom.setStyle($("event_cont_" + aEvent.id), {"box-shadow": "0 0 " + (percent * 0.01) * 100 + "px #fff"});
                };
                tween.onEnd = function () {
                    _doRemove();
                };
                tween.start();
            } else {
                _doRemove();
            }
        },
        hideEvent: function (aEvent) {
            aEvent.hide();
        },
        refreshEvent: function (aEvent) {
            aEvent.refresh();
        },
        switchScrollLoad: function (blnSL) {
            _switchSL = !!blnSL;
        },
        createPeriod: _createPeriod,
        gotoAppointedEvent: _gotoAppointedEvent,
        preparePeriodIndex: _preparePeriodIndex,
        prepareDataIndex: _prepareDateIndex
    }
})();
Timeline.UI = QZFL.object.extend(Timeline.UI, PAGE_EVENT);
if (window.g_version == 6) {
    QZONE.Global.modeBootstrap(QZFL.event.bind(Timeline.UI, Timeline.UI.init));
} else {
    setTimeout(QZFL.event.bind(Timeline.UI, Timeline.UI.init), 150);
}
Timeline.smartscroll = (function () {
    var _ssList = {};
    var _lastTop = 0;
    var _sTimer;
    return {
        addItem: function (evt) {
            _ssList[evt.id] = {event: evt, show: true};
        },
        removeItem: function (eid) {
            _ssList[eid] = null;
            delete _ssList[eid];
        },
        execute: function () {
            var _st = Math.max(QZFL.dom.getScrollTop() - Timeline.CONST.EVENT_PRESHOW_HEIGHT_TOP, 0);
            var _sb = _st + QZFL.dom.getClientHeight() + Timeline.CONST.EVENT_PRESHOW_HEIGHT_BOTTOM;
            var _offset = _lastTop - _st;
            if (Math.abs(_offset) >= Timeline.CONST.SMART_SCROLL_MAX_PIXEL) {
                _lastTop = _st;
                clearTimeout(_sTimer);
                _sTimer = null;
                Timeline.smartscroll.fireEvent("onScrollSoFast", _offset);
                _sTimer = setTimeout(function () {
                    Timeline.smartscroll.execute();
                }, Timeline.CONST.SMART_SCROLL_DELAY_CALC);
                return;
            }
            _lastTop = _st;
            QZFL.object.each(_ssList, function (item, idx) {
                if (!item.event.top && !item.event.bottom) {
                    return;
                }
                if (item.event.top <= _sb && item.event.bottom >= _st) {
                    if (!item.show) {
                        item.show = true;
                        item.event.restore();
                    }
                } else {
                    if (item.show) {
                        item.show = false;
                        item.event.clear();
                    }
                }
            })
        }
    }
})();
Timeline.smartscroll = QZFL.object.extend(Timeline.smartscroll, PAGE_EVENT);
Timeline.profile = (function () {
    "use strict";
    var get_login_uin = function () {
        return QZONE.FP.getQzoneConfig('loginUin');
    };
    var get_owner_uin = function () {
        return QZONE.FP.getQzoneConfig('ownerUin');
    };
    var marriage_type = {1: '未婚', 2: '已婚', 3: '保密', 4: '恋爱中', 5: '已订婚', 6: '分居', 7: '离异', 0: '未填写'};
    var getAstroName = function (m) {
        var astroName = {
            1: '白羊座',
            2: '金牛座',
            3: '双子座',
            4: '巨蟹座',
            5: '狮子座',
            6: '处女座',
            7: '天秤座',
            8: '天蝎座',
            9: '射手座',
            10: '魔羯座',
            11: '水瓶座',
            12: '双鱼座'
        };
        return astroName[m + 1];
    };
    var guide_for_last_birthday = function () {
        return;
    };
    var globalBg = {name: '', url: '', thumbUrl: ''};
    var get_qbs_data = function (id, cb) {
        QZFL.imports('http://' + siDomain + '/qzone/biz/comm/js/qbs.js', function () {
            QBS.get(id, null, 1, false, function (data) {
                data.ret && cb(data.cfg.txt);
            });
        });
    };
    var deny_invite = 0;
    var open_invite = 0;
    return {
        _init: function () {
            $('header').innerHTML = tmpl(TEMPLATE.PROFILE_TPL, {
                uin: get_owner_uin(),
                portrait: QZONE.FP.getPURL(get_owner_uin(), 100),
                isOwner: QZONE.FP.getQzoneConfig('isOwner')
            });
            this.showProfileInfo();
            this.showNewestMood();
            this.showUgcCount();
            this.showMsgBoardCount();
            this.bindEvents();
            if (Timeline.appMode) {
                this.handleQbsTips();
            }
            var action = QZONE.FP.getParameter(location.href, 'action');
            if (QZONE.FP.getQzoneConfig('isOwner')) {
                if (action == 'setindex') {
                    this.goSetting('c');
                } else if (action == 'SHOW_INVITE_LIST') {
                    setTimeout(QZFL.bind(this, this.showInviteList), 1000);
                }
            }
        },
        init: function () {
            this.getHeaderData();
            if (!(Timeline.UI.act && Timeline.UI.act.customizeHeader)) {
                this._init();
            }
        },
        bindEvents: function () {
            var t = this;
            if (QZONE.FP.getQzoneConfig('isOwner')) {
                t.bindHostEvents();
            }
            $e('.op_add').bind('click', function () {
                var uin = QZONE.FP.getQzoneConfig().ownerUin;
                QZONE.FP.addFriend(uin, 0, 0, {from: 7});
            });
            $e('.op_care').bind('click', function () {
                Timeline.profile.opCare(1, function () {
                    $e('.op_care').addClass("none");
                    $e('.op_care_done').removeClass("none");
                });
            });
            $e('.op_care_done').bind('click', function () {
                Timeline.profile.opCare(2, function () {
                    $e('.op_care_done').addClass("none");
                    $e('.op_care').removeClass("none");
                });
            });
        },
        opCare: function (action, callback) {
            var url = 'http://' + (window.g_W_Domain || 'w.qzone.qq.com') + '/cgi-bin/tfriend/specialcare_set.cgi',
                data = {
                    'uin': QZONE.FP.getQzoneConfig().loginUin,
                    'do': action,
                    'fuin': QZONE.FP.getQzoneConfig().ownerUin,
                    fupdate: 1
                },
                _t;
            _t = new QZFL.FormSender(url, "POST", data, "utf-8");
            _t.onSuccess = _t.onError = function (re) {
                if (re && re.code == 0) {
                    callback && callback();
                } else {
                    QZONE.FP.showMsgbox("服务器繁忙，请稍后再试", 1, 3000);
                }
            };
            _t.send();
        },
        showProfileInfo: function () {
            var url = 'http://' + g_Base_Domain + '/cgi-bin/user/cgi_userinfo_get_all',
                successCallback = function (response) {
                    var d, nickname, sex, hometown, marriage, place, constellation;
                    if (response.code != 0) {
                        Timeline.utils.hotClick('monitor.get_user_info.invalid_data');
                        return;
                    }
                    d = response.data;
                    nickname = d.nickname;
                    if (d.sex_type == 0) {
                        sex = d.sex == -1 ? '未填写' : (d.sex == 1 ? '男' : '女');
                    } else {
                        sex = '性别保密';
                    }
                    if (d.home_type == 0 && (hometown = d.hc || d.hp || d.hco)) {
                        hometown = '来自' + QZFL.string.cut(hometown, 10, '...');
                    } else {
                        hometown = '故乡保密';
                    }
                    if (d.marriage >= 1 && d.marriage <= 7) {
                        marriage = marriage_type[d.marriage];
                    } else {
                        marriage = '情感保密';
                    }
                    if (d.address_type == 0 && (place = d.city || d.province || d.country)) {
                        place = '现居' + QZFL.string.cut(place, 10, '...');
                    } else {
                        place = '现居地保密';
                    }
                    if (d.constellation_type == 0 && d.constellation != -1) {
                        constellation = getAstroName(d.constellation);
                    } else {
                        constellation = '星座保密';
                    }
                    $('user_info_nickname').innerHTML = QZONE.FP.removeUBB(QZFL.string.escHTML(nickname) || '');
                    $('user_info_sex').innerHTML = sex;
                    $('user_info_hometown').innerHTML = QZFL.string.escHTML(hometown);
                    $('user_info_marriage').innerHTML = marriage;
                    $('user_info_place').innerHTML = QZFL.string.escHTML(place);
                    $('user_info_constellation').innerHTML = constellation;
                    $('vip_icon').innerHTML = QZONE.FP.getUserVipHTML('l', {withYear: 1});
                    var ele = $e('.user_name');
                    if (!QZONE.FP.getQzoneConfig().isOwner) {
                        if (!g_isFriend) {
                            $e('.op_add').removeClass("none");
                        } else {
                            if (!(window.g_Specialcare_ret && window.g_Specialcare_flag)) {
                                $e('.op_care').removeClass("none");
                            } else {
                                $e('.op_care_done').removeClass("none");
                            }
                        }
                    }
                    Timeline.utils.hotClick('monitor.get_user_info.success');
                },
                errorCallback = function () {
                    Timeline.utils.hotClick('monitor.get_user_info.fail');
                };
            if (window.$j && $j.jsonGet) {
                $j.jsonGet(url, {
                    uin: get_owner_uin(),
                    vuin: get_login_uin(),
                    rd: Math.random(),
                    fupdate: 1
                }, {"callback": successCallback, "onerror": errorCallback, "chartset": "utf-8"});
            } else {
                var loader = new QZFL.JSONGetter(url, void(0), {
                    uin: get_owner_uin(),
                    vuin: get_login_uin(),
                    rd: Math.random(),
                    fupdate: 1
                }, 'utf-8');
                loader.onSuccess = successCallback;
                loader.onError = errorCallback;
                loader.send('_Callback');
            }
            Timeline.utils.hotClick('monitor.get_user_info.start');
        },
        showNewestMood: function () {
            var url = 'http://taotao.qq.com/cgi-bin/emotion_cgi_firstutf8';
            Timeline.utils.dataLoader(url, {
                uin: get_owner_uin(),
                plattype: 1,
                code_version: 1,
                rd: Math.random()
            }, function (response) {
                if (response.items && response.items[0]) {
                    $e('#newest_mood').setHtml(QZONE.FP.removeUBB(Timeline.EventNormal.parseMention(QZFL.string.restXHTML(response.items[0].title))));
                } else {
                    $e('#newest_mood').setHtml(QZFL.string.escHTML(QZONE.FP.getDescription()));
                }
            }, function () {
                $e('#newest_mood').setHtml(QZFL.string.escHTML(QZONE.FP.getDescription()));
            }, {retOrigResponse: true});
        },
        getHeaderData: function () {
            if (Timeline.UI.act && Timeline.UI.act.globalBg) {
                this.updateGlobalBgData(Timeline.UI.act.globalBg.name, Timeline.UI.act.globalBg.url, Timeline.UI.act.globalBg.thumbUrl);
                this.showPageGlobalBg();
                return;
            }
            var self = this;
            var url = 'http://' + Timeline.CONST.DOMAIN_CGI + '/cgi-bin/time_cgi_get_headmodule';
            var post_guide = QZONE.FP.getQzoneConfig('isOwner') && Timeline.core.getDataState() == Timeline.CONST.STATE_INITIALED && !QZONE.FP.getParameter(location.href, 'eid');
            Timeline.utils.dataLoader(url, {plattype: 0, data_imported: post_guide ? 1 : 0}, function (d) {
                self.updateGlobalBgData(d.bgm.pic_name, d.bgm.big_url, d.bgm.small_url);
                if (Timeline.line.shouldQzoneBGBeShown()) {
                    Timeline.line.setStageBGData(globalBg.url);
                } else {
                    self.showPageGlobalBg();
                }
                if (post_guide == 1 && d.birthday_guided == 0) {
                    guide_for_last_birthday();
                }
                if (d.invite_ret == 0 && QZONE.FP.getQzoneConfig('isOwner')) {
                    if (d.invite_info && d.invite_info.unread) {
                        $e('#invite_num').setHtml(d.invite_info.unread > 99 ? 99 : d.invite_info.unread);
                        $e('#invite_num').getParent().show();
                        setTimeout(function () {
                            self.loadInviteJs();
                        }, 5000);
                    }
                    if (d.invite_info && d.invite_info.name && d.invite_info.uin) {
                        $e('#inviter').setHtml(QZFL.string.escHTML(d.invite_info.name));
                        $e('#inviter').setAttr('href', 'http://user.qzone.qq.com/' + d.invite_info.uin + '/main?mode=gfp_timeline');
                        $e('#inviter').getParent().show();
                    }
                    if (d.invite_info && d.invite_info.total == 0) {
                        Timeline.noInviteData = true;
                    }
                }
                deny_invite = d.deny_invite;
                open_invite = d.open_invite;
            });
        },
        showUgcCount: function () {
            var url = 'http://snsapp.qzone.qq.com/cgi-bin/qzonenext/getplcount.cgi',
                successCallback = function (d) {
                    if (d.result.code == 0) {
                        $e('#count_blog').setHtml(d.count.RZ || 0);
                        $e('#count_photo').setHtml(Math.max(0, d.count.XC || 0));
                        $e('#count_mood').setHtml(d.count.SS || 0);
                    }
                },
                _data = {hostuin: get_owner_uin()};
            if (window.$j && $j.jsonGet) {
                $j.jsonGet(url, _data, successCallback);
            } else {
                var loader = new QZFL.JSONGetter(url, void(0), _data, 'utf-8');
                loader.onSuccess = successCallback;
                loader.send('_Callback');
            }
        },
        showMsgBoardCount: function () {
            var url = 'http://m.qzone.qq.com/cgi-bin/new/get_msgb',
                _data = {
                    hostUin: get_owner_uin(),
                    uin: get_login_uin(),
                    num: 0,
                    start: 1,
                    json: 1,
                    format: 'jsonp',
                    fupdate: 1,
                    s: Math.random()
                },
                successCallback = function (response) {
                    if (response.code == 0) {
                        $e('#count_msg_board').setHtml(response.data.total || 0);
                    }
                };
            if (window.$j && $j.jsonGet) {
                $j.jsonGet(url, _data, {
                    "callback": successCallback, "onerror": function () {
                    }, "charset": 'gb2312'
                });
            } else {
                var loader = new QZFL.JSONGetter(url, void(0), _data, 'gb2312');
                loader.onSuccess = successCallback;
                loader.send('_Callback');
            }
        },
        updateGlobalBgData: function (name, url, thumb_url) {
            if (Timeline.UI.act && Timeline.UI.act.globalBg) {
                globalBg = Timeline.UI.act.globalBg;
            } else if (url && thumb_url) {
                globalBg = {name: name, url: url, thumbUrl: thumb_url}
            } else {
                if (QZONE.FP.isVipUser()) {
                    globalBg = {
                        name: '岛屿',
                        url: '/qzone_v6/proj_timeline/img/tml_default_bgs_vip/1.jpg',
                        thumbUrl: '/qzone_v6/proj_timeline/img/tml_default_bgs_vip/thumb/1.jpg'
                    };
                } else {
                    globalBg = {
                        name: '风车',
                        url: '/qzone_v6/proj_timeline/img/tml_default_bgs/11.jpg',
                        thumbUrl: '/qzone_v6/proj_timeline/img/tml_default_bgs/thumb/11.jpg'
                    };
                }
            }
        },
        showPageGlobalBg: function () {
            PAGE_EVENT.fireEvent('onSetStageBG', globalBg.url);
            log('event fired: onSetStageBG ', globalBg.url);
        },
        rotatePortrait: function () {
            var running = false,
                elem = $('avatar').parentNode;
            if (typeof elem.style.webkitTransform == 'undefined') {
                return;
            }
            elem.style.cssText = '-webkit-transform: perspective(500px) rotateY(0deg);';
            elem.onmouseover = function () {
                if (running) {
                    return;
                }
                var v1 = 0,
                    v2 = 360,
                    t = 1200;
                var tween = new QZFL.tweenMaker(v1, v2, t, 1000 / 60, {
                    functor: function (t, b, c, d) {
                        return c * (t /= d) * t + b;
                    }
                });
                tween.onChange = function (percent) {
                    var v = v1 + ((v2 - v1) * (percent * 0.01));
                    elem.style.webkitTransform = 'perspective(500px) rotateY(' + v + 'deg)';
                };
                tween.onEnd = function () {
                    running = false;
                };
                tween.start();
                running = true;
            };
        },
        handleQbsTips: function () {
            var self = this;
            var check_local_storage = function (id_prefix, uin, tips) {
                if (QZONE.FP.noShareDb.get(id_prefix + 'uin') == uin && QZONE.FP.noShareDb.get(id_prefix + 'tips') == tips) {
                    return true;
                }
                return false;
            };
            var update_local_storage = function (id_prefix, uin, tips) {
                QZONE.FP.noShareDb.set(id_prefix + 'uin', uin);
                QZONE.FP.noShareDb.set(id_prefix + 'tips', tips);
            };
            var update_others = function () {
                setTimeout(function () {
                    Timeline.summary.fixPos(true);
                    PAGE_EVENT.fireEvent('AdjustBirthdayTimeGuide');
                }, 1000);
                setTimeout(function () {
                    PAGE_EVENT.fireEvent('AdjustBirthdayTimeGuide');
                }, 2000);
                self.adjustInviteListPos();
            };
            get_qbs_data(QZONE.FP.getQzoneConfig('isOwner') ? 'qzone_timelinemaster_txt_2' : 'qzone_timelineguest_txt_2', function (tips) {
                var id_prefix = QZONE.FP.getQzoneConfig('isOwner') ? 'timeline_tips_host_' : 'timeline_tips_guest_';
                if (check_local_storage(id_prefix, get_login_uin(), tips)) {
                    return;
                }
                var tips_container = $('tips_content').parentNode.parentNode;
                tips_container.style.display = '';
                $('tips_content').innerHTML = tips.replace(/<A href=/ig, '<A target="_blank" href=');
                QZFL.css.removeClassName(tips_container, 'tml_message_hidden');
                update_others();
                QZFL.event.addEvent($('tips_close'), 'click', function () {
                    QZFL.css.addClassName(tips_container, 'tml_message_hidden');
                    update_others();
                    update_local_storage(id_prefix, get_login_uin(), tips);
                    setTimeout(function () {
                        tips_container.style.display = 'none';
                    }, 500);
                });
            });
        },
        bindHostEvents: function () {
            var t = this;
            $e('#global_set').bind('click', function () {
                t.goSetting();
            });
            $e('#mention_me').bind('click', function () {
                t.showInviteList();
                PAGE_EVENT.fireEvent('keepInvitationList');
            });
            PAGE_EVENT.addEvent('Guide_For_Last_Birthday', function () {
                guide_for_last_birthday();
            });
            PAGE_EVENT.addEvent('updateDenyInviteInfo', function (deny, open) {
                if (typeof deny != 'undefined') deny_invite = deny;
                if (typeof open != 'undefined') open_invite = open;
            });
        },
        getGlobalBg: function () {
            return QZFL.extend({}, globalBg);
        },
        goSetting: function (type) {
            var t = this,
                url = 'http://' + imgcacheDomain + '/qzone/app/timeline/popup.html#type=' + (type || 'd') + '&deny_invite=' + deny_invite + '&open_invite=' + open_invite;
            QZONE.FP.popupDialog('设置', {src: url}, 602, 340);
            QZONE.FP.appendPopupFn(function () {
                if (window.temporaryData && !temporaryData.modified && temporaryData.url && (globalBg.url != temporaryData.url)) {
                    PAGE_EVENT.fireEvent('onSetStageBG', globalBg.url);
                }
                window.temporaryData = null;
            });
            PAGE_EVENT.fireEvent('qzMessagePanel.hide');
        },
        submitGlobalBg: function (cb) {
            var self = this;
            if (globalBg.url == temporaryData.url) {
                cb && cb();
            } else {
                var cgi = 'http://' + Timeline.CONST.DOMAIN_CGI + '/cgi-bin/time_cgi_update';
                var url = temporaryData.url,
                    thumbUrl = temporaryData.thumbUrl,
                    name = temporaryData.name;
                Timeline.utils.dataSender(cgi, {
                    update_type_top: Math.pow(2, 4),
                    bgm_big_url: url,
                    bgm_small_url: thumbUrl,
                    bgm_pic_name: name
                }, function (d) {
                    self.updateGlobalBgData(name, url, thumbUrl);
                    cb && cb();
                });
            }
        },
        loadInviteJs: function (callback) {
            Timeline.utils.require('timeline.invitation.js', callback);
        },
        showInviteList: function () {
            this.loadInviteJs(function () {
                Timeline.invitation.show($('mention_me'));
            });
        },
        adjustInviteListPos: function () {
            Timeline.invitation && Timeline.invitation.adjustPosition();
        },
        isInviteOpen: function () {
            return !!open_invite;
        }
    };
})();
Timeline.G = (function () {
    "use strict";
    var div = document.createElement('div');
    div.id = 'timeline_absolute_container';
    div.innerHTML = TEMPLATE.GLOBALDIV_TPL;
    document.body.appendChild(div);
    var inner = {
        tipId: '',
        wrapClass: '',
        showGlobalTip: function (tar, html, opt) {
            var pos = QZFL.dom.getPosition(tar);
            opt = opt || {};
            opt.id = opt.id || +(new Date);
            opt.x = opt.x || 0;
            opt.y = opt.y || 0;
            opt.direction = opt.direction || 1;
            if (this.tipId != opt.id) {
                $('g_wrap_con').innerHTML = html;
                this.tipId = opt.id;
            }
            $('g_wrap').style.top = pos.top + 28 + opt.y + 'px';
            $('g_wrap').style.left = pos.left + opt.x + 'px';
            if (opt.wrapClass) {
                $e('#g_wrap').addClass(opt.wrapClass);
                this.wrapClass = opt.wrapClass;
            }
            if (opt.direction == 1) {
                $e('#g_wrap').removeClass('bubble_bg_choose_t');
            } else {
                $e('#g_wrap').addClass('bubble_bg_choose_t');
            }
            clearTimeout(this.globalTipTimeoutId);
            $e('#g_wrap').show();
            this.keepGlobalTip = true;
            this.mouseoutToHide = !!opt.mouseoutToHide;
        },
        hideGlobalTip: function (id) {
            if (id && id != this.tipId) {
                return;
            }
            var t = this;
            var time_out = this.mouseoutToHide ? 250 : 0;
            this.globalTipTimeoutId = setTimeout(function () {
                $e('#g_wrap').hide().removeClass(t.wrapClass);
                t.wrapClass = '';
            }, time_out);
        },
        showMap: function (tar, x, y, id) {
            if (!x || !y) {
                return;
            }
            if (id == this.mapId) {
                clearTimeout(this.mapTipTimeoutId);
            } else {
            }
            if ($(id)) {
                var position_info = QZFL.dom.getPosition(tar);
                $e('#' + id).setStyle('left', position_info.left + 1).setStyle('top', position_info.top + 20)
                $e('#' + id).removeClass('none').show();
                this.mapId = id;
                return;
            }
            var html = ['<iframe src="/qzone/app/controls/map/tips.html#posx=', QZFL.string.escHTML(x), '&posy=', QZFL.string.escHTML(y), '" allowtransparency frameborder="0" scrolling="no" style="width:300px;height:200px;"></iframe>'].join("");
            var opts = {
                contentPadding: 1,
                width: 302,
                height: 202,
                timeout: -1,
                noQueue: true,
                single: true,
                id: id,
                arrowPoint: 1,
                arrowEdge: 1,
                noCloseButton: true
            };
            this.mapId = QZFL.widget.tips.show(html, tar, opts);
            var t = this;
            setTimeout(function () {
                $e('#' + id).bind('mouseover', function () {
                    clearTimeout(t.mapTipTimeoutId);
                }).bind('mouseout', function () {
                    t.hideMap(id);
                });
            }, 1000);
        },
        hideMap: function (id, at_once) {
            var t = this;
            var time_out = at_once ? 0 : 250;
            this.mapTipTimeoutId = setTimeout(function () {
                QZFL.widget.tips.close(id || t.mapId);
            }, time_out);
        },
        showFriendSelector: function (tar, id, presource) {
            if (QZONE.friends && QZONE.friends.Selector) {
                this.doShowFriendSelector(tar, id, presource);
                this.keepFriendSelector = true;
            } else {
                var t = this;
                QZFL.imports('http://' + siDomain + '/qzone/friends/selector/friendSelector.js', function () {
                    t.doShowFriendSelector(tar, id, presource);
                });
            }
        },
        doShowFriendSelector: function (tar, id, presource) {
            if (this.friendSelectorId != id) {
                $('friend_selector').innerHTML = '';
                this.setUpFriendSelector(presource);
                this.friendSelectorId = id;
            }
            this.updateFriendSelectorPosition(tar);
        },
        updateFriendSelectorPosition: function (tar) {
            var xyInfo = QZFL.dom.getXY(tar);
            $e('#friend_selector_wrap').setStyle({'top': xyInfo[1] + 39, 'left': xyInfo[0] + 50}).show();
        },
        setUpFriendSelector: function (presource) {
            QZONE.friends.Selector.setup({
                "uin": QZONE.FP.getQzoneConfig('loginUin'),
                "multiChoose": true,
                "module": "000",
                "limit": 5,
                "row": 2,
                "result": false,
                "target": $('friend_selector'),
                "insertFirst": false,
                "careInGroup": false,
                "preSource": presource || [],
                "ui": true,
                "overflowCallback": function () {
                    QZONE.FP.showMsgbox('最多只可以选择5位好友哦', 1, 2000);
                }
            });
        },
        checkCurrentFriendSelector: function (uuid) {
            return uuid == this.friendSelectorId;
        },
        closeFriendSelector: function () {
            $e('#friend_selector_wrap').hide();
        }
    };
    QZFL.event.addEvent(document.body, 'click', function (e) {
        var tar = e.target || e.srcElement,
            $tar = $e(tar);
        if (inner.keepGlobalTip) {
            inner.keepGlobalTip = false;
        } else {
            inner.hideGlobalTip();
        }
        if (inner.keepFriendSelector) {
            inner.keepFriendSelector = false;
        } else {
            inner.closeFriendSelector();
        }
    });
    QZFL.event.addEvent($('g_wrap'), 'click', function () {
        inner.keepGlobalTip = true;
    });
    $e('#g_wrap').bind('mouseover', function () {
        clearTimeout(inner.globalTipTimeoutId);
    }).bind('mouseout', function () {
        inner.mouseoutToHide && inner.hideGlobalTip();
    });
    QZFL.event.addEvent($('friend_selector_wrap'), 'click', function (e) {
        var tar = e.target || e.srcElement;
        if (QZFL.css.hasClassName(tar, 'fs_m') || QZFL.css.hasClassName(tar, 'fs_add_group')) {
            inner.onSelectedFriend();
        }
        inner.keepFriendSelector = true;
    });
    TCISD.hotClickWatch({doc: document, domain: 'timeline.qzone.qq.com', url: '/index'});
    return inner;
})();
Timeline.EventBase = Class.extend({
    init: function (item) {
        var date;
        item = item || {};
        if (item.time) {
            date = new Date(item.time * 1000);
        }
        this.time = item.time * 1000 || 0;
        this.year = date ? date.getFullYear() : 0;
        this.month = date ? (date.getMonth() + 1) : 0;
        this.id = item.id || '';
        this.top = 0;
        this.bottom = 0;
        this.container = null;
        this.panel = null;
        this.shown = false;
    },
    show: function () {
        this.shown = true;
    },
    bindHoverEvent: function () {
        var self = this;
        this.panel.onmouseover = function () {
            $e(self.panel).addClass('feed_box_hover');
        };
        this.panel.onmouseout = function () {
            $e(self.panel).removeClass('feed_box_hover');
        };
    },
    initLoadSteps: function (steps) {
        this.currentStep = 0;
        this.properSteps = steps || 1;
    },
    checkLoaded: function () {
        if (++this.currentStep == this.properSteps) {
            PAGE_EVENT.fireEvent('onEventLoaded', this.id);
        }
    },
    remove: function () {
        PAGE_EVENT.fireEvent('onRemove', this);
    },
    clear: function () {
        this.panel.style.height = QZFL.dom.getRect(this.panel).height + 'px';
        this.df = document.createDocumentFragment();
        while (this.panel.children.length) {
            this.df.appendChild(this.panel.removeChild(this.panel.children[0]));
        }
        QZFL.css.removeClassName(this.panel, 'feed_box_show');
    },
    restore: function () {
        if (this.df) {
            this.panel.appendChild(this.df);
            this.panel.style.height = 'auto';
            this.df = null;
        }
        QZFL.css.addClassName(this.panel, 'feed_box_show');
    }
});
Timeline.Event = function (item, option) {
    if (item.id == Timeline.Event.calendarId) {
        return new Timeline.EventCalendar(item);
    } else if (item.id == Timeline.Event.setHomepageId) {
        return new Timeline.EventSetHomepage(item);
    } else if (item.id == Timeline.Event.visitorId) {
        return new Timeline.EventVisitor(item);
    } else if (item.id == Timeline.Event.annual2012) {
        return new Timeline.EventAnnual2012(item);
    }
    return new Timeline.EventNormal(item, option);
};
Timeline.Event.calendarId = 'timeline_calendar';
Timeline.Event.setHomepageId = 'timeline_set_homepage';
Timeline.Event.visitorId = 'timeline_visitor';
Timeline.Event.annual2012 = 'timeline_annual2012';
Timeline.EventNormal = (function () {
    "use strict";
    var get_login_uin = function () {
        return QZONE.FP.getQzoneConfig('loginUin');
    };
    var get_owner_uin = function () {
        return QZONE.FP.getQzoneConfig('ownerUin');
    };
    var is_owner = function () {
        return QZONE.FP.getQzoneConfig('isOwner');
    };
    var worker, _BlobBuilder, _URL;
    if ((_BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder) && (_URL = window.webkitURL || window.URL)) {
        try {
            var blob, object_url;
            blob = new _BlobBuilder();
            blob.append(['importScripts("http://' + siDomain + '/qzone/app/timeline/script/lunar_maker.js?max_age=31536000");', 'self.onmessage = function(e) {', 'self.postMessage({date:LunarMaker.getLunarDate(e.data.date), eid:e.data.eid});', '};'].join(''));
            object_url = _URL.createObjectURL(blob.getBlob());
            worker = new Worker(object_url);
            worker.onmessage = function (e) {
                var oEvent = Timeline.core.getEventById(e.data.eid);
                $e('#lunar_' + oEvent.id).addClass('lunar' + Timeline.utils.getLunarSpriteId(null, oEvent.time_accuracy, e.data.date));
                oEvent.checkLoaded();
            };
        } catch (e) {
        }
    }
    var IMP_INFO = Timeline.CONST.IMP_EVENT_INFO;
    var FROM_TIMELINE = 0,
        FROM_NOTIFY_SYNC = 1,
        FROM_IMPORT = 2,
        FROM_INVITE = 3;
    var MOOD = 1,
        PHOTO = 2,
        BLOG = 3;
    var bind_event = function () {
        QZFL.event.addEvent(document.body, 'click', function timeline_body_click(e) {
            var tar = e.target || e.srcElement,
                $tar = $e(tar),
                event_id = tar.getAttribute('data-id');
            if (!event_id) {
                return;
            }
            var t = Timeline.core.getEventById(event_id);
            if ($tar.hasClass('j_view_photo')) {
                t.viewPhoto(tar.getAttribute('data-index') || 0);
            } else if ($tar.hasClass('j_play_video')) {
                t.playVideo();
            } else if ($tar.hasClass('j_edit')) {
                t.switchToEdit();
            } else if ($tar.hasClass('j_delete')) {
                t.remove();
            } else if ($tar.hasClass('j_permit')) {
                if (!t.setPrivacyIng) {
                    t.setPrivacy();
                    t.setPrivacyIng = true;
                }
            }
        });
        QZFL.event.delegate($('event_content'), 'a.j_show_comment_box', 'mousedown', function timeline_handle_comment() {
            var oEvent = Timeline.core.getEventById(this.getAttribute('data-id'));
            var elem = $('uni_comment_' + oEvent.id);
            if (elem.style.display == 'none') {
                if (oEvent.commentModule) {
                    oEvent.focusCommentBox();
                } else {
                    oEvent.initUniComment(elem);
                }
            } else {
                elem.style.display = 'none';
            }
        });
        QZFL.event.delegate($('event_content'), 'a.j_map', 'mouseenter', function () {
            var event_id;
            if (event_id = this.getAttribute('data-id')) {
                Timeline.core.getEventById(event_id).showMap(this);
            }
        });
        QZFL.event.delegate($('event_content'), 'a.j_map', 'mouseleave', function () {
            var event_id;
            if (event_id = this.getAttribute('data-id')) {
                Timeline.G.hideMap('PlacePopup_' + Timeline.core.getEventById(event_id).tipId);
            }
        });
        QZFL.event.addEvent($('close_video'), 'click', function () {
            var flash = $('video_wrap').children[0].children[0];
            flash.parentNode.removeChild(flash);
            $('video_wrap').style.display = 'none';
            Timeline.utils.hideMaskLayout();
            QZONE.FP.toggleDisplay(true, 'm');
        });
        PAGE_EVENT.addEvent('deletePrivateFeed', function (eid) {
            Timeline.core.getEventById(eid).deletePrivateFeed();
        });
        PAGE_EVENT.addEvent('showOpenTips', function (eid) {
            if (Timeline.core.getEventById(eid)['private'] && is_owner()) {
                Timeline.utils.require('open_tips.js', function () {
                    Timeline.openTips.show(eid);
                });
            }
        });
    };
    bind_event();
    var parse_mention = (function () {
        var q$s = j$.module({resName: '*', nsName: '/utils/string', version: '1.0'});
        return function (content) {
            return q$s.parseMention(content);
        };
    })();
    var fixed_digit = function (n) {
        return (parseInt(n) < 10 ? '0' : '') + n;
    };
    var process_url = function (str) {
        var url_pattern = new RegExp('(href=")?(?:(?:news|telnet|nttp|file|http|ftp|https)://)(?:(?:[-A-Za-z0-9_]+(?:\\.[-A-Za-z0-9_]+)*(?:\\.[-A-Za-z]{2,5}))|(?:[0-9]{1,3}(?:\\.[0-9]{1,3}) {3}))(?::[0-9]*)?(?:/[-A-Za-z0-9_\\$\\.\\+\\!*()>{},;:@&=?/~#%\'`]*)*', 'ig');
        return str.replace(url_pattern, function ($0, $1) {
            if (!$1) {
                return '<a href="' + $0 + '" target="_blank">' + $0 + '</a>';
            }
            return $0;
        });
    };
    var get_time_data = function (timestamp, accuracy) {
        var data = {date: '', time: '', className: ''};
        var d = new Date(timestamp),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            minute = d.getMinutes();
        switch (accuracy) {
            case 1:
                data.date = year + '年';
                break;
            case 2:
                data.date = year + '-' + month;
                break;
            case 3:
                data.date = year + '-' + month + '-' + day;
                data.className = 'feed_date_day';
                break;
            case 4:
                data.date = year + '-' + month + '-' + day;
                data.time = fixed_digit(hour) + '时';
                break;
            default:
                data.date = year + '-' + month + '-' + day;
                data.time = fixed_digit(hour) + ':' + fixed_digit(minute);
        }
        return data;
    };
    var blog_cgi_prefix = window.g_BLOG_LOCATION_PREFIX || (+get_owner_uin() < 1000000000 ? 'b1' : 'b11');
    var sort_images = function (a, b) {
        var arr1 = a.extend_1.split(','),
            arr2 = b.extend_1.split(',');
        if (a.type == 1 && b.type == 1 && arr1.length == 7 && arr2.length == 7) {
            return arr2[6] * arr2[5] - arr1[6] * arr1[5];
        } else {
            return 0;
        }
    };
    var adjust_photo = function (img, size, opt) {
        var opt = opt || {};
        var w = img.width,
            h = img.height;
        if (size.w && size.h) {
            if (img.width * size.h <= img.height * size.w && img.width > size.w) {
                img.width = size.w;
                img.height = Math.ceil(img.width * h / w);
            } else if (img.width * size.h > img.height * size.w && img.height > size.h) {
                img.height = size.h;
                img.width = Math.ceil(img.height * w / h);
            }
        } else if (size.w && opt.maxH && img.width > size.w) {
            img.width = size.w;
            img.height = Math.ceil(img.width * h / w);
        }
        if (img.width > size.w) {
            img.style.marginLeft = parseInt((size.w - img.width) * 0.5) + 'px';
        }
        if (size.h) {
            img.style.marginTop = parseInt((size.h - img.height) * (img.height <= size.h ? 0.5 : 0.3)) + 'px';
        } else if (opt.maxH && img.height > opt.maxH) {
            img.style.marginTop = parseInt((opt.maxH - img.height) * 0.3) + 'px';
        }
    };
    var image_loaded = function (img, opt) {
        var opt = opt || {};
        var eid = img.getAttribute('data-id'),
            idx;
        if (idx = img.getAttribute('data-index')) {
            $e('#i_loading_' + eid + '_' + idx).hide();
            $e('#i_wrap_' + eid + '_' + idx).show();
        } else {
            $e('#i_loading_' + eid).hide();
            $e('#i_wrap_' + eid).show();
        }
        var container = img.parentNode.parentNode;
        var size = {w: QZFL.dom.getRect(container).width, h: opt.maxH ? 0 : QZFL.dom.getRect(container).height};
        if (img.width == 0) {
            setTimeout(function () {
                image_loaded(img, opt)
            }, 200);
            return;
        }
        if (opt.failed) {
            img.onerror = null;
            img.src = 'http://' + siDomain + '/qzone_v6/proj_timeline/img/tml_img_404.jpg';
            img.onload = function () {
                this.onload = null;
                adjust_photo(this, size, opt);
                img.style.visibility = 'visible';
                QZFL.css.addClassName(container, 'item_show');
                Timeline.core.getEventById(eid).checkLoaded();
            };
        } else {
            check_broken_image_and_report(img, eid);
            adjust_photo(img, size, opt);
            if (opt.specialTreat && img.width < size.w) {
                if (size.w - img.width < 110) {
                    img.width = size.w;
                } else {
                    $e('#i_container_' + eid).addClass('img_box_photo_min');
                }
            }
            if (!size.h && opt.maxH) {
                if (img.height < 100) {
                    $e('#i_container_' + eid).setStyle('height', 43 + img.height);
                }
                if (opt.specialTreat && img.width < 100) {
                    $e('#i_container_' + eid).setStyle('width', 62 + img.width);
                }
            }
            if (opt.maxH) {
                container.style.height = (img.height > opt.maxH ? opt.maxH : img.height) + 'px';
                PAGE_EVENT.fireEvent('onHeightChange', eid);
            }
            img.style.visibility = 'visible';
            QZFL.css.addClassName(container, 'item_show');
            Timeline.core.getEventById(eid).checkLoaded();
        }
    };
    var check_broken_image_and_report = function (img, eid) {
        if (img.width == 100 && img.height == 100 && (!img.fileSize || img.fileSize == 2073 || img.fileSize == -1)) {
            Timeline.utils.hotClick('event.image_loaded.failed');
            var oEvent = Timeline.core.getEventById(eid);
            if (oEvent.data.ugc_type != PHOTO) {
                return;
            }
            var url = 'http://' + Timeline.CONST.DOMAIN_CGI + '/cgi-bin/time_cgi_mend';
            Timeline.utils.dataSender(url, {
                event_id: oEvent.id,
                ugc_type: oEvent.data.ugc_type,
                url: img.src
            }, function () {
            }, function () {
            }, {showTips: false});
        } else {
            Timeline.utils.hotClick('event.image_loaded.successful');
        }
    };
    var validHtmlParser = null;
    var getValidHtml = function (str) {
        validHtmlParser = validHtmlParser || document.createElement('div');
        validHtmlParser.innerHTML = str;
        return validHtmlParser.innerHTML;
    };
    var video_preview = function (img, failed) {
        var eid = img.getAttribute('data-id');
        $e('#v_loading_' + eid).hide();
        $e('#v_wrap_' + eid).show();
        if (failed) {
            img.onerror = img.onload = null;
            if (img.src.indexOf('video.qq.com') != -1) {
                img.src = 'http://' + siDomain + '/qzone_v6/img/video/transforming.png?max_age=31536000';
            } else {
                img.src = 'http://' + siDomain + '/qzone_v6/proj_timeline/img/bg_video_stance.png?max_age=31536000';
            }
        }
        QZFL.css.addClassName(img.parentNode.parentNode, 'item_show');
        PAGE_EVENT.fireEvent('onHeightChange', eid);
        Timeline.core.getEventById(eid).checkLoaded();
    };
    var normalEvent = Timeline.EventBase.extend({
        init: function (item, option) {
            var option = option || {};
            QZFL.object.extend(this, item);
            item.type == 200 && (this.type = 101);
            this.time = item.time * 1000;
            if (this.time_accuracy > 5) {
                this.time_accuracy = 3;
            }
            this.readOnly = !!option.readOnly;
            this.ignoreCache = !!option.ignoreCache;
            this.isNormalEvent = item.type > 100;
            this.isImpEvent = item.type < 100;
            this.isOpTopic = item.type == 100;
            this.year = this.month = this.day = 0;
            this.panel = null;
            this.container = null;
            this.initialized = false;
            this.shown = false;
            this.top = 0;
            this.bottom = 0;
            this.tipId = Math.random().toString().substr(2);
            this.data.sp_event.bgimg = (this.data.sp_event.bgimg && /(http|proj_timeline)/.test(this.data.sp_event.bgimg)) ? QZFL.string.escHTML(this.data.sp_event.bgimg) : '';
            if (Timeline.core.dataIncomplete()) {
                this.readOnly = true;
            }
            this.from7year = this.from7year && this.isOpTopic;
            this.updateYMD();
        },
        show: function (opt) {
            var opt = opt || {},
                t = this;
            if (this.shown || !(this.container = $(Timeline.CONST.PREFIX_LIST + this.year + '_' + this.month))) {
                return;
            }
            this.panel = document.createElement('li');
            this.panel.className = ['feed_box', opt.panelClass, this['private'] ? 'feed_box_lock' : '', this.isImpEvent && !(Timeline.UI.act && Timeline.UI.act.script && Timeline.UI.act.customizedEventTplName) ? IMP_INFO[this.type].differClass : '', this.from7year ? 'feed_7_years' : ''].join(' ');
            this.setContent(function () {
                if (!!opt.index) {
                    t.container.insertBefore(t.panel, t.container.childNodes[opt.index]);
                } else {
                    t.container.appendChild(t.panel);
                }
            });
            this.shown = true;
            return true;
        },
        setContent: function (cb) {
            var t = this;
            var tplData = {
                eventId: this.id,
                eventType: this.type,
                timeData: get_time_data(this['time'], this.time_accuracy),
                isOwner: !!QZONE.FP.getQzoneConfig('isOwner'),
                title: '',
                titleLink: '',
                moodContent: '',
                otherContent: '',
                imageOnly: false,
                videoOnly: false,
                imageAndVideo: false,
                photos: [],
                videoUrl: '',
                picNum: 0,
                inviter: null,
                friends: [],
                place: this.place && this.place.name || '',
                placeLink: !!(this.place && this.place.pos_x && this.place.pos_y),
                cmtNum: this.data.cmt_num,
                'private': !!this['private'],
                escHTML: QZFL.string.escHTML
            };
            var photos = [];
            if (this.isImpEvent || this.isOpTopic) {
                tplData.title = this.getImpTitle();
            }
            switch (this.data.ugc_type) {
                case BLOG:
                    var rich_info = this.data.blog.blog_rich_info;
                    var word_limit = 200;
                    if (rich_info && rich_info.length) {
                        for (var i = 0, o; o = rich_info[i++];) {
                            if (o.type == 1) {
                                photos.push({bUrl: o.lurl, mUrl: o.rurl, sUrl: o.vimg});
                            } else if (o.type == 2 && !tplData.videoUrl) {
                                if (/\.swf/i.test(o.lurl)) {
                                    tplData.videoUrl = 'http://' + siDomain + '/qzone_v6/proj_timeline/img/bg_video_stance.png?max_age=31536000';
                                    this.videoUrl = o.lurl;
                                } else {
                                    tplData.videoUrl = o.lurl;
                                    this.videoUrl = '';
                                }
                            }
                        }
                        tplData.picNum = this.data.blog.total_num || 1;
                        word_limit = 100;
                    }
                    tplData.title = this.data.title + (tplData.title ? ' |' + tplData.title : '');
                    tplData.titleLink = 'http://user.qzone.qq.com/' + get_owner_uin() + '/blog/' + this.data.ugc_id;
                    tplData.otherContent = QZONE.FP.removeUBB(QZFL.string.nl2br(process_url(this.data.content.replace(/</g, '&lt;').replace(/>/g, '&gt;'))));
                    if (tplData.otherContent.length > word_limit) {
                        tplData.otherContent = getValidHtml(QZFL.string.cut(tplData.otherContent, word_limit, '...'));
                    }
                    break;
                case PHOTO:
                    var album_info = this.data.photo_pkg.album,
                        photo_info = this.data.photo_pkg.photos;
                    var title, title_link, content, cmt_num, pic_num;
                    if (photo_info && photo_info.length) {
                        if (photo_info.length == 1 && !album_info.batch_id) {
                            title = photo_info[0].name;
                            title_link = 'http://user.qzone.qq.com/' + get_owner_uin() + '/photo/' + album_info.id + '/' + photo_info[0].large_id;
                            content = photo_info[0].desc;
                            pic_num = 0;
                        } else {
                            title = album_info.name;
                            title_link = 'http://user.qzone.qq.com/' + get_owner_uin() + '/photo/' + album_info.id;
                            content = album_info.desc;
                            pic_num = (album_info.batch_id ? album_info.batch_num : album_info.pic_num) || 1;
                        }
                        cmt_num = photo_info[0].cmt_num;
                        this.photoId = photo_info[0].large_id;
                        this.photoSloc = photo_info[0].small_id;
                    } else {
                        title = album_info.name;
                        title_link = 'http://user.qzone.qq.com/' + get_owner_uin() + '/photo/' + album_info.id;
                        content = album_info.desc;
                        cmt_num = this.data.cmt_num;
                        pic_num = album_info.pic_num || 1;
                    }
                    if (!title) {
                        title = '来自' + ({'1': '手机相册', '13': 'Q拍相册'}[album_info.type] || '空间相册');
                    }
                    this.data.title = title;
                    this.data.content = content;
                    this.data.cmt_num = cmt_num;
                    tplData.title = title + (tplData.title ? ' |' + tplData.title : '');
                    tplData.titleLink = title_link;
                    tplData.otherContent = QZONE.FP.removeUBB(process_url(parse_mention(QZFL.string.trim(content))));
                    tplData.cmtNum = cmt_num;
                    tplData.picNum = pic_num;
                    this.picData = [];
                    if (photo_info && photo_info.length) {
                        for (var i = 0, item; item = photo_info[i++];) {
                            photos.push({bUrl: item.large_url, mUrl: item.middle_url, sUrl: item.small_url});
                            this.picData.push({id: item.large_id, url: item.large_url});
                        }
                    } else {
                        photos.push({
                            bUrl: album_info.big_url,
                            mUrl: album_info.big_url.replace('/b/', '/m/'),
                            sUrl: album_info.cover_url
                        });
                        this.picData.push({id: album_info.cover_id, url: album_info.big_url});
                    }
                    break;
                default:
                    if (this.data.rich_info && this.data.rich_info.length) {
                        this.imageData = [];
                        try {
                            this.data.rich_info.sort(sort_images);
                        } catch (e) {
                        }
                        ;
                        for (var i = 0, o; o = this.data.rich_info[i++];) {
                            if (o.type == 1) {
                                photos.push({bUrl: o.lurl, mUrl: o.lurl.replace('/b/', '/m/'), sUrl: o.vimg});
                                this.imageData.push(o.lurl);
                            } else if (o.type == 3) {
                                tplData.videoUrl = o.vimg;
                                this.videoUrl = o.rurl;
                            }
                        }
                        tplData.picNum = this.data.rich_pic_num || 1;
                    }
                    tplData.moodContent = QZFL.string.trim(QZONE.FP.removeUBB(process_url(parse_mention(this.data.content))));
            }
            tplData.title = QZFL.string.cut(tplData.title, 140 * 2, '...');
            if (photos.length && tplData.videoUrl) {
                tplData.imageAndVideo = true;
            } else if (photos.length) {
                tplData.imageOnly = true;
            } else if (tplData.videoUrl) {
                tplData.videoOnly = true;
            }
            var fullColumn = this.isImpEvent || this.from7year || !!Timeline.UI.act,
                halfColumn = !fullColumn;
            if (tplData.imageAndVideo) {
                if (halfColumn && photos.length >= 4) {
                    tplData.photos = [photos[0].sUrl, photos[1].sUrl, photos[2].sUrl, photos[3].sUrl];
                } else if (fullColumn && photos.length >= 3) {
                    tplData.photos = [photos[0].bUrl, photos[1].mUrl, photos[2].mUrl];
                } else {
                    tplData.photos = [this.isImpEvent ? photos[0].bUrl : photos[0].mUrl];
                }
            } else if (tplData.imageOnly) {
                if (fullColumn && photos.length >= 4) {
                    tplData.photos = [photos[0].bUrl, photos[1].bUrl, photos[2].mUrl, photos[3].mUrl];
                } else if (halfColumn && photos.length >= 3) {
                    tplData.photos = [photos[0].bUrl, photos[1].mUrl, photos[2].mUrl];
                } else {
                    tplData.photos = [photos[0].bUrl];
                }
            }
            tplData.fullColumn = fullColumn;
            tplData.halfColumn = halfColumn;
            if (this.inviter || this.withwho && this.withwho.length) {
                var myself = {
                    uin: get_owner_uin(),
                    name: QZONE.FP.getNickname(),
                    pUrl: QZONE.FP.getPURL(get_owner_uin(), 30)
                };
                if (this.inviter) {
                    tplData.inviter = {
                        uin: this.inviter.uin,
                        name: this.inviter.nick,
                        pUrl: QZONE.FP.getPURL(this.inviter.uin, 30)
                    };
                    tplData.friends.push(myself);
                } else {
                    tplData.inviter = myself;
                }
                for (var i = 0, item; item = this.withwho[i++];) {
                    if (item.uin != tplData.inviter.uin) {
                        tplData.friends.push({uin: item.uin, name: item.nick, pUrl: QZONE.FP.getPURL(item.uin, 30)});
                    }
                }
            }
            var self = this;
            if (Timeline.UI.act && Timeline.UI.act.script && Timeline.UI.act.customizedEventTplName) {
                QZFL.imports(Timeline.UI.act.script, function () {
                    tplData.stype = self.stype;
                    if (Timeline.UI.act.scriptObj.processEventData) {
                        tplData = Timeline.UI.act.scriptObj.processEventData(tplData)
                    }
                    if (tplData.actClassName) {
                        $e(self.panel).addClass(tplData.actClassName);
                    }
                    self.panel.innerHTML = tmpl(TEMPLATE[Timeline.UI.act.customizedEventTplName], tplData);
                    QZFL.css.addClassName(self.panel, 'feed_box_show');
                    cb && cb();
                    self.bindEvents();
                    self.initLoadSteps(1 + 1 + (self.videoUrl ? 1 : 0) + tplData.photos.length);
                    self.initLikeInfo();
                    self.setLunarInfo();
                });
            } else {
                this.panel.innerHTML = tmpl(TEMPLATE.EVENT_TPL, tplData);
                QZFL.css.addClassName(this.panel, 'feed_box_show');
                cb && cb();
                this.bindEvents();
                this.initLoadSteps(1 + 1 + (this.videoUrl ? 1 : 0) + tplData.photos.length);
                this.initLikeInfo();
                this.setLunarInfo();
            }
        },
        bindEvents: function () {
            if (QZONE.FP.getQzoneConfig('isOwner') && !this.readOnly) {
                this.bindHoverEvent();
            }
        },
        updateYMD: function () {
            var date = new Date(this.time);
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.day = date.getDate();
        },
        setLunarInfo: function () {
            if (worker) {
                worker.postMessage({
                    eid: this.id,
                    date: Timeline.utils.getProperDate(new Date(this.time), this.time_accuracy)
                });
            } else {
                $e('#lunar_' + this.id).addClass('lunar' + Timeline.utils.getLunarSpriteId(new Date(this.time), this.time_accuracy));
                this.checkLoaded();
            }
        },
        getImpTitle: function () {
            if (this.isNormalEvent) {
                return '';
            }
            var subtype = this.subtype,
                ext_info = this.data.sp_event.ext_info,
                imp_info, s, arr_ext_info;
            if (this.isImpEvent && !ext_info) {
                subtype = 0;
                ext_info = this.data.sp_event.ext_info = '0%5E%3A' + this.data.sp_event.place;
            }
            if (!/^([^-]+-)?(.*%5E.*%3A.*%7C)*(.*%5E.*%3A.*)$/i.test(ext_info) || this.isOpTopic && !/^([^-]+)-/.test(ext_info)) {
                this.data.sp_event.ext_info = '';
                return '';
            }
            if (this.isOpTopic) {
                s = '【' + ext_info.match(/^([^-]+)-/)[1] + '】';
            } else {
                imp_info = IMP_INFO[this.type];
                s = '【' + imp_info.eventName +
                    (subtype == 0 ? '' : (' - ' + imp_info.subType[subtype].title)) + '】';
            }
            arr_ext_info = ext_info.split('%7C');
            for (var i = 0, item; item = arr_ext_info[i++];) {
                var match = item.match(/(.*)%5E(.*)%3A(.*)/);
                if (match[3]) {
                    s += (match[2] || imp_info.subType[subtype].fieldName[match[1]]) + '：' + match[3] + ' ';
                }
            }
            return s;
        },
        showMap: function (tar) {
            if (!this.place || !this.place.pos_x || !this.place.pos_y) {
                return;
            }
            Timeline.G.showMap(tar, this.place.pos_x, this.place.pos_y, 'PlacePopup_' + this.tipId);
            Timeline.utils.hotClick('Event.location');
        },
        viewPhoto: function (idx) {
            var t = this,
                params;
            var typeHash = {"3": "blog", "2": "photo", "1": "shuoshuo", "0": "timeline"};
            var imgURL;
            var url;
            if (this.data.ugc_type == BLOG) {
                params = ['1', get_owner_uin(), this.data.ugc_id, idx].join(',');
                url = 'http://' + imgcacheDomain + '/qzone/photo/zone/icenter_popup_2012.html#timestamp=0?params=' + QZFL.string.escHTML(params);
            } else if (this.data.ugc_type == PHOTO) {
                params = [get_owner_uin(), this.data.ugc_id, this.picData[idx].id, this.picData[idx].url].join('|');
                url = 'http://' + imgcacheDomain + '/qzone/photo/zone/icenter_popup_2012.html#timestamp=0?params=' + QZFL.string.escHTML(params);
            } else {
                url = '/qzone/photo/zone/icenter_popup_2012.html?params={tid}%7C{uin}%7C{index}#timestamp=0';
                url = format(url, {tid: t.data.ugc_id, uin: get_owner_uin(), index: idx});
                QZONE.FP._t.ENV.set('photoPopupGparam', {
                    from: typeHash[this.data.ugc_type] || "timeline",
                    timeStamp: new Date(),
                    picSrc: t.data.rich_info[idx].vimg
                });
            }
            var live_id = 'slideview';
            QZONE.FP.fullscreenOnLoad(function () {
                var ifr = $('_ifr_' + live_id);
                var appid = ({3: 2, 2: 4, 1: 311, 0: 219})[t.data.ugc_type];
                ifr.G_Param = {'appid': appid, 'x': 100, 'y': 100, 'w': 100, 'h': 100};
                if (ifr.loadTimes = (++ifr.loadTimes || 0)) {
                    _iframe.contentWindow.hashChanged && _iframe.contentWindow.hashChanged(appid);
                }
            });
            QZONE.FP.fullscreenDialog({src: url}, '', live_id);
            PAGE_EVENT.fireEvent('qzMessagePanel.hide');
            Timeline.utils.hotClick('Event.picture');
        },
        playVideo: function () {
            var url = this.videoUrl;
            var playerUrl = url;
            var flashvars = 'playMovie=true&isAutoPlay=true&auto=1&autoPlay=true';
            if (!url) {
                window.open('http://user.qzone.qq.com/' + get_owner_uin() + '/blog/' + this.data.ugc_id, '_blank');
                return;
            }
            if (url.indexOf('vwecam.tc.qq.com') > -1) {
                playerUrl = 'http://qzs.qq.com/qzone/client/photo/swf/MPlayer/Main.swf'
                flashvars = 'vurl=' + encodeURIComponent(url) + '&playMovie=true&isAutoPlay=true&auto=1&autoPlay=true'
            }
            var w = 650;
            var arg = {
                width: w + 'px',
                height: parseInt(w * 3 / 4) + 'px',
                allowScriptAccess: 'never',
                wmode: 'transparent',
                src: QZFL.string.escHTML(playerUrl),
                flashvars: flashvars
            };
            var videoWhiteUrlPattern = /^http:\/\/.+\.(youku\.com|ifeng\.com|tudou\.com|ku6\.com|56\.com|cntv\.cn|qq\.com|pomoho\.com|joy\.cn|boosj\.com|uusee\.com|iqiyi\.com|yinyuetai\.com|umiwi\.com|smgbb\.cn|sina\.com\.cn|letv\.com|m1905\.com|baofeng\.com)\/.+$/ig;
            if (videoWhiteUrlPattern.test(playerUrl)) {
                arg.allowFullScreen = true;
            }
            Timeline.utils.showMaskLayout();
            var flash = QZFL.media.getFlashHtml(arg);
            $('video_wrap').children[0].innerHTML = flash;
            $('video_wrap').style.top = QZFL.dom.getScrollTop() + (QZFL.dom.getClientHeight() - w * 3 / 4) / 2 + 'px';
            $('video_wrap').style.left = QZFL.dom.getScrollLeft() + (QZFL.dom.getClientWidth() - w) / 2 + 'px';
            $('video_wrap').style.display = 'block';
            QZONE.FP.toggleDisplay(false, 'm');
            PAGE_EVENT.fireEvent('qzMessagePanel.hide');
            Timeline.utils.hotClick('Event.video');
        },
        initLikeInfo: function () {
            var key, t = this;
            switch (this.data.ugc_type) {
                case 3:
                    key = 'http://user.qzone.qq.com/' + get_owner_uin() + '/blog/' + this.data.ugc_id;
                    break;
                case 2:
                    key = 'http://user.qzone.qq.com/' + get_owner_uin() + '/photo/' + this.data.ugc_id;
                    if (this.photoId) {
                        key += '/' + this.photoId;
                    }
                    break;
                default:
                    key = 'http://user.qzone.qq.com/' + get_owner_uin() + '/mood/' + this.data.ugc_id + '.1';
            }
            QZONE.FP.addUGCLike($e(this.panel).find('.j_like').elements[0], {from: 1, curKey: key, uniKey: key}, {
                template: {
                    rewriteWithTemplate: {
                        LOADING: '<a href="javascript:void(0)" class="op_zan" title="赞"><i class="ui_ico ico_zan"></i></a>',
                        LIKE_ABLE: '<a href="javascript:void(0)" class="op_zan" title="赞"><i class="ui_ico ico_zan" hottag="Event.like">赞</i><!--(0)--></a>',
                        LIKED: '<a href="javascript:void(0)" class="op_zan" title="赞"><i class="ui_ico ico_zan">赞</i><!--(0)--></a>',
                        CANCEL_ABLE: '<a href="javascript:void(0)" class="op_zan"><i class="ui_ico ico_zan" hottag="Event.unlike">取消赞</i><span hottag="Event.unlike">取消赞</span></a>'
                    }, checkInnerHtml: true, refreshTipBack: function (like_node, like_html) {
                        var $elem = $e(t.panel).find('div.j_like_info');
                        clearTimeout(t._likeTimeoutId);
                        if (like_html) {
                            $elem.setHtml(like_html).show();
                        } else {
                            t._likeTimeoutId = setTimeout(function () {
                                $elem.hide();
                            }, 500);
                        }
                    }
                }
            }, function () {
                t.checkLoaded();
            });
        },
        initUniComment: function () {
            var self = this;
            var appid;
            var topic_id = this.data.ugc_id;
            if (this.data.ugc_type == BLOG || this.data.ugc_type == MOOD) {
                topic_id = get_owner_uin() + '_' + topic_id;
            } else if (this.data.ugc_type == PHOTO && this.photoId) {
                topic_id += '_' + this.photoId;
            }
            var cgi_path, cgi_load_comments, cgi_add_comment, cgi_del_comment, cgi_add_reply, cgi_del_reply;
            switch (this.data.ugc_type) {
                case MOOD:
                    cgi_path = 'http://taotao.qq.com/cgi-bin/';
                    cgi_load_comments = cgi_path + 'emotion_cgi_getcmtreply_v6?need_private_comment=1';
                    cgi_add_comment = cgi_path + 'emotion_cgi_addcomment_ugc';
                    cgi_del_comment = cgi_path + 'emotion_cgi_delcomment_ugc';
                    cgi_add_reply = cgi_path + 'emotion_cgi_addreply_ugc';
                    cgi_del_reply = cgi_path + 'emotion_cgi_delreply_ugc';
                    appid = 311;
                    break;
                case PHOTO:
                    cgi_path = 'http://photo.qq.com/cgi-bin/common/';
                    cgi_load_comments = 'http://app.photo.qq.com/cgi-bin/app/cgi_pcomment_xml_v2?need_private_comment=1';
                    cgi_add_comment = cgi_path + 'cgi_add_piccomment_v2';
                    cgi_del_comment = cgi_path + 'cgi_del_piccomment_v2';
                    cgi_add_reply = cgi_path + 'cgi_add_reply_v2';
                    cgi_del_reply = cgi_path + 'cgi_del_reply_v2';
                    appid = 4;
                    break;
                case BLOG:
                    cgi_path = 'http://' + blog_cgi_prefix + '.qzone.qq.com/cgi-bin/blognew/';
                    cgi_load_comments = cgi_path + 'get_comment_list';
                    cgi_add_comment = cgi_path + 'add_comment';
                    cgi_del_comment = cgi_path + 'del_comment';
                    cgi_add_reply = cgi_path + 'add_reply';
                    cgi_del_reply = cgi_path + 'del_reply';
            }
            j$.load({
                ids: ['/controls/commentModule:3.0:prototype', '/controls/commentModule/viewModel:3.0_common:prototype'],
                onSuccess: function (CommentModule, ViewModel) {
                    var viewModel, extraData = {};
                    if (self.data.ugc_type == PHOTO) {
                        extraData = {
                            extraData: {
                                loadComments: {rnd: Math.random()},
                                postReply: {sloc: self.photoSloc}
                            }
                        };
                    }
                    $('uni_comment_' + self.id).style.display = 'block';
                    var commentModule = self.commentModule = CommentModule.create({
                        dataContext: viewModel = ViewModel.create(QZFL.extend(extraData, {
                            cgiUrls: {
                                loadComments: cgi_load_comments,
                                postComment: cgi_add_comment,
                                removeComment: cgi_del_comment,
                                postReply: cgi_add_reply,
                                removeReply: cgi_del_reply
                            },
                            id: topic_id,
                            hostUin: get_owner_uin(),
                            inCharset: 'utf-8',
                            outCharset: 'utf-8',
                            referer: 'timeline',
                            comments: ViewModel.genComments(),
                            strategy: {
                                isAbleTo: function (action, data) {
                                    var key = 'isAbleTo_' + action;
                                    return key in this ? this[key](data) : true;
                                }, isAbleTo_entopComment: function () {
                                    return false;
                                }, isAbleTo_entopReply: function () {
                                    return false;
                                }, isAbleTo_reportComment: function () {
                                    return false;
                                }, isAbleTo_reportReply: function () {
                                    return false;
                                }, isAbleTo_removeComment: function (comment) {
                                    return QZONE.FP.getQzoneConfig('isOwner') || (self.data.ugc_type == MOOD && comment.getByPath('poster.id') == get_login_uin());
                                }, isAbleTo_removeReply: function (reply) {
                                    return QZONE.FP.getQzoneConfig('isOwner') || (self.data.ugc_type == MOOD && reply.getByPath('poster.id') == get_login_uin());
                                }
                            }
                        })),
                        config: {
                            appid: appid,
                            needInsertImg: 0,
                            commentBoxConfig: {needAsyncStyle: true, needPrivateComment: false}
                        }
                    });
                    viewModel.getComments().addListener('onTotalChanged', function (origin, total) {
                        $e('#cmt_num_' + self.id).setHtml(total ? ('(' + total + ')') : '');
                    });
                    commentModule.renderAt($('uni_comment_' + self.id).children[0]);
                    self.focusCommentBox();
                }
            });
            Timeline.utils.hotClick('Event.comment.' + (this.data.ugc_type || 'unknown'));
        },
        focusCommentBox: function () {
            var self = this;
            this.commentModule.$('commentBox', function (commentBox) {
                $('uni_comment_' + self.id).style.display = 'block';
                commentBox.setVisible(true);
                commentBox.focus();
            });
        },
        remove: function () {
            var t = this;
            var extra_tips = '<br /><span style="color:#999;font-weight:normal;font-size:12px">(若不想让好友自动为我添加时光轴，可在右上角齿轮处设置)</span>';
            QZONE.FP.confirm('温馨提示', '确认要删除吗？' + (this.write_source === FROM_INVITE ? extra_tips : ''), {
                type: 2, height: this.write_source === FROM_INVITE ? 90 : 50, width: 320, okfn: function () {
                    t.doRemove();
                    Timeline.utils.hotClick('Event.confirmDelete');
                }
            });
            PAGE_EVENT.fireEvent('qzMessagePanel.hide');
        },
        doRemove: function () {
            var t = this,
                url = 'http://' + Timeline.CONST.DOMAIN_CGI + '/cgi-bin/' + (Timeline.UI.act && Timeline.UI.act.CGI_DELETE ? Timeline.UI.act.CGI_DELETE : 'time_cgi_delete');
            Timeline.utils.dataSender(url, {
                event_id: this.id,
                etype: this.type,
                user_time: parseInt(this.time / 1000)
            }, function () {
                if ((t.isImpEvent || t.isOpTopic) && Timeline.line.getCurBgImage()) {
                    Timeline.profile.showPageGlobalBg();
                }
                QZONE.FP.showMsgbox('删除成功', Timeline.CONST.MSG_TYPE_SUCC, 1500);
                PAGE_EVENT.fireEvent('onCalendarUpdate', t.year, -1);
                PAGE_EVENT.fireEvent('onRemove', t);
                if (!Timeline.UI.act) {
                    setTimeout(QZFL.bind(t, t.removeMood), 10);
                }
            });
        },
        removeMood: function () {
            if (this.data.ugc_type == 1 && (this.write_source === FROM_TIMELINE || this.write_source === FROM_INVITE)) {
                var url = 'http://taotao.qq.com/cgi-bin/emotion_cgi_delete_v6';
                Timeline.utils.dataSender(url, {
                    tid: this.data.ugc_id,
                    hostuin: get_login_uin(),
                    plattype: 1,
                    t1_source: 1
                }, null, null, {showTips: false});
            }
        },
        setPrivacy: function (no_succ_msg) {
            var t = this,
                url = 'http://' + Timeline.CONST.DOMAIN_CGI + '/cgi-bin/time_cgi_update',
                elems = $e(this.panel).find('.j_permit');
            Timeline.utils.dataSender(url, {
                event_id: this.id,
                user_time: parseInt(this.time / 1000),
                etype: this.type,
                'private': !this['private'] ? 1 : 0,
                update_type_top: Math.pow(2, 5)
            }, function (response) {
                if (response.ret_private == 0) {
                    t['private'] = !t['private'];
                    if (t['private']) {
                        elems.get(0).show();
                        elems.get(1).hide();
                        elems.get(2).show();
                        $e(t.panel).addClass('feed_box_lock');
                        t.deletePrivateFeed();
                    } else {
                        elems.get(0).hide();
                        elems.get(1).show();
                        elems.get(2).hide();
                        $e(t.panel).removeClass('feed_box_lock');
                    }
                } else if (response.ret_private == -22012) {
                    QZONE.FP.confirm('', response.ret_private_msg, {
                        "type": 1,
                        "icontype": "warn",
                        "hastitle": true,
                        "tips": ["确认"],
                        'height': 80,
                        'width': 350
                    });
                } else {
                    QZONE.FP.showMsgbox(response.ret_private_msg || Timeline.CONST.MSG_DEFAULT_TIP, Timeline.CONST.MSG_TYPE_HINT, 1500);
                }
                t.setPrivacyIng = false;
            }, function () {
                t.setPrivacyIng = false;
            });
        },
        deletePrivateFeed: function () {
            if (this.data.ugc_type == 1) {
                var url = 'http://taotao.qq.com/cgi-bin/emotion_cgi_lock';
                Timeline.utils.dataSender(url, {
                    hostuin: get_owner_uin(),
                    tid: this.data.ugc_id,
                    lock: 1,
                    plattype: 1,
                    t1_source: 1,
                    timeline: 1
                }, null, null, {showTips: false});
            }
        },
        getFriendsData: function () {
            var data = {friendData: {}, uinList: [], inviter: 0};
            if (this.inviter) {
                data.friendData[this.inviter.uin] = {
                    uin: this.inviter.uin,
                    name: this.inviter.nick,
                    remark: this.inviter.nick
                };
                data.uinList.push(this.inviter.uin);
                data.inviter = this.inviter.uin;
            }
            if (this.withwho && this.withwho.length) {
                for (var i = 0, item; item = this.withwho[i++];) {
                    data.friendData[item.uin] = {uin: item.uin, name: item.nick, remark: item.nick};
                    data.uinList.push(item.uin);
                }
            }
            if (data.uinList.length === 0) {
                data.friendData = null;
            }
            return data;
        },
        switchToEdit: function () {
            var top = QZFL.dom.getPosition(this.panel).top;
            var friends_data = this.getFriendsData();
            var data = {
                id: this.id,
                type: this['type'],
                'private': !!this['private'],
                content: Timeline.utils.subStringByBytes(QZFL.string.trim(this.data.content) || QZFL.string.trim(this.data.title) || '-', 280, '...'),
                'time': {timestamp: this['time'], accuracy: this.time_accuracy},
                place: {key: this.place.id, name: this.place.name, pos_x: this.place.pos_x, pos_y: this.place.pos_y},
                inviter: friends_data.inviter,
                friendData: friends_data.friendData,
                friendList: friends_data.uinList,
                impData: {
                    subtype: this.subtype,
                    place: this.data.sp_event['place'],
                    extInfo: this.data.sp_event['ext_info'],
                    bgimgName: this.data.sp_event['bgimg_name'],
                    bgimg: this.data.sp_event['bgimg'],
                    bgimgThumb: this.data.sp_event['bgimg_thumb']
                },
                richInfo: this.data.rich_info,
                fullEditMode: this.data.ugc_type == 1
            };
            Timeline.post2.showEditBox(top, data);
        },
        update: function (opt) {
            this.isNormalEvent = this.type > 100;
            this.isImpEvent = this.type < 100;
            this.isOpTopic = this.type == 100;
            this.from7year = this.from7year && this.isOpTopic;
            this.tipId = Math.random().toString().substr(2);
            this.setContent();
            if (opt.oldType) {
                var typeArr = Timeline.CONST.EVENT_TYPE_MAP;
                this.panel.className = ['feed_box', (this.isImpEvent || this.from7year) ? 'one_col' : 'l_col', this.isImpEvent ? IMP_INFO[this.type].differClass : '', this.from7year ? 'feed_7_years' : ''].join(' ');
                QZFL.css.addClassName(this.panel, 'feed_box_show');
            }
            $e(this.panel)[this['private'] ? 'addClass' : 'removeClass']('feed_box_lock');
            if (opt.oldTime) {
                this.updateYMD();
                PAGE_EVENT.fireEvent('onMoveto', this, opt.oldTime);
                log('fireEvent onMoveto: ', new Date(opt.oldTime), ' -> ', new Date(this.time));
            }
            PAGE_EVENT.fireEvent('onHeightChange', this.id);
        }
    });
    normalEvent.parseMention = parse_mention;
    normalEvent.imageLoaded = image_loaded;
    normalEvent.videoPreview = video_preview;
    return normalEvent;
})();
Timeline.EventVisitor = (function () {
    'use strict';
    TEMPLATE.EVENT_VISITOR_TPL = '<div class="box_con"><div class="box_hd"><div class="feed_date"><i class="ui_ico ico_accessLog">访客</i><div class="date_text"><div class="date_days" id="event_visitor_date">&nbsp;</div><h4 class="accessLog_tit">访客记录</h4></div></div></div><div class="box_bd"><ul class="accessLog_list" id="event_visitor_list"><li><p id="event_visitor_tips">很努力地加载中...</p></li></ul><div class="accessLog_more"><a href="http://user.qzone.qq.com/<%=QZONE.FP.getQzoneConfig().ownerUin%>/friends/visitor" target="_blank" hottag="visitor.more">更多访客记录</a></div></div></div>';
    TEMPLATE.EVENT_VISITOR_LI_TPL = '<a href="http://user.qzone.qq.com/<%=escHTML(uin)%>/main?mode=gfp_timeline" target="_blank" class="avatar_wrap"><img src="<%=pUrl%>" alt="<%=escHTML(name)%>" class="avatar" hottag="visitor.avatar" /></a><div class="accessLog_info"><a href="http://user.qzone.qq.com/<%=uin%>/main?mode=gfp_timeline" target="_blank" class="name textoverflow" title="<%=escHTML(name)%>" hottag="visitor.name"><%=escHTML(name)%></a><%=vipIcon%><div class="date"><%=time%></div><a href="javascript:void(0)" onclick="return false" class="close j_remove" hottag="visitor.remove" data-uin="<%=escHTML(uin)%>" data-time="<%=dataTime%>" data-src="<%=dataSrc%>"></a></div>';
    var check = function () {
        return QZONE.FP.getQzoneConfig('loginUin') && !Timeline.core.dataIncomplete();
    };
    var format_time = function (timestamp) {
        var date = new Date(timestamp);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('.') + '&nbsp;' + [Timeline.utils.fixDigit(date.getHours()), Timeline.utils.fixDigit(date.getMinutes())].join(':');
    };
    var report = function (url) {
        var match = url.match(/\/(photo|blog)\/([^\/#\?\s]+)/);
        if (!match) {
            return;
        }
        var cgi = 'http://' + (window.g_Statistic_Domain || 'g.qzone.qq.com') + '/cgi-bin/friendshow/cgi_content_visitor';
        var sender = new QZFL.FormSender(cgi, 'post', {
            uin: QZONE.FP.getQzoneConfig('ownerUin'),
            mod: 10,
            src: 0x10 | ({photo: 0x01, blog: 0x02})[match[1]] | (QZONE.FP.getQzoneConfig('loginUin') ? 0 : 0x40),
            id: match[2]
        }, 'utf-8');
        sender.onSuccess = function (response) {
        };
        sender.send();
    };
    if (!QZONE.FP.getQzoneConfig('isOwner')) {
        QZFL.event.delegate($('event_content'), 'a', 'click', function () {
            report(this.href);
        });
    }
    var mixed;
    PAGE_EVENT.addEvent('eventVisitor.mixData', function (data) {
        var visitor_event_data, pos;
        if (mixed || !check()) {
            return;
        }
        visitor_event_data = {time: 0, id: Timeline.Event.visitorId};
        pos = Math.min(data.event.length, 2);
        if (data.event[pos - 1]) {
            visitor_event_data.time = data.event[pos - 1].time - 1;
        } else {
            visitor_event_data.time = parseInt((new Date).getTime() / 1000);
        }
        data.event.splice(pos, 0, visitor_event_data);
        if (pos == 0) {
            Timeline.UI.createPeriod({year: (new Date).getFullYear(), month: (new Date).getMonth() + 1});
        }
        mixed = true;
    });
    var eventVisitor = Timeline.EventBase.extend({
        show: function (opt) {
            var self = this;
            this.container = $(Timeline.CONST.PREFIX_LIST + this.year + '_' + this.month);
            if (this.shown || !this.container) {
                return;
            }
            this.panel = document.createElement('li');
            this.panel.className = 'feed_box feed_box_accessLog ' + opt.panelClass;
            this.panel.innerHTML = tmpl(TEMPLATE.EVENT_VISITOR_TPL, {});
            this.container.appendChild(this.panel);
            QZFL.css.addClassName(this.panel, 'feed_box_show');
            this.getData(function (data) {
                self.renderList(data);
                PAGE_EVENT.fireEvent('onEventLoaded', self.id);
            }, function (data) {
                $e('#event_visitor_tips').setHtml(data.message);
                PAGE_EVENT.fireEvent('onEventLoaded', self.id);
            });
            this.bindEvents();
            this._super();
        },
        bindEvents: function () {
            var self = this;
            var qzone_config = QZONE.FP.getQzoneConfig();
            QZFL.event.delegate(this.panel, 'li', 'mouseenter', function () {
                if (qzone_config.isOwner || (qzone_config.loginUin == this.getAttribute('data-uin'))) {
                    QZFL.css.addClassName(this, 'hover');
                }
            });
            QZFL.event.delegate(this.panel, 'li', 'mouseleave', function () {
                QZFL.css.removeClassName(this, 'hover');
            });
            QZFL.event.delegate(this.panel, 'a.j_remove', 'click', function () {
                self.removeRecord(this);
            });
        },
        getData: function (callback, error_callback) {
            var url = 'https://h5s.qzone.qq.com/proxy/domain/' + (window.g_Statistic_Domain || 'g.qzone.qq.com') + '/cgi-bin/friendshow/cgi_get_visitor_simple';
            Timeline.utils.dataLoader(url, {
                uin: QZONE.FP.getQzoneConfig('ownerUin'),
                clear: 1,
                mask: 3,
                mod: 10,
                key: 'visitto_items',
                fupdate: 1
            }, callback, error_callback);
        },
        renderList: function (data) {
            var items, me, yellow, src, qzone_config;
            items = data.items;
            qzone_config = QZONE.FP.getQzoneConfig();
            if (!items.length) {
                $e('#event_visitor_tips').setHtml('暂无访客记录');
                return;
            }
            $e('#event_visitor_date').setHtml(Timeline.utils.timestampToText(items[0].time * 1000).dateText);
            var doc_frag = document.createDocumentFragment();
            for (var i = 0, item; i < 10 && (item = items[i++]);) {
                var li = document.createElement('li');
                li.setAttribute('data-uin', item.uin);
                li.innerHTML = tmpl(TEMPLATE.EVENT_VISITOR_LI_TPL, {
                    uin: item.uin,
                    name: QZFL.string.restXHTML(item.name),
                    time: format_time(item.time * 1000),
                    dataTime: item.time,
                    dataSrc: item.src,
                    pUrl: QZONE.FP.getPURL(item.uin, 30),
                    vipIcon: QZONE.FP.getVipHTML({lv: item.yellow, isSuper: item.supervip}, 's'),
                    escHtml: QZFL.string.escHTML
                });
                doc_frag.appendChild(li);
            }
            $('event_visitor_tips').parentNode.style.display = 'none';
            $('event_visitor_list').appendChild(doc_frag);
        },
        removeRecord: function (target) {
            var url = 'http://w.qzone.qq.com/cgi-bin/tfriend/friendshow_hide_visitor_onelogin';
            var sender = new QZFL.FormSender(url, 'post', {
                vuin: target.getAttribute('data-uin'),
                huin: QZONE.FP.getQzoneConfig('ownerUin'),
                type: 3,
                src: 0x10 | +(target.getAttribute('data-src')),
                vistor_time: target.getAttribute('data-time')
            }, 'utf-8');
            sender.onSuccess = function (response) {
                if (response && response.ret == 0) {
                    $('event_visitor_list').removeChild(target.parentNode.parentNode);
                    if ($('event_visitor_list').children.length == 1) {
                        $('event_visitor_tips').innerHTML = '暂无访客记录';
                        $('event_visitor_tips').parentNode.style.display = '';
                    }
                    QZONE.FP.showMsgbox('删除成功~', Timeline.CONST.MSG_TYPE_SUCC, 2000);
                } else {
                    QZONE.FP.showMsgbox(response.msg || Timeline.CONST.MSG_DEFAULT_TIP, Timeline.CONST.MSG_TYPE_HINT, 2000);
                }
            };
            sender.onError = function () {
                QZONE.FP.showMsgbox(Timeline.CONST.MSG_DEFAULT_TIP, Timeline.CONST.MSG_TYPE_HINT, 2000);
            };
            sender.send();
        }
    });
    return eventVisitor;
})();

function getQbossData() {
    if (g_PreData.qbossData && g_PreData.qbossData[2187]) {
        var qbossData, strContent, iserr;
        strContent = g_PreData.qbossData[2187].res_data;
        try {
            qbossData = (window.JSON && JSON.parse) ? JSON.parse(strContent) : (new Function("return (" + strContent + ");"))();
        } catch (err) {
            iserr = true;
        }
        if (!iserr) {
            var arr = qbossData.appid.split('-'),
                appidFlag = false;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "219") {
                    appidFlag = true;
                    break;
                }
            }
            if (appidFlag) {
                var html = ["<div style='float:left;margin-top:-7px;line-height:35px;'>", qbossData.text, "</div>", " <a class='c_tx'  target='_blank' href='", qbossData.jumpurl, "'>点击跳转</a>"].join('');
                QZONE.space.showTips(html, null, false);
            }
        }
    }
}
getQbossData();
