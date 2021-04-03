import { useEffect, useState } from "react";
import BlogList from "../Blog/components/BlogList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Home = () => {
  const [blogs, setBlogs] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await sendRequest("http://localhost:8000/blogs");
        setBlogs(data);
      } catch (err) {}
    };
    fetchBlogs();
  }, [sendRequest]);
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
