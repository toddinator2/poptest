import React from 'react';
import './page.css';
import Link from 'next/link';
import Image from 'next/image';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Button from '@/components/global/forms/buttons/Button';
import icoMemberPts from '@/assets/images/hmpgIcoPts.png';
import couple from '@/assets/images/lmPtsCouple.png';
import pregnant from '@/assets/images/lmPtsPregnant.png';

export default function SubscriberLearnMorePage() {
	return (
		<PageTemplate>
			<div className='pbpgSection pb-4'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberPts} alt='Subscribers' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>For Patients</div>
						</div>
					</div>
					<div className='row'>
						<div className='pbColSides mb-4 mb-lg-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-end'>
									<Image className='pbColImg blu' src={couple} alt='Patients' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='pbpgText pe-lg-3'>
								<p>
									<strong>Allow SUPERNOVA3X to help you find Professional Healthcare Physicians.</strong> You deserve access to a broader range of doctors and medical
									services at lower prices. Start experiencing the real value in healthcare today.
								</p>
								<p>
									You deserve Physician Supervised Healthcare, and it begins with a SUPERNOVA3X Licensed physician. Experience Professional Healthcare and start living a
									healthier lifestyle today.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 px-3 px-lg-5'>
							<div className='pbpgHdng'>Lower Prices. More Services. Extra time with the doc.</div>
						</div>
					</div>
					<div className='row'>
						<div className='pbColSides'>
							<div className='pbpgText'>
								<strong>Full Service</strong>
								<ul>
									<li className='pbpgText'>In-office and Virtual Visits</li>
									<li className='pbpgText'>Diagnostic and Lab Testing</li>
									<li className='pbpgText'>Injections and Procedures</li>
									<li className='pbpgText'>In-house Pharmacy</li>
									<li className='pbpgText'>Much, much more</li>
								</ul>
							</div>
							<div className='pbpgText'>
								<strong>Multiple Membership Options</strong>
								<ul>
									<li className='pbpgText'>Basic, Custom, and Optional</li>
								</ul>
							</div>
							<div className='pbpgText'>
								<strong>Corporate Sponsorship</strong>
								<ul>
									<li className='pbpgText'>
										Talk to your employer or let us do the talking for you. Fill out the Sponsor Contact Form on the{' '}
										<Link className='inlineLink' href='/subscribers/register'>
											Registration Page
										</Link>{' '}
										and we&apos;ll make the call for you.
									</li>
								</ul>
							</div>
							<div className='pbpgText'>
								<strong>Private Sponsorship</strong>
								<ul>
									<li className='pbpgText'>Affordably Sponsor yourself, family, church, or others in need of affordable physician led healthcare.</li>
								</ul>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='pbpgText'>
								<strong>Patient Experience</strong>
								<ul>
									<li className='pbpgText'>On Time Appointments</li>
									<li className='pbpgText'>More Time Appointments</li>
									<li className='pbpgText'>Cross Trained Medical Teams</li>
									<li className='pbpgText'>No complexity, confusion, or secrets</li>
								</ul>
							</div>
							<div className='pbpgText'>
								<strong>Easy Registration</strong>
								<ul>
									<li className='pbpgText'>Complete, thorough, and shareable in the SPHERE.</li>
								</ul>
							</div>
							<div className='pbpgText'>
								<strong>The Subscriber Sphere</strong>
								<ul>
									<li className='pbpgText'>Virtual Healthcare Appointments</li>
									<li className='pbpgText'>Access your medical history and payment history</li>
									<li className='pbpgText'>Schedule appointment&apos;s</li>
									<li className='pbpgText'>Request refills</li>
									<li className='pbpgText'>Message your doc and medical teams</li>
								</ul>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='col-12 ps-4 d-flex justify-content-center'>
								<div className='pbpgText'>
									Register to find your SUPERNOVA3X Licensed doctor. Have a doctor already? Fill out the Doctor Contact Form on the{' '}
									<Link className='inlineLink' href='/subscribers/register'>
										Registration Page
									</Link>{' '}
									and we&apos;ll make the call for you.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 px-3 px-lg-5'>
							<div className='pbpgHdng'>The Future of Your Healthcare</div>
						</div>
					</div>
					<div className='row'>
						<div className='pbColSides mb-4 mb-lg-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-end'>
									<Image className='pbColImg blu' src={pregnant} alt='Patients' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='pbpgText pe-lg-3'>
								<p>
									<strong>The digital hub</strong> for convenient and secure medical record storage and much more. Subscribers can simply log in to their Private SPHERE and
									access their entire medical history with ease. Free Storage for allergy, prescription, lab, diagnostic, imaging, procedure, visits, financial history and
									more. Share with doctors, medical teams and emergency responders. Also, schedule visits, review instructions, order refills and see up coming
									appointments.
								</p>
								<strong>Best of all The Subscriber SPHERE is Free! Free! Free!</strong>
								<ul>
									<li className='pbpgText'>Virtual Visit Login</li>
									<li className='pbpgText'>Schedule Appointment</li>
									<li className='pbpgText'>Order Refill</li>
									<li className='pbpgText'>Send Message</li>
									<li className='pbpgText'>Review & Download Your Medical Records</li>
									<li className='pbpgText'>View Payment History</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-10 offset-1 d-flex justify-content-center'>
							<div className='pbpgText center'>
								Get your SUPERNOVA3X <strong>FREE Lifetime</strong> Subscription now!
							</div>
						</div>
					</div>
					<div className='row mt-4 d-flex justify-content-center'>
						<div className='col-12 col-sm-auto d-flex justify-content-center'>
							<Link className='me-0 me-sm-3 mb-3 mb-sm-0' href='/subscribers/register'>
								<Button border='0000FF'>Register Now</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
