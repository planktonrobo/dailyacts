import "tailwindcss/tailwind.css";
import '../styles/globals.css'
import { firebase, FieldValue, auth, Timestamp } from "../firebaseconfig";
import FirebaseContext from "../context/firebase";
function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue, auth, Timestamp }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
