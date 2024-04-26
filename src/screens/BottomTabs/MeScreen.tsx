import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Divider, Icon, MD3Colors, Text} from 'react-native-paper';

import Container from '../../components/Container';
import {signOut} from '../../redux/slices/auth.slice';
import {useAppDispatch} from '../../redux/store';
import {DEFAULT_AVATAR} from '../../utils/constant';

const meFakeData = {
  name: 'John Doe',
  email: '',
  phone: '0912345678',
  address: 'An Khanh, Hoai Duc, Ha Noi',
  avatar: '',
};

const MeScreen = () => {
  const dispatch = useAppDispatch();

  const profileItems = useMemo(() => {
    return [
      {
        title: 'Cap nhat mat khau',
        icon: (
          <Icon source="onepassword" color={MD3Colors.primary50} size={20} />
        ),
        onPress: () => {},
      },
      {
        title: 'Cap nhat email',
        icon: <Icon source="email" color={MD3Colors.primary50} size={20} />,
        onPress: () => {},
      },
      {
        title: 'Dang xuat',
        icon: <Icon source="logout" color={MD3Colors.primary50} size={20} />,
        onPress: () => {
          dispatch(signOut());
        },
      },
    ];
  }, [dispatch]);

  const actionItems = useMemo(() => {
    return [
      {
        title: 'Dang ban',
        count: 1,
        onPress: () => {},
      },
      {
        title: 'Da ban',
        count: 2,
        onPress: () => {},
      },
      {
        title: 'Luu tin',
        count: 3,
        onPress: () => {},
      },
    ];
  }, []);

  return (
    <Container style={styles.container}>
      {/* TOP SECTION */}
      <View style={styles.topSection}>
        <Avatar.Image size={64} source={DEFAULT_AVATAR} />
        <View style={styles.topSectionRight}>
          <Text style={styles.name}>{meFakeData.name}</Text>
          {meFakeData?.email ? <Text>{meFakeData.email}</Text> : null}
          <Text>{meFakeData.phone}</Text>
          <Text>{meFakeData.address}</Text>
        </View>
      </View>

      <Divider />

      {/* POST SECTION */}
      <View style={styles.postAction}>
        {actionItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            style={styles.postActionItem}>
            <Text>{item.title}</Text>
            <Text>{item.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Divider />

      {/* BOTTOM SECTION */}
      <View style={styles.bottomSection}>
        {profileItems.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={item.onPress}
              style={styles.bottomSectionItem}>
              {item.icon}
              <Text>{item.title}</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        ))}
      </View>
    </Container>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  topSectionRight: {
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  postAction: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  postActionItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    backgroundColor: 'white',
  },

  bottomSection: {
    flex: 1,
  },

  bottomSectionItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
