import './CsHighscore.scss';
import { CsStats } from '../../models/csHighscoreInterface';

interface Props {
    CsPlayer: CsStats;
    csCounter: number;
}

const CsHighscore = ({CsPlayer, csCounter}: Props) => {
    return(
        <div className="highscore-wrapper">
            <section className="highscore-info--name">
                <p><span>{csCounter}</span> -  {CsPlayer.nickname} </p>
            </section>
            <section className="highscore-info--wins">
                <p className="highscore-wins">{CsPlayer.wins}</p>
            </section>
        </div>
    )
}

export default CsHighscore;