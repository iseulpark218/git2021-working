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
        <Link to="/feeds2">Feeds2</Link>
      </li>
    </ul>
  );
};

export default Navigation;