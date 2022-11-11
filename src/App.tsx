import './App.scss'
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import ProfileCard from './components/ProfileCard/ProfileCard';
import Skateboarding from './views/Skateboarding/Skateboarding';
import Counterstrike from './views/Counterstrike/Counterstrike';
import Statistics from './views/Statistics/Statistics';
import AddCompetition  from './views/AddCompetition/AddCompetition';
import AddMatch from './views/AddMatch/AddMatch';
import Profile from './views/Profile/Profile';
import jsonData from './users.json';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { ProfileInfo } from './models/profileInterface';
import { Competition } from './models/competitionInterface';
import { Match } from './models/matchInterface';

function App() {

  const [profileName, setProfileName] = useState<string>("Ricky Johansson");
  const [personalInfo, setPersonalInfo] = useState<ProfileInfo>(jsonData.users[0]);
  const [result, setResult] = useState<Competition[]>(jsonData.users[0].skateboardingresults);
  const [csResult, setCsResult] = useState<Match[]>(jsonData.users[0].counterstrikeresults);
  const [filterProfiles, setFilterProfiles] = useState<ProfileInfo[]>(jsonData.users);
  const [profileOverlay, setProfileOverlay] = useState<Boolean>(true);
  const [formCompetition, setFormCompetition] = useState<Competition>({
    resultId: 14,
    competition: "",
    winner: "",
    placement: "",
    date: "",
    participants: [""]
  });
  const [formMatch, setFormMatch] = useState<Match>({
    resultId: 15,
    match: "",
    status: "",
    date: "",
    redteam: [""],
    blueteam: [""]
  });

  const hidden = profileOverlay ? "-hidden" : "-show";
  

  const filteredProfiles = filterProfiles.map((profile) => {
    return < ProfileCard key={profile.userId} name={profile.name} lastname={profile.lastname}
    setPersonalInfo={setPersonalInfo} userId={profile.userId} setProfileOverlay={setProfileOverlay}
    setProfileName={setProfileName} setResult={setResult}/>
  });

  const closeOverlay = () => {
    setProfileOverlay(true);
  }


  return (
    <div className="App">
        < Header setProfileOverlay={setProfileOverlay} setFilterProfiles={setFilterProfiles}
         setPersonalInfo={setPersonalInfo} setProfileName={setProfileName} setResult={setResult}/>

        <div className={`search-profile-overlay${hidden}`}>
          <section className="profile-overlay-container">
            <h1>Found Profiles:</h1>
            <section className="profile-cards">
              { filteredProfiles }
            </section>
            <section className="profile-button--container">
              <button className="profile-button--close" onClick={closeOverlay}>Close</button>
            </section>
          </section>
        </div>

        <Routes>

          <Route path="/my-page/mycsgames/addmatch" element={<AddMatch formMatch={formMatch}
           setFormMatch={setFormMatch} />} />

          <Route path="/my-page/myskateboardcompetitions/addcompetition" element={<AddCompetition 
          formCompetition={formCompetition} setFormCompetition={setFormCompetition}/>} />

          <Route path="/my-page/mycsgames" element={<Counterstrike csResult={csResult} setCsResult={setCsResult}/>} />
          <Route path="/my-page/myskateboardcompetitions" element={<Skateboarding result={result} setResult={setResult}
          profileName={profileName}/>}/>
          <Route path="/my-page" element={< Profile profileName={profileName} personalInfo={personalInfo}/>}/>
          <Route path="/statistics" element={< Statistics />} />
          <Route path="/" element={< Main profileName={profileName}/>}/> 
        </Routes>
        < Footer />
    </div>
  )
}

export default App
