import React, { Component } from 'react';
import Search from './Search.js';
import { Link } from 'react-router-dom';
import { Icon, Breadcrumb } from 'antd';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: props.sensors,
        }
    }
    render() {
        const { sensors } = this.props;
        return (
            <div className="Header">
                <div className="Header-left">
                <Breadcrumb>
                <Link to={'/'}>
                    <Breadcrumb.Item >
                        <Icon type="home" theme="twoTone"/>
                    </Breadcrumb.Item>
                    </Link>
                    <Link to={'/create'}>
                    <Breadcrumb.Item >
                    <Icon type="plus-circle" theme="twoTone"/>
                        <span>Create Location</span>
                    </Breadcrumb.Item>
                    </Link>
                    
                </Breadcrumb>
                </div>
                {/* <div className="Search">
                <Search sensors={sensors} />
                </div> */}
                {/* <div className="Header-right">
                    <Search sensors={sensors} />
                    <Icon type="user" />
                    <span>Behlül Bahadır Bölük</span>
                </div> */}
                       {/* <div className="Search">
                <Search sensors={sensors} />

                </div>
                <div className="Search">
                <Icon type="user" />
                    <span>Behlül Bahadır Bölük</span>
                </div> */}
                <div className="Header-right">
                    {/* <Icon type="user" /> */}
                    <span>Behlül Bahadır Bölük</span>
                </div>
                <div className="Header-right">
                <Icon type="smile" theme="twoTone" />
                    
                </div>
                <div className="Header-right">
                <Search sensors={sensors} />
                    
                </div>

            </div>
        );
    }
}

export default Header;
