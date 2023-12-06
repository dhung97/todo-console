const fs = require('fs');
const pathfile = './db/tasks.json';

const saveDB = (data) => {
    fs.writeFileSync(pathfile, JSON.stringify(data))
}

const readDB = () => {
    if(!fs.existsSync(pathfile)){
        return null;
    }

    const data = fs.readFileSync(pathfile, { encoding: 'utf-8'});
    const tasks_stored = JSON.parse(data);
    return tasks_stored;
}

module.exports = {
    saveDB,
    readDB
};