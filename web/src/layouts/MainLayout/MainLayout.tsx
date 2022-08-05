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
          style={{ backgroundColor: '#6b007d' }}
        >
          <Link className="nav-link" to={routes.home()}>
            <h1 className="navbar-brand mx-3 my-2">
              <strong>MealPlan</strong>
            </h1>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link mx-3" to={routes.home()}>
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
