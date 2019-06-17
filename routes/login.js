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
                grade.type.header === "PR" ||
                grade.type.header.startsWith("Eind") ||
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

        console.log(classes)

        const results = {};
        for (let nameOfClass in classes) {
            let grades = classes[nameOfClass];
            let total_points = 0;
            let count = 0;

            for (let i=0;i<grades.length;i++){
                if (grades[i].weight) {
                    total_points += grades[i].value * grades[i].weight;
                    count += grades[i].weight;
                }
            }

            let requiredGrade = [
                ((minimum_grade * (count + 1) - total_points) / 1).toFixed(1),
                ((minimum_grade * (count + 2) - total_points) / 2).toFixed(1),
                ((minimum_grade * (count + 3) - total_points) / 3).toFixed(1),
            ]

            requiredGrade = requiredGrade.map( g => g < 1 ? 1 : g)

            results[nameOfClass] = {
                1: requiredGrade[0],
                2: requiredGrade[1],
                3: requiredGrade[2]
            }
        }
        //Stolen }

        res.send(results)

    }).catch(err => {
        res.status(300).send(err);
        console.log(err);
    })

};