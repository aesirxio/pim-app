import { csv } from 'd3-fetch';
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GeoChart = (props) => {
  const geoUrl =
    `/assets/data/continents/${props.continent}.json` ?? '/assets/data/continents/world.json';
  const [markers, setMarkers] = useState([]);
  const configContinent = {
    asia: {
      center: [90, 25],
      scale: 380,
    },
    europe: {
      center: [20, 50],
      scale: 800,
    },
    africa: {
      center: [20, 0],
      scale: 400,
    },
    na: {
      center: [-80, 40],
      scale: 400,
    },
    sa: {
      center: [-50, -20],
      scale: 400,
    },
    oceania: {
      center: [150, -30],
      scale: 600,
    },
  };
  useEffect(() => {
    csv('/assets/data/countries.csv').then((cities) => {
      const markerList = props.data.map((item) => {
        return {
          country_code: item.country_code,
          coordinates: [
            cities?.find((x) => x.country === item.country_code)?.longitude,
            cities?.find((x) => x.country === item.country_code)?.latitude,
          ],
        };
      });
      setMarkers(markerList);
    });
  }, [props.data]);

  return (
    <>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={props.continent && configContinent[props.continent]}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
            ))
          }
        </Geographies>
        {markers.map(({ country_code, coordinates }) => (
          <Marker key={country_code} coordinates={coordinates}>
            <circle r={8} fill="#1AB394" />
            <circle r={40} fill="#1AB39433" stroke="#1AB394" strokeWidth={1} />
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};

export default GeoChart;
