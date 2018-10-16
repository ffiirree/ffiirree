/**
 * Created by ice on 17-4-28.
 *
 */

// 生成一个消息框
let messageBox = (function() {
    function __init__(title, msg) {
        $('body').append($(
            '<div class="message-window">' +
            '   <div class="message-box">' +
            '       <div class="message-box-title">' +
                        title +
            '       </div>'+
            '       <div class="message">' +
                        msg +
            '       </div>' +
            '       <div class="message-ok-button-box">' +
            '           <button class="message-ok-button default-button">确定</button>'+
            '       </div>' +
            '   </div>' +
            '<div>'));

        // 整个窗口背景
        $('.message-window').css({
            'width': window.screen.width,
            'height': window.screen.height
        }).click(function () {
            $(this).remove();
        });

        // 消息窗口
        $('.message-box').css({
            'margin-top' : window.screen.height/4
        }).click(function (e) {
            e.stopPropagation();
        });

        $('.message-ok-button').click(function () {
            $('.message-window').remove();
        })[0].focus();
    }

    return __init__;
})();