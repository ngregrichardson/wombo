import React from "react";
import { Animated, TouchableOpacity } from "react-native";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity
);

/**
 * Styled confirmation button
 * @param onPress {function} - A function to call when the button is pressed
 * @param label {string} - Text to display on the button
 * @param style {Object|Array<Object>} - A custom style object to merge with the default styles
 * @param rest {*} - Any additional props from https://reactnative.dev/docs/touchableopacity
 * @returns {JSX.Element}
 * @constructor
 */
const TouchableScale = ({ onPress, children, style, ...rest }) => {
  // Scale animation
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.93];
  const scaleAnimation = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      style={[
        ...(style ? (Array.isArray(style) ? style : [style]) : [null]),
        { transform: [{ scale: scaleAnimation }] },
      ]}
      activeOpacity={1}
      uppercase={false}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...rest}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default TouchableScale;
