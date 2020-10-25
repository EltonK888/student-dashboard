import React, { useEffect } from 'react';


const AssignmentItem = (props) => {

    const handleCourses= () => {
        fetch(`${URL}/courses`)
        .then(res => {
            console.log(res);
        })
    }

    return (
        <tr>
            <td>{props.assignmentName}</td>
            <td>{props.dueDate === null ? "Your instructor hasn't assigned a due date yet" : props.dueDate}</td>
            <td>{props.worth}</td>
        </tr>
    )
}

export default AssignmentItem;