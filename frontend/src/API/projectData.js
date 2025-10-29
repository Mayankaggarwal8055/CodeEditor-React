const userProjectData = async (projectData) => {    

    try {
        const res = await fetch('http://localhost:4444/api/projectData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
            credentials: 'include', 
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'no data found ');
        }


        const data = await res.json()
        return data


    } catch (error) {
        return { error: error.message }
    }


}

export default userProjectData