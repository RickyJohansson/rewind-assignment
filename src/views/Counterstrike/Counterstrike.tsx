import '../Skateboarding/Skateboarding.scss';
import CounterStrikeResult from '../../components/CounterStrikeResult/CounterStrikeResult';
import { Match } from '../../models/matchInterface';
import jsonData from '../../users.json'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    csResult: Match[];
    setCsResult: (csResult: Match[]) => void;
}


const Counterstrike = ({csResult, setCsResult}: Props) => {

    const navigate = useNavigate();

    const [latestWins, setLatestWins] = useState<Boolean>(false);

    let csCount = 0;

    useEffect(() => {
        const sortUserResults = [...jsonData.users[0].counterstrikeresults].sort((a, b) => {
            if (b.date <= a.date) {
                return b.date <= a.date ? -1 : 1;
            } else {
                return a.date > b.date ? -1 : 1;
            }
        });
        setLatestWins(false);
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
            setLatestWins(false);
            setCsResult(allCsGames);

        } else if (e.target.value === "Senaste 10 matcher") {

            const tenCsMatches = [...dateCs].filter((cs) => {
                if (csCount < 10) {
                    csCount ++;
                    return cs;
                }
            });
            setLatestWins(false);
            setCsResult(tenCsMatches);

        } else if (e.target.value === "Vinster senaste 10 matcher") {

            setLatestWins(true);

            const tenCsMatches = [...dateCs].filter((cs) => {
                if (csCount < 10) {
                    csCount ++;
                    return cs;
                }
            });

            const tenLastWins = [...tenCsMatches].filter((csGame) => {
                if (csGame.status == "vinst") {
                    return csGame;
                }
            });
            setCsResult(tenLastWins);

        } else {
            const noWinnerCopy = [...jsonData.users[0].counterstrikeresults];
            const noWinner = noWinnerCopy.filter((result) => {
                if (!(result.status.includes("vinst") || result.status.includes("förlust"))) {
                    return result;
                }
            });
            setLatestWins(false);
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
                        <option value="Vinster senaste 10 matcher">Vinster senaste 10 matcher</option>
                        <option value="Matcher utan vinnare">Matcher utan vinnare</option>
                    </select>
                </section>
                { latestWins ? <p>Antal vinster: {csResult.length} av 10</p> : '' }
                { CounterstrikeResults }
            </main>
        </div>
    )
}

export default Counterstrike;