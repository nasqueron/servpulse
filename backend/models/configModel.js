const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config/app.json');

const getConfig = async () => {
	const jsonString = fs.readFileSync(CONFIG_PATH, 'utf-8');
	return JSON.parse(jsonString);
};

const updateConfig = async (config) => {
	fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, '\t'), 'utf-8');
	return config;
};

module.exports = { getConfig, updateConfig };
