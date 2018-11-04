var v='ss1';
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(v).then(function(cache) {
     return cache.addAll([
       //'/ss/',
       '/ss/index.html',
       '/ss/index.js'
     ]);
   })
 );
});
self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys().then(function(keyList){
      return Promise.all(keyList.map(function(key,i){
        if(key.substring(0,2)=='ss'&&key!==v)return caches.delete(keyList[i])
      }))
    })
  )
});
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
