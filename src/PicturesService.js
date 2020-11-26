import axios from 'axios'

const POST_PHOTO_REST_API_URL = 'http://localhost:8080/upload';

class PicturesService {

    uploadPhoto(photoFile) {
        return axios.post(POST_PHOTO_REST_API_URL, photoFile);
    }
}

export default new PicturesService();