$(document).ready(function () {

    FIRE.manager.render();

});

if(typeof FIRE === "undefined") FIRE = {};
FIRE.manager = (function () {

    let attr_ = {
        current_page : 0,
        last_page: 0
    };

    let current_category_id = 0;

    let articles_ = {}, categories_ = {}, select_categories_ = {}, select_update_categories_ = {};

    //! 设置为文章模式，并获取文章列表
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

    //! 管理分类，并获取分类列表
    function __categories__() {
        Router.hash.set("type", "categories");
        $('.section').hide();
        $("#categories-list").show();

        $.post('/category/all', null, function (data) {
            if(data.status === "success") {
                categories_.categories = data.categories;
                select_categories_.categories = data.categories;
                select_update_categories_.categories = data.categories;
            }
        });
    }

    //! 导航
    function __header__() {
        $('.selected').attr("class", "");
        $('#' + Router.hash.get("type")).attr("class", "selected");
    }

    //! 删除文章
    function __delete_article_by_id__(id) {
        $.post('/article/delete', { id: id }, function (data) {
            window.location.reload(true);
        });
    }

    function __delete_category_by_id__(id) {
        $.post('/category/delete', { id: id }, function (data) {
            window.location.reload(true);
        });
    }

    function __insert_category__() {
        let name = $("#input-category-name").val();
        let parent_id = $('#categories-select').val();

        if(name) {
            $.post("/category/insert", { parent_id: parent_id, name: name}, function (data) {
                // console.log(data);
                window.location.reload(true);
            });
        }
    }

    function __update_category__() {
        let name = $("#update-category-name").val();
        let parent_id = $('#update-categories-select').val();

        if(name) {
            $.post("/category/update/name", { id:current_category_id, name: name}, function (data) {
                $.post("/category/update/parent_id", { id:current_category_id, parent_id: parent_id}, function (data) {
                    window.location.reload(true);
                });
            });
        }
    }

    return {

        render: function () {
            articles_ = new Minx({
                $: '#article-list',
                data: {articles: []},
                methods: {
                    delete: function (args) {
                        let _article = args[0];
                        $('#delete-type').text('文章');
                        $('#delete-name').text(_article.title);
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
                    modify(args) {

                        let category = args[0];
                        let window = $('#update-category-window');

                        current_category_id = category.id;
                        window.find('input').val(category.name);
                        window.find('select').val(category.parent_id);
                        window.show();
                    },
                    delete: function (args) {
                        let _category = args[0];

                        $('#delete-type').text('分类');
                        $('#delete-name').text(_category.name);
                        $('#delete-do').click(()=>{
                            __delete_category_by_id__(_category.id);
                            $('#delete-window').hide();
                        });
                        $('#delete-window').show();
                    }
                }
            });

            select_categories_ = new Minx({ $:'#categories-select', data: { categories: [] } });
            select_update_categories_ = new Minx({ $:'#update-categories-select', data: { categories: [] } });

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

            // 插入分类
            $("#insert-category-cancel").click(function () {
                $("#insert-category-window").hide();
            });
            $("#insert-category").click(()=>{
                $("#insert-category-window").show();
            });

            $('#insert-category-do').click(function () {
                __insert_category__();
            });

            //
            $('#update-category-cancel').click(function () {
                $('#update-category-window').hide();
            });

            $('#update-category-do').click(function () {
                __update_category__();
            })
        }
    }
})();