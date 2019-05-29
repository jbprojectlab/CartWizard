import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

var List = function() {
  return (
    <SectionList
      renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
      renderSectionHeader={({section: {title}}) => (
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
      )}
      sections={[
        {title: 'General', data: ['KIND Bars', 'Frosted Flakes']},
        {title: 'Produce', data: ['Oranges', 'Green Bell Peppers']},
        {title: 'Meat', data: ['Ground Chuck', 'Mahi']}
      ]}
      keyExtractor={function(item, index) {
        return item + index
      }}
    />
  )
};

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




