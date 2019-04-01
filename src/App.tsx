import * as React from 'react';
import './App.css';

import oakSrc from './assets/uv.jpg';
import PokemonDialog from './pokemon-dialog';
import Response from './reponse';
import Text from './text';


enum phaseTypes {
  textOnly,
  textQuestion,
  optionsQuestions,
}

interface IPhaseType {
  type: phaseTypes,
  text: string,
  options?: Array<{ text: string; }>,
}

interface IStateType {
  phaseIndex: number,
  setPhaseIndex: (phaseIndex: number) => void,
  answers: any[],
  setAnswers: (phaseIndex: any[]) => void,
}

const phases: IPhaseType[] = [
  {
    text: 'ברוך הבא!',
    type: phaseTypes.textOnly,
  },
  {
    text: 'את/ה אולי לא זוכר/ת כי שתית הרבה, אבל שמי הוא יובל.',
    type: phaseTypes.textOnly,
  },
  {
    text: 'אנשים הקרובים אלי פונים אלי בשם יובי החזק...',
    type: phaseTypes.textOnly,
  },
  {
    text: 'או העירקאי.',
    type: phaseTypes.textOnly,
  },
  {
    text: 'קודם כל, ספר/י לי קצת על עצמך.',
    type: phaseTypes.textOnly,
  },
  {
    options: [
      {
        text: 'גבר'
      },
      {
        text: 'גברת'
      },
    ],
    text: 'האם אתה גבר?\n או האם את גברת?',
    type: phaseTypes.optionsQuestions,
  },
  {
    text: 'ומה שמך?',
    type: phaseTypes.textQuestion,
  },
  {
    text: `נהדר!
    עוד מעט סיימנו.`,
    type: phaseTypes.textOnly,
  },
  {
    text: 'יש מצב גם אני שתיתי לא מעט...',
    type: phaseTypes.textOnly,
  },
  {
    text: 'זה הוא הנכד שלי, האויב המושבע שלך, מה שמו?',
    type: phaseTypes.textQuestion,
  },
];
const phasesLength = phases.length;

const Main = () => {
  const [ phaseIndex, setPhaseIndex ] = React.useState(0);
  const [ answers, setAnswers ] = React.useState([]);

  const state: IStateType = {
    answers,
    phaseIndex,
    setAnswers: setAnswers as any,
    setPhaseIndex,
  };

  if (phasesLength <= phaseIndex) {
    return renderResponse(state);
  }

  const phase = phases[phaseIndex];
  if (phase.type === phaseTypes.textQuestion) {
    return renderTextQuestion(state, phase);
  } else if (phase.type === phaseTypes.optionsQuestions) {
    return renderOptionsQuestions(state, phase);
  } else {
    return renderTextOnly(state, phase);
  }
}

const renderContainer = (children: any, options?: any) => {
  return (
    <div className="app">
      <div className="image-container">
        <img src={oakSrc} className="oak_img" />
      </div>
      <div className="content-container">
        <div className="options">
          {options}
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

const renderTextOnly = (state: IStateType, phase: IPhaseType) => {
  return renderContainer(
    <PokemonDialog onPress={() => handleTextPress(state)}>
      <Text value={phase.text} />
    </PokemonDialog>
  );
}

const renderTextQuestion = (state: IStateType, phase: IPhaseType) => {
  return renderContainer(
    <PokemonDialog>
      <Text value={phase.text} />
      <form onSubmit={(e) => handleSubmit(e, state)}>
        <input name="text" type="text" autoFocus={true} />
      </form>
    </PokemonDialog>,
    <PokemonDialog onPress={() => handleNextPress(state)} max={false}>
      הבא
    </PokemonDialog>
  );
}


const renderOptionsQuestions = (state: IStateType, phase: IPhaseType) => {
  return renderContainer(
    <PokemonDialog>
      <Text value={phase.text} />
    </PokemonDialog>,
    <React.Fragment>
      {phase.options && phase.options.map((option, index) => (
        <PokemonDialog onPress={() => handleAnswerPress(state, index)} max={false}>
          {option.text}
        </PokemonDialog>
        ))
      }
    </React.Fragment>
  );
}

const renderResponse = (state: IStateType) => {
  const { 
    answers,
  } = state;

  const isBoy = answers[0].indexOfAnswer === 0;
  const name = answers[1].text;
  const nemsisName = answers[2].text;

  return renderContainer(
    <Response isBoy={isBoy} name={name} nemsisName={nemsisName} />
  );
}

const handleTextPress = (state: IStateType): void  => {
  const { phaseIndex, setPhaseIndex } = state;

  setPhaseIndex(phaseIndex + 1);
}

const handleAnswerPress = (state: IStateType, indexOfAnswer: number): void => {
  const { phaseIndex, setPhaseIndex, answers, setAnswers } = state;

  setPhaseIndex(phaseIndex + 1);
  setAnswers(answers.concat({
    indexOfAnswer,
  }));
}

const handleNextPress= (state: IStateType): void => {
  const inputRef = document.querySelector('input');
  const { phaseIndex, setPhaseIndex, answers, setAnswers } = state;

  if (inputRef) {
    setPhaseIndex(phaseIndex + 1);
    setAnswers(answers.concat({
      text: inputRef.value,
    }));
  }
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>, state: IStateType): void => {
  event.preventDefault();
  handleNextPress(state);
}

export default Main;
