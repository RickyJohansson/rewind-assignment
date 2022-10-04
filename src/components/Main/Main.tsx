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
    
    let skateCounter: number = 0;

    const tenSkateboardResults = skateboardResults.map((result) => {   
        if (skateCounter < 10) {
            skateCounter++;
            return < SkateboardResult key={result.resultId} result={result}/>
        }
    });

    let csCounter: number = 0;

    const tenCsResults = counterstrikeResults.map((result) => {   
        if (csCounter < 10) {
            csCounter++;
            return < CounterstrikeResult key={result.resultId} result={result}/>
        }
    });


    return (
        <main className="main-container">
            <section className="main-skateboarding">
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