import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { role } from '../API/auth/interfaces';
import { post } from '../API/admin/interfaces.ts';
import { employee } from '../API/hr/interfaces.ts';

interface InitialState {
  roles: string[];
  postName: string[];
  error: string;
  loading: boolean;
  employeeId: number;
}

const initialState: InitialState = {
  roles: [],
  postName: [],
  error: '',
  loading: false,
  employeeId: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<role[]>) => {
      if (!action.payload) {
        return;
      }
      const roles = action.payload.map((item) => item.name);
      state.roles = roles;
    },
    setEmployeeId: (state, action: PayloadAction<number>) => {
      if (!action.payload) {
        return;
      }
      state.employeeId = action.payload;
    },
    setPostName: (state, action: PayloadAction<post[]>) => {
      if (!action.payload) {
        return;
      }
      const postName = action.payload.map((item) => item.name);
      state.postName = postName;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        return;
      }
      state.loading = action.payload;
    },
  },
});

export const { setRoles, setPostName, setError, setLoading, setEmployeeId } =
  userSlice.actions;
