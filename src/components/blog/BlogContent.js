import React from "react";
import PropTypes from "prop-types";
import Layout from "../shell/Layout";
import NewArticles from "./sections/NewArticles"

export default function BlogContent(props) {
  return (
    <Layout>
        <NewArticles data={props.data.NewArticles}/>
    </Layout>
  );
}

BlogContent.propTypes = {
  data: PropTypes.any.isRequired,
};
