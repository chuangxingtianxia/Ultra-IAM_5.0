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

    // ��Ӳ�ͬ����Ƶ��ʽ��·�������ͣ�
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

    //��Ƶ�������
    onLoad: function () {
      document.querySelector('#video_cover').style.display = 'none';
    }
  });

  /////////////////�������ʾ///////////////////
  var t = $("#foraccount, #forpassword").inFieldLabels();


}());
