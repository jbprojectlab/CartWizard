import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import firebase from 'react-native-firebase'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons'


class AddItemButton extends Component {
  render() {
    const {title, handlePress} = this.props
    return (
      <Button
        key={title}
        title={title}
        icon={{ name: 'add', color: 'white' }}
        iconRight
        onPress={handlePress}
        buttonStyle={{backgroundColor: 'green'}}
      />
    )
  }    
}

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#56A572'
  }
})

export default AddItemButton