const validCourses = [
    "INGLÉS",
    "BIOLOGÍA",
    "TECNOLOGÍA",
    "MATEMÁTICA",
    "SEMINARIO",
    "PSICOLOGÍA",
    "FÍSICA",
    "ÉTICA",
    "TALLER",
    "PRÁCTICA"
];

export const validateCourse = (req, res, next) => {
    if (req.body.course) {
        const courseUpper = req.body.course.toUpperCase();

        if (!validCourses.includes(courseUpper)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course. Course must be an authorized one"
            })
        }

        req.body.course = courseUpper;
        next();
    }

};