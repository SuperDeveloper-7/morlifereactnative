import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Animated } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Proptypes from 'prop-types';
import { styles } from '../styles/components/TopHeaderTransparent';
import NavigationBack from './NavigationBack';
import TopHeader from '../navigation/TopHeader';
import { BANNER_H, TOPNAVI_H } from '../constants/HeaderSize';
import Colors from '../constants/Colors';

const TopHeaderTransparent = (props) => {
  const safeArea = useSafeArea();

  const { scrollA, bgColor, navigation, categoryName, mainNavigation } = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);
  const [showDrop, setShowDrop] = useState(false);

  const marginBottom = isFloating ? -TOPNAVI_H - safeArea.top : 0;
  const paddingTop = safeArea.top + 20;
  const height = TOPNAVI_H + safeArea.top;
  const backgroundColor = isTransparent ? Colors.opacityHeader : bgColor;
  const shadowOpacity = isTransparent ? 0 : 0.5;
  const elevation = isTransparent ? 0.01 : 5;

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener((position) => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      if (isTransparent !== position.value < topNaviOffset) setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  const tagElement = () => {
    return (
      <View style={[styles.tag, { backgroundColor: bgColor }]}>
        <Text style={styles.texTag}>{categoryName}</Text>
      </View>
    );
  };

  const handleCallback = (showDropChild) => {
    setShowDrop(showDropChild);
  };

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="black"
        translucent={true}
      />

      <View
        style={[
          styles.container,
          {
            marginBottom,
            paddingTop,
            height,
            backgroundColor: showDrop ? Colors.linen : backgroundColor,
            shadowOpacity,
            elevation,
          },
        ]}
      >
        <TopHeader
          style={([styles.TopHeaderStyle], { flex: 1 })}
          showSearch={true}
          accent={false}
          navigation={navigation}
          mainNavigation={mainNavigation}
          bgColor={isTransparent ? Colors.transparent : bgColor}
          leftElement={
            <NavigationBack
              iconColor={Colors.white}
              bgColor={`${Colors.lightCharcoal}99`}
              onPress={() => navigation.goBack()}
            />
          }
          placeholderElement={tagElement()}
          parentCallback={handleCallback}
        />
      </View>
    </>
  );
};

TopHeaderTransparent.propTypes = {
  scrollA: Proptypes.instanceOf(Animated.Value).isRequired,
  bgColor: Proptypes.string.isRequired,
  categoryName: Proptypes.string.isRequired,
};

export default TopHeaderTransparent;
