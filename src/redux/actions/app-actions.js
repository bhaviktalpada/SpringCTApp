import firebaseMessage from '@react-native-firebase/messaging';

//Constant
import { STORE_KEY, asyncStorageSave } from '../../utils/async-storage';
import * as types from './action-list';
import { APP } from '../../utils/constants';


export const FCMToken = () => {
  return dispatch => {
    
    firebaseMessage()
      .getToken()
      .then(async fcmToken => {
        if (APP.SHOW_LOG) {
          console.log('FCM TOKEN:', fcmToken);
        }
        await asyncStorageSave(STORE_KEY.FCM_TOKEN, fcmToken);
        dispatch({type: types.FCM_TOKEN, data: fcmToken});
      })
      .catch(async e => {
        console.log('async e', e);
        await asyncStorageSave(STORE_KEY.FCM_TOKEN, null);
        dispatch({type: types.FCM_TOKEN, data: null});
      });
  };
};
