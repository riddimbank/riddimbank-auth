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
    
    // Create desktop button for menu
    var desktopBtn = document.createElement('button');
    desktopBtn.id = 'authToggleBtn';
    desktopBtn.textContent = 'LOG IN / REGISTER';
    
    // Create mobile floating button
    var mobileBtn = document.createElement('button');
    mobileBtn.id = 'authToggleBtnMobile';
    mobileBtn.textContent = 'LOG IN';
    mobileBtn.style.cssText = 'position:fixed !important;bottom:20px !important;right:20px !important;padding:12px 20px !important;font-size:14px !important;background-color:#111 !important;color:#fff !important;border:1px solid #fff !important;border-radius:25px !important;cursor:pointer !important;text-transform:uppercase !important;box-shadow:0 4px 12px rgba(0,0,0,0.5) !important;z-index:999999998 !important;display:none !important;';
    
    // Create modal
    var modal = document.createElement('div');
    modal.id = 'authModal';
    modal.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999999;overflow-y:auto;-webkit-overflow-scrolling:touch;';
    modal.innerHTML = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);" id="authModalOverlay"></div><div id="modalContent" class="modal-content" style="position:relative;z-index:1000000000;"></div>';
    
    // Add desktop button to menu
    var menuBar = document.querySelector('.menu') || document.querySelector('nav') || document.querySelector('header');
    if (menuBar) {
      menuBar.appendChild(desktopBtn);
      console.log('Desktop button added to menu');
    }
    
    // Add mobile button and modal to END of body (outside Simvoly containers)
    document.body.appendChild(mobileBtn);
    document.body.appendChild(modal);
    console.log('Mobile button and modal added to body');
    
    // Show/hide mobile button based on screen size
    function updateMobileButton() {
      if (window.innerWidth <= 768) {
        mobileBtn.style.display = 'block !important';
        console.log('Mobile button visible');
      } else {
        mobileBtn.style.display = 'none !important';
        console.log('Mobile button hidden');
      }
    }
    
    updateMobileButton();
    window.addEventListener('resize', updateMobileButton);
  });
})();
