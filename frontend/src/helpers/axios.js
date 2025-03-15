import { message } from "antd";
import axios from "axios";

export const appAxios = axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    message.error(err.response.data.message || "Something Went Wrong");
    throw err;
  }
);
