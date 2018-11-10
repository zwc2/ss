(function(){var d=document;
var inputs=d.getElementsByClassName('i');
var ichange=e=>{
  localStorage.setItem(e.id,e.value);
};
for(let i of inputs){
  i.onchange=function(){ichange(this)};
  i.value=localStorage.getItem(i.id);
}
d.getElementById('r').addEventListener("click",e=>{
  var c=confirm("The form will be cleared. Continue?");
  if(c){localStorage.clear()}
  else{e.preventDefault()}
});

document.getElementById('p').addEventListener('click',e=>{
  print();
});
let tas=document.getElementsByTagName('textarea');
var tasize=e=>{
  e.style.height=0;
  e.style.height=e.scrollHeight+'px';
};
for(let ta of tas){
  ta.addEventListener('change',function(){
    tasize(this);
  });
  tasize(ta);
}
})();



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
