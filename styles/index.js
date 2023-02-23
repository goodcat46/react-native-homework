import colors from './colors';

const getBorderRadius = radius => {
  return {
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
  };
};

export { colors, getBorderRadius };
