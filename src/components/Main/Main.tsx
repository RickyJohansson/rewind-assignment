import './Main.scss';
import { useState } from 'react';
import skateboarding from '../../assets/skateboarding.svg';
import counterStrike from '../../assets/counterStrike.svg';
import SkateboardResult from '../SkateboardResult/SkateboardResult';
import CounterstrikeResult from '../CounterStrikeResult/CounterStrikeResult';
import jsonData from '../../users.json';
import { Competition } from '../../models/competitionInterface';
import { Match } from '../../models/matchInterface';

interface Props {
    profileName: string;
}

const Main = ({profileName}: Props) => {
    

    const [skateboardResults, setSkateboardResults] = useState<Competition[]>(jsonData.users[0].skateboardingresults);
    const [counterstrikeResults, setCounterstrikeResults] = useState<Match[]>(jsonData.users[0].counterstrikeresults);
    
    let skateCounter = 0;
    let reversedSkateResults = [...skateboardResults].reverse();
    const tenSkateboardResults = reversedSkateResults.map((result) => {   
        if (skateCounter < 10 && reversedSkateResults.length > 0) {
            skateCounter ++;
            return < SkateboardResult key={result.resultId} result={result} profileName={profileName}/>
        }
    });


    let csCounter = 0;
    let reversedCsResults = [...counterstrikeResults].reverse();
    const tenCsResults = reversedCsResults.map((result) => {   
        if (csCounter < 10 && reversedCsResults.length > 0) {
            csCounter ++;
            return < CounterstrikeResult key={result.resultId} result={result}/>
        }
    });


    return (
        <main className="main-container">
            <section className="main-skateboarding">
                <h2 className="text-margin">Upp till 10 av dina senast tillagda resultat</h2>
                <h2>Skateboarding</h2>
                <img src={skateboarding} alt="" />
                <section className="main-skateboarding--matches">
                    { reversedSkateResults.length > 0 ? tenSkateboardResults : <p>Du har inga inlagda tävlingar</p>}
                </section>
            </section>
            <section className="main-counter--strike">
                <h2>Counter-Strike</h2>
                <img src={counterStrike} alt="" />
                <section className="main-counter--strike--matches">
                    { reversedCsResults.length > 0 ? tenCsResults : <p>Du har inga inlagda matcher</p>}
                </section>
            </section>

        </main>
    )
}

export default Main;