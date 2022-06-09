import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import {Tabs, Tab} from '@antmjs/vantui'
import './index.scss'

export default class Floor extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  onClick =()=> {

  }
  render () {
    return (
      <View className='floor'>


      <Tabs onClick={this.onClick}>
        <Tab title="标签 1">内容 1</Tab>
        <Tab title="标签 2">内容 2</Tab>
      </Tabs>
      </View>
    )
  }
}
