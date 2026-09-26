import React, { createContext, useContext, useState } from 'react';

const TopicContext = createContext(null);

export function TopicProvider({ children }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <TopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </TopicContext.Provider>
  );
}

export function useTopic() {
  return useContext(TopicContext);
}

export default TopicContext;
