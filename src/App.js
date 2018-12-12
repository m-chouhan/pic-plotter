import React, { Component } from "react";
import { connect } from "react-redux";
import ResizableImageView from "./ResizableImageView";
import "./App.css";

class App extends Component {
  state = { file: undefined, image: undefined };

  loadFile = async event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        console.log(e.target);
        this.setState({ image: e.target.result });
        const image = new window.Image();
        image.src = e.target.result;
        image.onload = () => {
          // setState will redraw layer
          // because "image" property is changed
          this.props.dispatch({
            type: "IMAGE_LOAD_SUCCESS",
            payload: image
          });
        };
      };
      console.log(event.target.files);
      reader.readAsDataURL(event.target.files[0]);
    } else console.warn("not present");
  };

  render() {
    return (
      <div className="App-header">
        <input
          type="file"
          id="file"
          className="filetype"
          value={this.state.file}
          onChange={this.loadFile}
          style={{ paddingBottom: 10 }}
        />
        {this.props.image && (
          <ResizableImageView
            image={this.props.image}
            width={this.props.image.width}
            height={this.props.image.height}
          />
        )}
      </div>
    );
  }
}

export default connect(state => ({ image: state.image }))(App);
