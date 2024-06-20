/**
 * 表单验证插件
*/
class validater{

	// 插件描述
	static name = "validater";
	static author = "kaijian";
	static version = "v1.0.0";
	static description = "基于js开发的表达验证插件";
	static date = "2024-06-12";

	// 验证结果转换
	static #isTure (condition){
		return !condition ? false : true;
	}

	// 内置验证规则
	static rules = {
	    // 检查值是否为空
	    required: (value) =>{ 
	    	let result = value == '' || value == undefined || value == null;
	    	return !validater.#isTure(result);
	    },
	    // 检查值是否是手机号
	    phone: (value) =>{
	        const checkValue = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    // 检查值是否是网址
	    http:  (value) =>{
	        const checkValue = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    // 检查值是否是邮箱
	    email:  (value) =>{
	        const checkValue = /^\w+([  -+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查值是否是中文
	    string: (value) =>{
	        const checkValue = /^[\u4e00-\u9fa5]*$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查字符串是否是中文或英文或中文+英文,没有值则不判断
	    strEng: (value) =>{
	        const checkValue = /^[\u4e00-\u9fa5a-zA-Z]*$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查字符串是否是中文或英文或中文+英文+数字，没有值则不判断
	    strEngInt: (value)=>{
	        const checkValue = /^[\u4e00-\u9fa5a-zA-Z0-9]*$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查字符串是否是英文或数字
	    engAndInt: (value) =>{
	        const checkValue = /^[a-zA-Z0-9]*$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查字符串是否是英文,数字
	    engInt: ( value ) => {
	        const checkValue = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;//6至20位，以字母开头，字母，数字，减号，下划线
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查电话号码座机
	    tel: (value) => {
	        const checkValue = /^\d{3}-\d{8}|\d{4}-\d{7,8}/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查字符串是否有特殊符号（是返回false，否返回true）
	    symbol : (value) => {
	        const checkValue = /[`~!@#$^&*()《》=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
	        return validater.#isTure(checkValue.test(value));
	    },
	    //检查密码是否格式正确(8-16位+字母+特殊符号+数字)
	    password: ( value ) => {
	        const checkValue = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    // 检查文本
	    text: ( value ) => {
	        const checkValue = /^[\u4e00-\u9fa5a-zA-Z0-9,.!?:，。？！]*$/;
	        return validater.#isTure(checkValue.test(value));
	    },
	    // 检查整数格式
	    int: ( value ) => {
	        const checkValue = /^[0-9]*$/g;
	        return validater.#isTure(checkValue.test(value));
	    }
	}

	// 添加自定义规则
    static addRule(rule){
        // 判断是否有规则名和规则入口函数
        if(typeof rule.name !== 'string' || typeof rule.handle !== 'function' ) return false;
        // 定义当前路由对象
        let itemRule = {};
        // 添加路由信息到路由对象
        itemRule[rule.name] = rule.handle;
        // 整合路由规则到内置规则中
        validater.rules = { ...validater.rules,...itemRule};
    }

    /**
     * 验证单个字段
     * @param rule: 单个验证对象
     * @param fn:function 回调函数
    */
    static test(rule,fn){
        return new Promise((j,r)=>{
            
            // 验证格式是否正确
            validater.#check(rule).then(res=>{

                if(res.status){

                	// 判断验证结果标识符
		            let mark = true;

		        	// 验证返回信息
		            let result = {
		            	status: true,
		            	name: rule.name || '',
		            	message: '验证通过'
		            };

                    // 获取验证目标字段值
                    let value = rule.value;

                    // 获取验证目标配置的规则
                    let currentRules = rule.rules;
                    
                    // 循环验证规则
                    for( let key in currentRules){

                    	// 当前字段如果没有设置required规则，只有在值存在的情况再验证
	                    if(!currentRules["required"] && value && !validater.rules[key](value)){
	                        result.status = false;
	                        result.message = currentRules[key];
	                        mark = false;
	                        break;
	                    }

	                    // 当前字段如果有设置required规则，直接验证
	                    if(currentRules["required"] && !validater.rules[key](value)){
	                        result.status = false;
	                        result.message = currentRules[key];
	                        mark = false;
	                        break;
	                    }

	                    // 默认有值就验证
	                    if(value && !validater.rules[key](value)){
	                        result.status = false;
	                        result.message = currentRules[key];
	                        mark = false;
	                        break;
	                    }
                    }

                 	if(!mark){
                    	// 自动更新错误提示
                    	if(rule.error && Object.prototype.toString.call(rule.error) == '[object Object]'){
                    		// 更新错误提示文本到dom
                    		if(rule.error.message){

                    			let errorElem = document.querySelector(rule.error.message.id);

	                    		if(errorElem){
	                    			errorElem.innerText = result.message;
	                    		}

	                    		if(errorElem && rule.error.message.class){
			            			errorElem.classList.add(rule.error.message.class);
			            		}
                    		}

                    		// 更新input框样式
			        		if(rule.error.input){
			        			let inputElem = document.querySelector(rule.error.input.id);

			            		if(inputElem && rule.error.input.class){
			            			inputElem.classList.add(rule.error.input.class);
			            		}

			            		// 输入框聚焦
			            		inputElem.focus();
			        		}
                    	}
                    }else{

                    	// 清空错误提示信息
		        		if(rule.error.message){

		        			let errorElem = document.querySelector(rule.error.message.id);

		            		if(errorElem){
		            			errorElem.innerText = '';
		            		}

		            		if(errorElem && errorElem.classList.contains(rule.error.message.class)){

		            			errorElem.classList.remove(rule.error.message.class);
		            		}
		        		}
		        		
		        		// 清空input框样式
		        		if(rule.error.input){
		        			let inputElem = document.querySelector(rule.error.input.id);

		            		if(inputElem && inputElem.classList.contains(rule.error.input.class)){
		            			
		            			inputElem.classList.remove(rule.error.input.class);
		            		}
		        		}
                    }
                    if(typeof fn === 'function'){
                    	fn(result);
                    }
                    j(result);
                }
            })
        })
    }

    /**
     * 验证多个字段
     * @param rule: array批量验证数组
     * @param fn:function 回调函数
    */
    static tests(rules,fn){

        return new Promise((j,r)=>{

        	// 判断验证结果标识符
            let mark = true;

            // 验证返回信息
            let result = {
            	status: true,
            	name: '',
            	message: '验证通过'
            };

        	for(let i = 0; i < rules.length; i ++){

            	// 当前数据
            	let item = rules[i];

                // 获取验证目标字段值
                let value = item.value;

                // 获取验证目标配置的规则
                let currentRules = item.rules;

                // 赋值当前验证字段到返回对象
                result.name = item.name;
               
                for( let key in currentRules){
                	
                    // 当前字段如果没有设置required规则，只有在值存在的情况再验证
                    if(!currentRules["required"] && value && !validater.rules[key](value)){
                        result.status = false;
                        result.message = currentRules[key];
                        mark = false;
                        break;
                    }

                     // 当前字段如果有设置required规则，直接再验证
                    if(currentRules["required"] && !validater.rules[key](value)){
                        result.status = false;
                        result.message = currentRules[key];
                        mark = false;
                        break;
                    }

                    // 默认有值就验证
                    if(value && !validater.rules[key](value)){
                        result.status = false;
                        result.message = currentRules[key];
                        mark = false;
                        break;
                    }
                }
                if(!mark){

                	// 自动更新错误提示
		        	if(item.error && Object.prototype.toString.call(item.error) == '[object Object]'){
		        		
		        		// 更新错误提示文本到dom
		        		if(item.error.message){
		        			let errorElem = document.querySelector(item.error.message.id);

		            		if(errorElem){
		            			errorElem.innerText = result.message;
		            		}

		            		if(errorElem && item.error.message.class){
		            			errorElem.classList.add(item.error.message.class);
		            		}
		        		}
		        		// 更新input框样式
		        		if(item.error.input){
		        			let inputElem = document.querySelector(item.error.input.id);

		            		if(inputElem && item.error.input.class){
		            			inputElem.classList.add(item.error.input.class);
		            		}

		            		// 输入框聚焦
		            		inputElem.focus();
		        		}
		        	}
                	break;
                }else{
                	// 清空错误提示信息
	        		if(item.error.message){

	        			let errorElem = document.querySelector(item.error.message.id);

	            		if(errorElem){
	            			errorElem.innerText = '';
	            		}

	            		if(errorElem && errorElem.classList.contains(item.error.message.class)){

	            			errorElem.classList.remove(item.error.message.class);
	            		}
	        		}

	        		// 清空input框样式
	        		if(item.error.input){
	        			let inputElem = document.querySelector(item.error.input.id);

	            		if(inputElem && inputElem.classList.contains(item.error.input.class)){
	            			
	            			inputElem.classList.remove(item.error.input.class);
	            		}
	        		}
                }
            }

	        if(typeof fn === 'function'){
            	fn(result);
            }
            j(result);
        })
    }

   

    // 验证单字段参数格式是否正确
    static #check(rule){
        return new Promise((j,r)=>{
            // 判断rule参数是不是对象格式
            const result = validater.#checkObject(rule,'验证规则参数必须是object,当前参数类型不正确');
            if(!result.status){
                j(result);
            }
            // 判断是否含有name和rules
            if(typeof rule.name !== 'string' || !validater.#checkObject(rule.rules).status){
                j({
                    result: false,
                    message: '验证规则对象必须包含name属性和rules属性'
                })
            }
            j({
                status: true,
            })
        })
    }

    // 检测参数是否是对象
    static #checkObject(rule,warn,message,){
    	// 判断类型
        const check = Object.prototype.toString.call(rule) == '[object Object]';
        // 返回结果
        let result = {
        	status: true,
            message: message
        }
        if(!check)result.status = false;
        return result;
    }
}

export default validater;





