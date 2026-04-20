$(function () {
  $(".d1-slider").slick({
    autoplay: true,
    dots: false,
    centerMode: true,
    prevArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/settei-suport/image/sec-top-d/side-arrow.png" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/settei-suport/image/sec-top-d/side-arrow.png" class="slide-arrow next-arrow">',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    variableWidth: true,
  });
});

$(function () {
  $(".d2-slider").slick({
    autoplay: true,
    dots: false,
    centerMode: true,
    prevArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/settei-suport/image/sec-top-d/side-arrow.png" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/settei-suport/image/sec-top-d/side-arrow.png" class="slide-arrow next-arrow">',
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    variableWidth: true,
  });
});

$(function () {
  $(".f-slider").slick({
    autoplay: true,
    dots: true,
    variableWidth: true,
    prevArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/settei-suport/image/sec-top-f/f-arrow.png" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/settei-suport/image/sec-top-f/f-arrow.png" class="slide-arrow next-arrow">',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 748,
      settings: {
        slidesToShow: 1,
      }
    }
  ],
    autoplaySpeed: 2000,
    dotsClass: "f-slide-dots",
  });
});