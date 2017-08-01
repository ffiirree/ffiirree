/**
 * Created by ice on 2017/5/9.
 *
 */
$(document).ready(function () {
    parse();
    $('#zmd-textarea').bind('input propertychange', parse);
});

/**
 * 解析文档
 */
function parse() {
    MathJax.Hub.Queue(
        [function(){
            $('#zmd-preview').html( marked ($('#zmd-textarea').val()));
        }],
        [function () {
            // 代码高亮
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });

            // 流程图
            $('pre .lang-flow').each(function () {
                var diagram = flowchart.parse($(this).text());
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

