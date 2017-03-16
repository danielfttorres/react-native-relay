import Relay from 'react-relay'

const SubredditQuery = {
  subreddit: () => Relay.QL`
    query {
      subreddit(name: "Futurology")
    }
  `,
}

export default SubredditQuery
