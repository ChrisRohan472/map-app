import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import mapboxgl from "mapbox-gl";
import store from "./redux";
import axios from "axios";
import { Button } from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  // const [counter, setcounter] = React.useState([]);
  // store.subscribe(() => {
  //   setcounter(store.getState());
  // });
  React.useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2hyaXM0NzIiLCJhIjoiY2w1aG9lbXc2MDA2dzNrcDdtdnZmZW5zdiJ9.IsSZ6GZXKBaDkBOzIWZPcw";
    var map = new mapboxgl.Map({
      container: "mp1",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-95.665, 37.6], // starting position
      zoom: 3,
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    // Create a new marker.
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        store.dispatch({ type: "SET_DATA", payload: res.data });
        store.getState().map((d) => {
          new mapboxgl.Marker().setLngLat([d.longitude, d.latitude]).addTo(map);
        });
      })
      .catch((err) => console.log(err));
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
      }}
    >
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Switches" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0} id="mp1" style={{ width: "100vw" }}>
        Switches
      </TabPanel>

      <TabPanel value={value} index={1}>
        Comp2
      </TabPanel>
      <TabPanel value={value} index={2}>
        Comp3
      </TabPanel>
    </Box>
  );
}
