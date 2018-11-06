export default {
    Option:[
        {
            value: 1,
            label: '业务咨询'
        },
        {
            value: 2,
            label: '客服咨询'
        },
        {
            value: 3,
            label: '人员咨询'
        },
    ],
    Cascader : [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake',
          }],
        }],
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
          value: 'nanjing',
          label: 'Nanjing',
          children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          }],
        }],
      }]
}