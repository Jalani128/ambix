import { Link } from 'react-router-dom'

export default function Logo({ small = false, tagline = false }) {
  return (
    <Link to="/" className={`logo ${small ? 'logo--sm' : ''}`} aria-label="AMBIX Technologies">
      <span className="logo__word">AMBI<span className="logo__x">X</span></span>
      <span className="logo__sub">Technologies</span>
      {tagline && <span className="logo__tag">Intelligence. Innovation. Impact.</span>}
    </Link>
  )
}
