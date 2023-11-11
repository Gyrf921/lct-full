export const URL = 'https://lct-production.up.railway.app';

const token = localStorage.getItem('token');

export const headers = { Authorization: `Bearer ${token}` };
