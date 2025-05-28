import '../sass/main.scss/';
import Header from './Header';
import TabsCollection from './Tabs';
import VideoPlayerCollection from './VideoPlayer';
import ExpandableContentCollection from './ExpandableContent';
import headerMenuChangeActiveLink from './utils/headerMenuChangeActiveLink';
import InputMaskCollection from './InputMask';
import SelectCollections from './Select';
import defineScrollBarWidthCSSVar from './utils/defineScrollBarWidthCSSVar';

const changeActiveLink = headerMenuChangeActiveLink();
const header = new Header();
const tabs = new TabsCollection();
const videoplayer = new VideoPlayerCollection();
const expandableContent = new ExpandableContentCollection();
const InputMask = new InputMaskCollection();
const Select = new SelectCollections();
defineScrollBarWidthCSSVar();
