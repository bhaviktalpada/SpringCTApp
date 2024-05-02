import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { FONTS } from '../../utils/fonts';
import COLORS from '../../utils/colors';
import { normalizeText } from '../../utils/text-normalize';


const AppMediumText = ({children, style, numberOfLines, onPress}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.textStyle, style]}>
      {children}
    </Text>
  );
};

export default AppMediumText;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FONTS.AppMediumFont,
    color: COLORS.Black,
    fontSize: normalizeText(14),
  },
});
