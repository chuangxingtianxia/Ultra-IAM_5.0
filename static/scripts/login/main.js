(function () {

  var bv = new Bideo();
  bv.init({
    // Video element
    videoEl: document.querySelector('#background_video'),

    // Container element
    container: document.querySelector('body'),

    // Resize
    resize: true,

    // autoplay: false,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    playButton: document.querySelector('#play'),
    pauseButton: document.querySelector('#pause'),

    // 添加不同的视频格式（路径和类型）
    src: [
      {
        src: 'static/img/login/night.mp4',
        type: 'video/mp4'
      },
      {
        src: 'night.webm',
        type: 'video/webm;codecs="vp8, vorbis"'
      }
    ],

    //视频加载完成
    onLoad: function () {
      document.querySelector('#video_cover').style.display = 'none';
    }
  });

  /////////////////输入框提示///////////////////
  var t = $("#foraccount, #forpassword").inFieldLabels();


}());
