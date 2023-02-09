const axios = require('axios');
const JSON_PLACE_HOLDER_HOST = 'https://jsonplaceholder.typicode.com/';

const jsonPlaceHolder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingPost = await axios(
          `${JSON_PLACE_HOLDER_HOST}posts/${id}`
      );
      resolve(existingPost.data);
    } catch (error) {
      console.log(error)
      if (error && error.response && error.response.status === 404) {
        resolve(null);
        return;
      }
      reject(error);
    }
  });
}
module.exports = { jsonPlaceHolder };
