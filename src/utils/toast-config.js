import React from 'react';
import * as RnToast from 'react-native-toast-message';
import {scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

//Constant
import {normalizeText} from './text-normalize';
import { FONTS } from './fonts';
import COLORS from './colors';

// return null
export const toastConfig = {
  success: props => (
    <RnToast.BaseToast
      {...props}
      style={styles.container(COLORS.colorGreen, COLORS.colorWhite)}
      text1NumberOfLines={0}
      text1Style={styles.text1Style(COLORS.colorGreen)}
    />
  ),
  error: props => (
    <RnToast.BaseToast
      {...props}
      style={styles.container(COLORS.colorRed, COLORS.colorWhite)}
      text1NumberOfLines={0}
      text1Style={styles.text1Style(COLORS.colorRed)}
    />
  ),
  info: props => (
    <RnToast.BaseToast
      {...props}
      style={styles.container()}
      text1NumberOfLines={0}
      text1Style={styles.text1Style}
    />
  ),
};

const styles = StyleSheet.create({
  container: (color, color2) => ({
    height: 'auto',
    width: '85%',
    borderLeftColor: color ? color : COLORS.colorBlack,
    paddingVertical: scale(10),
    backgroundColor: color2 ? color2 : COLORS.colorWhite,
  }),
  text1Style: color => ({
    fontFamily: FONTS.AppMediumFont,
    fontSize: normalizeText(11),
    color: color ? color : COLORS.colorBlack,
    letterSpacing: 0.5,
    marginVertical: scale(0.5),
  }),
});
