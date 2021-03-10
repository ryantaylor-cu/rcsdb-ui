import axios from 'axios';
import { snakeCase } from 'lodash';
import ClientConfig from '../client-configurations';

class VMService {
    url = (new ClientConfig()).getApi();

    vmList = () => axios.get(`${this.url}/vm`).then(res => res.data);
};

const vmService = new VMService();

Object.freeze(vmService);

export default vmService;

export { VMService };
