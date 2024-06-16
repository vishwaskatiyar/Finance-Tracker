import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <div
      className={blue ? "btn btn-blue" : "btn"}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  blue: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
