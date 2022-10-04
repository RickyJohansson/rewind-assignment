import skateboarding from '../../assets/skateboarding.svg';
import counterStrike from '../../assets/counterStrike.svg';
import jsonData from '../../users.json';
import SkateHighscore from '../../components/SkateHighscore/SkateHighscore';
import CsHighscore from '../../components/CsHighscore/CsHighscore';
import './Statistics.scss';
import {useState} from 'react';

const Statistics = () => {

    const userSkate = jsonData.users.map((user) => {
        return { userId: user.userId, name: user.name, lastname: user.lastname, wins: user.skateboardingstatistics.wins}
    });
    const sortedSkaters = userSkate.sort((a, b) => {return Number(b.wins) - Number(a.wins)});
    const [sortSkaters, setSortSkaters] = useState<Array<object>>(sortedSkaters);

    
    const userCounterstrike = jsonData.users.map((user) => {
        return { userId: user.userId, nickname: user.nickname, wins: user.counterstrikestatistics.wins }
    });
    const sortedCounterstrike = userCounterstrike.sort((a, b) => {return Number(b.wins) - Number(a.wins)});
    const [sortCounterstrike, setSortCounterstrike] = useState<Array<object>>(sortedCounterstrike);

    let skateCounter = 0;

    const topTenSkaters = sortedSkaters.map((skater) => {
        if (skateCounter < 10) {
            skateCounter++;
            return < SkateHighscore key={skater.userId} skater={skater} skateCounter={skateCounter}/>
        }
    });

    let csCounter = 0;

    const topTenCsPlayers = sortedCounterstrike.map((CsPlayer) => {
        if (csCounter < 10) {
            csCounter++;
            return < CsHighscore key={CsPlayer.userId} CsPlayer={CsPlayer} csCounter={csCounter}/>
        }
    });




    

    return(
        <main className="main-container">
            <section className="statistics-wrapper">
                <section className="statistics-info">
                    <h2 className="main-head--text">Statistik</h2>
                    <p className="main-head--description">Top 10 rankade med flest vinster!</p>
                    <h2>Skateboarding</h2>
                    <img src={skateboarding} alt="" />
                    <section className="main-statistics">
                        <div className="highscore-wrapper">
                            <section className="highscore-info">
                                <section className="highscore-info--headers">
                                    <p className="highscore-title">Åkare</p>
                                    <p className="highscore-title">Vinster</p>
                                </section>
                                { topTenSkaters }
                            </section>
                        </div>
                    </section>
                </section>
            </section>
            <section className="statistics-wrapper">
                <section className="statistics-info">
                    <h2>Counter-Strike</h2>
                    <img src={counterStrike} alt="" />
                    <section className="main-statistics">
                        <div className="highscore-wrapper">
                            <section className="highscore-info">
                                <section className="highscore-info--headers">
                                    <p className="highscore-title">Spelare</p>
                                    <p className="highscore-title">Vinster</p>
                                </section>
                                { topTenCsPlayers }
                            </section>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    )
}

export default Statistics;