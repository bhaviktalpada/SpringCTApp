import React, { useEffect, useState } from "react";
import { View } from "react-native";
//Hooks
import { scale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import BaseContainer from "../base-container";
import MainHeader from "../../components/main-header";
import AppCustomButton from "../../components/app-custom-button";
import CustomTextField from "../../components/text-input";
import styles from "./styles";
import AppScrollView from "../../components/app-scrollview";
import * as types from "../../redux/actions/action-list";
import { isStringNull } from "../../utils/helper-function";
import ShowToast from "../../components/custom-toast";
import { toastTypes } from "../../utils/app-enum";
import { STORE_KEY, asyncStorageSave } from "../../utils/async-storage";

export default function AddEmployeeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [userFName, setUserFName] = useState("");
  const [userLName, setUserLName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userAddressLine1, setAddressLine1] = useState("");
  const [userCity, setCity] = useState("");
  const inset = useSafeAreaInsets();
  const savedEmployee = useSelector((v) => v.stateReducer.savedEmployee);

  function onTapSubmitButton() {
    if (isStringNull(userFName)) {
      ShowToast(toastTypes.error, "Please enter first name");
      return;
    } else if (isStringNull(userLName)) {
      ShowToast(toastTypes.error, "Please enter last name");
      return;
    } else if (isStringNull(userAge)) {
      ShowToast(toastTypes.error, "Please enter age");
      return;
    } else if (isStringNull(userAddressLine1)) {
      ShowToast(toastTypes.error, "Please enter address line 1");
      return;
    } else if (isStringNull(userCity)) {
      ShowToast(toastTypes.error, "Please enter city");
      return;
    }

    let employeeRec = {
      firstName: userFName,
      lastName: userLName,
      age: userAge,
      addressLine1: userAddressLine1,
      city: userCity,
    };
    let tempArray = savedEmployee ? savedEmployee : [];
    tempArray.push(employeeRec);
    dispatch({ type: types.EMPLOYEES_INFO, data: tempArray });

    const stringifiedArray = JSON.stringify(tempArray)
    storeLatestData(stringifiedArray)

    setTimeout(() => {
      navigation.goBack();
    }, 200);
  }

  async function storeLatestData(tempArray) {
    await asyncStorageSave(STORE_KEY.STORE_EMPLOYEES_INFO, tempArray);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={false}>
      <MainHeader
        leftTitle={"Add Employee"}
        leftIconName={true}
        navigation={navigation}
      />
      <AppScrollView viewStyle={{ marginBottom: inset.bottom }}>
        <View style={styles.mainContainer}>
          <CustomTextField
            label={"First Name"}
            text={userFName}
            onChange={(v) => setUserFName(v)}
            autoCorrect={true}
            autoCapitalize="none"
          />

          <CustomTextField
            label={"Last Name"}
            text={userLName}
            onChange={(v) => setUserLName(v)}
            autoCorrect={true}
            autoCapitalize="none"
          />

          <CustomTextField
            label={"Age"}
            text={userAge}
            maxLength={2}
            onChange={(v) => setUserAge(v)}
            autoCorrect={true}
            keyboardType={"number-pad"}
            autoCapitalize="none"
          />

          <CustomTextField
            label={"Address Line1"}
            text={userAddressLine1}
            onChange={(v) => setAddressLine1(v)}
            autoCorrect={true}
            autoCapitalize="none"
          />

          <CustomTextField
            label={"City"}
            text={userCity}
            onChange={(v) => setCity(v)}
            autoCorrect={true}
            autoCapitalize="none"
          />

          <AppCustomButton
            onPress={onTapSubmitButton}
            title={"Submit"}
            mainContainerStyle={{ marginTop: scale(10) }}
          />
        </View>
      </AppScrollView>
    </BaseContainer>
  );
}
