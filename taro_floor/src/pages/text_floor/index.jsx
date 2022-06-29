import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import Floor from '../../components/floor'

export default class Text_floor extends Component {

  componentWillMount () { }

  componentDidMount () { 
    console.log('--')
  }

  componentWillUnmount () { }

  componentDidShow () { 
    console.log('componentDidShow')
  }

  onReady() {
    /**
     * 在UI加载完成以后，取得锚点
     * 静态页面在onReady调用
     * 如果是接口生成的在setData的回调里面调用
     */
    this.floorRef.current?.setNeedsLayout()
  }

  componentDidHide () { }

  floorRef = React.createRef()

  render () {
    return (
      <Floor ref={this.floorRef} />
    )
  }
}
