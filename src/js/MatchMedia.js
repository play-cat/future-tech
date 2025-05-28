import pxToRem from './utils/pxToRem';

const MathMedia = {
  mobile: window.matchMedia(`(width <= ${pxToRem(767.98)}rem)`),
};

export default MathMedia;
