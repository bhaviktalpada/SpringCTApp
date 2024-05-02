import React, {useEffect} from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider as StoreProvider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import { PersistGate } from 'redux-persist/es/integration/react';
import Route from './src/navigation';
//Constant
import { STATUSBAR_TYPE } from './src/utils/app-enum';

import { persistedStore, store } from './src/redux/store/store';
import {toastConfig} from './src/utils/toast-config';
import COLORS from './src/utils/colors';


const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1500);
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <View style={styles.mainContainer}>
          <StatusBar
            translucent={true}
            barStyle={STATUSBAR_TYPE.DARK}
            backgroundColor={COLORS.colorTransparent}
          />
          <Route />
          <Toast config={toastConfig} />
        </View>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;

export const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});
