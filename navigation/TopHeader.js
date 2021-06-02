import React, { useState } from 'react';

import {
  Text,
  View,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';

import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import Proptypes from 'prop-types';

import Colors from '../constants/Colors';
import Search from '../api/search';
import { styles, CIRCLE_SIZE } from '../styles/navigation/TopHeader';
import MorIcon from '../components/shapes/MorIcon';
import Circle from '../components/shapes/Circle';

const logo = require('../assets/images/mor_logo.png');
const logoAccent = require('../assets/images/mor_logo_inverse.png');

function RepeatTypeText(repeatType) {
  if (repeatType === 'repeat_day') {
    return 'Daily';
  }
  if (repeatType === 'repeat_weekly') {
    return 'Weekly';
  }
  if (repeatType === 'custom_week') {
    return 'every Week';
  }
  if (repeatType === 'custom_month') {
    return 'every Month';
  }
  return repeatType;
}

const PublicRoutineSearchItem = ({ searchItem, onPress }) =>
  searchItem.type !== 'category' && (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.elipse}>
        <View style={styles.itemView} />
        <TouchableOpacity>
          <Circle size={CIRCLE_SIZE} color={searchItem.colors.dark} onPress={onPress}>
            <MorIcon size={26} name={searchItem.icon_name} color={Colors.white} />
          </Circle>
        </TouchableOpacity>
        <View style={styles.rightView}>
          <Text style={styles.nameText}>{searchItem.name}</Text>
          <Text style={styles.nameSubText}>{RepeatTypeText(searchItem.repeat_type)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

PublicRoutineSearchItem.propTypes = {
  searchItem: Proptypes.shape({
    name: Proptypes.string.isRequired,
    type: Proptypes.string.isRequired,
    colors: Proptypes.shape(),
  }).isRequired,
  onPress: Proptypes.func.isRequired,
};

const DropDown = ({ searchResults, onSelectItem }) => (
  <View style={styles.dropDownWindow}>
    {searchResults.length === 0 ? (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No Results</Text>
      </View>
    ) : (
      searchResults
        .slice(0, 3)
        .map((item) => (
          <PublicRoutineSearchItem
            onPress={() => onSelectItem(item)}
            key={item.id}
            searchItem={item}
          />
        ))
    )}
  </View>
);
DropDown.propTypes = {
  searchResults: Proptypes.arrayOf(Proptypes.object).isRequired,
  onSelectItem: Proptypes.func.isRequired,
};

const TopHeader = ({
  navigation,
  style,
  showSearch,
  accent,
  bgColor,
  leftElement,
  placeholderElement,
  parentCallback,
  mainNavigation,
}) => {
  const [showDrop, setShowDrop] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPlaceholderElement, setShowPlaceholderElement] = useState(true);
  const publicRoutines = useSelector((state) => state.routines.publicRoutines);

  const imgSrc = accent ? logoAccent : logo;
  const searchBarInputRef = React.useRef('searchBarInput');

  const handleSearch = (key) => {
    setSearchKey(key);
    const searchDebounced = _.debounce(async () => {
      const results = await Search(key);
      setSearchResults(results);
    }, 250);
    searchDebounced();
  };
  const handleSelectRoutine = (item) => {
    searchBarInputRef.current.blur();
    if (item.type === 'routine') {
      mainNavigation.push('RoutineAdder', { selectedRoutine: publicRoutines[item.id] });
    } else {
      navigation.push('Category', { categoryId: item.category_id });
    }
  };

  React.useEffect(() => {
    handleSearch('');
  }, []);
  const cancelSearch = () => {
    setShowDrop(false);
    Keyboard.dismiss();
    setSearchKey('');
  };

  React.useEffect(() => {
    if (parentCallback) parentCallback(showDrop);
  }, [showDrop]);
  return (
    <>
      <View
        style={[style, styles.container, { backgroundColor: showDrop ? Colors.linen : bgColor }]}
      >
        {!showDrop &&
          (leftElement || <Image source={imgSrc} style={styles.Image} resizeMode="contain" />)}
        {showSearch && (
          <>
            <View style={styles.searchSection}>
              <Ionicons style={styles.Ionicon} size={20} name="ios-search" color={Colors.mist} />
              {placeholderElement && showPlaceholderElement && placeholderElement}
              <TextInput
                ref={searchBarInputRef}
                value={searchKey}
                type="text"
                style={styles.input}
                placeholder={placeholderElement ? '' : 'Search'}
                onChangeText={handleSearch}
                underlineColorAndroid="transparent"
                onFocus={() => {
                  setShowPlaceholderElement(false);
                  setShowDrop(true);
                  handleSearch('');
                }}
                onBlur={() => {
                  setShowDrop(false);
                  setSearchKey('');
                }}
              />
            </View>
            {showDrop && (
              <TouchableOpacity onPress={cancelSearch}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      {showDrop && <DropDown searchResults={searchResults} onSelectItem={handleSelectRoutine} />}
    </>
  );
};
TopHeader.defaultProps = {
  bgColor: Colors.linen,
  showSearch: true,
  leftElement: undefined,
  placeholderElement: undefined,
  parentCallback: undefined,
  mainNavigation: undefined,
};

TopHeader.propTypes = {
  showSearch: Proptypes.bool,
  accent: Proptypes.bool.isRequired,
  bgColor: Proptypes.string,
  leftElement: Proptypes.element,
  placeholderElement: Proptypes.element,
  parentCallback: Proptypes.func,
  mainNavigation: Proptypes.object,
};

export default TopHeader;
