// Rental-focused cleanup for the public AutoDeal template.
// This file intentionally replaces the original demo switcher.
(function () {
  'use strict';

  var deadPages = new Set([
    'add-listing.html','blog-detail.html','blog-grid.html','blog.html','change-password.html',
    'compare.html','compare-2.html','dashboard.html','dealer-detail.html','dealer-listing.html',
    'faq.html','home02.html','home03.html','home04.html','home05.html','home06.html','home07.html',
    'home08.html','home09.html','home10.html','index-2.html','listing-detail-v2.html',
    'listing-detail-v3.html','listing-detail-v4.html','listing-detail-v5.html','listing-grid2.html',
    'listing-grid-map.html','listing-list.html','listing-list-map.html','message.html','my-favorite.html',
    'my-favorites.html','my-listing.html','my-profile.html','my-review.html','pricing.html',
    'properties-list.html','Rectangle.html','sale-agents.html','sale-agents-detail.html'
  ]);

  function basename(href) {
    try {
      var u = new URL(href, window.location.href);
      return (u.pathname.split('/').pop() || 'index.html');
    } catch (_) {
      return href || '';
    }
  }

  function setActiveMenu() {
    var current = basename(window.location.href);
    var links = [
      ['index.html', 'Início'],
      ['listing-grid.html', 'Veículos'],
      ['about-us.html', 'Sobre'],
      ['contact.html', 'Contato'],
      ['admin/', 'Admin']
    ];
    var html = links.map(function (item) {
      var href = item[0];
      var label = item[1];
      var active = (current === href || (href === 'admin/' && window.location.pathname.indexOf('/admin') !== -1)) ? ' class="current"' : '';
      return '<li' + active + '><a href="' + href + '">' + label + '</a></li>';
    }).join('');

    document.querySelectorAll('.main-header .navigation').forEach(function (nav) {
      nav.innerHTML = html;
    });
  }

  function removeLegacyActions() {
    ['.header-favorite', '.register', '.flat-bt-top'].forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) { el.remove(); });
    });

    document.querySelectorAll('.change-heart').forEach(function (el) { el.remove(); });

    document.querySelectorAll('a').forEach(function (a) {
      var page = basename(a.getAttribute('href') || '');
      if (!deadPages.has(page)) return;

      var li = a.closest('li');
      if (li && li.querySelectorAll('a').length === 1) {
        li.remove();
      } else {
        a.remove();
      }
    });

    document.querySelectorAll('.tfcl-compare-listing-button').forEach(function (el) { el.remove(); });
  }

  function removeDemoNewsletter() {
    document.querySelectorAll('form').forEach(function (form) {
      var action = form.getAttribute('action') || '';
      if (/sibforms|sendinblue|brevo/i.test(action)) {
        var block = form.closest('.subscribe, .newsletter, .widget-subscribe, .footer-newsletter');
        if (block) block.remove(); else form.remove();
      }
    });
  }

  function normalizeDocument() {
    document.documentElement.lang = 'pt-BR';
    var page = basename(window.location.href);
    var titles = {
      'index.html': 'Aluguel de Carros | Encontre seu veículo',
      'listing-grid.html': 'Veículos para Alugar | Aluguel de Carros',
      'listing-detail-v1.html': 'Detalhes do Veículo | Aluguel de Carros',
      'about-us.html': 'Sobre | Aluguel de Carros',
      'contact.html': 'Contato | Aluguel de Carros'
    };
    if (titles[page]) document.title = titles[page];

    document.querySelectorAll('meta[name="author"]').forEach(function (m) { m.remove(); });
  }

  setActiveMenu();
  removeLegacyActions();
  removeDemoNewsletter();
  normalizeDocument();
})();
