import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-react-43c61.firebaseio.com/'
});

export default instance;