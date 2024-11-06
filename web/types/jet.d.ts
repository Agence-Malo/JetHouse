export default interface IJet {
  id: number;
  name: string;
  description?: string;
  brochure?: {
    url: string;
  };
  information: {
    cabin: {
      length: number;
      width: number;
      height: number;
    };
    speed: number;
    hours: number;
    crew: {
      pilots: number;
      attendants: number;
    };
    range: number;
    baggage: number;
    wifi?: boolean;
  };
  images: {
    listing: {
      alt: string;
      url: string;
      width: number;
      height: number;
    };
    hero: {
      alt: string;
      url: string;
      width: number;
      height: number;
    };
    cabin: {
      day: {
        seats: number;
        image: {
          alt: string;
          url: string;
          width: number;
          height: number;
        };
      };
      night: {
        beds: number;
        image: {
          alt: string;
          url: string;
          width: number;
          height: number;
        };
      };
    };
    gallery: {
      image: {
        alt: string;
        url: string;
        width: number;
        height: number;
      };
    }[];
  };
}
