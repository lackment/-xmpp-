var connection = null;
var connected = false;
var url = "http://192.168.43.240:7070/http-bind/";
var newPage = "";
var server = 'hi';

    $("#getInto").on('click',function (){



            if ($("#student").prop("checked") ) {
                newPage = './student.html';
            } else if ($("#teacher").prop("checked") ) {
                newPage = './teacher.html';
            }


        var jid = $("#useName").val() + "@"+ server;
        var password = $("#password").val();

        // 连接
         connection = new Strophe.Connection(url);
         connection.connect(jid, password, onConnect);

    });
    $("#register").on('click',function(){
        layer.open({
            type: 2,
            title: null,
            shadeClose: true,
            shade:0.3,
            // maxmin: true, //开启最大化最小化按钮
            area: ['893px', '600px'],
            success:function(){
                $(".bottomMap").addClass("blur");
            },
            end:function(){
                $(".bottomMap").removeClass("blur");
            },
            content: ["index/register.html",'no']
        });

    });
function onConnect(status) {
    var mainbox = $('#main');
    if(status === Strophe.Status.CONNFAIL){
        console.log("连接失败");
    }else if(status === Strophe.Status.AUTHFAIL){
        console.log("登录失败");
        alert('用户名或密码错误');
    }else if(status === Strophe.Status.DISCONNECTED){
        console.log("连接断开");
        connected = false;
    }else if (status === Strophe.Status.CONNECTED) {
        console.log("连接成功");
        connected = true;

        //跳转页面
        mainbox.load(newPage,null,function () {
            //删除原页面的css文件
            $('head link').remove();

            // 首先要发送一个<presence>给服务器（initial presence）
            connection.send($pres().tree());


            userName.innerHTML = connection.authcid;

            connection.addHandler(onMessage,null,'message',null,null,null,null);

            // console.log(connection);
            //获取群列表
            connection.muc.listRooms('conference.'+server,function (iq) {
                classlist(iq);
                classlist1(iq);
            },null);


        })
    }
}

//关闭页面退出
$(window).bind('unload',function () {
    connection.disconnect("正常退出");
});
