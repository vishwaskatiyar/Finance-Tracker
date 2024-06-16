import PropTypes from "prop-types";
import "./input.css";

const Input = ({ label, state, setState, placeholder }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="custome-input"
        type="text"
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
