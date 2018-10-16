/**
 * @file index.js
 *
 * @author ffiirree
 * @update 2018.10.10
 */
$(document).ready(() => {
    let _categories =  new Vue({
        el:'#categories',
        data: {
            categories: [],
            show: []
        },
        methods: {
            category: function (c) {
                this.show[c.id] = !this.show[c.id];
                this.show[c.id] ? $("#SUBC_" + c.id).show() : $("#SUBC_" + c.id).hide();

                Hash.value = { scope: c.id, page: 0 };
            }
        }
    });

    let _articles = new Vue({
        el: '#list',
        data: { articles: [] }
    });

    let _pagination = new Vue({
        el:'#pagination',
        data: {
            LAST_PAGE: 0,
            page: 0
        },

        methods: {
            first: function () {
                this.page = 0;
                Hash.set("page", this.page);
            },
            next: function () {
                this.page = (this.page < this.LAST_PAGE) ? parseInt(this.page) + 1 : this.LAST_PAGE;
                console.log(this.page);
                Hash.set("page", this.page);
            },
            prev:function () {
                this.page = this.page > 0 ? parseInt(this.page) - 1 : 0;
                Hash.set("page", this.page);
            },
            last: function () {
                this.page = this.LAST_PAGE;
                Hash.set("page", this.page);
            }
        }
    });

    function loadArticles() {
        $.post('/article', { scope:Hash.get('scope'), page: Hash.get('page'), size:10 }, function (data) {
            if(data.status === "success") {
                _pagination.LAST_PAGE = data.page;
                _articles.articles = data.articles;
            }
        });
    }

    Hash.change(() => {
        _pagination.page = Hash.get('page');
        loadArticles();
    });

    if(Hash.empty()) {
        Hash.value = { scope: 0, page: 0 };
    }
    else {
        _pagination.page = Hash.get('page');
        loadArticles();
    }

    // Load articles.
    loadArticles();

    // Load categories.
    $.post('/category/top_all', null, function (data) {
        if(data.status === "success") {
            _categories.categories = data.categories;
        }
    });
});