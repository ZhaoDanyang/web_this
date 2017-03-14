# web_this
介绍了 javascript 关键字 this


this 是前端开发中常用的关键字之一,所以理解好 this 对我们开发会有很大的帮助。接下来我就结合自己所掌握的知识来为大家解读一下 this 关键字。希望能帮助到一些受其困扰的小伙伴，当然如果你有更深层的解读也欢迎留言，我们共同进步。

刚接触 this 的时候对其指向的理解也就是简单的：**谁调用了它，this就指向谁。**但是随着工作的积累，认识到了 this 的重要性，发现这样的理解在有一些情况下并不能说得通。所以我们需要全方位的来解读一下 this。

众所周知在执行上下文创建的过程当中，会执行一下操作：**生成变量对象，建立作用域链，确定 this 指向**。因此**this的指向，是在函数被调用的时候确定的。**在这里我们很容易理解到一个函数中 this 的指向是可以非常灵活的，在一个函数中由于调用的方式不同，this 指向了不一样的对象。

	var a = 1;
    var obj = {
        a:2
    }
    function fn() {
        console.log(this.a);
    }
    fn(); // this指向 window 输出 undefined
    fn.call(obj); // this指向 object 输出 2	
接下来我将从以下四种情况中来解读 this 指向。
 
### 一、全局对象中的 this 
全局对象的 this只是指向它本身，因此没有太多复杂的情况需要考虑。

	this.a = 1;
 	var b = 2;
	c = 3;
	console.log(a); //1
	console.log(b); //2
	console.log(c); //3
	

### 二、函数中的 this

在上代码之前，我先直接了当的抛出自己所理解的一点见解。

在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。**如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。**但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。

因此想要准确确定this指向，找到函数的调用者以及区分他是否是独立调用就变得十分关键。
	
	// 为了能够准确判断，我们在函数内部使用严格模式，因为非严格模式会自动指向全局
	function fn() {
    	'use strict';
    	console.log(this);
	}
	fn();  // fn是调用者，独立调用
	window.fn();  // fn是调用者，被window所拥有

在上面的例子当中，`fn()`作为独立调用者，它内部 this 指向为 undefined。而`window.fn()`则因为被 fn 被 window 所拥有，内部就指向了 window 对象。

掌握了这个规律再来看看几个 demo。

demo1

	var a = 1;
    function fn() {
        function foo() {
            console.log(this.a);
        }
        foo();
    }
    fn(); //undefined 指向 window 对象
    
 demo2   
 	
 	var a = 20;
	var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
        return this.a;
    	}
	}
	console.log(obj.c);  
	console.log(obj.fn());
在 demo2 中需要特别注意的是。`obj.c`调用对象并非是函数。因此并不适合上面的规则，所以这种方式我们应该单独讨论。

**当obj在全局声明时，无论obj.c在什么地方调用，这里的this都指向全局对象，而当obj在函数环境中声明时，这个this指向undefined，在非严格模式下，会自动转向全局对象。**


###三、使用call，apply显示指定this
JavaScript内部提供了一种机制，让我们可以自行手动设置this的指向。它们就是call与apply。call 与 apply 都可以手动设置 this 的指向，只不过 call 传参数需要一个接着一个传入， apply 可以将参数以数组的形式传入。

	function fn(num1, num2) {
    	console.log(this.a + num1 + num2);
	}
	var obj = {
    	a: 20
	}
	fn.call(obj, 100, 10); // 130
	fn.apply(obj, [20, 10]); // 50
	

###四、构造函数与原型方法上的this

在封装函数的过程就我们都会接触到 this ，所以在这个过程当中理解 this 指向是非常重要的。

结合下面的例子我们来看一下。

  	function Student(name, age) {

        this.name = name;
        this.age = age;
    }

    Student.prototype.getName = function() {
        return this.name;
    }
    var s = new Student('Tom', 10);
    s.getName();


这里出现了 new 对象的过程，所以在弄明白 this 的指向之前，我们应该清楚 new 这个过程都做了什么。

通过 new 调用构造函数，主要分以下4个阶段：

* 创建一个对象；
* 将构造函数的 this 指针指向这个对象；
* 为这个对象添加属性，方法等；
* 返回新对象。

因此，当 new 调用构造函数时，this 其实指向的是这个新创建的对象，最后又将新的对象返回出来，被实例对象s接收。因此，我们可以说，这个时候，构造函数的this，指向了新的实例对象s。

而原型方法上的 this 就好理解多了，根据上边对函数中 this 的定义，`s.getName()`中的getName为调用者，他被s所拥有，因此 getName 中的 this，也是指向了 s。

关于 this 相关的知识，根据我所了解的我已总结完毕。如果你发现有什么错误，也欢迎评论指出。


    
