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
import price from '@/assets/images/lmPhyPrice.png';

export default function PhyLearnMore() {
	return (
		<PageTemplate>
			<div className='pbpgSection pb-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberPhy} alt='Physicians' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng center'>For Physicians</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='pbpgSubHdng red mb-3'>Take Control of your Career, Clinic, and Finances with SN3X</div>
							<div className='pbpgText'>
								<p>
									Managing healthcare and clinic operations can be challenging, but with SN3X, it has become easier and more affordable than
									ever before. SN3X offers an advanced Electronic Medical Record (EMR) system that uses Golden Ratio Design and automation to
									simplify charting and clinic operations.
								</p>
								<p>
									The SN3X NOVA SPHERE is for managing finances, viewing reports, setting up services and prices, communications with other
									SN3X licensed physicians, and more.
								</p>
							</div>
						</div>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='row'>
								<div className='phyPreRegCenterDiv col-10 col-sm-8 col-md-4 col-xl-8 offset-1 offset-sm-2 offset-md-4 offset-xl-2 mb-3'>
									<div className='phyPreRegMidTextSm'>
										up to
										<br />
										<br />
										<span className='phyPreRegMidTextLg'>
											50%
											<br />
											Less
										</span>
										<br />
										<br />
										Total
										<br />
										Operational
										<br />
										Costs
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='phyPreRegCenterDiv col-10 col-sm-8 col-md-4 col-xl-8 offset-1 offset-sm-2 offset-md-4 offset-xl-2 mb-2 mb-md-0'>
									<div className='phyPreRegMidTextSm'>
										up to
										<br />
										<br />
										<span className='phyPreRegMidTextLg'>
											100%
											<br />
											Less
										</span>
										<br />
										<br />
										Red Tape,
										<br />
										Confusion,
										<br />&<br />
										Interference
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='pbpgSubHdng red mb-3'>With SN3X Professional Healthcare Meets Retail Simplicity</div>
							<div className='pbpgText'>
								<ul>
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
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='pbColSides mb-3 mb-md-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center'>
									<Image className='pbColImg' src={start} alt='Physician Quick Start' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='pbpgSubHdng red mb-3'>
								SN3X&apos;s Quick Start can help you quickly start new or transition your existing business
							</div>
							<div className='pbpgText'>
								<ul>
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
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='pbpgHdng mb-4'>Hey Doc, shoot for the stars with Professional Healthcare powered by SUPERNOVA3x</div>
					<div className='row'>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='pbpgSubHdng start red mb-2'>Stakeholder Model</div>
							<div className='pbpgText mb-3 ps-3'>
								<ul>
									<li>Low-cost High Value Business</li>
									<li>Total Financial Control</li>
									<li>Prepaid Revenue</li>
									<li>Easy Management</li>
									<li>Good for Mind, Body, &amp; Soul</li>
								</ul>
							</div>
							<div className='pbpgSubHdng start red mb-2'>Start Planning for:</div>
							<div className='pbpgText ps-3'>
								<ul>
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
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='d-flex justify-content-center'>
								<Image className='centerLogo' src={logo} alt='Supernova3x' />
							</div>
						</div>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='pbpgSubHdng start red mb-2'>Regulator Model</div>
							<div className='pbpgText mb-3 ps-3'>
								<ul>
									<li>High-cost No Value Business</li>
									<li>No Financial Control</li>
									<li>Expensive &amp; Complex Payment</li>
									<li>Unreasonable to Manage</li>
									<li>Soul Crushing Red Tape</li>
								</ul>
							</div>
							<div className='pbpgSubHdng start red mb-2'>Say Goodbye to:</div>
							<div className='pbpgText ps-3'>
								<ul>
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
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='pbColSides mb-3 mb-md-0'>
							<div className='pbpgSubHdng red mb-3'>Upgrade Now to Professional Healthcare</div>
							<div className='row mb-3'>
								<div className='col-12 d-flex justify-content-center'>
									<Image className='centerLogoSm' src={logo} alt='Supernova3x' />
								</div>
							</div>
							<div className='pbpgText'>
								<p>
									Early adopter support, in return, gives SN3X&apos;s lowest price ever and our most valuable features to help run your New
									Professional Healthcare Company.
								</p>
								<p>
									Early onboarding guarantees Free automatic upgrades as we rapidly deploy new features. We are committed to improving the
									lives of doctors and the patient population. We appreciate your Early Adopter support.
								</p>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='divBorder py-3'>
								<div className='row'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='pbpgSubHdng red mb-3'>Special Offer - Early Adopter</div>
									</div>
								</div>
								<div className='row mb-4'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='pbpgHdng'>Get Licensed for</div>
									</div>
								</div>
								<div className='row mb-4'>
									<div className='col-12 d-flex justify-content-center'>
										<Image className='phyPreRegLogo' src={price} alt='$199.99/mo' />
									</div>
								</div>
								<div className='row mb-1'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='phyPreRegPriceTextSm'>Special Monthly Offer includes one provider at NO additional cost</div>
									</div>
								</div>
								<div className='row mb-2'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='phyPreRegPriceTextLg'>$499.99 MSRP &ndash; Monthly Savings of $300.00</div>
									</div>
								</div>
								<div className='row mb-2'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='phyPreRegPriceTextSm'>1-year Supernova3x Licensee Agreement Required</div>
									</div>
								</div>
								<div className='row mb-2'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='phyPreRegPriceTextSm'>Hurry! Prices will increase as features continue to go live.</div>
									</div>
								</div>
								<div className='row mb-1'>
									<div className='col-12 px-5 d-flex justify-content-center'>
										<div className='phyPreRegPriceTextSm'>Lock in this special offer now! ACH Required.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-12 d-flex justify-content-center'>
							<Link href='/physicians/register'>
								<Button border='ff0000'>Register Now</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
