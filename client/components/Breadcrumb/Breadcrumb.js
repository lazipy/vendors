import './Breadcrumb.scss';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

@connect(state => {
  return {
    visitorId: state.user.visitorId,
    uid: state.user.uid,
    breadcrumb: state.user.breadcrumb
  };
})
@withRouter
export default class BreadcrumbNavigation extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    visitorId: PropTypes.number,
    uid: PropTypes.number,
    breadcrumb: PropTypes.array
  };

  render() {
    const getItem = () => {
      if (this.props.uid === this.props.visitorId) {
        return <Breadcrumb.Item key='易观千帆对外API接口文档'>易观千帆对外API接口文档</Breadcrumb.Item>;
      } else {
        return this.props.breadcrumb.map((item, index) => {
          if (item.href) {
            return (
              <Breadcrumb.Item key={index}>
                <Link to={item.href}>{item.name}</Link>
              </Breadcrumb.Item>
            );
          } else {
            return <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>;
          }
        });
      }
    }
    return (
      <div className="breadcrumb-container">
        <Breadcrumb>{getItem()}</Breadcrumb>
      </div>
    );
  }
}
