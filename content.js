/**
 * Id for embed element on the page
 * @const
 * @type {string}
 */
var EXTENTION_ELEMENT_ID = 'ex-flv-extention-element';


/**
 * Source code from this function will be embedded to the page
 * @param EXTENTION_ELEMENT_ID
 */
function embed_script(EXTENTION_ELEMENT_ID) {
    var div, list;
    //EX.UA save information to global variable player_list
    if ('undefined' !== typeof player_list) {
        div = document.getElementById(EXTENTION_ELEMENT_ID);

        list = JSON.parse(' [ ' + player_list + ' ] ');

        div.setAttribute('player_list', JSON.stringify(list));
        div.setAttribute('player_info', JSON.stringify(player_info));
    }

}


/**
 * Getting information from the page and updating HTML
 */
function process() {
    var div = document.getElementById(EXTENTION_ELEMENT_ID),
        player_list = div.getAttribute('player_list'),
        player_info = div.getAttribute('player_info'),
        i;
    if (player_list && player_info) {
        player_list = JSON.parse(player_list);
        player_info = JSON.parse(player_info);
        for (i in player_info) {
            update_page(player_list[i], player_info[i]);
        }
    }
}


/**
 * Adding new element to the page
 * @param list {object} player list object
 * @param info {object} media file object
 */
function update_page(list, info) {
    var $a = $('<a></a>'),
        $p = $('a[title="' + info.title + '"]');
    $a.attr('href', list.url).html(info.title + ' (compressed)');
    $p.before($a).before('<br>');
    $p.remove();
}


/**
 * Push source code to page
 */
function push_embed_script() {

    (function () {
        var div = document.createElement('div');
        div.id = EXTENTION_ELEMENT_ID;
        document.getElementsByTagName('body')[0].appendChild(div);
    })();

    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + embed_script + ')("' + EXTENTION_ELEMENT_ID + '");'));
    (document.body || document.head || document.documentElement).appendChild(script);

}

push_embed_script();

process();

