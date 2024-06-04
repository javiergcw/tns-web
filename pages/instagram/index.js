import { useState } from 'react';

const Home = () => {
    const [username, setUsername] = useState('thenewschool95');
    const [posts, setPosts] = useState([]);

    const fetchInstagramFeed = async () => {
        try {
            const res = await fetch(`/api/instagram?username=${username}`);
            const data = await res.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Error fetching Instagram feed:', error);
        }
    };

    return (
        <div>
            <h1>Instagram Feed Viewer</h1>
            <input
                type="text"
                placeholder="Enter Instagram username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchInstagramFeed}>Fetch Feed</button>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                            <img src={post.thumbnail} alt={post.caption} />
                        </a>
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
