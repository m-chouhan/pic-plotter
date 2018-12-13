import React, { Component } from "react";
import { Stage, Layer, Image, Rect, Circle, Group, Line } from "react-konva";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPairs } from "./Utils";

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
          onMouseDown={event => {
            this.props.dispatch({
              type: "CREATE_POINT",
              payload: {
                x: event.evt.offsetX / scale,
                y: event.evt.offsetY / scale
              }
            });
          }}
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
            {createPairs(this.props.points).map(pair => (
              <Group key={pair.id}>
                <Circle
                  //key={pair.p1.id}
                  x={pair.p1.x}
                  y={pair.p1.y}
                  radius={5}
                  fill={this.state.color}
                  shadowBlur={5}
                />
                <Circle
                  //key={pair.p2.id}
                  x={pair.p2.x}
                  y={pair.p2.y}
                  radius={5}
                  fill={this.state.color}
                  shadowBlur={5}
                />
                <Line
                  points={[pair.p1.x, pair.p1.y, pair.p2.x, pair.p2.y]}
                  stroke="red"
                  strokeWidth={5}
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
