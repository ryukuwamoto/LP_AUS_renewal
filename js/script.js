$(function () {
  $('.campaign-slider').slick({
    variableWidth: true,   // 各スライドを 310px 固定幅で扱う
    centerMode: true,      // アクティブスライドを中央に
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    arrows: false,
    dots: true,
    infinite: true,
    swipe: true,
    swipeToSlide: true,
    pauseOnHover: false,
    pauseOnFocus: false
  });
});
