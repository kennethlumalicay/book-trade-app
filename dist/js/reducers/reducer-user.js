"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments[1];

    switch (action.type) {
        case "BOOK_ADDED_TO_USER_OWNED":
            return action.payload || state;
            break;
        case "BOOK_REMOVED_FROM_USER":
            return action.payload || state;
            break;
        case "BOOK_USER_REQUESTED":
            return action.payload || state;
            break;
        case "BOOK_USER_REQUEST_REMOVED":
            return action.payload || state;
            break;
    }
    return state;
};