import React from 'react'
import {View, Button, Text} from '@tarojs/components'

class PageA extends React.Component {

  config = {
    navigationBarTitleText: '首页'
  }

  // 对应 onShow
  componentDidShow () {}

  // 对应 onHide
  componentDidHide () {}

  // 对应 onPullDownRefresh，除了 componentDidShow/componentDidHide 之外，
  // 所有页面生命周期函数名都与小程序相对应
  onPullDownRefresh () {
  }

  // 对应 onPullDownRefresh
  onReachBottom () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello Page A</Text>
        <Button>Click Me</Button>
      </View>
    )
  }
}