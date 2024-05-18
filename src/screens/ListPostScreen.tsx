import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react';
import {
  DrawerLayoutAndroid,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Divider,
  IconButton,
  MD3Colors,
  Button as PaperButton,
  Searchbar,
  Text,
} from 'react-native-paper';

import {useGetPostsQuery} from 'api/post.api';
import Header from 'components/Header';
import Post from 'components/Post';
import Section from 'components/Section';
import useDebounce from 'hooks/useDebounce';
import {ListPostScreenProps} from 'navigation/NavigationProps';
import {useAppSelector} from 'redux/store';
import {appWidth} from 'themes/spacing';
import {GetListPostParams, TPost} from 'types/post.type';
import {category} from 'utils/category';
import {MAX_RADIUS, MIN_RADIUS, RADIUS_STEP} from 'utils/constant';
import {EListPostScreenTypes} from 'utils/enum';
import {statusPost} from 'utils/statusPost';

const ListPostScreen = (props: ListPostScreenProps) => {
  const {initMode, categoryId: categoryParamId} = props.route.params;

  const user = useAppSelector(state => state.auth.user);

  const [skip, setSkip] = useState(
    initMode === EListPostScreenTypes.SEARCH ? true : false,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const [posts, setPosts] = useState<TPost[]>([]);

  const [params, setParams] = useState<GetListPostParams>({
    lon: user?.geoLocation?.location?.coordinates[0] ?? 0,
    lat: user?.geoLocation?.location?.coordinates[1] ?? 0,
    radius: user?.geoLocation?.radius ?? MIN_RADIUS,
    page: 1,
    limit: 10,
    title: '',
    categoryId: categoryParamId ?? '',
    statusId: '',
  });

  const updateParams = (newParams: Partial<GetListPostParams>) => {
    setParams(pre => {
      return {
        ...pre,
        ...newParams,
      };
    });
  };

  const {
    data: postsData,
    isLoading,
    error,
  } = useGetPostsQuery(params, {
    skip: skip,
    refetchOnMountOrArgChange: true,
  });

  const drawer = useRef<DrawerLayoutAndroid>(null);

  const openDrawer = () => {
    drawer.current?.openDrawer();
  };

  const closeDrawer = () => {
    drawer.current?.closeDrawer();
  };

  const navigationView = () => (
    <View style={[styles.containerDrawer, styles.navigationContainer]}>
      <Text style={styles.paragraph}>Bộ lọc tìm kiếm </Text>

      <Section>
        <Text>Chọn bán kính: {params.radius}km</Text>
        <View style={styles.wrapperRadiusSlider}>
          <Text>5km</Text>
          <Slider
            style={styles.radiusSlider}
            value={params.radius}
            minimumValue={MIN_RADIUS}
            maximumValue={MAX_RADIUS}
            step={RADIUS_STEP}
            minimumTrackTintColor={MD3Colors.primary60}
            maximumTrackTintColor="#000000"
            onSlidingComplete={radiusValue => {
              updateParams({radius: radiusValue});
            }}
          />
          <Text>50km</Text>
        </View>
      </Section>

      <Divider />

      <Section>
        <Text>Chọn danh mục</Text>
        <View style={styles.category}>
          {category.map(item => (
            <PaperButton
              key={item.cat_id}
              icon={item.cat_icon}
              mode={
                item.cat_id === params.categoryId ? 'contained' : 'outlined'
              }
              style={styles.categoryItem}
              labelStyle={styles.categoryItemText}
              onPress={() => {
                if (item.cat_id === params.categoryId) {
                  updateParams({categoryId: ''});
                  return;
                }
                console.log('Pressed category', item.cat_id);
                updateParams({categoryId: item.cat_id});
              }}>
              {item.cat_name}
            </PaperButton>
          ))}
        </View>
      </Section>

      <Divider />

      <Section>
        <Text>Chọn trạng thái</Text>
        <View style={styles.status}>
          {statusPost.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.statusItem,
                  {
                    backgroundColor:
                      item.id === params.statusId
                        ? MD3Colors.primary60
                        : 'white',
                  },
                ]}
                onPress={() => {
                  if (item.id === params.statusId) {
                    updateParams({statusId: ''});
                    return;
                  }
                  console.log('Pressed status', item.id);
                  updateParams({statusId: item.id});
                }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
      {/* <Button title="Close drawer" onPress={closeDrawer} /> */}
      <PaperButton
        mode="contained"
        onPress={closeDrawer}
        style={styles.closeDrawer}>
        <Text variant="bodyMedium" style={styles.closeDrawerText}>
          Đóng
        </Text>
      </PaperButton>
    </View>
  );

  //   console.log('INIT MODE', initMode, skip);

  useEffect(() => {
    // debouncedSearchTerm will be updated after 500ms in both two modes
    updateParams({title: debouncedSearchTerm});
  }, [debouncedSearchTerm]);

  useEffect(() => {
    // SEARCH MODE
    if (
      initMode === EListPostScreenTypes.SEARCH &&
      debouncedSearchTerm === ''
    ) {
      setSkip(true);
    }
    // update skip to false when user enter search text in searchbar
    if (debouncedSearchTerm !== '') {
      //   console.log('Set skip false');
      setSkip(false);
    }
  }, [debouncedSearchTerm, initMode, params.title]);

  useEffect(() => {
    setPosts(pre => {
      return postsData ? postsData.data.docs : [];
    });
    if (postsData) {
    }
  }, [postsData]);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      onDrawerOpen={() => console.log('Drawer is open')}
      onDrawerClose={() => console.log('Drawer is closed')}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Header
          style={styles.header}
          hasBackButton={true}
          headerTitle="Danh sách bài đăng"
          tail={
            <View style={styles.iconFilterWrapper}>
              <IconButton
                icon="filter"
                iconColor={MD3Colors.primary50}
                size={26}
                onPress={openDrawer}
              />
            </View>
          }
        />

        <View style={styles.content}>
          <Searchbar
            placeholder="Tìm kiếm bài đăng"
            // onChangeText={text => updateParams({title: text})}
            onChangeText={setSearchQuery}
            onClearIconPress={() => {
              setSearchQuery(pre => '');
              if (initMode === EListPostScreenTypes.SEARCH) {
                console.log('Clear search', initMode);
                setPosts([]);
              }
            }}
            value={searchQuery}
            // value={params.title ?? ''}
            style={styles.searchbar}
            inputStyle={styles.inputSearchbar}
          />

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              //   data={postsData?.data?.docs}
              data={posts}
              keyExtractor={(item, index) => item._id || index.toString()}
              style={styles.listStyle}
              contentContainerStyle={styles.listContainerStyle}
              ListEmptyComponent={() => (
                <Text style={styles.listEmtpy}>Không có bài đăng</Text>
              )}
              renderItem={({item}) => (
                <View key={item._id}>
                  <Post {...(item as any)} />
                  <Divider />
                </View>
              )}
            />
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default ListPostScreen;

const styles = StyleSheet.create({
  containerDrawer: {
    flex: 1,
    // backgroundColor: 'yellow',
    backgroundColor: 'white',
    padding: 16,
  },
  navigationContainer: {
    // backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 0,
  },
  iconFilterWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    // backgroundColor: 'pink',
    paddingHorizontal: 16,
  },
  searchbar: {
    height: 36,
    // borderColor: 'lightblue',
    borderWidth: 1,
    // backgroundColor: 'red',
    marginVertical: 16,
  },
  inputSearchbar: {
    minHeight: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    padding: 0,
  },
  listStyle: {
    // backgroundColor: 'purple',
  },
  listContainerStyle: {
    marginTop: 10,
    paddingBottom: 16,
    gap: 8,
  },
  listEmtpy: {
    textAlign: 'center',
  },

  //   Drawer
  wrapperRadiusSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 16,
  },
  radiusSlider: {
    width: appWidth - 200,
    height: 40,
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    marginVertical: 4,
    padding: 0,
    width: 130,
    // backgroundColor: 'red',
  },
  categoryItemText: {
    fontSize: 12,
  },
  status: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderBlockColor: MD3Colors.primary60,
  },
  closeDrawer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  closeDrawerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
