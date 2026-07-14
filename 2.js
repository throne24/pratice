const getUser = () =>({name:"John"});
const bar = function arr(){};//具名函数表达式
const bar1 = function (){};//匿名函数表达式
//每个函数都会内置只读属性name，返回函数名称字符串
console.log(bar.name);
console.log(bar1.name);
console.log(getUser.name);

//1 若定义函数直接写{}，会识别成函数体，而不是一个对象,故不会返回对象 建议从箭头函数返回对象时额外添加一对()
console.log(getUser());

//2
