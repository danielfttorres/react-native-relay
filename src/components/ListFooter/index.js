import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import style from './style'

class ListFooter extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    itemsCount: PropTypes.number.isRequired
  }

  render() {
    const { title, itemsCount } = this.props

    return (
      <View style={style.container}>
        <Text style={style.text}>{itemsCount} Hot Listings on <Text style={style.textBold}>{title}</Text> subreddit</Text>
      </View>
    )
  }
}

export default ListFooter
