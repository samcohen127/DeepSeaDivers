import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditForm = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [errors, setErrors] = useState({})

    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8001/api/divePage/${id}`)
            .then((res) => {
                setName(res.data.name)
                setType(res.data.type)
                setDescription(res.data.description)
                setLocation(res.data.location)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put((`http://localhost:8001/api/update/${id}`), {
            name,
            type,
            description,
            location
        }).then((res) => {
            console.log(res)
            navigate('/')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div className='col-6 mx-auto'>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Deep Sea Divers</h1>
                <Link to={'/'}>back to home</Link>
            </div>
            <h3 className='m-2'>Edit {name}</h3> <br />
            <form onSubmit={submitHandler}>
                <label>Dive Name: </label>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} value={name} />
                {errors.name ? <span className='text-danger'>{errors.name.message}</span> : null}
                <br />

                <label>Dive Type: </label>
                <input type="text" className='form-control' onChange={(e) => setType(e.target.value)} value={type} />
                {errors.type ? <span className='text-danger'>{errors.type.message}</span> : null}
                <br />

                <label>Description: </label>
                <input className='form-control' onChange={(e) => setDescription(e.target.value)} value={description} />
                {errors.description ? <span className='text-danger'>{errors.description.message}</span> : null}
                <br />
                <br />

                <label>Location: </label>
                <input type="text" className='form-control' onChange={(e) => setSkill1(e.target.value)} value={skill1} />
                <br />

                <button className='btn btn-secondary mt-3'>Update Dive!</button>
            </form>
        </div>
    )
}

export default EditForm