const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e=>{
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;
    
    sourceSelector.addEventListener('change',e=>{
        updateNews(e.target.value);
    });
    
if('serviceWorker' in navigator){
    try{
        navigator.serviceWorker.register('http://127.0.0.1:62461/sw.js');
        console.log("service worker registered");
                                        
    } catch(error){
        console.log("service worker registration failed");
    }
}
    
});



async function updateSources(){
    const res = await fetch(`https://newsapi.org/v1/sources`);
    const json = await res.json();
    
    sourceSelector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`)
        .join('\n');
}

async function updateNews(source = defaultSource){
    const res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=bc408de2360748c99306360e21729ea7`);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}


function createArticle(article){
    
    return `
        <div class="article">
            <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
            </a>
        </div> `;
}


