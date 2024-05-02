import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { normalizeText } from '../../utils/text-normalize';
import { FONTS } from '../../utils/fonts';
import COLORS from '../../utils/colors';

const AppRegularText = ({children, style, onPress, numberOfLines}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[styles.textStyle, style]}>
      {children}
    </Text>
  );
};

export default AppRegularText;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FONTS.AppRegularFont,
    color: COLORS.Black,
    fontSize: normalizeText(14),
  },
});
