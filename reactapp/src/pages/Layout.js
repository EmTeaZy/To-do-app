import React from "react";
import { Link } from "react-router-dom";

export default class myFirstClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "About Page" };
  }

  render() {
    return (
      <>
        <h1>{this.state.title}</h1>
        <h6 style={{ marginBottom: "10px" }}> App Created By EmTeaZy &copy;</h6>
        <h6 style={styling}> All Rights Reserved. &reg;</h6>

        <Link style={{ color: "Red" }} to="/">
          Back
        </Link>
      </>
    );
  }
}

const styling = {
  marginTop: "0px",
  fontSize: "12px",
};
