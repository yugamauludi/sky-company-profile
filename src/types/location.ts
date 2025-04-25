import { LatLngTuple } from "leaflet";

export interface Location {
  name: string;
  position: LatLngTuple;
  address: string;
  code: string;
}