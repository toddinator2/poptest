'use client';
import React from 'react';
import './page.css';
import Link from 'next/link';
import Image from 'next/image';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Button from '@/components/global/forms/buttons/Button';
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';
import start from '@/assets/images/lmPhyStart.png';
import logo from '@/assets/images/logoCircle.png';

export default function PhyLearnMore() {
	return (
		<PageTemplate>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberPhy} alt='Physicians' />
					</div>
					<div className='mb-5 text-2xl lg:text-3xl flex justify-center'>For Physicians</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full lg:2/5 lg:pe-7'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtred'>Take Control of your Career, Clinic, and Finances with SN3X</div>
							<div className='text-left text-sm xl:text-base'>
								<div className='mb-2'>
									Managing healthcare and clinic operations can be challenging, but with SN3X, it has become easier and more affordable than
									ever before. SN3X offers an advanced Electronic Medical Record (EMR) system that uses Golden Ratio Design and automation to
									simplify charting and clinic operations.
								</div>
								<div className='mb-5'>
									The SN3X NOVA SPHERE is for managing finances, viewing reports, setting up services and prices, communications with other
									SN3X licensed physicians, and more.
								</div>
							</div>
						</div>
						<div className='w-3/5 lg:1/5 mx-auto'>
							<div className='w-full flex-auto'>
								<div className='w-full mb-5 py-3 border-4 flex-auto border-drkred rounded-3xl'>
									<div className='w-full mb-4 text-center font-semibold text-3xl'>up to</div>
									<div className='w-full text-center font-semibold text-7xl'>50%</div>
									<div className='w-full mb-4 text-center font-semibold text-5xl'>Less</div>
									<div className='w-full mb-1 text-center font-semibold text-3xl'>Total</div>
									<div className='w-full mb-1 text-center font-semibold text-3xl'>Operational</div>
									<div className='w-full text-center font-semibold text-3xl'>Costs</div>
								</div>
								<div className='w-full mb-5 py-3 border-4 flex-auto border-drkred rounded-3xl'>
									<div className='w-full mb-4 text-center font-semibold text-3xl'>up to</div>
									<div className='w-full text-center font-semibold text-7xl'>100%</div>
									<div className='w-full mb-4 text-center font-semibold text-5xl'>Less</div>
									<div className='w-full mb-1 text-center font-semibold text-3xl'>Red Tape,</div>
									<div className='w-full mb-1 text-center font-semibold text-3xl'>Confusion,</div>
									<div className='w-full mb-1 text-center font-semibold text-3xl'>&amp;</div>
									<div className='w-full text-center font-semibold text-3xl'>Interference</div>
								</div>
							</div>
						</div>
						<div className='w-full lg:2/5 lg:ps-7'>
							<div className='mb-2 mt-5 lg:mt-0 text-xl lg:text-2xl text-center text-lgtred'>
								With SN3X Professional Healthcare Meets Retail Simplicity
							</div>
							<div className='ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>The affordable all-in-one solution for medical, clinic, and business operations</li>
									<li>Use on any device, anytime, from anywhere</li>
									<li>Save time</li>
									<li>Lower costs</li>
									<li>Build your clinic</li>
									<li>Leave a legacy</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image
								className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry'
								src={start}
								priority={true}
								alt='Physician Quick Start'
							/>
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtred'>
								SN3X&apos;s Quick Start can help you quickly start new or transition your existing business
							</div>
							<div className='ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Affordable &amp; Automated</li>
									<li>Innovative &amp; Intelligent</li>
									<li>Simple Set-up &amp; Training</li>
									<li>Free Technical Support</li>
									<li>Coming soon to the Apple Store and Google Play</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='mb-7 text-2xl lg:text-3xl 2xl:text-4xl text-center'>
						Hey Doc, shoot for the stars with Professional Healthcare powered by SUPERNOVA3x
					</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full lg:2/5 lg:pe-7'>
							<div className='mb-2 text-xl lg:text-2xl text-lgtred'>Stakeholder Model</div>
							<div className='mb-5 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Low-cost High Value Business</li>
									<li>Total Financial Control</li>
									<li>Prepaid Revenue</li>
									<li>Easy Management</li>
									<li>Good for Mind, Body, &amp; Soul</li>
								</ul>
							</div>
							<div className='mb-2 text-xl lg:text-2xl text-lgtred'>Start Planning for:</div>
							<div className='mb-5 lg:mb-0 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Retirement</li>
									<li>Family &amp; Leisure Time</li>
									<li>Hobbies</li>
									<li>Community &amp; Leadership</li>
									<li>Mentorship</li>
									<li>Success &amp; Legacy</li>
									<li>Charitable &amp; Church Giving</li>
								</ul>
							</div>
						</div>
						<div className='w-full lg:1/5'>
							<div className='w-full flex justify-center'>
								<Image className='w-52 max-w-full h-auto' src={logo} alt='Supernova3x' />
							</div>
						</div>
						<div className='w-full lg:2/5 lg:ps-7'>
							<div className='mb-2 mt-5 lg:mt-0 text-xl lg:text-2xl text-lgtred'>Regulator Model</div>
							<div className='ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>High-cost No Value Business</li>
									<li>No Financial Control</li>
									<li>Expensive &amp; Complex Payment</li>
									<li>Unreasonable to Manage</li>
									<li>Soul Crushing Red Tape</li>
								</ul>
							</div>
							<div className='mb-2 mt-5 text-xl lg:text-2xl text-lgtred'>Say Goodbye to:</div>
							<div className='ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Interference of Business and non-negotiable contracts</li>
									<li>Billing, coding, claim scrubbing, clearing houses, denials, rejections, resubmittals, and collections</li>
									<li>Co-pay&apos;s, deductibles, credentialing, and prior authorizations</li>
									<li>
										ACO&apos;s, CMS, ERA, EOB, EOP, HCPCS, HEDIS, HIPPA, HMO&apos;s, ICD-10, MIPs, Metrics, PBM&apos;s, PPO&apos;s, RVU, and
										WHO
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full lg:w-1/2 lg:pe-7 2xl:ps-9'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtred'>Upgrade Now to Professional Healthcare</div>
							<div className='w-full mb-5 flex justify-center'>
								<Image className='max-h-28 lg:max-h-40 w-auto' src={logo} alt='Supernova3x' />
							</div>
							<div className='text-left text-sm lg:text-base'>
								<div className='mb-5'>
									Early adopter support, in return, gives SN3X&apos;s lowest price ever and our most valuable features to help run your New
									Professional Healthcare Company.
								</div>
								<div className='mb-5 lg:mb-0'>
									Early onboarding guarantees Free automatic upgrades as we rapidly deploy new features. We are committed to improving the
									lives of doctors and the patient population. We appreciate your Early Adopter support.
								</div>
							</div>
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7'>
							<div className='w-full mx-auto px-7 py-5 flex-auto rounded-3xl border-4 border-drkgry'>
								<div className='w-full mb-4 text-center font-semibold text-xl'>Special Offer &ndash; Early Adopter</div>
								<div className='w-full mb-4 text-center font-semibold text-3xl'>Get Licensed for</div>
								<div className='w-full text-center font-semibold text-7xl'>
									$199<sup>99</sup>
									<span className='text-2xl'>/mo</span>
								</div>
								<div className='w-full mb-4 text-center font-semibold text-sm'>*Offer for a limited time only!</div>
								<div className='w-full mb-2 text-center font-semibold text-sm'>
									Special Monthly Offer includes one provider at NO additional cost
								</div>
								<div className='w-full mb-2 text-center font-semibold text-xl'>$499.99 MSRP &ndash; Monthly Savings of $300.00</div>
								<div className='w-full mb-2 text-center font-semibold text-sm'>1-year Supernova3x Licensee Agreement Required</div>
								<div className='w-full mb-2 text-center font-semibold text-sm'>Additional Providers $99.99 per month</div>
								<div className='w-full mb-2 text-center font-semibold text-sm'>Hurry! Prices will increase as features continue to go live</div>
								<div className='w-full mb-2 text-center font-semibold text-sm'>Lock in this special offer now! ACH Required</div>
							</div>
						</div>
					</div>
					<div className='w-full mt-4 flex justify-center'>
						<Link href='/physicians/register'>
							<Button type='button'>Register Now</Button>
						</Link>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
