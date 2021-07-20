import ArticleLeft from './ArticleLeft'
import ArticleRight from './ArticleRight'
import {useContext} from 'react'
import UserContext from '../../context/user'
const Timeline = ({articles, handleDelete}) => {
    const {user} = useContext(UserContext)
    return (
        articles.map((article, i)=> {
            if (i % 2){
                return <ArticleLeft user={user} handleDelete={handleDelete} key={article.docId} article={article}/>
            }
            else {
                return <ArticleRight user={user} handleDelete={handleDelete} key={article.docId} article={article}/>
            }
        })
    )
}

export default Timeline
