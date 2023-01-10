import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
import './NavBar.css';

export default function NavBar() {
  const [showNav, setShowNav] = useState(false);
  
  return (
    <>
		<section className='mb-3'>
			<MDBNavbar dark bgColor='dark'>
				<MDBContainer fluid>
					<MDBNavbarToggler
					type='button'
					className='second-button'
					data-target='#navbarToggleExternalContent'
					aria-controls='navbarToggleExternalContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
					onClick={() => setShowNav(!showNav)}
					>
						<div className={`animated-icon2 ${showNav && 'open'}`}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</MDBNavbarToggler>
				</MDBContainer>
			</MDBNavbar>

			<MDBCollapse show={showNav}>
				<div className='bg-light shadow-3 p-4'>
					<MDBBtn block className='border-bottom m-0' color='link'>
					Transactions
					</MDBBtn>
					<MDBBtn block className='border-bottom m-0' color='link'>
					Investments
					</MDBBtn>
					<MDBBtn block className='border-bottom m-0' color='link'>
					Log Out
					</MDBBtn>
				</div>
			</MDBCollapse>
      </section>
      {/* <section className='mb-3'>
        <MDBNavbar>
          <MDBContainer fluid>
            <MDBNavbarToggler
              type='button'
              className='first-button'
              data-target='#navbarToggleExternalContent'
              aria-controls='navbarToggleExternalContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowAnimated(!showAnimated)}
            >
              <div className={`animated-icon1 ${showAnimated && 'open'}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </MDBNavbarToggler>
          </MDBContainer>
        </MDBNavbar>

        <MDBCollapse show={showAnimated}>
          <div className='bg-light shadow-3 p-4'>
            <MDBBtn block className='border-bottom m-0' color='link'>
              Link 1
            </MDBBtn>
            <MDBBtn block className='border-bottom m-0' color='link'>
              Link 2
            </MDBBtn>
            <MDBBtn block className='border-bottom m-0' color='link'>
              Link 2
            </MDBBtn>
          </div>
        </MDBCollapse>
      </section> */}
    </>
  );
}