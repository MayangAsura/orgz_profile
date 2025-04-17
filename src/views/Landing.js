import React from "react";
import { Link } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import program1 from "../assets/img/1.png";
import program2 from "../assets/img/2.png";
import program3 from "../assets/img/3.png";
import program4 from "../assets/img/4.png";
import backgroundImage from "../assets/img/@rq_al_ayman.png";
// import backgroundImage from '../assets/img/jess.png'
// import backgroundImage2 from '../assets/img/indonesia-bertauhid.jpg'
import backgroundImage2 from "../assets/img/indonesia-bertauhid-Copy.jpg";
import { dataKeunggulan } from "dummyData/dummyData";
import CardKeunggulan from "components/Cards/CardKeunggulan";
import { dataProgram } from "dummyData/dummyData";
import CardProgram from "components/Cards/CardProgram";
import { dummyDataKelasIslam } from "dummyData/dummyData";
import CardKelas from "components/Cards/CardKelas";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative flex items-center content-center justify-center pt-16 pb-32 min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url(" + backgroundImage2 + ")",
            }}
          >
            <span
              id="blackOverlay"
              className="absolute w-full h-full bg-black opacity-75"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
                <div className="pr-12">
                  <h1 className="text-5xl text-white font-semibol">
                    Rumah Qur’an Al Ayman
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Media pembelajaran ilmu syar'i berlandaskan Al Qur'an dan As
                    Sunnah sesuai pemahaman para shahabat yang dikhususkan untuk
                    muslimah dan anak-anak.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-blueGray-200"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 -mt-24 bg-blueGray-200">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-stretch">
              {dataKeunggulan.map((keunggulan, index) => (
                <CardKeunggulan
                  key={index}
                  title={keunggulan.title}
                  description={keunggulan.description}
                  icon={`fas fa-${keunggulan.icon}`}
                  bgColor={`bg-${keunggulan.color}-400`}
                />
              ))}

              {/* <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white bg-red-400 rounded-full shadow-lg">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Pengajar Kompeten</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Para pengajar tahsin dan tahfidz Al-Qur'an serta Rumah Qur’an Al Ayman adalah para pengajar yang kompeten serta memiliki pengalaman mengajar di bidang pengajaran Al-Qur'an. 
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 text-center md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white rounded-full shadow-lg bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Interaktif</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Sistem pembelajaran yang berbasis online dan interaktif langsung antar pengajar dan murid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 pt-6 text-center md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white rounded-full shadow-lg bg-emerald-400">
                      <i className="fas fa-solid fa-headset"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Daurah/Kajian</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Menyelenggarakan dauroh/kajian rutin ilmu syar’i dan ilmu yang bermanfaat untuk ummat.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                <h3 className="items-center mb-2 text-3xl font-semibold leading-normal text-center">
                  Pilihan Program
                </h3>
              </div>
              <div className="flex flex-wrap items-center justify-center">
                {dataProgram.map((program, index) => (
                  <CardProgram
                    image={program.image}
                    title={program.title}
                    description={program.description}
                  />
                ))}
                {/* <div className="w-full px-2 pt-6 text-center lg:pt-12 md:w-5/12">
                  <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                    <img
                      alt="..."
                      src={program1}
                      className="w-full mx-auto align-middle rounded-full rounded-t-lg shadow-lg max-w-200-px"
                    />
                    <h5 className="text-xl font-bold">Tahsin Al Qur'an</h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      get started faster.
                    </p>
                  </div>
                </div>
                <div className="px-2 pt-6 text-center lg:pt-12 md:w-5/12">
                  <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                    <img
                      alt="..."
                      src={program2}
                      className="w-full mx-auto align-middle rounded-full rounded-t-lg shadow-lg max-w-200-px"
                    />
                    <h5 className="text-xl font-bold">Tahfidz Al Qur'an</h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      get started faster.
                    </p>
                  </div>
                </div>
                <div className="w-full px-2 pt-6 text-center lg:pt-12 md:w-5/12">
                  <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                    <img
                      alt="..."
                      src={program3}
                      className="w-full mx-auto align-middle rounded-full rounded-t-lg shadow-lg max-w-200-px"
                    />
                    <h5 className="text-xl font-bold">Kelas Bahasa Arab</h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      get started faster.
                    </p>
                  </div>
                </div>

                <div className="w-full px-2 pt-6 text-center lg:pt-12 md:w-5/12">
                  <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                    <img
                      alt="..."
                      src={program4}
                      className="w-full mx-auto align-middle rounded-full rounded-t-lg shadow-lg max-w-200-px"
                    />
                    <h5 className="text-xl font-bold">
                      Dauroh/kajian rutin ilmu syar’i
                    </h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      gdbet started faster. You can change the text and images
                      and you're good to go.
                    </p>
                  </div>
                </div> */}
              </div>
              {/* <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-blueGray-600">
                  Don't let your uses guess by attaching tooltips and popoves to
                  any element. Just make sure you enable them first via
                  JavaScript.
                </p>
                <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-blueGray-600">
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go. Just make sure you enable them first via
                  JavaScript.
                </p>
                <Link to="/" className="mt-8 font-bold text-blueGray-700">
                  Check Notus React!
                </Link> */}

              {/* <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 block w-full h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="fill-current text-lightBlue-500"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="mt-2 font-light text-white text-md">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </p>
                  </blockquote>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center">
              {/* <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div> */}
              <div className="items-center justify-center w-full px-4 ml-auto mr-auto md:w-12/12">
                <div className="items-center md:pr-12">
                  {/* <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center rounded-full shadow-lg text-lightBlue-600 bg-lightBlue-300">
                    <i className="text-xl fas fa-rocket"></i>
                  </div> */}
                  <h3 className="items-center text-3xl font-semibold text-center">
                    Pilihan Kelas
                  </h3>
                </div>
                <div className="items-center md:pr-12">
                  <h4 className="mt-4 text-lg leading-relaxed text-center text-blueGray-500">
                    Remaja / Dewasa
                  </h4>
                  <div className="flex flex-wrap">
                    {dummyDataKelasIslam.map((kelas, index) => (
                      <CardKelas
                        title={kelas.title}
                        description={kelas.description}
                        onClick={kelas.onClick}
                      />
                    ))}
                    {/* <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                        <h5 className="text-xl font-bold">
                          Tilawah dan Tadabbur Al Qur'an
                        </h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
                          Chat Admin
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                        <h5 className="text-xl font-bold">
                          Tadrib & Ahkam Tajwid
                        </h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
                          Chat Admin
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                        <h5 className="text-xl font-bold">Aisar</h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
                          Chat Admin
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                        <h5 className="text-xl font-bold">
                          Dauroh/kajian rutin ilmu syar’i
                        </h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
                          Chat Admin
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                        <h5 className="text-xl font-bold">
                          Dauroh/kajian rutin ilmu syar’i
                        </h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
                          Chat Admin
                        </button>
                      </div>
                    </div>
                    <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
                      <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                        <h5 className="text-xl font-bold">
                          Tilawah dan Tadabbur Al Qur'an
                        </h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
                          Chat Admin
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* <ul className="mt-6 list-none">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-lightBlue-600 bg-lightBlue-200">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-lightBlue-600 bg-lightBlue-200">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-lightBlue-600 bg-lightBlue-200">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul> */}
              </div>
            </div>
          </div>
        </section>

        {/* <section className="pt-20 pb-48">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center mb-24 text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold">Testimoni</h2>
                <p className="m-4 text-lg leading-relaxed text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-3-800x800.jpg").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Alexa Smith</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-blueGray-700 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-blueGray-700 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="relative block pb-20 bg-blueGray-800">
          <div
            className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-blueGray-800"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center mb-24 text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold text-white">Testimoni</h2>
                <p className="m-4 text-lg leading-relaxed text-blueGray-400">
                  Cerita mereka tentang RQA
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6 ">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-3-800x800.jpg").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Alexa Smith</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-blueGray-700 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="mx-auto rounded-full shadow-lg max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm font-semibold uppercase text-blueGray-400">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-blueGray-700 focus:outline-none"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap justify-center text-center">
              <div className="w-full px-4 lg:w-6/12">
                <h2 className="text-4xl font-semibold text-white">
                  Build something
                </h2>
                <p className="mt-4 mb-4 text-lg leading-relaxed text-blueGray-400">
                  Put the potentially record low maximum sea ice extent tihs
                  year down to low ice. According to the National Oceanic and
                  Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mt-12">
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 bg-white rounded-full shadow-lg text-blueGray-800">
                  <i className="text-xl fas fa-medal"></i>
                </div>
                <h6 className="mt-5 text-xl font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 bg-white rounded-full shadow-lg text-blueGray-800">
                  <i className="text-xl fas fa-poll"></i>
                </div>
                <h5 className="mt-5 text-xl font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full px-4 text-center lg:w-3/12">
                <div className="inline-flex items-center justify-center w-12 h-12 p-3 bg-white rounded-full shadow-lg text-blueGray-800">
                  <i className="text-xl fas fa-lightbulb"></i>
                </div>
                <h5 className="mt-5 text-xl font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div> */}
        </section>
        {/* <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center -mt-48 lg:-mt-64">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-lg shadow-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="mt-1 mb-4 leading-relaxed text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mt-8 mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="w-full px-3 py-3 text-sm bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-blueGray-800 active:bg-blueGray-600 hover:shadow-lg focus:outline-none"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
