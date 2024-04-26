import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Avatar,
  Divider,
  Icon,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';
// @ts-ignore
import {SliderBox} from 'react-native-image-slider-box';
import ImageView from 'react-native-image-viewing';

import Container from '../components/Container';
import {DetailPostScreenProps} from '../navigation/NavigationProps';
import {goBack} from '../navigation/NavigationUtils';
import {category} from '../utils/category';
import {DEFAULT_AVATAR} from '../utils/constant';
import PostAction from '../components/PostAction';

const images = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?animal',
  'https://source.unsplash.com/1024x768/?tree',
];

const fakePosts = {
  id: 2,
  title: 'Bài viết 2',
  description:
    'Ipsum dolor sit amet, consectetur adipiscing elit. Ipsum dolor sit amet, consectetur adipiscing elit. Ipsum dolor sit amet, consectetur adipiscing elit. Ipsum dolor sit amet, consectetur adipiscing elit. Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.Ipsum dolor sit amet, consectetur adipiscing elit.----',
  category: category[0],
  address: 'An Khanh, Hoai Duc, Ha Noi',
  time: '1 giờ trước',
  price: '1.000.000 đ',
  image: 'https://picsum.photos/200/300',
  author: {
    id: 1,
    name: 'Nguyen Van A',
    avatar: DEFAULT_AVATAR,
    sold: 100,
    phone: '0123456789',
  },
};

const DetailPostScreen = (props: DetailPostScreenProps) => {
  const [visible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const postId = props.route.params.postId;

  console.log('Detail Post with ID:', postId);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0)',
        ]}
        style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#FFFFFF"
          size={32}
          onPress={() => goBack()}
        />

        <IconButton
          icon="dots-vertical"
          iconColor="#FFFFFF"
          size={32}
          onPress={() => console.log('More action')}
        />
      </LinearGradient>

      {/* ---------------- */}
      <ScrollView style={styles.mainContent}>
        <SliderBox
          images={images}
          sliderBoxHeight={300}
          onCurrentImagePressed={(index: any) => {
            console.log(`image ${index} pressed`);
            setCurrentImage(index);
            setIsVisible(true);
          }}
          dotColor="#FFF"
          inactiveDotColor="rgba(0,0,0,0.5)"
          dotStyle={styles.dots}
        />
        <Container style={styles.container} scrollable>
          {/* title - price - time */}
          <View style={styles.section}>
            <Text variant="titleLarge">{fakePosts.title}</Text>
            <Text variant="titleMedium">{fakePosts.price}</Text>
            <Text variant="bodyMedium">{fakePosts.time}</Text>
          </View>

          <Divider />

          {/* address - category */}
          <View style={styles.section}>
            <View style={styles.sectionTwo}>
              <Icon
                source={'map-marker-radius-outline'}
                color={'black'}
                size={16}
              />
              <Text variant="bodyMedium">{fakePosts.address}</Text>
            </View>

            <View style={styles.sectionTwo}>
              <Icon
                source={fakePosts.category.cat_icon}
                color={'black'}
                size={16}
              />
              <Text variant="bodyMedium">{fakePosts.category.cat_name}</Text>
            </View>
          </View>

          <Divider />

          {/* post author */}
          <TouchableOpacity style={[styles.section, styles.author]}>
            <Avatar.Image size={64} source={fakePosts.author.avatar} />
            <View>
              <Text variant="titleMedium">{fakePosts.author.name}</Text>
              <Text variant="bodyMedium">Da ban: {fakePosts.author.sold}</Text>
            </View>
          </TouchableOpacity>

          <Divider />

          {/* post description */}
          <View style={[styles.section]}>
            <Text variant="bodyMedium">{fakePosts.description}</Text>
          </View>
        </Container>
      </ScrollView>

      {/* sticky actions */}
      <PostAction
        phone={fakePosts.author.phone}
        authorId={fakePosts.author.id}
      />

      <ImageView
        images={images.map(item => ({uri: item}))}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default DetailPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    paddingTop: 0,
    paddingBottom: 32,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    height: 64,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  dots: {
    width: 12,
    height: 12,
    borderRadius: 100,
    marginHorizontal: 10,
    padding: 0,
    margin: 0,
    borderWidth: 1,
    borderColor: MD3Colors.neutralVariant90,
  },

  section: {
    paddingVertical: 16,
  },
  sectionTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actions: {
    height: 64,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F4CE14',
    // padding: 10,
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingVertical: 16,
  },
});
