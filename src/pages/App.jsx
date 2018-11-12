import React from 'react';
import {  connect } from 'react-redux'; 
import { Button, Icon, Col, Row,Card  } from 'antd';
import { withRouter } from 'react-router'
import main_mock from '../mock/main.jsx'
import { NumberCard, LineChart, Weather, Quote, AreaChartPage }  from 'Component/main'
import { color } from 'utils'
import styles from '../style/App.less'
console.log(styles)

class App extends React.Component{

    constructor(props) {
        super(props)
    }

    // 初始化
    componentDidMount(){
        if ( !window.localStorage.inf ){
            this.props.history.push('/login')
        }
    }

	render() {

        const numberCards = main_mock.NumberCar.map((item, key) => (<Col className='main-cardCol' key={key} lg={6} md={12}>
            <NumberCard {...item} />
          </Col>))

        return (  
            <div className={styles.home}>
                <span className={styles['home-title']}>
                    <Icon type="bar-chart" />
                    首页
                </span>
                <Row>
                    {numberCards}
                    <Col lg={18} md={24} className='mar0tm10'>
                        <Card bordered={false}
                        >
                            <LineChart />
                        </Card>
                    </Col>
                    <Col lg={6} md={24} className='mar0tm10'>
                        <Row gutter={24}>
                            <Col lg={24} md={12}>
                                <Card bordered={false}
                                    className='weather'
                                    bodyStyle={{
                                        padding: 0,
                                        height: 204,
                                        background: color.blue,
                                    }}
                                >
                                    <Weather {...main_mock.weater} />
                                </Card>
                            </Col>
                            <Col lg={24} md={12}>
                                <Card bordered={false}
                                    className='quote'
                                    bodyStyle={{
                                        padding: 0,
                                        height: 204,
                                        marginTop:'20px',
                                        background: color.peach,
                                    }}
                                >
                                    <Quote {...main_mock.quote} />
                                </Card>
                            </Col>
                            
                        </Row>
                    </Col>
                    <Col lg={24} md={24} className='mar0tm10 mt20'>
                        <Card bordered={false}
                            bodyStyle={{
                                padding: '24px 36px 24px 0',
                            }}
                        >
                            <AreaChartPage />
                        </Card>
                    </Col>
                </Row>
            </div>  
        );  
	}  
}

//映射Redux state到组件的属性  
function mapStateToProps(state) {
	return { size: state.size}  
}  
//映射Redux actions到组件的属性  
function mapDispatchToProps(dispatch){  
	return{  
        add_size:()=>dispatch({
            type:'ADD_SIZE',
            size:10
        }),
	}  
}  
//连接组件  
App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) 

export default App
