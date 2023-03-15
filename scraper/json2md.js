let fs = require('fs');
let unidecode = require('unidecode');

function str2md(title) {
    return unidecode(title)
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
}

function json2md(folder) {
    const file = `${folder}.json`
    let data = fs.readFileSync(file) 
    data = JSON.parse(data)

    data.forEach ((obj, index) => {
        let {title, content} = obj      
        let slug = str2md(title)
        const contents = `# ${title}\n\n${content}`

        const mdFilename = `${folder}/${index}_${slug}.md`
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder, { recursive: true });
        }
        if (!fs.existsSync(mdFilename)) {            
            fs.writeFileSync(mdFilename, contents)
        }
    })
}

module.exports = { json2md }