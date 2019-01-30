'use strict';

const { readdirfy, readFilefy, sha256sum, writeFilefy, renamefy } = require('./app/libs');
//read file from stage
//sha256 them
//match it against a table


//if not there then put it
//if there move in dup

//retrieve list by name, dimension, sha256, length, format, ...

//----------------------------
//what i want now:
//remove dup


//read from dup
//sha256
//check if in json, if the case then move in dup
//otherwise move in DB

//----------------------------
//let's do it!




const main = async () => {
    try {
        
        //create an empty json or read it
        const dbFile = './db.json';
        const dbRaw = await readFilefy(dbFile, 'utf8');
        const dbJSON = JSON.parse(dbRaw);
        const db = new Map(dbJSON);

        //read from dup
        const stageDir = './stage';
        const files = await readdirfy(stageDir);

        //sha256
        //check if in json, if the case then move in dup
        const stagePath = './stage';

        const dupPath = './dup';
        const dupList = [];

        const archivePath = './archive';
        const archiveList = [];

        for(const file of files) {
            const filePath = `${stagePath}/${file}`;
            console.log(`reading ${file}`);
            const checksum = sha256sum(await readFilefy(filePath));
            if(db.has(checksum)) {
                dupList.push(file);
            } else {
                db.set(checksum, file);
                archiveList.push(file);
            }
        }
        console.log("duplist:", dupList);
        console.log("archive:", archiveList);

        for(const file of dupList) {
            const oldPath = `${stagePath}/${file}`;
            const newPath = `${dupPath}/${file}`;
            await renamefy(oldPath, newPath);
        }

        for(const file of archiveList) {
            const oldPath = `${stagePath}/${file}`;
            const newPath = `${archivePath}/${file}`;
            await renamefy(oldPath, newPath);
        }

        await writeFilefy(dbFile, JSON.stringify([...db]), 'utf8');

    } catch(err) {
        console.log(err);
    }
}
//sha256
//check if in json, if the case then move in dup
//otherwise move in DB


main();