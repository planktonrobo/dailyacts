import firebase from "firebase/app";

const GoogleLogin = ({ children, auth }) => {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  }
  return (
    <div className="flex justify-center pt-6 text-base sm:text-lg leading-6 space-y-4 text-gray-700 dark:text-white sm:leading-7 px-2">
      <button
        onClick={() => signInWithGoogle()}
        className="w-72 sm:w-80 h-12 bg-red-50 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-gray-600 border-2 border-red-100 dark:border-gray-100 rounded-lg"
      >
        {children}
      </button>
    </div>
  );
};

export default GoogleLogin;
