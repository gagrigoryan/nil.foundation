import axios from 'axios';
import config from './config';

const METHODS = ['GET', 'DELETE', 'HEAD', 'POST', 'PUT', 'PATCH'];

const sidedRequest = (opts) => {
    const headers = {};

    if (opts.withToken) {
        headers.authorization = `bearer ${config.TOKEN}`;
    }

    return axios({ baseURL: `${config.API_URL}`, headers, ...opts });
};

const doRequest = opts => {
  return sidedRequest(opts);
};

const request = METHODS.reduce((req, method) => {
  return { ...req, [method]: opts => doRequest({ ...opts, method }) };
}, {});

export default request;
