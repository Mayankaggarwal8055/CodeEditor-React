const signUpData = async (userData) => {


    try {

        console.log(import.meta.env.VITE_API_BASE_URL)


        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include"
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Signup failed');
        }


        const data = await res.json()

        return data


    } catch (error) {
        console.error(error)

        return { error: error.message }
    }


}

export default signUpData