import React from 'react'
import Link from 'next/link'

function Navbar({ user }) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-sm">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link href="/"><a className="navbar-brand"><i className="fas fa-list fa-2x"></i></a></Link>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03">

                        <div className="d-flex">
                            <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                            {user ?
                                <button className="btn btn-outline-danger"><Link href="/api/logout"><a>logout</a></Link></button>
                                :
                                <button className="btn btn-outline-success mr-2"><Link href="/api/login"><a>login</a></Link></button>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
