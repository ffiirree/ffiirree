$(document).ready(function () {

    FIRE.manager.render();

});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.manager = (function () {

    let attr_ = {
        current_page : 0,
        last_page: 0
    };

    let articles_ = {}, categories_ = {};

    function __article__ () {
        Router.hash.set("type", "article");

        $('.section').hide();
        $("#article-list").show();

        $.post('/article', { scope: 0, page: Router.hash.get('page'), size:20 }, function (data) {

            if(data.status === "success") {
                attr_.lastPage = data.page;
                articles_.articles = data.articles;
            }
        });
    }

    function __categories__() {
        Router.hash.set("type", "categories");
        $('.section').hide();
        $("#categories-list").show();

        $.post('/article/categories', null, function (data) {
            if(data.status === "success"){
                categories_.categories = data.categories;
            }
        });
    }

    function __header__() {
        $('.selected').attr("class", "");
        $('#' + Router.hash.get("type")).attr("class", "selected");
    }

    function __delete_article_by_id__(id) {
        $.post('/article/delete', { id: id }, function (data) {
            window.location.reload(true);
        });
    }

    return {

        render: function () {
            articles_ = new Minx({
                $: '#article-list',
                data: {articles: []},
                methods: {
                    delete: function (args) {
                        let _article = args[0];
                        console.log(_article)
                        $('#delete-window').find('#article-title').text(_article.title);
                        $('#delete-do').click(()=>{
                            __delete_article_by_id__(_article.id);
                            $('#delete-window').hide();
                        });
                        $('#delete-window').show();
                    }
                }
            });
            categories_ =  new Minx({
                $:'#categories-list',
                data: { categories: [] },
                methods: {
                    modify: function (args) {
                        let _category = args[0];
                        console.log(_category);
                    },
                    delete: function (args) {
                        let _category = args[0];
                        console.log(_category);
                    }
                }
            });

            if (!Router.hash.get("type")) Router.hash.value = {"type": "article", "page": 0};
            if (!Router.hash.get("page")) Router.hash.set("page", 0);
            if (Router.hash.get("type") === "article") {
                __article__();
            }
            else if(Router.hash.get("type") === "categories") {
                __categories__();
            }

            __header__();
            Router.hash.change(__header__);

            $('#article').click(() => {
                __article__();
            });
            $('#categories').click(() => {
                __categories__();
            });

            $('#delete-cancel').click(()=>{
                $('#delete-window').hide();
            });
        }
    }
})();