import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  appbar: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    ...Platform.select({
      ios: {
        top: 20,
      },
      android: {
        top: 20,
      },
      default: {
        top: 50,
      },
    }),
  },
  settingsIcon: {
    flex: 1,
    marginLeft: 10,
    color: 'rgb(6,69,173)',
  },
});
