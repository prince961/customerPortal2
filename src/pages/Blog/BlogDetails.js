import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

const BlogDetails = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const { id } = useParams();
  const [blog, setBlog] = useState;
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const data = await sendRequest(`http://localhost:8000/blogs/${id}`);
        setBlog(data);
      } catch (err) {}
    };
    fetchBlogDetails();
  }, [sendRequest]);
  const history = useHistory();

  const handleClick = async () => {
    try {
      await sendRequest(`http://localhost:8000/blogs/${blog.id}`, "DELETE");

      history.push("/");
    } catch (err) {}
  };

  return (
    <div className="blog-details">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
