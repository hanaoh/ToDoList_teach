// $(css選擇器).事件監聽器
//            .取用元素內部內容

// $("#header").attr("class", "top");

// $().on("監聽的事件內容", "要執行的函數")
    // .on是加上事件監聽器的函數
// inputArea裡面的(空格)button元素
// $("#inputArea button").on("mouseover", function(){
//     alert("我被點了");
// })


// $("#addTodoBtn").on("click", function(event){
// // event.preventDefault:取消事件的預設行為
//     event.preventDefault();

// // .val()是抓出該位置的「值」
//     var newTodo = $("#addTodoTnput").val();

// // .append("html內的程式碼")：在html某位置最後加入子元素（html程式碼）
//     $("ul").append(`<li>${newTodo}</li>`);

// // .val("字串")是將字串傳入該位置
//     $("#addTodoTnput").val("");
// });


// 整理上式
$("#addTodoBtn").on("click", function(event){
        event.preventDefault();
        // 在定義的變數前加上$方便自己辨識他是一個jq物件
        var $addTodoInput = $("#addTodoTnput");
        var newTodoText = $addTodoInput.val();

        // 如果使用者沒有輸入任何值則停止函式
        if(!newTodoText) return;

        $("ul").append(`<li>${newTodoText} ${moment().format("MM/DD hh:mm")}</li>`);
    
        $addTodoInput.val("");
    });