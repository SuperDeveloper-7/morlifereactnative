import React from 'react';
import Proptypes from 'prop-types';
import Header from './Header';

export default function DayHeader({ style, date }) {
  const formatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en', formatOptions);

  return <Header style={style} text={formattedDate} />;
}

DayHeader.propTypes = { date: Proptypes.instanceOf(Date).isRequired };
