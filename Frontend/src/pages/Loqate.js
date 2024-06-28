import React, { useState } from 'react';
import './Loqate.css';

const AddressSuggestion = () => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const fetchSuggestions = async (text) => {
        const apiKey = 'NK39-TH17-AC93-KA89';
        const url = `https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Key=${apiKey}&Text=${text}&IsMiddleware=false&Language=en-gb&Limit=20`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.Items);
            setSuggestions(data.Items);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setShowSuggestions(false);
        }
    };

    const handleChange = (e) => {
        const text = e.target.value;
        setInput(text);

        if (text.length >= 1) {
            fetchSuggestions(text);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.Text);
        setShowSuggestions(false);
    };

    return (
        <div className="address-suggestion-container">
            <h4 className='heading'>SEARCH FOR YOUR ADDRESS</h4>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Search address"
                className="address-input"
            />
            {showSuggestions && (
                <div className="suggestions">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.Id}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.Text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressSuggestion;
