import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { Tabs, Tab } from "@antmjs/vantui";
import Taro from '@tarojs/taro'
import './index.less'

/**
 * 
 */
export default class Floor extends Component {
  state = {

    active: 0,
    toView: ''
  }

  componentDidMount() {
    this.setNeedsLayout()
  }
  
  /**
   * 锚点数组
   */
  anchorArray = []

  setNeedsLayout() {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().selectAll('.unit').boundingClientRect(e => {
        console.log('e', e)
        let h = 200
        /**
         * top 是相对整个视口的顶部 如果顶部没有其他东西就可以用top
         */
        this.anchorArray = e.map(s => h+=s.height)
        console.log('this.anchorArray', this.anchorArray)
      }).exec()
    })
  }

  onClick = (e) => {
    const {index} = e.detail
    this.setState({

      active: index,
      toView: `view${index}`
    })
  };

  onScroll = (e) => {
    const {scrollTop} = e.detail

    this.anchorArray.forEach((h,idx, self)=> {
      if (scrollTop >= self[idx - 1] && scrollTop < h) {
        this.setState({active : idx})
      } else if (scrollTop < self[0]) {
        this.setState({ active: 0})
      }
    })
  }

  render() {
    const { active, toView } = this.state
    return (
      <View className="floorPage">
        <Tabs onClick={this.onClick} active={active}>
          <Tab title="标签 1"></Tab>
          <Tab title="标签 2"></Tab>
          <Tab title="标签 3"></Tab>
          <Tab title="标签 4"></Tab>
          <Tab title="标签 5"></Tab>
          <Tab title="标签 6"></Tab>
          <Tab title="标签 7"></Tab>
          <Tab title="标签 8"></Tab>
          <Tab title="标签 9"></Tab>
          <Tab title="标签 10"></Tab>
          <Tab title="标签 11"></Tab>
          <Tab title="标签 12"></Tab>
          <Tab title="标签 13"></Tab>
          <Tab title="标签 14"></Tab>
          <Tab title="标签 15"></Tab>
          <Tab title="标签 16"></Tab>
        </Tabs>

        <View className="scrollContainer">
          <ScrollView 
            className="scrollView" 
            scrollY 
            scrollIntoView={toView} 
            scrollWithAnimation
            onScroll={this.onScroll}
          >

            {/* <View className="bannerView"></View> */}
            <View className="unit" style="background-color: #000;" id="view0"></View>
            <View className="unit" style="background-color: #111;" id="view1"></View>
            <View className="unit" style="background-color: #222;" id="view2"></View>
            <View className="unit" style="background-color: #333;" id="view3"></View>
            <View className="unit" style="background-color: #444;" id="view4"></View>
            <View className="unit" style="background-color: #555;" id="view5"></View>
            <View className="unit" style="background-color: #666;" id="view6"></View>
            <View className="unit" style="background-color: #777;" id="view7"></View>
            <View className="unit" style="background-color: #888;" id="view8"></View>
            <View className="unit" style="background-color: #999;" id="view9"></View>
            <View className="unit" style="background-color: #aaa;" id="view10"></View>
            <View className="unit" style="background-color: #bbb;" id="view11"></View>
            <View className="unit" style="background-color: #ccc;" id="view12"></View>
            <View className="unit" style="background-color: #ddd;" id="view13"></View>
            <View className="unit" style="background-color: #eee;" id="view14"></View>
            <View className="unit" style="background-color: #fff;" id="view15"></View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
