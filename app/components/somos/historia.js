import '/app/globals.css';

export default function Historia() {
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
                            The spirit of diversity and inclusion beats at the heart of our institution. Each student is a unique crew member in the vast ocean of knowledge. We set sail on a journey that awakens curiosity, embraces differences, and challenges the limits of convention in the pedagogical dynamics of learning. Children and teenagers enjoy the processes of knowledge at each level of the educational path, from preschool to basic primary, basic secondary, and vocational secondary.
                            <br></br><br />
                            Since its origin in 1995, as an educational institution we set out to accompany children and young people, in strengthening their cognitive potential and in fostering in them their sense of solidarity, their appreciation of respect to leave their mark as citizens of the world and seek to find themselves committed to humanity and the reduction of their impact on the environment, as well as being able to take care of the development of their leadership, their creativity and their entrepreneurial spirit
                            <br></br><br />
                            Guided by a scientific-humanist approach and a curriculum enriched with proposals and projects that contribute to the strengthening of BEING, we transcend toward the autonomy and the relationship with the globality of modernity from their essence so that they understand the importance of taking care not only of themselves but also of their community and the environment that surrounds us.
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
