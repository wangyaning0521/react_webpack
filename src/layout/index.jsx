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

import  styles from './index.less'



export default class Layout extends  React.Component{
    constructor(props) {
        super(props)
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
        this.state = {
            userInfo:{},
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
     * @param {*} openKeys 
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

    componentDidMount(){
        if(window.localStorage.inf !==null ){
            this.setState({
                userInfo : JSON.parse(window.localStorage.inf)
            })
            
        }
    }
    

	render() {
        return (  
            <Layouts >
                <Sider>
                    <div className={styles.imgWarper}>
                        <img src={require('../images/react.jpg')} />    
                    </div>
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
                                                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0);"> { item.text } </a>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                            }
                        >
                            <p href="javascript:void(0);" className={styles.userDom}>
                                欢迎登陆：尊敬的
                                <span className="ant-dropdown-link">
                                    {this.state.userInfo.username} <Icon type="down" />
                                </span>
                            </p>
                        </Dropdown>
                    </Header>
                    <Content>{this.props.children}</Content>
                </Layouts>
            </Layouts>
        );  
	}  
}