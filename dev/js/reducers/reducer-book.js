export default function (state = null, action) {
    switch (action.type) {
        case "BOOK_ADDED_TO_BOOKS":
          return action.payload || state;
          break;
        case "BOOK_REMOVED_FROM_BOOKS":
        	return action.payload || state;
        	break;
        case "BOOK_BOOKS_REQUESTED":
        	return action.payload || state;
        	break;
        case "BOOK_BOOKS_REQUEST_REMOVED":
            return action.payload || state;
            break;
        case "ACCEPTED_REQUEST":
            return action.payload || state;
            break;
    }
    return state;
}