module.exports = {
    color: {
      green: '#64ea91',
      blue: '#8fc9fb',
      purple: '#d897eb',
      red: '#f69899',
      yellow: '#f8c82e',
      peach: '#f797d6',
      borderBase: '#e5e5e5',
      borderSplit: '#f4f4f4',
      grass: '#d6fbb5',
      sky: '#c1e0fc',
    },
    local : {
        filterConfirm: '确定',
        filterReset: '重置',
        emptyText: '暂无数据'
    },
    operId: window.localStorage.inf ? JSON.parse(window.localStorage.inf).id : ''
  }
  