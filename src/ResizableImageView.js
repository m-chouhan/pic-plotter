import React, { Component } from "react";
import { Stage, Layer, Image } from "react-konva";

const KEY_UP = 38;
const KEY_DOWN = 40;

class ResizableImageView extends Component {
  state = {
    scale: 1
  };

  componentDidMount() {
    /*
    this.state.image.src = "https://konvajs.github.io/assets/darth-vader.jpg";
    this.state.image.onload = () => {
      // calling set state here will do nothing
      // because properties of Konva.Image are not changed
      // so we need to update layer manually
      this.imageNode.getLayer().batchDraw();
      this.setState({
        width: this.state.image.width,
        height: this.state.image.height
      });
    };
    */
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = e => {
    console.log(e.keyCode);
    let { scale } = this.state;

    switch (e.keyCode) {
      case KEY_DOWN:
        scale = scale > 1 ? scale - 1 : 1;
        break;
      case KEY_UP:
        scale = scale < 4 ? scale + 1 : 4;
        break;
      default:
    }

    this.setState({
      scale: scale
    });
  };

  render() {
    return (
      <div
        onKeyPress={this.onKeyPressed}
        onMouseDown={e => {
          console.log(e.nativeEvent.offsetX + "," + e.nativeEvent.offsetY);
        }}
        style={{ maxWidth: 500, maxHeight: 500, overflow: "scroll" }}
        tabIndex="0"
      >
        <Stage
          scaleX={this.state.scale}
          scaleY={this.state.scale}
          width={this.props.width * this.state.scale}
          height={this.props.height * this.state.scale}
        >
          <Layer>
            <Image
              image={this.props.image}
              space="fill"
              ref={node => {
                this.imageNode = node;
              }}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default ResizableImageView;
