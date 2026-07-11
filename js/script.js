// =========================================================
// header
// =========================================================
$(function() {
  function closeAllMenus() {
    $('.nav-item-wrapper').removeClass('is-open').addClass('is-close');
    $('html, body').removeClass('menu-open');
  }

  $('.nav-item-wrapper').on('mouseenter', function() {
    if (window.innerWidth > 768) {
      $(this).addClass('is-open').removeClass('is-close');
      $('html, body').addClass('menu-open');
    }
  }).on('mouseleave', function() {
    if (window.innerWidth > 768) {
      $(this).removeClass('is-open');
      $('html, body').removeClass('menu-open');
    }
  });

  $('.nav-item').on('click', function(e) {
    if (window.innerWidth <= 768) {
      e.stopPropagation(); 
      
      var $wrapper = $(this).closest('.nav-item-wrapper');
      
      if ($wrapper.hasClass('is-open')) {
        closeAllMenus();
      } else {
        $('.nav-item-wrapper').not($wrapper).removeClass('is-open').addClass('is-close');
        $wrapper.addClass('is-open').removeClass('is-close');
        $('html, body').addClass('menu-open'); 
      }
    }
  });

  $('.menu-close-btn').on('click', function(e) {
    e.stopPropagation();
    closeAllMenus();
  });

  $('.mega-menu a').on('click', function() {
    closeAllMenus();
  });

  $(document).on('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!$(e.target).closest('.nav-item-wrapper').length) {
        closeAllMenus(); 
      }
    }
  });
});

// =========================================================
// sec-top-b
// =========================================================
$(function () {
  $('.campaign-slider').slick({
    variableWidth: true,
    centerMode: true,
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
// スクロール可能画像表示
// =========================================================
$(function() {
  $('.plan-table-scroll').one('scroll', function() {
    $(this).siblings('.scroll-hint-overlay').addClass('is-hidden');
  });
});

$(function() {
  $('.service-table-scroll').one('scroll', function() {
    $(this).siblings('.scroll-hint-overlay').addClass('is-hidden');
  });
});

$(function() {
  $('.h-page-imgwrap').one('scroll', function() {
    $(this).find('.scroll-hint-overlay').addClass('is-hidden');
  });
});

// =========================================================
// sec-top-d — シム吉歩かせるアニメーション
// =========================================================
$(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('is-animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '-30% 0px -30% 0px' 
  });
  $('.simkichiwalk').each(function() {
    observer.observe(this);
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

      tabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

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
      tocItems.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-target') === targetId);
      });
    }

    tocItems.forEach(function (t) {
      t.addEventListener('click', function () {
        showPage(t.getAttribute('data-target'));
      });
    });

    if (ctaLink) {
      ctaLink.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(ctaLink.getAttribute('data-target'));
      });
    }

    root.querySelectorAll('.h-page').forEach(function (page) {
      const idx = parseInt(page.getAttribute('data-index') || '0', 10);

      page.querySelectorAll('.h-nav-prev, .h-nav-next, .h-nav-down').forEach(function (btn) {
        btn.addEventListener('click', function () {
          let next = idx;
          if (btn.classList.contains('h-nav-prev')) next = idx - 1;
          else                                     next = idx + 1;

          if (next < 0 || next > 6) return;
          showPage('h-page-' + String(next).padStart(2, '0'));
        });
      });
    });
  }

  // ---------- Customer Reviews スライダー ----------

})(window.jQuery);

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

// =========================================================
// application プルダウン
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.a-top_b__tab');
  const panels = document.querySelectorAll('.a-top_b__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      panels.forEach(panel => {
        panel.setAttribute('hidden', '');
      });
      const targetPanel = document.querySelector(`.a-top_b__panel[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const selectWrapper = document.querySelector('.a-top_b__selects');
  if (!selectWrapper) return;

  const selects = selectWrapper.querySelectorAll('select');
  const simTypeSelect = selects[0];
  const deliverySelect = selects[2];
  const optionsMap = {
    default: `<option value="" selected disabled hidden>SIMタイプから選択してください</option>`,

    esim: `
      <option value="" selected disabled hidden>必要事項の確認</option>
      <option value="0" data-plm="1">eSIM搭載端末か確認しメールでの配送を了承した</option>
    `,

    simCard: `
      <option value="" selected disabled hidden>配送方法を選択</option>
      <option value="0" data-plm="1">日本国内ポスト投函(＋0円)</option>
      <option value="550" data-plm="S550">日時指定(＋550円)</option>
      <option value="1100" data-plm="S1100">日時指定/北海道・沖縄・離島(＋1,100円)</option>
      <option value="1100" data-plm="K1100">オーストラリア配送(＋1,100円)</option>
    `
  };

  function updateDeliveryOptions() {
    const selectedValue = simTypeSelect.value;

    if (selectedValue === "3500") {
      deliverySelect.innerHTML = optionsMap.esim;
    } else if (selectedValue === "3000") {
      deliverySelect.innerHTML = optionsMap.simCard;
    } else {
      deliverySelect.innerHTML = optionsMap.default;
    }
  }

  simTypeSelect.addEventListener('change', updateDeliveryOptions);

  updateDeliveryOptions();
});