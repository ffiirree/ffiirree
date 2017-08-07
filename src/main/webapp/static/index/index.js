/**
 * Created by ice on 2017/5/17.
 *
 */
$(document).ready(function() {
    FIRE.index.categories();
    // 渲染文章列表
    FIRE.index.articles();


    $('.first-page').click(() => FIRE.index.firstPage());
    $('.prev-page').click(() => FIRE.index.prevPage());
    $('.next-page').click(() => FIRE.index.nextPage());
    $('.last-page').click(() => FIRE.index.lastPage());

});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.index = (function () {

    let attr = {
        lastPage: 0,
        currentPage:0
    };

    /**
     * 如果value 不为空则设置hash值，否则返回当前的hash值
     * @private
     */
    function __hash__(value) {
        return value ? (window.location.hash = '!/' + value): window.location.hash.toString().replace('#!/', '');
    }

    /**
     * 返回分类值
     * * @private
     */
    function __scope__() {
        return /scope=(\d+)/g.exec(__hash__())[1];
    }

    /**
     * 返回页面值
     * @private
     */
    function __page__() {
        return /page=(\d+)/g.exec(__hash__())[1];
    }

    /**
     * 获取文章列表，并进行渲染
     * @private
     */
    function __articles__(val) {
        $.post('/article', { scope: val.scope, page: val.page, size:10 }, function (data) {

            if(data.status === "success") {
                attr.lastPage = data.page;

                !data.page ? $('.pagination').hide() : $('.pagination').show();
                __render__(data.articles);
            }
        })
    }

    /**
     * 渲染列表中的一篇文章
     * @private
     */
    function __render__(articles) {
        $('#list').html('');

        articles.forEach(function (article) {
            let data = {
                id: article.id,
                title: article.title,
                content: article.content.substr(0, 100) + '...',
                category: article.category,
                submitTime: article.submitTime.substr(0, 10),
                readNumber: article.readNumber,
                commentNumber: 0
            };

            let $article = $('#article-template').tmpl(data);
            let $topics = $article.find('.topics');

            article.topics.forEach(function (item) {
                let $topic = $('<span class="topic">' + item.name + '</span>');
                $topics.append($topic)
            });

            $article.appendTo('#list');
        });
    }

    /**
     * 为attr定义setter和getter，绑定
     */
    Object.defineProperty(attr, 'route', {
        get:function () {
            return {
                scope: __scope__(),
                page: __page__()
            };
        },
        set:function (val) {

            __hash__(__hash__().replace(/scope=(\d+)/g, 'scope=' + val.scope.toString()));
            __hash__(__hash__().replace(/page=(\d+)/g, 'page=' + val.page.toString()));

            $('.current-page').html(__page__());
            __articles__(val);
        }
    });

    return {
        categories:function () {
          $.post('/article/categories', null, function (data) {
              if(data.status === "success"){
                  data.categories.forEach(function (item) {
                      let $c = $('<div class="' + item.id + '"><span>' + item.name + '</span><span>('+ item.count +')</span></div>');
                      $('#categories').append($c);

                      $c.click(() => attr.route = { page: 0,scope: item.id });
                  });
              }
          })
        },

        articles:function () {
            if(!__hash__()) {
                __hash__("scope=0&page=0");
                attr.route = {page:0, scope: 0};
            }
            else {
                attr.route = {page:__page__(), scope:__scope__()};
            }
        },

        firstPage:function () {
            attr.route = {page: 0, scope:__scope__()};
        },

        lastPage:function () {
            attr.route = {page: attr.lastPage, scope:__scope__()};
        },

        prevPage: function () {
            attr.currentPage = attr.currentPage > 0 ? attr.currentPage - 1 : 0;
            attr.route = {page: attr.currentPage, scope:__scope__()};
        },

        nextPage: function () {
            attr.currentPage = attr.currentPage < attr.lastPage ? attr.currentPage + 1 : attr.lastPage;
            attr.route = {page: attr.currentPage, scope:__scope__()};
        }
    }
})();