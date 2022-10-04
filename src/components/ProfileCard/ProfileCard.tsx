import './ProfileCard.scss';
import { ProfileInfo } from '../../models/profileInterface';
import jsonData from '../../users.json';
import { useNavigate } from 'react-router-dom';
import { Competition } from '../../models/competitionInterface';

interface Props {
    name: string;
    lastname: string;
    setPersonalInfo: (personalInfo: ProfileInfo) => void;
    userId: number;
    setProfileOverlay: (profileOverlay: Boolean) => void;
    setProfileName: (profileName: string) => void;
    setResult: (result: Competition[]) => void;
}

const ProfileCard = ({name, lastname, setPersonalInfo, userId, setProfileOverlay,
     setProfileName, setResult}: Props) => {

    const navigate = useNavigate();

    const handleButton = () => {

        setPersonalInfo(jsonData.users[userId - 1]);
        setProfileOverlay(true);
        setProfileName(`${jsonData.users[userId - 1].name} ${jsonData.users[userId - 1].lastname}`);
        setResult(jsonData.users[userId - 1].skateboardingresults);
        navigate("/my-page");

    }

    return(
        <div className="profile-card--wrapper">
            <section className="profile-name">Profile: <span>{name} {lastname}</span></section>
            <button className="button" onClick={handleButton}>View Profile</button>
        </div>
    )
}

export default ProfileCard