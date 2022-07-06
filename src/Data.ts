export type TripLocation = {
  label: string,
  position: {
    lat: number,
    lng: number
  }
};

const createLocation = (label: string, lat: number, lng: number): TripLocation => ({
  label,
  position: { lat, lng }
});

const locations = [
  createLocation( 'Hotel', 51.49581846795866, -0.14527781537217113),
  createLocation('Dishoom Indian Restaurant', 51.50230656092459, -0.1910936957487884),
  createLocation('Bills Baker St Restaurant', 51.522711271149824, -0.1574081308247565),
  createLocation('Holy Carrot Restaurant', 51.50032940149353, -0.16006888190475116),
  createLocation('The British Museum', 51.519560151667314, -0.12689222891292457),
  createLocation('The London Eye', 51.50337021379988, -0.11952403260436825),
  createLocation('Westminster Abbey', 51.49945167380898, -0.1272798575675348),
  createLocation('Gods Own Junkyard', 51.5840959772808, -0.008227442405673727),
  createLocation('Tower of London Jewels and Beefeater Tour', 51.508453296203925, -0.07600761864814258),
  createLocation('Hyde Park', 51.507508514392526, -0.16585906018806182),
];

export {
  locations
};