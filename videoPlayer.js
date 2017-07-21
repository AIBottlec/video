(function(window,document) {
	var mainCon = document.getElementsByClassName('mainCon')[0];
	 contentDetial = document.getElementsByClassName('contentDetial')[0];
	 videoPar = document.getElementsByClassName('videoPar')[0];
	 videoBox = videoPar.getElementsByClassName('videoBox')[0];
	 video = videoBox.getElementsByTagName('video')[0],
	 videoControls = document.getElementsByClassName('controlBar')[0],
	 play = document.getElementById('play'), 
	 progressContainer = document.getElementById("progress"), 
	 progressHolder = document.getElementById("progress_box"), 
	 playProgressBar = document.getElementById("play_progress"), 
	 fullScreenToggleButton = document.getElementById("fullScreen"),
	 isVideoFullScreen = false;

	var videoPlayer = {
		init:function (){
			// this is equal to the videoPlayer object. 
			var that = this; 
			// Helpful CSS trigger for JS. 
			document.documentElement.className = 'js'; 
			// Get rid of the default controls, because we'll use our own. 
			video.removeAttribute('controls'); 
			// When meta data is ready, show the controls 
			video.addEventListener('loadeddata', this.initializeControls, false);

			// When play, pause buttons are pressed. 
			this.handleButtonPresses();
			// When the full screen button is pressed. 
			fullScreenToggleButton.addEventListener("click", function(){ 
				isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn(); 
			}, true);
		},

		initializeControls:function() { 
			// When all meta information has loaded, show controls 
			videoPlayer.showHideControls(); 
		},
		showHideControls : function() { 
			// Shows and hides the video player. 
			video.addEventListener('mouseover', function() { 
				videoControls.style.opacity = 1;
			}, false); 
			videoControls.addEventListener('mouseover', function() { 
				videoControls.style.opacity = 1; 
			}, false); 
			video.addEventListener('mouseout', function() { 
				videoControls.style.opacity = 0; 
			}, false); 
			videoControls.addEventListener('mouseout', function() { 
				videoControls.style.opacity = 0; 
			}, false); 
		},
		handleButtonPresses : function() { 
			// When the video or play button is clicked, play/pause the video. 
			video.addEventListener('click', this.playPause, false); 
			play.addEventListener('click', this.playPause, false); 
			// When the play button is pressed, 
			// switch to the "Pause" symbol. 
			video.addEventListener('play', function() { 
				play.title = 'Pause'; 
				play.innerHTML = '<span id="pauseButton">&#x2590;&#x2590;</span>'; 

				// Begin tracking video's progress. 
				videoPlayer.trackPlayProgress(); 
			}, false); 
			// When the pause button is pressed, 
			// switch to the "Play" symbol. 
			video.addEventListener('pause', function() { 
				play.title = 'Play'; 
				play.innerHTML = '&#x25BA;'; 

				/// Video was paused, stop tracking progress. 
				videoPlayer.stopTrackingPlayProgress(); 
			}, false); 
			// When the video has concluded, pause it. 
			video.addEventListener('ended', function() { 
				this.currentTime = 0; 
				this.pause(); 
			}, false); 
		},
		playPause: function() { 
			if ( video.paused || video.ended ) { 
				if ( video.ended ) {
					video.currentTime = 0; 
				} 
				video.play(); 
			} else { 
				video.pause(); 
			} 
		},
		// 全屏
		/*fullScreenOn : function() { 
			isVideoFullScreen = true; 
			// Set new width according to window width
			videoPar.style.cssText = 'display:block;background:black;position:absolute;bottom:0;left:0;z-index:100;padding:0;position: absulute;overflow:hidden;'+
			 'width:' + window.innerWidth +'px;height:' + window.innerHeight +  'px;'; 
			// Apply a classname to the video and controls, if the designer needs it... 
			// videoBox.className = 'fullsizeVideo'; 
			// videoControls.className = 'fs-control'; 
			// fullScreenToggleButton.className = "fs-active control"; 
			// Listen for escape key. If pressed, close fullscreen. 
			// document.addEventListener('keydown', this.checkKeyCode, false); 
		}, */
		fullScreenOn : function() { 
			isVideoFullScreen = true;
			// Set new width according to window width 
			videoBox.style.cssText = 'width:' + window.innerWidth + 'px; height: ' + window.innerHeight + 'px;'; 
			// Apply a classname to the video and controls, if the designer needs it... 
			videoBox.className = 'fullsizeVideo'; 
			mainCon.style.padding = 0;
			// videoControls.className = 'fs-control'; 
			// fullScreenToggleButton.className = "fs-active control"; 
			// Listen for escape key. If pressed, close fullscreen. 
			document.addEventListener('keydown', this.checkKeyCode, false); 
		},
		fullScreenOff : function() { 
			isVideoFullScreen = false;

			mainCon.style.padding = "0 44px";
			videoBox.style.position = '';
			videoBox.className = 'videoBox'; 
			videoBox.style.width = "100%";
			videoBox.style.height = "100%";


			// fullScreenToggleButton.className = "control"; 
			// videoControls.className = ''; 
		},
		// Determines if the escape key was pressed. 
		checkKeyCode : function( e ) { 
			e = e || window.event; 
			if ( (e.keyCode || e.which) === 27 ) 
				videoPlayer.fullScreenOff(); 
		},
		// 播放进度
		// Every 50 milliseconds, update the play progress. 
		trackPlayProgress : function(){ 
			(function progressTrack() { 
				videoPlayer.updatePlayProgress();
				playProgressInterval = setTimeout(progressTrack, 50); 
			})(); 
		},
		updatePlayProgress : function(){
			var proTime = (video.currentTime / video.duration); 
			playProgressBar.style.left = proTime * (progressHolder.offsetWidth) + "px"; 
		},
		// Video was stopped, so stop updating progress. 
		stopTrackingPlayProgress : function(){ 
			clearTimeout( playProgressInterval ); 
		}
	}
	
	videoPlayer.init();

}(this,document))
// 参考：http://www.w3cplus.com/html5/build-a-custom-html5-video-player.html