// useBookmark.js
import { useState, useEffect } from 'react';
import getCookie from './getCookie';

const useBookmark = (initialBookmarks, updateBookmarkCount) => {
  const [bookmarkStates, setBookmarkStates] = useState({}); // Change the initial state to an empty object
  const [countUpdateLoading, setCountUpdateLoading] = useState(false);

  useEffect(() => {
    if (initialBookmarks) {
      const initialBookmarkStates = initialBookmarks.reduce((acc, bookmark) => {
        acc[bookmark._id] = true;
        return acc;
      }, {});
      setBookmarkStates(initialBookmarkStates);
    }
  }, [initialBookmarks]);

  const handleAddBookmark = async (codeComponentId) => {
    try {
      const token = getCookie('token');

      // If the code component is already bookmarked, remove it
      if (bookmarkStates[codeComponentId]) {
        // Remove bookmark
        const removeResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXUS_URL}/api/bookmark/remove-bookmark`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ codeComponentId }),
        });

        const removeData = await removeResponse.json();

        if (removeResponse.ok) {
          console.log('Bookmark removed successfully:', removeData);
          // Update the UI to show the "Add Bookmark" button
          setBookmarkStates((prevStates) => ({
            ...prevStates,
            [codeComponentId]: false,
          }));
          // Update bookmark count
          setCountUpdateLoading(true);
          updateBookmarkCount(codeComponentId, false);
        } else {
          console.error('Error removing bookmark:', removeData.error);
        }
      } else {
        // If the code component is not bookmarked, add it
        const addResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXUS_URL}/api/bookmark/add-bookmark/${codeComponentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const addData = await addResponse.json();

        if (addResponse.ok) {
          console.log('Bookmark added successfully:', addData);
          // Update the UI to show the "Remove Bookmark" button
          setBookmarkStates((prevStates) => ({
            ...prevStates,
            [codeComponentId]: true,
          }));
          // Update bookmark count
          setCountUpdateLoading(true);
          updateBookmarkCount(codeComponentId, true);
        } else {
          console.error('Error adding bookmark:', addData.error);
        }
      }
    } catch (error) {
      console.error('Error handling bookmark:', error);
    } finally {
      setCountUpdateLoading(false);
    }
  };

  return {
    bookmarkStates,
    countUpdateLoading,
    handleAddBookmark
  };
};

export default useBookmark;
