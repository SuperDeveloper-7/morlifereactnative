import React from 'react';
import { View, Text, Image } from 'react-native';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { styles } from '../../styles/components/daily/CommunityTab';
import Colors from '../../constants/Colors';

const image1 = require('../../assets/images/communitiesDummyUser/image-69.png');
const image2 = require('../../assets/images/communitiesDummyUser/Image71.png');
const image3 = require('../../assets/images/communitiesDummyUser/image-68.png');

const CommunityTab = ({ routine }) => {
  const categories = useSelector((state) => state.routines.categories);
  const categorySelected = categories[routine?.category_id || undefined];
  return (
    <View style={styles.container}>
      <View style={styles.transparentView}>
        <Text style={[styles.dateText, { color: categorySelected?.colors?.dark }]}>
          Today <Text style={styles.dateToday}>Wednesday, July 2</Text>{' '}
        </Text>
        <Text style={[styles.dateText, { color: Colors.charcoal }]}>
          3 people from the community are practicing yoga.
        </Text>
      </View>
      <View style={styles.communityUserSection}>
        <View style={styles.communityUserProfile}>
          <Image style={styles.communityUserImage} source={image1} />
          <Text style={styles.communityUserName}>Max</Text>
          <Text style={styles.communityUserId}>@max</Text>
        </View>
        <View style={styles.communityUserProfile}>
          <Image style={styles.communityUserImage} source={image2} />
          <Text style={styles.communityUserName}>Kyle</Text>
          <Text style={styles.communityUserId}>@kyle</Text>
        </View>
        <View style={styles.communityUserProfile}>
          <Image style={styles.communityUserImage} source={image3} />
          <Text style={styles.communityUserName}>Harvey</Text>
          <Text style={styles.communityUserId}>@harvey</Text>
        </View>
      </View>
      <View style={styles.transparentView}>
        <Text style={[styles.dateText, { color: Colors.charcoal }]}>
          Communities of the people you follow, doing some of the things you love. Coming soon.
        </Text>
      </View>
    </View>
  );
};

CommunityTab.defaultProps = {};
CommunityTab.propTypes = {
  routine: Proptypes.shape({
    name: Proptypes.string.isRequired,
    type: Proptypes.string.isRequired,
    category_id: Proptypes.string.isRequired,
    colors: Proptypes.shape(),
  }).isRequired,
};

export default CommunityTab;
