import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa"

const iconSize = 20

const socials = [
    {
        name: "Github",
        url: "https://github.com/WarrenWu4",
        icon: <FaGithub size={iconSize}/>
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/warren-wu4",
        icon: <FaLinkedin size={iconSize}/>
    },
    {
        name: "Twitter",
        url: "https://twitter.com/warrenwu04",
        icon: <FaTwitter size={iconSize}/>
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCiJosbDdPhrP3Rn3hfSBInw",
        icon: <FaYoutube size={iconSize}/>
    }
]

export default function Footer() {
    return (
        <div className="w-full flex justify-between items-center">

            <div className="flex gap-x-3">

                {socials.map((social, index) => {
                    return (
                        <a href={social.url} target="_blank" rel="noopener noreferrer" key={index} aria-label={social.name}>

                            <div className="w-8 h-8 flex justify-center items-center rounded-md bg-black text-white dark:bg-white dark:text-black">

                                    {social.icon}

                            </div>

                        </a>
                    )
                })}

            </div>

            <div className="font-bold text-lg">Made with 💚 by Warren Wu</div>

        </div>
    )
}