type InputObj = {
    skater: string;
    id: number;
}

type Props = {
    skater: string;
    index: number;
    participantInputs: Array<InputObj>;
    setParticipantInputs: React.Dispatch<React.SetStateAction<InputObj[]>>;
}

const InputComp = ({skater, index, participantInputs, setParticipantInputs}: Props) => {

    const setParticipant = (inputValue: string) => {
        const copyInputs = [...participantInputs];
        copyInputs[index].skater = inputValue;
        setParticipantInputs(copyInputs);
    }
    

    return (
        <input type="text" className="forms-participants" placeholder={`Åkare ${index + 1}`} value={skater} onChange={ (e: any) => setParticipant(e.target.value)}  required/>
    )
}

export default InputComp;