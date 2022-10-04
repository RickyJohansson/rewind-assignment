import './CounterStrikeResult.scss'
import { Match } from '../../models/matchInterface';
import jsonData from '../../users.json';

interface Props {
    result: Match;
}

const CounterStrikeResult = ({result}: Props) => {

    let winners: Array<string> = [];
    let loosers: Array<string> = [];

    if (result.status !== 'oavgjort') {
        if (result.status === 'förlust' && result.redteam.includes(jsonData.users[0].nickname)) {
            winners = result.blueteam;
            loosers = result.redteam;
        } else if (result.status === 'vinst' && result.blueteam.includes(jsonData.users[0].nickname)) {
            winners = result.blueteam;
            loosers = result.redteam;
        } else {
            loosers = result.blueteam;
            winners = result.redteam;
        }
    }
    

    return(
        <div className="counterstrike-result--wrapper">
            <section className="counterstrike-result-info">
                <p>Match: <span>{result.match}</span></p>
                <p>Status: <span>{result.status}</span></p>
                <p>Vinnare: <span>{winners.join(" - ")}</span></p>
                <p>Förlorare: <span>{loosers.join(" - ")}</span></p>
                <p>Datum: <span>{result.date}</span></p>
                <p>Röda laget: <span>{result.redteam.join(" - ")}</span></p>
                <p>Blå laget: <span>{result.blueteam.join(" - ")}</span></p>
            </section>
        </div>
    )
}

export default CounterStrikeResult;