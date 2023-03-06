import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Screen } from './Screen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Screen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
