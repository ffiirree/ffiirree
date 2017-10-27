$(document).ready(function () {

    // 搜索框的动画
    FIRE.searchBar();

    FIRE.search.init();

    //
    $('#search-input').keydown(function (event) {
        if(event.keyCode === 13){
            FIRE.search.run($(this).val());
        }
    });

});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.search = (function () {

    let attr = {};

    /**
     * 如果value 不为空则设置hash值，否则返回当前的hash值
     * @private
     */
    function __hash__(value) {
        return value ? (window.location.hash = '!/' + value): window.location.hash.toString().replace('#!/', '');
    }


    /**
     * 返回页面值
     * @private
     */
    function __page__() {
        return /page=(\d+)/g.exec(__hash__())[1];
    }

    /**
     * 返回页面值
     * @private
     */
    function __type__() {
        return /type=([a-z]+)/g.exec(__hash__())[1];
    }

    Object.defineProperty(attr, 'route', {
        get:function () {
            return {
                type: __type__(),
                page: __page__()
            };
        },
        set:function (val) {

            __hash__(__hash__().replace(/type=([a-z]+)/g, 'type=' + val.type));
            __hash__(__hash__().replace(/page=(\d+)/g, 'page=' + val.page.toString()));

            $('.current-page').html(__page__());


            $('.header li').attr('class', '');
            $('#' + __type__()).attr("class",  "selected");

            __search__($('#search-input').val());
        }
    });

    function __render_articles__(articles, word) {
        $('#list').html('');

        let pattern = new RegExp(word.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), 'g');

        articles.forEach(function (article) {
            let data = {
                id: article.id,
                title: article.title.replace(pattern, "<span class='search-word'>" + word + "</span>"),
                content: article.content.substr(0, 100).replace(pattern, "<span class='search-word'>" + word + "</span>") + '...',
                category: article.category,
                submitTime: article.submitTime.substr(0, 10),
                readNumber: article.readNumber,
                commentNumber: 0
            };

            !data.page ? $('.pagination').hide() : $('.pagination').show();
            let $article = $('#article-template').tmpl(data);
            let $topics = $article.find('.topics');

            article.topics.forEach(function (item) {
                let $topic = $('<span class="topic">' + item.name + '</span>');
                $topics.append($topic)
            });

            $article.appendTo('#list');
        });
    }

    function __render_topics__(topics) {
        $('#list').html('');

        // !data.page ? $('.pagination').hide() : $('.pagination').show();
    }

    function __search__(word) {
        if(word === "")
            return;

        if(__type__() !== 'topic'){
            $.post('/search/article', { word: word, page: __page__(), size: 20}, function (data) {
                console.log(data);
                __render_articles__(data.articles, word);
            });
        }
        else {
            $.post('/search/topic', { word: word, page: __page__(), size: 20}, function (data) {
                console.log(data);
                __render_topics__(data);
            });
        }

    }
    return {
        init:function () {
            if(__hash__() === ""){
                __hash__("type=article&page=0");
                attr.route = { page: 0, type: 'article'};
            }
            else {
                attr.route = { page: __page__(), type: __type__() };
            }

            $('#article').click(function () {
                attr.route = { page: 0, type:'article'};
            });

            $('#topic').click(function () {
                attr.route = { page: 0, type: 'topic' };
            });
        },

        run: function (word) {
            __search__(word);

            $('.page').show();

        }
    };
})();

/**
 * @brief 设置搜索框的动作
 */
FIRE.searchBar = function () {
    $('#search-input').focus(function () {
        $('.search-bar').css({
            'border-bottom' : '1px solid #3a90f2'
        }).animate({
            width:'55%'
        });
    }).blur(function () {
        $('.search-bar').css({
            border: '1px solid #e7eaf1'
        }).animate({
            width:'350px'
        });
    }).focus();
};