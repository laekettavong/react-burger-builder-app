import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-app-1ea50.firebaseio.com/'
});

export default instance;