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

    let articles_ = {};

    return {
        init:function () {
            Hash.change(() => {
                $('.header li').attr('class', '');
                $('#' + Hash.get("type")).attr("class",  "selected");
            });

            if (!Hash.get("type")) {
                Hash.value = {"type": "article", "page": 0};
            }
            else {
                $('.header li').attr('class', '');
                $('#' + Hash.get("type")).attr("class",  "selected");
            }

            articles_ = new Vue({
                el: "#list",
                data: { articles: []},
            });

            $('#article').click(function () {
                Hash.value = { page: 0, type:'article'};
            });

            $('#topic').click(function () {
                Hash.value = { page: 0, type: 'topic' };
            });
        },

        run: function (word) {
            if(word === "")
                return;

            if(Hash.get("type") !== 'topic') {
                $.post('/search/article', { word: word, page: Hash.get("page"), size: 20}, function (data) {
                    articles_.articles = data.articles;
                });
            }
            else {
                $.post('/search/topic', { word: word, page: Hash.get("page"), size: 20}, function (data) {
                });
            }

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