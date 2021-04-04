import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  listitemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  listitemComponent: {
  },
  separator: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    margin: 5
  }
});
