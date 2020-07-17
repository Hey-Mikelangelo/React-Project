import * as axios from "axios";

const ApiInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'authorization': `bearer ${localStorage.getItem('token')}`,
        'id': localStorage.getItem('id')
    }
});

export const dbApi = {
    follow(id) {
        return ApiInstance.post(`follow/${id}`)
            .then(response => {
                return true;
            })
    },
    unfollow(id) {
        return ApiInstance.post(`unfollow/${id}`)
            .then(response => {
                return true;
            })
    },
    getUsers(page, pageSize) {
        return ApiInstance.get(`data/users?page=${page}&limit=${pageSize}`).then(
            response => {
                return response.data;
            }
        )
    },
    getFollowing() {
        return ApiInstance.get(`following`).then(
            response => {
                return response.data
            }
        )
    },
    getProfile(id) {
        return ApiInstance.get(`data/profile/${id}`).then(
            response => {
                return response.data
            }
        )
    }
}

