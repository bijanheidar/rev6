const db = require("../models");
// const createApplicant = function (courseId, applicant) {
//     return db.Applicant.create(applicant).then(docApplicant => {
//         console.log("\n>> Created applicant:\n", docApplicant);

//         return db.Course.findByIdAndUpdate(
//             courseId,
//             { $push: { applicants: docApplicant._id } },
//             { new: true, useFindAndModify: false }
//         );
//     });
// };

// const getCourseWithPopulate = function (id, populatePath) {
//     return db.Course.findById(id).populate("applicants", "-_id -__v");
// };

// const getCourseesInProgram = function (programId) {
//     return db.Course.find({ program: programId })
//         .populate("program", "title -_id")
//         .select("-applicants -__v");
// };

const allCourses = function () {
    return db.Course.find({})
        .select("-__v")
        // .sort({ startDate: 1 })
        .populate({
            path: "program",
            select: "title -_id"
            // options: { sort: { 'title': 1 } }
        });
};

const allPrograms = function () {
    return db.Program.find({})
        .select("-__v")
};

const allTeachers = function () {
    return db.Teacher.find({})
        .select("-__v")
};

// const allCoursesPopulatePrograms = function () {
//     return data = db.Course.find({})
//         .populate({
//             path: "program"
//         });

// }

const allApplications = function () {

    return data = db.Application.find({})
        .populate({
            path: "applicant"
        })
        .populate({
            path: "course"
        });

}

const allApplicants = function () {

    return data = db.Applicant.find({})
        .select("-__v");
        // .sort({ email: 1 });
}

const cousesOfAnEmail = function (_email) {
    const data = db.Application.find({})
        .select("applicant course requestDate")
        .populate({
            path: "applicant",
            select: "email -_id"
        })
        .populate({
            path: "course",
            select: "title"
        }).find({ "applicant.email": _email });
    return data
};

const addProgram = function (c) {
    return db.Program.create(c).then(newProgram => {
        console.log("\n>> Created Program in dbtools:\n", newProgram);
        return newProgram;
    });
};

const addCourse = function (c) {
    return db.Course.create(c).then(docCourse => {
        console.log("\n>> Created Course:\n", c);
        return docCourse;
    });
};

const addProgramToCourse = function (courseId, programId) {
    return db.Course.findByIdAndUpdate(
        courseId,

        // if w/o $push: only one category id cab be added one time.
        // { $push: {category: categoryId} },
        { program: programId },
        { new: true, useFindAndModify: false }
    );
};

const lookup = () => {
    const result = db.Apllication.aggregate([
        {
            '$addFields': {
                'applicantId': {
                    '$toString': '$applicant'
                }
            }
        }, {
            '$lookup': {
                'from': 'applicants',
                'localField': 'applicantId',
                'foreignField': '_id',
                'as': 'string'
            }
        }
    ])
    return result;
}



const addApplicant = function (applicantData) {
    return db.Applicant.create(applicantData)
        .then(docApplicant => {
            console.log("\n>> Created applicant:\n", docApplicant);
            return docApplicant;
        });
};

const addApplicationLinkApplicatAndCourse = function (applicantionData) {
    return db.Application.create(applicantionData)
        .then(docApplication => {
            console.log("\n>> Created application:\n", docApplication);
            return docApplication;
        });

};

const countApplication = () => {
    const totalApplications = db.Application.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ]);

    const totalEmails = db.Application.aggregate(
        [
            {
                '$group': {
                    '_id': '$applicant'
                }
            }, {
                '$group': {
                    '_id': null,
                    'count': {
                        '$sum': 1
                    }
                }
            }
        ]);

    return totalEmails;
}

const addApplicant_old = function (applicantData) {

    return db.Applicant.findOne({ email: applicantData.email })
        .then(result => {
            if (!result === null) { // existing email
                console.log("\n>> Existing applicant:\n", result.name);
                applicationData._id = result._id
                console.log("\n>> Existing applicant:\n", result.name);
                return applicationData;
            }
            else {
                return db.Applicant.create(applicantData)
                    .then(docApplicant => {
                        console.log("\n>> Created applicant:\n", docApplicant);
                        return docApplicant;
                    });
            };
        });

};

//--------------------------------------------------------------

const getCourseWithPopulate = function (id, populatePath) {
    return db.Course.findById(id).populate("applicants", "-_id -__v");
};

const getCoursesInProgram = function (programId) {
    return db.Course.find({ program: programId })
        .populate("program", "title -_id")
        .select("-applicants -__v");
};

module.exports = {
    db,
    allCourses,
    allPrograms,
    allApplicants,
    allTeachers,
    allApplications,
    cousesOfAnEmail,
    addProgram,
    addCourse,
    addProgramToCourse,
    addApplicant,
    addApplicationLinkApplicatAndCourse,
    getCourseWithPopulate,
    getCoursesInProgram
};