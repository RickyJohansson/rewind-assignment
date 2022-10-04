import './Skateboarding.scss';
import SkateboardResult from '../../components/SkateboardResult/SkateboardResult';
import { Competition } from '../../models/competitionInterface';
import { ProfileInfo } from '../../models/profileInterface';
import jsonData from '../../users.json'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
    result: Competition[];
    setResult: (result: Competition[]) => void;
    personalInfo: ProfileInfo;
}


const Skateboarding = ({result, setResult, personalInfo}: Props) => {

    const navigate = useNavigate();

    const [buttonVisible, setButtonVisible] = useState<Boolean>(true);

    let skateCount = 0;

    const visible = buttonVisible ? "-visible" : "-invisible";


    useEffect(() => {
        if (personalInfo.userId === 1) {
            setButtonVisible(true);
            setResult(jsonData.users[0].skateboardingresults)
        } else if (personalInfo.userId === 2) {
            setButtonVisible(false);
            setResult(jsonData.users[1].skateboardingresults)
        }
    }, []);


    const navigateAddCompetition = () => {
        navigate("addcompetition");
    }


    const handleOptions = (e: any) => {

        if (e.target.value === "Alla tävlingar") {

            setResult(jsonData.users[personalInfo.userId - 1].skateboardingresults);

        } else if (e.target.value === "Senaste 10 tävlingar") {

            const dateSkate = [...result].sort((a, b) => {
                if (b.date <= a.date) {
                    return b.date <= a.date ? -1 : 1;
                } else {
                    return a.date > b.date ? -1 : 1;
                }
            });

            const tenSkateMatches = [...dateSkate].filter((skate) => {
                if (skateCount < 10) {
                    skateCount ++;
                    return skate;
                }
            });
            setResult(tenSkateMatches);
        }
    }

    const SkateboardResults = result.map((result) => {
        return < SkateboardResult key={result.resultId} result={result}/>
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
                    </select>
                </section>
                { SkateboardResults }
            </main>
        </div>
    )
}

export default Skateboarding;