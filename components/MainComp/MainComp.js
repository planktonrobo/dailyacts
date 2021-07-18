import { useState } from "react";
import Nav from "../Nav/Nav";
import Archive from "./Archive";
import Explore from "./Explore";
import { useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import ArchiveContext from "../../context/archives";
import { useCollection } from "react-firebase-hooks/firestore";
const MainComp = () => {
  const { firebase } = useContext(FirebaseContext);
  const {user} = useContext(UserContext)
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection("archives")
      .where("publisher", "==", user?.uid ? user.uid : 1)
      .orderBy("created", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const archives = value?.docs.map((archive)=> ({...archive.data(), docId: archive.id}))
  const [active, setActive] = useState("archives");
  return (
    <ArchiveContext.Provider value={{archives, loading, error}}>
      <Nav active={active} setActive={setActive} />
      {active === 'archives' ?   <Archive user={user} /> : <Explore/>}
    
    </ArchiveContext.Provider>
  );
};

export default MainComp;
