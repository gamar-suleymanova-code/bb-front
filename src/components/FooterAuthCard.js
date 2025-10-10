// import { useAuthFormHeightContext } from "../context/AuthFormHeightContext";
import { setRegisterFormActive } from "../features/authFormSlice";
import { useSelector, useDispatch } from "react-redux";
export default function FooterAuthCard() {
    const registerFormActive = useSelector(state => state.authForm.registerFormActive);
    const dispath = useDispatch();

    const flipAuthorazationCard = (registerFormActive) => {
        if(registerFormActive){
            dispath(setRegisterFormActive(false));
        } else {
            dispath(setRegisterFormActive(true));
        }
    }
    return (
        <div className='c_darkBlue text_sm text-center text_balance'>
            <span>{`${registerFormActive? 'Already': 'Don’t'} have an Account${registerFormActive? '': ' yet' }?`}</span>
            <button
                className="btn_link transition_default ps-1 fw-bold h-auto"
                id="register-tab"
                onClick={() => flipAuthorazationCard(registerFormActive)}
            >
                {
                    `${registerFormActive ? 'Login' : 'Create One'}`
                    + ' '
                    + 'Now!'
                }
            </button>
        </div>
    );
}