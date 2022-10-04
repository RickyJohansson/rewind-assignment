import './SkateboardResult.scss'
import { Competition } from '../../models/competitionInterface';

interface Props {
    result: Competition;
}

const SkateboardResult = ({result}: Props) => {

    return(
        <div className="skateboard-result--wrapper">
            <section className="skateboard-result--info">
                <p>Tävling: <span>{ result.competition }</span></p>
                <p>Vinnare: <span>{ result.winner }</span></p>
                <p>Din placering: <span>{ result.placement }</span></p>
                <p>Datum: <span>{ result.date }</span></p>
                <p>Deltagare: <span>{result.participants.join(" - ")}</span> </p>
            </section>
        </div>
    )
}

export default SkateboardResult;