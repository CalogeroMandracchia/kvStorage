'use strict';

const fs = require('fs');
const { createHash } = require('crypto');
const { promisify } = require('util');


const readdirfy = promisify(fs.readdir);
const readFilefy = promisify(fs.readFile);
const writeFilefy = promisify(fs.writeFile);
const renamefy = promisify(fs.rename);

const sha256sum = data => createHash('sha256').update(data).digest('hex');

module.exports = {
    readdirfy,
    readFilefy,
    writeFilefy,
    sha256sum,
    renamefy
}