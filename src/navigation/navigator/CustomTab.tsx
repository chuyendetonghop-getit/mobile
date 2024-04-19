import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper'; // Import IconButton từ thư viện react-native-paper

function CustomTab({state, descriptors, navigation}: BottomTabBarProps) {
  const theme = useTheme(); // Sử dụng theme của React Native Paper

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
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

        // Định nghĩa icon cho từng tab dựa trên route.name
        let iconName: string;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;

          case 'Post':
            iconName = 'plus-circle';
            break;

          case 'Chat':
            iconName = 'chat';
            break;

          case 'Me':
            iconName = 'account';
            break;

          default:
            iconName = '';
            break;
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <IconButton
              icon={iconName}
              color={isFocused ? theme.colors.primary : theme.colors.text}
              size={24}
            />
            <Text
              style={{
                color: isFocused ? theme.colors.primary : theme.colors.text,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTab;
