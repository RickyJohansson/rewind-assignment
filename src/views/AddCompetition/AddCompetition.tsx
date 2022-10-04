import './AddCompetition.scss';
import { useNavigate } from 'react-router-dom';
import jsonData from '../../users.json';
import { Competition } from '../../models/competitionInterface';
import { useState } from 'react';


interface Props {
    formCompetition: Competition;
    setFormCompetition: (formCompetition: Competition) => void;
}

const AddCompetition = ({formCompetition, setFormCompetition}: Props) => {

    const navigate = useNavigate();

    const [compName, setCompName] = useState<string>("");
    const [compWinner, setCompWinner] = useState<string>("");
    const [compPlace, setCompPlace] = useState<string>("");
    const [compDate, setCompDate] = useState<string>("");
    const [compPart, setCompPart] = useState<Array<string>>([]);
    const [hidden, setHidden] = useState<Boolean>(true);
    const overlayHidden = hidden ? "hidden" : "show";
    const hide = hidden ? "" : "-hide";


    const addComp = (e: any) => {
        e.preventDefault();
        setHidden(false);
        const lastResultId = jsonData.users[0].skateboardingresults.reduce((prev, current) => {
            return (prev.resultId > current.resultId) ? prev : current;
        });
        setFormCompetition({ resultId: lastResultId.resultId + 1, competition: compName, winner: compWinner,
                placement: compPlace, date: compDate, participants: compPart });
    }

    const navigateComps = () => {
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
                <form className="addComp-forms" onSubmit={(e) => addComp(e)}>
                    <label htmlFor="forms-compName">Namn för tävlingen: </label>
                    <input type="text" className="forms-compName" onKeyUp={(e: any) => setCompName(e.target.value)} required/>
                    <label htmlFor="forms-winner">Vinnare: </label>
                    <input type="text" className="forms-winner" onKeyUp={(e: any) => setCompWinner(e.target.value)} required/>
                    <label htmlFor="forms-placement">Placering: </label>
                    <input type="text" className="forms-placement" onKeyUp={(e: any) => setCompPlace(e.target.value)} required/>
                    <label htmlFor="forms-date">Datum(YYYY-MM-DD): </label>
                    <input type="text" className="forms-date" onKeyUp={(e: any) => setCompDate(e.target.value)} required/>
                    <label htmlFor="forms-participants">Deltagare (separera namn med komma ","): </label>
                    <input type="text" className="forms-participants" onKeyUp={(e: any) => setCompPart([e.target.value])} required/>
                    <div className={`overlay-${overlayHidden}`}>
                        <h2>Tävlingen är nu tillagd i ditt angivna format</h2>
                        <button type="button" className="overlay-button" onClick={navigateComps}>OK</button>
                    </div>
                    <section className={`addComp-buttons${hide}`}>
                        <input type="submit" value="Lägg till" className="button-add" />
                        <button type="button" className="button-back" onClick={navigateBack}>Avbryt</button>
                    </section>
                </form>
            </section>
        </div>
    )
}

export default AddCompetition;