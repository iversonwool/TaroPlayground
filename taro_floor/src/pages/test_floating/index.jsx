import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
// import FloatingWrapper from '../../components/floatingCore'
import ContantBall from '../../components/contactBall'

export default class Test_floating extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='test_floating'>
        <Text>Hello world!</Text>

        <ContantBall />
      </View>
    )
  }
}
