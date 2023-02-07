## 使用方法

- copy源码文件夹到项目
- import Floor from '../../components/floor'
- 使用如下


```
import React, { Component } from 'react'
import { View, Text, Block } from '@tarojs/components'
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

  tabs = Array(10).fill(null).map((_, idx) => {
    return {
      title: `标签 ${idx}`
    }
  })


  renderScrollContent = (/*tabsHeight 后面想将tabs 高度抛出*/) => {
    return (
      <Block>
        {this.tabs.map((_, idx) => {
          return (
            <View 
              key={_} 
              style={`background-color: #${String(idx).repeat(3)};`} 
              className="demoView" 
            />
            )
        })}
      </Block>
    )
  }

  render () {
    return (
      <Floor
        tabs={this.tabs}
        ref={this.floorRef}
        renderProps={this.renderScrollContent}
      />
    )
  }
}
```