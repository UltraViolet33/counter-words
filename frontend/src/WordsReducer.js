const WORDS_DEFAULT_GOAL = 100;

const API_URL = "http://localhost:8000/";

export const initialState = {
  wordsGoal: WORDS_DEFAULT_GOAL,
  writtenText: "",
  currentWordsNumber: 0,
  percentageGoal: 0,
  goalReached: false,
};

export const wordsReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      const tmpState = getTextFromLocalStorage() || initialState;
      return tmpState;

    case "EDIT_TEXT":
      const numberWords = getWordsNumber(action.payload);
      const percentageGoal = getPercentageGoal(numberWords, state.wordsGoal);
      const goalReached = numberWords >= state.wordsGoal ? true : false;
      return {
        ...state,
        writtenText: action.payload,
        currentWordsNumber: numberWords,
        percentageGoal: percentageGoal,
        goalReached: goalReached,
      };

    case "EDIT_GOAL":
      return {
        ...state,
        wordsGoal: action.payload,
        percentageGoal: getPercentageGoal(
          state.currentWordsNumber,
          action.payload
        ),
      };

    case "SAVE_STATE":
      saveTextToLocalStorage(state);

      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.response === "success") {
            alert("Save ok !");
          } else {
            alert("ERROR !");
          }
        })
        .catch((error) => {
          alert(`ERROR : ${error.message}`);
        });

      return { ...state };

    case "REMOVE_STATE":
      clearStateFromLocalStorage();
      return initialState;
    default:
      throw new Error();
  }
};

const getWordsNumber = (text) =>
  text.replace(/\s+/g, " ").trim().split(" ").length;

const getPercentageGoal = (wordsNumber, wordsGoal) =>
  (100 * wordsNumber) / wordsGoal;

const getTextFromLocalStorage = () => {
  const state = localStorage.getItem("text");
  return JSON.parse(state);
};

const saveTextToLocalStorage = (state) => {
  localStorage.setItem("text", JSON.stringify(state));
};

const clearStateFromLocalStorage = () => {
  localStorage.removeItem("text");
};
