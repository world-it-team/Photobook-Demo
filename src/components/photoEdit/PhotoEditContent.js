import React from "react";
import PropTypes from "prop-types";
import Layout from "../shell/Layout";
import PhotoEdit from "./section/PhotoEdit"

export default function PhotoEditContent(props) {
  return (
    <Layout>
        <PhotoEdit data={props.data.ChooseImage}/>
    </Layout>
  );
}

PhotoEditContent.propTypes = {
  data: PropTypes.any.isRequired,
};