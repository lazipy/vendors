import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Login from './LoginWrap';
import { Row, Col, Card } from 'antd';
// import LogoSVG from '../../components/LogoSVG/index.js';

class LoginContainer extends Component {

  static propTypes = {
    history: PropTypes.object
  };

  navigateTo = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="g-body login-body">
        <div className="m-bg">
          <div className="m-bg-mask m-bg-mask0" />
          <div className="m-bg-mask m-bg-mask1" />
          <div className="m-bg-mask m-bg-mask2" />
          <div className="m-bg-mask m-bg-mask3" />
        </div>
        <div className="main-one login-container">
          <div className="container">
            <Row type="flex" justify="center">
              <Col xs={20} sm={16} md={12} lg={8} className="container-login">
                <Card className="card-login">
                  <h2 className="login-title" onClick={this.navigateTo}></h2>
                  <Login />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginContainer;
