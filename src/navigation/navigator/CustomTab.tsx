import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper'; // Import IconButton từ thư viện react-native-paper
import IconIoni from 'react-native-vector-icons/Ionicons';
import IconMetarialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteName from '../RouteName';
import {MAPPED_ROUTE_NAME} from '../../utils/constant';
import {EPostScreenTypes} from '../../utils/enum';

function CustomTab({state, navigation}: BottomTabBarProps) {
  const theme = useTheme(); // Sử dụng theme của React Native Paper

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}>
      {state.routes.map((route, index) => {
        const label = MAPPED_ROUTE_NAME[route.name as RouteName] || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The weird way to navigate to PostScreen
            if (route.name === RouteName.CLONE_POST) {
              navigation.navigate(RouteName.POST, {
                mode: EPostScreenTypes.CREATE,
              });
            } else {
              navigation.navigate(route.name, route.params);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let IconCpn: ReactNode = null;
        switch (route.name) {
          case RouteName.HOME:
            IconCpn = (
              <IconIoni
                name={isFocused ? 'home' : 'home-outline'}
                size={24}
                color={isFocused ? theme.colors.primary : 'black'}
              />
            );
            break;
          case RouteName.CLONE_POST:
            IconCpn = (
              <IconMetarialCommunity
                name={isFocused ? 'note-edit' : 'note-edit-outline'}
                size={24}
                color={isFocused ? theme.colors.primary : 'black'}
              />
            );
            break;
          case RouteName.CHAT:
            IconCpn = (
              <IconIoni
                name={isFocused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={24}
                color={isFocused ? theme.colors.primary : 'black'}
              />
            );
            break;
          case RouteName.ME:
            IconCpn = (
              <IconMetarialCommunity
                name={isFocused ? 'account' : 'account-outline'}
                size={24}
                color={isFocused ? theme.colors.primary : 'black'}
              />
            );
            break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}>
            {IconCpn}
            <Text
              style={{
                color: isFocused ? 'blue' : 'black',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default CustomTab;
