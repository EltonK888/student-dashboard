import React, { useState, useEffect } from 'react'
import AssignmentItem from "./AssignmentInfo"
import { URL } from "../App"

const AssignmentsListByCourse = (props) => {
    const [state, setState] = useState([]);
    const [collapse, setCollapse] = useState(false)

    useEffect(() => {
        getAssignments()
    }, [])

    const getAssignments = () => {
        fetch(URL + 'getAssignmentsByCourse/' + props.courseID)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setState(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggle = () => setCollapse(!collapse);

    return (
        <div>
            <div className="card mt-4 mb-4">
                <div class="card-header">
                    <button class="btn btn-link" data-toggle="collapse" data-target={`#${props.courseID}`} onClick={toggle}>
                        {props.courseName}
                    </button>
                </div>
                <div id={props.courseID} className={collapse ? "collapse show" : "collapse"} data-parent="#accordion">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Assignment Name</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Worth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.map(assignment => <AssignmentItem assignmentName={assignment.name} dueDate={assignment.due_at} worth={assignment.points_possible} key={assignment.id}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentsListByCourse;
