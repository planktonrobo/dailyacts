import ArticleLeft from './ArticleLeft'
import ArticleRight from './ArticleRight'

const Timeline = ({articles}) => {
    return (
        articles.map((article, i)=> {
            if (i % 2){
                return <ArticleLeft key={article.docId} article={article}/>
            }
            else {
                return <ArticleRight key={article.docId} article={article}/>
            }
        })
    )
}

export default Timeline
