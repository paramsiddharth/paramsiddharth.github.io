$(function() {
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
		t = $('<img alt="Cover Art" style="display:block;width:80%;max-width:250px;margin:0 auto;border: solid 1px white;">').attr('src', artdir+obj.art);
		dat.append(t);
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
});