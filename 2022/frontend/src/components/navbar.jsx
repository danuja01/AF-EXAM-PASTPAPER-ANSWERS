const Navbar = ({ items }) => {
  return (
    <div className="navbar">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
