import { NavLink } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div style={{fontSize: 48, color: "red" }} >404 ERROR
      <NavLink to="/">Back</NavLink>
    </div>
  )
}

export default NotFoundPage