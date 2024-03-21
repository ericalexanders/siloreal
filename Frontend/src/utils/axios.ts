import Axios from 'axios';
import { configure } from 'axios-hooks'
// import LRU from 'lru-cache'

const axios = Axios.create({
  baseURL: 'http://localhost:8080/v1',
});

// const cache = new LRU({ max: 10 })

configure({ axios })

export default axios;
