import Axios from "axios";
import Qs from "qs";
import moment from "moment";

const authAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  paramsSerializer: (params) => {
    return Qs.stringify(params, {
      arrayFormat: "brackets",
      filter: (_prefix: string, value: any) => {
        if (moment.isMoment(value) || value instanceof Date) {
          return value.toISOString();
        }
        return value;
      },
    });
  },
});

authAxios.interceptors.request.use(
  async function (options) {
    const token = localStorage.getItem("jwt");

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    return options;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default authAxios;
