//立即执行函数，规定自己的代码作用域
//让自己定义的变量不影响全局变量（为什么？可能会影响其他开发者的代码，导致错误）
/*
    1.复选框的关联操作
     1-1：全选：全选事件的绑定
     1-2:获取他的选中状态
     1-3：将选中状态赋值给tbody下面的复选框
     1-4：处理tbody里面的复选框
     1-5：通过事件委托的形式为tbody里面的复选框绑定事件（有可能是未来元素）
    2.表格排序的实现
     2-1：事件的绑定
     2-2：在事件绑定里面获得指定的index值
 */
(function(){
    //获取dom元素
    var checkAll = document.getElementById("checkAll");
    var tbody = document.getElementsByTagName("tbody")[0];
    var checkOneList = tbody.getElementsByTagName("input");
    var ths = document.getElementsByTagName('th');
    var rows = tbody.getElementsByTagName('tr');
    console.log(rows);

    //程序入口函数
    var init = function(){
        initEvents();
    }

    //绑定事件函数
    var initEvents = function(){
        checkAll.addEventListener("click",onCheckAllClick);
        tbody.addEventListener("click",onCheckOneListsClick);
        for(var i = 0;i<ths.length;i++){
            // console.log(ths[i],i);
            //使用闭包的形式获取每一项对应的DOM元素和在数组中的索引值
            handlerThsClickFn(ths[i],i);
        }
    }

    //全选状态处理函数
    var onCheckAllClick = function(){
        var isChecked = this.checked;
        for(var i=0;i<checkOneList.length;i++){
            checkOneList[i].checked = isChecked;
        }//遍历checkOneList数组，将每个复选框的checked属性设置为isChecked
    }
    //tbody 里面的复选框
    var onCheckOneListsClick = function(e){
        if(e.target.tagName !== 'INPUT')return;
        //定义已经选中的复选框的数量
        var checkNumber = 0;
        for(var i = 0;i<checkOneList.length;i++){
            checkNumber += checkOneList[i].checked?1:0; 
        }
        //用右边的判断结果给全选框赋值
        checkAll.checked = checkNumber === checkOneList.length;
        // if(checkNumber === checkOneList.length){
        //     checkAll.checked = true;
        // }
        // if(checkAll.checked === true && checkNumber<checkOneList.length){
        //     checkAll.checked =false;
        // }
    }

    //定义th点击事件（表头点击排序事件）
    //ths[i]—>形参th 当前遍历到的表头单元格DOM元素
    //i—>形参index 当前元素在数组中的索引
    var handlerThsClickFn = (th,index)=>{
        if(index === 0)return;
        th.addEventListener('click',function(){
            //比较处理 比较tr里面的数据
            var arr = Array.prototype.slice.call(rows).sort((a,b)=>{
                return a.getElementsByTagName('td')[index].innerHTML - b.getElementsByTagName('td')[index].innerHTML;   
            })
            //将排序后的数组赋值给tbody
            tbody.innerHTML = '';
            for(var i = 0;i<arr.length;i++){
                tbody.appendChild(arr[i]);
            }
            //中文排序
            arr.sort((a,b)=>{
                return a.getElementsByTagName('td')[index].innerHTML.localeCompare(b.getElementsByTagName('td')[index].innerHTML);
            })
            //将排序后的数组赋值给tbody
            tbody.innerHTML = '';
            for(var i = 0;i<arr.length;i++){
                tbody.appendChild(arr[i]);
            }
            
        })

    }
    init();
})()

//定义程序入口函数：统一函数的调用，快速浏览函数的功能
//事件函数：效果的实现本质上是事件的触发和处理。定义一个函数统一管理事件处理。
//