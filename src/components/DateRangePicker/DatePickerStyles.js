import {StyleSheet} from 'react-native';

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
    backgroundColor: 'white',
  },
  filterIcon: {
    color: 'rgb(6,69,173)',
  },
});
