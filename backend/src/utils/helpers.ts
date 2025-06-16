export interface createResponseInterface {
  status: number;
  message: string;
}

export const createResponse = (status: number, message: string): createResponseInterface => {
  return { status: status, message: message };
};
