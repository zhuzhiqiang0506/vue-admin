/**
 * 过滤特殊字符
 * @param str
 * @returns {string}
 */

export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—| {}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validataEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(value);
}

/**
 * 验证密码 6-20字母加数字
 - */

export function validataPass(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(value);
}

/**
 * 验证验证码
 * @param value
 * @returns {boolean}
 */
export function validataCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return reg.test(value);
}

/**
 * 没有使用 default 可以声明多个export
 * 文件 improt 需要花括号
 */
