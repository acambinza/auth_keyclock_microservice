import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'client_id':'litle_cms'
  },
  transformRequest: [
    (data) => {
      return data;
    },
  ],
  transformResponse: [
    (data) => {
      return data;
    },
  ],
});
