import React from 'react';
import './page.css';
import Image from 'next/image';
import Link from 'next/link';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Button from '@/components/global/forms/buttons/Button';
import btnSx3 from '@/assets/images/hmpgBtnSx3.png';
import btnGoogle from '@/assets/images/hmpgBtnGoogle.png';
import btnApple from '@/assets/images/hmpgBtnApple.png';
import icoMemberPts from '@/assets/images/hmpgIcoPts.png';
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';
import hmpgLogo from '@/assets/images/logoLgt.png';
import hmpgTablet from '@/assets/images/hmpgTablet.jpg';
import hmpgPts from '@/assets/images/hmpgIcoPts.png';
import hmpgPhy from '@/assets/images/hmpgIcoPhy.png';
import hmpgEmp from '@/assets/images/hmpgIcoEmp.png';
import hmpgMap from '@/assets/images/hmpgMap.png';
import hmpgPatient from '@/assets/images/hmpgPatient.png';
import hmpgPhysician from '@/assets/images/hmpgPhysician.png';
import hmpgEmployer from '@/assets/images/hmpgEmployer.png';
import america from '@/assets/images/america.png';

export default function Home() {
	return (
		<PageTemplate>
			<div className='pbpgSection pb-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 px-3 px-lg-5'>
							<div className='pbpgHdng'>Reuniting American Healthcare&apos;s Original Stakeholders to Restore the System to its Former Glory</div>
						</div>
					</div>
					<div className='row mb-4 d-flex align-items-center'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='pbpgText'>
								<div className='mb-3'>
									Introducing SUPERNOVA3X &ndash; a revolutionary Healthcare Software solution for America&apos;s ailing healthcare system,
									empowering patients, employers, and physicians to take back control once and for all.
								</div>
								<div>
									&quot;The rules have changed. We are bidding farewell to the low-value, high-cost, overregulated system and welcoming
									accessible, affordable healthcare like never before. Come and explore the Professional Healthcare Membership Platform that
									has been specifically designed for American Healthcare&apos;s Original Stakeholders.&quot;
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-start'>
									<Image className='pbColImg' src={hmpgTablet} priority={true} alt='Sample Offices' />
								</div>
							</div>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='hmpgMarketText'>Available online at www.supernova3x.com</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='hmpgMarketText'>Coming soon to the Apple Store and Google Play</div>
						</div>
					</div>
					<div className='row mt-3 d-flex justify-content-center align-items-center'>
						<div className='col-12 col-md-2 me-3 mb-2 mb-md-0 d-flex justify-content-center justify-content-md-end'>
							<Image className='hmpgButton' src={america} alt='Made in America' />
						</div>
						<div className='col-12 col-md-2 mx-2 mb-2 mb-md-0 d-flex justify-content-center'>
							<Image className='hmpgButton' src={btnSx3} alt='POPpc' />
						</div>
						<div className='col-12 col-md-2 mx-2 mb-2 mb-md-0 d-flex justify-content-center'>
							<Image className='hmpgButton' src={btnApple} alt='Apple Store' />
						</div>
						<div className='col-12 col-md-2 mx-2 d-flex justify-content-center'>
							<Image className='hmpgButton' src={btnGoogle} alt='Google Play' />
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='row mb-4'>
					<div className='col-12 px-3 px-xl-5'>
						<div className='pbpgHdng'>Returning Financial Control of Healthcare to the Original Stake Holders</div>
					</div>
				</div>
				<div className='row mb-4 d-flex justify-content-evenly justify-content-xl-center'>
					<div className='finDiv mb-5 mb-xl-0'>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='hmpgIcoControl mb-3' src={hmpgPts} alt='Subscribers' />
							</div>
						</div>
						<div className='finDivBorder p-3'>
							<div className='row'>
								<div className='col-12'>
									<div className='finHdng'>PATIENTS</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12'>
									<div className='finInfoDesc'>(Subscribers)</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12'>
									<div className='finSubHdng'>Up to 80% lower healthcare costs & 500% more medical services.</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-12'>
									<ul>
										<li className='finText'>Free Sign Up & Registration</li>
										<li className='finText'>Physician Led Healthcare</li>
										<li className='finText'>Affordable Memberships</li>
										<li className='finText'>Local Offices</li>
										<li className='finText'>Lifetime Medical Record</li>
										<li className='finText'>The Unlimited Membership:</li>
										<ul>
											<li className='finText'>Office/Virtual Visits</li>
											<li className='finText'>In-House Diagnostics</li>
											<li className='finText'>In-House Pharmacy</li>
											<li className='finText'>Lab Draws</li>
											<li className='finText'>And More</li>
										</ul>
									</ul>
									<br />
								</div>
							</div>
							<div className='row mt-5'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='finInfoText'>
										*Doctor&apos;s offices are independently owned and operated.
										<br />
										Offers may vary.
										<br />
										<br />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='finDiv mb-5 mb-xl-0 mx-xl-5'>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='hmpgIcoControl mb-3' src={hmpgPhy} alt='Physicians' />
							</div>
						</div>
						<div className='finDivBorder p-3'>
							<div className='row'>
								<div className='col-12'>
									<div className='finHdng'>DOCTORS</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12'>
									<div className='finInfoDesc'>(Physicians)</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12'>
									<div className='finSubHdng'>Up to 50% lower operating costs & 100% less red tape</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-12'>
									<ul>
										<li className='finText'>Free Sign Up & Registration</li>
										<li className='finText'>Medical & Business System</li>
										<li className='finText'>Professional Healthcare Model</li>
										<li className='finText'>User Friendly</li>
										<li className='finText'>Automation</li>
										<li className='finText'>Any device, anytime, anywhere</li>
										<li className='finText'>Includes:</li>
										<ul>
											<li className='finText'>Advanced EMR</li>
											<li className='finText'>Financial Center</li>
											<li className='finText'>SN3X Network Directory</li>
											<li className='finText'>Employer Integration</li>
										</ul>
									</ul>
									<br />
								</div>
							</div>
							<div className='row mt-5'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='finInfoText'>
										*Doctor&apos;s offices are independently owned and operated.
										<br />
										Savings may vary.
										<br />
										<br />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='finDiv'>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='hmpgIcoControl mb-3' src={hmpgEmp} alt='Sponsors' />
							</div>
						</div>
						<div className='finDivBorder p-3'>
							<div className='row'>
								<div className='col-12'>
									<div className='finHdng'>EMPLOYERS</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12'>
									<div className='finInfoDesc'>(Sponsors)</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12'>
									<div className='finSubHdng'>Up to 80% lower benefit costs & 100% happier employees.</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-12'>
									<ul>
										<li className='finText'>Free Sign Up & Registration</li>
										<li className='finText'>Integrated Roster Management</li>
										<li className='finText'>Physician Integration</li>
										<li className='finText'>SN3X Network Directory</li>
										<li className='finText'>More:</li>
										<ul>
											<li className='finText'>Network Directory</li>
											<li className='finText'>Prescription Plans</li>
											<li className='finText'>Transparency</li>
											<li className='finText'>No Gimmicks or Surprises</li>
											<li className='finText'>No Failed Expectations</li>
											<li className='finText'>No Premiums to increase</li>
										</ul>
									</ul>
									<br />
								</div>
							</div>
							<div className='row mt-5'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='finInfoText'>
										*Doctor&apos;s offices are independently owned and operated.
										<br />
										Offers may vary.
										<br />
										<br />
									</div>
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
							<div className='pbpgHdng'>Regrouping the Original Stakeholders in the SN3X Professional Healthcare Directory</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='pbColSides d-flex align-items-center'>
							<div className='row d-flex justify-content-center'>
								<div className='col-12 mb-4'>
									<div className='pbpgText center'>
										The SN3X Network Directory connects patients and employers to premium Physician supervised medical services.
									</div>
								</div>
								<div className='col-12 mb-4 d-flex justify-content-center'>
									<Image className='hmpgMarketLogo' src={hmpgLogo} alt='Supernova3x' />
								</div>
								<div className='col-12'>
									<div className='pbpgText center'>Abundant, accessible and affordable healthcare is found in the SN3X Directory.</div>
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='row mt-4 mt-xl-0'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-start'>
									<Image className='pbColImg' src={hmpgMap} alt='Sample Offices' />
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='hmpgInfoText'>For demonstration purposes only</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-10 offset-1 d-flex justify-content-center'>
							<div className='pbpgText center'>Offices are independently owned and operated. Offers may vary by location.</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection pt-4 pb-3'>
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
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-4 mb-xl-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Image className='pbColImg' src={hmpgPatient} alt='Patients' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='pbpgSubHdng'>
								<p>Experience high-quality Healthcare with SN3X Licensed Physicians at a local, friendly, safe medical facility.</p>
							</div>
							<ul>
								<li className='pbpgText'>Affordable healthcare and prescription programs</li>
								<li className='pbpgText'>Affordable Memberships</li>
								<li className='pbpgText'>On-time and never rushed Appointments</li>
								<li className='pbpgText'>Local Office & Virtual Visits</li>
								<li className='pbpgText'>&quot;The Sphere&quot; for medical records, communications and Virtual Visits</li>
								<li className='pbpgText'>Offices are independently owned and operated. Offers may vary by location.</li>
							</ul>
							<div className='pbpgText center'>
								<strong>
									<u>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</u>
								</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberPhy} alt='Physicians' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>For Physicians</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-2 mb-md-0'>
							<div className='pbpgSubHdng'>
								<p>Elevate your clinic to new heights with Professional Healthcare. Make it easy with SN3X Healthcare Technology.</p>
							</div>
							<ul>
								<li className='pbpgText'>Electronic Medical Record</li>
								<li className='pbpgText'>Online Scheduling, E-Fax, and Payment Center</li>
								<li className='pbpgText'>Virtual Healthcare Module (NOVA VISIT)</li>
								<li className='pbpgText'>SN3X Network Directory</li>
								<li className='pbpgText'>The &quot;NOVA Sphere&quot; for Business Operations and much more</li>
								<li className='pbpgText'>COMING SOON - Payroll, Text Messaging, and E-Rx</li>
							</ul>
							<div className='pbpgText center'>
								<strong>
									<u>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</u>
								</strong>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='row mt-4 mt-xl-0'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-start'>
									<Image className='pbColImg red' src={hmpgPhysician} alt='Physicians' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection pt-4 pb-3'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberEmp} alt='Employers' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>For Sponsors</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-4 mb-xl-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Image className='pbColImg ppl' src={hmpgEmployer} alt='Employers' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='pbpgSubHdng'>
								<p>Register for FREE with SUPERNOVA3X and access America&apos;s only Professional Healthcare Marketplace.</p>
							</div>
							<ul>
								<li className='pbpgText'>Shop for affordable, high-value Healthcare in the SN3X Professional Healthcare Network Directory</li>
								<li className='pbpgText'>Affordable Unlimited and Custom Plans</li>
								<li className='pbpgText'>Affordable Supplemental and Specialty Medical Services</li>
								<li className='pbpgText'>
									The &quot;NOVA SPHERE&quot; for Roster Management and Physician &quot;NOVA VISITS&quot; (virtual meetings)
								</li>
								<li className='pbpgText'>Offices are independently owned and operated</li>
							</ul>
							<div className='pbpgText center'>
								<strong>
									<u>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</u>
								</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 px-3 px-lg-5'>
							<div className='pbpgHdng'>Join the Revolution to Restore American Healthcare!</div>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 col-md-8 offset-md-2 d-flex justify-content-center'>
							<ul>
								<li className='pbpgText mb-2'>
									<strong>Patients!</strong> Enjoy lower healthcare costs and healthier outcomes.
								</li>
								<li className='pbpgText mb-2'>
									<strong>Physicians!</strong> Love being a doctor again while growing your clinic.
								</li>
								<li className='pbpgText'>
									<strong>Sponsors!</strong> Get the monkey off your back with self funding.
								</li>
							</ul>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 col-sm-10 offset-sm-1 px-3'>
							<div className='pbpgText'>
								SN3X is here to assist physicians thrive in Professional Healthcare&apos;s free market, help patients find a SN3X Licensed
								Physician, and aid sponsors in finding high-value healthcare benefits for their employees. Experience the difference of
								Professional Healthcare today!
							</div>
						</div>
					</div>
					<div className='row mb-4 d-flex justify-content-center'>
						<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
							<Link href='/subscribers/learnmore'>
								<Button border='555'>
									Patients
									<br />
									Learn More
								</Button>
							</Link>
						</div>
						<div className='col-12 col-sm-auto mx-0 mx-sm-4 mb-3 mb-sm-0 d-flex justify-content-center'>
							<Link href='/physicians/prescreen'>
								<Button border='555'>
									Physicians
									<br />
									Learn More
								</Button>
							</Link>
						</div>
						<div className='col-12 col-sm-auto d-flex justify-content-center'>
							<Link href='/sponsors/learnmore'>
								<Button border='555'>
									Sponsors
									<br />
									Learn More
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
