import './Profile.scss';
import '../../App.scss';
import { ProfileInfo } from '../../models/profileInterface';
import { useNavigate } from 'react-router-dom';

interface Props {
    profileName: string;
    personalInfo: ProfileInfo;
}

const Profile = ({profileName, personalInfo}: Props) => {

    const navigate = useNavigate();

    let VFskate = Number(personalInfo.skateboardingstatistics.wins) / Number(personalInfo.skateboardingstatistics.losses);
    let VFcs = Number(personalInfo.counterstrikestatistics.wins) / Number(personalInfo.counterstrikestatistics.losses);

    if (Number(personalInfo.counterstrikestatistics.wins) <= 0 || (`${personalInfo.counterstrikestatistics.wins}`) === ""
     || Number(personalInfo.counterstrikestatistics.losses) <= 0 || (`${personalInfo.counterstrikestatistics.losses}`) === "") {
        VFcs = 0;
    }

    const navigateSkateboard = () => {
        if (`${personalInfo.name} ${personalInfo.lastname}` === "Ricky Johansson") {
            navigate("myskateboardcompetitions");
        } else if (`${personalInfo.name} ${personalInfo.lastname}` === "Ryan Sheckler") {
            navigate("myskateboardcompetitions");
        }
    }

    const navigateCs = () => {
        if (`${personalInfo.name} ${personalInfo.lastname}` === "Ricky Johansson") {
            navigate("mycsgames");
        }
    }


    return(
        <div className="profile-wrapper">
            <h2 className="profile-header">Profil-sida: {profileName}</h2>
            <main className="profile-content">
                <section className="info-personal">
                    <p>Namn: <span>{ personalInfo.name }</span></p>
                    <p>Efternamn: <span>{ personalInfo.lastname }</span></p>
                    <p>Ålder: <span>{ personalInfo.age }</span></p>

                    <p>Utövar sporterna: <span className="info-sports">{ 
                    personalInfo.sports.map((sport) => {
                         if (sport == personalInfo.sports[0]) {
                            return ` ${sport} -`
                            }else{
                                 return ` ${sport} `}})}</span></p>

                </section>
                <section className="info-game">
                    <section className="info-game--header">
                        <h2>Sport och matcher</h2>
                    </section>
                    <section className="info-game--stats">
                        <section className="info-stats">
                            <p className="info-stats--header">Skateboarding</p>
                            <p>Antal tävlingar: <span>{ personalInfo.skateboardingstatistics.competitions }</span></p>
                            <p>Vinster: <span>{ personalInfo.skateboardingstatistics.wins }</span></p>
                            <p>Förluster: <span>{ personalInfo.skateboardingstatistics.losses }</span></p>
                            <p>V/F: <span>{ VFskate.toFixed(2) }</span></p>
                            <button className="info-button" onClick={navigateSkateboard}>Dina Tävlingar</button>
                        </section>
                        <section className="info-stats">
                            <p className="info-stats--header">Counter-Strike</p>
                            <p>Antal matcher: <span>{ personalInfo.counterstrikestatistics.matches }</span></p>
                            <p>Vinster: <span>{ personalInfo.counterstrikestatistics.wins}</span></p>
                            <p>Förluster: <span>{ personalInfo.counterstrikestatistics.losses}</span></p>
                            <p>V/F: <span>{ VFcs.toFixed(2)}</span></p>
                            <button className="info-button" onClick={navigateCs}>Spelade matcher</button>
                        </section>
                    </section>
                </section>
            </main>
        </div>
    )
}

export default Profile;