import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchConfigData() {
	try {
		const response = await axios.get(`${apiUrl}/config/getAll`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch the config data');
	}
}
