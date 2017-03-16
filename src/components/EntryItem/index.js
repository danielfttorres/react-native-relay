import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import style from './style'

class EntryItem extends Component {

  static propTypes = {
    author: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  render() {
    const { author, score, title, url } = this.props

    return (
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.author}>
            <Text style={style.authorText}>{author.username}</Text>
          </View>
          <View style={style.info}>
            <View style={style.infoItem}>
              <Text style={style.infoItemText}>{score}</Text>
            </View>
          </View>
        </View>

        <View style={style.body}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.url} selectable={true}>{url}</Text>
        </View>
      </View>
    )
  }
}

export default EntryItem
