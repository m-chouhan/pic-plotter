import React, { Component } from "react";
import { Stage, Layer, Image, Rect, Circle } from "react-konva";
import { connect } from "react-redux";

const KEY_UP = 38;
const KEY_DOWN = 40;

class ResizableImageView extends Component {
  state = {
    scale: 1,
    color: "red"
  };

  componentDidMount() {
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
        style={{ maxWidth: 500, maxHeight: 500, overflow: "scroll" }}
        tabIndex="0"
      >
        <Stage
          onMouseDown={event => {
            this.props.dispatch({
              type: "CREATE_POINT",
              payload: { x: event.evt.offsetX, y: event.evt.offsetY }
            });
            this.forceUpdate();
          }}
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
          <Layer>
            {this.props.points.map(point => (
              <Circle
                key={point.id}
                x={point.x}
                y={point.y}
                radius={5}
                fill={this.state.color}
                shadowBlur={5}
                onClick={() => console.log("clicked on circle")}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default connect(state => ({
  ...state,
  width: state.image ? state.image.width : 0,
  height: state.image ? state.image.height : 0
}))(ResizableImageView);
