import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { APP } from "../../utils/constants";
import COLORS from "../../utils/colors";
import { ImgBack } from "../../utils/svg-images";
import ImgSVG from "../image-svg";
import AppBoldText from "../app-bold-text";

export const AuthHeader = ({
    title,
    titleCenter = true,
    numberOfLines,
    isBackOption = false,
    colorIcon = COLORS.colorBlack,
    navigation,
    isUnderBarOption = false,
    backCallBack = () => { },
}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                {isBackOption && <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            backCallBack();
                            navigation.goBack();
                        }}
                    >
                        <ImgSVG icon={ImgBack} width={APP.BACK_ICON_SIZE} height={APP.BACK_ICON_SIZE}/>
                    </TouchableOpacity>

                </View>}
                <AppBoldText style={titleCenter == true ? styles.headerText : styles.leftHeaderText} numberOfLines={numberOfLines}>{title}</AppBoldText>
                {isUnderBarOption == true ? <>
                    <View style={styles.horizontalTransparentLine}></View>
                    <View style={styles.horizontalLine}></View>
                </> : null}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: scale(APP.HEADER_HEIGHT),
        width: '100%',
    },
    subContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    iconContainer: {
        position: 'absolute',
        height: scale(24),
        width: scale(24),
        paddingLeft: scale(15),
        width: '10%',
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'center',
        marginLeft: '5%',
        marginRight: '5%',
    },
    leftHeaderText: {
        textAlign: 'left',
        marginLeft: '5%',
        marginRight: '5%',
    },
    horizontalTransparentLine: {
        width: scale(50),
        height: scale(8),
        backgroundColor: COLORS.colorTransparent,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    horizontalLine: {
        width: scale(50),
        height: scale(3),
        backgroundColor: COLORS.colorBlack,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
