

import React, { Component } from 'react'
import {View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import _ from 'lodash'
import './index.scss'

/**
 * 封装
 * 1.拖动
 * 2.边界处理
 * - 呈现UI交给外界
 * - 点击事件交给外界
 */
export default class FloatingWrapper extends Component {

  state = {
    buttonTop: 0,
    buttonLeft: 0,

    ballWidth: 50,
    ballHeight: 50,
  }

  windowWidth = 0
  windowHeight = 0
  startPoint = null

  componentDidMount() {
    // 获取设备宽高，用于后面比较，以保证球在屏幕内drag
    const { windowWidth, windowHeight } = Taro.getSystemInfoSync()
    // console.log(info)
    this.windowWidth = windowWidth
    this.windowHeight = windowHeight
    // 给球一个相对比较合理的初始位置
    this.setState({
      buttonTop: this.windowHeight - 200 - this.state.ballHeight,
      buttonLeft: this.windowWidth - 16 - this.state.ballWidth
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { ballWidth, ballHeight } = this.state
    if (prevState.ballWidth === ballWidth && prevState.ballHeight === ballHeight) return
    console.log('update')
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select('.floatingWrapper')
        .boundingClientRect((r) => {
          this.setState({
            ballWidth: r.width,
            ballHeight: r.height
          })
        })
        .exec()
    })
  }

  onTouchStart = (e) => {
    this.startPoint = e.touches[0];
  }

  onTouchMove = (e) => {
    if (!this.startPoint) return
    const { ballWidth, ballHeight } = this.state
    const endPoint = e.touches[e.touches.length - 1];
    const translateX = endPoint.clientX - this.startPoint.clientX;
    const translateY = endPoint.clientY - this.startPoint.clientY;
    this.startPoint = endPoint;
    let buttonTop = this.state.buttonTop + translateY;
    let buttonLeft = this.state.buttonLeft + translateX;
    // 判断是移动否超出屏幕
    if (buttonLeft + ballWidth >= this.windowWidth) {
      buttonLeft = this.windowWidth - ballWidth;
    }
    if (buttonLeft <= 0) {
      buttonLeft = 0;
    }
    if (buttonTop <= 0) {
      buttonTop = 0;
    }
    if (buttonTop + ballHeight >= this.windowHeight) {
      buttonTop = this.windowHeight - ballHeight;
    }

    this.setState({
      buttonTop,
      buttonLeft
    });
  }

  onTouchEnd = () => {
    this.startPoint = null
  }


  render() {
    const { buttonLeft, buttonTop } = this.state
    const { renderProps, className, style, onClick } = this.props
    return (
      <View
        className={`floatingWrapper ${className}`}
        style={{
          ...style,
          top: buttonTop,
          left: buttonLeft,
        }} 
        onTouchStart={this.onTouchStart}
        onTouchMove={_.throttle(this.onTouchMove, 500)}// 节流一下
        catchMove// 防止滚动穿透
        onClick={onClick}
        onTouchEnd={this.onTouchEnd}
      >
        {renderProps && renderProps(buttonTop, buttonLeft)}
      </View>
    )
  }
}
