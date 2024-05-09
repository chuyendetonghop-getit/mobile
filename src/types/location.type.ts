export interface ResponseLocationIQReverse {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: AddressIQReverse;
  boundingbox: string[];
}

export interface AddressIQReverse {
  suburb: string;
  city: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface ResponseLocationIQAutoComplete {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: AddressIQAutoComplete;
}

export interface AddressIQAutoComplete {
  name: string;
  city: string;
  country: string;
  country_code: string;
}

export type TLocation =
  | ResponseLocationIQReverse
  | ResponseLocationIQAutoComplete;

export type TLocationPost = {
  lat: string;
  lon: string;
  address: string;
};
