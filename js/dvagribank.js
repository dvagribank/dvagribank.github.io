(function ($) {
  "use strict";
  $(document).ready(function(){
    var $window = $(window),
    $image = $('.imageblock, .carousel-control'),
    $hbg = $('.hblock, .carousel-inner');
    
      $window.on('scroll', function() {
        var top = $window.scrollTop();
        if (top < 0 || top > 1000) { return; }
        $image
          .css('transform', 'translate3d(0px, '+top/4+'px, 0px)')
          .css('opacity', 1-Math.max(top/300, 0));
        $hbg
          .css('transform', 'translate3d(0px, '+top/2+'px, 0px)')
          .css('opacity', 1-Math.max(top/500, 0));
      });
  });
}(jQuery));