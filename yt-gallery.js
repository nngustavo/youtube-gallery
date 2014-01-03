(function($) {
	$.fn.YouTubeGallery = function(params) {

		obj = $(this);

		/*

		VIA XML: https://gdata.youtube.com/feeds/api/videos/[VIDEO ID]?v=2

		https://www.youtube.com/watch?v=JddEezXWf8Y
		<iframe width="340" height="191" src="//www.youtube.com/embed/9mdsQLLc9ws" frameborder="0" allowfullscreen></iframe>

		Each YouTube video has 4 generated images. They are predictably formatted as follows:

		http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/1.jpg
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/2.jpg
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/3.jpg

		The first one in the list is a full size image and others are thumbnail images. The default thumbnail image (ie. one of 1.jpg, 2.jpg, 3.jpg) is:
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg

		For the high quality version of the thumbnail use a url similar to this:
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg

		There is also a medium quality version of the thumbnail, using a url similar to the HQ:
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg

		For the standard definition version of the thumbnail, use a url similar to this:
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg

		For the maximum resolution version of the thumbnail use a url similar to this:
		http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
		*/

		defaults = {
			cover	: "default.jpg",
			videoInfo: true,
			openInYouTube: true,
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
				var video_title = $(data).find('title').html();
				var video_date = $(data).find('published').html();
				var author = $(data).find('author').find('name').html();

				video_date = video_date.substr(0,10);
				//var the_date = new Date(video_date);
				//video_date = the_date.getDate() + '/' + the_date.getMonth() + '/' + the_date.getFullYear();

				if ( settings.videoInfo == true )
					var infos = '<div class="yt-gallery-video-infos"><div>' + settings.texts.post_date + ': ' + video_date + '</div><div>' + settings.texts.post_author + ': ' + author + '</div></div>';
				else var infos = '';

				if ( settings.openInYouTube == true )
					currentElement.append('<div class="yt-gallery-the-video"><a href="https://www.youtube.com/watch?v=' + videoID + '" target="_blank"><img title="' + video_title + '" data-video-id="' + videoID + '" class="yt-gallery-thumbnail" src="//img.youtube.com/vi/' + videoID + '/default.jpg" /></a><div class="yt-gallery-video-title"><a href="https://www.youtube.com/watch?v=' + videoID + '" target="_blank">' + video_title + '</a></div>' + infos + '</div>')

				else {
					// Open in Fancybox

				}

			});

		});

		/*
		obj.find('.yt-gallery-thumbnail, .yt-gallery-video-title').click(function() {
			window.open('https://www.youtube.com/watch?v=' + videoID ,'_blank');
		});
		*/

		return this;
	};

	/*
	var saveVote = function(settings,page,selectedOption) {
		$.ajax({
			type: "POST",
			url: settings.pluginPath + "scripts/iu-save-vote.php",
			data: {
				page: page,
				selectedOption: selectedOption
			},
			success: function(data) {
				obj.find('#isusefull-options').remove();

				if ( data == 2 )
					obj.find('#isusefull-alerts').html( settings.messages.denied );
				else
					obj.find('#isusefull-alerts').html( settings.messages.success );

			},
			error: function(e) {
				obj.find('#isusefull-alerts').html( settings.messages.error );
			}
		});

		return this;
	};
	*/

})(jQuery);