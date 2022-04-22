import axios from 'axios';

const baseURL = `${process.env.REACT_APP_SERVER_URI}`;
const accessToken = window.localStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL,
  timeout: 100,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      //originalRequest._retry = true; 원래는 여기있었는데 실패하든 성공하든 트루
      axiosInstance
        .get('/refresh')
        .then((res) => {
          console.log('토큰 새로 발급 받았어');
          originalRequest._retry = true;
          window.localStorage.setItem('accessToken', res.data.access_token);
        })
        .catch((err) => {
          console.log(baseURL, accessToken);
          console.log(err, 'refreshToken renewal err');
        });
      return axios(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
