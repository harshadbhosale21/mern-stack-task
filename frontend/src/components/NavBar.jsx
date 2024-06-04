import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <div className="navbar-cont conatiner-fluid p-3 d-flex justify-content-center bg-secondary w-100">
                <a href='#transactions' className='list-item'><button className="btn btn-primary mx-2">Transaction Table</button></a>
                <a href='#stats' className='list-item'><button className="btn btn-primary mx-2">Statistics</button></a>
                <a href='#bar' className='list-item'><button className="btn btn-primary mx-2">Bar Graph</button></a>

            </div>

        </>
    )
}

export default NavBar
