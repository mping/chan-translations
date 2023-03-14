# Scraper

## What to scrape

- Dharma blog archives: 
 - https://www.chanpureland.org/dharma-blog

- Q&A: 
 - https://www.chanpureland.org/qa

- Cultivation stories:
 - https://www.chanpureland.org/cultivation-stories


## How?


- Go through all archive links
 - for each page, collect each "Read more" link


 ```shell
 node scraper.js https://www.chanpureland.org/dharma-blog
 node scraper.js https://www.chanpureland.org/qa
 node scraper.js https://www.chanpureland.org/cultivation-stories
 ```