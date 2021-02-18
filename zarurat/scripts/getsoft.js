$(function() {
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
});