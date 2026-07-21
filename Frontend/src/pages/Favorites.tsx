import { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    setFavorites(stored);
  }, []);

  const removeFavorite = (id:any) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Single source of truth for types
  const categories = [
    {
      type: "spacecraft",
      title: "🛰️ Spacecrafts",
      icon: "🛰️",
    },
    {
      type: "launcher",
      title: "🚀 Launchers",
      icon: "🚀",
    },
    {
      type: "centre",
      title: "🏢 Centres",
      icon: "🏢",
    },
    {
      type: "customer",
      title: "📡 Customers",
      icon: "📡",
    },
  ];

  // reusable filter function
  const getItemsByType = (type:any) => {
    return favorites.filter((item) => item.type === type);
  };

  const renderList = (list:any, icon:any) => {
    if (!list.length) {
      return <p className="empty">No Favorites</p>;
    }

    return list.map((item:any) => (
      <div className="card-item" key={item.id}>
        <div className="icon">{icon}</div>
        <h6>{item.name || item.id}</h6>

        <button
          className="remove-btn"
          onClick={() => removeFavorite(item.id)}
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div className="favorites-page">
      <div className="container py-5">

        {/* Header */}
        <div className="header">
          <h1>⭐ My Favorites</h1>
        </div>

        <div className="row g-0 main-row">

          {/* Dynamic rendering (no repetition) */}
          {categories.map((cat) => (
            <div
              key={cat.type}
              className="col-lg-3 col-md-6 column-divider"
            >
              <div className="category-box">

                <h4 className="title">{cat.title}</h4>

                {renderList(getItemsByType(cat.type), cat.icon)}

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Favorites;