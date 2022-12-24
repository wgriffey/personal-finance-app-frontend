import React, {useState, useEffect} from 'react'


function Counter() {

    const [count, setCount] = useState(0)
    const [text, setText] = useState('Hello')
    const [info, setInfo] = useState({name:'', email:''})
    const [articles, setArticles] = useState(['Article 1', 'Article 2', 'Article 3'])


    const addArticle = () => {
        setArticles([...articles, 'New Article'])
    }

    useEffect(() => {
        console.log("useEffect is called")
    }, [count, articles])

    return (
        <>
        <div></div>
        <h2 className='ms-2'>{count}</h2>
        <button className='btn btn-danger' onClick={() => setCount(count + 1)}>COUNT UP COUNT UP</button>
        <button className='btn btn-outline-dark ms-2' onClick={() => setCount(0)}>RUN IT BACK</button>
        <br/>
        <h2 className='mt-4'>{text}</h2>
        <button className='btn btn-outline-secondary' onClick={() => setText('New Text')}>Change Text</button>
        <input type='text' className='form-control mt-4' value={info.name} onChange={(e) => setInfo({...info, name: e.target.value})}/>
        <input type='email' className='form-control my-2' value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})}/>
        <h2 className='mb-2'>My name is: {info.name}</h2>
        <h2>My email is: {info.email}</h2>
        <br/>
        {articles.map((article, i) => {
            return <h2 key = {article + i} className='mb-2'>{article} {i}</h2>
        })}

        <button className='btn btn-lg btn-success' onClick={addArticle}>Add Article</button>
        <br/>
        <button className='btn btn-outline-warning btn-sm' onClick={() => setCount(count + 1)}>Change Title</button>
        </>

    )
}

export default Counter