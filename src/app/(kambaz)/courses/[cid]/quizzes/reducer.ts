import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../../database";

const initialState = {
  quizzes: quizzes as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        title: quiz.title,
        course: quiz.course,
        available: quiz.available ?? "",
        due: quiz.due ?? "",
        points: quiz.points ?? 100,
        questions: quiz.questions ?? 0,
        desc: quiz.desc ?? "New Quiz Description",
        published: quiz.published ?? false,
        score: quiz.score ?? 0,
        newQuiz: true,
        quizType: quiz.quizType ?? "Graded Quiz",
        assignmentGroup: quiz.assignmentGroup ?? "Quizzes",
        shuffleAnswers: quiz.shuffleAnswers ?? true,
        timeLimit: quiz.timeLimit ?? 20,
        multipleAttempts: quiz.multipleAttempts ?? false,
        numberOfAttempts: quiz.numberOfAttempts ?? 1,
        showCorrectAnswers: quiz.showCorrectAnswers ?? "Immediately",
        accessCode: quiz.accessCode ?? "",
        oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
        webcamRequired: quiz.webcamRequired ?? false,
        lockQuestionsAfter: quiz.lockQuestionsAfter ?? false,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },

    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
    },

    togglePublish: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      ) as any;
    },

    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  togglePublish,
  setQuizzes,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;