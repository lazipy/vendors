import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeMenuItem } from '../reducer/modules/menu';
import { loginActions, logoutActions } from '../reducer/modules/user';

export function requireAuthentication(Component) {
  return @connect(
    state => {
      return {
        defaultProjectId: state.project.defaultProjectId,
        visitorId: state.user.visitorId,
        uid: state.user.uid,
        isAuthenticated: state.user.isLogin
      };
    },
    {
      changeMenuItem,
      loginActions, logoutActions
    }
  )
  class AuthenticatedComponent extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    static propTypes = {
      defaultProjectId: PropTypes.number,
      visitorId: PropTypes.number,
      uid: PropTypes.number,
      isAuthenticated: PropTypes.bool,
      location: PropTypes.object,
      dispatch: PropTypes.func,
      history: PropTypes.object,
      changeMenuItem: PropTypes.func,
      loginActions: PropTypes.func,
      logoutActions: PropTypes.func
    };
    componentWillMount() {
      this.checkAuth();
    }
    componentWillReceiveProps() {
      this.checkAuth();
    }
    async checkAuth() {
      const pathname = this.props.location.pathname
      const isOpenPage = pathname.includes('project')

      if (!this.props.isAuthenticated && isOpenPage) {
        await this.props.loginActions({ email: '877286986@qq.com', password: '123456' })
      } else if (!isOpenPage && this.props.uid === this.props.visitorId) {
        this.props.history.replace('/project/' + this.props.defaultProjectId);
      }
    }
    render() {
      return <div>{this.props.isAuthenticated ? <Component {...this.props} /> : null}</div>;
    }
  };
}
