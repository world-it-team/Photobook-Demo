import React from "react";
import PropTypes from "prop-types";
import Layout from "../shell/Layout"
import ChooseImage from "./sections/ChooseImage"
export default function ImageContent(props) {
  return (
    <Layout>
        <ChooseImage data={props.data}/>
    </Layout>
  );
}

ImageContent.propTypes = {
  data: PropTypes.any.isRequired,
};
