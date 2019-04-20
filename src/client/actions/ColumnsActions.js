import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ColumnsActions = {
    loadColumns() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_COLUMNS_REQUEST
        });

        api.listColumns()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_COLUMNS_SUCCESS,
                columns: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_COLUMNS_FAIL,
                error: err
            })
        );
    },

    createColumn(column) {
        api.createColumn(column)
        .then(() =>
            this.loadColumns()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteColumn(columnId) {
        api.deleteColumn(columnId)
        .then(() =>
            this.loadColumns()
        )
        .catch(err =>
            console.error(err)
        );
    }
};

export default ColumnsActions;