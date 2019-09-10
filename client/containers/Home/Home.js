import './Home.scss';
import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Icon, Card } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import LogoSVG from '../../components/LogoSVG/index.js';
import { changeMenuItem } from '../../reducer/modules/menu';
const plugin = require('client/plugin.js');

const ThirdLogin = plugin.emitHook('third_login');
const HomeGuest = () => (
  <div className="g-body">
    <div className="m-bg">
      <div className="m-bg-mask m-bg-mask0" />
      <div className="m-bg-mask m-bg-mask1" />
      <div className="m-bg-mask m-bg-mask2" />
      <div className="m-bg-mask m-bg-mask3" />
    </div>
    <div className="main-one">
      <div className="container">
        <Row>
          <Col lg={9} xs={24}>
            <div className="home-des">
              <div className="logo">
                {/* <LogoSVG length="72px" /> */}
                <span className="name">YAPI</span>
              </div>
              <div className="detail">
                高效、易用、功能强大的API管理平台<br />
                <span className="desc">旨在为开发、产品、测试人员提供更优雅的接口管理服务</span>
              </div>
              <div className="btn-group">
                <Link to="/login">
                  <Button type="primary" className="btn-home btn-login">
                    登录 / 注册
                  </Button>
                </Link>
                {ThirdLogin != null ? <ThirdLogin /> : null}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);
HomeGuest.propTypes = {
  introList: PropTypes.array
};

@connect(
  state => ({
    defaultProjectId: state.project.defaultProjectId,
    visitorId: state.user.visitorId,
    uid: state.user.uid,
    login: state.user.isLogin
  }),
  {
    changeMenuItem
  }
)
@withRouter
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.login && this.props.uid !== this.props.visitorId) {
      this.props.history.push('/group/261');
    } else {
      this.props.history.push('/project/' + this.props.defaultProjectId);
    }
  }

  componentDidMount() {}
  static propTypes = {
    defaultProjectId: PropTypes.number,
    visitorId: PropTypes.number,
    uid: PropTypes.number,
    introList: PropTypes.array,
    login: PropTypes.bool,
    history: PropTypes.object,
    changeMenuItem: PropTypes.func
  };
  toStart = () => {
    this.props.changeMenuItem('/group');
  };
  render() {
    return (
      <div className="home-main">
        <HomeGuest introList={this.props.introList} />
      </div>
    );
  }
}

export default Home;
