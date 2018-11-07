import {
    Link
} from 'react-router-dom';
import React      from 'react';
import antd       from 'antd';
const Layouts = antd.Layout
const { Header, Footer, Sider, Content } = Layouts;

import { Menu, Icon, Breadcrumb,Dropdown} from 'antd';
const SubMenu = Menu.SubMenu;

import nav from './nav'

import './index.less'


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

        
    }
    /**
     * 
     * @param {*} openKeys dian
     * 
     */
    onOpenChange (openKeys)  {
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

	render() {
        return (  
            <Layouts>
                <Sider>
                    <img src={require('../img/logo.png')} />
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange.bind(this)}
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
                            {
                                nav.Breadcrumb.map( (item,index) => {
                                    return(
                                        <Breadcrumb.Item href="/" key={index}>
                                            { item.type && <Icon type={item.type} /> }
                                            { item.text && item.text }
                                        </Breadcrumb.Item>
                                    )
                                })
                            }
                        </Breadcrumb>
                        <Dropdown 
                            overlay={
                                <Menu>
                                    {
                                        nav.menu.map( ( item, val ) => {
                                            return (
                                                <Menu.Item key={val} >
                                                    <a target="_blank" rel="noopener noreferrer" href={ item.url }> { item.text } </a>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                            }
                        >
                            <a className="ant-dropdown-link" href="#">
                                业务选择 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Header>
                    <Content>{this.props.children}</Content>
                </Layouts>
            </Layouts>
        );  
	}  
}