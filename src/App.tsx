import * as React from 'react';
import './App.css';

import oakSrc from './assets/uv.jpg';
import PokemonDialog from './pokemon-dialog';
import Response from './reponse';


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

const phases: IPhaseType[] = [
  {
    text: 'שלום אני יובל, בוא ספר לי על עצמך',
    type: phaseTypes.textOnly,
  },
  {
    options: [
      {
        text: 'sdfds1'
      },
      {
        text: 'sdfds2'
      },
    ],
    text: 'sdfds',
    type: phaseTypes.optionsQuestions,
  },
  {
    text: 'sdfds?',
    type: phaseTypes.textQuestion,
  }
];
const phasesLength = phases.length;

interface IState {
  answers: any,
  phaseIndex: number;
}

class App extends React.Component <{},IState> {
  private inputRef: HTMLInputElement | null;

  public componentWillMount() {
    this.state = {
      answers: [],
      phaseIndex: 0,
    };
    this.handleTextPress = this.handleTextPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextPress = this.handleNextPress.bind(this);

    this.handleInputRef = this.handleInputRef.bind(this);
  }

  public render() {
    const { phaseIndex } = this.state;

    if (phasesLength <= phaseIndex) {
      return this.renderResponse();
    }

    const phase = phases[phaseIndex];
    if (phase.type === phaseTypes.textQuestion) {
      return this.renderTextQuestion(phase);
    } else if (phase.type === phaseTypes.optionsQuestions) {
      return this.renderOptionsQuestions(phase);
    } else {
      return this.renderTextOnly(phase);
    }
      
  }

  private renderContainer(children: any, options?: any) {
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

  private renderTextOnly(phase: IPhaseType) {
    return this.renderContainer(
      <PokemonDialog onPress={this.handleTextPress}>
        {phase.text}
      </PokemonDialog>
    );
  }

  private renderTextQuestion(phase: IPhaseType) {
    return this.renderContainer(
      <PokemonDialog>
        {phase.text}
        <form onSubmit={this.handleSubmit}>
          <input name="text" type="text" ref={this.handleInputRef} autoFocus={true} />
        </form>
      </PokemonDialog>,
      <PokemonDialog onPress={this.handleNextPress} max={false}>
        הבא
      </PokemonDialog>
    );
  }
  

  private renderOptionsQuestions(phase: IPhaseType) {
    return this.renderContainer(
      <PokemonDialog>
        {phase.text}
      </PokemonDialog>,
      <React.Fragment>
        {phase.options && phase.options.map((option, index) => (
          <PokemonDialog onPress={this.handleAnswerPress.bind(this, index)} max={false}>
            {option.text}
          </PokemonDialog>
          ))
        }
      </React.Fragment>
    );
  }

  private renderResponse() {
    const { 
      answers,
    } = this.state;

    return this.renderContainer(
      <Response>
        {JSON.stringify(answers, null, 2)}
      </Response>
    );
  }

  private handleTextPress(): void {
    const { phaseIndex, answers } = this.state;

    this.setState({
      answers: answers.concat({}),
      phaseIndex: phaseIndex + 1,
    });
  }
  
  private handleAnswerPress(indexOfAnswer: number): void {
    const { phaseIndex, answers } = this.state;

    this.setState({
      answers: answers.concat({
        indexOfAnswer,
      }),
      phaseIndex: phaseIndex + 1,
    });
  }

  private handleNextPress(): void {
    const { inputRef } = this;
    const { phaseIndex, answers } = this.state;

    if (inputRef) {
      this.setState({
        answers: answers.concat({
          text: inputRef.value,
        }),
        phaseIndex: phaseIndex + 1,
      });
    }
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.handleNextPress();
  }

  private handleInputRef(ref: HTMLInputElement | null) {
    this.inputRef = ref;
  }
}

export default App;
