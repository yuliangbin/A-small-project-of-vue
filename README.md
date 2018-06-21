# vue-lesson
	README文件安排
		- 项目概览
		- 项目目录结构
		- 查看项目效果
		- 项目主要.vue书写思路介绍
		- VUE 项目总结

# 项目概览
	做了一个简易的图书管理系统。实现了图书获取、详情页跳转、添加图书、修改图书、删除图书等图书管理功能。

# 项目目录结构

	- mock 	模拟后台数据
		- book.json		json文件存放书籍数据
		- server.js		node创建的简易后台服务器，用于处理客户端的请求
		- sliders.js	轮播图的图片地址数据
	- src
		- api/index.js			前端向后端请求数据的接口
		- base					基础组件，用于存放可复用的.vue文件
		- components			页面组件，用于存放页面级组件
		- router/router.js		前端路由
		- APP.vue
		- main.js
		
# 查看项目效果
	- 在node环境下运行mock/server.js文件，打开一个HTTP服务器
	- 在项目根目录下打开命令行窗口
		npm run dev
		
# 项目主要.vue书写思路介绍
	
	
	1、Home.vue中的轮播图组件(基础组件)Swiper.vue
		- Swiper.vue使用轮播图插件vue-awesome-swiper
		- 将轮播图组件Swiper.vue导入到Home.vue组件中
		- 为了实现Swiper.vue的复用，轮播图的图片数据应该从父组件Home.vue通过props传递
		- 在Home页面首次加载时向服务器端发送axios请求
		
		- 在哪个组件(父组件还是子组件)里使用这个api接口？
			- 如果是基础组件需要这些数据，在使用这个组件的父级中调用这个方法，通过props属性将数据传递给基础组件
		- 如何写一个基础组建
			- 创建一个.vue文件
			- 在需要使用这个组件的父级中引用这个组件
			- 在父级组件中注册这个组件
			- 以标签的形式引入
		- 如何判断一个组件是否可以作为基础组件？
			- 看这个组件是否在其他地方可以复用
			
	2、Home.vue热门图书的功能
		- 先写服务器端，确保数据能正常返回
		- 增加api接口方法，实现调取数据的功能
		- 在首次加载页面的时候通过axios向服务器发送get请求
	  
	3、删除图书
		- 先写客户端
	    	- 当点击删除按钮的时候，我们需要向服务器发送一个ajax请求，告诉服务器我要删除一个数据
	    	- 发送删除的请求可以用delete方式
		- 再写服务器（获取客户端发过来的请求并处理，然后返回相应的数据）
	    	- 获取请求路径（url.parse(req.url,true);//解析路径，并把query转化成对象）
    		- 获取请求方法（req.method,获取请求头部的请求方法）
    		- 获取需要删除的图书的id号,query.id

	4、获取一本书的详情
		- 通过列表页的<router-link>的动态路由匹配(根据书的id匹配)跳转到详情页
		- 在详情页加载时向服务器发送带有书的id号的get请求，获取书籍信息

	5、修改图书信息
		- 点击确认修改图书信息的按钮，发送一个axios的PUT请求，需要传两个参数（书的ID和修改后书的信息）
		- 服务器收到请求后对数据进行进一步处理

	6、增加一本书
		- 点击确认增加图书，发送一个axios的POST请求，需要 传递一个参数(添加的书籍的具体信息)
		- 服务器收到请求后对数据做进一步处理
	
	7、实现Home.vue页面的loading效果
		- 在服务器返回数据之前，我们需要一个div或一个图标显示页面正在加载中
		- 在数据显示在页面上时，我们希望隐藏div，显示加载回来的数据
		- 为了实现这个效果，我们需要一个属性来控制div元素的显示或隐藏
		- 显示div和显示数据之间是if else 的关系，因此我们可以使用v-if来控制。
		
	8、实现页面缓存
		- 不同的路由组件的渲染出口均为<router-view>,所以<router-view>标签应该在<keep-alive>标签里
		- 但是如何识别需要缓存的组件和不需要缓存的组件呢？
		- 我们可以在每个组件里添加路由元信息meta来判断哪个组件需要缓存

	9、下拉加载
		- 默认每次加载5条，前端告诉后台现在要从第几条开始架子啊
		- /page?offset=5
		- 后台收到请求后，通过slice()截取一定数目的书本数返回给客户端显示出来
		- 服务器还需要告诉前端是否有更多的数据，hasMore:true
		
# VUE 项目总结

	1、v-for 会默认复用组件，加key属性唯一标识一个标签即可。如果在编写代码时使用v-for的那个元素飘红，多半是因为没有加key属性

	2、node CORS跨域请求	
		res.setHeader("Access-Control-Allow-Origin", "*");
		//设置允许跨域的客户端请求地址 
		res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		//响应首部 Access-Control-Allow-Headers 用于 preflight request（预检请求）中，列出了将会在正式请求的 Access-Control-Expose-Headers 字段中出现的首部信息。
		res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		//设置是否同意这些方法来修改服务器资源。
		res.setHeader("X-Powered-By",' 3.2.1');
		if(req.method=="OPTIONS"){
		  return res.end('200');/*让options请求快速返回*/
		}

	3、NetWork中一个请求资源始终都是pending，这个是后端代码的问题，导致没有返回数据给客户端。

	4、动态匹配路由的时候，会导致组件的复用，以致于监听不到路径参数的变化。但是路径参数会被设置到this.$route.params中，$route是当前组件实例的原型上的一个属性，是一个对象，里面包含了所有动态匹配的参数。我们可以通过watch来监听$router属性的变化，若变化，就通过axios发送数据给服务器，重新获取数据

	5、如何判断一个对象是否为空对象
		- JSON.stringify(obj) === "{}"
		- Object.keys(obj).length
		
	6、节流(性能优化),相关书籍:高性能javascript
		触发scroll事件，每次轻轻的滚动一下鼠标，就会触发多次的scroll事件，如果绑定的回调函数有大量的DOM操作，则会非常消耗性能。这显然不是我们想要的。我们可以将耗时的DOM操作放进一个setTimeout的定时器里，下次触发scroll事件时将上一次的消除掉。这样就能保证只在停止滚动条时触发一次setTimeout里的操作。

	7、了解了VUE的生命周期
		https://segmentfault.com/a/1190000014705819
	
	8、双向数据绑定的原理
		https://segmentfault.com/a/1190000006599500
	
	9、了解了基本的前后端交互的模型
		- 书籍:Node即学即用
		
	10、掌握了webpack、babel基本功能的使用
		webpack是一种模块化的打包工具，本身提供了对js的加载打包支持。但是一个项目中不仅仅有js文件，还有图片文件、CSS文件、以及其他预处理语言的文件，那么如何实现对这些文件的加载打包呢？
		使用webpack中的loader。loader是转译模块源代码的转换规则。loader被编写为:接受源代码作为参数的函数，并返回这些转换过的新版本代码。
		
		既然webpack都能加载打包js代码了，那么还要babel干嘛呢？我们知道一些JS新版本的特性浏览器并不能很好的支持，所以我们就需要一种能够将这些新特性转换成当前浏览器能够支持的特性。然而webpack本身并不支持语言的向下兼容，所以babel的作用就是将浏览器不能识别的特性转换成浏览器能识别的特性，即向下兼容。
		
		自己有写过一个从0搭建一个粗糙的vue项目脚手架的思路，可以看根目录下的"webpack脚手架思路.txt"文件。
		后面有时间的话会写一篇完整的搭建vue脚手架的文章。
		
		
		

	

		

	