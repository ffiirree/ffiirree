/**
 * Created by ice on 2017/6/4.
 *
 */

$(document).ready(function () {
    autosize($('#zmd-textarea'));

    $('#zmd-preview-button').click(function () {
        ZMD.ee.preview();
    });


    $('#zmd-nonpreview-button').click(function () {
        ZMD.ee.edit();
    });

    $('#zmd-edit-area').click(function () {
        $('#zmd-textarea').focus();
    });

});

let ZMD = {};
ZMD.ee = (function () {

    return{
        preview: function () {
            $('#zmd-edit-area').hide();
            $('#zmd-preview-area').show();

            $('#zmd-preview-button').hide();
            $('#zmd-nonpreview-button').show();
        },

        edit: function () {
            $('#zmd-edit-area').show();
            $('#zmd-preview-area').hide();

            $('#zmd-preview-button').show();
            $('#zmd-nonpreview-button').hide();
        }
    }
})();

