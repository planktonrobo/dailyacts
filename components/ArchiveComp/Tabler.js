import {Fragment} from 'react'
import { handleDate } from '../../helpers'
import Link from 'next/link'

const Tabler = ({articles}) => {
    return (
        <table className="table-auto border  dark:text-gray-300 ">
  <thead className="border ">
    <tr >
      <th className="border border-red-200 dark:border-gray-700 text-left px-2 py-1 sm:px-8 sm:py-4">Date</th>  
      <th className="border border-red-200 dark:border-gray-700 text-left px-2 py-1 sm:px-8 sm:py-4 ">Title</th>
      <th className="border  border-red-200 dark:border-gray-700 text-left px-2 py-1 sm:px-8 sm:py-4">Source</th>

    </tr>
  </thead>
  <tbody>
 {articles.map((article, i )=> 
 <Fragment key={article.docId}>
   
    <tr className={`${i % 2 && 'bg-red-100 dark:bg-gray-800'} border dark:border-gray-700 border-red-200 `}>
    <td className="border border-red-200 dark:border-gray-700  px-2 py-1 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium">{handleDate(article.published)}</td>
      <td className="border border-red-200 dark:border-gray-700 px-2 py-1 sm:px-8 sm:py-4 text-sm sm:text-md font-semibold"><Link href={article.article.url}>
     <a>{article.article.title}</a>
    </Link></td>
      <td className="border border-red-200 dark:border-gray-700 px-2 py-1 sm:px-8 sm:py-4 text-sm">{article.article.source.split('.')[0]}</td>

    </tr>
    
    </Fragment>)}
   
  </tbody>
</table>
    )
}

export default Tabler
