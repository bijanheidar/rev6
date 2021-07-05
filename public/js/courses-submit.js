let retriveCourses = async () => {
    const url = "/allCourses";
    await fetch(url)
        .then(res => res.json())
        .then(res => jsonData = res);

    // const jsonData = [
    //     {
    //         status: ['Apply'],
    //         _id: "60c6ebbdc0cba43b34c68500",
    //         title: 'Pre-Math 20-1',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 3',
    //         program: { title: 'Math' }
    //     },
    //     {
    //         status: ['Apply'],
    //         _id: "60c7c536de1c1e497c237d97",
    //         title: 'Math 20',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 2',
    //         program: { title: 'Math' }
    //     },
    //     {
    //         status: ['Upcoming'],
    //         _id: "60c7c57a39a37d18d4e24f36",
    //         title: 'Calculus ',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 2',
    //         program: { title: 'Math' }
    //     },

    //     {
    //         status: ['Upcoming'],
    //         _id: "60c7c57a39a37d18d4e24f36",
    //         title: 'Calculus ',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 2',
    //         program: { title: 'Math' }
    //     },
    //     {
    //         status: ['Upcoming'],
    //         _id: "60c7c57a39a37d18d4e24f36",
    //         title: 'Calculus ',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 2',
    //         program: { title: 'Math' }
    //     },
    //     {
    //         status: ['Upcoming'],
    //         _id: "60c7c57a39a37d18d4e24f36",
    //         title: 'Calculus ',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 2',
    //         program: { title: 'Math' }
    //     },
    //     {
    //         status: ['Upcoming'],
    //         _id: "60c7c57a39a37d18d4e24f36",
    //         title: 'Calculus ',
    //         startDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         finishDate: "2021 - 06 - 14T21: 09: 14.199Z",
    //         teacher: 'Teacher 2',
    //         program: { title: 'Math' }
    //     }
    // ]

    // document.getElementById("result").innerHTML = JSON.stringify(jsonData);
    if (jsonData.length == 0) {
        document.getElementById("myTableBody").innerHTML = "<h3>No Data yet..............</h3>";
    }
    else {
        var tableHTML = ""
        var course_id
        jsonData.forEach((item) => {
            tableHTML += "<tr style='height: 20px' >"; // height not working !!?
            tableHTML += "<td>" + item.program.title + "</td>";
            tableHTML += "<td>" + item.title + "</td>";
            tableHTML += "<td>" + item.teacher + "</td>";
            // tableHTML += "<td>" + item.startDate + "</td>";
            tableHTML += "<td>" + item.startDate.substring(0, 10) + " / " + item.finishDate.substring(0, 10) + "</td>";
            course_id = item._id;
            if (item.status == "Apply") {
                tableHTML += `<td><button class="btn-sm btn-primary" onclick="hrefFunc('${course_id}','${item.program.title}','${item.title}')">Apply</button></td>`;
                // tableHTML += `<td><button class="btn-sm btn-primary" onclick="window.location.href='/forms/${course_id}'">Apply</button></td>`;
            }
            else {
                tableHTML += "<td>" + item.status + "</td>";
            }
            tableHTML += "</tr>";
        });
        document.getElementById("myTableBody").innerHTML = tableHTML;
    }
}

const hrefFunc = (id, program, course) => {
    window.location.href = '/form-applyCourse';
    if (typeof (Storage) !== "undefined") {
        // Store
        localStorage.setItem("_id", id);
        localStorage.setItem("_program", program);
        localStorage.setItem("_course", course);
        // alert(localStorage.getItem("_course"));
        // Retrieve
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}