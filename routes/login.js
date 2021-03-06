const { default: magister, getSchools } = require('magister.js');

module.exports  = (req, res) => {

    //For developing frontend, uncomment
    //if (process.argv.includes("-dev")) return res.send(require(require("path").join(__dirname, "../dev/test_results")))

    magister({
        school: {
            "id": "72b4628e-ecdc-4483-89a8-4a46649ba5b3",
            "name": "Willem de Zwijger College Bussum",
            "url": "https://wdz.magister.net"
        },
        username: req.body.username,
        password: req.body.password,
        authCode: "8e737d43d2fc"
    }).then (async m => {
        
        const courses = await m.courses();
        const last_course = courses[courses.length - 1];
        const grades = await last_course.grades();

        //Stolen {
        const classes = {};
        const averages = {};
        grades.forEach(grade => {
            
            //Gather averages for fact-check
            if (grade.type.header.toLowerCase().startsWith("eind") && grade.grade.toString().length > 1)
            averages[grade.class.abbreviation] = grade.grade.replace(",",".");
            
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

        res.send({classes, averages})

    }).catch(err => {
        if (err.message === "Invalid password")
            res.status(401).send(err);
        else {
            res.status(500).send(err);
            console.error(err);
        }
    })

};
