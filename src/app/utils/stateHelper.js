import { getQuestions, getCategories } from 'app/questions/index';

const categories = getCategories();

const getStateInformation = (state) => {
  const categoryIndex = state.category.index;
  const type = categories[categoryIndex].name;
  const questionIndex = state[type].index;
  const questions = getQuestions(type);
  const question = questions[questionIndex];
  const { index, compiledCode } = state[type];
  const code = (state[type][index] && state[type][index].code) || questions[questionIndex].content;
  const remoteQuestion = state[type].remoteQuestion;

  return {
    type,
    categoryIndex,
    questionIndex,
    questions,
    question,
    code,
    compiledCode,
    remoteQuestion
  };
};

export default getStateInformation;
