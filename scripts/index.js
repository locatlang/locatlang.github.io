$(document).ready(function(){
	var reqFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(i){setTimeout(i,17)}
	$("#menu").click(function(){
		$(this).toggleClass('arrow-back');
		if( $(this).hasClass('arrow-back') ) {
			$("#sidebar, #sidebar-back").removeClass('hidden');
		} else {
			$("#sidebar, #sidebar-back").addClass('hidden');
		}
	}).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
		$(this).addClass('na');
		var that = this;
		reqFrame(function(){
			if( $(that).hasClass('arrow-back') ) {
				$(that).addClass('rev');
			} else {
				$(that).removeClass('rev');
			}
			reqFrame(function(){
				$(that).removeClass('na');
			});
		});
	}).inkripple(null,null,null,true);
	$("#sidebar-back").click(function(){
		$("#menu").removeClass('arrow-back');
		$("#sidebar, #sidebar-back").addClass('hidden');
	});
	$(".sidebar-item").click(function(){
		$(".sidebar-item").removeClass('selected');
		$("section").removeClass('active');
		$(this).addClass('selected');
		$("section[name=" + $(this).data('section') + "]").addClass('active');
		$("#sidebar, #sidebar-back").addClass('hidden');
		$("#menu").removeClass('arrow-back');
		$("header .header-title .title").removeClass('active');
		$("header .header-title .title[tid=" + $(this).data('title') + "]").addClass('active');
	}).inkripple("rgba(0,0,0,0.2)");
	
	function escapeHtml(i) {
		i = i.replace(/</g, "&lt;");
		i = i.replace(/>/g, "&gt;");
		i = i.replace(/\"/g, "&quot;");
		i = i.replace(/\n/g, "<br>");
		i = i.replace(/ /g, "&nbsp;");
		i = i.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
		return i;
	}
	
	$(".file").each(function(){
		var url = $(this).attr('src');
		if( !url ) {
			return;
		}
		var that = this;
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'text/plain'
		}).always(function(d){
			cd = d.responseText.toString();
			//Regular Expression by @Locercus the regex magician
			var licenseRgx = /^\s*(\/\*\*\s*)(\r*\n\s+\*\s*(?!\/)[^\n]*)+(\r*\n\s+\*\/)/;
			var match;
			if ((match = licenseRgx.exec(cd)) !== null) {
				if (match.index === licenseRgx.lastIndex) {
					licenseRgx.lastIndex++;
				}
			}
			cd = escapeHtml(cd);
			$(that).find(".content").html(cd);
			hljs.highlightBlock($(that).find('.content')[0]);
		});
	});
})