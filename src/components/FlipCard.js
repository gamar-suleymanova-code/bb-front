import React, { useEffect, useRef} from "react";
import HeaderAuthCard from "./HeaderAuthCard";
import AuthForm from "./AuthForm";
import FooterAuthCard from "./FooterAuthCard";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
    setAuthRegFormHeight,
    setAuthLoginFormHeight,
} from "../features/authFormSlice";
// first child of this component is going to be on front side, second on back
export default function FlipCard() {
    const authLoginFormRef = useRef(null);
    const authRegFormRef = useRef(null);
    const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
    const dispatch = useDispatch();
    const registerFormActive = useSelector(state => state.authForm.registerFormActive);
    useEffect(() => {
        dispatch(setAuthRegFormHeight(authRegFormRef.current.offsetHeight));
        dispatch(setAuthLoginFormHeight(authLoginFormRef.current.offsetHeight));
        // eslint-disable-next-line
    }, [authRegFormRef, authLoginFormRef]);
    

    return (
        <div className={`flip-card ${registerFormActive? 'register_active': ''}`}>
            <div className="flip-card-inner flex_center">
                <div ref={authLoginFormRef} className={`flip-card-front form_p ${isTablet ? '' : 'rounded_18px'} shadow_drop bg_white w-100 d-flex flex-column gap_12px`}>
                    <HeaderAuthCard />
                    <AuthForm isLogin={true} />
                    <FooterAuthCard />
                </div>
                <div ref={authRegFormRef} className={`flip-card-back form_p ${isTablet ? '' : 'rounded_18px'} shadow_drop bg_white w-100 d-flex flex-column gap_12px`}>
                    <HeaderAuthCard />
                    <AuthForm isLogin={false} />
                    <FooterAuthCard />
                </div>
            </div>
        </div>
    );
}