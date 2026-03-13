"use client";
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";

const initialState = {
    enrollments: enrollments,
   };

const enrollmentsSlice = createSlice({
 name: "enrollments",
 initialState,
 reducers: {
   enroll: (state, { payload:{userId, courseId }}) => {
     const addToTable = {user: userId, _id: userId, course: courseId };
     state.enrollments = [...state.enrollments, addToTable] as any;
   },

   unenroll: (state, { payload: {userId, courseId }}) => {
     state.enrollments = state.enrollments.filter(
       (enrolled: any) => 
       
         enrolled.user !== userId
        || enrolled.course !== courseId
     );
   },
   
 },
});
export const { enroll, unenroll } =
 enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;