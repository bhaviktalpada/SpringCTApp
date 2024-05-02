import {StyleSheet, Text} from 'react-native';
import React from 'react';
//Constant
import { normalizeText } from '../../utils/text-normalize';
import { APP } from '../../utils/constants';
import { FONTS } from '../../utils/fonts';
import COLORS from '../../utils/colors';

const AppBoldText = ({children, style, onPress, numberOfLines = 1, sizeFont = APP.FONT_SIZE_14, color = COLORS.colorBlack}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[styles.textStyle(sizeFont, color), style]}>
      {children}
    </Text>
  );
};

export default AppBoldText;

const styles = StyleSheet.create({
  textStyle: (sizeFont, color) => ({
    fontFamily: FONTS.AppBoldFont,
    color: color,
    fontWeight: '700',
    fontSize: normalizeText(sizeFont)
  }),
});
