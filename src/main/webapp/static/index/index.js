/**
 * Created by ice on 2017/5/17.
 *
 */
$(document).ready(function() {
    FIRE.index.categories();
    // 渲染文章列表
    FIRE.index.articles();
});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.index = (function () {

    let page = 0;
    return {
        categories:function () {
          $.post('/article/categories', null, function (data) {
              if(data.status === "success"){
                  data.categories.forEach(function (item) {
                      let $c = $('<div class="'+item.id+'">'+item.name+'</div>');
                      $('#categories').append($c);
                  });

              }
          })
        },

        articles:function () {
            $.post('/article/all', {page: page, size:20}, function (data) {
                console.log(data);
                if(data.status === "success"){

                    data.articles.forEach(function (article) {
                        let data = {
                            id: article.id,
                            title: article.title,
                            content: article.content.substr(0, 100) + '...',
                            category: article.category,
                            submitTime: article.submitTime.substr(0, 10),
                            readNumber: article.readNumber,
                            commentNumber: 32
                        };

                        let $article = $('#article-template').tmpl(data);
                        let $topics = $article.find('.topics');

                        article.topics.forEach(function (item) {
                            let $topic = $('<span class="topic">' + item.name + '</span>');
                            $topics.append($topic)
                        });

                        $article.appendTo('#list');
                    })
                }
            })
        }
    }
})();