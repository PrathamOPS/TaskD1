function TutorialCard({ tutorial }) {
  return (
    <div className="tutorial-card">

      <img
        src={tutorial.image}
        alt={tutorial.title}
      />

      <h3>{tutorial.title}</h3>

      <p className="description">
        {tutorial.description}
      </p>

      <div className="card-bottom">

        <span className="rating">
          ⭐ {tutorial.rating}
        </span>

        <span className="author">
          {tutorial.author}
        </span>

      </div>

    </div>
  )
}

export default TutorialCard