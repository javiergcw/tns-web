import { ImagesPath } from '@/app/utils/assetsPath';
import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

const SocialShareButtons = ({ blogUrl }) => {
    return (
        <div className="social-share-buttons-container  border border-gray-300 rounded-lg shadow-sm pt-4 pb-4 m-10">
            <div className="social-share-buttons flex flex-col space-y-4">
                {/* Facebook Button */}
                <div className="flex flex-col items-center">
                    <div className="mb-2 p-2 border border-gray-300  bg-white w-8 h-8 flex items-center justify-center shadow-sm">0</div>
                    <FacebookShareButton url={blogUrl} className="facebook-button text-white px-4 py-2 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-300 ease-in-out">
                        <img src="/images/social_media/facebook.png" alt="Share on Facebook" className="w-4 h-4 mr-2" />
                        Share
                    </FacebookShareButton>
                </div>

                {/* Twitter Button */}
                <div className="flex flex-col items-center">
                    <div className="mb-2 p-2 border border-gray-300  bg-white w-8 h-8 flex items-center justify-center shadow-sm">0</div>
                    <TwitterShareButton url={blogUrl} className="twitter-button text-white px-4 py-2 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-300 ease-in-out">
                        <img src="/images/social_media/gorjeo.png" alt="Share on Twitter" className="w-4 h-4 mr-2" />
                        Share
                    </TwitterShareButton>
                </div>

                {/* LinkedIn Button */}
                <div className="flex flex-col items-center">
                    <div className="mb-2 p-2 border border-gray-300 bg-white w-8 h-8 flex items-center justify-center shadow-sm">0</div>
                    <LinkedinShareButton url={blogUrl} className="linkedin-button text-white px-4 py-2 rounded-md flex items-center justify-center hover:scale-105 transition transform duration-300 ease-in-out">
                        <img src={ImagesPath.linkedin} alt="Share on LinkedIn" className="w-4 h-4 mr-2" />
                        Share
                    </LinkedinShareButton>
                </div>
            </div>
        </div>
    );
};

export default SocialShareButtons;
