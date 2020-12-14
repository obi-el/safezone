import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  searchItem: {
    margin: 3,
    padding: 3,
    backgroundColor: 'rgba(139,146,132, 0.2)',
    borderColor: 'gray',
    borderRadius: 10,
  },
  searchList: {
  },
  searchText: {
    color: 'rgb(6,69,173)',
  },
  searchInput: {
    width: '80%',
    fontSize: 15,
    ...Platform.select({
      ios: {
        margin: 10,
        height: 30,
      },
      android: {
        margin: 0,
      },
      default: {
        width: '80%',
        margin: 5,
      },
    }),
  },
  searchIcon: {
    color: 'rgb(6,69,173)',
  },
  iconPlusSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
