import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Icon from "./Icon";
import Typography from "@material-ui/core/Typography";
import Photo from "./tabPanel/Photo";

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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 80,
  },
  tab: {
    left: -40,
  },
  bgWrapper: {
    width: 100,
    height: 100,
    position: "relative",
    margin: 5,
  },
  bgImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    border: "2px solid black",
    borderRadius: "10%",
  },
  bgContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    maxWidth: 250,
    textAlign: "center",
  },
}));

const data = [
  { icon: "photo", desc: "Photo", key: "1" },
  { icon: "text", desc: "Text", key: "2" },
  { icon: "color", desc: "Color", key: "3" },
  { icon: "cut", desc: "Cut", key: "4" },
  { icon: "zoom", desc: "Zoom", key: "5" },
  { icon: "layout", desc: "Layout", key: "6" },
];
const bg = [
  { src: require("../image/bg1.jpg") },
  { src: require("../image/bg2.jpg") },
  { src: require("../image/bg3.jpg") },
  { src: require("../image/bg4.jpg") },
];
console.log(bg);
export default function EditToolTabs(onChangeBg) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {data.map((item) => {
          return (
            <Tab
              label={<Typography>{item.desc}</Typography>}
              icon={<Icon {...item} />}
              className={classes.tab}
            />
          );
        })}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Photo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div className={classes.bgContainer}>
          {bg.map((item, index) => {
            return (
             
                <div className={classes.bgWrapper} onClick={onChangeBg}>
                  <img
                    key={index}
                    src={item.src.default}
                    className={classes.bgImg}
                  ></img>
                </div>   
            );
          })}
        </div>
      </TabPanel>
    </div>
  );
}
