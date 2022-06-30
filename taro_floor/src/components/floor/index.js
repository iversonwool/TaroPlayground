import React, { Component } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { Tabs, Tab } from "@antmjs/vantui";
import Taro from '@tarojs/taro'
import './index.less'

/**
 * 封装了两段逻辑
 * 1.点击tab时滚动到对应的view
 * 2.滚动时切换到对应的tab
 */
export default class Floor extends Component {
  state = {

    active: 0,
    toView: ''
  }



  componentDidMount() {
    this.setNeedsLayout()
  }
  

  onReady() {
    console.log('onReady called')//不会被调用 因为不是页面
  }
  /**
   * 锚点数组
   */
  anchorArray = []

  setNeedsLayout() {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().selectAll('.unit').boundingClientRect(e => {
        console.log('e', e)
        let h = 0
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

  renderScrollContent = () => {
    const { renderProps } = this.props
    const scrollContent  = renderProps()

    return React.Children.map(scrollContent.props.children, (child, idx) => {
      const {props: {className}} = child
      return React.cloneElement(child, {
        className: `${className} unit`,
        id: `view${idx}`
      })
    })
  }

  render() {
    const { active, toView } = this.state
    const { tabs = [] } = this.props
    return (
      <View className="floorPage">
        <Tabs onClick={this.onClick} active={active}>
          {tabs.map(e => {
            return <Tab key={e.title} {...e} />
          })}
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
            {this.renderScrollContent()}
            
          </ScrollView>
        </View>
      </View>
    )
  }
}
