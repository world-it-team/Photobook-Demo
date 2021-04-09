import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Icon from "./Icon";
import AddIcon from "@material-ui/icons/Add";

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    width: 250,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  imageTab: {
    width: 100,
  },
  addImg: {
    position: "absolute",
  },
}));

export default function EditBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = [
    { icon: "photo", desc: "Photo", key: "1" },
    { icon: "text", desc: "Text", key: "2" },
    { icon: "color", desc: "Color", key: "3" },
    { icon: "cut", desc: "Cut", key: "4" },
    { icon: "zoom", desc: "Zoom", key: "5" },
    { icon: "layout", desc: "Layout", key: "6" },
  ];

  function loadImage(event) {
    let outputImg = document.getElementById("output");
    outputImg.src = URL.createObjectURL(event.target.files[0]);
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {data.map((item) => {
          return (
            <Tab
              label={item.desc}
              icon={<Icon {...item} {...a11yProps(item.key)} />}
            ></Tab>
          );
        })}
      </Tabs>

      <TabPanel value={value} index={0} className={classes.imageTab}>
        <Typography>Add Image</Typography>
        <input type="file" id="inputImg" onChange={loadImage} />
        <img id="output" width={100} height={100} onDragStart={(e) => {}} />
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
        Item Six
      </TabPanel>
    </div>
  );
}
