import '../AddCompetition/AddCompetition.scss';
import { useNavigate } from 'react-router-dom';
import jsonData from '../../users.json';
import { useState } from 'react';
import { Match } from '../../models/matchInterface';


interface Props {
    formMatch: Match;
    setFormMatch: (formMatch: Match) => void;
}

const AddMatch = ({formMatch, setFormMatch}: Props) => {

    const navigate = useNavigate();

    const [matchStatus, setMatchStatus] = useState<string>("");
    const [matchDate, setMatchDate] = useState<string>("");
    const [matchRed, setMatchRed] = useState<Array<string>>([]);
    const [matchBlue, setMatchBlue] = useState<Array<string>>([]);
    const [hidden, setHidden] = useState<Boolean>(true);
    const overlayHidden = hidden ? "hidden" : "show";
    const hide = hidden ? "" : "-hide";


    const addMatch = (e: any) => {
        e.preventDefault();
        setHidden(false);
        const lastResultId = jsonData.users[0].counterstrikeresults.reduce((prev, current) => {
            return (prev.resultId > current.resultId) ? prev : current;
        });
        setFormMatch({ resultId: lastResultId.resultId + 1, match: "team", status: matchStatus,
                date: matchDate, redteam: matchRed, blueteam: matchBlue });
    }

    const navigateMatches = () => {
        jsonData.users[0].counterstrikeresults.push(formMatch);
        navigate("/my-page/mycsgames");
    }

    const navigateBack = () => {
        navigate("/my-page/mycsgames");
    }


    return(
        <div className="addComp-wrapper">
            <section className="addComp-container">
                <header className="addComp-header">
                    <h2>Counter-Strike</h2>
                    <p>Lägg till ny match</p>
                </header>
                <form className="addComp-forms" onSubmit={(e) => addMatch(e)}>
                    <label htmlFor="forms-status">Status (vinst/förlust/oavgjort):</label>
                    <input type="text" className="forms-status" onKeyUp={(e: any) => setMatchStatus(e.target.value)} required/>
                    <label htmlFor="forms-date">Datum(YYYY-MM-DD): </label>
                    <input type="text" className="forms-date" onKeyUp={(e: any) => setMatchDate(e.target.value)} required/>
                    <label htmlFor="forms-redteam">Red Team (separera namn med komma ","): </label>
                    <input type="text" className="forms-redteam" onKeyUp={(e: any) => setMatchRed([e.target.value])} required/>
                    <label htmlFor="forms-redteam">Blue Team (separera namn med komma ","): </label>
                    <input type="text" className="forms-redteam" onKeyUp={(e: any) => setMatchBlue([e.target.value])} required/>
                    <div className={`overlay-${overlayHidden}`}>
                        <h2>Tävlingen är nu tillagd i ditt angivna format</h2>
                        <button type="button" className="overlay-button" onClick={navigateMatches}>OK</button>
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

export default AddMatch;