import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LinksToPageProps {
    title: string,
    href: string,
    iconURL: string,
    id: number
}

const LinksToPage: React.FC<LinksToPageProps> = ({title, href, iconURL, id}) => {

    return (
        <>
            <Link href={href} className="flex flex-col items-center cursor-pointer">
                <li key={id}     className="flex items-center  justify-center h-[50px] w-[50px] rounded-full bg-greenYellow cursor-pointer">
                    <figure className="flex justify-center align-middle">
                        <Image 
                            src={iconURL}
                            width={28}
                            height={28}
                            alt="icon" 
                        />
                    </figure>
                </li>
                <p className="text-sm max-w-min text-center">{title}</p>
            </Link>
        </>
    )
}

export default LinksToPage