import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        bottom: '10%',
      },
      android: {
        bottom: '5%',
      },
    }),
  },
  searchItem: {
    margin: 3,
    padding: 3,
    backgroundColor: 'rgba(139,146,132, 0.2)',
    borderColor: 'gray',
    borderRadius: 10,
    width: '100%',
  },
  searchList: {
  },
  searchText: {
    color: 'rgb(6,69,173)',
  },
  searchInput: {
    width: '80%',
    fontSize: 12,
    ...Platform.select({
      ios: {
        margin: '3%',
      },
      android: {
        margin: 0,
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
    borderRadius: 10,
    borderColor: 'rgb(6,69,173)',
    borderWidth: 1,
    paddingLeft: '1%',
  },
});
