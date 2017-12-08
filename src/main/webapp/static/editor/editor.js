/**
 * Created by ice on 2017/5/16.
 *
 */
$(document).ready(function () {

    EDITOR.init();

    $('#article-submit').click(function () {
        EDITOR.showTopicWindow();
    });

    $('#submit-article').click(function () {
        EDITOR.submit();
    });

    $('.article-details').click(function (evt) {
        evt.stopPropagation();
    });
    $('.article-details-background').click(function () {
        $(this).hide();
    });
});

let EDITOR = (function () {

    let article = {};
    let topics = [];
    let editor = null;


    function __submit__() {
        let cid = $('#categories').val();
        console.log(cid);
        $.post('/article/submit', { cid: cid, title:article.title, content:article.content, topics: topics }, function (data) {
            if(data.status === "success")
                location.href = "/home";
        });
    }

    return {

        init:function () {
            editor = new Editor({
                selector: '#editor',
                mode: 'normal-mode',
                menu: true,
                upload: true
            });

            $.post('/article/categories', null, function (data) {
                if(data.status === 'success'){
                    data.categories.forEach(function (item) {
                        let $option = $('<option value="'+item.id+'">'+item.name+'</option>');
                        $option.appendTo('#categories');
                    });
                }
            });

            $('#topics').keyup(function (event) {
                if(event.keyCode === 13){
                    console.log('Ok');

                    let topic = $(this).val();
                    if(topic !== "" && topics.length < 5){
                        $(this).val('');

                        topics[topics.length] = topic;

                        let $topic = $('<span class="topic-cell"><span>'+topic+'</span><span class="fa fa-close"></span></span>');
                        $topic.find('.fa-close').click(function () {
                            $topic.remove();
                        });
                        $('.add-topics').append($topic);
                    }
                }
            });

        },

        showTopicWindow:function () {
            article.title = $('#title-input').val();
            article.content = editor.codemirror.getValue();

            if(article.title === "") {
                messageBox('O_O', "文章标题不能为空!");
            }
            else if(article.content === "") {
                messageBox('O_O', "文章内容不能为空!");
            }
            else {
                $('.article-details-background').show();
            }
        },

        submit:function () {
            __submit__();
        }
    }

})();
