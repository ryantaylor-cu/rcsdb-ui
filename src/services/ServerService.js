import axios from 'axios';
import { snakeCase } from 'lodash';
import ClientConfig from '../client-configurations';

class ServerService {
    url = (new ClientConfig()).getApi();

    serverList = () => axios.get(`${this.url}/server`).then(res => res.data);
};

const serverService = new ServerService();

Object.freeze(serverService);

export default serverService;

export { ServerService };
