import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useUserData = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState("user");  // Using userType instead of role

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            try {
                // Try parsing the user object from cookies
                setUser(JSON.parse(storedUser)); 
            } catch (error) {
                console.error("Invalid user data in cookies:", error);
                // If invalid data, remove cookies and reset user
                Cookies.remove("user"); 
                setUser(null);
            }
        }

        // Check and set the userType from cookies, default to 'user' if not found
        const storedUserType = Cookies.get("userType");  // Looking for userType instead of role
        if (storedUserType) {
            setUserType(storedUserType);
        } else {
            setUserType("user");
        }
    }, []);

    // Function to update user data
    const updateUser = (newUser) => {
        if (!newUser) {
            // Remove cookies and reset user state if newUser is null
            Cookies.remove("user");
            setUser(null);
        } else {
            // Store the new user in cookies for 7 days and set in state
            Cookies.set("user", JSON.stringify(newUser), { expires: 7, secure: true, sameSite: "Strict" });
            setUser(newUser);
        }
    };

    // Function to update userType (role)
    const updateUserType = (type) => {
        if (!type) {
            setUserType("user");
        } else {
            setUserType(type);
            // Store userType instead of role in cookies
            Cookies.set("userType", type, { expires: 7, secure: true, sameSite: "Strict" });
        }
    };

    return { user, userType, updateUser, updateUserType };
};

export default useUserData;
