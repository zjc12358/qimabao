var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import moment from 'moment';
export function fixedZero(val) {
    return val * 1 < 10 ? "0" + val : val;
}
export function getTimeDistance(type) {
    var now = new Date();
    var oneDay = 1000 * 60 * 60 * 24;
    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }
    if (type === 'week') {
        var day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        if (day === 0) {
            day = 6;
        }
        else {
            day -= 1;
        }
        var beginTime = now.getTime() - day * oneDay;
        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }
    if (type === 'month') {
        var year = now.getFullYear();
        var month = now.getMonth();
        var nextDate = moment(now).add(1, 'months');
        var nextYear = nextDate.year();
        var nextMonth = nextDate.month();
        return [
            moment(year + "-" + fixedZero(month + 1) + "-01 00:00:00"),
            moment(moment(nextYear + "-" + fixedZero(nextMonth + 1) + "-01 00:00:00").valueOf() - 1000)
        ];
    }
    if (type === 'year') {
        var year = now.getFullYear();
        return [moment(year + "-01-01 00:00:00"), moment(year + "-12-31 23:59:59")];
    }
}
export function getPlainNode(nodeList, parentPath) {
    if (parentPath === void 0) { parentPath = ''; }
    var arr = [];
    nodeList.forEach(function (node) {
        var item = node;
        item.path = (parentPath + "/" + (item.path || '')).replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push.apply(arr, getPlainNode(item.children, item.path));
        }
        else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}
export function digitUppercase(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var num = Math.abs(n);
    var s = '';
    fraction.forEach(function (item, index) {
        s += (digit[Math.floor(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (var i = 0; i < unit[0].length && num > 0; i += 1) {
        var p = '';
        for (var j = 0; j < unit[1].length && num > 0; j += 1) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s
        .replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}
function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn('Two path are equal!'); // eslint-disable-line
    }
    var arr1 = str1.split('/');
    var arr2 = str2.split('/');
    if (arr2.every(function (item, index) { return item === arr1[index]; })) {
        return 1;
    }
    else if (arr1.every(function (item, index) { return item === arr2[index]; })) {
        return 2;
    }
    return 3;
}
function getRenderArr(routes) {
    var renderArr = [];
    renderArr.push(routes[0]);
    var _loop_1 = function (i) {
        var isAdd = false;
        // 是否包含
        isAdd = renderArr.every(function (item) { return getRelation(item, routes[i]) === 3; });
        // 去重
        renderArr = renderArr.filter(function (item) { return getRelation(item, routes[i]) !== 1; });
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    };
    for (var i = 1; i < routes.length; i += 1) {
        _loop_1(i);
    }
    return renderArr;
}
/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    var routes = Object.keys(routerData).filter(function (routePath) { return routePath.indexOf(path) === 0 && routePath !== path; });
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(function (item) { return item.replace(path, ''); });
    // Get the route to be rendered to remove the deep rendering
    var renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    var renderRoutes = renderArr.map(function (item) {
        var exact = !routes.some(function (route) { return route !== item && getRelation(route, item) === 1; });
        return __assign({ exact: exact }, routerData["" + path + item], { key: "" + path + item, path: "" + path + item });
    });
    return renderRoutes;
}
/* eslint no-useless-escape:0 */
var reg = /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/g;
export function isUrl(path) {
    return reg.test(path);
}
//# sourceMappingURL=utils.js.map