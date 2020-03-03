import React, { useState } from 'react';


const App = ({ host }) => {
  const initTestState = 'init test state';
  const [testState, setTestState] = useState(initTestState);

  return (
    <div aria-label="app">
      {`this app is running on ${host}`}
    </div>
  );
};

export default App;
