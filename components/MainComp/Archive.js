import Login from "../Login/Login";
import Alist from './ArchiveList'
const Archive = ({user}) => {
    return (
        <div className="pt-10">
        {!user  ? <Login/> : <Alist user={user}/>}
        </div>
    )
}

export default Archive
