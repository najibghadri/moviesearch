const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;


let axios = axios.create({
    baseURL: ENDPOINT,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

class ApiService {
     constructor() {

     }


}

export let apiService = new ApiService();
