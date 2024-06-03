import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  Avatar,
  Divider,
  Icon,
  IconButton,
  MD2Colors,
  MD3Colors,
  Text,
} from 'react-native-paper';
// @ts-ignore
import {SliderBox} from 'react-native-image-slider-box';
import ImageView from 'react-native-image-viewing';

import {useGetDetailPostQuery} from 'api/post.api';
import Container from 'components/Container';
import PostAction from 'components/PostAction';
import moment from 'moment';
import {DetailPostScreenProps} from 'navigation/NavigationProps';
import {goBack} from 'navigation/NavigationUtils';
import {formatWithMask} from 'react-native-mask-input';
import {DEFAULT_AVATAR} from 'utils/constant';
import {VNDMask} from './BottomTabs/PostScreen';

import 'moment/locale/vi';
import OutsidePressHandler from 'react-native-outside-press';
import {useAppSelector} from 'redux/store';
import {appWidth} from 'themes/spacing';
import useIsFirstRender from 'hooks/useIsFirstRender';
import ReportModal from 'components/modals/ReportModal';

moment.locale('vi');

const images = [
  'https://source.unsplash.com/1024x768/?nature',
  'https://source.unsplash.com/1024x768/?water',
  'https://source.unsplash.com/1024x768/?animal',
  'https://source.unsplash.com/1024x768/?tree',
];

const DetailPostScreen = (props: DetailPostScreenProps) => {
  const user = useAppSelector(state => state.auth?.user);
  const location = user?.geoLocation?.location;

  const [visible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const [isShowMoreAction, setIsShowMoreAction] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const postId = props.route.params.postId;

  const isFirstRender = useIsFirstRender();
  const navigation = props.navigation;

  console.log('Detail Post with ID:', postId);

  const {
    data: postDetail,
    isLoading,
    error,
    refetch,
  } = useGetDetailPostQuery(
    {
      postId,
      lon: location?.coordinates[0] ?? 0,
      lat: location?.coordinates[1] ?? 0,
    },
    {
      // skip: skip,
      refetchOnMountOrArgChange: true,
    },
  );

  const postData = postDetail?.data;

  const {masked, unmasked, obfuscated} = formatWithMask({
    text: postData?.price.toString(),
    mask: VNDMask,
  });

  // compare authorId with userId to determine if the user is the author of the post
  // compare once when the component is mounted

  const isAuthor = useMemo(() => {
    return postData?.author?._id === user?._id;
  }, [postData?.author?._id, user?._id]);

  useEffect(() => {
    // force refetch when the screen is focused from goBack() navigation

    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Focused!', isFirstRender);
      if (!isFirstRender) {
        console.log('Refetching...');
        refetch();
      }
    });

    return unsubscribe;
  }, [navigation, refetch, isFirstRender]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
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

            {!isAuthor ? (
              <>
                <TouchableOpacity
                  onPress={() => setIsShowMoreAction(!isShowMoreAction)}
                  style={{
                    padding: 4,
                    // backgroundColor: 'rgba(0,0,0,0.3)',
                  }}>
                  <Icon source="dots-vertical" color="#FFFFFF" size={32} />
                  {isShowMoreAction ? (
                    <OutsidePressHandler
                      onOutsidePress={() => {
                        console.log('Pressed outside the box!');
                        setIsShowMoreAction(false);
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'white',
                          borderRadius: 8,
                          padding: 8,

                          width: 90,

                          // shadow
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // padding: 8,
                          }}
                          onPress={() => {
                            setIsShowMoreAction(false);
                            // report
                            setIsReportModalVisible(true);
                          }}>
                          <Icon
                            source={'flag'}
                            color={MD3Colors.primary50}
                            size={20}
                          />
                          <Text style={[]}>Báo cáo</Text>
                          <Divider />
                        </TouchableOpacity>
                      </View>
                    </OutsidePressHandler>
                  ) : null}
                </TouchableOpacity>
              </>
            ) : null}
          </LinearGradient>

          {/* ---------------- */}
          <ScrollView style={styles.mainContent}>
            <SliderBox
              images={postData?.images ? postData?.images : images}
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
                <Text variant="titleLarge">{postData?.title}</Text>
                <Text variant="titleMedium" style={styles.price}>
                  {masked} đ
                </Text>
                <Text variant="bodyMedium">
                  {moment(postData?.createdAt).fromNow()}
                </Text>
              </View>

              <Divider />

              {/* address - category */}
              <View style={styles.section}>
                <View style={styles.sectionTwo}>
                  <Icon
                    source={postData?.category.cat_icon}
                    color={'black'}
                    size={16}
                  />
                  <Text variant="bodyMedium">
                    {postData?.category.cat_name}
                  </Text>
                </View>

                <View style={styles.sectionTwo}>
                  <Icon
                    source={'map-marker-radius-outline'}
                    color={'black'}
                    size={16}
                  />

                  <Text>
                    {postData?.distance === 0
                      ? 0.01
                      : postData?.distance?.toFixed(2)}{' '}
                    km
                  </Text>
                  <Text style={styles.dotDivider}>•</Text>
                  <Text
                    variant="bodyMedium"
                    style={styles.location}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {postData?.location?.displayName ?? 'Unknow location'}
                  </Text>
                </View>
              </View>

              <Divider />

              {/* post author */}
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.section, styles.author]}>
                <Avatar.Image
                  size={64}
                  source={
                    postData?.author?.avatar
                      ? {
                          uri: postData?.author.avatar,
                        }
                      : DEFAULT_AVATAR
                  }
                />
                <View>
                  <Text variant="titleMedium">
                    {postData?.author?.name ?? 'Unknow 123'}
                  </Text>
                  <Text variant="bodyMedium">
                    Đã tham gia {moment(postData?.author?.createdAt).fromNow()}
                  </Text>
                </View>
              </TouchableOpacity>

              <Divider />

              {/* post description */}
              <View style={[styles.section]}>
                <Text variant="bodyMedium">{postData?.description}</Text>
              </View>
            </Container>
          </ScrollView>

          {/* sticky actions */}
          <PostAction
            phone={postData?.author?.phone as string}
            authorId={postData?.author?._id as string}
            postTitle={postData?.title as string}
            postId={postData?._id as string}
            isAuthor={isAuthor}
          />

          <ImageView
            images={(postData?.images ? postData?.images : images).map(
              item => ({
                uri: item,
              }),
            )}
            imageIndex={currentImage}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />

          {/* ------ report modal ------ */}

          <ReportModal
            visible={isReportModalVisible}
            onDismiss={() => {
              setIsReportModalVisible(false);
            }}
            postId={postData?._id as string}
          />
        </>
      )}
    </View>
  );
};

export default DetailPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: 10,
    height: 10,
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
  price: {
    color: 'red',
    fontWeight: 'bold',
  },
  location: {
    color: MD2Colors.grey800,
    width: appWidth - 140,
  },
  dotDivider: {
    color: MD2Colors.grey400,
    fontSize: 10,
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
