import React from "react";
import PropTypes from "prop-types";

/**
 * A button that looks like a Hamburger with 3 patties or "bars".
 * Animates into an "x" when clicked.
 * Generally used for menus.
 */
export function Hamburger({ state, onClick, stateText, ...additionalProps }) {
  let text = null;
  if (stateText) {
    text = state ? stateText.off : stateText.on;
  }


  return (
    <button
      onClick={onClick}
      data-testid="btn-hamburger"
      {...additionalProps}
    >
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
  state: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  stateText: PropTypes.shape({
    on: PropTypes.string,
    off: PropTypes.string
  })
};

Hamburger.defaultProps = {
  state: false,
  /* (optional) text below the hamburger */
  stateText: null
};
