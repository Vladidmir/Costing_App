import React, {FC} from 'react';
import {StatusBar} from 'react-native';

import {Root} from './src/components/root/Root';

import AuthContextProvider from './src/context/auth-context';

const App: FC = () => {
  return (
    <>
      <StatusBar />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
};

export default App;
