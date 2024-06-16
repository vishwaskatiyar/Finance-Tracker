import "./header.css";

const Header = () => {
  const logoutfunction = () => {
    alert("You have logged out");
  };
  return (
    <div className="Nav-bar">
      <p className="logo">Financely</p>
      <p className="logout" onClick={logoutfunction}>
        Logout
      </p>
    </div>
  );
};

export default Header;
