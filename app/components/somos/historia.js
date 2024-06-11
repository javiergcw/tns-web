import '/app/globals.css';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '@/app/store/actions';
import { ENGOurProposal } from '@/app/data/language/english';
import { ESPOurProposal } from '@/app/data/language/spanish';

export default function Historia() {
    const isEnglish = useSelector((state) => state.isEnglish);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="backgroundImagethree">
            <br />
            <div className="contenedor flex justify-center items-center md:mt-[-100px] py-10">
                <div className="flex flex-col md:flex-row max-w-6xl mx-auto items-center gap-8">
                    <div className="md:w-1/2 text-center md:text-left px-4">
                        {/*   <strong>
                            <h1 className="text-4xl text-[#444444] mb-4">Nuestra Historia</h1>
                        </strong> */}
                        <p className="text-[14px]">
                            {isEnglish ? ENGOurProposal.historyp1 : ESPOurProposal.historiap1}
                            <br></br><br />
                            {isEnglish ? ENGOurProposal.historyp2 : ESPOurProposal.historiap2}
                            <br></br><br />
                            {isEnglish ? ENGOurProposal.historyp3 : ESPOurProposal.historiap3 }
                            <br></br>
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center px-4">
                        <img className="w-full h-auto max-w-md mx-auto rounded-lg object-cover shadow-lg"
                            src="/images/about_us/our_proposal/photo4.jpg"
                            alt="Descripción de la imagen">
                        </img>
                    </div>
                </div>
            </div>
        </div>
    );
}
