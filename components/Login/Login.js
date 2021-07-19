/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import GoogleLogin from "./GoogleLogin";
import TwitterLogin from "./TwitterLogin";
import FirebaseContext from "../../context/firebase";
import FacebookLogin from "./FacebookLogin";
const Login = () => {
  const { auth } = useContext(FirebaseContext);
  return (
    <div className="flex justify-center px-8">
      <div className=" text-lg sm:text-xl dark:text-white px-8 py-10 bg-red-50 dark:bg-gray-800 shadow-lg rounded-3xl sm:p-20 max-w-full">
        <h1 className="pb-2">Login to create and save to archives.</h1>

        <GoogleLogin auth={auth}>
          <div className="flex justify-center items-center">
            <span className="px-2">
              <img
                alt="G"
                className="w-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
            </span>
            <span>Sign in With Google</span>
          </div>
        </GoogleLogin>
        <TwitterLogin auth={auth}>
          <div className="flex justify-center items-center">
            <span className="px-2">
              <img
                alt="F"
                className="w-5"
                src="https://seeklogo.com/images/T/twitter-logo-A84FE9258E-seeklogo.com.png"
              />
            </span>
            <span>Sign in With Twitter</span>
          </div>
        </TwitterLogin>
        <FacebookLogin auth={auth}>
          <div className="flex justify-center items-center">
            <span className="px-3">
              <img
                alt="F"
                className="w-5 ml-3"
                src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
              />
            </span>
            <span>Sign in With Facebook</span>
          </div>
        </FacebookLogin>
      </div>
    </div>
  );
};

export default Login;
