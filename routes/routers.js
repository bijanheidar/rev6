var express = require("express");
var router = express.Router();
const routeFunctions = require("./routeFunctions.js");

// const app = express();
// const path = require("path");
// app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require("body-parser");
// Add body-parser as middleware
const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.json());

router.get("/", (req, res) => {
    res.render("home")
});

router.get("/programs", (req, res) => {
    res.render("programs");
});

router.get("/teachers", (req, res) => {
    res.render("teachers");
});

router.get("/courses", (req, res) => {
    res.render("courses");
});

router.get("/admin", (req, res) => {
    res.render("admin");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/admin", (req, res) => {
    res.render("admin");
});

router.get("/form-applyCourse", (req, res) => {
    // res.render("formsAll.html");
    res.render("form-application");
    // res.render("form-apply.html");
});

router.get("/allCourses", (req, res) => {
    const run = async function () {
        const docVar = await routeFunctions.allCourses();
        return res.send(docVar);
    };
    run();
    connectDbServer();
});


router.get("/allPrograms", (req, res) => {

    const run = async function () {
        const docVar = await routeFunctions.allPrograms();
        return res.send(docVar);
    };
    run();
    connectDbServer();
});

router.get("/allTeachers", (req, res) => {

    const run = async function () {
        const docVar = await routeFunctions.allTeachers();
        return res.send(docVar);
    };
    run();
    connectDbServer();
});

router.get("/allApplications", (req, res) => {
    const run = async function () {
        const docVar = await routeFunctions.allApplications();
        return res.send(docVar);
    };
    run();
    connectDbServer();
});

router.get("/allApplicants", (req, res) => {
    const run = async function () {
        const docVar = await routeFunctions.allApplicants();
        return res.send(docVar);
    };
    run();
    connectDbServer();
});

// router.get("/allCoursesPopulatePrograms", (req, res) => {
//     const run = async function () {
//         const routeFunctions = require("./routeFunctions.js");
//         const docVar = await routeFunctions.allCoursesPopulatePrograms();
//         return res.send(docVar);
//     };
//     run();
//     connectDbServer();
// });

router.get("/CousesOfAnEmail/:_email", (req, res) => {
    const _email = req.params._email;
    const run = async function () {
        const data = await routeFunctions.cousesOfAnEmail(_email);
        console.log("\n>> all Coursee of applicant:\n", data);
        return res.send(data);
    };
    connectDbServer();
    run();
});

router.post("/addProgram", urlencodedParser, (req, res) => {

    try {
        console.log('request body:', req.body);
        //get data from request
        const title = req.body.title;
        const desc = req.body.desc;
        const imageURL = req.body.imageURL;

        if (title && desc) {
            //validates if both variables have a value. If at least one of them is empty or null, the endpoint will return a 400 error (request not valid)
            console.log(`title in router: ${title}`);
            console.log(`desc in router: ${desc}`);

            const run = async function () {
                var data, program
                data = {
                    title: title,
                    desc: desc,
                    imageURL: imageURL
                };
                console.log("data in router:", data)
                program = await routeFunctions.addProgram(data);
                console.log(`Program created: ${program}`);
                // mongoose.connection.close()
                return res.send(program);
            };
            connectDbServer();
            run();



        } else {
            return res.status(400).send("bad request");
        }
    } catch (ex) {
        //if there is any exception, the endpoint will return an 500 error (server error)
        return res.status(500).send("error");
    }
});

router.post("/addCourse", urlencodedParser, (req, res) => {
    try {
        console.log('request body:', req.body);
        //get data from request

        const programId = req.body.programId;
        const title = req.body.title; // i.e. course title
        const date1 = req.body.date1;
        const date2 = req.body.date2;
        const teacher = req.body.teacher;
        const status = req.body.status;


        if (programId && title && date1 && date2 && teacher && status) {
            const run = async function () {
                var data, docVar
                data = {
                    title: title, // i.e. course title
                    startDate: date1,
                    finishDate: date2,
                    teacher: teacher,
                    status: status
                };

                docVar = await routeFunctions.addCourse(data);
                console.log("\n>> New Course doc:\n", docVar);

                // add Program To Course
                docVar = await routeFunctions.addProgramToCourse(docVar._id, programId);
                console.log("\n>> Course linked to program:\n", docVar);
                return res.send(docVar);
            };
            connectDbServer();
            run();



        } else {
            return res.status(400).send("bad request");
        }
    } catch (ex) {
        //if there is any exception, the endpoint will return an 500 error (server error)
        return res.status(500).send("error");
    }
});

router.post("/addApplication", urlencodedParser, (req, res) => {
    try {
        console.log('request body in router:', req.body);
        //get data from request
        const course_id = req.body.course_id;
        const name = req.body.name
        const age = req.body.age;
        const email = req.body.email;
        const phone = req.body.phone;
        const comment = req.body.comment;
        const requestDate = Date.now();


        if (course_id && name && age && email && phone && comment && requestDate) {
            const run = async function () {
                var docVar;
                const applicantData = {
                    name: name,
                    age: age,
                    email: email,
                    phone: phone,
                };
                docVar = await routeFunctions.addApplicant(applicantData);

                const applicationData = {
                    applicant: docVar._id,
                    course: course_id,
                    comment: comment,
                    requestDate: requestDate
                }
                docVar = await routeFunctions.addApplicationLinkApplicatAndCourse(applicationData)
                return res.send(docVar);
            };
            connectDbServer();
            run();

        } else {
            console.log("now if no");
            return res.status(400).send("bad request");
        }
    } catch (ex) {
        //if there is any exception, the endpoint will return an 500 error (server error)
        return res.status(500).send("error");
    }
});

const connectDbServer = () => {

    const mongoose = require("mongoose");
    // const uri = process.env.MONGODB_URI || "mongodb://localhost/myFirstDatabase";
    const uri = process.env.MONGODB_URI || "mongodb+srv://Bijan:12345@cluster0.5iynb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // const uri = "mongodb://localhost/myProjectDb2"
    mongoose
        .connect(uri, {
            // .connect("mongodb+srv://Bijan:12345@cluster0.5iynb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            // .connect("mongodb://localhost/myProjectDb2", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Successfully connect to MongoDB."))

        .catch(err => console.error("Connection error", err));
}

module.exports = router;