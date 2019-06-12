import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {SectionList, StyleSheet, Text, View} from 'react-native'

const filterItems = (items, section) => {
  return items.map(item => {
    if(item._data.section === section) return item.id
  })
}

class List extends Component {
  state = {
    items: []
  }

  async componentDidMount() {
    const items = []
    try {
      const itemData = await firebase.firestore().collection('items').get()
      itemData.forEach(item => items.push(item))
      this.setState({items})
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    const {items} = this.state
    const produce = filterItems(items, 'produce')
    const meat = filterItems(items, 'meat')
    return (
      <SectionList
        renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <Text style={{fontWeight: 'bold'}}>{title}</Text>
        )}
        sections={[
          {title: 'General', data: []}, //pull data from where section === section
          {title: 'Produce', data: produce},
          {title: 'Meat/Poultry', data: meat}
        ]}
        keyExtractor={function(item, index) {
          return item + index
        }}
      />
    )
  }    
}


var styles = StyleSheet.create({
  category: {
    fontWeight: 'bold'
  }
});

export default List

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });




