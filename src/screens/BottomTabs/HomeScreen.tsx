import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Chip, Divider, Icon, MD3Colors, Text} from 'react-native-paper';

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

const fakePosts = [
  {
    id: 1,
    title: 'Bài viết 1',
    description: 'Mô tả bài viết 1',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    title: 'Bài viết 2',
    description: 'Mô tả bài viết 2',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    title: 'Bài viết 3',
    description: 'Mô tả bài viết 3',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    title: 'Bài viết 4',
    description: 'Mô tả bài viết 4',
    address: 'An Khanh, Hoai Duc, Ha Noi',
    time: '1 giờ trước',
    price: '1.000.000 đ',
    image: 'https://picsum.photos/200/300',
  },
];

const HomeScreen = () => {
  const [showSelectLocationModal, setShowSelectLocationModal] = useState(false);

  const appGeoLocation = useAppSelector(state => state.auth?.user?.geoLocation);
  const appLocation = appGeoLocation?.location;
  const appRadius = appGeoLocation?.radius;

  useEffect(() => {
    if (!appLocation) {
      setShowSelectLocationModal(true);
    }
  }, [appLocation]);

  return (
    <Container style={styles.container} scrollable>
      <SelectLocationModal
        // visible={true}
        visible={showSelectLocationModal}
        dismissable={false}
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
            onPress={() => console.log('Pressed', item.cat_id)}
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
        {/* {fakePosts.map((post, index) => (
          <View key={index}>
            <Post key={index} {...post} />
            <Divider />
          </View>
        ))} */}
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
