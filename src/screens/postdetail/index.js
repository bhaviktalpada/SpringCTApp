import React, {useEffect, useState} from 'react';


//Hooks
import {useDispatch} from 'react-redux';

import LocalizeText from '../../utils/text-localize';
import BaseContainer from '../base-container';
import MainHeader from '../../components/main-header';


export default function PostDetailScreen({navigation}) {
  const {screenTitle} = LocalizeText;
  const dispatch = useDispatch();
  
  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={false}>
      <MainHeader
        leftTitle={screenTitle.postDetail}
        leftIconName={true}
        navigation={navigation}
      />
    </BaseContainer>
  );
}
