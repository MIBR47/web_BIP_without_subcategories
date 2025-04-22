NEXT_PUBLIC_API_URL = 'http://localhost:3000/api/cms';
NEXT_PUBLIC_URL = 'http://localhost:3001';

const publicUrl = process.NEXT_PUBLIC_URL;
const apiUrl = process.NEXT_PUBLIC_API_URL;

const _publicUrl = publicUrl;
const _apiUrl = apiUrl;
export { _publicUrl as publicUrl, _apiUrl as apiUrl };
