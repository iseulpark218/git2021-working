import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/chart1">Chart 1</Link>
      </li>
      <li>
        <Link to="/chart2">Chart 2</Link>
      </li>
      <li>
        <Link to="/todo">Todo</Link>
      </li>
      <li>
        <Link to="/feeds">Feeds</Link>
      </li>
      <li>
        <Link to="/contacts">Contact</Link>
      </li>
      <li>
        <Link to="/TodoInlineEdit">TodoInlineEdit</Link>
      </li>
      <li>
        <Link to="/photos">Photos</Link>
      </li>
      <li>
        <Link to="/contactinline">ContactInlineEdit</Link>
      </li>
    </ul>
  );
};

export default Navigation;