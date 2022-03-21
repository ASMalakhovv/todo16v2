import {Dispatch} from "redux"
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // выполнены ли нужные запросы для приложения
    isInitialized: boolean
}
//AC

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setAppInitialization = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        isInitialized
    } as const
}


//AC TYPE

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializationType = ReturnType<typeof setAppInitialization>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitializationType


//THUNK

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
        dispatch(setAppInitialization(true))
    })
}
