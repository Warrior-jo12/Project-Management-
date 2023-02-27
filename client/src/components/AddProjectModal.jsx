import React , { useState }from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CLIENTS } from '../Queries/ClientQueries'
import { ADD_PROJECT } from '../mutations/ProjectMutation'
import { GET_PROJECTS } from '../Queries/projectQueries'
const AddProjectModal = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('new')
    const [clientID, setClientID] = useState('')

    const [addProject] = useMutation(ADD_PROJECT,{
        variables: {name, description, clientID, status},
        refetchQueries: [{query: GET_PROJECTS}]
    })

    const {loading, error, data} = useQuery(GET_CLIENTS);


    const onSubmit = (e) => {
        e.preventDefault()
        addProject(name, description, clientID, status)
        setName('');
        setDescription('')
        setStatus('new')
        setClientID('')
    }
   if (loading) return null;
   if (error) return 'Something Went Wrong'

  return (
    <>
        {!loading && !error && (
            <> 
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
  <div className="d-flex align-items-center">
    <FaList className='icon'/>
    <div>New Project</div>
  </div>
</button>


<div className="modal fade" id="addProjectModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addProjectModal">Add Project</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className='mb-3' onSubmit={onSubmit}>
            <div className="mb-3">
                <label className='form-label'>
                Name
                </label>
                <input type='text' className='form-control' id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className='form-label'>
                Description
                </label>
                <textarea className='form-control'  id='description' value={description} onChange={(e)=>setDescription(e.target.value)}>

                </textarea>
            </div>
            
            <div className="mb-3">
                <label className='form-label'>
                Status
                </label>
                <select
                id='status'
                className='form-select'
                value={status}
                onChange={e => setStatus(e.target.value)}
                >
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>

                </select>
            </div>

            <div className="mb-3">
                <label className='form-label'>Client</label>
                <select  id="clientID" className='form-select'
                    value={clientID} onChange={e => setClientID(e.target.value)}
                >
                    <option value=''>
                        Select Client
                    </option> 
                    {
                        data.clients.map((client)=>(
                            <option key={client.id}
                                value={client.id}
                            >
                                {client.name}

                            </option>
                        ))
                    }                   
                </select>
            </div>

            <button type='submit' data-bs-dismiss="modal" className='btn btn-primary'>Submit</button>
        </form>
      </div>   
      
    </div>
  </div>
</div>
            </>
        )} 

    </>
  )
}

export default AddProjectModal
