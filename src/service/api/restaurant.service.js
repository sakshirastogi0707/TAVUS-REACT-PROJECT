import {urls} from "../../config/urlConfig";
import {HTTP} from "../core/http.service";


async function addRestaurant  (restaurant) {
    const result = await HTTP.post(urls.createRestaurant, restaurant);
    if (result.data) {
        return result.data;
    }
    return undefined;
};


export default {
    addRestaurant,
}
