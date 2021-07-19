import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import useAuthListener from "../../hooks/use-auth-listener";
import UserContext from "../../context/user";
import { useContext, useEffect, useState } from "react";
import FireBaseContext from "../../context/firebase";
import TimeTable from "../../components/ArchiveComp/TimeTable";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import Title from "../../components/ArchiveComp/Title";
const Archive = () => {
  const [order, setOrder] = useState(false);
  const [table, setTable] = useState(false);
  const { firebase } = useContext(FireBaseContext);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthListener();
  const [value, loading, error] = useDocument(
    firebase
      .firestore()
      .collection("archives")
      .doc(id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const archive = value && {...value.data(), docId:value.id};
  if (!loading) {
    value && !value.data() && router.replace("/404");
  }
  const getuser = firebase.functions().httpsCallable("getuser");

  const [value1, loading1, error1] = useCollection(
    firebase
      .firestore()
      .collection("articles")
      .where("archive", "==", id || 1)
      .orderBy("published", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );


  const[articles, setArticles] = useState()

  useEffect(() => {
    setArticles(value1?.docs.map((article) => ({
      ...article.data(),
      docId: article.id,
    })))
  }, [value1])

  useEffect(() => {
    articles && setArticles(articles.reverse())
  }, [order, articles, table])
  return (
    <UserContext.Provider value={{ user }}>
      <div className="min-h-screen min-w-screen bg-red-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto max-w-4xl">
          <main className="pt-20 overflow-x-hidde mr-4 ">
            <Title
              order={order}
              table={table}
              getuser={getuser}
              archive={archive}
              setOrder={setOrder}
              setTable={setTable}
              articles={articles}
              setArticles={setArticles}
            />
            <TimeTable
              articles={articles}
              loading={loading1}
              errror={error1}
              table={table}
            />
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Archive;
