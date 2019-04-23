import { EventEmitter } from "events";

import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

const CHANGE_EVENT = "change";

let _columns = [];
let _loadingError = null;
let _isLoading = true;

// Auto format for column document 
function formatColumn(column) {
  return {
    id: column._id,
    title: column.title,
    tasks: column.tasks
  };
}

// New store, extends from event emitter
const ColumnsStore = Object.assign({}, EventEmitter.prototype, {
  // Return is loading from db
  isLoading() {
    return _isLoading;
  },
  // Return stored columns 
  getColumns() {
    return _columns;
  },
  // Emit change
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  // Adding listener
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  // Removing listener
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});
// Register change on flux dispatcher
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
