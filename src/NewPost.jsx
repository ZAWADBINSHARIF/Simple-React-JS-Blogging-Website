export default function NewPost({
    postTitle, postBody, setPostTitle, setPostBody, handleSubmit
}) {
    return (
        <main className="NewPost">
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    value={postTitle}
                    placeholder="Post Title"
                    name="title"
                    required
                    onChange={e => { setPostTitle(e.target.value) }}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    placeholder="Post Body"
                    value={postBody}
                    name="body"
                    required
                    onChange={e => { setPostBody(e.target.value) }}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}