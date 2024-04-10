import axios from "axios";
import Swal from "sweetalert2";
import * as actions from '../store/Actions'

export const getWorkersList = () => {
    return dispach =>
        axios.get(`https://localhost:7021/api/Worker`).then((x) => {
            dispach({ type: actions.SET_WORKERS, payload: x.data });
        }).catch(err => console.error("error: ",err));
}

export const getWorker = (e) => {
    return dispach =>
        axios.get(`https://localhost:7021/api/Worker${e.Id}`).then((x) => {
            dispach({ type: actions.SET_WORKER, payload: x.data });
        }).catch(err => console.error("error: ",err));
}

export const deleteWorker = (worker) => {
    return dispatch => {
        Swal.fire({
            title: "delete worker",
            text: "Do you want update status " + worker.Name + " as deleted?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "cancel",
            confirmButtonText: "delete"
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(`https://localhost:7021/api/Worker/${worker.Id}`)
                    .then(() => {
                        dispatch({ type: actions.EDIT_STATUS_WORKER, payload: worker.Id })
                    }).catch(err => console.error(err))
            }
        })
    }
}

export const addWorker = (data) => {
    console.log("add");
    return dispatch => axios.post('https://localhost:7021/api/worker', data)
        .then(() => {
            dispatch({ type: actions.ADD_WORKER, payload: data });
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

export const editWorker = (data, selectRecipe) => {
    return dispatch => axios.post('https://localhost:7021/api/worker', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id })
        .then((res) => {
            dispatch({ type: actions.EDIT_WORKER, payload: res.data })
        }).catch((err) => { console.error(err) })
}