import React from "react";
import PropTypes from "prop-types";
import Choose from "./sections/Choose";
import Navigation from "../common/Navigation"
import Banner from "./sections/Banner"
export default function HomeContent(props) {
  return (
    <React.Fragment>
      {/* <Choose data={props.data} /> */}
      <Navigation/>
      <Banner />
    </React.Fragment>
  );
}

HomeContent.propTypes = {
  data: PropTypes.any.isRequired,
};
