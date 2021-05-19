import React from "react";
import PropTypes from "prop-types";
import Layout from "../shell/Layout";
import ChooseImage from "./sections/ChooseImage";
import WorksOfOthers from "./sections/WorksOfOthers"
import Ranking from './sections/Ranking'
export default function ImageContent(props) {
  console.log(props)
  return (
    <Layout>
        {/* <ChooseImage/> */}
        <WorksOfOthers data={props.data.WorksOfOthers}/>
        {/* <ChooseImage data={props.data}/> */}
    </Layout>
  );
}

ImageContent.propTypes = {
  data: PropTypes.any.isRequired,
};
