import axios, { AxiosResponse } from "axios";
import { SendEmailProps } from "@/typing";

const SendEmail = async (data: SendEmailProps): Promise<AxiosResponse> => {
  try {
    const response = await axios.post("/api/send", data);
    return response;
  } catch (error: any) {
    // Handle errors as needed
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

const api = {
  SendEmail,
};

export default api;
