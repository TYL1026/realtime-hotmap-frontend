export type GeoJsonData = {
    type: "FeatureCollection";
    crs: {
      type: string;
      properties: {
        name: string;
      }
    };
    features: {
      type: "Feature";
      properties: {
        id: string;
        time: number;
        felt: null;
        tsunami: number;
      }
      geometry: {
        type: "Point";
        coordinates: number[];
      }
    }[];
  };