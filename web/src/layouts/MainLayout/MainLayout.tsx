import { Link, routes } from '@redwoodjs/router'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ 'background-color': '#6b007d' }}
        >
          <h1 className="navbar-brand mx-3 my-2">
            <strong>MealPlan</strong>
          </h1>
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link" to={routes.home()}>
                <strong>Week Plan</strong>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default MainLayout
