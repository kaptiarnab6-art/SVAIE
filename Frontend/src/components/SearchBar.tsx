interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="input-group shadow rounded border border-info">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;