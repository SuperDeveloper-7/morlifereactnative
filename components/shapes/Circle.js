import * as React from 'react';
import { View } from 'react-native';
import Proptypes from 'prop-types';

const Circle = ({ style, size, color, children }) => (
  <View
    style={[
      {
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: size / 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      style,
    ]}
  >
    {children}
  </View>
);

Circle.defaultProps = {
  children: null,
};
Circle.propTypes = {
  size: Proptypes.number.isRequired,
  color: Proptypes.string.isRequired,
  children: Proptypes.node,
};

export default Circle;
