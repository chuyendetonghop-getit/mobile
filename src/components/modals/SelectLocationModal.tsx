import Geolocation from '@react-native-community/geolocation';
import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Icon, MD3Colors, Searchbar, Text} from 'react-native-paper';

import {autoCompleteLocation, reverseGeocode} from 'api/locationApi';
import Header from 'components/Header';
import useDebounce from 'hooks/useDebounce';
import {setAppLocation, setAppRadius} from 'redux/slices/profile.slice';
import {useAppDispatch, useAppSelector} from 'redux/store';
import {appWidth} from 'themes/spacing';
import {TLocation} from 'types/location.type';
import {MAX_RADIUS, MIN_RADIUS, RADIUS_STEP} from 'utils/constant';
import RootModal, {BaseModalComponentProps} from './RootModal';

type Props = BaseModalComponentProps & {
  // onSelectLocation: (location: number) => void;
  dismissable: boolean;
};

const SelectLocationModal = ({dismissable, onDismiss, visible}: Props) => {
  const userLocation = useAppSelector(state => state.profile.location);
  const userRadius = useAppSelector(state => state.profile.radius);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const [dataLocation, setdataLocation] = useState<TLocation[]>([]);
  const [radius, setRadius] = useState<number>(userRadius);

  const dispatch = useAppDispatch();

  const onGetCurrenLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('--->', position);
        reverseGeocode(
          position.coords.latitude,
          position.coords.longitude,
        ).then(data => {
          console.log('reverseGeocode ->', data);
          setdataLocation([data]);
        });
        // setLocation(position);
      },
      error => {
        console.log('Error =>', error.code, error.message);
      },
    );
  };

  const onPressLocation = (location: TLocation) => {
    console.log('onPressLocation =>>', location);
    setSearchQuery('');
    dispatch(setAppLocation(location));
    // onDismiss();
    setdataLocation([]);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const data = await autoCompleteLocation(debouncedSearchTerm, 15);
      setdataLocation(data);
    };

    debouncedSearchTerm && fetchLocation();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    return () => {
      setdataLocation([]);
    };
  }, []);

  return (
    <RootModal
      visible={visible}
      onDismiss={onDismiss}
      style={styles.rootStyle}
      contentContainerStyle={styles.contentContainer}>
      <Header
        hasBackButton={dismissable}
        headerTitle="Khu vực và phạm vi của bạn"
        onTailDone={userLocation ? onDismiss : undefined}
      />

      <View style={styles.wrapperLocationRadius}>
        <View style={styles.wrapperShowLocation}>
          <Text style={styles.wrapperShowLocationText}>
            Vị trí hiện tại:{' '}
            <Text>
              {userLocation?.display_name
                ? userLocation.display_name
                : 'Chưa xác định'}
            </Text>
          </Text>
        </View>

        <Text style={styles.wrapperShowRadiusText}>
          Phạm vi hiển thị:
          <Text> {radius}km</Text>
        </Text>
        <View style={styles.wrapperRadiusSlider}>
          <Text>5km</Text>
          <Slider
            style={styles.radiusSlider}
            value={radius}
            minimumValue={MIN_RADIUS}
            maximumValue={MAX_RADIUS}
            step={RADIUS_STEP}
            minimumTrackTintColor={MD3Colors.primary60}
            maximumTrackTintColor="#000000"
            onSlidingComplete={value => {
              setRadius(value);
              dispatch(setAppRadius(value));
            }}
          />
          <Text>50km</Text>
        </View>
      </View>

      <Divider horizontalInset />

      <View style={styles.wrapSearchbar}>
        <Searchbar
          placeholder="Tìm bằng tên quận, huyện"
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode="bar"
          style={styles.searchbar}
        />
      </View>

      <View style={styles.wrapUseLocation}>
        <TouchableOpacity
          style={styles.useLocation}
          onPress={onGetCurrenLocation}>
          <Icon source="crosshairs-gps" color={MD3Colors.primary80} size={20} />
          <Text>Sử dụng vị trí hiện tại</Text>
        </TouchableOpacity>
      </View>

      {/* <Divider horizontalInset /> */}

      <FlatList
        data={dataLocation}
        // data={fakeLocations}
        style={{}}
        contentContainerStyle={styles.wrapLocation}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.osm_id}
            style={styles.location}
            onPress={() => onPressLocation(item)}>
            <Text>{item.display_name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyLocationText}>
            Không có dữ liệu. Hãy nhập và tìm kiếm
          </Text>
        }
      />
    </RootModal>
  );
};

export default SelectLocationModal;

const styles = StyleSheet.create({
  rootStyle: {
    // backgroundColor: 'red',
  },
  contentContainer: {
    flex: 1,
    width: appWidth,
    padding: 0,
    // backgroundColor: 'transparent',
  },
  wrapperLocationRadius: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    paddingHorizontal: 16,
    // alignItems: 'center',
    // marginVertical: 16,
  },
  wrapperShowLocation: {
    marginVertical: 16,
  },
  wrapperShowLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapperShowRadiusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapperRadiusSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 16,
  },
  radiusSlider: {
    width: appWidth - 100,
    height: 40,
  },
  wrapSearchbar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  searchbar: {
    width: appWidth - 32,
    justifyContent: 'center',
    // height: 40,
    alignItems: 'center',
  },
  wrapUseLocation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  useLocation: {
    width: appWidth - 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,

    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
  },
  wrapLocation: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  location: {
    // height: 48,
    paddingVertical: 16,

    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  emptyLocationText: {textAlign: 'center'},
});
