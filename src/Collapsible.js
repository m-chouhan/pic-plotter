import React from "react";
import PropTypes from "prop-types";
import Collapsible from "react-collapsible";

class CollapsibleItem extends React.Component {
  state = {
    open: false
  };
  render() {
    const { titleOpen, titleClose, children } = this.props;
    return (
      <Collapsible
        onOpen={() => this.setState({ open: true })}
        onClose={() => this.setState({ open: false })}
        trigger={
          <button style={{ marginTop: 20 }}>
            <h3>{this.state.open ? titleOpen : titleClose}</h3>
          </button>
        }
      >
        {children}
      </Collapsible>
    );
  }
}

Collapsible.propTypes = {
  titleOpen: PropTypes.string,
  titleClose: PropTypes.string
};

export default CollapsibleItem;
