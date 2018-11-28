# 微信小程序odometer数字滚动动画组件

## 效果

![odometer微信小程序版](https://www.qwqoffice.com/attached/image/20181128/20181128094219_37080.gif "odometer微信小程序版")

## 参考

odometer [https://github.com/HubSpot/odometer](https://github.com/HubSpot/odometer "https://github.com/HubSpot/odometer")

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| :------------ | :------------ | :------------ | :------------ |
| id | String |  | 标签唯一id，用于选取标签进行后续操作 |
| odometer-class | String |  | 最外层容器的样式类 |
| value-class | String |  | 数字的样式类 |
| duration | Number | 2000 | 动画的过渡持续时间 |

## 方法

| 方法名 | 参数 | 说明 |
| :------------ | :------------ | :------------ |
| show |  | 显示组件 |
| hide  |  | 隐藏组件（不透明度为0） |
| setValue | value | 设置组件的值 |
| startAnimate |  | 开始动画 |
| update |  newValue | 更新组件的值（相当于依次执行show、setValue、startAnimate） |

## 示例

###### JSON
    {
    	"usingComponents": {
    		"odometer": "/path/to/odometer"
    	}
    }
	
###### HTML
    <!-- index.wxml -->
    <odometer id="odometer" odometer-class="odometer" value-class="odometer-value" />

###### CSS
    /* index.wxss */
    .odometer {
        margin-top: 50px;
    }
    
    .odometer-value {
        font-size: 72px;
        font-weight: bold;
        color: #f64d8d;
    }

###### JS
    /* index.js */
    var that = this;
    var odometer = this.selectComponent('#odometer'); // 获取组件实例
    setTimeout(function() {
    	odometer.update(30); // 1000ms后更新值为30
    }, 1000);
    setTimeout(function() {
    	odometer.update(90); // 3500ms后更新值为90
    }, 3500);
    setTimeout(function() {
    	odometer.update(50); // 5700ms后更新值为50
    }, 5700);

## 赞赏
![赞赏码](https://www.qwqoffice.com/html2wxml/images/admiring-qrcode.png "赞赏码")
