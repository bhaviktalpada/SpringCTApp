import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/routers';

//Constants
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../../utils/colors';
import {SCREEN} from '../../../utils/screen-name';
import {STORE_KEY, asyncStorageGet, asyncStorageRemove} from '../../../utils/async-storage';

import * as types from '../../../redux/actions/action-list';
import BaseContainer from '../../base-container';
import { isStringNull } from '../../../utils/helper-function';


export default function LandingScreen({navigation, route}) {
  const dispatch = useDispatch();
  const KEY = route?.params;

  const [loading, setLoading] = useState(true);
  const userToken = useSelector(v => v?.stateReducer?.userToken);

  useEffect(() => {
    checkLandingFlow();
  }, []);

  async function checkLandingFlow() {
    if (KEY === 'RESET') {
      cleanUp();
      storageCleanUp();
      navigateTo(SCREEN.LoginScreen);
    } else {
      setLoading(false)
      const isLog = await isLoggedIn()
      console.log("userToken",isLog);
      if (isLog) {
        navigateTo(SCREEN.DashboardScreen);
      } else {
        navigateTo(SCREEN.LoginScreen);
      }
    }
  }

  async function isLoggedIn() {
    var userToken = await asyncStorageGet(STORE_KEY.LOGIN_TOKEN);
    console.log("userToken",userToken);
    if (isStringNull(userToken)) {
      return false
    }
    return true
  }

  async function cleanUp() {
    dispatch({type: types.IS_USER_LOGIN, data: false});
  }

  async function storageCleanUp() {
    await asyncStorageRemove(STORE_KEY.LOGIN_TOKEN);
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
