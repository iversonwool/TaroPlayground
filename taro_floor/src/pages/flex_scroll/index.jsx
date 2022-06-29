import { Component } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import "./index.less";

export default class Flex_scroll extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="flex_scroll">
        <View className="top">top</View>

        <View className="scrollContainer">
          <ScrollView className="scrollArea" scrollY>
            <View style={{ height: "2000rpx" }}></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
