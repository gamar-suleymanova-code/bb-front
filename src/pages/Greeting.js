import React, { 
    useEffect,
    useState
} from 'react';
import { 
    // useSelector,
    useDispatch
} from 'react-redux';
import { seUserAuthorized } from '../features/mainSlice';
import StepWizard from 'react-step-wizard';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';

// Step 1
const Step1 = ({ nextStep, setFormData }) => {
    const validationSchemaStep = Yup.object({
        MonthlyIncome: Yup.number()
            .typeError('Add only numbers')
            .positive('Number must be positive')
            .required('Monthly Income is required'),
        MonthlySpending: Yup.number()
            .typeError('Add only numbers')
            .positive('Number must be positive')
            .required('Monthly Spending is required'),
    });
    const formik = useFormik({
        initialValues: { MonthlyIncome: '', MonthlySpending: '' },
        validationSchema: validationSchemaStep,
        onSubmit: (values) => {
            console.log(values);
            nextStep();
        }
    });
    return(
        <form className={`d-flex flex-column gap_24px shadow_m3Light rounded_18px pt_18px px_24px pb_24px`}
            onSubmit={formik.handleSubmit}>
            <div className="step-indicators flex_center">
                <div className={`step active`}></div>
                <div className={`step`}></div>
                <div className={`step`}></div>
            </div>
            <h6 className='c_darkBlue mb_12px text-center'>What are your total income and Spendings, or their estimates?</h6>
            <div className='input_group w-100 d-flex gap_18px'>
                <FormField moreClass='w-100' name='MonthlyIncome' type='MonthlyIncome' placeholder='Monthly Income' autoComplete={'MonthlyIncome'}formik={formik}></FormField>
                <FormField moreClass='w-100' name='MonthlySpending' type='MonthlySpending' placeholder='Monthly Spending' autoComplete={'MonthlySpending'}formik={formik}></FormField>
            </div>
            <button
                type='submit'
                className='default_btn ms-auto shadow_on_state bg_main c_light rounded_12px h6 flex_center gap_12px w_fit px-5 transition_default'>
                {`Next`}
            </button>
        </form>
    );
};
  
  // Step 2
  const Step2 = ({ nextStep, setFormData }) => {
    const validationSchemaStep = Yup.object({
        CatBudget: Yup.string()
            .required('Category is required'),
        Percentage: Yup.number()
            .typeError('Only include number')
            .min(1, 'The number must be at least 1')
            .max(100, 'The number must be less than or equal to 100')
            .required('Percentage is required'),
        Color: Yup.string()
            .matches(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color code')
            .required('Color is required'),
    });
    const formik = useFormik({
        initialValues: { CatBudget: '', Percentage: '', Color: '#3A4156' },
        validationSchema: validationSchemaStep,
        onSubmit: (values) => {
            console.log(values);
            nextStep();
        }
    });
    return(
        <form className={`d-flex flex-column gap_24px shadow_m3Light rounded_18px pt_18px px_24px pb_24px`}
            onSubmit={formik.handleSubmit}>
            <div className="step-indicators flex_center">
                <div className={`step active`}></div>
                <div className={`step active`}></div>
                <div className={`step`}></div>
            </div>
            <h6 className='c_darkBlue mb_12px text-center'>
                Split your budget?
            </h6>
            <div className='input_group w-100 d-flex gap_18px'>
                <FormField moreInpClass='p_12px' name='Color' type='Color' autoComplete={'Color'} formik={formik} val={'Color'}></FormField>
                <FormField moreClass='w-100' name='CatBudget' type='text' placeholder='Category of the Budget*' autoComplete={'CatBudget'} formik={formik}></FormField>
                <FormField moreClass='w-100' name='Percentage' type='Percentage' placeholder='What % of the total budget?*' autoComplete={'Percentage'}formik={formik}></FormField>
            </div>
            <button
                type='submit'
                className='default_btn ms-auto shadow_on_state bg_main c_light rounded_12px h6 flex_center gap_12px w_fit px-5 transition_default'>
                {`Next`}
            </button>
        </form>
    );
  };
  
  // Step 3 
  const Step3 = ({ formData }) => {
    const navigate = useNavigate();
    const validationSchemaStep = Yup.object({
        CatProduct: Yup.string()
            .required('Category of the Product is required'),
    });
    const formik = useFormik({
        initialValues: { CatProduct: '' },
        validationSchema: validationSchemaStep,
        onSubmit: (values) => {
            console.log(values);
  
            setTimeout(() => {
              navigate('/BudgetBuddy/dashboard');
            }, 2400);
        }
    });
    return (
        <form className={`d-flex flex-column gap_24px shadow_m3Light rounded_18px pt_18px px_24px pb_24px`}
            onSubmit={formik.handleSubmit}>
            <div className="step-indicators flex_center">
                <div className={`step active`}></div>
                <div className={`step active`}></div>
                <div className={`step active`}></div>
            </div>
            <h6 className='c_darkBlue mb_12px text-center'>
                Add categories for your usual products.
            </h6>
            <div className='input_group w-100 d-flex gap_18px'>
                <FormField moreClass='w-100' name='CatProduct' type='text' placeholder='Category of the Product*' autoComplete={'CatProduct'} formik={formik}></FormField>
            </div>
            <button
                type='submit'
                className='default_btn ms-auto shadow_on_state bg_main c_light rounded_12px h6 flex_center gap_12px w_fit px-5 transition_default'>
                {`Done`}
            </button>
        </form>
    );
  };
  
export default function Greeting() {
    const dispatch = useDispatch();
    useEffect(() => {
        // display nav in non-auth version on each home render
        dispatch(seUserAuthorized(false));
        // eslint-disable-next-line
    }, []);

    const [formData, setFormData] = useState({}); // To store form data across steps
    // const [step, setStep] = useState(1); // Track the current step

    // const handleStepChange = (newStep) => {
    //     setStep(newStep); // Update the current step when the user navigates
    // };

    return (
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-12 px_24px position-relative mt_36px'>
                    {/* Step Indicator */}
                    {/* <div className="step-indicators position-absolute flex_center">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}></div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`}></div>
                    </div> */}

                    {/* Form */}
                    {/* <StepWizard onStepChange={(e) => handleStepChange(e.activeStep)}> */}
                    <StepWizard>
                        <Step1 setFormData={setFormData} />
                        <Step2 setFormData={setFormData} />
                        <Step3 formData={formData} />
                    </StepWizard>
                </div>
            </div>
        </div>
    );
}