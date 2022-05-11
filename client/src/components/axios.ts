import axios from 'axios';
const baseURL = `${process.env.REACT_APP_SERVER_URI}`;

const axiosInstance = axios.create();

//원래는 create에 속성값 정해줫는데 시작하자마자 로컬에 빈토큰을 헤더에 담아
//요청시 빈 토큰을 보내 문제가 됨
//그래서 request 요청보내기전에 속성값을 다시 정해 보내주는 방식으로 변경

//요청 보내기전 headers 속성 및 토큰 전달
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = window.localStorage.getItem('accessToken');
    config.baseURL = baseURL;
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

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
          let accessToken = res.data.access_token;
          window.localStorage.setItem('accessToken', accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        })
        .catch((err) => {
          console.log(err, 'refreshToken renewal err');
        });
      return axios(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
