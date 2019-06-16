import React, {Component, Fragment} from 'react'
import firebase from 'react-native-firebase'
const db = firebase.firestore()
import {TextInput, SectionList, StyleSheet, Text, View} from 'react-native'
import {Input} from 'react-native-elements'
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
      sectionsData.forEach(section => sections.push({title: section.id, data: section.get('items')}))
      this.setState({sections})
    } catch(err) {
      console.error(err)
    }
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

  handleChange = text => {
    this.setState({text})
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    const {sections, active, text} = this.state
    try {
      const sectionData = db.collection('sections').doc(active)
      await sectionData.update({
        items: firebase.firestore.FieldValue.arrayUnion(text),
        merge: true
      })
      const data = await sectionData.get()
      const items = data.get('items')
      const updatedSection = {title: sectionData.id, data: items}
      const updatedSections = sections.map(section => section.title == sectionData.id ? updatedSection : section)
      this.setState({sections: updatedSections, text: '', input: false, active: ''})
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    const {sections, input, active, text} = this.state
    const {handlePress, handleChange, handleSubmit} = this

    return (
      <SectionList style={{padding: 40, marginTop: 20}}
        renderItem={({item, index, section}) => <Text style={{padding: 5}}>{item}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <AddItemButton id={title} title={title} handlePress={evt => handlePress(evt, title)} />
        )}
        sections={this.state.sections}
        keyExtractor={(item, index) => {
          item = item ? item.length : 0
          return index + item
        }}
        SectionSeparatorComponent={({trailingItem, section}) => input && active === section.title
          && !trailingItem ? <TextInput
            autoFocus={true}
            blurOnSubmit={true}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmit}
            value={text}
            style={{height: 30, borderColor: 'gray', borderWidth: 1, marginBottom: 45}}
          /> : !trailingItem ? <Text style={{padding: 5, marginBottom: 45}} /> : null
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
        SectionSeparatorComponent={({trailingItem, section}) => input && active === section.title && !trailingItem ? <FormInput 
            onChangeText={handleChange}
            style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          /> : null
        }
      />*/}
