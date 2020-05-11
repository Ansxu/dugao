
// 更改时间格式
// type:'date'--返回日期；'time'--返回日期+时间; 's'--日期+时间+秒
export function editTime(time, type = 'date') {
    let newTime = ''
    if (type === 'time') {
      console.log(time,'editTime')
      newTime = time.substr(0, time.lastIndexOf(':'))
      newTime = newTime.replace('T', ' ')
    }
    if (type === "date") {
      newTime = time.substr(0, time.lastIndexOf('T'))
    }
    if (type === "s") {
      newTime = time.substr(0, time.lastIndexOf('.'))
      newTime = newTime.replace('T', ' ')
    }
    return newTime;
}

// 时间格式化工具
export function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}
  
export function formatTime(date) {
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()

const t1 = [year, month, day].map(formatNumber).join('/')
const t2 = [hour, minute, second].map(formatNumber).join(':')

return `${t1} ${t2}`
}
  
//   JS获取距当前时间差
export let dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,//1000 * 24 * 60 * 60
		'小时': 3600000,//1000 * 60 * 60
		'分钟': 60000,//1000 * 60
		'秒': 1000
    },
    // milliseconds--时间戳
	humanize: function (milliseconds) {
        console.log(this.UNITS)
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDay()) + ' ' +
			_format(date.getHours()) + ':' + _format(date.getMinutes())+':'+_format(date.getSeconds());
	},
  parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
// 时间差，输入的时间距离现在时间差，输出''天''小时''分钟''秒
export function timeDiff(time) {
  var diff = '';
  var time_diff = new Date().getTime() - time;
  // 计算相差天数  
  var days = Math.floor(time_diff / (24 * 3600 * 1000));
  if (days > 0) {
    return diff += days + '天';
  }
  // 计算相差小时数  
  var leave1 = time_diff % (24 * 3600 * 1000);
  var hours = Math.floor(leave1 / (3600 * 1000));
  if (hours > 0) {
    return diff += hours + '小时';
  } else {
    if (diff !== '') {
      return diff += hours + '小时';
    }
  }
  // 计算相差分钟数  
  var leave2 = leave1 % (3600 * 1000);
  var minutes = Math.floor(leave2 / (60 * 1000));
  if (minutes > 0) {
    return diff += minutes + '分钟';
  } else {
    if (diff !== '') {
      return diff += minutes + '分钟';
    }
  }
  // 计算相差秒数  
  var leave3 = leave2 % (60 * 1000);
  var seconds = Math.round(leave3 / 1000);
  if (seconds == 0) {
    return diff = '刚刚';
  } else if (seconds > 0) {
    return diff += seconds + '秒';
  } else {
    if (diff !== '') {
      return diff += seconds + '秒';
    }
  }

  return diff;
}

