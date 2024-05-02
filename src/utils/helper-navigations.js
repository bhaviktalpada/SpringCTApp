import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const globalNavigationRef = React.createRef();

export function globalNavigate(name, param) {
  globalNavigationRef?.current?.dispatch(StackActions.replace(name, param));
}

export function NavigateTo(screenName, screenParam) {
  globalNavigationRef?.current?.navigate(screenName, screenParam);
}

export function PushTo(screenName, screenParam) {
  globalNavigationRef?.current?.dispatch(
    StackActions.push(screenName, screenParam),
  );
}
