import {StyleSheet, Text} from 'react-native';
import React from 'react';
//Constant
import {FONTS} from '../../utils/fonts';
import COLORS from '../../utils/colors';
import {normalizeText} from '../../utils/text-normalize';

const AppCustomText = ({
  children,
  style,
  onPress,
  numberOfLines = 1,
  fontFamily = FONTS.WorkSansSemiBold,
  fontWeight = '600',
  sizeFont = 20,
  color = COLORS.colorBlack,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        styles.textStyle(fontFamily, fontWeight, sizeFont, color),
        style,
      ]}>
      {children}
    </Text>
  );
};

export default AppCustomText;

const styles = StyleSheet.create({
  textStyle: (familyFont, weightFont, fontSize, color) => ({
    fontFamily: familyFont,
    color: color,
    // fontWeight: weightFont,
    fontSize: normalizeText(fontSize),
  }),
});
