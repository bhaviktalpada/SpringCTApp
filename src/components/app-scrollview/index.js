import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Constant
import { PLATFORM_MOBILE } from '../../utils/app-enum';

function AppScrollView({
  children,
  viewStyle,
  refreshControl,
  scrollEventThrottle,
  onScroll,
  enableScroll = true,
  keyboardShouldPersistTaps = 'handled',
  isLoading = false
}) {
  if (Platform.OS == PLATFORM_MOBILE.ANDROID) {
    return (
      <ScrollView
        scrollEnabled={enableScroll}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        refreshControl={refreshControl}
        style={viewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        pointerEvents={isLoading ? 'none' : 'auto'}
        >
        {children}
      </ScrollView>
    );
  } else {
    return (
      <KeyboardAwareScrollView
        scrollEnabled={enableScroll}
        //onScroll={onScroll}
        //scrollEventThrottle={scrollEventThrottle}
        refreshControl={refreshControl}
        style={viewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        // enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
}

export default AppScrollView;
