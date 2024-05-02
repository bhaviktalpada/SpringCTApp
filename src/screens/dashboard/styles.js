import { StyleSheet } from "react-native";

import { APP } from "../../utils/constants";
import COLORS from "../../utils/colors";
const { scale } = require("react-native-size-matters");

export default styles = StyleSheet.create({
  flatListStyle: {
    margin: scale(10),
  },
  contentView: {
    backgroundColor: COLORS.colorWhite,
    borderColor: COLORS.colorLightestGrayE0,
    borderWidth: scale(APP.BORDER_WIDTH),
    borderRadius: scale(APP.TEXT_FIELD_BORDER_RADIUS),
    padding: scale(10),
    marginTop: 10
  },
  mainContainer: {},
  nameRowViewStyle: {
    justifyContent: "space-between",
  },
});
