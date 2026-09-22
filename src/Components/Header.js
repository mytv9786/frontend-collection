import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ visible, setVisible, logout }) => {
  //const [visible, setVisible] = useState(false);

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
          <Text style={styles.mainTitle}>{'Excell Media Pvt Ltd'}</Text>
          <Text style={styles.subText}>Collection Report 2026-27</Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, styles.bgColor]}
          onPress={() => logout()}
        >
          <Text style={styles.logoutIcon}>➜</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#949aee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContext: 'space-between',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  toggleButton: { padding: 10, borderRadius: 5 },
  buttonText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  titleArea: { alignItems: 'center' },
  mainTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  subText: { color: '#CCCCCC', fontSize: 11, marginTop: 2 },
  logoutIcon: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  bgColor: { backgroundColor: '#FFFFFF' },
});

export default Header;
