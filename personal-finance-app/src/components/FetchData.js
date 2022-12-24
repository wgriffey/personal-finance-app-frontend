import React, {useState, useEffect} from 'react'
import axios from 'axios'

function FetchData() {
    const [article, setArticle] = useState([])
    const [id, setId] = useState(1)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            setArticle(res.data)
        })
        .catch(error => console.log(error))
    }, [id])
  return (
    <div>
        <input type='text' value={id} onChange={e => setId(e.target.value)} />
        <h3>{article.title}</h3>
    </div>
  )
}

export default FetchData
