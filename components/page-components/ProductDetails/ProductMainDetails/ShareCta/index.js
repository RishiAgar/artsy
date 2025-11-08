
'use client';

import Share from './Share';
import CopyLink from './CopyLink';

const ShateCta = ({ title, description }) => {
    
    return (
        <div className="flex flex-wrap justify-end gap-2">
            <CopyLink />

            <Share title={title} description={description} />
        </div>
    );
}

export default ShateCta;
