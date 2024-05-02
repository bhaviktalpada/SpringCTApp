import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import { scale } from "react-native-size-matters";

import LocalizeText from "../../utils/text-localize";
import BaseContainer from "../base-container";
import MainHeader from "../../components/main-header";
import { APP } from "../../utils/constants";
import styles from "./styles";
import AppBoldText from "../../components/app-bold-text";
import COLORS from "../../utils/colors";
import AppCustomButton from "../../components/app-custom-button";
import { SCREEN } from "../../utils/screen-name";
import AppRegularText from "../../components/app-regular-text/app-regular-text";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ImgCloseIcon } from "../../utils/svg-images";
import { ICON_NAME } from "../../components/custom-vector-icon";
import {
  STORE_KEY,
  asyncStorageGet,
  asyncStorageRemove,
} from "../../utils/async-storage";
import { globalNavigate } from "../../utils/helper-navigations";

export default function DashboardScreen({ navigation }) {
  const { screenTitle, alerts, noData } = LocalizeText;
  const [isPullLoading, setPullLoading] = useState(false);

  const savedEmployee = useSelector((v) => v.stateReducer.savedEmployee);

  const [allEmployee, setAllEmployee] = useState(false);
  const [refresh, setRefresh] = useState();
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      console.log("isFocused", isFocused);
      if (isFocused) {
        setRefresh(Math.random());
        fetchAllData();
      }
    }, [isFocused])
  );

  async function fetchAllData() {
    const allEmp = await asyncStorageGet(STORE_KEY.STORE_EMPLOYEES_INFO);
    const restoredArray = JSON.parse(allEmp);
    console.log("allEmp", restoredArray);
    setAllEmployee(restoredArray);
  }

  const handleItemPress = (itemId) => {};

  async function logoutButtonPress() {
    await asyncStorageRemove(STORE_KEY.LOGIN_TOKEN);
    await asyncStorageRemove(STORE_KEY.STORE_EMPLOYEES_INFO);

    globalNavigate(SCREEN.LoginScreen);
  }
  function addEmployeeHandler() {
    navigation.navigate(SCREEN.AddEmployeeScreen);
  }

  const ListItem = ({ item, onPress }) => {
    const memoizedOnPress = useCallback(
      () => onPress(item.id),
      [item.id, onPress]
    );

    const {
      firstName = "",
      lastName = "",
      age = "",
      addressLine1 = "",
      city = "",
    } = item;

    return (
      <TouchableOpacity onPress={memoizedOnPress}>
        <View style={styles.contentView}>
          <View style={styles.nameRowViewStyle}>
            <AppBoldText
              sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
              numberOfLines={0}
              color={COLORS.colorGray6C}
            >
              {`${firstName} ${lastName} - (${age}) Age`}
            </AppBoldText>
            <AppRegularText
              sizeFont={APP.APP_NOTIFICATION_COUNT_FONT_SIZE}
              numberOfLines={0}
              color={COLORS.colorGray6C}
            >
              {`${addressLine1}, ${city}`}
            </AppRegularText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  function onRefresh() {
    setPullLoading(true);
    setTimeout(() => {
      setPullLoading(false);
    }, 300);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader leftTitle={screenTitle.dashboard} />

      <FlatList
        keyExtractor={(_, index) => String(index)}
        style={styles.flatListStyle}
        refreshing={isPullLoading}
        onRefresh={onRefresh}
        data={allEmployee}
        renderItem={({ item, i }) => (
          <ListItem key={i} item={item} onPress={handleItemPress} />
        )}
      />

      <AppCustomButton
        onPress={addEmployeeHandler}
        title={"Add Employee"}
        mainContainerStyle={{
          marginTop: scale(10),
          marginHorizontal: scale(20),
        }}
      />
      <AppCustomButton
        onPress={logoutButtonPress}
        title={"Logout"}
        viewStyle={{ backgroundColor: "red", marginBottom: 10 }}
        mainContainerStyle={{
          marginTop: scale(10),
          marginHorizontal: scale(20),
        }}
      />
    </BaseContainer>
  );
}
