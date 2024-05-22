import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Appbar, MD3Colors, Searchbar, Text} from 'react-native-paper';

import Container from 'components/Container';
import Conversation from 'components/chats/Conversation';

const fakeMessageLists = [
  {
    id: 1,
    name: 'Nguyen Van A',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Nguyen Van B',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'Nguyen Van C',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    name: 'Nguyen Van D',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    name: 'Nguyen Van E',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    name: 'Nguyen Van F',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    name: 'Nguyen Van G',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    name: 'Nguyen Van H',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    name: 'Nguyen Van I',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    name: 'Nguyen Van K',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 11,
    name: 'Nguyen Van L',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 12,
    name: 'Nguyen Van M',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },

  {
    id: 13,
    name: 'Nguyen Van N',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 14,
    name: 'Nguyen Van O',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },

  {
    id: 15,
    name: 'Nguyen Van P',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 16,
    name: 'Nguyen Van Q',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 17,
    name: 'Nguyen Van R',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 18,
    name: 'Nguyen Van S',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',

    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 19,
    name: 'Nguyen Van T',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',

    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
  {
    id: 20,
    name: 'Nguyen Van U',
    postTitle: 'Bán xe máy Honda 67',
    message: 'Xin giá và hình ảnh sản phẩm',
    time: '22 tháng 3',
    avatar: 'https://picsum.photos/200/300',
    postImage: 'https://picsum.photos/200/300',
  },
];

const ChatScreen = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const _handleSearch = () => {
    console.log('Searching');
    setIsSearching(!isSearching);
  };

  const _handleMore = () => console.log('Shown more');
  return (
    <View style={styles.wrapper}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Trang tin nhắn" titleStyle={styles.titleStyle} />
      </Appbar.Header>
      <Container style={styles.container}>
        <Searchbar
          placeholder="Tìm kiếm tin nhắn"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.inputSearchbar}
        />
        <FlatList
          data={fakeMessageLists.filter(item => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
          })}
          keyExtractor={(item, index) => index.toString()}
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
          renderItem={({item, index}) => (
            // <TouchableOpacity key={index} style={styles.listItem}>
            //   <View style={styles.itemLeft}>
            //     <Image
            //       source={{
            //         uri: item.avatar,
            //       }}
            //       style={styles.itemLeftImage}
            //     />

            //     <View>
            //       <View style={styles.userWithTime}>
            //         <Text>{item.name}</Text>
            //         <Text> - </Text>
            //         <Text style={styles.textTime}>{item.time}</Text>
            //       </View>
            //       <Text style={styles.textPostTitle}>{item.postTitle}</Text>
            //       <Text style={styles.textMessage}>{item.message}</Text>
            //     </View>
            //   </View>

            //   <Image
            //     source={{
            //       uri: item.postImage,
            //     }}
            //     style={styles.imageRight}
            //   />
            // </TouchableOpacity>
            <Conversation
              key={item?.id}
              id={item?.id}
              name={item?.name}
              postTitle={item?.postTitle}
              message={item?.message}
              time={item?.time}
              avatar={item?.avatar}
              postImage={item?.postImage}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.textEmpty}>Không có tin nhắn</Text>
          }
        />
        {/* <View
          style={{
            height: 16,
            marginBottom: 16,
            backgroundColor: 'transparent',
          }}
        /> */}
      </Container>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'red',
  },
  header: {
    height: 48,
    // backgroundColor: 'red',
    paddingHorizontal: 0,
  },
  titleStyle: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    // backgroundColor: 'green',
    paddingTop: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  searchbar: {
    // width: '70%',
    height: 36,
    borderColor: 'lightblue',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 6,
  },
  inputSearchbar: {
    minHeight: 0,
    // backgroundColor: MD3Colors.neutralVariant10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    padding: 0,
  },
  listStyle: {
    // marginTop: 0,
    // paddingTop: 0,
    // backgroundColor: 'pink',
    paddingBottom: 23,
  },
  listContainerStyle: {
    marginTop: 10,
    paddingBottom: 16,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 16,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    // paddingVertical: 8,
    paddingBottom: 8,

    borderBottomWidth: 0.2,
    // borderTopWidth: 0.2,
    borderBottomColor: MD3Colors.neutralVariant10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeftImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  userWithTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTime: {
    color: MD3Colors.neutralVariant80,
  },
  textPostTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: MD3Colors.neutralVariant60,
  },
  textMessage: {
    fontSize: 12,
    color: MD3Colors.neutralVariant70,
  },
  imageRight: {
    width: 48,
    height: 48,
    borderRadius: 8,
    // marginRight: 16,
  },
  textEmpty: {
    textAlign: 'center',
  },
});
