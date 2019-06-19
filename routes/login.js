const { default: magister, getSchools } = require('magister.js');

module.exports  = (req, res) => {

    magister({
        school: {
            "id": "72b4628e-ecdc-4483-89a8-4a46649ba5b3",
            "name": "Willem de Zwijger College Bussum",
            "url": "https://wdz.magister.net"
        },
        username: req.body.username,
        password: req.body.password
    }).then (async m => {
        const minimum_grade = parseFloat(req.body.minimum.replace(",",".")) || 5.5
        
        const courses = await m.courses();
        const last_course = courses[courses.length - 1]
        const grades = await last_course.grades();

        //Stolen {
        const classes = {};
        grades.forEach(grade => {
            //Remove workattitude grades and averages
             if (
                grade.type.header !== "Toets" &&
                grade.type.header !== "Toetsweek" &&
                grade.type.header !== "SErap.weging" ||
                !grade.counts || 
                isNaN(parseInt(grade.grade))
            ) return;


            let className = grade.class.abbreviation;
            if (!classes[className]) 
                classes[className] = [];
            
            let {grade: value, weight} = grade;

            classes[className].push({
                value: value.replace(',','.'),
                weight: weight
            });

        });
        //Stolen }

        res.send(classes)

    }).catch(err => {
        if (err.message === "Invalid password")
            res.status(401).send(err);
        else {
            res.status(400).send(err);
            console.log(err);
        }
    })

};