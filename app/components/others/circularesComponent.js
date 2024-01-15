import React from 'react'

export default function CircularesComponent({ enlaces }) {
    return (
        <div className="flex flex-col items-center justify-center">
            {enlaces.map((enlace, index) => (
                <React.Fragment key={index}>
                    <br />
                    <a href={enlace.href} target="_blank">
                        <img className="size-full wp-image aligncenter" src={enlace.src} alt={enlace.alt} width="782" height="142"
                        /></a>
                    <br />
                </React.Fragment>
            ))}
        </div>
    )
}