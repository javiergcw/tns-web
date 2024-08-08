

import { get } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import BugModel from "../models/bugs/bugModel";

export const getAllBugs = async () => {
    try {
        const response = await get(ENDPOINTS.bugs);
        return response.map((bugData) => new BugModel(bugData));
    } catch (error) {
        console.error("Error al obtener los bugs:", error);
        throw error;
    }
};


export const createBug = async (bugData) => {

};
