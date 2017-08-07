/**
 * Created by ice on 2017/5/9.
 *
 */
$(document).ready(function () {

    zmd.parse();

    $('#zmd-textarea').bind('input propertychange', zmd.parse);
});

let zmd = {};
zmd = (function () {

    let updateEventId = 0;

    /**
     * 标记Markdown文本
     * @private
     */
    function __marked__() {
        $('#zmd-preview').html( marked ($('#zmd-textarea').val()));
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

    /**
     * 分析Markdown文本
     * \ 标记文本
     * \ 高亮代码：包括序列图和流程图
     * \ LeTex数学公式渲染
     * @private
     */
    function __parse__() {
        MathJax.Hub.Queue(
            [__marked__],
            [__highlight__],
            ["Typeset",MathJax.Hub,'zmd-preview']
        );
    }

    return{
        parse: function () {
            if(updateEventId)
                clearTimeout(updateEventId);
            else
                __parse__();

            updateEventId = setTimeout(__parse__, 350);
        }
    }
})();
