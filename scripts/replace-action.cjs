const fs = require('fs');
const path = require('path');

const resolve = (...to) => path.join(__dirname, '..', ...to);
const read = (f) => fs.readFileSync(resolve(f), 'utf8');
const write = (f, d) => fs.writeFileSync(resolve(f), d, 'utf8');

const source = read('dist/index.cjs');
const action = read('action.yml');
const action2 = action.replace(/^(\s+)\/\/ SCRIPT REPLACE START[\s\S]*?^(\s+)\/\/ SCRIPT REPLACE END/m, (_, indent) => {
    return `${indent}// SCRIPT REPLACE START
${source.trim().replace(/^/gm, indent)}
${indent}// SCRIPT REPLACE END`;
});

write('action.yml', action2);
