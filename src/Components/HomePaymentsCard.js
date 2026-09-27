import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import { COLOR } from '../Constants';

const HomePaymentsCard = ({ title, amount, color, onPress, cardWidth }) => {
  return (
    <View
      style={[
        styles.homePaymentCard,
        { width: cardWidth, backgroundColor: color },
      ]}
    >
      <TouchableOpacity
        style={[styles.card]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardTitle}>{amount}</Text>

        {/* You can add icons here using react-native-vector-icons */}
      </TouchableOpacity>
    </View>
  );
};

export default HomePaymentsCard;

const styles = StyleSheet.create({
  homePaymentCard: {
    // వాల్యూ మొత్తాన్ని సింగిల్ కోట్స్ లో ఉంచాలి
    boxShadow:
      '4px 4px 12px 0px rgba(101, 84, 80, 0.45), -4px -4px 12px 0px rgba(101, 84, 80, 0.45)',
    borderRadius: 12, // కార్డ్ అందంగా కనిపించడానికి బోర్డర్ రేడియస్
    padding: 16,
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLOR.darkCharcoalBrown,
  },
});
