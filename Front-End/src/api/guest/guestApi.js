import guest_baseURL from "./guestAxios";

export const moviesFetchguest = async (locationValue, page, limit) => {
    try {
        console.log(locationValue,page,limit)
        const response = await guest_baseURL.get(
            `/guest/guestmovielist?page=${page}&limit=${limit}&locationValue=${locationValue}`
        );
        return response?.data;
        
    } catch (error) {
        console.error("users movie data fetch api error:", error);
        throw error;
        
    }
    
}

