import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../constants/api";
import { MESSAGES } from "../../constants/messages";
import { snipsApi } from "./snipApi";

export const fetchSnips = createAsyncThunk(
    "snips/fetchAll",
    async (_, {rejectWithValue}) => {
        try
        {
            return await snipsApi.getAll();
        }
        catch(err)
        {
            return rejectWithValue(err.response?.data || MESSAGES.SNIP.FETCH_ERROR); 
        }
    }
);


export const fetchSnipById = createAsyncThunk(
    "snips/fetchById", 
    async (id, {rejectWithValue}) => {
        try
        {
            return await snipsApi.getById(id);
        }
        catch(err)
        {
            return rejectWithValue(err.response?.data || MESSAGES.SNIP.FETCH_ERROR); 
        }
    }
);

export const createSnip = createAsyncThunk(
    "snips/create", 
    async (snip, {rejectWithValue}) => {
        try
        {
            await snipsApi.create(snip);
            return snip;
        }
        catch(err)
        {
            return rejectWithValue(err.response?.data || MESSAGES.SNIP.CREATE_FAILED); 
        }
    }
);

export const updateSnip = createAsyncThunk(
    "snips/update",
    async ({id, data}, {rejectWithValue}) => {
        try
        {
            await snipsApi.update({id, data});
            return { id, data }; 
        }
        catch(err)
        {
            return rejectWithValue(err.response?.data || MESSAGES.SNIP.UPDATE_FAILED); 
        }
    }
);

export const deleteSnip = createAsyncThunk(
    "snips/delete",
    async (id, {rejectWithValue}) => {
        try
        {
            await snipsApi.delete(id);
            return id;
        }
        catch(err)
        {
            return rejectWithValue(err.response?.data || MESSAGES.SNIP.DELETE_FAILED); 
        }
    }
);