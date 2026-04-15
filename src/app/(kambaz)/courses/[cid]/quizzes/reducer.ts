import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
    //   addQuiz: (state, { payload: quiz }) => {
    //     const newQuiz: any = {
    //       _id: quiz._id,
    //       title: quiz.title,
    //       course: quiz.course,
    //       due: quiz.due ?? "",
    //       points: quiz.points ?? 100,
    //       questions: quiz.questions ?? 1,
    //       score: quiz.score ?? 0,
    //       newQuiz: true,
    //     };
    //     state.quizzes = [...state.quizzes, newQuiz] as any;

    //   },

    //   deleteAssignment: (state, { payload: assignmentId }) => {
    //     state.assignments = state.assignments.filter(
    //       (a: any) => a._id !== assignmentId);
    //   },
    //   updateAssignment: (state, { payload: assignment }) => {
    //     state.assignments = state.assignments.map((a: any) =>
    //       a._id === assignment._id ? assignment : a
    //     ) as any;
    //   },
    //   editAssignment: (state, { payload: assignmentId }) => {
    //     state.assignments = state.assignments.map((a: any) =>
    //       a._id === assignmentId ? { ...a, editing: true } : a
    //     ) as any;
    //   },

      setQuizzes: (state, action) => {
        state.quizzes = action.payload;
      },
    },
  });
  export const { setQuizzes } = quizzesSlice.actions;
  export default quizzesSlice.reducer;