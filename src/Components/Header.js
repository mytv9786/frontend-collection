import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOR } from '../Constants';
import { CircleUserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ visible, setVisible, currentRoute, logout }) => {
  const navigation = useNavigation();

  return (
    <View>
      {/* ─── GLOBAL FIXED HEADER ─── */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setVisible(!visible)}
        >
          <Text style={styles.buttonText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.titleArea}>
          <Text style={styles.mainTitle}>{currentRoute}</Text>
        </View>

        <TouchableOpacity
          style={[styles.toggleButton]}
          onPress={() => navigation.navigate('Profile')}
        >
          <CircleUserRound size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    //backgroundColor: '#949aee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContext: 'space-between',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  toggleButton: { padding: 10, borderRadius: 5, alignItems: 'center' },
  buttonText: {
    color: COLOR.darkCharcoalBrown,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleArea: { alignItems: 'center' },
  mainTitle: {
    color: COLOR.darkCharcoalBrown,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: { color: COLOR.darkCharcoalBrown, fontSize: 11, marginTop: 2 },
  logoutIcon: {
    color: COLOR.darkCharcoalBrown,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bgColor: { backgroundColor: '#FFFFFF' },
  horizontalLine: {
    borderBottomWidth: 2,
    borderColor: '#000',
  },
});

export default Header;
