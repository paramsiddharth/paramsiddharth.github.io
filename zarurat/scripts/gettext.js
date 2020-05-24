$(function() {
    let param = new URLSearchParams(location.search),
    txt = param.get('text'),
    title = $('.maintitle'),
    dat = $('.maindata'),
    textdir = './textinfo/';
    $.get(textdir+txt+'.html', function(txt) {
        let ti = txt.substring(0, txt.indexOf('\n'));
        document.title = ti+' - Param Siddharth';
        title.text(ti);
        dat.html(txt.substring(txt.indexOf('\n')+1, txt.indexOf(';'))+txt.substring(txt.indexOf(';')+2, txt.length).replace(/\n/g, '<br/>'));
    });
});