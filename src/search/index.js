"use strict";

import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logo.png";
import "./search.less";
import '../../common'

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        223<img src={logo} />
      </div>
    );
  }
}
setTimeout(()=>{
  ReactDOM.render(<Search />, document.getElementById('root'));
})

// ReactDOM.render(<Search />, document.body);
