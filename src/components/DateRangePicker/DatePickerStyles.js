import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  filterBar: {
    flex: 3,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 1,
  },
  filterItem: {
    width: '30%',
    backgroundColor: 'rgba(139,146,132,0.2)',
  },
  filterIcon: {
    color: 'rgb(6,69,173)',
  },
});
