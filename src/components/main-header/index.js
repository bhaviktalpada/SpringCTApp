import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

//Hook
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import COLORS from '../../utils/colors';
import AppMediumText from '../app-medium-text/app-medium-text';
import AppBoldText from '../app-bold-text';

//Constant
import {APP} from '../../utils/constants';
import {ImgBack} from '../../utils/svg-images';
import ImgSVG from '../image-svg';
import LocalizeText from '../../utils/text-localize';
import {screenWidth} from '../../utils/dimensions';
import VectorIcon, {ICON_NAME} from '../custom-vector-icon';
import {IMAGES} from '../../utils/image-path';

export default function MainHeader({
  leftIconName,
  iconColor = COLORS.colorBlack,
  leftTitle,
  firstRightIcon,
  secondRightIcon,
  rightButtonTitle,
  rightButtonIcon,
  rightButtonColor = COLORS.colorRed,
  borderBottomColor = COLORS.colorLightestGrayE0,
  profileSource,
  iconSize,
  leftIconSize = APP.BACK_ICON_SIZE,
  filterIconSize = 14,
  totalNotifications,
  navigation,
  onPressRightFirst,
  onPressRightSecond,
  onPressRightButton,
  onPressCloseSearch,
  onPressProfile,
  searchText,
  onChangeText,
  onPressReturn,
  isActiveFilter = false,
  backCallBack = () => {},
}) {
  
  const inset = useSafeAreaInsets();
  return (
    <>
      <View style={styles.mainContainer(inset.top)}>
        <View style={styles.innerViewleft}>
          {leftIconName && (
            <TouchableOpacity
              onPress={() => {
                backCallBack();
                navigation.goBack();
              }}
              style={styles.leftIconContainer}>
              <ImgSVG
                icon={ImgBack}
                width={leftIconSize}
                height={leftIconSize}
              />
              
            </TouchableOpacity>
          )}
          
            <AppMediumText
              sizeFont={APP.MAIN_HEADER_LEFT_FONT_SIZE}
              color={COLORS.colorBlack}>
              {leftTitle}
            </AppMediumText>
          
        </View>
        <View style={styles.innerViewRight}>
          {firstRightIcon && (
            <TouchableOpacity
              onPress={onPressRightFirst}
              style={styles.rightIconContainer}>
              {totalNotifications > 0 && (
                <View
                  style={styles.badgeContainer(
                    totalNotifications.length > 2 ? 3 : 2,
                  )}>
                  <AppBoldText
                    numberOfLines={1}
                    color={COLORS.colorWhite}
                    sizeFont={APP.APP_NOTIFICATION_COUNT_FONT_SIZE}>
                    {totalNotifications.length > 2
                      ? APP.LONG_DIGIT_NOTIFICATION_COUNT
                      : totalNotifications}
                  </AppBoldText>
                </View>
              )}
              <View style={{}}>
                <ImgSVG
                  icon={firstRightIcon}
                  width={filterIconSize}
                  height={filterIconSize}
                />
                {isActiveFilter && <View style={styles.activeView} />}
              </View>
            </TouchableOpacity>
          )}
          {secondRightIcon && (
            <TouchableOpacity onPress={onPressRightSecond}>
              <VectorIcon.AntDesign
                name={secondRightIcon}
                size={scale(iconSize)}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
          {profileSource && (
            <TouchableOpacity
              onPress={onPressProfile}
              style={styles.profileContainer}>
              <FastImage
                defaultSource={IMAGES.ic_user_avatar}
                style={styles.imgStyle}
                source={{uri: profileSource}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          {(rightButtonIcon || rightButtonTitle) && (
            <TouchableOpacity
              style={styles.rightBtnTouchableView}
              onPress={onPressRightButton}>
              <VectorIcon.MaterialIcons
                name={rightButtonIcon}
                size={scale(iconSize)}
                color={rightButtonColor}
              />
              <AppBoldText
                sizeFont={APP.MAIN_HEADER_RIGHT_FONT_SIZE}
                color={rightButtonColor}
                style={{marginLeft: scale(4)}}>
                {rightButtonTitle}
              </AppBoldText>
            </TouchableOpacity>
          )}
        </View>
        
      </View>
      <View style={styles.borderBottomStyle(borderBottomColor)}></View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: insetTop => ({
    height: scale(44),
    width: '100%',
    paddingHorizontal: scale(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(insetTop),
  }),
  innerViewleft: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftIconContainer: {
    marginRight: scale(3),
    paddingRight: scale(10),
    paddingVertical: scale(10),
  },
  innerViewRight: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightIconContainer: {
    marginRight: scale(10),
    padding: scale(8),
  },
  badgeContainer: notiCount => ({
    height: scale(18),
    width: scale(notiCount > 2 ? 22 : 18),
    position: 'absolute',
    zIndex: 1,
    right: scale(2),
    marginTop: scale(3),
    backgroundColor: COLORS.colorBlack,
    borderRadius: scale(18),
    borderWidth: scale(1),
    borderColor: COLORS.colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  profileContainer: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.colorLightestGrayE0,
  },
  imgStyle: {
    height: scale(30),
    width: scale(30),
    alignItems: 'center',
    borderRadius: scale(15),
  },
  searchViewMain: {
    position: 'absolute',
    height: scale(54),
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: scale(10),
  },
  searchViewSub: {
    flexDirection: 'row',
    alignItems: 'center',
    height: APP.TEXT_FIELD_SEARCH_HEIGHT,
    width: screenWidth - 60,
    marginLeft: 4,
  },
  searchCloseIcon: {
    marginRight: scale(3),
    padding: scale(8),
    flex: 1,
  },
  borderBottomStyle: bgcolor => ({
    width: '100%',
    height: scale(APP.BORDER_WIDTH),
    backgroundColor: bgcolor,
  }),
  rightBtnTouchableView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeView: {
    backgroundColor: COLORS.colorGreen,
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    right: -6,
    top: -5,
  },
});
