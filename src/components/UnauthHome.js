import { imgs } from '../content/home';
import Slider from "react-slick";
import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import { TypeAnimation } from 'react-type-animation';
import FlipCard from './FlipCard';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import useChangeOnResize from '../hooks/useChangeOnResize';
export default function UnauthHome() {
    const sliderRef = useRef(null);
    const navbarHeight = useSelector(state => state.main.navHeight);
    const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
    const [bannerTextHeights, setBannerTextHeights] = useState([]);
    const bannerTextRefs = useRef([]);

    const updateBannerTextHeights = () => {
        const heights = bannerTextRefs.current.map(ref => ref?.offsetHeight || 0);
        setBannerTextHeights(heights);
    };

    useEffect(() => {
        updateBannerTextHeights();
    }, []);
    useChangeOnResize(updateBannerTextHeights)

    const settings = {
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 3600,// Slide transition duration
    };
    const goToSlide = (index) => {
        if(sliderRef.current) sliderRef.current.slickGoTo(index); // Go to a specific slide
    };

    return (
        <div
            className='container-xxl pb_12px px_36px d-flex flex-column justify-content-center h-100'
            style={{ paddingTop: navbarHeight }}>
            <div className='row'>
                <div className='col-lg-9'>
                    <div className='container-fluid px-0'>
                        <div className='row flex-md-row-reverse align-items-lg-center'>
                            <div className='col-lg-8'>
                                <Slider {...settings} ref={sliderRef}>
                                    {imgs.map((item, index) => (
                                        <div key={index}>
                                            <div>
                                                <img
                                                    className='w-100 object-fit-cover object_top'
                                                    src={item.img}
                                                    alt={item.text}
                                                    style={{ height: isTablet ? `calc(100vh - ${navbarHeight + 24 + (bannerTextHeights[0] || 0)}px)` : '100%' }}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center position-absolute z_index_-1 hidden"
                                                ref={el => bannerTextRefs.current[index] = el}>
                                                <h4 className='c_darkBlue shadow_Tmain'>{item.text} <span className='c_main text-capitalize'>{item.highlited}</span></h4>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div
                                className='col-lg-4'
                                style={{ height: `${bannerTextHeights[0]}px` }}>
                                <TypeAnimation
                                    sequence={[
                                        () => goToSlide(0),
                                        imgs[0].text,
                                        2000,
                                        () => goToSlide(1),
                                        imgs[1].text,
                                        2000,
                                        () => goToSlide(2),
                                        imgs[2].text,
                                        2000,

                                    ]}
                                    wrapper="h4"
                                    speed={50}
                                    repeat={Infinity}
                                    className={`c_darkBlue shadow_Tmain ${isTablet && 'text-center'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {isTablet ?
                    ''
                    : (
                        <div className="login_form_container col-lg-3 d-lg-flex align-items-center">
                            <FlipCard />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
