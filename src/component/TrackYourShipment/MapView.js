import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";
import { io } from "socket.io-client";
import axios from "axios";

// Xóa các icon mặc định
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Tạo custom icon cho Marker
const customMarkerIcon = L.divIcon({
  html: renderToStaticMarkup(
    <FaMapMarkerAlt style={{ color: "red", fontSize: "24px" }} />
  ),
  className: "custom-icon",
  iconSize: [24, 24],
});

const MapView = ({ startLocation, endLocation, orderCode }) => {
  const [driverCoords, setDriverCoords] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [socket, setSocket] = useState(null);

  const goongApiKey = "BHii3IpyB5bqgvtFNjjfLwIJGkoqpVzoo48UGbsP";

  // Hàm lấy tọa độ từ địa chỉ
  const getCoordinates = async (location) => {
    const url = `https://rsapi.goong.io/geocode?address=${location}&api_key=${goongApiKey}`;
    try {
      const response = await fetch(url);
      const results = await response.json();
      if (results.results && results.results.length > 0) {
        const locationData = results.results[0].geometry.location;
        return [locationData.lat, locationData.lng];
      }
      throw new Error("Không tìm thấy tọa độ.");
    } catch (error) {
      console.error("Lỗi khi lấy tọa độ:", error.message);
      return null;
    }
  };

  // Hàm lấy tuyến đường
  const getRoute = async (startCoordinates, endCoordinates) => {
    const url = `https://rsapi.goong.io/Direction?origin=${startCoordinates[0]},${startCoordinates[1]}&destination=${endCoordinates[0]},${endCoordinates[1]}&api_key=${goongApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        return route.legs[0].steps.map((step) => [
          step.start_location.lat,
          step.start_location.lng,
        ]);
      }
      throw new Error("Không thể lấy tuyến đường.");
    } catch (error) {
      console.error("Lỗi khi lấy tuyến đường:", error.message);
      return [];
    }
  };

  // Lấy vị trí ban đầu của tài xế từ DB
  const fetchInitialDriverLocation = async () => {
    try {
      const response = await axios.get(
        `https://xehang.site/tracking/driver-location/${orderCode}`
      );
      if (response.data && response.data.location) {
        setDriverCoords([
          response.data.location.coordinates[1],
          response.data.location.coordinates[0],
        ]);
      }
    } catch (error) {
      console.error("Error fetching initial driver location:", error);
    }
  };

  // Thiết lập WebSocket và lấy vị trí ban đầu
  useEffect(() => {
    const socketInstance = io("wss://xehang.site");
    setSocket(socketInstance);
    console.log("Socket connection initialized");
    // Lấy vị trí ban đầu
    fetchInitialDriverLocation();

    // Lắng nghe sự kiện kết nối
    socketInstance.on("connect", () => {
      console.log("WebSocket connected");
    });

    // Lắng nghe cập nhật vị trí tài xế
    socketInstance.on("driverLocationUpdated", (data) => {
      if (data.location) {
        setDriverCoords([
          data.location.coordinates[1],
          data.location.coordinates[0],
        ]);
      }
    });

    // Cập nhật vị trí mỗi 15 phút
    const intervalId = setInterval(fetchInitialDriverLocation, 900000);

    return () => {
      clearInterval(intervalId);
      socketInstance.disconnect();
    };
  }, [orderCode]);

  // Lấy tọa độ điểm đầu và điểm cuối
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (startLocation && endLocation) {
        const startCoords = await getCoordinates(startLocation);
        const endCoords = await getCoordinates(endLocation);
        setStartCoords(startCoords);
        setEndCoords(endCoords);

        if (startCoords && endCoords) {
          const route = await getRoute(startCoords, endCoords);
          setRouteCoordinates(route);
        }
      }
    };

    fetchCoordinates();
  }, [startLocation, endLocation]);

  return (
    <div style={{ height: "800px", width: "100%" }}>
      <MapContainer
        center={driverCoords || startCoords || [15.8801, 108.338]}
        zoom={13}
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {startCoords && (
          <Marker position={startCoords} icon={customMarkerIcon}>
            <Popup>Điểm bắt đầu: {startLocation}</Popup>
          </Marker>
        )}

        {endCoords && (
          <Marker position={endCoords} icon={customMarkerIcon}>
            <Popup>Điểm kết thúc: {endLocation}</Popup>
          </Marker>
        )}

        {driverCoords && (
          <Marker position={driverCoords} icon={customMarkerIcon}>
            <Popup>Vị trí tài xế hiện tại</Popup>
          </Marker>
        )}

        {routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
