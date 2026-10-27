function ArticleCard({ article }) {
  return (
    <div className="article-card">

      <img
        src={article.image}
        alt={article.title}
      />

      <h3>{article.title}</h3>

      <p className="description">
        {article.description}
      </p>

      <div className="card-bottom">

        <span className="rating">
          ⭐ {article.rating}
        </span>

        <span className="author">
          {article.author}
        </span>

      </div>

    </div>
  )
}

export default ArticleCard