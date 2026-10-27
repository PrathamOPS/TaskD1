import ArticleCard from './ArticleCard'

const articles = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "React OR Vue",
    image: "/Images/image3.webp",
    rating: 5,
    author: "Pratham"
  },

  {
    id: 2,
    title: "Introduction to NodeJS",
    description: "NodeJS",
    image: "/Images/image1.webp",
    rating: 5,
    author: "Alex"
  },

  {
    id: 3,
    title: "Understanding React Hooks",
    description: "React Hooks",
    image: "/Images/imageee.webp",
    rating: 5,
    author: "Sarah"
  }
]

function Articles() {
  return (
    <section id="articles" className="articles-section">

      <h2>Featured Articles</h2>

      <div className="cards-container">

        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}

      </div>

      <button className="see-all-button">
        See all articles
      </button>

    </section>
  )
}

export default Articles