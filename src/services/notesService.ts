import axios from 'axios'
import { NOTES_API_URL } from "../constants/api"
import INote from "../interfaces/note.interface"

export const getNotes = async () => {
    try { 
        const response = await axios.get(NOTES_API_URL)
        return response.data.notes
    } catch (err) {
        console.error(err)
    }
}

export const createNote = async (newNote: Partial<INote>) => {
    try { 
        const response = await axios.post(NOTES_API_URL, newNote)
        return response.data.note
    } catch (err) {
        console.error(err)
    }
}

export const deleteNote = async (noteToDeleteId: String) => {
    try { 
        const url = `${NOTES_API_URL}/${noteToDeleteId}`
        const response = await axios.delete(url)
        return response.data.message
    } catch (err) {
        console.error(err)
    }
}

export const updateNote = async (noteToUpdate: INote) => {
    try { 
        const url = `${NOTES_API_URL}/${noteToUpdate._id}`
        const response = await axios.put(url, noteToUpdate)
        //return response.data.note
    } catch (err) {
        console.error(err)
    }
}