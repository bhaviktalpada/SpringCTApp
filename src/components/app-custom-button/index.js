import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {APP} from '../../utils/constants';
import COLORS from '../../utils/colors';
import {normalizeText} from '../../utils/text-normalize';
import {FONTS} from '../../utils/fonts';

const AppCustomButton = ({
  onPress,
  title,
  fontSize = APP.FONT_SIZE_14,
  isLoading,
  viewStyle,
  textStyle,
  showRightButton,
  rightBtnStyle,
  rightImage,
  showLeftButton,
  leftBtnStyle,
  leftImage,
  children,
  disabled = false,
  loaderColor = COLORS.colorWhite,
  mainContainerStyle,
  borderWidth = APP.BORDER_WIDTH,
  borderColor = COLORS.colorBlack,
  bgColor = COLORS.colorBlack,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={disabled ? 1.0 : APP.ACTIVE_OPACITY}
      onPress={onPress}
      style={mainContainerStyle}>
      {isLoading && (
        <View
          style={{
            ...styles.containerStyle(borderWidth, borderColor, bgColor),
            ...viewStyle,
          }}>
          <ActivityIndicator size="small" color={loaderColor} />
        </View>
      )}

      {!isLoading && (
        <View
          style={{
            ...styles.containerStyle(borderWidth, borderColor, bgColor),
            ...viewStyle,
          }}>
          {showLeftButton ? (
            <Image
              style={[styles.lrButtonImageStyle, leftBtnStyle]}
              source={leftImage}
            />
          ) : null}

          <Text style={{...styles.textStyle(fontSize), ...textStyle}}>
            {title}
          </Text>
          {showRightButton ? (
            <Image
              style={[styles.lrButtonImageStyle, rightBtnStyle]}
              source={rightImage}
            />
          ) : null}
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppCustomButton;

const styles = StyleSheet.create({
  containerStyle: (widthBorder, borderColor, colorBG) => ({
    height: APP.TEXT_FIELD_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: borderColor,
    borderWidth: widthBorder,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    flexDirection: 'row',
    backgroundColor: colorBG,
  }),
  textStyle: fontSize => ({
    fontFamily: FONTS.AppBoldFont,
    fontSize: normalizeText(fontSize),
    color: COLORS.colorWhite,
    marginHorizontal: 10,
  }),
  imageStyle: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 10,
    resizeMode: 'cover',
    backgroundColor: COLORS.transparent,
    position: 'absolute',
    opacity: 1.0,
  },
  lrButtonImageStyle: {height: 30, width: 30, resizeMode: 'contain'},
});
