import Accordion, {
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionSection,
  AccordionDropdown,
  AccordionDraggable
} from 'views/components/accordion';
import AddMore from 'views/components/add-more';
import AdvancedRestaurantSelection from 'views/components/advanced-restaurant-selection';
import BannerCard from 'views/components/bannercard';
import {Button, ButtonGroup, ButtonNotification} from 'views/components/buttons';
import ButtonExpandible from 'views/components/button-expandible';
import ButtonMultiple from 'views/components/button-multiple';
import Calendar from 'views/components/calendar';
import CalendarButton from 'views/components/calendar-button';
import CalendarPicker from 'views/components/calendar-picker';
import Card from 'views/components/card';
import Checkbox from 'views/components/checkbox';
import CheckboxExpandable from 'views/components/checkbox-expandable';
import CheckboxGroup from 'views/components/checkbox-group';
import CheckboxList from 'views/components/checkbox-list';
import CheckboxPermission from 'views/components/checkbox-permission';
import CheckboxSection from 'views/components/checkbox-section';
import CheckedCard from 'views/components/checked-card';
import ChoosePhoto from 'views/components/choose-photo/choose-photo';
import RecentPhoto from 'views/components/choose-photo/recent-photo';
import NewPhoto from 'views/components/choose-photo/new-photo';
import DefaultPhotos from 'views/components/choose-photo/default-photos';
import ContentWidget, {widgets} from 'views/components/content-widget';
import CountTracker from 'views/components/count-tracker';
import DashboardCard from 'views/components/dashboardcard-list/dashboardcard';
import DashboardCardList from 'views/components/dashboardcard-list';
import DayOpenStatus from 'views/components/day-open-status';
import DayOpenStatusList from 'views/components/day-open-status-list';
import DraggableElement from 'views/components/draggable-element';
import DraggableWidgets, {DragWidgetItem} from 'views/components/draggable-widgets';
import Dropdown from 'views/components/dropdown';
import DropdownFooter from 'views/components/dropdown-footer';
import DropdownGroup from 'views/components/dropdown-group';
import DropdownList from 'views/components/dropdown-list';
import DropdownMenu from 'views/components/dropdown-menu';
import DropdownScroll from 'views/components/dropdown-scroll';
import DropdownSelector from 'views/components/dropdown-selector';
import DropdownTooltip from 'views/components/dropdown-tooltip';
import EditMainMenu from 'views/components/edit-main-menu';
import EditedBy from 'views/components/edited-by';
import ExpandibleMailBox from 'views/components/expandible-mail-box';
import FormBuilder from 'views/components/form-builder';
import {LoadFiltersModal, SaveFiltersModal} from 'views/components/advanced-restaurant-selection/filters-modal';
import Gallery from 'views/components/gallery';
import HorizontalList from 'views/components/horizontal-list';
import HoursPanel from 'views/components/hours-panel';
import HoursPanelList from 'views/components/hours-panel-list';
import Icon from 'views/components/icon';
import Icons from 'views/components/icons';
import InfiniteScroll from 'views/components/infinite-scroll';
import InputMultipleAuthors from 'views/components/input-multiple-authors';
import InputField from 'views/components/inputfield';
import Modal, {ModalHeader, ModalBody, ModalFooter} from 'views/components/modal';
import NextPrev from 'views/components/nextprev';
import NoContentCard from 'views/components/no-content';
import Notification from 'views/components/notification';
import NotificationBubble from 'views/components/notification-bubble';
import Pagination from 'views/components/pagination';
import Panel, {PanelContent, PanelHeader} from 'views/components/panel';
import PanelSectionOverview from 'views/components/panel-section-overview';
import PermissionComments from 'views/components/permission-comments';
import Preloader from 'views/components/preloader';
import ProgressBar from 'views/components/progress-bar';
import PublishBoard from 'views/components/publish-board';
import Question from 'views/components/question';
import Radio from 'views/components/radio';
import RadioList from 'views/components/radio-list';
import Rating from 'views/components/rating';
import ReadMore from 'views/components/read-more';
import ScrollArea from 'views/components/scroll-area';
import SectionCard, {SectionCardBody, SectionCardHeader, SectionCardFooter} from 'views/components/section-card';
import Select from 'views/components/select';
import SelectSearch from 'views/components/select-search';
import SidePreview from 'views/components/side-preview';
import SimpleRestaurantSelection from 'views/components/simple-restaurant-selection';
import Sortable from 'views/components/sortable';
import Status from 'views/components/status';
import SwitchButton from 'views/components/switch-button';
import Tag from 'views/components/tag';
import {TabArea} from 'views/components/tab-area';
import TabList from 'views/components/tab-list';
import Table from 'views/components/table';
import TableFilters from 'views/components/table-filters';
import TextEditor from 'views/components/text-editor';
import TimePassed from 'views/components/time-passed';
import TimeSelect from 'views/components/time-select';
import ToggleButton from 'views/components/toggle-button';
import ToggleCheckbox from 'views/components/toggle-checkbox';
import UploadBox from 'views/components/upload-box';
import UserName from 'views/components/user-name';
import VideoSelector from 'views/components/video-selector';
import WidgetThumbnails from 'views/components/widget-thumbnails';

export default {
  AccordionSectionBody,
  AccordionSectionHeader,
  AccordionSection,
  Accordion,
  AccordionDropdown,
  AccordionDraggable,
  AddMore,
  AdvancedRestaurantSelection,
  BannerCard,
  Button,
  ButtonGroup,
  ButtonNotification,
  ButtonExpandible,
  ButtonMultiple,
  Calendar,
  CalendarButton,
  CalendarPicker,
  Card,
  Checkbox,
  CheckboxExpandable,
  CheckboxGroup,
  CheckboxList,
  CheckboxPermission,
  CheckboxSection,
  CheckedCard,
  ChoosePhoto,
  RecentPhoto,
  DefaultPhotos,
  NewPhoto,
  ContentWidget,
  Widgets: widgets,
  CountTracker,
  DashboardCard,
  DashboardCardList,
  DayOpenStatus,
  DayOpenStatusList,
  Dropdown,
  DraggableElement,
  DraggableWidgets,
  DragWidgetItem,
  DropdownFooter,
  DropdownGroup,
  DropdownList,
  DropdownMenu,
  DropdownScroll,
  DropdownSelector,
  DropdownTooltip,
  EditMainMenu,
  EditedBy,
  ExpandibleMailBox,
  FormBuilder,
  LoadFiltersModal,
  SaveFiltersModal,
  Gallery,
  HorizontalList,
  HoursPanel,
  HoursPanelList,
  Icon,
  Icons,
  InfiniteScroll,
  InputMultipleAuthors,
  InputField,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NextPrev,
  NoContentCard,
  Notification,
  NotificationBubble,
  Pagination,
  Panel,
  PanelContent,
  PanelHeader,
  PanelSectionOverview,
  PermissionComments,
  Preloader,
  ProgressBar,
  PublishBoard,
  Question,
  Radio,
  RadioList,
  Rating,
  ReadMore,
  ScrollArea,
  SectionCard,
  SectionCardBody,
  SectionCardHeader,
  SectionCardFooter,
  Select,
  SelectSearch,
  SidePreview,
  SimpleRestaurantSelection,
  Sortable,
  Status,
  SwitchButton,
  Tag,
  TabArea,
  Tab: TabList.Tab,
  TabList: TabList.TabList,
  TabContentList: TabList.TabContentList,
  TabContent: TabList.TabContent,
  TabListAside: TabList.TabListAside,
  Table,
  TableFilters,
  TextEditor,
  TimePassed,
  TimeSelect,
  ToggleButton,
  ToggleCheckbox,
  UploadBox,
  UserName,
  VideoSelector,
  WidgetThumbnails,
}
