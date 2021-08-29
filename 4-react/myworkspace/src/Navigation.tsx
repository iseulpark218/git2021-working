import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/todo">Todo</Link>
      </li>
      <li>
        <Link to="/feeds">Feeds</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/TodoInlineEdit">TodoInlineEdit</Link>
      </li>
    </ul>
  );
};

export default Navigation;