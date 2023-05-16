import React, {FC} from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/store';

import {Root} from './src/components/root/Root';

const App: FC = () => {
  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
};

export default App;
