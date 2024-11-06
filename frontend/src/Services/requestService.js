import axios from "axios";
import React from "react";

const HOST = "localhost:8080";
const API_URL = `http://${HOST}/api/ingredients`;

//util
const getGenericErrorMessage = (error) => {
    if (error.response) {
      //server responded to request with an error
      const status_code = error.response.status;
      if (status_code >= 400 && status_code < 500) {
        //the server responded with a status code 4xx
        return (
          "Error: Server recieved request but request has been denied. Status code: " +
          status_code
        );
      } else if (status_code >= 500 && status_code < 600) {
        //the server responded with a status code 5xx
        return (
          "Error: The server encountered a problem processing your request. Status code: " +
          status_code
        );
      } else {
        return "Error: Unknown error occurred. The server did respond to the request.";
      }
    } else if (error.request) {
      //request made but no response recieved
      return "Error: The request was sent but the server did not respond. Check connectivity.";
    } else {
      return "Error: Unknown error occured. Request payload is empty. No response was recieved from the server.";
    }
  };


const addIngredient = async (body) => {
    try {
        const response = await axios.post(
            `${API_URL}/add-ingredient`,
            body
        );
        return response;
    } catch (error) {
        throw error;
    }
}

const editIngredient = async (body) => {
    try {
        const response = await axios.post(
            `${API_URL}/edit-ingredient`,
            body
        );
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteIngredient = async (body) => {
    try {
        const response = await axios.post(
            `${API_URL}/delete-ingredient`,
            body
        );
        return response;
    } catch (error) {
        throw error;
    }
}

const getAllIngredients = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/get-all-ingredients`
        );
        return response;
    } catch (error) {
        throw error;
    }
}

//examples

const getRequest = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/get-request-endpoint`
        );
        return response;
    } catch (error) {
        throw error;
    }
}

const postRequest = async (body) => {
    try {
        const response = await axios.post(
            `${API_URL}/post-request-endpoint`,
            body
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export const requestService = {
    getGenericErrorMessage,
    addIngredient,
    editIngredient,
    deleteIngredient,
    getAllIngredients,
}

