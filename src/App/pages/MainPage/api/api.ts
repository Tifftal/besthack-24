import axios from "axios"

export const AddDepartment = async (name: string) => {
    try {
        const response = await axios.post('http://62.217.182.34:8111/api/main/department',
            {
                name: name,
            },
        );
        console.log(response)
        return response;
    }
    catch (error) {
        console.log(error)
        return {}
    }
}

export const GetDepartment = async () => {
    try {
        const response = await axios.get('http://62.217.182.34:8111/api/main/department');
        console.log(response.data)
        return response.data.content;
    }
    catch (error) {
        console.log(error)
        return {}
    }
}