import React from 'react'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

function SamplePage() {
    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    {/*  Header Start */}
                    <Header />
                    {/*  Header End */}
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-4">Sample Page</h5>
                                <p className="mb-0">This is a sample page </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SamplePage