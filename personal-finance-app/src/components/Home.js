import '../App.css';
import React, {useState, useEffect} from 'react'
import ArticleList from './ArticleList';
import Form from './Form';
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'



function Home() {
    const [articles, setArticles] = useState([])
    const [editArticles, setEditArticles] = useState(null)
    const [userToken, setUserToken, removeUserToken] = useCookies(['myToken'])
    const navigate = useNavigate()



    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/articles/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${userToken['myToken']}`
            }
        })
        .then(res => res.json())
        .then(res => setArticles(res))
        .catch((e) => console.log(e))
    }, [])

    const edit = (article) => {
        setEditArticles(article)
    }

    const updatedInformation = (article) => {
        const new_article = articles.map(myArticle => {
            if(myArticle.id === article.id){
                return article;
            }
            else{
               return myArticle 
            }
        })

        setArticles(new_article)
    }

    const insertedInformation = (article) => {
        const new_articles = [...articles, article]
        setArticles(new_articles)
    }

    const deletedArticle = (article) => {
        const new_articles = articles.filter(myArticle => {
            if(myArticle.id === article.id){
                return false;
            }
            return true;
        })

        setArticles(new_articles)
    }

    const articleForm = () => {
        setEditArticles({title: '', description: ''})
    }

    const onLogOut = () => {
        removeUserToken(['myToken'])
    }

    useEffect(() => {
        if(!userToken['myToken']){
            navigate('/login')
        }
    }, [userToken])

    return (
        <div className='App'>

            <div className='row'>
                <div className='col'>
                    <h1>Django And React Blog App</h1>
                </div>
                <div className='col'>
                    <button onClick={() => articleForm()} className='btn btn-outline-success mt-2'>Create Article</button>
                </div>
                <div className='col'>
                    <button onClick={() => onLogOut()} className='btn btn-outline-danger mt-2'>Log Out</button>
                </div>

            </div>

            <ArticleList articles = {articles} edit = {edit} deletedArticle = {deletedArticle}/>

            {editArticles ? <Form articles = {editArticles} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null}

        
        </div>
    )
}


export default Home