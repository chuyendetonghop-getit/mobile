import {
  ResponseLocationIQAutoComplete,
  ResponseLocationIQReverse,
} from '../types/location.type';

const LOCATIONIQ_API_KEY = 'pk.02924aa63c27c428ca83b23d2a886c94';

export const reverseGeocode = async (latitude: number, longitude: number) => {
  const options = {method: 'GET', headers: {accept: 'application/json'}};

  const response = await fetch(
    `https://us1.locationiq.com/v1/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=vi&normalizeaddress=1&key=${LOCATIONIQ_API_KEY}`,
    options,
  );
  const data = (await response.json()) as ResponseLocationIQReverse;
  return data;
};

export const autoCompleteLocation = async (query: string, limit?: number) => {
  const options = {method: 'GET', headers: {accept: 'application/json'}};

  limit = limit ? limit : 15; // if limit is undefined, set it to 15

  const enCodedQuery = encodeURIComponent(query);

  const response = await fetch(
    `https://us1.locationiq.com/v1/autocomplete?q=${enCodedQuery}&countrycodes=vn&limit=${limit}&accept-language=vi&key=${LOCATIONIQ_API_KEY}`,
    options,
  );
  const data = (await response.json()) as ResponseLocationIQAutoComplete[];
  return data;
};
