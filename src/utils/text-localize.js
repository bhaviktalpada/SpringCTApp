import LocalizedStrings from "react-native-localization";

const LocalizeText = new LocalizedStrings({
  en: {
    screenTitle: {
      dashboard: "Dashboard",
      postDetail: "Post Detail",
    },
    //common messages or alerts
    alerts: {
      internetConnection:
        "Please check your internet connection or try again later",
    },
  },
});

export default LocalizeText;
