import axios from "axios";
import Swal from "sweetalert2";
import * as actions from '../store/Actions'

export const getRoles = () => {
    return dispach =>
    axios.get(`https://localhost:7021/api/role`).then((x) => {
            dispach({ type: actions.SET_ROLE, payload: x.data });
        }).catch(err => console.error(err));
}

export const deleteWorker = (Role) => {
    return dispatch => {
        Swal.fire({
            title: "delete worker",
            text: "Do you want to delete " + Role.Name + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "cancel",
            confirmButtonText: "delete"
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(`https://localhost:7021/api/role/${Role.Id}`)
                    .then(() => {
                        dispatch({ type: actions.DELETE_ROLE, payload: Role.Id })
                    }).catch(err => console.error(err))
            }
        })
    }
}

export const addRole = (data) => {
    return dispatch => axios.post('https://localhost:7021/api/role', data)
        .then(() => {
            dispatch({ type: actions.ADD_ROLE, payload: data });
            Swal.fire({
                icon: "success",
                title: data.Name + "added successfuly",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch((err) => { 
            console.error(err);
         })
}

export const editRole = (data, selectRecipe) => {
    return dispatch => axios.post('https://localhost:7021/api/role', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id })
        .then((res) => {
            dispatch({ type: actions.EDIT_WORKER, payload: res.data })
        }).catch((err) => { console.error(err) })
}