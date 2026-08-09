export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="search-box"
      placeholder="🔍 Search books, authors, topics..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}