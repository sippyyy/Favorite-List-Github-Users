import axios from 'axios'
export const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    outboundURL: process.env.REACT_APP_BASE_GITHUB
});

export const post = async (path, options = {}) => {
    const response = await request.post(path, options)
    return response
}

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request