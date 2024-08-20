function ListGroup() {
  const items = ["New York", "Los Angeles", "Las Vegas", "Texas"];
  return (
    <>
      <h1>Title</h1>
      {items.length === 0 && <p>No Items Found.</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            onClick={() => console.log(`Clicked ${item} ${index}`)}
            className="list-group-item"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
