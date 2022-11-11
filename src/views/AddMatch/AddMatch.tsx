import '../AddCompetition/AddCompetition.scss';
import { useNavigate } from 'react-router-dom';
import jsonData from '../../users.json';
import { useState } from 'react';
import { Match } from '../../models/matchInterface';
import { ProfileInfo } from '../../models/profileInterface';


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
    const [red1, setRed1] = useState<string>("");
    const [red2, setRed2] = useState<string>("");
    const [red3, setRed3] = useState<string>("");
    const [red4, setRed4] = useState<string>("");
    const [blue1, setBlue1] = useState<string>("");
    const [blue2, setBlue2] = useState<string>("");
    const [blue3, setBlue3] = useState<string>("");
    const [blue4, setBlue4] = useState<string>("");
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

        const matchPlayers = [...formMatch.redteam, ...formMatch.blueteam];

        const filteredMatchPlayers = matchPlayers.filter((player) => {
            if (player != "" || player.length === 0) {
                return player
            }
        })

        const allUsers = [...jsonData.users];
        const allNames = [...allUsers].map((user) => {
            return user.fullname
        });

        const findNames = [...filteredMatchPlayers].filter((user) => {
            if (!allNames.includes(user)) {
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

        jsonData.users[0].counterstrikeresults.push(formMatch);
        
        navigate("/my-page/mycsgames");
    }

    const navigateBack = () => {
        navigate("/my-page/mycsgames");
    }

    const updateTeams = () => {
        setMatchRed([red1, red2, red3, red4]);
        setMatchBlue([blue1, blue2, blue3, blue4]);
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
                    <label htmlFor="forms-redteam">Red Team: </label>
                    <input type="text" placeholder="Spelare 1" className="forms-redteam" onKeyUp={(e: any) => setRed1(e.target.value)} required/>
                    <input type="text" placeholder="Spelare 2" className="forms-redteam" onKeyUp={(e: any) => setRed2(e.target.value)}/>
                    <input type="text" placeholder="Spelare 3" className="forms-redteam" onKeyUp={(e: any) => setRed3(e.target.value)}/>
                    <input type="text" placeholder="Spelare 4" className="forms-redteam" onKeyUp={(e: any) => setRed4(e.target.value)}/>
                    <label htmlFor="forms-redteam">Blue Team: </label>
                    <input type="text" placeholder="Spelare 1" className="forms-blueteam" onKeyUp={(e: any) => setBlue1(e.target.value)} required/>
                    <input type="text" placeholder="Spelare 2" className="forms-blueteam" onKeyUp={(e: any) => setBlue2(e.target.value)}/>
                    <input type="text" placeholder="Spelare 3" className="forms-blueteam" onKeyUp={(e: any) => setBlue3(e.target.value)}/>
                    <input type="text" placeholder="Spelare 4" className="forms-blueteam" onKeyUp={(e: any) => setBlue4(e.target.value)}/>
                    <div className={`overlay-${overlayHidden}`}>
                        <h2>Tävlingen är nu tillagd i ditt angivna format</h2>
                        <button type="button" className="overlay-button" onClick={navigateMatches}>OK</button>
                    </div>
                    <section className={`addComp-buttons${hide}`}>
                        <input type="submit" value="Lägg till match" className="button-add" onClick={updateTeams}/>
                        <button type="button" className="button-back" onClick={navigateBack}>Avbryt</button>
                    </section>
                </form>
            </section>
        </div>
    )
}

export default AddMatch;