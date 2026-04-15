import { createSlice } from "@reduxjs/toolkit";
import { quizzes} from "../../../database";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

const initialState = {
  quizzes: quizzes as any [],
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
          numberOfQuestions: quiz.numberOfQuestions ?? 0,
          desc: quiz.desc ?? "New Quiz Description",
          published: quiz.published ?? false,
          score: quiz.score ?? 0,
        };
        state.quizzes = [...state.quizzes, newQuiz] as any;

      },

      deleteQuiz: (state, { payload: quizId }) => {
        state.quizzes = state.quizzes.filter(
          (q: any) => q._id !== quizId);
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

      setQuizzes: (state, action) => {
        state.quizzes = action.payload;
      },
    },
  });
  export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
    quizzesSlice.actions;
  export default quizzesSlice.reducer;