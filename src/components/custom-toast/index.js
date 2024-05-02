import Toast from 'react-native-toast-message';

const ShowToast = (
  type,
  text,
  position,
  bottomOffset = 60,
  visibilityTime = 2500,
) => {
  return Toast.show({
    type: type,
    text1: text,
    position: position ? position : 'bottom',
    visibilityTime: visibilityTime,
    autoHide: true,
    bottomOffset: bottomOffset ? bottomOffset : 60,
  });
};

export default ShowToast;
