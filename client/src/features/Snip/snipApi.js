import { API } from "../../constants/api"
import apiClient from "../../services/apiClient"

export const snipsApi ={
    getAll : async () => {
        const res = await apiClient.get(API.SNIPS.ROOT);
        return res.data;
    },

    getById : async (id) => {
        const res = await apiClient.get(API.SNIPS.BY_ID(id));
        return res.data;
    },

    create : async (snip) =>{
        const res = await apiClient.post(API.SNIPS.ROOT, snip);
        return res.data;
    },

    update : async ({id, data})=>{
        const res = await apiClient.put(API.SNIPS.BY_ID(id), data);
        return res.data;
    },

    delete : async (id)=> {
        const res = await apiClient.delete(API.SNIPS.BY_ID(id));
        return res.data;
    }
}