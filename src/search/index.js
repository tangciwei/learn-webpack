import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import logo from "./images/logo.png";
import bg from "./images/bg.png";
import "./search.less";

class Search extends React.Component {
  constructor(...arg) {
    super(...arg);

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
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="search-text">
        {Text ? <Text /> : null}
        {addResult}
        搜索文字的内容
        <img
          src={logo}
          onClick={() => {
            this.loadComponent();
          }}
        />
        <img src={bg} />
      </div>
    );
  }
}
ReactDOM.render(<Search />, document.getElementById("root"));
// ReactDOM.render(<Search />, document.body);
