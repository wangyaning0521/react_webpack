import {
    Link
} from 'react-router-dom';
import React      from 'react';
import antd       from 'antd';
const Layouts = antd.Layout
const { Header, Footer, Sider, Content } = Layouts;

import { Menu, Icon, Breadcrumb,Dropdown} from 'antd';
const SubMenu = Menu.SubMenu;

import './index.less'

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
      </Menu.Item>
    </Menu>
);
export default class Layout extends  React.Component{
    constructor(props) {
        super(props)
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
        this.state = {
            openKeys: ['sub1'],
            nav:[
                {
                    name:'系统管理',
                    type:'mail',
                    menu:[
                        {
                            key:'1',
                            label:'账号管理',
                            path:"/AccountAdmin",
                        },
                        {
                            key:'2',
                            label:'账单管理',
                            path:"/billAdmin/123",
                        },
                        {
                            key:'3',
                            label:'业务管理',
                            path:"/BusinessAdmin/4596",
                        },
                    ]
                }
            ]
        };
        this.onOpenChange = (openKeys) => {
            const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.setState({ openKeys 
                });
            } else {
                this.setState({
                    openKeys: latestOpenKey ? [latestOpenKey] : [],
                });
            }
        }
        
    }
    
	render() {
        return (  
            <Layouts>
                <Sider>
                    <img src={require('../img/logo.png')} />
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                    >
                        {
                            this.state.nav.map( (item,index) =>
                                <SubMenu key={index} title={<span><Icon type={item.type}/><span>{item.name}</span></span>}>
                                    {
                                        item.menu.map( (i, idex) => 
                                            <Menu.Item key={i.key}> <Link to={i.path}> {i.label} </Link> </Menu.Item>
                                        )
                                    }
                                </SubMenu>
                            )
                        }
                    </Menu>
                </Sider>
                <Layouts>
                    <Header>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <Icon type="home" />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <Icon type="user" />
                                <span>Application List</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                Application
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                            Hover me <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Header>
                    <Content>{this.props.children}</Content>
                </Layouts>
            </Layouts>
        );  
	}  
}