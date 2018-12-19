import React, { Component } from "react";
import { Stage, Layer, Image, Rect, Circle, Group, Line } from "react-konva";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPairs } from "../Utils";

const KEY_UP = 38;
const KEY_DOWN = 40;

class ResizableImageView extends Component {
  state = {
    scale: 1
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  addPoint = event => {
    this.props.dispatch({
      type: "CREATE_POINT",
      payload: {
        x: Math.floor(event.evt.offsetX / this.state.scale),
        y: Math.floor(event.evt.offsetY / this.state.scale)
      }
    });
  };

  onKeyPressed = e => {
    console.log(e.keyCode);
    let { scale } = this.state;

    switch (e.keyCode) {
      case KEY_DOWN:
        scale = scale > 1 ? scale - 1 : 1;
        break;
      case KEY_UP:
        scale = scale < 5 ? scale + 1 : 5;
        break;
      default:
    }

    this.setState({ scale });
  };

  render() {
    const { scale } = this.state;
    return (
      <div
        style={{
          maxWidth: this.props.maxWidth,
          maxHeight: this.props.maxHeight,
          overflow: "scroll"
        }}
        tabIndex="0"
      >
        <Stage
          onMouseDown={this.addPoint}
          scaleX={scale}
          scaleY={scale}
          width={this.props.width * scale}
          height={this.props.height * scale}
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
            {createPairs(this.props.points).map((pair, index) => (
              <Group key={index}>
                <Circle
                  x={pair.p1.x}
                  y={pair.p1.y}
                  radius={1}
                  fill={this.props.selectionIndex !== index ? "green" : "red"}
                  shadowBlur={5}
                />
                <Circle
                  x={pair.p2.x}
                  y={pair.p2.y}
                  radius={1}
                  fill={this.props.selectionIndex !== index ? "green" : "red"}
                  shadowBlur={5}
                />
                <Line
                  points={[pair.p1.x, pair.p1.y, pair.p2.x, pair.p2.y]}
                  stroke={this.props.selectionIndex !== index ? "green" : "red"}
                  strokeWidth={1}
                  lineJoin="round"
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

ResizableImageView.propTypes = {
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired
};
export default connect(state => ({
  ...state,
  width: state.image ? state.image.width : 0,
  height: state.image ? state.image.height : 0
}))(ResizableImageView);
