import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const createQuizForCourse = async (courseId: any, quiz: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

export const deleteQuiz = async (qid: any) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${qid}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const updateScore = async(quiz: any, score: number, attempts: number, previous: boolean, answers: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quiz._id}/score`, {score, attempts, previous, answers});
  return response.data;
}


  
  
export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};
