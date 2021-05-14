import React from "react";

export function getImg(src) {
  const results = src.split("/");
  const imgFileName = results[results.length - 1];
  const category = results[results.length - 2];
  switch (category) {
    case "home":
      return validateUrl(category, imgFileName);
    default:
      return src;
  }
}

function validateUrl(category, imgFileName) {
  let result = require("../../images/" + category + "/" + imgFileName);
  if (typeof result === "string" && result.indexOf("static") !== -1) return result;
  return result.default ? result.default : result;
}

export default function Image(props) {
  return <img
    className={props.className}
    id={props.id}
    src={getImg(props.src)}
    alt={props.alt}
  ></img>
}
