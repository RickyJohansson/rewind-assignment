import './Skateboarding.scss';
import SkateboardResult from '../../components/SkateboardResult/SkateboardResult';
import { Competition } from '../../models/competitionInterface';
import { ProfileInfo } from '../../models/profileInterface';
import jsonData from '../../users.json';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
    result: Competition[];
    setResult: (result: Competition[]) => void;
    profileName: string;
}


const Skateboarding = ({result, setResult, profileName}: Props) => {

    const navigate = useNavigate();

    const [buttonVisible, setButtonVisible] = useState<Boolean>(true);
    const [latestWins, setLatestWins] = useState<Boolean>(false);

    let skateCount = 0;

    const visible = buttonVisible ? "-visible" : "-invisible";


    useEffect(() => {
        if (profileName === "Ricky Johansson") {
            setButtonVisible(true);
            const sortUserResults = [...jsonData.users[0].skateboardingresults].sort((a, b) => {
                if (b.date <= a.date) {
                    return b.date <= a.date ? -1 : 1;
                } else {
                    return a.date > b.date ? -1 : 1;
                }
            });
            setLatestWins(false);
            setResult(sortUserResults)
        } else if (profileName === "Ryan Sheckler") {
            setButtonVisible(false);
            const sortUserResults = [...jsonData.users[1].skateboardingresults].sort((a, b) => {
                if (b.date <= a.date) {
                    return b.date <= a.date ? -1 : 1;
                } else {
                    return a.date > b.date ? -1 : 1;
                }
            });
            setLatestWins(false);
            setResult(sortUserResults)
        }
    }, []);


    const navigateAddCompetition = () => {
        navigate("addcompetition");
    }


    const handleOptions = (e: any) => {

        if (profileName == "Ricky Johansson") {

            const dateSkate = [...jsonData.users[0].skateboardingresults].sort((a, b) => {
                if (b.date <= a.date) {
                    return b.date <= a.date ? -1 : 1;
                } else {
                    return a.date > b.date ? -1 : 1;
                }
            });

            if (e.target.value === "Alla tävlingar") {

                const allSkateMatches = [...dateSkate].filter((skate) => {
                    return skate;
                });
                setLatestWins(false);
                setResult(allSkateMatches);

            } else if (e.target.value === "Senaste 10 tävlingar") {


                const tenSkateMatches = [...dateSkate].filter((skate) => {
                    if (skateCount < 10) {
                        skateCount ++;
                        return skate;
                    }
                });
                setLatestWins(false);
                setResult(tenSkateMatches);

            } else if (e.target.value === "Vinster senaste 10 matcher") {

                setLatestWins(true);

                const tenSkateMatches = [...dateSkate].filter((skate) => {
                    if (skateCount < 10) {
                        skateCount ++;
                        return skate;
                    }
                });

                const tenLastWins = [...tenSkateMatches].filter((skate) => {
                    if (skate.placement == "1:a" || skate.winner == `${profileName}`) {
                        return skate;
                    }
                });
                setResult(tenLastWins);

            }
        }
        if (profileName == "Ryan Sheckler") {

            const dateSkate = [...jsonData.users[1].skateboardingresults].sort((a, b) => {
                if (b.date <= a.date) {
                    return b.date <= a.date ? -1 : 1;
                } else {
                    return a.date > b.date ? -1 : 1;
                }
            });

            if (e.target.value === "Alla tävlingar") {

                const allSkateMatches = [...dateSkate].filter((skate) => {
                    return skate;
                });
                setLatestWins(false);
                setResult(allSkateMatches);

            } else if (e.target.value === "Senaste 10 tävlingar") {


                const tenSkateMatches = [...dateSkate].filter((skate) => {
                    if (skateCount < 10) {
                        skateCount ++;
                        return skate;
                    }
                });
                setLatestWins(false);
                setResult(tenSkateMatches);

            } else if (e.target.value === "Vinster senaste 10 matcher") {

                setLatestWins(true);

                const tenSkateMatches = [...dateSkate].filter((skate) => {
                    if (skateCount < 10) {
                        skateCount ++;
                        return skate;
                    }
                });

                const tenLastWins = [...tenSkateMatches].filter((skate) => {
                    if (skate.placement == "1:a" || skate.winner == `${profileName}`) {
                        return skate;
                    }
                });
                setResult(tenLastWins);

            }
        }
    } 

    const SkateboardResults = result.map((result) => {
        return < SkateboardResult key={result.resultId} result={result} profileName={profileName}/>
    });


    return(
        <div className="competition-wrapper">
            <main className="competition-container">
                <header className="competition-header">
                    <h2> Skateboarding </h2>
                </header>
                <section className="competition-filter">
                    <button className={`competition-button${visible}`} onClick={navigateAddCompetition}> Lägg till ny tävling </button>
                    <select className="competition-filtering" onChange={(e) => {handleOptions(e)}}>
                        <option value="Alla tävlingar">Alla tävlingar</option>
                        <option value="Senaste 10 tävlingar">Senaste 10 tävlingar</option>
                        <option value="Vinster senaste 10 matcher">Vinster senaste 10 matcher</option>
                    </select>
                </section>
                { latestWins ? <p>Antal vinster: {result.length} av 10</p> : '' }
                { SkateboardResults }
            </main>
        </div>
    )
}

export default Skateboarding;