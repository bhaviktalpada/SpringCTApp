import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

//Hooks
import { useDispatch, useSelector } from "react-redux";

import LocalizeText from "../../utils/text-localize";
import BaseContainer from "../base-container";
import MainHeader from "../../components/main-header";
import { TRAIL_URLS, getRequest } from "../../services";
import ShowToast from "../../components/custom-toast";
import { toastTypes } from "../../utils/app-enum";
import { APP } from "../../utils/constants";
import styles from "./styles";
import AppBoldText from "../../components/app-bold-text";
import COLORS from "../../utils/colors";

export default function DashboardScreen({ navigation }) {
  const { screenTitle, alerts, noData } = LocalizeText;
  const dispatch = useDispatch();
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);

  const [isPullLoading, setPullLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  function getAllPosts(page) {
    if (netConnected) {
      setListLoading(true);
      const api = `${TRAIL_URLS.rootPost}`;

      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log(" Get Posts; ==>", JSON.stringify(response));
          }
          const messages = response;
          setPostList(messages);
          setListLoading(false);
        })
        .catch((e) => {
          console.log("error in fetching categories list:", e);
          setListLoading(false);
          setPullLoading(false);
        });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  const handleItemPress = (itemId) => {
    if (netConnected) {
      const api = `${TRAIL_URLS.rootPost}/${itemId}`;
      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log(" Get Posts; ==>", JSON.stringify(response));
          }
          setSelectedItemId(response);
        })
        .catch((e) => {
          console.log("error in fetching categories list:", e);
        });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  };

  const heavyComputation = (item) => {
    // Simulating heavy computation with a setTimeout
    const startTime = Date.now();
    setTimeout(() => {
      const endTime = Date.now();
      console.log(
        `Heavy computation time for item ${item.id}: ${endTime - startTime}ms`
      );
    }, 1000); // Adjust timeout duration as needed

    // Return computed details
    return `Computed details for item ${item.id}`;
  };

  const ListItem = ({ item, onPress }) => {
    const memoizedOnPress = useCallback(
      () => onPress(item.id),
      [item.id, onPress]
    );

    const { userId = "", id = "", title = "", body = "" } = item;

    return (
      <TouchableOpacity onPress={memoizedOnPress}>
        <View style={styles.contentView}>
          <View style={styles.nameRowViewStyle}>
            <AppBoldText
              sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
              numberOfLines={0}
              color={COLORS.colorGray6C}
            >
              {`${id}. ${title}`}
            </AppBoldText>
          </View>
          <Text>{useMemo(() => heavyComputation(item), [item])}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader leftTitle={screenTitle.dashboard} />

      <FlatList
        keyExtractor={(_, index) => String(index)}
        style={styles.flatListStyle}
        data={postList}
        renderItem={({ item }) => (
          <ListItem item={item} onPress={handleItemPress} />
        )}
      />
      {selectedItemId && (
        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
          <Text>{`Details for item ID ${selectedItemId.id}:`}</Text>

          <View style={styles.contentView}>
            <View style={styles.nameRowViewStyle}>
              <AppBoldText
                sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
                numberOfLines={0}
                color={COLORS.colorGray6C}
              >
                {`${selectedItemId.id}. ${selectedItemId.title}`}
              </AppBoldText>
            </View>
            <View style={styles.nameRowViewStyle}>
              <AppBoldText
                sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
                numberOfLines={0}
                color={COLORS.colorYellowE1}
              >
                {`${selectedItemId.body}`}
              </AppBoldText>
            </View>
          </View>
        </View>
      )}
    </BaseContainer>
  );
}
