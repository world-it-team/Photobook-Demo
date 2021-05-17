import React from "react";
import PropTypes from "prop-types";
import Choose from "./sections/Choose";
import Banner from "./sections/Banner"
import Layout from "../shell/Layout"
export default function HomeContent(props) {
  return (
    <Layout>
      <Banner />
        <Choose data={props.data} />
    </Layout>
  );
}

HomeContent.propTypes = {
  data: PropTypes.any.isRequired,
};
