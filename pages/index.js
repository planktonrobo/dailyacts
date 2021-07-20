import Head from "next/head";
import Header from "../components/Header/Header";
import MainComp from "../components/MainComp/MainComp";
import useAuthListener from '../hooks/use-auth-listener'
import UserContext from '../context/user'
export default function Home() {
  const {user} = useAuthListener() 
  return (
    <UserContext.Provider value={{user}}>
    <div className="min-h-screen min-w-screen bg-red-50 dark:bg-gray-900">
      <Head>
        <title>The Daily Acts</title>
        <meta name="description" content="Create and share news archives" />
        <meta property="og:title" content="The Daily Acts"/>
        <meta property="og:url" content="https://www.dailyacts.io"/>
        <meta property="og:image" content="https://ibb.co/VScN6Hn"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="container mx-auto max-w-4xl">
        <main className="pt-20">
          <MainComp />
        </main>
      </div>
    </div>
    </UserContext.Provider>
  );
}
