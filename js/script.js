$(function() {
  // スクロール位置を記憶する変数
  var scrollPosition = 0;

  // 💡【共通の関数】スマホの背景固定を解除する
  function unlockBody() {
    if (window.innerWidth <= 768) {
      if ($('body').hasClass('menu-open')) {
        $('html, body').removeClass('menu-open');
        $('body').css({ 'position': '', 'top': '', 'width': '' });
        $(window).scrollTop(scrollPosition); // 記憶していた位置に戻す
      }
    } else {
      $('html, body').removeClass('menu-open');
    }
  }

  // 1. 閉じるボタンをクリックしたときの処理
  $('.menu-close-btn').on('click', function(e) {
    e.stopPropagation();
    var $wrapper = $(this).closest('.nav-item-wrapper');
    $wrapper.addClass('is-close');
    $wrapper.removeClass('is-open');
    
    unlockBody(); // 💡【修正】固定解除の関数を呼ぶ
    
    $wrapper.find('.nav-item').trigger('blur');
    $(this).trigger('blur');
  });

  // 2. マウスがメニューから外れたら...（ここは元のままでOK）
  $('.nav-item-wrapper').on('mouseleave', function() {
    $(this).removeClass('is-close');
    $(this).removeClass('is-open');
    unlockBody(); // 💡【修正】固定解除の関数を呼ぶ
  });
  
  // 3. スマホのタップ対策：他のナビアイテムを触ったら非表示クラスをリセット
  $('.nav-item').on('click touchstart', function() {
    var $wrapper = $(this).closest('.nav-item-wrapper');
    $('.nav-item-wrapper').removeClass('is-close');
    $('.nav-item-wrapper').not($wrapper).removeClass('is-open');
    $wrapper.addClass('is-open');
    
    // 💡【修正】スマホとPCで処理を分岐します
    if (window.innerWidth <= 768) {
      // まだ固定されていない場合だけ、現在のスクロール位置を記憶して固定
      if (!$('body').hasClass('menu-open')) {
        scrollPosition = $(window).scrollTop();
        $('body').css({
          'position': 'fixed',
          'top': '-' + scrollPosition + 'px',
          'width': '100%'
        });
        $('html, body').addClass('menu-open');
      }
    } else {
      $('html, body').addClass('menu-open');
    }
  });

  // 4. メガメニュー内のページ内リンクをクリックしたときの処理
  $('.mega-menu a[href^="#"]').on('click', function() {
    var $wrapper = $(this).closest('.nav-item-wrapper');
    $wrapper.addClass('is-close');
    $wrapper.removeClass('is-open');
    
    unlockBody(); // 💡【修正】固定解除の関数を呼ぶ
    
    $wrapper.find('.nav-item').trigger('blur');
    $(this).trigger('blur');
  });
});



$(function () {
  $('.campaign-slider').slick({
    variableWidth: true,   // 各スライドを 310px 固定幅で扱う
    centerMode: true,      // アクティブスライドを中央に
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    speed: 600,
    arrows: false,
    dots: true,
    infinite: true,
    swipe: true,
    swipeToSlide: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    dotsClass: "b-slide-dots"
  });
});


// =========================================================
// sec-top-g — eSIM / SIMカード タブ切替
// =========================================================
(function () {
  'use strict';

  const root = document.querySelector('.sec-top-g');
  if (!root) return;

  const tabs   = root.querySelectorAll('.g-tab');
  const panels = root.querySelectorAll('.g-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      // タブ状態更新
      tabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      // パネル状態更新
      panels.forEach(function (p) {
        const active = p.id === targetId;
        p.classList.toggle('is-active', active);
        if (active) {
          p.removeAttribute('hidden');
        } else {
          p.setAttribute('hidden', '');
        }
      });
    });
  });
})();


// =========================================================
// sec-top-h
//   - ハンドブック（目次クリック / ページ内 前へ・次へ）
//   - Customer Reviews スライダー（slick）
// =========================================================
(function ($) {
  'use strict';

  // ---------- ハンドブック ----------
  const root = document.querySelector('.sec-top-h');
  if (root) {
    const tocItems = root.querySelectorAll('.h-toc-item');
    const pages    = root.querySelectorAll('.h-page');
    const ctaLink  = root.querySelector('.h-cover-cta');

    function showPage(targetId) {
      // ページ表示切替
      pages.forEach(function (p) {
        const active = p.id === targetId;
        p.classList.toggle('is-active', active);
        if (active) {
          p.removeAttribute('hidden');

          const imgWrap = p.querySelector('.h-page-imgwrap');
          if (imgWrap) {
            imgWrap.scrollTop = 0;
          }
          
        } else {
          p.setAttribute('hidden', '');
        }
      });
      // 目次状態
      tocItems.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-target') === targetId);
      });
    }

    // 目次クリック
    tocItems.forEach(function (t) {
      t.addEventListener('click', function () {
        showPage(t.getAttribute('data-target'));
      });
    });

    // 表紙の「ガイドを読む」
    if (ctaLink) {
      ctaLink.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(ctaLink.getAttribute('data-target'));
      });
    }

    // ページ内 前へ / 次へ / ▼
    root.querySelectorAll('.h-page').forEach(function (page) {
      const idx = parseInt(page.getAttribute('data-index') || '0', 10);

      page.querySelectorAll('.h-nav-prev, .h-nav-next, .h-nav-down').forEach(function (btn) {
        btn.addEventListener('click', function () {
          let next = idx;
          if (btn.classList.contains('h-nav-prev')) next = idx - 1;
          else                                     next = idx + 1;     // next / down 共に +1

          if (next < 0 || next > 6) return;
          showPage('h-page-' + String(next).padStart(2, '0'));
        });
      });
    });
  }

  // ---------- Customer Reviews スライダー ----------

})(window.jQuery);


// f-slider
$(function () {
  $(".f-slider").slick({
    autoplay: true,
    dots: true,
    variableWidth: true,
    prevArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/YM-LP/AUS/sec-top-h/sliderarrow.png" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="https://gigaplus.makeshop.jp/yemoba4818/YM-LP/AUS/sec-top-h/sliderarrow.png" class="slide-arrow next-arrow">',
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
