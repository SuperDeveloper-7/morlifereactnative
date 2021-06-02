import * as React from 'react';
import { Keyboard } from 'react-native';

export function setupResponsiveKeyboard() {
  const [visibleHeightDiff, setVisibleHeightDiff] = React.useState(0);

  const keyboardWillShow = (e) => {
    setVisibleHeightDiff(e.endCoordinates.height);
  };

  const keyboardWillHide = () => {
    setVisibleHeightDiff(0);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);

  return visibleHeightDiff;
}
