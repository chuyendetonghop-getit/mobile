import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Divider, Icon, MD3Colors, Text} from 'react-native-paper';

import Container from 'components/Container';
import {signOut} from 'redux/slices/auth.slice';
import {signOutProfile} from 'redux/slices/profile.slice';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {DEFAULT_AVATAR} from 'utils/constant';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';

const MeScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth?.user);

  const profileItems = useMemo(() => {
    return [
      {
        title: 'Quản lý bài đăng',
        icon: (
          <Icon source="onepassword" color={MD3Colors.primary50} size={20} />
        ),
        onPress: () => {
          navigate(RouteName.MANAGER_POST);
        },
      },
      {
        title: 'Cập nhật thông tin',
        icon: (
          <Icon
            source="information-outline"
            color={MD3Colors.primary50}
            size={20}
          />
        ),
        onPress: () => {
          navigate(RouteName.UPDATE_PROFILE);
        },
      },
      {
        title: 'Đăng xuất',
        icon: <Icon source="logout" color={MD3Colors.primary50} size={20} />,
        onPress: () => {
          dispatch(signOut());
          dispatch(signOutProfile());
        },
      },
    ];
  }, [dispatch]);

  return (
    <Container style={styles.container}>
      {/* TOP SECTION */}
      <View style={styles.topSection}>
        <Avatar.Image
          size={64}
          source={
            user?.avatar
              ? {
                  uri: user?.avatar,
                }
              : DEFAULT_AVATAR
          }
        />
        <View style={styles.topSectionRight}>
          <Text style={styles.name}>{user?.name}</Text>
          {user?.email ? <Text>{user?.email}</Text> : null}
          <Text>{user?.phone}</Text>
          <Text>{user?.geoLocation?.location?.displayName}</Text>
        </View>
      </View>

      <Divider />

      {/* POST SECTION */}
      {/* <View style={styles.postAction}>
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

      <Divider /> */}

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
