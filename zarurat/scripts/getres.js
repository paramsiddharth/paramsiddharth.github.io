$(function() {
	switch ($('#main').attr('data-kind')) {
		case 'song': 
			getSong();
			break;
		case 'album': 
			getAlbum();
			break;
		case 'soft': 
			getSoft();
			break;
		case 'text': 
			getText();
			break;
	}
});

const getSong = () => {
	let param = new URLSearchParams(location.search),
	song = param.get('song'),
	title = $('.songtitle'),
	dat = $('.songdata'),
	songdir = './songinfo/',
	artdir = songdir+'art/';
	$.getJSON(songdir+'song-'+song+'.json', function(obj) {
		document.title = obj.name+' - Param Siddharth';
		title.text(obj.name);
		let t;
		t = $('<p></p>').html(obj.about.replace(/\n/g, '<br/>'));
		dat.append(t);
		if (obj.art) {
			t = $('<img alt="Cover Art" style="display:block;width:80%;max-width:250px;margin:0 auto;border: solid 1px white;">').attr('src', artdir+obj.art);
			dat.append(t);
		}
		t = $('<h2></h2>').text('Details');
		dat.append(t);
		t = $('<p></p>');
		dat.append(t);
		let list = $('<ul></ul>');
		t.append(list);
		for (let prop in obj.details) {
			if (prop != 'Album') {
				t = $('<li></li>').text(
					prop+': '+obj.details[prop]
				);
				list.append(t);
			} else {
				let det = obj.details[prop];
				t = $('<a></a>').text(det[0]).attr({
					href: "./album.html?album="+det[1]
				});
				t = $('<li></li>').text(prop+': ').append(t);
				list.append(t);
				t = $('<a></a>').text(det[0]).attr({
					href: "./album.html?album="+det[1]
				});
				$('.breadcrumb .active').before(t);
				t.after(' ');
			}
		}
		t = $('<h2></h2>').text('Listen');
		dat.append(t);
		list = $('<ul></ul>');
		dat.append(list);
		for (let prop in obj.listen) {
			t = $('<a target="_blank"></a>').text(prop).attr({
				alt: prop,
				href: obj.listen[prop]
			});
			if (prop.toLowerCase().includes('download'))
				t = t.attr({ download: obj.listen[prop].split('/').at(-1) });
			list.append($('<li></li>').append(t));
		}
		t = $('<a target="_blank"></a>').text("More...").attr({
			alt: "More...",
			href: "http://google.com/search?q="+(obj.name+' by Param Siddharth').replace(/ /g, "%20")
		});
		list.append(t);
		t = $('<h2></h2>').text('Lyrics');
		dat.append(t);
		t = $('<p></p>').html(obj.lyrics.replace(/\n/g, '<br/>'));
		dat.append(t);
	});
};

const getText = () => {
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
};

const getSoft = () => {
	let param = new URLSearchParams(location.search),
	proj = param.get('proj'),
	title = $('.maintitle'),
	dat = $('.maindata'),
	softdir = './softinfo/',
	imgdir = softdir+'img/';
	$.getJSON(softdir+'soft-'+proj+'.json', function(obj) {
		document.title = obj.name+' - Param Siddharth';
		title.text(obj.name);
		let t;
		t = $('<p></p>').html(obj.about.replace(/\n/g, '<br/>'));
		dat.append(t);
		if (obj.img != undefined) {
			t = $('<img alt="Project-Related Image" style="display:block;width:80%;max-width:250px;margin:0 auto;border: solid 1px white;">').attr('src', imgdir+obj.img);
			dat.append(t);
		}
		t = $('<h2></h2>').text('Details');
		dat.append(t);
		t = $('<p></p>');
		dat.append(t);
		let list = $('<ul></ul>');
		t.append(list);
		for (let prop in obj.details) {
			t = $('<li></li>').html(
				prop+': '+obj.details[prop]
			);
			list.append(t);
		}
		t = $('<h2></h2>').text('View');
		dat.append(t);
		list = $('<ul></ul>');
		dat.append(list);
		for (let prop in obj.view) {
			t = $('<a target="_blank"></a>').text(prop).attr({
				alt: prop,
				href: obj.view[prop]
			});
			list.append($('<li></li>').append(t));
		}
		t = $('<a target="_blank"></a>').text("More...").attr({
			alt: "More...",
			href: "http://google.com/search?q="+(obj.name+' by Param Siddharth').replace(/ /g, "%20")
		});
		list.append(t);
	});
};

const getAlbum = () => {
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
		t = $('<img alt="Cover Art" style="display:block;width:80%;max-width:250px;margin:0 auto;border: solid 1px white;">').attr('src', artdir+obj.art);
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
};