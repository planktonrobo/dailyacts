import { useContext } from "react";
import ArchiveContext from "../../context/archives";
import NewArchive from "./NewArchive";
import IndArchive from "./IndArchive";
import ArchiveSkeleton from "./ArchiveSkeleton";

const Alist = ({ user }) => {
  const { archives, loading, error } = useContext(ArchiveContext);
  return (
    <div className="px-2">
      
      <div className="flex justify-center">
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
      <div className="col sm:col-span-2 md:col-span-3"><NewArchive user={user}/></div>
     
        {loading && <>
          <ArchiveSkeleton/>
          <ArchiveSkeleton/>
          <ArchiveSkeleton/> </>}
        {archives && archives.length ? archives.map((archive)=> <IndArchive key={archive.docId} archive={archive}/>) : archives && !archives.length ? <ArchiveSkeleton/>: null}
        {error && error.message}
      </div>
    </div>
    </div>
  );
};

export default Alist;
