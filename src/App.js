import React, { Component } from "react";
import { connect } from "react-redux";

import ResizableImageView from "./ResizableImageView";
import "./App.css";
import { createPairs } from "./Utils";
import Collapsible from "./Collapsible";
// import Collapsible from "react-collapsible";

class App extends Component {
  state = { file: undefined, image: undefined };

  componentDidMount() {
    const image = new window.Image();
    image.src =
      "https://i2.wp.com/ramenswag.com/wp-content/uploads/2016/12/naruto-wallpaper.jpg?resize=1060%2C663";
    image.onload = () => {
      this.props.dispatch({
        type: "IMAGE_LOAD_SUCCESS",
        payload: image
      });
    };
  }

  loadFile = async event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        console.log(e.target);
        this.setState({ image: e.target.result });
        const image = new window.Image();
        image.src = e.target.result;
        image.onload = () => {
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

  deletePair = index => {
    this.props.dispatch({
      type: "DELETE_PAIR",
      payload: index
    });
  };

  setSelectedPair = index => {
    this.props.dispatch({
      type: "SET_SELECTION",
      payload: index
    });
  };
  render() {
    const pairs = createPairs(this.props.points);

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
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          {this.props.image && <ResizableImageView maxWidth={800} maxHeight={600} />}
          <div
            style={{
              paddingLeft: 20,
              maxHeight: 500,
              width: 350,
              overflow: "scroll"
            }}
          >
            {pairs.map((pair, index) => (
              <div
                className="Space-around-row"
                style={{ color: index === this.props.selectionIndex ? "red" : "" }}
                onClick={() => this.setSelectedPair(index)}
                key={index}
              >
                <button onClick={() => this.deletePair(index * 2)}>X</button>
                <div>
                  &nbsp;{index + 1} [{pair.p1.x},{pair.p1.y}] &nbsp;[{pair.p2.x},{pair.p2.y}]
                </div>
              </div>
            ))}
            <Collapsible titleClose="open JSON" titleOpen="close JSON">
              {pairs.map((pair, index) => (
                <pre onClick={() => this.setSelectedPair(index)} key={index}>
                  {JSON.stringify({ index, ...pair }, undefined, 4)}
                </pre>
              ))}
            </Collapsible>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ ...state }))(App);
