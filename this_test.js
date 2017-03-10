

window.onload = function ()
{


   // function  test1() {
   //     var a = 1;
   //
   //     var obj = {
   //         a:2
   //     }
   //
   //     function fn() {
   //         console.log(this.a);
   //     }
   //
   //     fn(); // this指向 window 输出 undefined
   //     fn.call(obj); // this指向 object 输出 2
   // }

   // this.a = 1;
   //
   // var b = 2;
   //
   // c = 3;
   //
   // console.log(a); //1
   //
   // console.log(b); //2
   //
   // console.log(c); //3

    // 为了能够准确判断，我们在函数内部使用严格模式，因为非严格模式会自动指向全局
    // function fn() {
    //     // 'use strict';
    //     console.log(this);
    // }
    //
    // fn();  // fn是调用者，独立调用
    // window.fn();  // fn是调用者，被window所拥有


    // var a = 1;
    // function fn() {
    //     function foo() {
    //         console.log(this.a);
    //     }
    //     foo();
    // }
    // fn();

    // var a = 20;
    // var obj = {
    //     a: 10,
    //     c: this.a + 20,
    //     fn: function () {
    //         return this.a;
    //     }
    // }
    //
    // console.log(obj.c);
    // console.log(obj.fn());

    function Student(name, age) {

        this.name = name;
        this.age = age;
    }

    Student.prototype.getName = function() {
        return this.name;
    }
    var s = new Student('Tom', 10);
    s.getName();
}

