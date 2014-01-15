/**
 *
 * Plugin Youtube Gallery
 * Lucas Moreira - moreirapontocom [at] gmail [dot] com
 * http://lucasmoreira.com.br
 *
 */
(function($) {
	$.fn.YouTubeGallery = function(params) {

		obj = $(this);

		defaults = {
			cover	: "default.jpg",
			videoInfo: true,
			openInFancybox: false,
			autoplay: true,
			texts: {
				post_date: "Posted in",
				post_author: "Posted by"
			},
			messages : {
				error : "Error on retrieve the video with passed ID"
			}
		};
		var settings = $.extend(true, {}, defaults, params);

		obj.find('.yt-gallery').each(function() {

			var videoID = $(this).attr('data-video-id');
			var currentElement = $(this);

			$.get('https://gdata.youtube.com/feeds/api/videos/' + videoID + '?v=2', function(data) {
				var video_title	= $(data).find('title').html();
				var video_date	= $(data).find('published').html();
				var author		= $(data).find('author').find('name').html();

				video_date = video_date.substr(0,10);

				if ( settings.videoInfo == true )
					var infos = '<div class="yt-gallery-video-infos"><div>' + settings.texts.post_date + ': ' + video_date + '</div><div>' + settings.texts.post_author + ': ' + author + '</div></div>';
				else var infos = '';

				if ( settings.openInFancybox == false )
					currentElement.append('<div class="yt-gallery-the-video"><a href="https://www.youtube.com/watch?v=' + videoID + '" target="_blank"><img title="' + video_title + '" data-video-id="' + videoID + '" class="yt-gallery-thumbnail" src="//img.youtube.com/vi/' + videoID + '/' + settings.cover + '" /></a><div class="yt-gallery-video-title"><a href="https://www.youtube.com/watch?v=' + videoID + '" target="_blank">' + video_title + '</a></div>' + infos + '</div>')

				else { // Open inside Fancybox

					$.getScript( "http://localhost/youtube-gallery/fancybox/jquery.fancybox.js", function( data, textStatus, jqxhr ) {
						// data (all plugin code) | textStatus (request text status. eg: Success) | jqxhr.status (request status. eg: 200)

						if ( jqxhr.status == 200 ) { // Fancybox is loaded

							if ( $.fn.fancybox ) {
								var test = $('.yt-fancybox').fancybox();
								test.fancybox({
									maxWidth	: 800,
									maxHeight	: 600,
									fitToView	: false,
									width		: '70%',
									height		: '70%',
									autoSize	: false,
									closeClick	: false,
									openEffect	: 'none',
									closeEffect	: 'none'
								});
							}

							( settings.autoplay == true ) ? autoplay = 1 : autoplay = 0;

							currentElement.append('<div class="yt-gallery-the-video"><a class="yt-fancybox fancybox.iframe" href="http://www.youtube.com/embed/' + videoID + '?autoplay=' + autoplay + '" target="_blank"><img title="' + video_title + '" data-video-id="' + videoID + '" class="yt-gallery-thumbnail" src="//img.youtube.com/vi/' + videoID + '/' + settings.cover + '" /></a><div class="yt-gallery-video-title"><a class="yt-fancybox fancybox.iframe" href="http://www.youtube.com/embed/' + videoID + '?autoplay=' + autoplay + '" target="_blank">' + video_title + '</a></div>' + infos + '</div>')

						} // end if
					});

				} // end else

			});

		});

		return this;
	};

})(jQuery);