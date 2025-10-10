import{ useEffect}  from 'react';
export default function useChangeOnResize(func) {
    useEffect(() => {
        func();
        // update also on resize
        window.addEventListener('resize', func);
        return () => {
            window.removeEventListener('resize', func);
        };
    // eslint-disable-next-line
    }, []);
}