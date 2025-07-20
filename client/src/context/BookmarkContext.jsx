import { createContext, useContext, useState } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (user) => {
    if (!bookmarks.find((u) => u.id === user.id)) {
      setBookmarks([...bookmarks, user]);
    }
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((u) => u.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
