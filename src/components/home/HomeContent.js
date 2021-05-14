import React from "react";
import PropTypes from "prop-types";
import Choose from "./sections/Choose";

export default function HomeContent(props) {
  return (
    <React.Fragment>
      <Choose title={props.data.title} />
    </React.Fragment>
  );
}

HomeContent.propTypes = {
  data: PropTypes.any
};
