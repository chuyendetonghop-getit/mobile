import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';

import RootModal, {BaseModalComponentProps} from './RootModal';
import {citiesDataWithWard} from 'utils/citiesDataWithWard';
import {appHeight, appWidth} from 'themes/spacing';

type Props = BaseModalComponentProps & {
  onSelectLocation: (location: string) => void;
};

const LocationModal = ({onSelectLocation, onDismiss, visible}: Props) => {
  const [openCities, setOpenCities] = useState<{[key: string]: boolean}>({});
  const [openDistrict, setOpenDistrict] = useState<{[key: string]: boolean}>(
    {},
  );

  const [location, setLocation] = useState({
    city: '',
    district: '',
    ward: '',
  });

  const handleCityPress = (cityId: string) => {
    setOpenCities(prevState => ({
      ...prevState,
      [cityId]: !prevState[cityId],
    }));

    // set city name to location
    const city = citiesDataWithWard.find(cityX => cityX.id === cityId);
    setLocation(prevState => ({
      ...prevState,
      city: city?.name || '',
    }));
  };

  const handleDistrictPress = (districtId: string) => {
    setOpenDistrict(prevState => ({
      ...prevState,
      [districtId]: !prevState[districtId],
    }));

    // set district name to location
    const areas = citiesDataWithWard.map(city => city.area).flat();

    const districts = areas.map(area => Object.values(area));

    console.log('district', districts);
  };

  const renderWard = ({item: ward}: {item: any}) => (
    <>
      <Divider />
      <List.Item title={ward.name} titleStyle={{marginLeft: 32}} />
    </>
  );

  const renderDistrict = ({item: district}: {item: any}) => (
    <>
      <Divider />
      <List.Accordion
        title={district.name}
        expanded={openDistrict[district.id]}
        onPress={() => handleDistrictPress(district.id)}
        style={{
          height: 60,
        }}
        titleStyle={{
          marginLeft: 16,
          fontWeight: openDistrict[district.id] ? 'bold' : 'normal',
        }}>
        <FlashList
          data={district.wards}
          renderItem={renderWard}
          keyExtractor={ward => ward.id.toString()}
          estimatedItemSize={200}
        />
      </List.Accordion>
    </>
  );

  const renderCity = ({item: city}: {item: any}) => (
    <>
      <Divider />
      <List.Accordion
        title={city.name}
        expanded={openCities[city.id]}
        onPress={() => handleCityPress(city.id)}
        style={{
          width: appWidth - 64,
          height: 60,
        }}
        titleStyle={{
          marginLeft: 0,
          fontWeight: openCities[city.id] ? 'bold' : 'normal',
        }}>
        <FlashList
          data={Object.values(city.area)}
          renderItem={renderDistrict}
          keyExtractor={(district: any) => district.id.toString()}
          estimatedItemSize={64}
        />
      </List.Accordion>
    </>
  );

  return (
    <RootModal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalWrapper}>
      <View style={styles.container}>
        <Text style={styles.header} variant="bodyLarge">
          Chọn một địa phương
        </Text>
        <View
          style={{
            width: appWidth - 64,
            height: appHeight - 200,
            // backgroundColor: 'yellow',
            flex: 1,
          }}>
          <FlashList
            // contentContainerStyle={{backgroundColor: 'red'}}
            data={citiesDataWithWard}
            renderItem={renderCity}
            keyExtractor={city => city.id.toString()}
            estimatedItemSize={200}
          />
        </View>
      </View>
    </RootModal>
  );
};

export default LocationModal;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    // flex: 1,
    // width: '100%',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 10,
    // backgroundColor: 'pink',
    height: appHeight - 200,
  },
  modalWrapper: {
    width: appWidth - 32,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: (appWidth - 64) / 3 - 16,
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
});
