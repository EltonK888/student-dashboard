const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const port = 4001
const canvasAPI = require('node-canvas-api')
const { getDiscussions, flattenTopicAndReplies } = require('./canvasDiscussions')
const readCSV = require('./readCSV')
const CPSC121_ID = 53530;
const UBCLA_ID = 69306;
const MY_ID = 388361;

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/test', async (req, res) => {
    getDiscussions(69306)
    .then(discussions => {
        console.log(discussions);
        res.status(200).send(flattenTopicAndReplies(discussions))
    })
    
})

app.get('/courseAnalytics', async (req,res) => {
    canvasAPI.getUsersInCourse(UBCLA_ID)
    .then(data => {
        console.log(data);
        res.status(200).send(data)
    })
})

app.get('/getSyllabusOfCourse', async (req, res) => {
    canvasAPI.getSyllabusOfCourse(CPSC121_ID)
    .then(data => {
        console.log(data)
        res.status(200).send(data)
    })
})

app.get('/getAssignmentsByCourse/:id', async (req, res) => {
    courseID = req.params.id
    canvasAPI.getAssignments(courseID)
    .then(data => {
        console.log(data)
        let filteredData = []
        data.map(assignment => {
            assignmentData = {
                "id": assignment.id,
                "name": assignment.name,
                "due_at": assignment.due_at == null ? null : processDate(assignment.due_at.slice(0, 10)),
                "points_possible": assignment.points_possible
            }
            filteredData.push(assignmentData)
        })
        res.status(200).send(filteredData)
    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })
})

app.get('/getCoursesByUser', async (req, res) => {
    canvasAPI.getCoursesByUser(MY_ID)
    .then(data => {
        console.log(data)
        let filteredData = []
        data.map(course => {
            courseData = {
                "id": course.id,
                "name": course.name
            }
            filteredData.push(courseData)
            console.log(filteredData)
        })
        res.status(200).send(filteredData)
    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })
})

app.get('/getEnrollments', async (req, res) => {
    canvasAPI.getEnrollmentsInCourse(UBCLA_ID)
    .then(data => {
        console.log(data)
        res.status(200).send(data)
    })
    .catch(err => {
        console.log(err);
        res.status(400);
    })
})

// Make API call to Canvas API here
app.get('/getSelf', async (req, res) => {
    await canvasAPI.getSelf()
    .then(self => {
        console.log(self)
        res.status(200).json(self);
    });
})

// Make endpoint for getSelf here


// Make endpoint for getDiscussions here

const processDate = (date) => {
    splitDate = date.split('-');
    year = splitDate[0]
    month = splitDate[1]
    day = splitDate[2]
    console.log(date)
    console.log(splitDate)
    switch (month) {
        case "01":
            month = "Jan"
            break;
        case "02":
            month ="Feb"
            break;
        case "03":
            month = "Mar"
            break;
        case "04":
            month = "Apr"
            break;
        case "05":
            month = "May"
            break;
        case "06":
            month = "Jun"
            break;
        case "07":
            month = "Jul"
            break;
        case "08":
            month = "Aug"
            break;
        case "09":
            month = "Sept"
            break;
        case "10":
            month = "Oct"
            break;
        case "11":
            month = "Nov"
            break;
        case "12":
            month = "Dec"
            break;
        default:
            " "
            break;
    }
    return `${month} ${day} ${year}`
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
