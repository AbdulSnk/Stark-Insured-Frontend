import Image from "next/image";
import facebook from "../assests/socialsicon/Vector.svg";
import github from "../assests/socialsicon/mdi_github.svg";
import twitter from "../assests/socialsicon/Component.svg";
import stellar from "../components/logo.png";

export default function Footer() {
    return (
        <footer role="contentinfo" className=" bg-[#101935] pt-15 pb-10 pr-4 pl-4 border-t-2 border-[#94BCCA] text-[#E0D7D7] lg:pl-20 lg:pr-20">
                <div className="max-w-[1200] flex-wrap gap-8 flex flex-col mb-6 md:flex-row lg:flex-nowrap xl:justify-between  xl:flex-nowrap xl:mr-auto xl:ml-auto">
                    <div className="max-w-117.5 md">
                        <Image
                            src={stellar}
                            alt="stellar-logo"
                            className="mb-4.5"
                        />
                        <p className="font-bold text-[17px] mb-4">
                            A decentralized insurance platform built on the
                            StellarNet ecosystem, providing transparent and
                            automated insurance solutions.
                        </p>
                        <div className="flex gap-2 px-6" role="navigation" aria-label="Social media links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                                <Image
                                    src={facebook}
                                    alt="facebook-logo"
                                    className="cursor-pointer filter-[invert(71%)_sepia(5%)_saturate(442%)_hue-rotate(314deg)_brightness(100%)_contrast(84%)]"
                                />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">
                                <Image
                                    src={twitter}
                                    alt="twitter-logo"
                                    className="cursor-pointer filter-[invert(71%)_sepia(5%)_saturate(442%)_hue-rotate(314deg)_brightness(100%)_contrast(84%)]"
                                />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our GitHub repository">
                                <Image
                                    src={github}
                                    alt="github-logo"
                                    className="cursor-pointer filter-[invert(71%)_sepia(5%)_saturate(442%)_hue-rotate(314deg)_brightness(100%)_contrast(84%)]"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-8 flex-col justify-between  md:w-full md:justify-between md:flex-row lg:w-full">
                        <div>
                            <h2 className="mb-4 text-xl font-bold">Products</h2>
                            <ul className="flex flex-col gap-2">
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Health Insurance
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Vehicle Insurance
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Property Insurance
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Travel Insurance
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Crypto-Asset Insurance
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-xl font-bold">Company</h2>
                            <ul className="flex flex-col gap-2">
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    About us
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Teams
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Career
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Blog
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Contact
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-xl font-bold">Legal</h2>
                            <ul className="flex flex-col gap-2">
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Terms
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Privacy Policy
                                </li>
                                <li className="cursor-pointer hover:text-slate-200 ease">
                                    Cookie Policy
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="font-bold text-center border-b-2  border-[#94BCCA] pb-3">
                    &copy; 2025 Stellar Insured. All rights reserved
                </p>
            </footer>
    );
}
