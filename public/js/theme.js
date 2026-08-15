(function (window, document) {
  'use strict';

  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (!toggle) return;

  function setToggleState(theme) {
    var isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function setTheme(theme, persist) {
    root.dataset.theme = theme;
    setToggleState(theme);

    if (!persist) return;

    try {
      window.localStorage.setItem('theme', theme);
    } catch (error) {
      // The selected theme still applies when storage is unavailable.
    }
  }

  setToggleState(root.dataset.theme);

  toggle.addEventListener('click', function () {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  if (window.matchMedia) {
    var colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    var handleColorSchemeChange = function (event) {
      var hasSavedTheme = false;

      try {
        hasSavedTheme = Boolean(window.localStorage.getItem('theme'));
      } catch (error) {
        hasSavedTheme = false;
      }

      if (!hasSavedTheme) setTheme(event.matches ? 'dark' : 'light', false);
    };

    if (colorScheme.addEventListener) {
      colorScheme.addEventListener('change', handleColorSchemeChange);
    } else {
      colorScheme.addListener(handleColorSchemeChange);
    }
  }
}(window, document));
