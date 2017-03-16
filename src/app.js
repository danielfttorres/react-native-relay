import React, { Component } from 'react'
import { Text, View, ListView, StyleSheet, Platform } from 'react-native'
import Relay from 'react-relay'
import { createRenderer } from './RelayUtils'
import RelayStore from './RelayStore'
import SubredditQuery from './SubredditQuery'
import SubredditItem from './components/SubredditItem'
import ListFooter from './components/ListFooter'

const GRAPHQL_ENDPOINT = 'http://192.168.0.12:8080'

RelayStore.reset(
  new Relay.DefaultNetworkLayer(GRAPHQL_ENDPOINT)
);

class ReactNativeRelay extends Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.props.subreddit.hotListings)
    }
  }

  render() {
    const { subreddit } = this.props

    return (
      <View style={style.container}>
        <ListView dataSource={this.state.dataSource}
          renderRow={(data) =>
            <SubredditItem
              author={data.author}
              score={data.score}
              title={data.title}
              url={data.url}
            />
          }
          renderFooter={() =>
            <ListFooter title={subreddit.title} itemsCount={subreddit.hotListings.length} />
          }
        />
      </View>
    )
  }
}

export default createRenderer(ReactNativeRelay, {
  queries: SubredditQuery,
  fragments: {
    subreddit: () => Relay.QL`
      fragment on RedditSubreddit {
        title
        hotListings {
          title
          score
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
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'white',
  },
})
