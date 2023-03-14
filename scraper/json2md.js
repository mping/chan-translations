let fs = require('fs');
let unidecode = require('unidecode');

['qa', 'dharma-blog', 'cultivation-stories'].forEach (folder => {
    const file = `${folder}.json`
    let data = fs.readFileSync(file) 
    data = JSON.parse(data)

    data.forEach ((obj,index) => {
        let {title, content} = obj      
        let slug = unidecode(title)
                    .replaceAll('\'','')
                    .replaceAll('.','')
                    .replaceAll('"','')
                    .replaceAll('/','')
                    .replaceAll(':','')
                    .replaceAll('?','')
                    .replaceAll('!','')
                    .replaceAll(',','')
                    .replaceAll('&','and')
                    .replaceAll('[','')
                    .replaceAll(']','')
                    .replaceAll('  ',' ')
                    .replace(/ /g, "_")
                    .trim()
                    .toLowerCase()
        
        const contents = `# ${title}\n\n${content}`
        fs.writeFileSync(`${folder}/${index}_${slug}.md`, contents)
    })
})