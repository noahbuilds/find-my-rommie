import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

const AboutPage = () => {
    
    return (
        <>
         <NavBar token={localStorage.getItem('token')} />
            <main className="mt-5">
            <img
        src="/assets/banner.png"
        className="img splash"
        alt="main"
      />
                <p className="h2 text-center">About RoommateFinder</p>

                <div className="d-flex justify-content-center mt-5">
                    <section className="text-center col-6" id="about">
                        This Site was inspired by Mr Enoch Daniel a Lecturer in
                        Veritas, and by Alex Mous who was my template and ux
                        inspiration, and was re-created by Jones Gabriel Oladipo
                        as a final year project for Veritas University Abuja.
                        Please contact me through GitHub! my usernames are{' '}
                        <a
                            href="https://github.com/ladipojones/roommie.git"
                            rel=""
                        >
                            @jones-gabriel
                        </a>
                        ,
                    </section>
                </div>
            </main>
        </>
    );
};

export default AboutPage;
