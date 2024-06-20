# validater

表单验证工具函数库

[open-validater在线使用文档](https://validater.openteam.site)

## 安装

```html
<script src="open-validater.js"></script>
```

## 使用

验证单个值

```js
// 模拟表单数据
let data = {
    name: 'name'
}

// 配置规则 
let rule = {
    name: 'name', // 当前验证值的属性名
    value: data.name, // 当前需要验证的值
    // 配置验证规则
    rules: {
        required: '名字不能为空',  // 验证规则和对应错误提示信息
        string: '名字类型为字符串' // 验证规则和对应错误提示信息
    },
    // 配置错误信息，可忽略，非必填
    error:{
        // 文本操作
        message: {
            id: '#id', // 如需输入框下面显示错误文本，添加显示元素id
            class: "className" // 显示元素class，如果自定义样式，可不写
        },
        // 输入框操作
        input:{
            id: '#id', // 输入框id
            class: "className" // 错误时如需修改输入框样式，则添加对应class样式名
        }
    }
}

// primose方式验证
validater.test(rule).then(res=>{
    console.log(res)

     // 验证通过返回值
    // { 
    //  status: true,
    //  name: 'name',
    //  message: '验证通过'
    // }

    // 验证不通过返回值
    // { 
    //  status: false,
    //  name: 'name',
    //  message: '自定义错误提示信息'
    // }
})

// 回调方式验证
validater.test(rule,(res)=>{
    console.log(res)

     // 验证通过返回值
    // { 
    //  status: true,
    //  name: 'name',
    //  message: '验证通过'
    // }

    // 验证不通过返回值
    // { 
    //  status: false,
    //  name: 'name',
    //  message: '自定义错误提示信息'
    // }
})
```

多个字段批量验证

```js
// 模拟表单数据
let data = {
    name: 'name',
    password: 'password'
}

// 配置验证规则
let rules = [
    {
        name: 'name', // 当前验证值的属性名
        value: data.name, // 当前需要验证的值
        // 配置验证规则
        rules: {
            required: '名字不能为空',  // 验证规则和对应错误提示信息
            string: '名字类型为字符串' // 验证规则和对应错误提示信息
        },
        // 配置错误信息，可忽略，非必填
        error:{
            // 文本操作
            message: {
                id: '#id', // 如需输入框下面显示错误文本，添加显示元素id
                class: "className" // 显示元素class，如果自定义样式，可不写
            },
            // 输入框操作
            input:{
                id: '#id', // 输入框id
                class: "className" // 错误时如需修改输入框样式，则添加对应class样式名
            }
        }
    },
    {
        name: 'password', // 当前验证值的属性名
        value: data.password, // 当前需要验证的值
        // 配置验证规则
        rules: {
            required: '密码不能为空',  // 验证规则和对应错误提示信息
            password: '密码格式不对' // 验证规则和对应错误提示信息
        },
        // 配置错误信息，可忽略，非必填
        error:{
            // 文本操作
            message: {
                id: '#id', // 如需输入框下面显示错误文本，添加显示元素id
                class: "className" // 显示元素class，如果自定义样式，可不写
            },
            // 输入框操作
            input:{
                id: '#id', // 输入框id
                class: "className" // 错误时如需修改输入框样式，则添加对应class样式名
            }
        }
    },
]

// primose方式验证
validater.tests(rules).then(res=>{
    console.log(res)

     // 验证通过返回值
    // { 
    //  status: true,
    //  name: 'name',
    //  message: '验证通过'
    // }

    // 验证不通过返回值
    // { 
    //  status: false,
    //  name: 'name',
    //  message: '自定义错误提示信息'
    // }
})

// 回调方式验证
validater.tests(rules,(res)=>{
    console.log(res)

     // 验证通过返回值
    // { 
    //  status: true,
    //  name: 'name',
    //  message: '验证通过'
    // }

    // 验证不通过返回值
    // { 
    //  status: false,
    //  name: 'name',
    //  message: '自定义错误提示信息'
    // }
})
```

添加自定义验证规则
（自定义规则一定要添加到验证函数前面）

```js
// 添加验证规则
validater.addRule({
    name: "ruleName", // 规则名
    handle: function(value){

        // 验证逻辑

        // 验证值，返回true或false
        return boolean;
    }
})
```

使用自定义规则

```js
// 模拟表单数据
let data = {
    value: 2
}

// 配置规则 
let rule = {
    name: 'value',
    value: data.value,
    rules: {
        one: '抱歉当前值不等于1',// 使用规则one
    }
}

// promise方式验证
validater.test(rule).then(res=>{
    console.log(res);

    // 验证通过返回值
    // { 
    //  status: true,
    //  name: 'value',
    //  message: '验证通过'
    // }

    // 验证不通过返回值
    // { 
    //  status: false,
    //  name: 'value',
    //  message: '抱歉当前值不等于1'
    // }
})


// 回调方式验证
validater.test(rule,(res)=>{
    console.log(res)

     // 验证通过返回值
    // { 
    //  status: true,
    //  name: 'name',
    //  message: '验证通过'
    // }

    // 验证不通过返回值
    // { 
    //  status: false,
    //  name: 'name',
    //  message: '自定义错误提示信息'
    // }
})
```

## API

| 名称                     | 描述        |
| ---------------------- | --------- |
| validater.test(rule)    | 验证单个值     |
| validater.tests(rules)  | 批量验证多个值   |
| validater.addRule(rule) | 添加自定义验证规则 |

### 规则属性

| 名称                     | 描述        |
| ---------------------- | --------- |
| rule.name    | 对应表单的name名     |
| rule.value  | 对应表单的name字段值   |
| rule.rules | 添加验证规则 |
| rule.error | 验证失败后的操作 |

```js
let rule = {
    name: 'name', // 当前验证字段对应表单的name名
    value: value,// 当前验证值对应表单的name名获取的值
    // 当前字段的验证规则
    rules: {
        required: '名字不能为空', // @attr:对应规则名，@attr-value: 错误时提示信息
    },
    // 报错处理
    error:{
        // 报错提示文本
        message: {
            id: "显示提示信息的元素id",
            class: "元素的样式名",//class暂时未处理
        },
        // 输入框操作
        input:{
            id: "输入框id",
            class: "添加输入框样式" //class暂时未处理
        }
    }
}
```