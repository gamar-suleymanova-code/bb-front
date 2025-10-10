import lostInBillsIMG from '../assets/img/home-bg/lost-in-bills.jpg';
import managingIMG from '../assets/img/home-bg/managing.jpg';
import achivementIMG from '../assets/img/home-bg/achivement.jpg';
const calculateDelay = (text) => {
    const baseDuration = 37 * (50 * 2); // Example base duration calculation
    const typeTime = text.length * 50; // 50ms per character
    return baseDuration - 2 * typeTime;
};
const imgs = [
    {
        img: lostInBillsIMG,
        text: 'Do You Feel lost about your spending?',
        highlited: '',
        delay: calculateDelay('Do You Feel lost about your spending?')+ 1000
    },
    {
        img: managingIMG,
        text: 'Manage it with BudgetBuddy,',
        highlited: '',
        delay: calculateDelay('Manage it with BudgetBuddy,')+ 1000
    },
    {
        img: achivementIMG,
        text: 'and Boost your savings!',
        highlited: 'savings!',
        delay: (calculateDelay('and Boost your savings!'))+ 1000
    },
];

export { imgs }