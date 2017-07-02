export default function (state = null, action) {
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
}