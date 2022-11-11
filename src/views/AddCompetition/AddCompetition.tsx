import './AddCompetition.scss';
import { useNavigate } from 'react-router-dom';
import jsonData from '../../users.json';
import { Competition } from '../../models/competitionInterface';
import InputComp from '../../components/InputComp/InputComp';
import { useState } from 'react';


interface Props {
    formCompetition: Competition;
    setFormCompetition: (formCompetition: Competition) => void;
}

const AddCompetition = ({formCompetition, setFormCompetition}: Props) => {

    type InputObj = {
        skater: string;
        id: number;
    }

    const navigate = useNavigate();

    const [compName, setCompName] = useState<string>("");
    const [compWinner, setCompWinner] = useState<string>("");
    const [compPlace, setCompPlace] = useState<string>("");
    const [compDate, setCompDate] = useState<string>("");
    const [hidden, setHidden] = useState<Boolean>(true);
    const [participantInputs, setParticipantInputs] = useState<Array<InputObj>>([{ skater: "", id: 0 }]);
    const overlayHidden = hidden ? "hidden" : "show";
    const hide = hidden ? "" : "-hide";

    const addComp = (e: any) => {
        e.preventDefault();
        setHidden(false);
        const copyPart = [...participantInputs]
        const allInputs = copyPart.map((inputs) => {return inputs.skater});
        const lastResultId = jsonData.users[0].skateboardingresults.reduce((prev, current) => {
            return (prev.resultId > current.resultId) ? prev : current;
        });
        setFormCompetition({ resultId: lastResultId.resultId + 1, competition: compName, winner: compWinner,
                placement: compPlace, date: compDate, participants: allInputs });
    }

    const addInput = () => {
        const newCopyPart = [...participantInputs, { skater: "", id: participantInputs.length }]
        setParticipantInputs(newCopyPart);
    }

    const deleteInput = () => {
        const copy = [...participantInputs]
        copy.pop();
        setParticipantInputs(copy);
    }

    const navigateComps = () => {

        const participants = [...participantInputs];

        const filteredParticipants = participants.map((part) => {
            return part.skater
        });

        const allUsers = [...jsonData.users];
        const allFullNames = [...allUsers].map((user) => {
            return user.fullname
        });


        const findNames = [...filteredParticipants].filter((user) => {
            if (!allFullNames.includes(user)) {
                return user
            }
        });

        const filteredFindNames = [...findNames].filter((name, index) => findNames.indexOf(name) === index);

        filteredFindNames.map((user) => {
            const lastUser = [...jsonData.users].slice(-1);
            const lastUserId = lastUser[0].userId;
            jsonData.users.push({
                "userId": lastUserId + 1,
                "name": `${user}`,
                "nickname": `${user}`,
                "lastname": "",
                "fullname": `${user}`,
                "age": "",
                "sports": [""],
                "skateboardingstatistics": 
                {
                    "competitions": "0",
                    "wins": "0",
                    "losses": "0"
                },
                "skateboardingresults": [{
                    "resultId": 1,
                    "competition": "",
                    "winner": "",
                    "placement": "",
                    "date": "",
                    "participants": [""]
                    }],
                "counterstrikestatistics": 
                {
                    "matches": "5",
                    "wins": "2",
                    "losses": "1"
                },
                "counterstrikeresults": [{
                    "resultId": 1,
                    "match": "",
                    "status": "",
                    "date": "",
                    "redteam": [""],
                    "blueteam": [""]
                }]
            });
        });

        jsonData.users[0].skateboardingresults.push(formCompetition);
        navigate("/my-page/myskateboardcompetitions");
    }

    const navigateBack = () => {
        navigate("/my-page/myskateboardcompetitions");
    }


    return(
        <div className="addComp-wrapper">
            <section className="addComp-container">
                <header className="addComp-header">
                    <h2>Skateboarding</h2>
                    <p>Lägg till ny tävling</p>
                </header>
                <form className="addComp-forms" onSubmit={(e: any) => addComp(e)}>
                    <label htmlFor="forms-compName">Namn för tävlingen: </label>
                    <input type="text" className="forms-compName" onKeyUp={(e: any) => setCompName(e.target.value)} required/>
                    <label htmlFor="forms-winner">Vinnare: </label>
                    <input type="text" className="forms-winner" onKeyUp={(e: any) => setCompWinner(e.target.value)} required/>
                    <label htmlFor="forms-placement">Placering: (1:a, 2:a?)</label>
                    <input type="text" className="forms-placement" onKeyUp={(e: any) => setCompPlace(e.target.value)} required/>
                    <label htmlFor="forms-date">Datum(YYYY-MM-DD): </label>
                    <input type="text" className="forms-date" onKeyUp={(e: any) => setCompDate(e.target.value)} required/>
                    <label htmlFor="forms-participants">Deltagare: </label>
                    { participantInputs.map((participant, index) => {
                        return <InputComp key={index} skater={participant.skater} index={index} participantInputs={participantInputs} setParticipantInputs={setParticipantInputs}/>
                    }) }
                    <section className="button-container">
                        <button type="button" className="add-participant" onClick={addInput}>Lägg till deltagare</button>
                        <button type="button" className="add-participant" onClick={deleteInput}>Ta bort deltagare</button>
                    </section>
                    <div className={`overlay-${overlayHidden}`}>
                        <h2>Tävlingen är nu tillagd i ditt angivna format</h2>
                        <button type="button" className="overlay-button" onClick={navigateComps}>OK</button>
                    </div>
                    <section className={`addComp-buttons${hide}`}>
                        <input type="submit" value="Lägg till tävling" className="button-add" />
                        <button type="button" className="button-back" onClick={navigateBack}>Avbryt</button>
                    </section>
                </form>
            </section>
        </div>
    )
}

export default AddCompetition;