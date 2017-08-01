/**
 * Created by ice on 2017/6/3.
 *
 */
$(document).ready(function () {

    HOME.notices.render({page: 0, template: $('#notice-template').html(), container: '.notices-list'});

    $('.load-more').click((function () {
        let page = 0;

        return function () {
            page += 1;
            HOME.notices.render({ page: page, template: $('#notice-template').html(), container: '.notices-list'} );
        };
    })());
});



let HOME = {};

HOME.notices = (function () {
    let conf = {};

    return {
        render:function (config) {
            conf.page = config.page || 0;
            conf.template = config.template;
            conf.container = config.container;

            $.post("/user/notices/all", { page: conf.page }, function (data) {
                console.log(data);

                data.notices.forEach(function (item) {
                    let data = {
                        content: item.content
                    };

                    $(conf.container).append(Z.template(conf.template, data));
                });

                if(data.hasNext === false)
                    $('.load-more').hide();
            });
        }
    }
})();