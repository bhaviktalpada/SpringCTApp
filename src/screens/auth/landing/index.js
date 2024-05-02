import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/routers';

//Constants
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../../utils/colors';
import {SCREEN} from '../../../utils/screen-name';
import {STORE_KEY, asyncStorageRemove} from '../../../utils/async-storage';

import * as types from '../../../redux/actions/action-list';
import BaseContainer from '../../base-container';


export default function LandingScreen({navigation, route}) {
  const dispatch = useDispatch();
  const KEY = route?.params;

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    checkLandingFlow();
  }, []);

  function checkLandingFlow() {
    if (KEY === 'RESET') {
      cleanUp();
      storageCleanUp();
    } else {
      //   console.log('isUserLoginDone', isUserLoginDone);
      
      navigateTo(SCREEN.DashboardScreen);
    }
  }

  function navigateTo(routeName) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  }

  if (loading == true) {
    return (
      <BaseContainer isTopSafeArea={false} isBottomSafeArea={false}>
        <ActivityIndicator
          size="large"
          color={COLORS.colorBlack}
          style={styles.container}
        />
      </BaseContainer>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
