import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'


function ArticleList(props) {

    const [userToken] = useCookies(['myToken'])

    const handleEdit = (article) => {
        props.edit(article)
    }

    const handleDelete = (article) => {
        APIService.DeleteArticle(article.id, userToken['myToken'])
        .then(() => props.deletedArticle(article))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.articles && props.articles.map(article => {
                return (
                    <div className='mt-5' key = {article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <div className='row'>
                            <div className='col-sm-1'>
                                <button className='btn btn-outline-warning' onClick={() => handleEdit(article)}>Update</button>
                            </div>
                            <div className='col'>
                                <button className='btn btn-outline-danger' onClick={() => handleDelete(article)}>Delete</button>
                            </div>
                        </div>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default ArticleList