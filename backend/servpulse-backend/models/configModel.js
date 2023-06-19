const fs = require('fs');

const getConfig = async () => {
    const jsonString = fs.readFileSync('config/app.json');
    const jsonObject = JSON.parse(jsonString);
    return await jsonObject;
};

module.exports = { getConfig };
