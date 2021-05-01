import { useState } from 'react';
import { useHistory } from 'react-router-dom';
const axios = require('axios');

function useHome() {
    // classes and queries
    const history = useHistory();
    const [name, setName] = useState();

    async function getName(e) {
        e.preventDefault();
        const result = await axios.get(`http://localhost:5000/portfolio/${name}`)
            .then((res) => {
                localStorage.setItem("name", name);
                history.push("/Main");
            })
            .catch((err) => {
                history.push("/createAccount");
            })
        return result;
    }

    return {
        history,
        name, 
        getName,
        setName
    }
}

export default useHome

