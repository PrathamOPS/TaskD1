function Gallery() {
  const photos = [
    "/Images/Photo1.jpeg",
    "/Images/Photo2.jpeg",
    "/Images/Photo3.jpeg",
    "/Images/Photo4.jpeg",
    "/Images/Photo5.jpeg"
  ]

  return (
    <section id="gallery" className="gallery-section">

      <h2>My Photos</h2>

      <div className="gallery-container">

        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Gallery photo ${index + 1}`}
          />
        ))}

      </div>

    </section>
  )
}

export default Gallery