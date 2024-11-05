export default interface IPlane {
  name: string;
  cabin: {
    length: number;
    width: number;
    height: number;
    seats: number;
    beds: number;
  };
  speed: number;
  range: number;
  flown: number;
  baggage: number;
  crew: {
    pilots: number;
    attendants: number;
  };
  wifi: boolean;
  photos: {
    cover: string;
    layouts: string[];
    gallery: string[];
  };
}
