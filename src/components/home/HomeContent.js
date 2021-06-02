import React from "react";
import PropTypes from "prop-types";
import ProductList from "./sections/ProductList";
import Banner from "./sections/Banner"
import Layout from "../shell/Layout"
export default function HomeContent(props) {
  return (
    <Layout>
      <Banner />
        <ProductList data={props.data} />
    </Layout>
  );
}

HomeContent.propTypes = {
  data: PropTypes.any.isRequired,
};
