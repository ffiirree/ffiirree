$(document).ready(function () {
    $('#submit').click(()=>FIRE.signup({
        username: $('#username').val(),
        password: $('#password').val(),
        email: $('#email').val()
    }));
});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.signup = function (user) {
    if(!user.username){
        messageBox("O_O", "用户名不能为空!");
    }
    else if(!user.password) {
        messageBox("O_O", "密码不能为空!");
    }
    else if(!user.email){
        messageBox("O_O", "邮箱不能为空!");
    }
    else {
        $.post('/user/signup', { username:user.username, password: user.password, email:user.email }, function (data) {
            if(data.status === "success")
                location.href = "/home";
        });
    }
};