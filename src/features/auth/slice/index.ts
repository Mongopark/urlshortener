import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthRequest } from '../model';
import { useLoginMutation } from '../../../app/api.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks';

type AuthState = {
  token: string | null;
  isUserAuthenticated: boolean;
};

const initialState: AuthState = {
  token: null,
  isUserAuthenticated: false,
};

export function useAuthAction() {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [postRequest] = useLoginMutation();

  return {
    authenticate: async (request: AuthRequest, redirect: string | null = null) => {
      if (loading) {
        return;
      }

      try {
        setLoading(true);

        const response = await postRequest(request).unwrap();

        dispatch(saveToken(response.data.token));
        navigate(redirect ?? '/');
        toast(response.message, {
          type: 'success'
        });
      } catch (e) {
        // @ts-expect-error e is an rtk query error
        toast(e.data.message, {
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    },
    loading
  };
}

export const resetStore = createAction('RESET_STORE');

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(resetStore());
  return null;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
    });
  },
  selectors: {
    isAuthenticated: (state: AuthState) => !!state.token
  }
});

export const { saveToken } = authSlice.actions;
export const { setUserAuthenticated } = authSlice.actions;
export const { isAuthenticated } = authSlice.selectors;
