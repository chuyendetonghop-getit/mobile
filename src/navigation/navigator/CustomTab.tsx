import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper'; // Import IconButton từ thư viện react-native-paper
import IconIoni from 'react-native-vector-icons/Ionicons';
import IconMetarialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteName from '../RouteName';

function CustomTab({state, descriptors, navigation}: BottomTabBarProps) {
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
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
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
          case RouteName.POST:
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
