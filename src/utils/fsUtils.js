const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');
async function readTalker() {
    try {
        const data = await fs.readFile(talkerPath);
        const talkers = JSON.parse(data);
        return talkers;
    } catch (error) {
        console.error(`Erro na leitura: ${error}`);
    }
}

async function writeNewTalker(newPerson) {
    await fs.writeFile(talkerPath, JSON.stringify(newPerson));
}

module.exports = {
    readTalker,
    writeNewTalker,
};