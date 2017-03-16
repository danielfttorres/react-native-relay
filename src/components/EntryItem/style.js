import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  author: {
    marginBottom: 5,
  },
  authorText: {
    fontSize: 15,
    color: '#F26B00',
    fontWeight: 'bold',
  },

  info: {
    flexDirection: 'row',
  },
  infoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginLeft: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#EEEEEE',
  },
  infoItemText: {
    fontSize: 11,
    color: '#999999',
  },

  title: {
    fontSize: 15,
    marginBottom: 5,
    lineHeight: 20,
  },
  url: {
    fontSize: 11,
    color: '#9F9F9F',
  }
})

export default style
