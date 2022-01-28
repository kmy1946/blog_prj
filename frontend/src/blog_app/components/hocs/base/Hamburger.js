import React from "react";
import PropTypes from "prop-types";

export function Hamburger({ state, onClick, stateText, ...additionalProps }) {
  let text = null;
  if (stateText) {
    text = state ? stateText.off : stateText.on;
  }
  return (
    <button
      onClick={onClick}
      data-testid="btn-hamburger" {...additionalProps} >
      <div className="icon">
        <div  />
        <div  />
        <div  />
      </div>

      {text && (
        <div >
          {state ? stateText.off : stateText.on}
        </div>
      )}
    </button>
  );
}

Hamburger.propTypes = {
  state: PropTypes.bool, onClick: PropTypes.func.isRequired,
  stateText: PropTypes.shape({ on: PropTypes.string, off: PropTypes.string })
};

Hamburger.defaultProps = {
  state: false,
  stateText: null
};
