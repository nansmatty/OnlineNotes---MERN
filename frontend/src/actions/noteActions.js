import axios from "axios";
import {
	NOTE_CREATE_FAIL,
	NOTE_CREATE_REQUEST,
	NOTE_CREATE_SUCCESS,
	NOTE_DELETE_FAIL,
	NOTE_DELETE_REQUEST,
	NOTE_DELETE_SUCCESS,
	NOTE_LIST_FAIL,
	NOTE_LIST_REQUEST,
	NOTE_LIST_SUCCESS,
	NOTE_UPDATE_FAIL,
	NOTE_UPDATE_REQUEST,
	NOTE_UPDATE_SUCCESS,
} from "../constants/notesContansts";

// -----------------------------------------------------------------------------------------------------------

export const listNotes =
	() => async (dispatch, getState) => {
		try {
			dispatch({
				type: NOTE_LIST_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/api/notes`,
				config
			);

			dispatch({
				type: NOTE_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response &&
				error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: NOTE_LIST_FAIL,
				payload: message,
			});
		}
	};

// -----------------------------------------------------------------------------------------------------------

export const createNotes =
	(title, content, category) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: NOTE_CREATE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/notes/create`,
				{ title, content, category },
				config
			);

			dispatch({
				type: NOTE_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response &&
				error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: NOTE_CREATE_FAIL,
				payload: message,
			});
		}
	};

// -----------------------------------------------------------------------------------------------------------

export const updateNotes =
	(id, title, content, category) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: NOTE_UPDATE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`,
				{ title, content, category },
				config
			);

			dispatch({
				type: NOTE_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response &&
				error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: NOTE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

// -----------------------------------------------------------------------------------------------------------

export const deleteNotes =
	(id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: NOTE_DELETE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios.delete(
				`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`,
				config
			);

			dispatch({ type: NOTE_DELETE_SUCCESS });
		} catch (error) {
			const message =
				error.response &&
				error.response.data.message
					? error.response.data.message
					: error.message;
			dispatch({
				type: NOTE_DELETE_FAIL,
				payload: message,
			});
		}
	};
