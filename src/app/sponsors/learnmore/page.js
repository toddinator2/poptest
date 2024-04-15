import React from 'react';
import './page.css';
import Link from 'next/link';
import Image from 'next/image';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Button from '@/components/global/forms/buttons/Button';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';
import couple from '@/assets/images/lmEmpCouple.png';

export default function SponsorLearnMorePage() {
	return (
		<PageTemplate>
			<div className='pbpgSection pb-4'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberEmp} alt='Sponsors' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng center'>For Sponsors</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-10 offset-1'>
							<div className='pbpgHdng'>Happier, Healthier Employees.</div>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col-12 px-3 px-xl-5 d-flex justify-content-center'>
							<ul>
								<li className='pbpgText'>Affordable programs and low-cost medical services</li>
								<li className='pbpgText'>Basic and Custom Plans</li>
								<li className='pbpgText'>On-time and never rushed Appointments</li>
								<li className='pbpgText'>In-house Pharmacy and Prescription Plans</li>
								<li className='pbpgText'>Life-time Sponsor Roster (The Sphere)</li>
								<li className='pbpgText'>Offices are independently owned and operated</li>
								<li className='pbpgText'>Terms and Conditions may vary</li>
							</ul>
						</div>
					</div>
					<div className='row mb-1'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='spnLMSubHdng'>SUPERNOVA3X Sponsor Registration is Free!</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='pbColSides mb-4 mb-lg-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-end'>
									<Image className='pbColImg blu' src={couple} alt='Couple' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='spnLMSubHdng ppl mb-1'>Better healthcare, better prices for American Healthcare&apos;s Original Stakeholders Only</div>
							<div className='pbpgText pe-lg-3 mb-4'>
								<p>
									<strong>Save time and money</strong> when using <strong>SUPERNOVA3X Digital Finance</strong> to manage Membership Options, Employee Roster, View reports
									and make Payments.
								</p>
								<p>
									<strong>The easiest benefit management system</strong> is at your fingertips. Freely activate, deactivate or update your Employee Roster and make payments
									in just a few clicks.
								</p>
								<p>
									<strong>Best of all, Registration in SUPERNOVA3X is Free.</strong>{' '}
									<Link className='inlineLink' href='/sponsors/register'>
										Register Here
									</Link>
								</p>
							</div>
							<div className='spnLMSubHdng ppl mb-1'>Welcome to the Sponsor Sphere</div>
							<div className='pbpgText'>
								<strong>Negotiate Agreements in the SUPERNOVA3X Marketplace:</strong>
								<ul>
									<li className='pbpgText'>Physician</li>
									<li className='pbpgText'>Specialist</li>
									<li className='pbpgText'>Hospital/Surgical</li>
									<li className='pbpgText'>Pharmacy</li>
									<li className='pbpgText'>Labs</li>
									<li className='pbpgText'>Imaging</li>
								</ul>
							</div>
							<div className='pbpgText'>
								<strong>Unlimited Access to SUPERNOVA3X Finance:</strong>
								<ul>
									<li className='pbpgText'>Company Roster</li>
									<li className='pbpgText'>Membership Options</li>
									<li className='pbpgText'>Payment History</li>
									<li className='pbpgText'>Service Value Reports</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='row mt-4 d-flex justify-content-center'>
						<div className='col-12 col-sm-auto d-flex justify-content-center'>
							<Link className='me-0 me-sm-3 mb-3 mb-sm-0' href='/sponsors/register'>
								<Button border='8000ff'>Register Now</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
