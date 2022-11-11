import './Header.scss'
import rewindLogo from '../../assets/rewind-logo.svg';
import myPage from '../../assets/myPage.svg';
import statistik from '../../assets/statistik.svg';
import { useNavigate } from 'react-router-dom';
import jsonData from '../../users.json';
import { useState } from 'react';
import { ProfileInfo } from '../../models/profileInterface';
import { Competition } from '../../models/competitionInterface';

interface Props {
    setProfileOverlay: (profileOverlay: Boolean) => void;
    setFilterProfiles: (filterProfiles: ProfileInfo[]) => void;
    setPersonalInfo: (personalInfo: ProfileInfo) => void;
    setProfileName: (profileName: string) => void;
    setResult: (result: Competition[]) => void;
}

const Header = ({setProfileOverlay, setFilterProfiles, setPersonalInfo, setProfileName, setResult}: Props) => {

    const navigate = useNavigate();

    const navigateHome = () => {
        setPersonalInfo(jsonData.users[0]);
        navigate("/");
    }

    const navigateProfile = () => {
        setPersonalInfo(jsonData.users[0]);
        setProfileName(`${jsonData.users[0].name} ${jsonData.users[0].lastname}`);
        setResult(jsonData.users[0].skateboardingresults);
        navigate("my-page");
    }

    const navigateStatistics = () => {
        navigate("statistics");
    }

    const [search, setSearch] = useState<string>("");

    const handleSearch = () => {
        setProfileOverlay(false);
        const filteredSearch = jsonData.users.filter((user) => {
            if (`${user.name}` === '' && `${user.nickname}` === '' || search === '') {
                return
            } else if (`${user.name} ${user.lastname}`.toLowerCase() === search ||
             `${user.name} ${user.lastname}` === search || `${user.nickname}` === search
             || `${user.fullname}` === search ||  `${user.name}`.toUpperCase() === search
             || `${user.lastname}` === search || `${user.name}` === search || `${user.name}`.toLowerCase() === search) {
                return user;
            }
        });
        setFilterProfiles(filteredSearch);
    }


    return(
        <header className="header-container">
            <section className="header-left">
                <section className="header-my--page" onClick={navigateProfile}>
                    <img src={myPage} alt="" />
                    <p>Min sida</p>
                </section>
                <section className="header-statistik" onClick={ navigateStatistics }>
                    <img src={statistik} alt="" />
                    <p>Statistik</p>
                </section>
            </section>
            <section className="header-logo" onClick={ navigateHome }>
                <img src={rewindLogo} alt="" />
            </section>
            <section className="header-right">
                <section className="header-search">
                    <input type="text" placeholder="Sök efter en spelare" onKeyUp={(e: any) => setSearch(e.target.value)} />
                    <button className="search-button" onClick={handleSearch}>SÖK</button>
                </section>
                <section className="header-button">
                    <button>Logga ut</button>
                </section>
            </section>
        </header>
    )
}

export default Header;