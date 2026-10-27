function Projects() {
  return (
    <section id="portfolio" className="projects-section">

      <h2>Here's what I've done so far</h2>

      <div className="projects-container">

        <div className="project-card">

          <img
            src="/Images/MiniQuizApp.webp"
            alt="Mini Quiz App"
          />

          <div className="project-content">

            <h3>Mini Quiz App</h3>

            <p>
              I created a mini quiz app that allows users to
              test their knowledge on various topics by answering
              multiple-choice questions.
            </p>

            <button className="project-button">
              View Project
            </button>

          </div>

        </div>


        <div className="project-card">

          <img
            src="/Images/ToDoList.jpeg"
            alt="Todo List App"
          />

          <div className="project-content">

            <h3>To Do List App</h3>

            <p>
              A simple todo list application that allows users
              to create, read, update and delete tasks.
            </p>

            <button className="project-button">
              View Project
            </button>

          </div>

        </div>

      </div>

      <hr />

    </section>
  )
}

export default Projects