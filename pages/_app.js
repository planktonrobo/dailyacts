import "tailwindcss/tailwind.css";
import '../styles/globals.css'
import { firebase, FieldValue, auth } from "../firebaseconfig";
import FirebaseContext from "../context/firebase";
function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue, auth}}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
