$(document).ready(function () {

    $('#submit').click(()=>FIRE.login({
        username:$('#username').val(),
        password:$('#password').val()
    }))
});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.login = function (user) {

    let url = Router.hash.get("url");

    if(!user.username){
        messageBox("O_o", "用户名不能为空！");
    }
    else if(!user.password) {
        messageBox("o_O", "密码不能为空！");
    }
    else {
        $.post('/user/login', {username:user.username, password: user.password}, function (data) {
            if(data.status === "success")
                location.href = url ? url : "/home";
        })
    }
};