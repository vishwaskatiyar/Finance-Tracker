import { useState } from "react";
import Input from "../Input/input";
import "./sighnup.css";
import Button from "../Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SighnupSigninComponetn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const onSignupWithEmail = () => {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User signed up successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          });
      } else {
        toast.error("Passwords do not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };

  const onLoginWithEmail = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User logged in successfully!");
          navigate("/dashboard");
          setLoading(false);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("All fields are required");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoUrl: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("User document already exists");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loginForm ? (
        <div className="sighup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your email address"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter your password"}
            />
          </form>
          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Login Using Email and Password"}
            onClick={onLoginWithEmail}
          />
          <p className="title">or</p>
          <Button
            text={loading ? "Loading..." : "Login Using Google"}
            blue={true}
          />
          <br />
          <p className="title" onClick={() => setLoginForm(!loginForm)}>
            Or don't have an account? Click here to Sign Up
          </p>
        </div>
      ) : (
        <div className="sighup-wrapper">
          <h2 className="title">
            Sign UP on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Enter Full Name"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your email address"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter your password"}
            />
            <Input
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Enter your password again"}
            />
          </form>
          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Sign Up Using Email and Password"}
            onClick={onSignupWithEmail}
          />
          <p className="title">or</p>
          <Button
            text={loading ? "Loading..." : "Sign Up Using Google"}
            blue={true}
          />
          <br />
          <p className="title" onClick={() => setLoginForm(!loginForm)}>
            Have an account already? Click here to Login
          </p>
        </div>
      )}
    </>
  );
};

export default SighnupSigninComponetn;
