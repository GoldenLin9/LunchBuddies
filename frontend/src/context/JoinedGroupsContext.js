// src/context/JoinedGroupsContext.js
import React, { createContext, useState, useContext } from 'react';

const JoinedGroupsContext = createContext();

export const useJoinedGroups = () => useContext(JoinedGroupsContext);

export const JoinedGroupsProvider = ({ children }) => {
  const [joinedGroups, setJoinedGroups] = useState([]);

  const joinGroup = (group) => {
    setJoinedGroups(prevGroups => [...prevGroups, group]);
  };

  return (
    <JoinedGroupsContext.Provider value={{ joinedGroups, joinGroup }}>
      {children}
    </JoinedGroupsContext.Provider>
  );
};
