let { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
let fs = require('fs');

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

function makeData(arr) {
    const res = []
    for (var i = 0; i < arr.length-1; i = i + 2) {
        const [title, content] = arr.slice(i, i+2)
            res.push({title, content});
    }
    return res
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
    let titleWithContent = new CollectContent('.blog-title-link, .blog-content', { name: 'title+content' });

    root.addOperation(archives);//Then we create a scraping "tree":
      archives.addOperation(titleWithContent);

    await scraper.scrape(root);
    fs.writeFileSync('./cultivation-stories.json', JSON.stringify(makeData(titleWithContent.getData())));

    //// 
    //// https://www.chanpureland.org/dharma-blog
    //// 
    config = makeConfig("https://www.chanpureland.org/dharma-blog")

    scraper = new Scraper(config);
    root = new Root();
    archives = new OpenLinks('.blog-archive-list a',{name:'archive'});
    article = new OpenLinks('.blog-read-more a.blog-link', {name:'article' });
    titleWithContent = new CollectContent('.blog-title-link, .blog-content', { name: 'title+content' });

    root.addOperation(archives);//Then we create a scraping "tree":
      archives.addOperation(article);
       article.addOperation(titleWithContent);

    await scraper.scrape(root);
    fs.writeFileSync('./dharma-blog.json', JSON.stringify(makeData(titleWithContent.getData())))


    //// 
    ////  https://www.chanpureland.org/qa
    //// 
    config = makeConfig(" https://www.chanpureland.org/qa")

    scraper = new Scraper(config);
    root = new Root();
    archives = new OpenLinks('.blog-archive-list a',{name:'archive'});
    article = new OpenLinks('.blog-read-more a.blog-link', {name:'article' });
    titleWithContent = new CollectContent('.blog-title-link, .blog-content', { name: 'title+content' });

    root.addOperation(archives);//Then we create a scraping "tree":
      archives.addOperation(article);
       article.addOperation(titleWithContent);

    await scraper.scrape(root);
    fs.writeFileSync('./qa.json', JSON.stringify(makeData(titleWithContent.getData())))

})();    