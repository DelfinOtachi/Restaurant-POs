import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stocks';

export const getStockItems = () => axios.get(API_URL);
export const createStockItem = (data) => axios.post(API_URL, data);
export const updateStockItem = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteStockItem = (id) => axios.delete(`${API_URL}/${id}`);
