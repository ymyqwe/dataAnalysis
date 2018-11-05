import { Router, Route, Link, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './pages/Home';
import Euro from './pages/Euro';
import { Container, Divider, Dropdown, Grid, Header, Icon, Image, List, Menu, Segment, Visibility } from 'semantic-ui-react';
import { createBrowserHistory } from 'history';

import logo from './img/logo.jpg';
const history = createBrowserHistory();

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease'
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

const overlayStyle = {
  float: 'left',
  margin: '0em 3em 1em 0em'
};

const fixedOverlayStyle = {
  ...overlayStyle,
  position: 'fixed',
  top: '80px',
  zIndex: 10
};

const overlayMenuStyle = {
  position: 'relative',
  left: 0,
  transition: 'left 0.5s ease'
};

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: '800px'
};
class routes extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false
  };
  stickOverlay = () => this.setState({ overlayFixed: true });

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state;
    return (
      <div>
        <Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
          <Menu borderless fixed={menuFixed && 'top'} style={menuFixed ? fixedMenuStyle : menuStyle}>
            <Container text>
              <Menu.Item>
                <Image size="mini" src={logo} />
              </Menu.Item>
              <Menu.Item header>首页</Menu.Item>
              <Menu.Item as="a" onClick={() => history.push('/')}>
                睡眠数据
              </Menu.Item>
              <Menu.Item as="a" onClick={() => history.push('/euro')}>
                旅行
              </Menu.Item>

              {/* <Menu.Menu position="right">
                  <Dropdown text="Dropdown" pointing className="link item">
                    <Dropdown.Menu>
                      <Dropdown.Item>List Item</Dropdown.Item>
                      <Dropdown.Item>List Item</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Header Item</Dropdown.Header>
                      <Dropdown.Item>
                        <i className="dropdown icon" />
                        <span className="text">Submenu</span>
                        <Dropdown.Menu>
                          <Dropdown.Item>List Item</Dropdown.Item>
                          <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu> */}
            </Container>
          </Menu>
        </Visibility>
        <Container text>
          <Visibility
            offset={80}
            once={false}
            onTopPassed={this.stickOverlay}
            onTopVisible={this.unStickOverlay}
            style={overlayFixed ? { ...overlayStyle, ...overlayRect } : {}}
          />
        </Container>
        <Router history={history}>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/euro" component={Euro} />
          </div>
        </Router>
        <hr />
      </div>
    );
  }
}

export default routes;
