import { PortfolioStock } from "@/types/porfolio";
import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolio";

export const fetchPortfolio = async (): Promise<PortfolioStock[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};
