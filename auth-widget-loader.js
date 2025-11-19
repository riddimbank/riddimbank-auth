// riddimBank Auth Widget Loader
// This script loads the auth widget from GitHub and injects it into your page

(function() {
  'use strict';
  
  // Prevent double-loading
  if (window.riddimbankAuthLoaded) return;
  window.riddimbankAuthLoaded = true;
  
  // Load CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://riddimbank.github.io/riddimbank-auth/auth-widget.css';
  document.head.appendChild(link);
  
  // Load Firebase first
  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  loadScript('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js', function() {
    loadScript('https://www.gstatic.com/firebasejs/10.5.0/firebase-auth-compat.js', function() {
      // Load the widget script
      loadScript('https://riddimbank.github.io/riddimbank-auth/auth-widget.js', function() {
        console.log('riddimBank Auth Widget loaded successfully');
      });
    });
  });
  
  // Inject the HTML elements
  window.addEventListener('DOMContentLoaded', function() {
    var html = `
      <button id="authToggleBtn" style="padding:8px 16px;font-size:14px;background-color:#111;color:#fff;border:1px solid #fff;border-radius:4px;cursor:pointer;text-transform:uppercase;transition:all 0.2s ease;">
        LOG IN / REGISTER
      </button>
      <div id="authModal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999999;overflow-y:auto;-webkit-overflow-scrolling:touch;">
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);" id="authModalOverlay"></div>
        <div id="modalContent" class="modal-content" style="position:relative;z-index:1000000000;"></div>
      </div>
    `;
    
    // Try to find menu bar element, otherwise append to body
    var menuBar = document.querySelector('.menu') || document.querySelector('nav') || document.querySelector('header');
    if (menuBar) {
      menuBar.insertAdjacentHTML('beforeend', html);
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
  });
})();
