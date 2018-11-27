/*
grades: [
    {
        name: bio,
        grades:[
            {
                value: 5.3,
                weight: 1
            },
            {
                value: 6.2,
                weight: 3
            }
        ],
        weighfactor: 3
    }
]
*/

//return for weighfactor 1,2,3 and specifics
module.exports = (req, res) => {
    const grades = req.query.grades;
    const baseline = req.query.baseline || 5.5;

    if (!grades) return res.status(400).send({
        status: "ERROR",
        error: "NoGradesProvided",
    });

    const results = [];
    JSON.parse(grades).forEach(subject => {
        subject.weighfactor = subject.weighfactor || 1;

        let totalWeight = 0;
        subject.grades.forEach(x => totalWeight += x.weight);
        let gradesAddedValues = 0;
        subject.grades.forEach(x => gradesAddedValues += (x.weight * x.value));

        let requiredGrades = [
            {
                weight: subject.weighfactor,
                value: Math.round((baseline * (totalWeight + subject.weighfactor) - gradesAddedValues) / subject.weighfactor * 10) /10
            },
            {
                weight: 1,
                value: Math.round((baseline * (totalWeight + 1) - gradesAddedValues) / 1 * 10) /10
            },
            {
                weight: 2,
                value: Math.round((baseline * (totalWeight + 2) - gradesAddedValues) / 2 * 10) /10
            },
            {
                weight: 3,
                value: Math.round((baseline * (totalWeight + 3) - gradesAddedValues) / 3 * 10) /10
            }
        ]

        requiredGrades.map(x => {
            if (x.value < 1)
                x.value = 1;
            return x
        });

        results.push({
            name: subject.name,
            requiredGrades
        })
    });
    console.log(results)
    res.send(results)

}