import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './components/Header';
import {v4 as uuidv4} from 'uuid';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState([
    {id: uuidv4(), text: 'Milk'},
    {id: uuidv4(), text: 'Eggs'},
    {id: uuidv4(), text: 'Bread'},
    {id: uuidv4(), text: 'Juice'},
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != id);
    });
  };

  function editItem(id) {
    console.log(`item to edit ${id}`);

    Alert.prompt(
      'Edit Item',
      'Enter your item name',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (newItem) => {
            if (!newItem) {
              Alert.alert('Error', 'Please enter an item to update', {
                text: 'Ok',
              });
            } else {
              console.log('OK Pressed, New Item: ' + newItem);
              setItems((prevItems) => {
                return prevItems.filter((item) => {
                  if (item.id == id) {
                    item.text = newItem;
                  }
                  return true;
                });
              });
            }
          },
        },
      ],
      'plain-text',
    );
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item', {text: 'Ok'});
    } else if (items.some((el) => el.text === text)) {
      Alert.alert(
        'Alert',
        'Item Already Exists',
        [
          {
            text: 'Nevermind, Add',
            onPress: () => {
              console.log('Nevermind, Add Pressed');
              setItems((prevItems) => {
                return [{id: uuidv4(), text}, ...prevItems];
              });
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Skip', onPress: () => console.log('Skip Pressed')},
        ],
        {cancelable: false},
      );
    } else {
      setItems((prevItems) => {
        return [{id: uuidv4(), text}, ...prevItems];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} editItem={editItem} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
