let { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
let fs = require('fs');
const { exit } = require('process');

// https://www.chanpureland.org/dharma-blog
// https://www.chanpureland.org/qa
// https://www.chanpureland.org/cultivation-stories

function makeConfig(url) {
    return {
        baseSiteUrl: url,
        startUrl: url,
        concurrency: 30,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
        maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
        logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
    }
}

(async () => {


    //// 
    //// https://www.chanpureland.org/cultivation-stories
    //// 
    let config = makeConfig("https://www.chanpureland.org/cultivation-stories")
    let scraper = new Scraper(config);
    let root = new Root();
    let archives = new OpenLinks('.blog-archive-list a',{name:'archive'});

    let article = new OpenLinks('.blog-read-more a.blog-link', {name:'article' });
    let title = new CollectContent('.blog-title-link, .blog-content', { name: 'title+content' });

    root.addOperation(archives);//Then we create a scraping "tree":
    archives.addOperation(title);

    await scraper.scrape(root);
    console.log(JSON.stringify(archives.getData()))
    fs.writeFileSync('./cultivation-stories.json', JSON.stringify(archives.getData()));


    //// 
    //// https://www.chanpureland.org/dharma-blog
    //// 
    config = makeConfig("https://www.chanpureland.org/dharma-blog")
    exit(0)

    scraper = new Scraper(config);
    root = new Root();
    archives = new OpenLinks('.blog-archive-list a',{name:'archive'});//Opens each archive page.

    article = new OpenLinks('.blog-read-more a.blog-link', {name:'article' });
    title = new CollectContent('h1', { name: 'title' });//"Collects" the text from each H1 element.

    root.addOperation(archives);//Then we create a scraping "tree":
    archives.addOperation(article);
       article.addOperation(title);

    await scraper.scrape(root);
    fs.writeFile('./articles.json', JSON.stringify(title.getData()), () => { });//Produces a formatted JSON with all job ads.


})();    