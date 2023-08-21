import axios from 'axios';

const token = localStorage.getItem("token");
const url = "http://localhost:8080/person";

export const login = async (emailOrPhone, password) => {
    try {

        // Send the login request to the server
        const response = await axios.post(`${url}/login`, {
            emailOrPhone,
            password
        });
        return response.data.token;
    } catch (error) {
        // Handle error responses from the server
        throw new Error(error.response.data);
    }
};


export const register = async (name, lastName,phone,age, gender, email, password, ) => {
    try {
        const response = await axios.post(`${url}/`, {
            name, lastName, gender, age, email, password, phone
        });
        return response.data.token;
    } catch (error) {
        throw new Error(error.response.data);
    }
}


export const logout = async () => {
    try {
        const response = await axios.post(`${url}/logout`,
        );


        console.log(response.data.message);

    } catch (error) {
        console.error(error.response.data);
    }
};



export const getPersonData = async () => {
    try {
        const response = await axios.get(`${url}`, {
            headers: {
                'x-access-token': token
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};


export const putPersonData = async (data) => {
    try {
      const response = await axios.put(`${url}`, data, {
        headers: {
          'x-access-token': token
        }
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const deletePersonData = async () => {
    try {
      const response = await axios.delete(`${url}`, {
        headers: {
          'x-access-token': token
        }
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };


  export const sendPasswordResetEmail = async (email) => {
    try {
        const response = await axios.post(`${url}/send-password-reset`, {
            email
        });

        return response.data.message;
    } catch (error) {
        throw new Error(error.response.data);
    }
};


export const resetPassword = async (email, newPassword) => {
  try {
      const response = await axios.post(`${url}/resetpass`, {
          email,
          newPassword
      });

      return response.data.message;
  } catch (error) {
      throw new Error(error.response.data);
  }
};







