/**
 * @file index.js
 *
 * @author ffiirree
 * @update 2017.11.9
 */
$(document).ready(function() {
    $('#index-loading').remove();
    FIRE.index.render();
});


if(typeof FIRE === "undefined") FIRE = {};
FIRE.index = (function () {

    let attr = {
        lastPage: 0,
        currentPage:0
    };
    let _articles = {}, _pagination = {};

    return {
        render: function () {
            if(!Router.hash.value)
                Router.hash.value = { scope: 0, page: 0};

            this.pagination();
            this.categories();
            this.route();

            _articles = new Minx({ $: '#list', data: { articles: [] } });
            this.articles();
        },

        route: function () {
            window.onhashchange = function () {
                _pagination.current = Router.hash.get('page');
                FIRE.index.articles();
            }
        },

        categories:function () {
            $.post('/article/categories', null, function (data) {
                if(data.status === "success"){

                    new Minx({
                        $:'#categories',
                        data: {
                            categories: data.categories
                        },
                        methods: {
                            category: function (data) {
                                Router.hash.value = { scope: data[0], page: Router.hash.get('page') };
                            }
                        }
                    });
                }
            });
        },

        pagination: function () {
            _pagination = new Minx({
                $:'#pagination',
                data: {
                    page: 0,
                    current: 0
                },

                methods: {
                    first: function () {
                        attr.currentPage = 0;
                        Router.hash.value = { scope:Router.hash.get('scope'), page: attr.currentPage };
                    },
                    next: function () {
                        attr.currentPage = attr.currentPage < attr.lastPage ? attr.currentPage + 1 : attr.lastPage;
                        Router.hash.value = {scope:Router.hash.get('scope'), page: attr.currentPage };
                    },
                    prev:function () {
                        attr.currentPage = attr.currentPage > 0 ? attr.currentPage - 1 : 0;
                        Router.hash.value = { scope:Router.hash.get('scope'), page: attr.currentPage };
                    },
                    last: function () {
                        attr.currentPage = attr.lastPage;
                        Router.hash.value = { scope:Router.hash.get('scope'), page: attr.currentPage };
                    }
                }
            })
        },

        articles:function () {
            $.post('/article', { scope:Router.hash.get('scope'), page: Router.hash.get('page'), size:10 }, function (data) {

                if(data.status === "success") {
                    attr.lastPage = data.page;
                    _pagination.page = data.page;
                    _articles.articles = data.articles;
                }
            });
        }
    }
})();