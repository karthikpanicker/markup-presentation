import fs from 'fs';
import path from 'path';
import Marpit from '@marp-team/marpit'

const slidesDirectory = path.join(process.cwd(), 'slides');
const marpit = new Marpit();
const theme = `
/* @theme custom */

section {
  background-color: white;
  color: black;
  padding: 40px;
  height: 60%;
  width: 80%;
}

h1,
h2 {
  text-align: center;
  margin: 0;
}

h6 {
  font-size: 1rem;
}

h1 {
  color: black;
}
p {
  font-size: 1rem;
}
ul li {
  font-size: 1rem
}
`
marpit.themeSet.default = marpit.themeSet.add(theme)

export async function getAllSlidesData() {
    const slideFiles = fs.readdirSync(slidesDirectory);
    const slides = slideFiles.map(fileName => {
        const id = fileName.replace(/\.md$/, '');

        // get each file content.
        const fullPath = path.join(slidesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { html, css } = marpit.render(fileContents);
        const htmlContent = `<!DOCTYPE html><html><body><style>${css}</style>${html}</body></html>`;
        return {
            id,
            htmlContent
        }
    });
    return slides.sort((a,b) => {
        if(a.id > b.id)
            return 1;
        else
            return -1;
    })
}
