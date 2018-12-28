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

//uuid js


var todoData = [
    // {
    //     id: uuid(),
    //     content: "吃午餐",
    //     createdAt: 1
    // },
    // {
    //     id: uuid(),
    //     content: "吃晚餐",
    //     createdAt: 1000
    // }
];



//讀取資料
function render(todoData){
    //把資料渲染到頁面中
    var $ul = $("ul");
    var HTML = "";

    for(var i = 0; i < todoData.length; i++){
        HTML = HTML + `
        <li id="${todoData[i].id}">
            <span class="delete">
                刪除
            </span>
            ${todoData[i].content} 
            ${moment(todoData[i].createdAt).format("MM/DD hh:mm")}
        </li>`;
    };

    //清空頁面上既有ul內的全部舊資料
    $("ul").empty();

    $ul.append(HTML);

};

render(todoData);

// 整理最上式，寫入資料
$("#addTodoBtn").on("click", function(event){
        event.preventDefault();
        // 在定義的變數前加上$方便自己辨識他是一個jq物件
        var $addTodoInput = $("#addTodoTnput");
        var newTodoText = $addTodoInput.val().trim();

        // 如果使用者沒有輸入任何值則停止函式
        if(!newTodoText) return;

        //在li最前方加上刪除，並給他一個class用於之後指定
        // $("ul").append(`<li><span class="delete">刪除</span>${newTodoText} ${moment().format("MM/DD hh:mm")}</li>`);
    
        //把使用者輸入的新資料存進既有todoData
        var newTodoData = {
            //賦予資料一個唯一的id
            id: uuid(),
            content: newTodoText,
            //.valueOf：把moment抓出的時間轉換成從預設時間起算經過的毫秒數
            createdAt: moment().valueOf()
        };

        todoData.push(newTodoData);

        //再次render完整的todoData
        render(todoData);

        $addTodoInput.val("");
    });


//li .特定class：找尋底下所有特定class
//li>.特定class：找尋「底下一層」的特定class

//將監聽器綁在ul上，但實際觸發監聽器的為ul底下的.delete
    $("ul").on("click", ".delete", function(){
        //用this指定到ul底下的delete，再用parent選擇到上一層的父元素li，並執行刪除整個li
        // $(this).parent("li").remove();

        // .attr：取用某個值，即可指定更精確
        // $(this).parent("li").attr("");

        //先刪除資料庫內的資料
        var idToDelete = $(this).parent("li").attr("id");
        
        //除文字模板的{}以外，{}內只有一行的情況下可刪除{}來簡化函式
        todoData = todoData.filter(function(todo){
            if(todo.id === idToDelete) return false;
            else return true;
        });

        //重新rander一次

        render(todoData);
        

    });


    