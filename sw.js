const staticAssets = [
  'http://127.0.0.1:62461/styles.css',
  'http://127.0.0.1:62461//app.js'
];


self.addEventListener('install',aysnc event =>{
    console.log('install');
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch',event =>{
   console.log('fetch'); 
});