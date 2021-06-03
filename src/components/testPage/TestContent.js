import React from "react";
import PropTypes from "prop-types";
import Layout from "../shell/Layout";
export default function testContent(props) {
  console.log(props)
  return (
    <Layout>

    </Layout>
  );
}

testContent.propTypes = {
  data: PropTypes.any.isRequired,
};
