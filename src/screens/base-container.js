import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
//Hook
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//Constant
import COLORS from '../utils/colors';
import {IMAGES} from '../utils/image-path';

export default function BaseContainer({
  children,
  isTopSafeArea = false,
  isBottomSafeArea = false,
  bottomSafeColor = COLORS.colorTransparent,
  showBgImage = true,
  bgColor = COLORS.colorTransparent,
  bgImage = IMAGES.app_bg_container,
}) {
  const inset = useSafeAreaInsets();

  return (
    <>
      {showBgImage ? (
        <Image
          style={styles.bgImageStyle}
          source={bgImage}
          resizeMode="cover"
        />
      ) : null}
      <View
        style={styles.wrapperView(
          inset,
          isTopSafeArea,
          isBottomSafeArea,
          bgColor,
        )}>
        {children}
      </View>
      {isTopSafeArea ? <View style={styles.headerTopView(inset)} /> : null}
      {isBottomSafeArea && (
        <View style={styles.bottomSafeColorStyle(bottomSafeColor, inset)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerTopView: inset => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: inset.top,
    position: 'absolute',
  }),
  bgImageStyle: {position: 'absolute', height: '100%', width: '100%'},
  wrapperView: (inset, isTopSafeArea, isBottomSafeArea, bgColor) => ({
    flex: 1,
    backgroundColor: bgColor,
    marginTop: isTopSafeArea ? inset.top : 0,
    marginBottom: isBottomSafeArea ? inset.bottom : 0,
  }),
  bottomSafeColorStyle: (color, inset) => ({
    width: '100%',
    height: inset.bottom,
    backgroundColor: color,
    position: 'absolute',
    bottom: 0,
  }),
});
