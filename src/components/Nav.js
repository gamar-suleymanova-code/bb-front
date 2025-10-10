import { useRef, useEffect } from 'react';
import fullLogo from '../assets/img/logo-full/1.svg';
import miniLogo from '../assets/img/logo-mini/img.svg';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlipCard from './FlipCard';
import { useMediaQuery } from 'react-responsive';
import { setNavHeight } from '../features/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Nav() {
  const dispatch = useDispatch();
  const registerFormActive = useSelector(state => state.authForm.registerFormActive);
  const userAuthorized = useSelector(state => state.main.userAuthorized);
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
  const authRegFormHeight = useSelector(state => state.authForm.authRegFormHeight);
  const authLoginFormHeight = useSelector(state => state.authForm.authLoginFormHeight);
  
  const navbarRef = useRef(null);
  useEffect(() => {
    if (navbarRef.current) {
      dispatch(setNavHeight(navbarRef.current.offsetHeight));
    }
    // eslint-disable-next-line
  }, []);
    return (
      <nav
        ref={navbarRef}
        className="w-100 position-fixed top-0 z_index_1">
      <div className='container-xxl pt_12px'>
          {userAuthorized?
            <>authorized nav</>
            : (
              <div className='row justify-content-between justify-content-lg-center'>
                <div className='col-auto'>
                  {isTablet? 
                    <img className='w-auto h-100 object-fit-contain' src={miniLogo} alt='BudgetBuddy' />
                    :
                    <img className='w-auto h-100 object-fit-contain' src={fullLogo} alt='BudgetBuddy' />
                  }
                </div>
                {isTablet && (
                  <div className='col-auto'>
                    <button className="default_btn c_darkBlue h4 flex_center gap-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                      <span className="h5">{registerFormActive? 'Register': 'Login'}</span> <FontAwesomeIcon icon={faRightToBracket} />
                    </button>
                    <div
                      className="offcanvas  offcanvas-top border-bottom-0 transition_default custom_backdrop bg-transparent"
                      tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
                      style={{'--bs-offcanvas-height': `${registerFormActive? authRegFormHeight: authLoginFormHeight}px`}}>
                      <div className="offcanvas-body p-0 overflow_unset">
                        <FlipCard />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
      </div>
    </nav>
  );
}