import uuid from "uuid";

export default function bookApp(
  state = {
    authors: [],
    books: [],
  },
  action
) {
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      let existingAuthor = state.authors.filter(
        (author) => author.authorName === action.book.authorName
      );
      if (existingAuthor.length > 0) {
        return {
          ...state,
          books: [...state.books, action.book],
        };
      } else {
        return {
          authors: [
            ...state.authors,
            { authorName: action.book.authorName, id: uuid },
          ],
          books: [...state.books, action.book],
        };
      }

    case "REMOVE_BOOK":
      idx = state.books.findIndex((book) => book.id === action.id);
      return {
        ...state,
        books: [...state.books.slice(0, idx), ...state.books.slice(idx + 1)],
      };

    case "ADD_AUTHOR":
      return {
        ...state,
        authors: [...state.authors, action.author],
      };

    case "REMOVE_AUTHOR":
      idx = state.authors.findIndex((author) => author.id === action.id);
      return {
        ...state,
        authors: [
          ...state.authors.slice(0, idx),
          ...state.authors.slice(idx + 1),
        ],
      };

    default:
      return state;
  }
}
