import React, { Component } from "react";
import { connect } from "react-redux";
import ResizableImageView from "./ResizableImageView";

class App extends Component {
  loadImage = () => {
    const image = new window.Image();
    image.src = "https://konvajs.github.io/assets/yoda.jpg";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.props.dispatch({
        type: "IMAGE_LOAD_SUCCESS",
        payload: image
      });
    };
  };

  render() {
    return (
      <div>
        <button onClick={this.loadImage}>Hello MTF !!</button>
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
