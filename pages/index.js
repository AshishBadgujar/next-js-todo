import Axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../components/navbar'
import auth0 from '../helpers/auth0'
import baseUrl from '../helpers/baseUrl'

export default function Home({ user, todos }) {
  const [text, setText] = useState('')
  const [tasks, setTasks] = useState(todos)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.put(`${baseUrl}/api/${user.sub}`, { text })
      const res2 = res.data
      setTasks(res2)
      setText('')
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id) => {
    const res = await Axios.delete(`${baseUrl}/api/${user.sub}`, { data: { id } })
    const res2 = res.data
    if (res2.err) {
      console.log(res2.err)
    } else {
      setTasks(res2)
    }
    console.log(res2, "this is delete response")
  }
  return (
    <>
      <Navbar user={user} />
      <div className="container-sm mt-3">
        {user ?
          <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="type here..." value={text} onChange={(e) => setText(e.target.value)} aria-describedby="basic-addon1" />
            </div>
            <button type="submit" style={{ width: "100%" }} className="btn btn-primary"><i className="fas fa-plus"></i>add</button>
          </form>
          :
          <h1>Login first</h1>
        }
        {tasks.map(item => (
          <div className="card mt-2" key={item._id}>
            <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {item.text}
              <button type="button" className="btn" onClick={() => handleDelete(item._id)}><i className="fas fa-trash-alt"></i>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await auth0.getSession(ctx.req)
  var todos = []
  if (session) {
    try {
      const res = await Axios.get(`${baseUrl}/api/${session.user.sub}`)
      todos = res.data
    } catch (error) {
      console.log(error)
    }
  }
  return {
    props: {
      user: session?.user || null,
      todos: todos,
    }
  }
}
