import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "31a3772259414fe3ac7fa21b21384f25"
    }
})