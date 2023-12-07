/*
 * @Author: CoderLHY
 * @Date: 2016-12-09 20:06:36
 * @LastEditors: CoderLHY
 * @LastEditTime: 2021-04-08 11:54:44
 * @Descripttion: 
 */
/**
 *  Plugin Name: jQuery toTop for smoothly Scroll back to Top
 *  Plugin URL: https://github.com/mmkjony/jQuery.toTop
 *  Version: 1.1
 *  Author: MMK Jony
 *  Author URL: https://github.com/mmkjony
 *  License: Licensed under MIT
 **/
//新建一个div元素节点
var div = document.createElement("div");
div.className = 'to-top'
//把div元素节点添加到body元素节点中成为其子节点，但是放在body的现有子节点的最后
document.body.appendChild(div);
//插入到最前面
document.body.insertBefore(div, document.body.firstElementChild);
$(function () {
    $('.to-top').append(`<svg class="Zi Zi--BackToTop"  fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg>`);
    $('.to-top').toTop();
});
(function ($) {
    'use strict';

    $.fn.toTop = function (opt) {

        //variables
        var elem = this;
        var win = $(window);
        var doc = $('html, body');

        //Extended Options
        var options = $.extend({
            autohide: true,
            offset: 420,
            speed: 500,
            position: true,
            right: 30,
            bottom: 60
        }, opt);

        elem.css({
            'cursor': 'pointer'
        });

        if (options.autohide) {
            elem.css('display', 'none');
        }

        if (options.position) {
            elem.css({
                'position': 'fixed',
                'right': options.right,
                'bottom': options.bottom,
            });
        }

        elem.click(function () {
            doc.animate({ scrollTop: 0 }, options.speed);
        });

        win.scroll(function () {
            var scrolling = win.scrollTop();

            if (options.autohide) {
                if (scrolling > options.offset) {
                    elem.fadeIn(options.speed);
                }
                else elem.fadeOut(options.speed);
            }

        });

    };

}(jQuery));

