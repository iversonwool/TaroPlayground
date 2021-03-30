import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import styles from "./index.module.scss";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onClick = () => {
    console.log("click");
  };

  render() {
    return (
      <View className={styles.index}>
        <Text>Hello world!</Text>
        <Button onClick={this.onClick}>Click Me</Button>
      </View>
    );
  }
}
