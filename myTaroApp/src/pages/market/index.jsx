import React from 'react'
import {View, Button, Text} from '@tarojs/components'

class PageA extends React.Component {

  render () {
    return (
      <View className='index'>
        <Text>Hello Page A</Text>
        <Button>Click Me</Button>
      </View>
    )
  }
}

export default PageA