import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const API_URL = process.env.REACT_APP_API_URL;

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/post/${id}`)
            .then(response => response.json())
            .then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files) {
            data.set('file', files);
        }

        try {
            const response = await fetch(`${API_URL}/post`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                console.error('Failed to update post:', await response.text());
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <form onSubmit={updatePost}>
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
            <button style={{ marginTop: '5px' }}>Update Post</button>
        </form>
    );
}
