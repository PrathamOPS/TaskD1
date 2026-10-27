import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import './Post.css'

function Post() {
  const [postType, setPostType] = useState('Question')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    abstract: '',
    articleText: '',
    tags: ''
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  function handleTypeChange(type) {
    setPostType(type)
    setErrors({})
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ''
    })
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a title.'
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must contain at least 5 characters.'
    } else if (formData.title.trim().length > 150) {
      newErrors.title = 'Title cannot exceed 150 characters.'
    }

    if (postType === 'Question') {
      if (!formData.description.trim()) {
        newErrors.description = 'Please enter a description.'
      } else if (formData.description.trim().length < 10) {
        newErrors.description =
          'Description must contain at least 10 characters.'
      }
    }

    if (postType === 'Article') {
      if (!formData.abstract.trim()) {
        newErrors.abstract = 'Please enter an abstract.'
      } else if (formData.abstract.trim().length < 10) {
        newErrors.abstract =
          'Abstract must contain at least 10 characters.'
      }

      if (!formData.articleText.trim()) {
        newErrors.articleText = 'Please enter your article.'
      } else if (formData.articleText.trim().length < 20) {
        newErrors.articleText =
          'Article must contain at least 20 characters.'
      }
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'Please enter at least one tag.'
    } else {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)

      if (tags.length === 0) {
        newErrors.tags = 'Please enter at least one valid tag.'
      } else if (tags.some(tag => tag.length < 2)) {
        newErrors.tags = 'Each tag must contain at least 2 characters.'
      } else if (tags.length > 5) {
        newErrors.tags = 'You can enter a maximum of 5 tags.'
      }
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSuccess('')

    if (!validateForm()) {
      window.alert('Please correct the errors in the form.')
      return
    }
    if (!auth.currentUser) {
      window.alert('Please log in before creating a post.')
      navigate('/login')
      return
    }

    try {
      setSaving(true)
      await addDoc(collection(db, 'posts'), {
        type: postType,
        title: formData.title.trim(),
        description: postType === 'Question' ? formData.description.trim() : '',
        abstract: postType === 'Article' ? formData.abstract.trim() : '',
        articleText: postType === 'Article' ? formData.articleText.trim() : '',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || auth.currentUser.email,
        authorEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
      })
      setSuccess(`Your ${postType.toLowerCase()} has been saved to Firestore.`)
      setFormData({ title: '', description: '', abstract: '', articleText: '', tags: '' })
    } catch (error) {
      console.error('Post save failed:', error)
      window.alert('Could not save your post. Check your Firestore rules and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="post-page">
      <section className="post-container">
        <h1>New Post</h1>

        <p className="post-intro">
          Share your knowledge or ask the community a question.
        </p>

        <div className="post-type-selector">
          <button
            type="button"
            className={postType === 'Question' ? 'type-button active' : 'type-button'}
            onClick={() => handleTypeChange('Question')}
            aria-pressed={postType === 'Question'}
          >
            Question
          </button>

          <button
            type="button"
            className={postType === 'Article' ? 'type-button active' : 'type-button'}
            onClick={() => handleTypeChange('Article')}
            aria-pressed={postType === 'Article'}
          >
            Article
          </button>
        </div>

        {success && <p className="post-success" role="status">{success}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="post-field">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder={
                postType === 'Question'
                  ? 'Enter your question title'
                  : 'Enter your article title'
              }
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />

            {errors.title && (
              <span id="title-error" className="field-error">
                {errors.title}
              </span>
            )}
          </div>

          {postType === 'Question' ? (
            <div className="post-field">
              <label htmlFor="description">Describe your question</label>

              <textarea
                id="description"
                name="description"
                placeholder="Explain your question in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={6}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? 'description-error' : undefined
                }
              />

              {errors.description && (
                <span id="description-error" className="field-error">
                  {errors.description}
                </span>
              )}
            </div>
          ) : (
            <>
              <div className="post-field">
                <label htmlFor="abstract">Abstract</label>

                <textarea
                  id="abstract"
                  name="abstract"
                  placeholder="Provide a short summary of your article..."
                  value={formData.abstract}
                  onChange={handleChange}
                  rows={3}
                  aria-invalid={Boolean(errors.abstract)}
                  aria-describedby={
                    errors.abstract ? 'abstract-error' : undefined
                  }
                />

                {errors.abstract && (
                  <span id="abstract-error" className="field-error">
                    {errors.abstract}
                  </span>
                )}
              </div>

              <div className="post-field">
                <label htmlFor="articleText">Article Text</label>

                <textarea
                  id="articleText"
                  name="articleText"
                  placeholder="Write your article here..."
                  value={formData.articleText}
                  onChange={handleChange}
                  rows={10}
                  aria-invalid={Boolean(errors.articleText)}
                  aria-describedby={
                    errors.articleText ? 'articleText-error' : undefined
                  }
                />

                {errors.articleText && (
                  <span id="articleText-error" className="field-error">
                    {errors.articleText}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="post-field">
            <label htmlFor="tags">Tags</label>

            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="React, JavaScript, Web Development"
              value={formData.tags}
              onChange={handleChange}
              aria-invalid={Boolean(errors.tags)}
              aria-describedby={errors.tags ? 'tags-error' : undefined}
            />

            <small>Separate tags with commas. Maximum 5 tags.</small>

            {errors.tags && (
              <span id="tags-error" className="field-error">
                {errors.tags}
              </span>
            )}
          </div>

          <button type="submit" className="submit-post-button" disabled={saving}>
            {saving ? 'Saving…' : 'Post'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Post