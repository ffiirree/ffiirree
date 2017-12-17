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
    let mode = "edit";


    // 提交/更新文章
    function __submit__() {
        let cid = $('#categories').val();
        if(mode === "edit") {
            $.post('/article/submit', { cid: cid, title:article.title, content:article.content, topics: topics }, function (data) {
                if(data.status === "success")
                    location.href = "/article/" + data.articleId;
            });
        }
        else {
            $.post('/article/update', { id: article.id, cid: cid, title:article.title, content:article.content, topics: topics }, function (data) {
                if(data.status === "success")
                    location.href = "/article/" + data.articleId;
            });
        }
    }

    //
    function __setCategories__() {

        $.post('/article/categories', null, function (data) {
            if(data.status === 'success') {
                new Minx({
                    $:"#categories",
                    data: {
                        categories: data.categories
                    }
                });
            }
        });
    }


    function __setTopics__() {

        new Minx({
            $:"#topic-list",
            data: {
              topics: topics
            },
            methods: {
                remove: function(args) {
                    topics.splice(args[0], 1);
                }
            }
        });


        $('#topics').keyup(function (event) {
            if(event.keyCode === 13) {

                let topic = $(this).val();
                if(topic.replace(/[\s]+/g, '') && topics.length < 5) {
                    $(this).val('');
                    topics.push(topic);
                }
            }
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

            // 获取文章分类列表
            __setCategories__();

            // 添加topic
            __setTopics__();

            //////////////////////////////////////////////////////////////////////////
            // Modify
            if(Router.hash.get("type") === "modify" && Router.hash.get("id")) {
                mode = "modify";
                $.post('/article/' + Router.hash.get("id"), null, function (data) {
                    article = data;
                    // 获取文章并设置标题和内容
                    $('#title-input').val(data.title);
                    editor.codemirror.setValue(data.content);

                    // 设置该文章的分类
                    $('#categories').val(article.cid);

                    // 设置改文章的topics
                    article.topics && article.topics.forEach(item=>{
                        topics.push(item.name);
                    });
                });
            }
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
