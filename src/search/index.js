"use strict";

import React from "react";
import ReactDOM from "react-dom";
import logo from "./images/logo.png";
import "./search.less";

class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import("./text.js").then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const addResult = "addResult";
    return (
      <div className="search-text">
        {Text ? <Text /> : null}
        {addResult}
        搜索文字的内容
        <img src={logo} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}
ReactDOM.render(<Search />, document.getElementById("root"));
// ReactDOM.render(<Search />, document.body);
