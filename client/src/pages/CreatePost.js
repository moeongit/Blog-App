import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

const API_URL = process.env.REACT_APP_API_URL;

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (files) {
            data.set('file', files[0]);
        }

        try {
            const response = await fetch(`${API_URL}/post`, {
                method: 'POST',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                console.error('Failed to create post:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
            />
            <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)}
            />
            <input
                type="file"
                onChange={ev => setFiles(ev.target.files[0])}
            />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: '5px' }}>Create Post</button>
        </form>
    );
}
