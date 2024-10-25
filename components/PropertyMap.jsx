"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map, { Marker } from "react-map-gl";

import Spinner from "./Spinner";

import pin from "@/assets/images/pin.svg";

import "mapbox-gl/dist/mapbox-gl.css";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;

        const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
          address
        )}&proximity=ip&access_token=${mapboxToken}`;

        const res = await fetch(url);

        const data = await res.json();

        if (!data.features && data.features.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const [longitude, latitude] = data.features[0].geometry.coordinates;

        setLat(latitude);
        setLng(longitude);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
