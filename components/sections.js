import React, {Component, Fragment} from 'react'
import firebase from 'react-native-firebase'
import {TextInput, SectionList, StyleSheet, Text, View} from 'react-native'
import AddItemButton from './add-item-button'

class Sections extends Component {
  state = {
    sections: [],
    input: false,
    active: '',
    text: ''
  }

  async componentDidMount() {
    const sections = []
    try {
      const sectionsData = await firebase.firestore().collection('sections').get()
      const getData = section => {
        const data = Object.values(section.data())
        return data.length > 0 ? ['     '].concat(data) : ['     ']
      }
      sectionsData.forEach(section => sections.push({title: section.id, data: getData(section)}))
      this.setState({sections})
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
    const {sections, input, active} = this.state
    const {handleChange, handlePress} = this

    return (
      <SectionList style={{margin: '10%'}}
        renderItem={({item, index, section}) => <Text style={{padding: 5}}>{item}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <AddItemButton id={title} title={title} handlePress={evt => handlePress(evt, title)} />
        )}
        sections={sections}
        keyExtractor={(item, index) => {
          item = item ? item.length : 0
          return index + item
        }}
        SectionSeparatorComponent={({trailingItem, section}) => input && active === section.title && !trailingItem ? <TextInput 
            onChangeText={handleChange}
            style={{height: 30, borderColor: 'gray', borderWidth: 1, marginBottom: 50}}
          /> : !trailingItem ? <Text style={{padding: 5, marginBottom: 50}} /> : null
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

export default Sections

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



      {/*<SectionList style={{margin: '10%'}}
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
      />*/}
