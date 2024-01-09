import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    rows: [
        { id: 1, teacher: 'Professor Dumbledore', attendance: 'Present', order: 1, testid: 'dumbledore', house: 'Gryffindor', image: `https://static.wikia.nocookie.net/harryalbuspotter/images/a/ac/Albus_Dumbledore.jpg` },
        { id: 2, teacher: 'Minerva McGonagall', attendance: 'Present', order: 2, testid: 'mcgonagall', house: 'Gryffindor', image: `https://ik.imagekit.io/hpapi/mcgonagall.jpg` },
        { id: 3, teacher: 'Rubeus Hagrid', attendance: 'Present', order: 3, testid: 'hagrid', house: 'Gryffindor', image: `https://ik.imagekit.io/hpapi/hagrid.png` },
        { id: 4, teacher: 'Horace Slughorn', attendance: 'Present', order: 4, testid: 'slughorn', house: 'Slytherin', image: `https://ik.imagekit.io/hpapi/slughorn.JPG` },
        { id: 5, teacher: 'Severus Snape', attendance: 'Present', order: 4, testid: 'snape', house: 'Slytherin', image: `https://ik.imagekit.io/hpapi/snape.jpg` },
    ],
    backup: {
        'Professor Dumbledore': 'Professor Dumbledore',
        'Minerva McGonagall': 'Minerva McGonagall',
        'Rubeus Hagrid': 'Rubeus Hagrid',
        'Horace Slughorn': 'Horace Slughorn',
        'Severus Snape': 'Severus Snape',
    }
}

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        updateAttendance: (state, { payload }) => {
            state.rows.map(r => {
                if (r.teacher === payload.teacher) r.attendance = payload.newValue;
                state.backup[r.teacher] = (r.attendance === 'Present') ? r.teacher : state.rows.slice(0).reduce((prev, next, i, arr) => {
                    if (next.order === r.order) arr.splice(1);
                    else if (next.attendance === 'Present') return next.teacher;
                    return prev;
                }, 'Not Assigned');
                return false;
            });
            return state;
        },
    },
})

export const { updateAttendance } = attendanceSlice.actions

export default attendanceSlice.reducer