import React, {Component, Fragment} from 'react'
import firebase from 'react-native-firebase'
import {TextInput, SectionList, StyleSheet, Text, View} from 'react-native'
import AddItemButton from './add-item-button'

const filterItems = (items, section) => {
  return items.map(item => {
    if(item._data.section === section) return item.id
  })
}

class List extends Component {
  state = {
    items: [],
    input: false,
    text: ''
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

  handleChange = text => {
    this.setState({
      text
    })
  }

  handlePress = evt => {
    this.setState({ 
      input: true
    })
    //make button inactive
    //add row to category
    //open autopopulating input in new row (will be it's own component called AddItem)
  }

  render() {
    const {items, input} = this.state
    const {handleChange, handlePress} = this
    const general = filterItems(items, 'general')
    // const produce = filterItems(items, 'produce')
    return (
      <SectionList style={{margin: '10%'}}
        renderItem={({item, index, section}) => <Fragment>
            <Text key={item + index}>{item}</Text>
            {input ? <TextInput 
              onChangeText={handleChange}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            /> : null}
          </Fragment>
        }
        renderSectionHeader={({section: {title}}) => (
          <AddItemButton title={title} handlePress={handlePress} />
        )}
        sections={[
          {title: 'General', data: general}, //pull data from where section === section
          // {title: 'Produce', data: produce}
        ]}
        keyExtractor={(item, index) => {
          return item + index
        }}
      />
    )
  }    
}


var styles = StyleSheet.create({
  container: {
    margin: '10%'
  },
  button: {
    backgroundColor: '#56A572'
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




