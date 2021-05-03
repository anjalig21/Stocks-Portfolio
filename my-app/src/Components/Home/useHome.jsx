import { useState } from 'react';
import { useHistory } from 'react-router-dom';
require('dotenv').config();
const axios = require('axios');

function useHome() {
    // classes and queries
    const history = useHistory();
    const [name, setName] = useState();

    async function getName(e) {
        e.preventDefault();
        const result = await axios.get(`${process.env.REACT_APP_PORT}/portfolio/${name}`)
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

