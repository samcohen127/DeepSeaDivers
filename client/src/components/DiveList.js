import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const DiveList = () => {
    const [list, setList] = useState([])
    const [socket] = useState(() => io(':8001'))

    useEffect(() => {
        console.log('Inside of useEffect for socket.io-client')
        socket.on("connect", () => {
            console.log('We are connected')
            console.log(socket.id)
        })
        socket.on('added_dive', (data) => {
            setList((currentDiveList) => [data, ...currentDiveList])
        })
        socket.on('dive_deleted', (deletedDiveId) => {
            setList((currentDiveList) => {
                return currentDiveList.filter((oneDive) => {
                    return oneDive._id !== deletedDiveId
                })
            })

        })
        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8001/api/allDives')
            .then((res) => {
                console.log(res)
                setList(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='flex-wrap mb-2'>
            <div className='d-flex justify-content-around align-items-center'>
                <h1>Dive List</h1>
                <Link to={'/form'}>add a dive to the list</Link>
            </div>
            <h3>These dives are looking for a good home!</h3> <br /><br />
            <table className='table table-hover border border-3'>
                <thead>
                    <th scope='col'>Name</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Actions</th>
                </thead>
                <tbody>
                    {
                        list.map((dive, index) => (
                            <tr key={index}>
                                <td>{dive.name}</td>
                                <td>{dive.type}</td>
                                <td>
                                    <Link className='btn btn-secondary m-1' to={`/divePage/${dive._id}`}>Details</Link>
                                    <Link className='btn btn-secondary' to={`/edit/${dive._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DiveList