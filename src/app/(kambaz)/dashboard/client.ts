import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/enroll`);
    return data;
}

export const unenrollUserInCourse = async (courseId:string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/enroll`);
    return data;
}

