import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  appbar: {
    position: 'absolute',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    bottom: '15%',
  },
  settingsIcon: {
    flex: 1,
    marginLeft: 10,
    color: 'rgb(6,69,173)',
  },
});
