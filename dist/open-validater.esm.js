/* open-validater v1.0.0 */
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var _validater;
/**
 * 表单验证插件
*/
var validater = /*#__PURE__*/function () {
  function validater() {
    _classCallCheck(this, validater);
  }
  return _createClass(validater, null, [{
    key: "addRule",
    value:
    // 添加自定义规则
    function addRule(rule) {
      // 判断是否有规则名和规则入口函数
      if (typeof rule.name !== 'string' || typeof rule.handle !== 'function') return false;
      // 定义当前路由对象
      var itemRule = {};
      // 添加路由信息到路由对象
      itemRule[rule.name] = rule.handle;
      // 整合路由规则到内置规则中
      validater.rules = _objectSpread2(_objectSpread2({}, validater.rules), itemRule);
    }

    /**
     * 验证单个字段
     * @param rule: 单个验证对象
     * @param fn:function 回调函数
    */
  }, {
    key: "test",
    value: function test(rule, fn) {
      return new Promise(function (j, r) {
        // 验证格式是否正确
        _check.call(validater, rule).then(function (res) {
          if (res.status) {
            // 判断验证结果标识符
            var mark = true;

            // 验证返回信息
            var result = {
              status: true,
              name: rule.name || '',
              message: '验证通过'
            };

            // 获取验证目标字段值
            var value = rule.value;

            // 获取验证目标配置的规则
            var currentRules = rule.rules;

            // 循环验证规则
            for (var key in currentRules) {
              // 当前字段如果没有设置required规则，只有在值存在的情况再验证
              if (!currentRules["required"] && value && !validater.rules[key](value)) {
                result.status = false;
                result.message = currentRules[key];
                mark = false;
                break;
              }

              // 当前验证规则是required，直接验证
              if (key == "required" && !validater.rules[key](value)) {
                result.status = false;
                result.message = currentRules[key];
                mark = false;
                break;
              }
            }
            if (!mark) {
              // 自动更新错误提示
              if (rule.error && Object.prototype.toString.call(rule.error) == '[object Object]') {
                // 更新错误提示文本到dom
                if (rule.error.message) {
                  var errorElem = document.querySelector(rule.error.message.id);
                  if (errorElem) {
                    errorElem.innerText = result.message;
                  }
                  if (errorElem && item.error.message["class"]) {
                    errorElem.classList.add(item.error.message["class"]);
                  }
                }

                // 更新input框样式
                if (item.error.input) {
                  var inputElem = document.querySelector(item.error.input.id);
                  if (inputElem && item.error.input["class"]) {
                    inputElem.classList.add(item.error.input["class"]);
                  }

                  // 输入框聚焦
                  inputElem.focus();
                }
              }
            } else {
              // 清空错误提示信息
              if (item.error.message) {
                var _errorElem = document.querySelector(item.error.message.id);
                if (_errorElem) {
                  _errorElem.innerText = '';
                }
                if (_errorElem && _errorElem.classList.contains(item.error.message["class"])) {
                  _errorElem.classList.remove(item.error.message["class"]);
                }
              }

              // 清空input框样式
              if (item.error.input) {
                var _inputElem = document.querySelector(item.error.input.id);
                if (_inputElem && _inputElem.classList.contains(item.error.input["class"])) {
                  _inputElem.classList.remove(item.error.input["class"]);
                }
              }
            }
            if (typeof fn === 'function') {
              fn(result);
            }
            j(result);
          }
        });
      });
    }

    /**
     * 验证多个字段
     * @param rule: array批量验证数组
     * @param fn:function 回调函数
    */
  }, {
    key: "tests",
    value: function tests(rules, fn) {
      return new Promise(function (j, r) {
        // 判断验证结果标识符
        var mark = true;

        // 验证返回信息
        var result = {
          status: true,
          name: '',
          message: '验证通过'
        };
        for (var i = 0; i < rules.length; i++) {
          // 当前数据
          var _item = rules[i];

          // 获取验证目标字段值
          var value = _item.value;

          // 获取验证目标配置的规则
          var currentRules = _item.rules;

          // 赋值当前验证字段到返回对象
          result.name = _item.name;
          for (var key in currentRules) {
            // 当前字段如果没有设置required规则，只有在值存在的情况再验证
            if (!currentRules["required"] && value && !validater.rules[key](value)) {
              result.status = false;
              result.message = currentRules[key];
              mark = false;
              break;
            }

            // 当前验证规则是required，直接验证
            if (key == "required" && !validater.rules[key](value)) {
              result.status = false;
              result.message = currentRules[key];
              mark = false;
              break;
            }
          }
          if (!mark) {
            // 自动更新错误提示
            if (_item.error && Object.prototype.toString.call(_item.error) == '[object Object]') {
              // 更新错误提示文本到dom
              if (_item.error.message) {
                var errorElem = document.querySelector(_item.error.message.id);
                if (errorElem) {
                  errorElem.innerText = result.message;
                }
                if (errorElem && _item.error.message["class"]) {
                  errorElem.classList.add(_item.error.message["class"]);
                }
              }
              // 更新input框样式
              if (_item.error.input) {
                var inputElem = document.querySelector(_item.error.input.id);
                if (inputElem && _item.error.input["class"]) {
                  inputElem.classList.add(_item.error.input["class"]);
                }

                // 输入框聚焦
                inputElem.focus();
              }
            }
            break;
          } else {
            // 清空错误提示信息
            if (_item.error.message) {
              var _errorElem2 = document.querySelector(_item.error.message.id);
              if (_errorElem2) {
                _errorElem2.innerText = '';
              }
              if (_errorElem2 && _errorElem2.classList.contains(_item.error.message["class"])) {
                _errorElem2.classList.remove(_item.error.message["class"]);
              }
            }

            // 清空input框样式
            if (_item.error.input) {
              var _inputElem2 = document.querySelector(_item.error.input.id);
              if (_inputElem2 && _inputElem2.classList.contains(_item.error.input["class"])) {
                _inputElem2.classList.remove(_item.error.input["class"]);
              }
            }
          }
        }
        if (typeof fn === 'function') {
          fn(result);
        }
        j(result);
      });
    }

    // 验证单字段参数格式是否正确
  }]);
}();
_validater = validater;
// 验证结果转换
function _isTure(condition) {
  return !condition ? false : true;
}
function _check(rule) {
  return new Promise(function (j, r) {
    // 判断rule参数是不是对象格式
    var result = _checkObject.call(_validater, rule, '验证规则参数必须是object,当前参数类型不正确');
    if (!result.status) {
      j(result);
    }
    // 判断是否含有name和rules
    if (typeof rule.name !== 'string' || !_checkObject.call(_validater, rule.rules).status) {
      j({
        result: false,
        message: '验证规则对象必须包含name属性和rules属性'
      });
    }
    j({
      status: true
    });
  });
}
// 检测参数是否是对象
function _checkObject(rule, warn, message) {
  // 判断类型
  var check = Object.prototype.toString.call(rule) == '[object Object]';
  // 返回结果
  var result = {
    status: true,
    message: message
  };
  if (!check) result.status = false;
  return result;
}
// 插件描述
_defineProperty(validater, "name", "validater");
_defineProperty(validater, "author", "kaijian");
_defineProperty(validater, "version", "v1.0.0");
_defineProperty(validater, "description", "基于js开发的表达验证插件");
_defineProperty(validater, "date", "2024-06-12");
// 内置验证规则
_defineProperty(validater, "rules", {
  // 检查值是否为空
  required: function required(value) {
    var result = value == '' || value == undefined || value == null;
    return !_isTure.call(_validater, result);
  },
  // 检查值是否是手机号
  phone: function phone(value) {
    var checkValue = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  // 检查值是否是网址
  http: function http(value) {
    var checkValue = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  // 检查值是否是邮箱
  email: function email(value) {
    var checkValue = /^\w+([  -+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查值是否是中文
  string: function string(value) {
    var checkValue = /^[\u4e00-\u9fa5]*$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查字符串是否是中文或英文或中文+英文,没有值则不判断
  strEng: function strEng(value) {
    var checkValue = /^[\u4e00-\u9fa5a-zA-Z]*$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查字符串是否是中文或英文或中文+英文+数字，没有值则不判断
  strEngInt: function strEngInt(value) {
    var checkValue = /^[\u4e00-\u9fa5a-zA-Z0-9]*$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查字符串是否是英文或数字
  engAndInt: function engAndInt(value) {
    var checkValue = /^[a-zA-Z0-9]*$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查字符串是否是英文,数字
  engInt: function engInt(value) {
    var checkValue = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/; //6至20位，以字母开头，字母，数字，减号，下划线
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查电话号码座机
  tel: function tel(value) {
    var checkValue = /^\d{3}-\d{8}|\d{4}-\d{7,8}/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查字符串是否有特殊符号（是返回false，否返回true）
  symbol: function symbol(value) {
    var checkValue = /[`~!@#$^&*()《》=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    return _isTure.call(_validater, checkValue.test(value));
  },
  //检查密码是否格式正确(8-16位+字母+特殊符号+数字)
  password: function password(value) {
    var checkValue = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  // 检查文本
  text: function text(value) {
    var checkValue = /^[\u4e00-\u9fa5a-zA-Z0-9,.!?:，。？！]*$/;
    return _isTure.call(_validater, checkValue.test(value));
  },
  // 检查整数格式
  "int": function int(value) {
    var checkValue = /^[0-9]*$/g;
    return _isTure.call(_validater, checkValue.test(value));
  }
});

// src/main.js

export { validater as default };
//# sourceMappingURL=open-validater.esm.js.map
