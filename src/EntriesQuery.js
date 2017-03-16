import Relay from 'react-relay'

const EntriesQuery = {
  entries: () => Relay.QL`
    query {
      subreddit(name: "Futurology")
    }
  `,
}

export default EntriesQuery
