import { MetaTags } from '@redwoodjs/web'

import FoodItemsCell from 'src/components/FoodItemsCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <h1 className="my-3 mx-2">Week Plan</h1>
          </div>
          <div className="col-md-2 d-grid gap-2">
            <button type="button" className="btn btn-success btn-lg my-4 mx-2">
              Grocery List
            </button>
          </div>
          <div className="col-md  -2 d-grid gap-2">
            <button type="button" className="btn btn-primary btn-lg my-4 mx-2">
              Share
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <h3 className="text-center">Items</h3>
            <div className="d-flex align-items-stretch">
              <ul className="m-auto list-group">
                <FoodItemsCell />
                <li className="list-group-item">
                  <button type="button" className="btn btn-info m-auto">
                    Create New Item
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-10">
            <div className="container-fluid"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
