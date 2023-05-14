import { Link } from "react-router-dom/cjs/react-router-dom.min"

function Post({post}) {
  return (
      <article className="post">
          <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              <p className="datetime">{post.datetime }</p>
          </Link>
          <p className="postBody">{
              (post.body).length <= 50
                  ? post.body
                  : `${post.body.slice(0, 50)}...`

           }</p>
    </article>
  )
}
export default Post