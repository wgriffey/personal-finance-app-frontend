import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'



function Form(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [userToken] = useCookies(['myToken'])

  useEffect(() => {
    setTitle(props.articles.title)
    setDescription(props.articles.description)
  }, [props.articles])

  const updateArticle = () => {
    APIService.UpdateArticle(props.articles.id, {title, description}, userToken['myToken'])
    .then(res => props.updatedInformation(res))
  }

  const insertArticle = () => {
    APIService.InsertArticle({title, description}, userToken['myToken'])
    .then(res => props.insertedInformation(res))

    setTitle('')
    setDescription('')
  }

  return (
      <div>
        {props.articles ? (
          <>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>Title</label>
              <input type='text' className='form-control' id='title' placeholder='Enter Title' value={title} onChange = {(e) => setTitle(e.target.value)}/>
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>Description</label>
              <textarea className='form-control' id='description' rows ='5' placeholder='Enter Description' value={description} onChange = {(e) => setDescription(e.target.value)}/>
            </div>
            <div>
              {props.articles.id ? <button className='btn btn-outline-success' onClick={() => updateArticle()}>Update Article</button> : <button className='btn btn-outline-success' onClick={() => insertArticle()}>Insert Article</button>}
            </div>
          </>

        ) : null}
      </div>
  )
}

export default Form