import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const HomePaymentsCard = ({ title, amount, color, onPress, cardWidth }) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.card, { width: cardWidth, backgroundColor: color }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTitle}>{amount}</Text>

        {/* You can add icons here using react-native-vector-icons */}
      </TouchableOpacity>
    </>
  );
};

export default HomePaymentsCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
});
