/**
 * Created by ice on 2017/5/17.
 *
 */
$(document).ready(function () {

    // 解析文章(Markdown)
    FIRE.article.parse({
        $content: $('#article-content'),
        $preview: $('#article-preview')
    });


    //
    $('.page').css({
        width: window.screen.width/2
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

});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.article = (function () {

    let config = {};

    /**
     * 标记Markdown文本
     * @private
     */
    function __marked__() {
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
            if($(this).hasClass('lang-flow') || $(this).hasClass('lang-seq'))
                return;

            let lines = $(this).text().split('\n').length - 1;
            let $numbering = $('<ul/>').addClass('pre-numbering');

            $(this)
                .addClass('has-numbering')
                .parent()
                .append($numbering);

            for(let i = 1; i <= lines; i++) {
                $numbering.append($('<li/>').text(i));
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
                [__hx__],
                ["Typeset",MathJax.Hub,'article-preview']
            );
        }

}
})();