# validater

表单验证工具函数库

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
    name: 'name',
    value: data.name,
    rules: {
        required: '名字不能为空',
        string: '名字类型为字符串'
    },
    error:{
        message: {
            id: '#text-error',
            class: "显示的样式"
        },
           input:{
            id: '#input',
            class: "错误时input框的样式"
        }
    }
}

// primose方式
validater.test(rule).then(res=>{
    console.log(res)
})

// 回调方式
validater.test(rule,(res)=>{
    console.log(res)
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
        name: 'name',
        value: data.name,
        rules: {
            required: '名字不能为空'
        },
        error: {
            // 配置报错提示文本
            message: {
                id: '#text-error',
                class: "color:var(--color-danger-2)"
            },
            // 配置报错input框的样式
               input:{
                id: '#text-input',
                class: "border-color:var(--color-danger-2)"
            }, 
        }
    },
    {
        name: 'password',
        value: data.password,
        rules: {
            required: '密码不能为空',
            password: '密码格式不对'
        },
        error: {

        }
    },
]

// promise方式
validater.tests(rules).then(res=>{
    console.log(res)
})


// 回调方式
validater.tests(rules,res=>{
    console.log(res)
})
```

添加自定义验证规则
（自定义规则一定要添加到验证函数前面）

```js
// 添加验证规则
validater.addRule({
    name: "规则名",
    handle: function(value){
        // 验证值，返回false
        return false;
    }
})
```

使用自定义规则

```js
// 添加值是否等于englist验证规则
validater.addRule({
    name: "english",
    handle: function(value){
        // 验证值，返回false
        return value !== 'englist';
    }
})


// 模拟表单数据
let data = {
    name: 'name'
}

// 配置规则 
let rule = {
    name: 'name',
    value: data.name,
    rules: {
        englist: '这个是自定义的验证规则',
    }
}

// 验证
validater.test(rule).then(res=>{
    console.log(res)
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
            class: "元素的样式名",
        },
        // 输入框操作
        input:{
            id: "输入框id",
            class: "添加输入框样式"
        }
    }
}
```