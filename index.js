  let newWorker;

  // The click event on the notification
  document.getElementById('reload').addEventListener('click', function(){
    newWorker.postMessage({ action: 'skipWaiting' });
  });

  if ('serviceWorker' in navigator) {
    // Register the service worker
    navigator.serviceWorker.register('/ss/sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {

        // An updated service worker has appeared in reg.installing!
        newWorker = reg.installing;

        newWorker.addEventListener('statechange', () => {

          // Has service worker state changed?
          switch (newWorker.state) {
            case 'installed':

	// There is a new service worker available, show the notification
              if (navigator.serviceWorker.controller) {
                let notification = document.getElementById('notification').style.display = '';
              }
              break;
          }
        });
      });
    });

  };

let refreshing;
 // The event listener that is fired when the service worker updates
 // Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function () {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});
