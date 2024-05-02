import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import { scale } from "react-native-size-matters";
import VectorIcon, { ICON_NAME } from "../custom-vector-icon";
import { APP } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { ImgPasswordHide, ImgPasswordShow } from "../../utils/svg-images";
import { normalizeText } from "../../utils/text-normalize";
import { isStringNull } from "../../utils/helper-function";
import { FONTS } from "../../utils/fonts";
import { PLATFORM_MOBILE } from "../../utils/app-enum";
import AppRegularText from "../app-regular-text/app-regular-text";

export default function CustomTextField({
  label,
  placeholder,
  showInlinePlaceholder = true,
  viewStyle,
  textInputStyle,
  keyboardType,
  text,
  secureTextEntry,
  maxLength,
  showEye,
  eyeIcon,
  hideClearButton,
  onPressEye,
  onChange,
  onReturnPress,
  returnKeyType,
  multiline,
  numberOfLines,
  countryCode,
  countryCodePicker,
  onPressCountryCode,
  defaultValue,
  editable = true,
  disableEyeTouch,
  autoCapitalize = "sentences",
  isOptional = false, // default Compulsory
  bottomSpacing = scale(5),
  autoCorrect = false,
  textContentType = "none",
}) {
  const refInput = React.useRef();
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isEditing, setEditing] = useState(false);
  const [, setRefresh] = useState();

  var textPlaceholder = placeholder
    ? placeholder
    : "Enter " + label.toLowerCase();
  var showClearButton = false;

  function onPressEye() {
    if (disableEyeTouch) {
      return;
    }
    setIsSecure(!isSecure);
  }

  function onEndEditing() {
    setEditing(false);
    if (onReturnPress) {
      onReturnPress();
    }
  }

  if (
    hideClearButton == null &&
    !isStringNull(text) &&
    Platform.OS == PLATFORM_MOBILE.ANDROID &&
    isEditing
  ) {
    showClearButton = true;
  }

  return (
    <View style={{ flex: 1, marginBottom: bottomSpacing }}>
      {label && (
        <AppRegularText
          style={styles.labelStyle(isEditing, text)}
          numberOfLines={numberOfLines}
        >
          {label + (isOptional ? "" : "*")}
        </AppRegularText>
      )}
      <View style={{ ...styles.inputContainer(isEditing), ...viewStyle }}>
        {countryCodePicker == true ? (
          <TouchableOpacity
            activeOpacity={APP.ACTIVE_OPACITY}
            onPress={editable ? onPressCountryCode : null}
            style={styles.countryCodeContainer}
          >
            <View style={styles.countryCodeBox}>
              <Text style={styles.countryCode}>{countryCode}</Text>
              <VectorIcon.Ionicons
                name={ICON_NAME.downArrow}
                color={COLORS.colorBlack}
                size={scale(14)}
              />
            </View>
            <View style={styles.divider} />
          </TouchableOpacity>
        ) : null}
        <TextInput
          ref={refInput}
          style={[
            showEye
              ? styles.inputWithEye(editable)
              : styles.inputWithoutEye(hideClearButton, editable),
            textInputStyle,
          ]}
          onFocus={
            editable
              ? () => {
                  setEditing(true);
                }
              : null
          }
          autoCapitalize={autoCapitalize}
          value={text}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          placeholder={showInlinePlaceholder ? textPlaceholder : ""}
          placeholderTextColor={COLORS.colorMidGrayA5}
          clearButtonMode={hideClearButton ? null : "while-editing"}
          onChangeText={onChange}
          returnKeyType={returnKeyType}
          onSubmitEditing={multiline ? null : Keyboard.dismiss}
          onEndEditing={onEndEditing}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          defaultValue={defaultValue}
          editable={editable}
          autoCorrect={autoCorrect}
          textContentType={textContentType}
          selectionColor={COLORS.colorBlack}
        />

        <View style={styles.clearBtnContainer}>
          {showClearButton ? (
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => {
                refInput.current.clear();
                onChange("");
              }}
            >
              <View style={styles.clearBtnImageContainer}>
                <VectorIcon.AntDesign
                  name={ICON_NAME.close}
                  color={COLORS.colorWhite}
                  size={scale(8)}
                />
              </View>
            </TouchableOpacity>
          ) : null}
          {showEye ? (
            <TouchableOpacity
              activeOpacity={disableEyeTouch ? 1 : APP.ACTIVE_OPACITY}
              style={styles.eyeIconContainer}
              onPress={disableEyeTouch ? null : onPressEye}
            >
              {eyeIcon ? (
                <Image style={styles.eyeIconStyle} source={eyeIcon} />
              ) : isSecure ? (
                <ImgPasswordShow
                  style={styles.eyeIconStyle}
                  height={22}
                  width={22}
                />
              ) : (
                <ImgPasswordHide
                  style={styles.eyeIconStyle}
                  height={22}
                  width={22}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainFieldContainer: {
    flex: 1,
    width: "100%",
    height: APP.TEXT_FIELD_LABEL_WITH_HEIGHT,
    alignSelf: "center",
  },
  inputContainer: (isEditing) => ({
    height: APP.TEXT_FIELD_HEIGHT,
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    borderColor: isEditing ? COLORS.colorBlack : COLORS.colorLightestGrayE0,
    borderWidth: APP.BORDER_WIDTH,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    backgroundColor: COLORS.colorWhite,
    overflow: "hidden",
  }),
  labelStyle: (IsEditing, text) => ({
    fontSize: normalizeText(APP.DEFAULT_TEXT_INPUT_LABEL_SIZE),
    color: IsEditing
      ? COLORS.colorBlack
      : !isStringNull(text)
      ? COLORS.colorGray6C
      : COLORS.colorGray6C,
    marginTop: APP.DIST_BETWEEN_HEADER_CONTENT,
    marginBottom: scale(5),
  }),
  inputWithEye: (editable) => ({
    height: "100%",
    flex: 1,
    padding: 0,
    borderRadius: 10,
    marginLeft: scale(8),
    marginRight: scale(40),
    fontFamily: FONTS.AppRegularFont,
    fontSize: normalizeText(12),
    color: editable ? COLORS.colorBlack : COLORS.colorMidGrayA5,
  }),
  inputWithoutEye: (hideClearButton, editable) => ({
    height: "100%",
    flex: 1,
    padding: 0,
    borderRadius: scale(10),
    marginLeft: scale(10),
    marginRight:
      Platform.OS == PLATFORM_MOBILE.ANDROID && !hideClearButton
        ? scale(30)
        : scale(10),
    fontFamily: FONTS.AppRegularFont,
    fontSize: normalizeText(APP.DEFAULT_INPUT_FONT_SIZE),
    color: editable ? COLORS.colorBlack : COLORS.colorMidGrayA5,
    marginTop: Platform.OS == PLATFORM_MOBILE.IOS ? 0 : 0,
  }),
  eyeIconContainer: {
    width: scale(20),
    height: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIconStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: "contain",
  },
  clearBtnContainer: {
    right: scale(8),
    alignSelf: "center",
    justifyContent: "center",
  },
  clearBtnImageContainer: {
    padding: scale(3),
    backgroundColor: COLORS.colorIOSGrayD3,
    borderRadius: scale(10),
  },
  countryCodeContainer: {
    height: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "baseline",
    paddingHorizontal: 10,
  },
  countryCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  countryCode: {
    fontFamily: FONTS.WorkSansMedium,
    fontSize: normalizeText(APP.DEFAULT_INPUT_FONT_SIZE),
    color: COLORS.colorBlack,
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: COLORS.colorGray99,
    position: "absolute",
    right: 0,
  },
});
