import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  filterBar: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    zIndex: 1,
  },
  filterItem: {
    margin: 40,
    width: '20%',
    backgroundColor: 'rgba(119, 92, 255, 0.2)',
    fontSize: 15,
  },
  filterIcon: {
    color: 'purple',
  },
});
