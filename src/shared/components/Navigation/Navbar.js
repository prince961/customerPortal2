import { Link } from "react-router-dom";
import Button from "../UIElements/Button";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>The Dojo Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Button href={"/create"}>Create Order</Button>
        {/* <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px",
          }}
        >
          New Blog
        </Link>

        <Link to="/UploadCsv">Upload Excel</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
