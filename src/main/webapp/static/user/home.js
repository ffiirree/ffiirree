/**
 * Created by ice on 2017/5/18.
 *
 */
$(document).ready(function () {
    HOME.init({
        index: $('#index'),
        article: $('#article'),
        collection: $('#collection'),
        setting: $('#setting'),
        upload: $('#upload'),
        user_id: $('#host-id').text()
    });

    $('#concern').click(function () {
        HOME.concern();
    });

    $('.load-more').click(function () {
        HOME.index.render();
    });
});

let HOME = (function () {
    let menu = {
        mouse: function () {
            // 菜单鼠标事件
            let $secondaryNav = $('.secondary-nav li');

            $secondaryNav.mousemove(function () {
                $(this).css({ 'border-bottom': '#3d8fd1 3px solid' });
                $secondaryNav.not(this).css({ 'border-bottom': 'white' });
            });

            $secondaryNav.mouseout(function () {
                $secondaryNav.css({ 'border-bottom': 'white' });
                $('.selected').css({ 'border-bottom': '#3d8fd1 3px solid' });
            })
        }
    };

    /**
     * 显示当前界面
     * @param page
     * @private
     */
    function __page__(page) {
        $('.display section').hide();
        $(page).show();
    }

    /**
     * 如果value 不为空则设置hash值，否则返回当前的hash值
     * @private
     */
    function __hash__(value) {
        return value ? (window.location.hash = '!/' + value): window.location.hash.toString().replace('#!/', '');
    }

    return {

        init: function (config) {
            menu.index = config.index;
            menu.collection = config.collection;
            menu.article = config.article;
            menu.setting = config.setting;
            menu.upload = config.upload;

            // 用户ID
            HOME.user_id = config.user_id;

            // 注册菜单点击事件
            menu.index.click(() => __hash__('index'));
            menu.article.click(() => __hash__('article'));
            menu.collection.click(() => __hash__('collection'));
            menu.setting.click(() => __hash__('setting'));
            menu.upload.click(() => __hash__('upload'));

            // 刷新或者初始化
            __page__('#'+__hash__() + '-page');
            HOME[__hash__()].render();

            // hash 变化事件
            window.onhashchange = function () {
                // 显示
                __page__('#' + __hash__() + '-page');
                // 数据渲染
                HOME[__hash__()].render();

                // 菜单下滑线
                $('.selected').attr('class', '').css({ 'border-bottom':'none' });
                $('#' + __hash__()).attr('class', 'selected').css({ 'border-bottom': '#3d8fd1 3px solid' });
            };

            menu.mouse();
        },

        concern: function () {
            $.post('/user/concern', { user_id: HOME.user_id }, function (data) {
                console.log(data);
            })
        }
    }
})();

/**
 * 首页
 * @type {{render}}
 */
HOME.index = (function () {

    let action = {
        1: "添加",
        2: "赞同",
        3: "收藏",
        4: "评论",
        5: "回答"
    };

    let object = {
        1: "文章",
        2: "问题",
        3: "话题",
        4: "上传"
    };

    let page = 0;

    return {
        render:function () {
            let template = $('#news-template').html();
            let $list = $('#index-page .list');

            $.post('/user/news', { user_id: HOME.user_id, page: page}, function (data) {
                page += 1;

                if(!data.hasNext) $('.load-more').hide();

                data.news.forEach(function (item) {
                    let url = "";

                    if(item.object === "1") {
                        url = '/article/' + item.link_id;
                    }
                    else if (item.object === "2") {
                        url = '/ask/question/' + item.link_id
                    }
                    else if (item.object === "3") {
                        url = '/topic/' + item.link_id;
                    }else if (item.object === "4") {
                        url = '/upload/' + item.link_id;
                    }


                    let data = {
                        action: action[item.action],
                        object: object[item.object],
                        avatar: item.avatar,
                        username: item.username,
                        signature: "",
                        title: item.title,
                        url: url,
                        content: item.content.substring(0, 120)
                    };
                    $list.append(Z.template(template, data));

                });
                console.log(data);
            })
        }
    }
})();

/**
 * 我的文章
 * @type {{render}}
 */
HOME.article = (function () {
    return {
        render: function () {
            let template = $('#article-template').html();
            let $article_list = $('.article-list');

            $.post('/user/articles', { user_id: HOME.user_id }, function (articles) {

                // 清空文章列表
                $article_list.html('');

                // 渲染文章列表
                articles.forEach(function (item, index, array) {
                    let data = {
                        id: item.id,
                        title: item.title,
                        content: item.content.substring(0, 120),
                        submit_time: item.submit_time,
                        read_num: item.read_num
                    };

                    $article_list.append(Z.template(template, data));
                });
            });
        }
    }
})();

/**
 * 我的收藏页面
 * @type {{render}}
 */
HOME.collection = (function () {
    return {
        render:function () {
            let template = $('#collection-template').html();
            let $collection_list = $('#collection-page .list');

            $.post("/article/collections", { user_id: HOME.user_id }, function (articles) {
                $collection_list.html('');

                articles.forEach(function (item, index, array) {
                    let data = {
                        id: item.id,
                        title: item.title,
                        content: item.content.substring(0, 120),
                        submit_time: item.submit_time,
                        read_num: item.read_num
                    };

                    $collection_list.append(Z.template(template, data));
                });
            });
        }
    }
})();

/**
 * 我的下载页面
 * @type {{render}}
 */
HOME.upload = (function () {
    return {
        render:function () {
            let template = $('#upload-template').html();
            let $upload_list = $('#upload-page .list');

            $.post("/user/downloads", { user_id: HOME.user_id, page: 0 }, function (upload_data) {
                console.log(upload_data);
                $upload_list.html('');

                upload_data.downloads.forEach(function (item) {
                    let data = {
                        id: item.id,
                        title: item.title,
                        intro: item.intro,
                        submit_time: item.submit_time
                    };

                    $upload_list.append(Z.template(template, data));
                });
            });
        }
    }
})();

/**
 * 设置页面
 * @type {{render}}
 */
HOME.setting = (function () {

    return {
        render:function () {
            let $update_avatar = $('#update-avatar-button');
            let $update_user = $('#update-user-info-button');
            let $update_password = $('#update-password-button');

            $update_avatar.click(function () {

            });

            $update_user.click(function () {

            });

            $update_password.click(function () {
                let password = $('.input-old-password').val();
                let $new_password_1 = $('.input-new-password-1');
                let $new_password_2 = $('.input-new-password-2');

                if($new_password_2.val() !== $new_password_1.val() && $new_password_1.val() !== '') {
                    messageBox("O_O", '两次输入的密码不一致!');
                    return;
                }

                $.post('/user/update/password', { old_password: password , new_password: $new_password_1.val() }, function (data) {
                    console.log(data)
                })
            });
        }
    }
})();

