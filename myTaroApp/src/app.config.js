export default {
  pages: [
    'pages/dashboard/index',
    'pages/clue/index',
    'pages/market/index',
    'pages/mine/index',
    'pages/floor/index'
  ],
  tabBar: {
    list: [
      {
        'iconPath': 'assets/dashboard.png',
        'selectedIconPath': 'assets/dashboardSelected.png',
        pagePath: 'pages/dashboard/index',
        text: '工作台'
      }, 
      {
        pagePath: 'pages/clue/index',
        text: '线索'
      }, 
      {
        pagePath: 'pages/market/index',
        text: '营销'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'black'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
