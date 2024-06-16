import Header from "../Componenet/Header/Header";
import "../App.css";
import SighnupSigninComponetn from "../Componenet/SIghupSiginin/Sighnup";

const Signpage = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SighnupSigninComponetn />
      </div>
    </div>
  );
};

export default Signpage;
