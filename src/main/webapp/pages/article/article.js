/**
 * @file article.js
 *
 * @author ffiirree
 * @update 2017.11.9
 */
$(document).ready(function () {

    let rid = 0;
    let atuid = 0;
    let data_reviews = {};

    // 解析文章(Markdown)
    FIRE.article.parse({
        $content: $('#article-content'),
        $preview: $('#article-preview')
    });


    //
    $('.page').css({
        width: window.screen.width / 2
    });

    // 评论框
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

    $.post("/article/reviews", {aid: aid, page: 0, size: 20}, function (data) {

        if(data.status === "success"){
            data_reviews = data;

             new Vue({
                el: '#reviews',
                data: data,
                methods: {
                    reply(_review, _reply) {
                        _reply = _reply || _review;

                        rid = _review.id;
                        atuid = _reply.user.id;

                        $("#at_name").html(_reply.user.username);
                        $('#at_content').html(_reply.content);

                        $(".reply-background").show();
                    }
                }
            });
        }
    });

    $("#review-button").click(function () {
        let $textarea = $("#review-textarea");
        let content = $textarea.val();

        if(content !== "") {
            $.post("/article/review", { aid: aid, atuid: 0, rid: 0, content: content }, function (data) {
                if(data.status === "login") {
                    $(".login").show();
                }
                else if(data.status === "success") {
                    $textarea.val("");
                    data_reviews.reviews.push(data.review);
                }
            });
        }
    });

    $("#reply").click(function () {
        let $textarea = $("#reply-textarea");
        let content = $textarea.val();

        if(content !== "") {
            $.post("/article/review", { aid: aid, atuid:atuid, rid: rid, content: content }, function (data) {
                if(data.status === "login") {
                    $(".login").show();
                }
                else if(data.status === "success") {
                    $textarea.val("");
                    $('.reply-background').hide();

                    data_reviews.reviews.forEach((item)=>{
                        if(item.id === data.review.rid) {
                            item.replies.push(data.review);
                            return;
                        }
                    })
                }
            });
        }
    });

    $('#submit').click(function () {
        let username = $('#username').val();
        let password = $('#password').val();

        $.post('/user/login', {username:username, password: password}, function (data) {
            if(data.status === "success")
                $(".login").hide();
        });
    });


    $(".reply-background").click(function () {
        $(this).hide();
    });

    $('.article-review').click(function (evt) {
        evt.stopPropagation();
    });
});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.article = (function () {

    let config = {};

    /**
     * 标记Markdown文本
     * @private
     */
    function __marked__() {
        // For to do list.
        let renderer = new marked.Renderer();
        renderer.listitem = function(text) {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<i class="fa fa-circle-o"></i> ')
                    .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-circle"></i> ');
                return '<li style="list-style: none">' + text + '</li>';
            } else {
                return '<li>' + text + '</li>';
            }
        };
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });

        config.$preview.html(marked (config.$content.val()));
    }

    /**
     * 代码高亮和流程图以及序列图
     * @private
     */
    function __highlight__() {
        // 代码高亮
        $('pre code').each(function(i, block) {

            // 代码高亮
            hljs.highlightBlock(block);

            // 代码行数
            if($(this).hasClass('lang-flow') || $(this).hasClass('has-numbering'))
                return;

            let lines = $(this).text().split('\n').length - 1;
            let $numbering = $('<ul/>').addClass('pre-numbering');

            $(this)
                .addClass('has-numbering')
                .parent()
                .append($numbering);

            for(let i = 1; i <= lines; i++) {
                $numbering.append($('<li/>').text(i + '.'));
            }
        });

        // 流程图
        $('pre .lang-flow').each(function () {
            let diagram = flowchart.parse($(this).text());
            $(this).parent('pre').append($('<div id="diagram"></div>'));
            diagram.drawSVG('diagram');
            $(this).remove();
            $('#diagram').attr('id','');
        });

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
    }

    function __hx__() {
        // 获取文章所有的标题
        let _nodes = config.$preview[0].childNodes;
        let pattern = /^H[1-6]$/g;
        _nodes.forEach(function (item) {
            if(item.nodeType === 1 && pattern.test(item.tagName)){
                console.log(item.innerHTML);
            }
        });
    }

    return{
        parse:function (conf) {

            config.$content = conf.$content;
            config.$preview = conf.$preview;

            MathJax.Hub.Queue(
                [__marked__],
                [__highlight__],
                // [__hx__],
                ["Typeset",MathJax.Hub,'article-preview']
            );
        }
}
})();