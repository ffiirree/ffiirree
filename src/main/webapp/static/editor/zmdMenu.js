/**
 * Created by ice on 17-5-11.
 *
 */
$(document).ready(function () {
    menuOperation();
    dragUploadFile('zmd-textarea');
});

/**
 * 编辑器菜单栏功能
 */
function menuOperation() {

    var textarea = document.getElementById('zmd-textarea');
    ztxt.config('zmd-textarea');

    var $bold = $('#zmd-bold');
    var $italic = $('#zmd-italic');
    var $chain = $('#zmd-chain');

    var $quote = $('#zmd-quote');
    var $code = $('#zmd-code');
    var $math = $('#zmd-math');

    var $picture =$('#zmd-picture');
    var $list_ul = $('#zmd-list-ul');
    var $list_ol = $('#zmd-list-ol');
    var $table = $('#zmd-table');

    var $header = $('#zmd-header');
    var $line = $('#zmd-line');
    var $undo = $('#zmd-undo');
    var $redo = $('#zmd-redo');
    var $save = $('#zmd-save');
    var $open = $('#zmd-open');
    var $download  = $('#zmd-download');
    var $question = $('#zmd-question');


    /**
     * 加粗
     */
    $bold.click(function () {
        ztxt.isSelectedText()
            ? ztxt.insert('**粗体文本**').setSelectedOffset(2, -2)
            : ztxt.insert('**', '**').setSelectedOffset(2, -2);
    });

    /**
     * 斜体
     */
    $italic.click(function () {
        ztxt.isSelectedText()
            ? ztxt.insert('*斜体文本*').setSelectedOffset(1, -1)
            : ztxt.insert('*', '*').setSelectedOffset(1, -1);
    });


    /**
     * 插入链接
     */
    {
        var $linkWindow = $('.link-window-background');

        $('.link-cancel').click(function () {
            $linkWindow.hide();
            $('.link-title input').val('');
            $('.link-url input').val('');
        });

        $('.link-ok').click(function () {
            insertLink();
            $linkWindow.hide();
            $('.link-title input').val('');
            $('.link-url input').val('');
        });

        $linkWindow.click(function () {
            $linkWindow.hide();
        });

        $('.link-window').click(function (evt){
            evt.stopPropagation();
        });
        $chain.click(function () {
            $linkWindow.show();
        });
    }

    /**
     * 引用
     */
    $quote.click(function () {
        ztxt.isSelectedText()
            ? ztxt.insert('\n> 段落引用\n').setSelectedOffset(3, -1)
            : ztxt.insert('\n> ', '\n').setSelectedOffset(3, -1);
    });

    /**
     * 代码
     */
    $code.click(function () {
        ztxt.isSelectedText()
            ? ztxt.insert('\n```\n\t插入代码\n```\n').setSelectedOffset(6, -5)
            : ztxt.insert('`', '`').setSelectedOffset(1, -1);
    });

    /**
     * 公式
     */
    $math.click(function () {
        ztxt.isSelectedText()
            ? ztxt.insert('\n$$ m^2 $$\n').setSelectedOffset(4, -4)
            : ztxt.insert('\n$$', '$$\n').setSelectedOffset(3, -3);
    });
    /**
     * 插入图片
     */
    {
        var $pictureWindow = $('.picture-window-background');

        $('.picture-cancel').click(function () {
            $pictureWindow.hide();
            $('.picture-title input').val('');
            $('.picture-upload input').val('');
        });

        $('.picture-ok').click(function () {
            insertPicture();
            $pictureWindow.hide();
            $('.picture-title input').val('');
            $('.picture-upload input').val('');
        });

        $pictureWindow.click(function () {
            $pictureWindow.hide();
        });

        $('.picture-window').click(function (evt){
            evt.stopPropagation();
        });

        $('.picture-upload input').change(function () {
            var filename = $('.picture-upload input')[0].files[0].name;
            $('.picture-upload-title').html(filename);
        });

        $picture.click(function () {
            $pictureWindow.show();
        });
    }

    /**
     * 无序列表
     */
    $list_ul.click(function () {
        ztxt.insert('\n - 无序列表项\n').setSelectedOffset(4, -1);
    });

    /**
     * 有序列表
     */
    $list_ol.click(function () {
        ztxt.insert('\n 1. 有序列表项\n').setSelectedOffset(5, -1);
    });

    /**
     * 表单
     */
    $table.click(function () {
        ztxt.insert('\n' +
            '| 表头 0  | 表头1    |  表头2  |\n' +
            '| :-----  | -----:   | :----:  |\n' +
            '| 居左    |   局右   |   居中  |\n').setSelectedOffset(1, -1);
    });

    /**
     * 一级标题
     */
    $header.click(function () {
        ztxt.isSelectedText()
            ? ztxt.insert('\n## 二级标题 ##\n').setSelectedOffset(4, -4)
            : ztxt.insert('\n## ', ' ##\n').setSelectedOffset(4, -4);
    });

    /**
     * 横线
     */
    $line.click(function () {
        ztxt.insert('\n\n----------\n\n');
    });

    /**
     * undo / redo
     */
    {
        textarea.contentEditable = true;

        $undo.click(function () {
            document.execCommand("undo", false, null);
        });

        $redo.click(function () {
            document.execCommand("redo", false, null);
        });
    }

    /**
     * 线上保存，待实现
     */
    $save.click(function () {

    });

    /**
     * 生成文件并下载到本地
     */
    $download.click(function () {
        var title = $('#zmd-title-input').val();

        if(title === '')
            title = 'zmd-download.md';
        else
            title += '.md';

        var aLink = document.createElement('a');
        var blob = new Blob([textarea.value]);

        var url = window.URL.createObjectURL(blob);
        aLink.download = title;
        aLink.href = url;
        aLink.click();
        window.URL.revokeObjectURL(url);
    });

    // 打开本地文件进行编辑
    {
        $('#input-file').change(function () {
            var file = this.files[0];

            $('#zmd-title-input').val(file.name.replace('.md',''));

            var reader = new FileReader();
            reader.onload = function (evt) {
                var $textarea = $(textarea);

                $textarea.val(evt.target.result);
                autosize.update($textarea);

                $textarea.trigger('input');
                $textarea.trigger('propertychange');
            };

            reader.readAsText(file);
        });
        
        $open.children('i').click(function () {
            $('#input-file').click();
        });
    }


    /**
     * 帮助，待实现
     */
    $question.click(function () {

    });
}

/**
 * 插入链接
 */
function insertLink() {
    var title = $('.link-title input').val();
    var url = $('.link-url input').val();

    if(title === '' && url !== '') {
        title = url;
    }
    else if(title === url === ''){
        return;
    }

    var link = '[' + title +'](' + url +')';
    ztxt.insert(link);
}

/**
 * 插入如图片
 */
function insertPicture() {

    var title = $('.picture-title input').val();
    var url = '';

    var file = $('.picture-upload input')[0].files[0];

    // $.ajax({
    //
    // })

    if(!file || url) return;

    var picture = '![' + title + '](' + url +')';
    ztxt.insert(picture);
}

/**
 * 拖拽上传文件
 * @param area_id
 */
function dragUploadFile(area_id) {
    var dropzone = document.getElementById(area_id);
    dropzone.addEventListener('dragover', handleDragOver, false);
    dropzone.addEventListener('drop', handleFileSelect, false);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    evt.dataTransfer.dropEffect = 'copy';
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    if (!file.type.match('image.*')) {
        return;
    }
    else if(file.size > 10 * 1024 * 1024){
        alert('文章添加的图片大小不能超过10MB!');
        // messageBox('O_O\'', '文章添加的图片大小不能超过10MB！');
        return;
    }

    var fd = new FormData();
    fd.append('file', f);
    $.ajax({
        url: '/upload_article_image',
        type: "POST",
        data: fd,
        async: true,
        processData: false,
        contentType: false,

        success: function(data) {
            ztxt.insert('![在这里写描述]('+ data +')');
        }
    });
}



(function () {

    var textarea = { };

    this.ztxt = {
        config:function (textareaId) {
            textarea = document.getElementById(textareaId);
        },

        insert: function (first, second) {
            if(!textarea || !window.getSelection)
                return;

            /**
             * 记录光标位置
             */
            var strPos = textarea.selectionStart;
            var insertText = first;

            if(arguments.length === 2) {
                /**
                 * 获取选中的文本
                 */
                var endPos = textarea.selectionEnd;
                var select =(textarea.value).substring(strPos, endPos);

                insertText = first + select + second;
            }

            /**
             * 添加插入文本
             */
            textarea.focus();
            document.execCommand("insertText", false, insertText);

            textarea.selectionStart = strPos;
            textarea.selectionEnd = strPos + insertText.length;

            return this;
        },

        setSelectedOffset:function (startOffset, endOffset) {
            textarea.selectionStart += startOffset;
            textarea.selectionEnd += endOffset;
        },

        isSelectedText: function () {
            return textarea.selectionEnd === textarea.selectionStart;
        }
    }

})();
