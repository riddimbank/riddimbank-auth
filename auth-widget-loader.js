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
    console.log('DOMContentLoaded fired');
    console.log('Window width:', window.innerWidth);
    
    var html = `
      <button id="authToggleBtn">
        LOG IN / REGISTER
      </button>
      <button id="authToggleBtnMobile" style="position:fixed;bottom:20px;right:20px;z-index:999999998;padding:12px 20px;font-size:14px;background-color:#f00;color:#fff;border:2px solid #fff;border-radius:25px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 12px rgba(0,0,0,0.5);">
        LOG IN
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
      console.log('Inserted into menu bar');
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
      console.log('Inserted into body');
    }
    
    console.log('Mobile button element:', document.getElementById('authToggleBtnMobile'));
    
    // Show mobile button only on small screens
    var mobileBtn = document.getElementById('authToggleBtnMobile');
    if (window.innerWidth <= 768) {
      console.log('Screen is mobile size, showing button');
      mobileBtn.style.display = 'block';
    } else {
      console.log('Screen is desktop size, hiding button');
      mobileBtn.style.display = 'none';
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
      var mobileBtn = document.getElementById('authToggleBtnMobile');
      if (mobileBtn) {
        if (window.innerWidth <= 768) {
          console.log('Resized to mobile, showing button');
          mobileBtn.style.display = 'block';
        } else {
          console.log('Resized to desktop, hiding button');
          mobileBtn.style.display = 'none';
        }
      }
    });
  });
})();
