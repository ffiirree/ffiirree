/**
 * Created by ice on 2017/5/17.
 *
 */
$(document).ready(function () {

    review.render({
        template: $("#review-template").html(),
        page: 0,
        container: '.review-list'
    });

    $('.page').css({
        width: window.screen.width/2
    });

    autosize($('.review-content'));

    $('.review-content').focus(function () {
        $('.article-review-box').css({
            'border-color': '#00b0e8'
        })
    }).blur(function () {
        $('.article-review-box').css({
            'border-color': '#aaaaaa'
        });
    });

    mark();

    submitReview();
});

/**
 * Markdown 标记
 */
function mark() {
    MathJax.Hub.Queue(
        [function(){
            $('#article-preview').html( marked ($('#article-content').val()));
        }],
        [function () {
            // 代码高亮
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });

            // 流程图
            $('pre .lang-flow').each(function () {
                let diagram = flowchart.parse($(this).text());
                $(this).parent('pre').append($('<div id="diagram"></div>'));
                diagram.drawSVG('diagram');
                $(this).remove();
                $('#diagram').attr('id','');
            });

            // 序列图
            $("pre .lang-seq").sequenceDiagram({theme: 'simple'});

            // 行内code样式
            $('code').each(function () {
                if(this.parentNode.nodeName !== 'PRE' && this.parentNode.nodeName !== 'pre') {
                    $(this).css({
                        'background-color': '#cccccc',
                        'padding': '3px 5px',
                        'border-radius': '5px',
                        'font-size':'14px'
                    })
                }
            });
        }],
        ["Typeset",MathJax.Hub,'zmd-preview']
    );
}


function submitReview() {
    $('#review-button').click(function () {

        let content = $('.review-content').val();

        if(content === '')
            messageBox(')_)', '评论不能为空!');
        else {

            let arr = location.href.split('/');
            let article_id = arr[arr.length - 1];

            $.post('/review', {article_id: article_id, content: content}, function (data) {
                if(data.status === 'success') {
                    $('.review-content').val('');
                    /**
                     * 将消息发送给作者
                     * @type {jQuery}
                     */
                    let article_title = $('article .title').text();
                    let article_user_id = $('#article_user_id').text();

                    let msg_content = "<a href='/user/{{username}}/#!/index'>{{username}}</a> 评论了您的文章 <a href='/article/{{article_id}}'>{{article_title}}</a>";
                    msg_content = Z.template(msg_content, {username: data.user.username, article_id: article_id, article_title: article_title});

                    $.post('/user/notice', {user_id: article_user_id, content: msg_content}, function (data) {
                        location.reload();
                    });
                }
            });


        }
    })
}

let review = (function () {
    let arr = location.href.split('/');
    let article_id = arr[arr.length - 1];

    let reply_template =
        '<div class="reply-area">' +
        '   <div class="textarea-box"><textarea></textarea></div>' +
        '   <ul class="fs-ul operations">' +
        '       <li class="send">发送</li>' +
        '       <li class="cancel">取消</li>' +
        '   </ul>' +
        '</div>';

    let conf = {};

    function __render__review__(item, index) {
        let data = {
            id: item.id,
            mine_name: item.mine_name,
            mine_avatar: item.mine_avatar,
            index: index,
            submit_time: item.submit_time,
            content: item.content
        };

        $(conf.container).append(Z.template(conf.template, data));

        $('#review_' + item.id + ' .reply').click(function () {
            let reply_id = item.id;

            $('.reply-area').remove();
            $('#review_' + item.id + ' .primary-review').append($(reply_template));
            $('.reply-area .cancel').click(function () {
                $('.reply-area').remove();
            });
            $('.reply-area .send').click(function () {

                let $textarea = $('.reply-area textarea');
                if($textarea.val() === '')
                    messageBox('O_O', '回复不能为空!');
                else{

                    let send = {
                        article_id: article_id,
                        reply_id: reply_id,
                        his_id: item.mine_id,
                        content: $textarea.val()
                    };

                    console.log(send);

                    $.post('/second_review', send, function (data) {
                        if(data.status === 'success') {
                            $('.reply-area').remove();

                            location.reload();
                        }
                    })
                }
            });
        });

        $('#review_' + item.id + ' .delete').click(function () {

            $.post('/review/delete', { id: item.id }, function (data) {
                if(data.status === 'success') {
                    location.reload();
                }
            });
        });

    }


    function __render_second_review__(item) {
        let data = {
            id: item.id,
            mine_name: item.mine_name,
            his_name: item.his_name,
            content: item.content,
            submit_time: item.submit_time
        };

        $('#review_' + item.reply_id).append(Z.template($('#second-review-template').html(), data));

        $('#second-review-' + item.id + ' .delete').click(function () {
            $.post('/review/delete', { id: item.id }, function (data) {
                if(data.status === 'success') {
                    location.reload();
                }
            });
        });

        $('#second-review-' + item.id + ' li.reply').click(function () {

            $('.reply-area').remove();
            $('#second-review-' + item.id).append($(reply_template));

            $('.reply-area .cancel').click(function () {
                $('.reply-area').remove();
            });

            $('.reply-area .send').click(function () {

                let $textarea = $('.reply-area textarea');
                if($textarea.val() === '')
                    messageBox('O_O', '回复不能为空!');
                else{

                    let send = {
                        article_id: article_id,
                        reply_id: item.reply_id,
                        his_id: item.mine_id,
                        content: $textarea.val()
                    };

                    console.log(send);
                    $.post('/second_review', send, function (data) {
                        if(data.status === 'success') {
                            $('.reply-area').remove();
                            location.reload();
                        }
                    })
                }

            });
        });
    }
    
    return {
        render: function(config) {
            conf = config || {};
            $.post('/article/review/p', {article_id: article_id}, function (primary) {
                primary.forEach(function (item, index, array) {
                    __render__review__(item, index);
                });

                $.post('/article/review/s', {article_id: article_id}, function (secondary) {
                    secondary.forEach(function (item, index) {
                        __render_second_review__(item);
                    });
                });
            });
        }
    };
})();

