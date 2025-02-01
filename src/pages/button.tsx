import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BouncyButton: React.FC = () => {
    return (
        <Link href="http://livebuy.in/" target="_blank" className="button-wrapper relative">
            {/* Black "shadow" div */}
            <div
                className="button-shadow absolute inset-0 rounded-full bg-black border-[2px] border-white"
                style={{
                    width: '170px',
                    height: '55px',
                    top: '10px', // Offset to simulate shadow
                    left: '10px',
                }}
            ></div>

            {/* Button */}
            <button className="button-content relative flex items-center justify-center rounded-full border-[2.5px] border-black bg-[#ff0000] transition-transform duration-300">
                <div
                    className="flex items-center justify-center rounded-full border-[2px] border-white"
                    style={{
                        width: '170px',
                        height: '55px',
                    }}
                >
                    <Image
                        src="/logo.svg"
                        alt="Icon"
                        width={90}
                        height={70}
                        className="mr-2"
                    />

                </div>
            </button>
        </Link>
    )
}

export default BouncyButton
