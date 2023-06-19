import axios from 'axios';

export async function fetchConfigData() {
	try {
		// # FIXME: `VUE_APP_CONFIG_API_ENDPOINT` is somehow not working from a .env (hardcoded the url for now)
		const response = await axios.get('http://localhost:3000/api/config/getAll');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch the config data');
	}
}
