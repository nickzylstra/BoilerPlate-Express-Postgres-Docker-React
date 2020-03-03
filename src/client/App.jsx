import React, { useState } from 'react';


const App = ({ host }) => {
  const initTestState = 'init test state';
  const [testState, setTestState] = useState(initTestState);

  return (
    <>
      {`this app is running on ${host}`}
    </>
  );
};

export default App;
