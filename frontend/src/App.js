import React, { useEffect, useState } from 'react'
import AssignmentsListByCourse from './components/AssignmentsList'
import './App.css'

const PORT = 4001
const URL = `http://localhost:${PORT}/`

const App = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(URL + 'getCoursesByUser')
    .then(res =>res.json())
    .then(data => {
        console.log(data)
        setState(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const getCoursesByUser = () => {
  }

  return (
    <div className='App container'>
      <div id="accordion">
        {state.map(course => <AssignmentsListByCourse courseName={course.name} courseID={course.id} key={course.id}/>)}
      </div>
    </div>
  )
}

export { URL }
export default App