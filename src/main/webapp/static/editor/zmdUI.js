/**
 * Created by ice on 2017/5/9.
 *
 */
$(document).ready(function () {

    autosize($('#zmd-textarea'));

    splitScreen();

    scroll();


    /**
     * 自动设置编辑区的高度，使得编辑区下方总会存在一块空白，
     * 这样使得编辑更加方便
     */
    var autoEditorBlank =  (function () {
        var originalHeight = $('#zmd-textarea').height();

        return function () {
            var textareaHeight = $('#zmd-textarea').height();
            var previewHeight = $('#zmd-preview').height();

            var clientHeight = $('#zmd-textarea-box').height();


            // 设置margin高度，保证底部有一定的空白区域，提高编辑体验
            $('#zmd-textarea-margin').height(textareaHeight + clientHeight - originalHeight);
            $('#zmd-preview-margin').height(previewHeight + clientHeight - originalHeight);
        }
    }());

    $(window).resize(autoEditorBlank);

    $('#zmd-textarea-margin').click(function () {
       $('#zmd-textarea').focus();
    });

    $('#zmd-textarea').bind('input propertychange', autoEditorBlank);
});

/**
 * 文章和预览同步滚动
 */
function scroll() {

    var $textarea = $('#zmd-textarea');
    var $preview = $('#zmd-preview');

    var $textareaScroll = $('#zmd-textarea-scroll');
    var $previewScroll = $('#zmd-preview-scroll');

    var mouseX = 0, mouseY = 0;

    $(document).mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $textareaScroll.scroll(function () {
        if(mouseX > $(window).width()/2)
            return;

       var textareaHeight = $textarea.height() - $textareaScroll.height();
       var previewHeight = $preview.height() - $previewScroll.height();

       var previewScrollTop = $textareaScroll.scrollTop() * (previewHeight / textareaHeight);

        $previewScroll.scrollTop(previewScrollTop);
    });

    $previewScroll.scroll(function () {
        if(mouseX < $(window).width()/2)
            return;

        var textareaHeight = $textarea.height() - $textareaScroll.height();
        var previewHeight = $preview.height() - $previewScroll.height();

        var textareaScrollTop  = $previewScroll.scrollTop() * (textareaHeight / previewHeight);

        $textareaScroll.scrollTop(textareaScrollTop);
    });
}

/**
 * 分屏
 */
function splitScreen() {

    var $textareaScroll = $('#zmd-textarea-scroll');
    var $previewScroll = $('#zmd-preview-scroll');

    var $previewBtn =$('#zmd-preview-button');
    var $nonpreviewBtn = $('#zmd-nonpreview-button');


    // 分栏
    $('#zmd-columns-2').click(function () {
        $textareaScroll.show();
        $previewScroll.show();

        // 编辑区恢复
        $textareaScroll.css({
            width: '50%'
        });
        $('#zmd-textarea-box').css({
            width: '100%'
        });

        // 预览区恢复
        $previewScroll.css({
            width:'50%'
        });
        $('#zmd-preview-margin').css({
            width: '100%'
        });
        $('#zmd-preview').css({
            margin: '0 60px 0 40px'
        });

        $('#zmd-columns-1').show();
        $(this).hide();

        $previewBtn.hide();
        $nonpreviewBtn.hide();
    });

    // 单窗口
    $('#zmd-columns-1').click(function () {

        $previewScroll.hide();

        $textareaScroll.css({
            width: '100%'
        });
        $('#zmd-textarea-box').css({
            width: ''+window.screen.width/2
        });

        $('#zmd-columns-2').show();
        $(this).hide();
        $previewBtn.show();
    });

    // 单窗口预览
    $previewBtn.click(function () {
        $nonpreviewBtn.show();
        $(this).hide();

        $textareaScroll.hide();
        $previewScroll.show();

        $previewScroll.css({
            width: '100%'
        });
        $('#zmd-preview-margin').css({
            width: ''+window.screen.width/2
        });
        $('#zmd-preview').css({
            margin:'0 50px'
        })
    });


    // 单窗口不预览
    $nonpreviewBtn.click(function () {
        $('#zmd-preview-button').show();
        $(this).hide();

        $textareaScroll.show();
        $previewScroll.hide();
    });
}