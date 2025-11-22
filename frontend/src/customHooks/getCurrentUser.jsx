import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { useDispatch } from "react-redux"
import { clearUserData, setUserData, setUserLoading } from "../redux/userSlice"

const getCurrentUser = ()=>{
    let dispatch = useDispatch()
   
    useEffect(()=>{
        const fetchUser = async () => {
            dispatch(setUserLoading(true))
            try {
                let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
                // Only set userData to null if it's a 400/401 error, not network errors
                if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                    dispatch(clearUserData())
                } else if (!error.response) {
                    // Network error - server might not be running
                    console.warn("Network error: Backend server might not be running")
                    dispatch(clearUserData())
                }
            } finally {
                dispatch(setUserLoading(false))
            }
        }
        fetchUser()
    },[dispatch])
}

export default getCurrentUser