// Footer component for the website
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div className="h-2 w-full bg-zinc-800"></div>   {/* Separator Component */}

            <footer className="text-center text-xl text-white  bg-black py-6 md:px-8 " >
                <p className="">&copy; 2024 ShoobFlix. All Rights Reserved | Made by <a className="hover:underline" href="https://github.com/5h0ov" target="_blank"> Shuvadipta Das </a> </p>
                <div className="social-icons flex justify-center mt-2">
                    <ul className="flex justify-between space-x-4">
                        <li>
                            <a target="_blank" href="mailto:shuvadiptadas8820@gmail.com" className="group" aria-label="Email Adress">
                                <CgMail className="text-white border-2 border-white rounded-full w-8 h-8 flex items-center justify-center transition duration-300 ease-in group-hover:text-gray-100 group-hover:border-gray-100 group-hover:bg-red-600" />
                            </a>
                        </li>
                        <li className="group relative">
                            <a target="_blank" href="https://www.instagram.com/its_shuvadipta/" className="relative z-10 flex items-center justify-center w-8 h-8 text-white border-2 border-white rounded-full" aria-label="Instagram Profile">
                                <FaInstagram />
                            </a>
                            <span className="absolute inset-0 z-0 transition duration-300 ease-out bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100"></span>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.linkedin.com/in/shuvadipta-das-915b28216/" className="group">
                                <FaLinkedin className="text-white border-2 border-white rounded-full w-8 h-8  items-center justify-center transition duration-300 ease-in group-hover:text-gray-100 group-hover:border-gray-100 group-hover:bg-blue-600" aria-label="Linkedin Profile" />
                            </a>
                        </li>

                        <li>
                            <a target="_blank" href="https://github.com/5h0ov" className="group">
                                <FaGithub className="text-white border-2 border-white rounded-full w-8 h-8  items-center justify-center transition duration-300 ease-in group-hover:text-gray-100 group-hover:border-gray-100 group-hover:bg-gray-600" aria-label="Github Profile"/>
                            </a>
                        </li>
                    </ul>
                </div>

            </footer>
        </div>
    )
}

export default Footer;  