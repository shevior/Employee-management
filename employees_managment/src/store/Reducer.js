import * as actions from './Actions'

const initialState = {
    workers: [],
    currentWorker: {},
    roles: []
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_WORKERS: {
            return { ...state, workers: action.payload.filter(e=>e.Status===1) }
        }
        case actions.ADD_WORKER: {
            const workers = [...state.workers];
            workers.push(action.payload);
            return { ...state, workers }
        }
        case actions.EDIT_WORKER: {
            const workers = [...state.workers];
            workers[workers.findIndex(w => w.Id === action.payload.Id)] = action.payload;
            return { ...state, workers }
        }
        case actions.EDIT_STATUS_WORKER: {
            const workers = state.workers.filter(r => r.Id !== action.payload)
            return { ...state, workers }
        }
        case actions.SET_ROLE: {
            return { ...state, roles: action.payload }
        }
        case actions.DELETE_ROLE: {
            const roles = state.roles.filter(r => r.Name != action.payload.Name)
            return { ...state, roles }
        }
        case actions.EDIT_ROLE: {
            const roles = [...state.roles];
            let index = roles.findIndex(x => x.Name == action.payload.Name);
            if (parseInt(index) === -1)
            roles.push(action.payload);
            return { ...state, roles }
        }
        case actions.ADD_ROLE: {
            const roles = [...state.roles];
            roles.push(action.payload);
            return { ...state, roles }
        }
        default: return { ...state }
    }
}
export default Reducer;