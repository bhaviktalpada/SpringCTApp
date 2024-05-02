import React, { useState } from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BaseContainer from "../../base-container";
import AppScrollView from "../../../components/app-scrollview";
import CustomTextField from "../../../components/text-input";
import styles from "./styles";
import { AuthHeader } from "../../../components/auth-header";
import AppCustomButton from "../../../components/app-custom-button";
import ShowToast from "../../../components/custom-toast";
import { toastTypes } from "../../../utils/app-enum";
import {
  isStringNull,
  validateEmailString,
} from "../../../utils/helper-function";
import { TRAIL_URLS, postRequestWithHeader } from "../../../services";
import { APP } from "../../../utils/constants";

import * as types from "../../../redux/actions/action-list";
import { NavigateTo } from "../../../utils/helper-navigations";
import { SCREEN } from "../../../utils/screen-name";
import { STORE_KEY, asyncStorageSave } from "../../../utils/async-storage";

export default function LoginScreen({ navigation }) {
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const netConnected = useSelector((v) => v?.netInfoReducer?.isConnected);

  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();

  function loginPressHandler() {
    if (isStringNull(userEmail)) {
      ShowToast(toastTypes.error, "Please enter email address");
      return;
    } else if (!validateEmailString(userEmail)) {
      ShowToast(toastTypes.error, "Please enter valid email address");
      return;
    } else if (isStringNull(password)) {
      ShowToast(toastTypes.error, "Please enter password");
      return;
    } else {
      if (netConnected) {
        let apiURL = TRAIL_URLS.login;
        let params = {
          email: userEmail,
          password: password,
        };
        setLoading(true);
        postRequestWithHeader(apiURL, params)
          .then((response) => {
            setLoading(false);
            if (APP.SHOW_LOG) {
              console.log(" Get Login Res; ==>", JSON.stringify(response));
            }
            handleLogin(response);
          })
          .catch((e) => {
            console.log("error in fetching categories list:", e);
          });
      } else {
        ShowToast(toastTypes.error, "Internet is not connected");
      }
    }
  }

  async function handleLogin(response) {
    const userToken = response.token;
    dispatch({ type: types.LOGIN_TOKEN, data: userToken });
    await asyncStorageSave(STORE_KEY.LOGIN_TOKEN, userToken);
    NavigateTo(SCREEN.DashboardScreen);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <AppScrollView
        viewStyle={{ marginTop: inset.top, marginBottom: inset.bottom }}
      >
        <AuthHeader
          navigation={navigation}
          title={"Login"}
          isUnderBarOption={true}
        />
        <View style={styles.mainContainer}>
          <CustomTextField
            label={"Email"}
            text={userEmail}
            onChange={(v) => setEmail(v)}
            autoCorrect={true}
            autoCapitalize="none"
            keyboardType={"email-address"}
            textContentType={"username"}
          />
          <CustomTextField
            label={"Password"}
            text={password}
            onChange={(v) => setPassword(v)}
            autoCapitalize="none"
            hideClearButton={true}
            secureTextEntry={true}
            showEye={true}
            autoCorrect={true}
            textContentType={"password"}
          />

          <AppCustomButton
            isLoading={isLoading}
            onPress={loginPressHandler}
            title={"Login"}
            disabled={isLoading}
            mainContainerStyle={{ marginTop: scale(10) }}
          />
        </View>
      </AppScrollView>
    </BaseContainer>
  );
}
