import { EventEmitter } from "events";

import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

const CHANGE_EVENT = "change";

let _columns = [];
let _loadingError = null;
let _isLoading = true;

function formatColumn(column) {
  return {
    id: column._id,
    title: column.title,
    tasks: column.tasks
  };
}

const ColumnsStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getColumns() {
    return _columns;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch (action.type) {
    case AppConstants.LOAD_COLUMNS_REQUEST: {
      _isLoading = true;

      ColumnsStore.emitChange();
      break;
    }

    case AppConstants.LOAD_COLUMNS_SUCCESS: {
      _isLoading = false;
      _columns = action.columns.map(formatColumn);
      _loadingError = null;

      ColumnsStore.emitChange();
      break;
    }

    case AppConstants.LOAD_COLUMNS_FAIL: {
      _loadingError = action.error;

      ColumnsStore.emitChange();
      break;
    }

    default: {
      console.log("No such handler");
    }
  }
});

export default ColumnsStore;
