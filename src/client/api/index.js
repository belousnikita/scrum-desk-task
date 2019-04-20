import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listColumns() {
        return axios.get(`${apiPrefix}/columns`);
    },

    createColumn(data) {
        return axios.post(`${apiPrefix}/columns`, data);
    },

    deleteColumn(columnId) {
        return axios.delete(`${apiPrefix}/columns/${columnId}`);
    }
}