import TutorialCard from './TutorialCard'

const tutorials = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "JS",
    image: "/Images/js.webp",
    rating: 5,
    author: "Pratham"
  },

  {
    id: 2,
    title: "React Router",
    description: "React Router",
    image: "/Images/react-router.webp",
    rating: 5,
    author: "Alex"
  },

  {
    id: 3,
    title: "Express.js Fundamentals",
    description: "Express",
    image: "/Images/expressjs.webp",
    rating: 4.9,
    author: "Sarah"
  }
]

function Tutorials() {
  return (
    <section id="tutorials" className="tutorials-section">

      <h2>Featured Tutorials</h2>

      <div className="cards-container">

        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            tutorial={tutorial}
          />
        ))}

      </div>

      <button className="see-all-button">
        See all tutorials
      </button>

    </section>
  )
}

export default Tutorials