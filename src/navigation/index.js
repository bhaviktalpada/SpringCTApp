import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

import {useDispatch, useSelector} from 'react-redux';

//Constant
import {setDeviceInfo} from '../redux/actions/state-actions';
import {
  setConnectionType,
  toggleNetState,
} from '../redux/actions/netInfo-actions';

import {STORE_KEY, storeJsonValueAsync} from '../utils/async-storage';
import {MOBILE_PLATFORM, PLATFORM_MOBILE} from '../utils/app-enum';


//Screens
import LandingScreen from '../screens/auth/landing';
import LoginScreen from '../screens/auth/login';
import DashboardScreen from '../screens/dashboard';
import AddEmployeeScreen from '../screens/addEmployee';

import {SCREEN} from '../utils/screen-name';
import {APP} from '../utils/constants';
import {globalNavigationRef} from '../utils/helper-navigations';
import {Platform} from 'react-native';

export default function Route() {
  
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const NetInfoSubscriber = NetInfo.addEventListener(state => {
      var netLog = state.isConnected
        ? `Routes.js => Device is online & connected with ${state.type.toUpperCase()}`
        : `Routes.js => Device is offline & connected with ${state.type.toUpperCase()}`;
      if (APP.SHOW_LOG) {
        console.log(netLog);
      }

      var c_type = state.type.toUpperCase();
      dispatch(toggleNetState(state.isConnected));
      dispatch(setConnectionType(c_type));
    });

    // Device information
    deviceInformation();

    return () => {
      // Check Internet
      NetInfoSubscriber();
    };
  }, []);

  const deviceInformation = async () => {
    var systemVersion = DeviceInfo.getSystemVersion();
    var deviceType =
      Platform.OS == PLATFORM_MOBILE.ANDROID
        ? MOBILE_PLATFORM.ANDROID
        : MOBILE_PLATFORM.IOS;
    var deviceName = await DeviceInfo.getDeviceName();
    var appVersion = DeviceInfo.getVersion();
    var deviceModel = DeviceInfo.getBrand();
    var deviceUUID = await DeviceInfo.getUniqueId();
    var deviceInfo = {
      systemVersion,
      deviceType,
      deviceName,
      appVersion,
      deviceModel,
      deviceUUID,
    };
    if (APP.SHOW_LOG) {
      console.log('***DeviceInfo: ', deviceInfo);
    }
    dispatch(setDeviceInfo(deviceInfo));
    await storeJsonValueAsync(STORE_KEY.DEVICE_INFO, deviceInfo);
  };

  return (
    <NavigationContainer ref={globalNavigationRef}>
      <Stack.Navigator
        initialRouteName={SCREEN.LandingScreen}
        screenOptions={{headerShown: false, orientation: 'portrait'}}>
        <Stack.Screen name={SCREEN.LandingScreen} component={LandingScreen} />
        <Stack.Screen name={SCREEN.LoginScreen} component={LoginScreen} />
        
        <Stack.Screen
          name={SCREEN.DashboardScreen}
          component={DashboardScreen}
        />
        <Stack.Screen
          name={SCREEN.AddEmployeeScreen}
          component={AddEmployeeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
