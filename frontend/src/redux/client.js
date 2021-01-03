import environment from "../env";

export class TravelifyError extends Error {
  constructor(error) {
    super(error);
    if (error === "unknown endpoint") {
      this.error = "An error occured in API";
    } else {
      this.error = error;
    }
  }
}

class Client {
  constructor() {
    this.baseURL = environment.baseURL;
    this.headers = {
      Authorization: null,
      Accept: "application/json",
    };
    this.client = ({ method, url, payload }) => {
      let body;
      if (Object.prototype.toString.call(payload) === "[object FormData]") {
        delete this.headers["Content-Type"];
        body = payload;
      } else {
        this.headers["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
      }

      if (localStorage.user) {
        const userId = JSON.parse(localStorage.user).id;
        const token = localStorage.token;
        this.setCustomHeaders(userId, token);
      }

      return fetch(`${this.baseURL}${url}`, {
        headers: this.headers,
        method,
        body,
      });
    };
  }

  setCustomHeaders(userId, secret) {
    this.headers["x-bm-userId"] = userId;
    this.headers.Authorization = `Bearer ${secret}`;
  }

  async get(path, params) {
    const url = `${path}/${params}`;
    const _response = await this.client({ method: "GET", url });
    const response = await _response.json();
    if (response.error) {
      throw new TravelifyError(response.error);
    }
    return response;
  }

  async post(path, params, payload) {
    const url = `${path}/${params}`;
    // let response
    const _response = await this.client({ method: "POST", url, payload });
    const response = await _response.json();
    return response;
  }

  async update(path, params, payload) {
    const url = `${path}/${params}`;
    const _response = await this.client({
      method: "PUT",
      url,
      payload,
    });
    const response = await _response.json();
    return response;
  }

  async delete(path) {
    const response = await this.client({ method: "DELETE", url: path });
    const result = await response.json();
    return result;
  }
}

const client = new Client();
export default client;
