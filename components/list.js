import React, {Component, Fragment} from 'react'
import firebase from 'react-native-firebase'
import {TextInput, SectionList, StyleSheet, Text, View} from 'react-native'
import AddItemButton from './add-item-button'

const filterItems = (items, section) => items.filter(item => item._data.section === section)

class List extends Component {
  state = {
    items: [],
    input: false,
    active: '',
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

  handlePress = (evt, title) => {
    console.log('evt:  ', title)
    this.setState({
      input: true,
      active: title
    })
    //make button inactive
    //add row to category
    //open autopopulating input in new row (will be it's own component called AddItem)
  }

  render() {
    const {items, input, active} = this.state
    const {handleChange, handlePress} = this
    const general = filterItems(items, 'General').map(item => item.id)
    const produce = filterItems(items, 'Produce').map(item => item.id)

    return (
      <SectionList style={{margin: '10%'}}
        renderItem={({item, index, section}) => <Fragment>
            <Text>{item}</Text>
          </Fragment>
        }
        renderSectionHeader={({section: {title}}) => (
          <AddItemButton id={title} title={title} handlePress={evt => handlePress(evt, title)} />
        )}
        sections={[
          {title: 'General', data: general}, //pull data from where section === section
          {title: 'Produce', data: produce}
        ]}
        keyExtractor={(item, index) => {
          item = item ? item.length : 0
          return index + item
        }}
        SectionSeparatorComponent={({trailingItem, section}) => input && active === section.title && !trailingItem ? <TextInput 
            onChangeText={handleChange}
            style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          /> : null
        }
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




