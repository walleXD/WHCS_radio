import React from "react"

import withRedux from "../lib/withRedux"
import initStore from "../lib/initStore"

export default WrappedComponent => {
  @withRedux(initStore)
  class MainLayout extends React.PureComponent {
    static getInitialProps = WrappedComponent.getInitialProps

    render() {
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  return MainLayout
}
