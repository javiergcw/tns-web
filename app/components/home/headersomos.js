import '/app/globals.css'

import React from 'react';

export default function HeaderSomos () {
    return (
        <div
            style={{
                backgroundImage: "url('/images/others/headerazul.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100px'
            }}
        >
            {/* You can add header content here if needed */}
        </div>
    );
};
