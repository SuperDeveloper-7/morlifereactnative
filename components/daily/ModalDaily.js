import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Proptype from 'prop-types';
import { useSelector } from 'react-redux';

import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/components/daily/ModalDaily';
import Colors from '../../constants/Colors';
import Circle from '../shapes/Circle';
import MorIcon from '../shapes/MorIcon';

import TextStyle from '../../constants/TextStyle';
import DailyTab from './DailyTab';
import CommunityTab from './CommunityTab';
const { width } = Dimensions.get('screen');

const ModalDaily = forwardRef((props, ref) => {
  const modalizeRef = useRef(null);
  const routine = props.routine;
  const categories = useSelector((state) => state.routines.categories);
  const categorySelected = categories[routine?.category_id || undefined];
  const [selectedTab, setSelectedTab] = useState(0);
  useImperativeHandle(ref, () => ({
    onOpen() {
      modalizeRef.current?.open();
    },
  }));
  const renderFloatingComponent = () => (
    <View
      style={[
        styles.tabContainer,
        {
          width,
        },
      ]}
    >
      <TouchableOpacity onPress={() => setSelectedTab(0)} style={{ flex: 1, alignItems: 'center' }}>
        <MorIcon
          name={'dailys'}
          size={24}
          color={selectedTab === 0 ? Colors.charcoal : Colors.midGrey}
        />
        <Text
          style={[styles.textTab, { color: selectedTab === 0 ? Colors.charcoal : Colors.midGrey }]}
        >
          Daily's
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab(1)} style={{ flex: 1, alignItems: 'center' }}>
        <MorIcon
          name={'hand'}
          size={24}
          color={selectedTab !== 0 ? Colors.charcoal : Colors.midGrey}
        />
        <Text
          style={[styles.textTab, { color: selectedTab !== 0 ? Colors.charcoal : Colors.midGrey }]}
        >
          Community
        </Text>
      </TouchableOpacity>
    </View>
  );
  const renderCommunityHeader = () => {
    return (
      <View
        style={[
          styles.headerCommunityContainer,
          { backgroundColor: categorySelected?.colors?.dark },
        ]}
      >
        <TouchableOpacity
          style={[styles.navButtons, { justifyContent: 'flex-end' }]}
          onPress={() => modalizeRef.current?.close()}
        >
          <Circle size={36} color={categorySelected.colors.highContrast}>
            <Ionicons style={styles.arrowRight} size={20} name="ios-arrow-down" color="white" />
          </Circle>
        </TouchableOpacity>
        <View style={[styles.bottomHeaderCommunity]}>
          <Text style={styles.bigTitle}>{routine?.name || ''}</Text>
          <Text style={[styles.membersText]}>27 Total members</Text>
        </View>
      </View>
    );
  };

  const renderDailyHeader = () => {
    return (
      <View style={styles.headerDailyContainer}>
        <TouchableOpacity style={[styles.navButtons]} onPress={() => modalizeRef.current?.close()}>
          <Circle size={36} color={Colors.mist}>
            <Ionicons style={styles.arrowRight} size={20} name="ios-arrow-down" color="white" />
          </Circle>
        </TouchableOpacity>
        <View
          style={[
            styles.roundedContainer,
            { backgroundColor: categorySelected?.colors?.dark || Colors.morOrange },
          ]}
        >
          <Text style={[TextStyle.setupIntroText, { fontFamily: 'lato-bold' }]}>
            {routine?.name || ''}
          </Text>
          <Text style={[TextStyle.setupIntroText]}>Daily's For You</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>
    );
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalStyle={{ backgroundColor: Colors.linen }}
        HeaderComponent={selectedTab === 0 ? renderDailyHeader : renderCommunityHeader}
        FloatingComponent={renderFloatingComponent}
      >
        <View style={styles.container}>
          {selectedTab === 0 ? <DailyTab routine={routine} /> : <CommunityTab routine={routine} />}
        </View>
      </Modalize>
    </Portal>
  );
});

ModalDaily.defaultProps = {
  visible: false,
};
ModalDaily.propTypes = {
  visible: Proptype.bool,
};
export default ModalDaily;
