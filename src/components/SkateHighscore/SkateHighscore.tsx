import './SkateHighscore.scss';
import { SkaterStats } from '../../models/highscoreInterface';

interface Props {
    skater: SkaterStats;
    skateCounter: number;
}

const SkateHighscore = ({skater, skateCounter}: Props) => {
    return(
        <div className="highscore-wrapper">
            <section className="highscore-info--name">
                <p><span>{skateCounter}</span> -  {skater.name} {skater.lastname}</p>
            </section>
            <section className="highscore-info--wins">
                <p>{skater.wins}</p>
            </section>
        </div>
    )
}

export default SkateHighscore;