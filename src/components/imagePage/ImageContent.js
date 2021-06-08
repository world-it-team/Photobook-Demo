import React from "react";
import PropTypes from "prop-types";
import Layout from "../shell/Layout";
import ChooseImage from "./sections/ChooseImage";
import WorksOfOthers from "./sections/WorksOfOthers"
import Ranking from './sections/Ranking'
import Newphotos from './sections/NewPhotos'
import Container from "@material-ui/core/Container";
export default function ImageContent(props) {
  return (
    <Layout>
       <Newphotos data={props.data.Newphotos} />
      <Container>
        <Ranking data={props.data.Ranking} />
        <ChooseImage data={props.data.ChooseImage}/>
        <WorksOfOthers data={props.data.WorksOfOthers}/>
      </Container>
    </Layout>
  );
}

ImageContent.propTypes = {
  data: PropTypes.any.isRequired,
};
