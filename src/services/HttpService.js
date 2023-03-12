import axios from "axios";

export const GetWithoutAuth = (url, body) => {
  return axios.get(url);
};

export const PostWithAuth = (url, body) => {
  return axios.post(url, body, {
    headers: {
      Authorization: localStorage.getItem("tokenKey"),
    },
  });
};

export const DeleteWithAuth = (url) => {
  axios.delete(url, {
    headers: {
      Authorization: localStorage.getItem("tokenKey"),
    },
  });
};

export const RefreshToken = () => {
  var request = axios.post(
    "/auth/refresh",
    {
      userId: localStorage.getItem("currentUser"),
      refreshToken: localStorage.getItem("refreshKey"),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return request;
};
