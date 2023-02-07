## 使用说明

- copy源码文件夹到项目
- 导入
- 示例如下



```
import Taro from "@tarojs/taro";
import React from "react";
import {View, Image, Text } from '@tarojs/components'
import FloatingWrapper from "../floatingCore/index.new";
import contact from './contact_us@2x.png'
import './index.scss'

const ContantBall = () => {
  function onClick() {
    Taro.showModal({
      title: "点击事件",
    });
  }

  function renderUI() {
    return(
      <View className="ballContent">
        <Image src={contact} className="earphone" />
        <Text className="textStyle">联系我们</Text>
      </View>
      )
  }

  return (
    <FloatingWrapper
      renderProps={renderUI}
      onClick={onClick}
    />
  );
};

export default ContantBall;


```
