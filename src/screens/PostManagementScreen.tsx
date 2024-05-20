import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Divider,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';

import Container from 'components/Container';
import Header from 'components/Header';
import Section from 'components/Section';
import {useGetMyPostsQuery} from 'api/post.api';
import {useAppSelector} from 'redux/store';
import Post from 'components/Post';
import {PostManagementScreenProps} from 'navigation/NavigationProps';

const EmptyComponent = () => {
  return (
    <View>
      <Text style={styles.listEmtpy}>Không có bài đăng</Text>
    </View>
  );
};

const PostManagementScreen = (props: PostManagementScreenProps) => {
  const navigation = props.navigation;

  const user = useAppSelector(state => state.auth?.user);

  const {
    data: responeMyPost,
    error,
    isLoading,
    refetch,
  } = useGetMyPostsQuery(
    {
      userId: user?._id as string,
      page: 1,
      limit: 999999,
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    },
  );

  // I want to refetch data when user go back from DetailPostScreen or UpdatePostScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        hasBackButton={true}
        headerTitle="Quản lý bài đăng"
      />

      <Container style={styles.containerContent}>
        {/* <Section style={[]}>
          <IconButton
            icon="camera-plus"
            iconColor={MD3Colors.primary50}
            size={20}
          />
        </Section> */}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={responeMyPost?.data?.docs as any}
            keyExtractor={(item, index) => item._id || index.toString()}
            style={styles.listStyle}
            contentContainerStyle={styles.listContainerStyle}
            ListEmptyComponent={EmptyComponent}
            renderItem={({item}) => (
              <View key={item._id}>
                <Post {...item} isShowMore refetch={refetch} />
                <Divider />
              </View>
            )}
          />
        )}
      </Container>
    </View>
  );
};

export default PostManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 0,
  },
  containerContent: {
    // flex: 1,
    paddingTop: 0,
    // alignItems: 'center',
  },
  sectionWithoutPaddingTop: {
    paddingTop: 0,
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
});
