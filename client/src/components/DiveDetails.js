import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const DiveDetails = () => {
    const { id } = useParams()
    const [dive, setDive] = useState([])
    const [socket] = useState(() => io(':8001'))

    useEffect(() => {
        axios.get(`http://localhost:8001/api/divePage/${id}`)
            .then((res) => {
                console.log(res.data)
                setDive(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const navigate = useNavigate()

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8001/api/delete/${id}`)
            .then((res) => {
                console.log(res)
                socket.emit('deleted_dive', id)
                socket.disconnect()
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Dive List</h1>
                <Link to={'/'}>back to home</Link>
            </div>
            <h3 className='mt-3'>Details about {dive.name}</h3> <br /><br />
            <div className='border border-3'>
                <h2>{dive.name}</h2>
                <p>Type: {dive.type}</p>
                <p>Description: {dive.description}</p>
                <p>Location: {dive.location}</p>
                <p>Link: {dive.diveLink}</p>
            </div>
            <button className='btn btn-danger mt-3' onClick={(e) => deleteHandler(dive._id)}>Adopt {dive.name}!</button>

        </div>
    )
}

export default DiveDetails