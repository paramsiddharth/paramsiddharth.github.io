$(function() {
    let param = new URLSearchParams(location.search),
    album = param.get('album'),
    title = $('.albumtitle'),
    dat = $('.albumdata'),
    songdir = './songinfo/',
    artdir = songdir+'art/';
    $.getJSON(songdir+'album-'+album+'.json', function(obj) {
        document.title = obj.name+' - Param Siddharth';
        title.text(obj.name);
        let t;
        t = $('<p></p>').html(obj.about.replace(/\n/g, '<br/>'));
        dat.append(t);
        t = $('<img alt="Cover Art" style="display:block;width:80%;margin:0 auto;border: solid 1px white;">').attr('src', artdir+obj.art);
        dat.append(t);
        t = $('<h2></h2>').text('Details');
        dat.append(t);
        t = $('<p></p>');
        dat.append(t);
        let list = $('<ul></ul>');
        t.append(list);
        for (let prop in obj.details) {
            t = $('<li></li>').text(
                prop+': '+obj.details[prop]
            );
            list.append(t);
        }
        t = $('<h2></h2>').text('Songs');
        dat.append(t);
        list = $('<ul></ul>');
        dat.append(list);
        for (let prop in obj.songs) {
            t = $('<a></a>').text(prop).attr({
                alt: prop,
                href: './song.html?song='+obj.songs[prop]
            });
            list.append($('<li></li>').append(t));
        }
        t = $('<a target="_blank"></a>').text("More...").attr({
            alt: "More...",
            href: "http://google.com/search?q="+(obj.name+' by Param Siddharth').replace(/ /g, "%20")
        });
        list.append(t);
    });
});