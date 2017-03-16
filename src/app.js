import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Relay from 'react-relay'
import { createRenderer } from './RelayUtils'
import RelayStore from './RelayStore'
import EntriesQuery from './EntriesQuery'

const GRAPHQL_ENDPOINT = 'http://localhost:8080'

RelayStore.reset(
  new Relay.DefaultNetworkLayer(GRAPHQL_ENDPOINT)
);

class ReactNativeRelay extends Component {

  render() {
    const { entries } = this.props

    return (
      <View style={style.container}>
        <Text style={style.title}>
          {entries.hotListings.length} items
        </Text>
      </View>
    )
  }
}

export default createRenderer(ReactNativeRelay, {
  queries: EntriesQuery,
  fragments: {
    entries: () => Relay.QL`
      fragment on RedditSubreddit {
        hotListings {
          title
          score
          numComments
          url
          author {
            username
          }
        }
      }
    `,
  },
})

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#F26B00'
  },
})
