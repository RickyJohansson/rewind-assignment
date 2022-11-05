import './Main.scss';
import { useState } from 'react';
import skateboarding from '../../assets/skateboarding.svg';
import counterStrike from '../../assets/counterStrike.svg';
import SkateboardResult from '../SkateboardResult/SkateboardResult';
import CounterstrikeResult from '../CounterStrikeResult/CounterStrikeResult';
import jsonData from '../../users.json';
import { Competition } from '../../models/competitionInterface';
import { Match } from '../../models/matchInterface';

const Main = () => {
    

    const [skateboardResults, setSkateboardResults] = useState<Competition[]>(jsonData.users[0].skateboardingresults);
    const [counterstrikeResults, setCounterstrikeResults] = useState<Match[]>(jsonData.users[0].counterstrikeresults);
    
    let skateCounter = 0;
    let reversedSkateResults = [...skateboardResults].reverse();
    const tenSkateboardResults = reversedSkateResults.map((result) => {   
        if (skateCounter < 10) {
            skateCounter ++;
            return < SkateboardResult key={result.resultId} result={result}/>
        } else if (skateboardResults.length === 0) {
            return <p>Du har för närvarande inga tillagda tävlingar</p>
        }
    });


    let csCounter = 0;
    let reversedCsResults = [...counterstrikeResults].reverse();
    const tenCsResults = reversedCsResults.map((result) => {   
        if (csCounter < 10) {
            csCounter ++;
            return < CounterstrikeResult key={result.resultId} result={result}/>
        } else if (counterstrikeResults.length === 0) {
            return <p>Du har för närvarande inga tillagda matcher</p>
        }
    });


    return (
        <main className="main-container">
            <section className="main-skateboarding">
                <h2 className="text-margin">Upp till 10 av dina senast tillagda resultat</h2>
                <h2>Skateboarding</h2>
                <img src={skateboarding} alt="" />
                <section className="main-skateboarding--matches">
                    {tenSkateboardResults}
                </section>
            </section>
            <section className="main-counter--strike">
                <h2>Counter-Strike</h2>
                <img src={counterStrike} alt="" />
                <section className="main-counter--strike--matches">
                    {tenCsResults}
                </section>
            </section>

        </main>
    )
}

export default Main;