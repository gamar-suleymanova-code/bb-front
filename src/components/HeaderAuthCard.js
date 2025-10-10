import React from 'react';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
export default function HeaderAuthCard () {
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });

  if (!isTablet) return null;

  return (
    <h5 className="c_darkBlue flex_center justify-content-between w-100" id="offcanvasNavbarLabel">
      Close form
      <button type="button" className="default_btn" data-bs-dismiss="offcanvas" aria-label="Close">
        <FontAwesomeIcon className="c_darkBlue" icon={faRectangleXmark} />
      </button>
    </h5>
  );
};
