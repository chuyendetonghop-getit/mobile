import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ActivityIndicator,
  Chip,
  Divider,
  Icon,
  MD3Colors,
  Text,
} from 'react-native-paper';

import Container from 'components/Container';
import Post from 'components/Post';
import SelectLocationModal from 'components/modals/SelectLocationModal';
import {navigate} from 'navigation/NavigationUtils';
import RouteName from 'navigation/RouteName';
import {useAppSelector} from 'redux/store';
import {appWidth} from 'themes/spacing';
import {category} from 'utils/category';
import Section from 'components/Section';
import {ListPostScreenParams} from 'navigation/NavigationParams';
import {EListPostScreenTypes} from 'utils/enum';
import {useGetPostsQuery} from 'api/post.api';
import {MIN_RADIUS} from 'utils/constant';
import {HomeScreenProps} from 'navigation/NavigationProps';

const HomeScreen = (props: HomeScreenProps) => {
  const navigation = props.navigation;

  const [showSelectLocationModal, setShowSelectLocationModal] = useState(false);

  const appGeoLocation = useAppSelector(state => state.auth?.user?.geoLocation);
  const appLocation = appGeoLocation?.location;
  const appRadius = appGeoLocation?.radius;

  const {
    data: postsData,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(
    {
      lon: appLocation?.coordinates[0] ?? 0,
      lat: appLocation?.coordinates[1] ?? 0,
      radius: appRadius ?? MIN_RADIUS,
      limit: 5,
      page: 1,
    },
    {
      // skip: skip,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (!appLocation) {
      setShowSelectLocationModal(true);
    }
  }, [appLocation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={styles.container} scrollable>
      <SelectLocationModal
        // visible={true}
        visible={showSelectLocationModal}
        dismissable={!!appLocation?.coordinates}
        onDismiss={() => setShowSelectLocationModal(false)}
      />

      {/* Show current location */}
      <Chip
        icon="map-marker"
        mode="outlined"
        onPress={() => setShowSelectLocationModal(true)}
        style={styles.searchChip}>
        {/* {appLocation?.display_name ?? 'Chọn vị trí'} */}
        {
          // Show location
          appLocation && (
            <View style={styles.wrapperLocation}>
              <Text numberOfLines={1} style={styles.locationText}>
                {appLocation.displayName}
              </Text>
            </View>
          )
        }
        {
          // Show radius
          appLocation && <Text style={styles.radiusText}> {appRadius}km</Text>
        }
      </Chip>

      <Chip
        icon="magnify"
        mode="outlined"
        onPress={() => {
          navigate<ListPostScreenParams>(RouteName.LIST_POST, {
            initMode: EListPostScreenTypes.SEARCH,
          });
        }}
        style={styles.searchChip}>
        Tìm kiếm
      </Chip>

      {/* Categories section */}
      <ScrollView contentContainerStyle={styles.category} horizontal>
        {category.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log('Pressed', item.cat_id);
              navigate<ListPostScreenParams>(RouteName.LIST_POST, {
                initMode: EListPostScreenTypes.VIEW,
                categoryId: item.cat_id,
              });
            }}
            style={styles.categoryItem}>
            <Icon
              source={item.cat_icon}
              color={MD3Colors.neutralVariant80}
              size={48}
            />
            <Text numberOfLines={2} style={styles.categoryItemText}>
              {item.cat_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Divider />

      {/* Posts section */}
      <View>
        <Section style={styles.highlightPost}>
          <Text variant="bodyLarge" style={styles.postSectionHeader}>
            Bài đăng nổi bật
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate<ListPostScreenParams>(RouteName.LIST_POST, {
                initMode: EListPostScreenTypes.VIEW,
              });
            }}>
            <Text variant="bodySmall" style={styles.postSectionHeader}>
              xem tất cả
            </Text>
          </TouchableOpacity>
        </Section>
        {isLoading ? <ActivityIndicator /> : null}
        {postsData?.data?.docs
          ? postsData?.data?.docs?.map((post, index) => (
              <View key={index}>
                <Post key={index} {...(post as any)} />
                <Divider />
              </View>
            ))
          : null}
      </View>

      <View style={styles.paddingBottomComponent} />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchChip: {
    marginBottom: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 50,
  },
  locationText: {
    fontSize: 14,
    // color: MD3Colors.primary50,
    // backgroundColor: MD3Colors.primary50,
    width: appWidth - 120,
  },
  radiusText: {
    fontSize: 14,
    color: MD3Colors.primary50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'blue',
    gap: 10,
    marginVertical: 16,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: (appWidth - 32) / 3 - 16,
    marginVertical: 5,
    padding: 5,
    borderRadius: 8,
  },
  categoryItemText: {
    fontSize: 14,
    textAlign: 'center',
    width: (appWidth - 32) / 3 - 16,
    // backgroundColor: 'green',
  },

  highlightPost: {
    // backgroundColor: 'red',
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  postSectionHeader: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  paddingBottomComponent: {
    height: 32,
  },
});
