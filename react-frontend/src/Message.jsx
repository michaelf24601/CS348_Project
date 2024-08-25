import {useState, useEffect} from 'react';
import axios from 'axios';

function Message() {

    const [message, setMessage] = useState("No Message");

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const url = "http://localhost:8080/hello_world";
                const response = await axios.get(url);
                setMessage(response.data);
            } catch (error) {
                console.error("Error fetching the message", error);
            }
        };

        fetchMessage();
    }, []); //

    return <h1>{message}</h1>;
}

export default Message;