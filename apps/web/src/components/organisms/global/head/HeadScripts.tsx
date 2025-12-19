import { GoogleTagManager } from '@next/third-parties/google';

const HeadScripts = () => {
    return (
        <>
            <GoogleTagManager gtmId="GTM-test1234" />
        </>
    );
};

export default HeadScripts;
