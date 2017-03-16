// reference code: https://gist.github.com/janicduplessis/f513032eb37cdde5d050d9ce8cf0b92a

import React from 'react'
import type { Element as ReactElement } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import Relay from 'react-relay'
import RelayStore from './RelayStore'

type Variables = {[id: string]: mixed}

type Config = {
  queries: {[name: string]: any};
  queriesParams?: ?(props: Object) => Object;
  fragments: {[name: string]: any};
  initialVariables?: Variables;
  prepareVariables?: (prevVariables: Variables, route: any) => Variables;
  forceFetch?: bool;
  onReadyStateChange?: (readyState: any) => void;
  renderFetched?: (
    props: Object,
    fetchState: { done: bool; stale: bool }
  ) => ?ReactElement<any>;
  renderLoading?: () => ?ReactElement<any>;
  renderFailure?: (error: Error, retry: ?() => void) => ?ReactElement<any>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200,
  },
  title: {
    fontSize: 20,
    color: '#ccc',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 30,
    marginVertical: 20,
    borderRadius: 50,
    backgroundColor: '#F26B00',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
})

const LoadingView = () => (
  <View style={styles.container}>
    <View style={styles.loading}>
      <ActivityIndicator color="#F26B00" />
    </View>
  </View>
)

const FailureView = ({ error, retry }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.subtitle}>{error.message}</Text>

      <TouchableOpacity onPress={retry} style={styles.button}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export function createRenderer(
  Component: ReactClass<*>,
  config: Config
): ReactClass<*> {
  return createRendererInternal(Component, {
    forceFetch: true,
    renderLoading: () => <LoadingView />,
    renderFailure: (error, retry) => <FailureView error={error} retry={retry} />,
    ...config,
  })
}

function createRendererInternal(
  Component: ReactClass<*>,
  config: Config
): ReactClass<*> {
  const {
    queries,
    queriesParams,
    forceFetch,
    renderFetched,
    renderLoading,
    renderFailure,
    onReadyStateChange,
    fragments,
    initialVariables,
    prepareVariables,
  } = config

  const RelayComponent = Relay.createContainer(Component, {
    fragments,
    initialVariables,
    prepareVariables,
  })

  class RelayRendererWrapper extends React.Component {
    state = {
      queryConfig: this._computeQueryConfig(this.props),
    }

    render() {
      return (
        <Relay.Renderer
          Container={RelayComponent}
          forceFetch={forceFetch || false}
          onReadyStateChange={onReadyStateChange}
          queryConfig={this.state.queryConfig}
          environment={RelayStore}
          render={({ done, error, props, retry, stale }) => {
            if (error) {
              if (renderFailure) {
                return renderFailure(error, retry)
              }
            } else if (props) {
              if (renderFetched) {
                return renderFetched({ ...this.props, ...props }, { done, stale })
              } else {
                return <RelayComponent {...this.props} {...props} />
              }
            } else if (renderLoading) {
              return renderLoading()
            }
            return undefined
          }}
        />
      )
    }

    componentWillReceiveProps(nextProps: Object) {
      if (this.props.routeParams !== nextProps.routeParams) {
        this.setState({
          queryConfig: this._computeQueryConfig(nextProps),
        })
      }
    }

    _computeQueryConfig(props: Object) {
      const params = queriesParams ? queriesParams(props) : {}

      // remove parenthesis ( )
      const name  = `relay_route_${RelayComponent.displayName}`.replace(/[\(|\)]/g, '_')

      const queryConfig = {
        name,
        queries: { ...queries },
        params,
      }

      return queryConfig
    }
  }

  if (Component.route) {
    RelayRendererWrapper.route = Component.route
  }

  return RelayRendererWrapper
}
