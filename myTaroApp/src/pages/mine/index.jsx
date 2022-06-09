import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

export default class Mine extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  goto() {
    Taro.navigateTo({
      url: "/pages/floor/index",
    });
  }

  render() {
    return (
      <View className="mine">
        <Text>Hello world!</Text>
        <Button onClick={this.goto}>去楼层页面</Button>
      </View>
    );
  }
}
