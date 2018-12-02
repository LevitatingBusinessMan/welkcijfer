const { default: Magister } = require('magister-api')

module.exports = (req, res) => {
    if (!req.query.school) return res.status(400).send({
        status: "ERROR",
        error: "NoSchoolProvided",
    });
    if (!req.query.gebruikersnaam) return res.status(400).send({
        status: "ERROR",
        error: "NoUsernameProvided",
    });
    if (!req.query.wachtwoord) return res.status(400).send({
        status: "ERROR",
        error: "NoPasswordProvided",
    });

    const magister = new Magister(req.query.school, req.query.gebruikersnaam, req.query.wachtwoord)
    magister.authenticate()
        .then(session => {
            session.getGrades()
            .then(grades => {
                console.log(grades[0])
                grades = grades.filter(grade => grade.counts && !isNaN(grade.value.replace(",",".")))
                .map(grade => {
                    return {
                        "vak": grade.subject.code,
                        "omschrijving": grade.description,
                        "waarde": grade.value,
                        "weegfactor": grade.rawData.weegfactor
                    }
                }) //weighingfactor property werkt niet
                res.send(grades)
            })
        }).catch(error => {
            return res.status(500).send("An error occured :v");
        })

}