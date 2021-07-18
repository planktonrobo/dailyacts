import Login from "../Login/Login";
import Alist from './ArchiveList'
const Archive = ({user}) => {
    return (
        !user  ? <Login/> : <Alist user={user}/>
    )
}

export default Archive
