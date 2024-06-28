import React, { useState } from 'react';
import axios from 'axios';
import './Authentication.css';

const Authentication = () => {
    const [method, setMethod] = useState('email'); // or 'sms'
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [serverOtp, setServerOtp] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/send-otp', { method, contact });
            setServerOtp(response.data.otp);
            alert(response.data.message);
        } catch (error) {
            alert('Failed to send OTP');
        }
    };

    const handleVerifyOtp = () => {
        if (otp === serverOtp) {
            setIsAuthenticated(true);
            alert('OTP verified successfully');
        } else {
            alert('Invalid OTP');
        }
    };

    if (isAuthenticated) {
        return <h2>Welcome, you are logged in!</h2>;
    }

    return (
        <div className="container">
            <h1>Your savings journey starts here</h1>
            <div className="input-group">
                <label htmlFor="method">Select Method</label>
                <select id="method" className="form-control" onChange={(e) => setMethod(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="sms">Mobile Number</option>
                </select>
            </div>
            <div className="input-group">
                <label htmlFor="contact">{method === 'email' ? 'Enter email' : 'Enter mobile number'}</label>
                <input
                    id="contact"
                    className="form-control"
                    type="text"
                    placeholder={method === 'email' ? 'Enter email' : 'Enter mobile number'}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
            </div>
            <button className="btn" onClick={handleSendOtp}>Send OTP</button>
            <div className="input-group" id='otp-input'>
                <label htmlFor="otp">Enter OTP</label>
                <input
                    id="otp"
                    className="form-control"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            </div>
            <button className="btn" onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
    );
};

export default Authentication;
