const configModel = require('../models/configModel.js');

const getConfig = async (req, res) => {
	try {
		const config = await configModel.getConfig();
		res.status(200).json(config);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching the config', error: error.message });
	}
};

module.exports = { getConfig };
