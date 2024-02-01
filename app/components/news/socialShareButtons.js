import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

const SocialShareButtons = ({ blogUrl }) => {
    return (
        <div className="social-share-buttons flex flex-col space-y-2">
            <div className="social-share-button">
                <FacebookShareButton url={blogUrl} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
                    <img src="/assets/social_media/facebook.png" alt="Compartir en Facebook" className="w-6 h-6 mr-2" />
                    Compartir en Facebook
                </FacebookShareButton>
            </div>
            <div className="social-share-button">
                <TwitterShareButton url={blogUrl} className="bg-blue-400 text-white px-4 py-2 rounded-md flex items-center justify-center">
                    <img src="/assets/social_media/gorjeo.png" alt="Compartir en Twitter" className="w-6 h-6 mr-2" />
                    Compartir en Twitter
                </TwitterShareButton>
            </div>
            <div className="social-share-button">
                <LinkedinShareButton url={blogUrl} className="bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center">
                    <img src="/assets/social_media/linkedin.png" alt="Compartir en LinkedIn" className="w-6 h-6 mr-2" />
                    Compartir en LinkedIn
                </LinkedinShareButton>
            </div>
        </div>
    );
};

export default SocialShareButtons;
