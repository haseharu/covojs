/*
 * Alex MacCaw
 * http://alexmaccaw.com/posts/growl
 * */


(function($){
		var container = $("<div />");
		container.attr({id: "growl"});

		$(function(){
				$("body").append(container);
		});

		$.growl = function(body){
				var msg = $("<div />").addClass("msg");
				msg.html(body);

				container.append(msg);

				msg.show("drop", { 
						direction: "down", 
						distance: 50 
				}, 300).
						delay(4000).
								fadeOut(300, function(){
						$(this).remove();
				});

				return msg;
		};
})(jQuery);
