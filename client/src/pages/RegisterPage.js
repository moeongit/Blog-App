import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function register(ev) {
        ev.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Registration Successful');
                setUsername('');
                setPassword('');
            } else if (response.status === 400) {
                setError('Username already taken. Please choose another one.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } catch (error) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
    );
}
