//将时间戳转换成正常时间格式
export function timestampToTime(timestamp) {
  var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  let time =
    year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
  return time;
}
