import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

const Form = () => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [diveLink, setDiveLink] = useState('')
    const [errors, setErrors] = useState({})
    const [socket] = useState(() => io(':8001'))

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(('http://localhost:8001/api/addDive'), {
            name,
            type,
            description,
            location,
            diveLink
        }).then((res) => {
            console.log(res)
            socket.emit('added_new_dive', res.data)
            socket.disconnect()
            navigate('/')
        }).catch((err) => {
            setErrors(err.response.data.errors)
        })
    }


    return (
        <div className='col-6 mx-auto'>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Dive List</h1>
                <Link to={'/'}>back to home</Link>
            </div>
            <h3 className='m-2'>Know a dive needing a home?</h3> <br />
            <form onSubmit={submitHandler} className='border border-5 p-3'>
                <label>Dive Name: </label>
                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} value={name} />
                {errors.name ? <span className='text-danger'>{errors.name.message}</span> : null}
                <br />

                <label>Dive Type: </label>
                <input type="text" className='form-control' onChange={(e) => setType(e.target.value)} value={type} />
                {errors.type ? <span className='text-danger'>{errors.type.message}</span> : null}
                <br />

                <label>Dive Description: </label>
                <input className='form-control' onChange={(e) => setDescription(e.target.value)} value={description} />
                {errors.description ? <span className='text-danger'>{errors.description.message}</span> : null}
                <br />

                <label>Dive Locaiton: </label>
                <input type="text" className='form-control' onChange={(e) => setLocation(e.target.value)} value={location} />
                {errors.description ? <span className='text-danger'>{errors.description.message}</span> : null}
                <br />

                <label>Dive Link: </label>
                <input type="text" className='form-control' onChange={(e) => setDiveLink(e.target.value)} value={diveLink} />
                {errors.description ? <span className='text-danger'>{errors.description.message}</span> : null}
                <br />

                <button className='btn btn-secondary mt-3'>Add Dive!</button>
            </form>
        </div>
    )
}

export default Form