import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const createAssignmentForCourse = async (courseId: any, assignment: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments/${assignment._id}`,
        assignment
    );
    return response.data;
};

export const deleteAssignment = async (aid: any) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${aid}`);
    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};
  
  
export const findAssignmentsForCourse = async (courseId: any) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};
