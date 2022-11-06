import '../Skateboarding/Skateboarding.scss';
import CounterStrikeResult from '../../components/CounterStrikeResult/CounterStrikeResult';
import { Match } from '../../models/matchInterface';
import jsonData from '../../users.json'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    csResult: Match[];
    setCsResult: (csResult: Match[]) => void;
}


const Counterstrike = ({csResult, setCsResult}: Props) => {

    const navigate = useNavigate();

    let csCount = 0;

    useEffect(() => {
        const sortUserResults = [...jsonData.users[0].counterstrikeresults].sort((a, b) => {
            if (b.date <= a.date) {
                return b.date <= a.date ? -1 : 1;
            } else {
                return a.date > b.date ? -1 : 1;
            }
        });
        setCsResult(sortUserResults);
    }, []);

    const navigateAddMatch = () => {
        navigate("addmatch");
    }

    const handleOptions = (e: any) => {

        const dateCs = [...jsonData.users[0].counterstrikeresults].sort((a, b) => {
            if (b.date <= a.date) {
                return b.date <= a.date ? -1 : 1;
            } else {
                return a.date > b.date ? -1 : 1;
            }
        });

        if (e.target.value === "Alla matcher") {

            const allCsGames = [...dateCs].filter((csGame) => {
                return csGame;
            });
            setCsResult(allCsGames);

        } else if (e.target.value === "Senaste 10 matcher") {

            const tenCsMatches = [...dateCs].filter((cs) => {
                if (csCount < 10) {
                    csCount ++;
                    return cs;
                }
            });
            setCsResult(tenCsMatches);
        } else {
            const noWinnerCopy = [...jsonData.users[0].counterstrikeresults];
            const noWinner = noWinnerCopy.filter((result) => {
                if (!(result.status.includes("vinst") || result.status.includes("förlust"))) {
                    return result;
                }
            });
            setCsResult(noWinner);
        }
    }

    const CounterstrikeResults = csResult.map((result) => {
        return < CounterStrikeResult key={result.resultId} result={result}/>
    });


    return(
        <div className="competition-wrapper">
            <main className="competition-container">
                <header className="competition-header">
                    <h2> Counter-Strike </h2>
                </header>
                <section className="competition-filter">
                    <button className="competition-button-visible" onClick={navigateAddMatch}> Lägg till ny match </button>
                    <select className="competition-filtering" onChange={(e) => {handleOptions(e)}}>
                        <option value="Alla matcher">Alla matcher</option>
                        <option value="Senaste 10 matcher">Senaste 10 matcher</option>
                        <option value="Matcher utan vinnare">Matcher utan vinnare</option>
                    </select>
                </section>
                { CounterstrikeResults }
            </main>
        </div>
    )
}

export default Counterstrike;