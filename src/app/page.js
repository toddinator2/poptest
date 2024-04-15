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
import hmpgTablet from '@/assets/images/hmpgTablet.png';
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
					<div className='row mb-4'>
						<div className='pbColSides'>
							<div className='pbpgText ps-lg-3'>
								<p>
									<strong>Great news for America&apos;s ailing healthcare system:</strong> New cloud-based software is now available to help restore the professional
									healthcare industry and end the shortage of American physicians, marking a significant turning point in the history of American Healthcare and the worlds
									greatest healthcare system.
								</p>
								<p className='mb-4'>
									<strong>SUPERNOVA3X</strong>, allows patients, physicians, and sponsors to confidently make all medical decisions without any third-party interference.
									This enables &ldquo;The Original Stakeholders of American Healthcare&rdquo; to determine the actual value of physician-supervised medical services,
									ensuring that it remains abundant, accessible, and affordable, just as it was intended.
								</p>
							</div>
						</div>
						<div className='pbColCenter d-none d-lg-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-start'>
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
					<div className='col-12 px-3 px-lg-5'>
						<div className='pbpgHdng'>Returning Financial Control to the Original Stake Holders</div>
					</div>
				</div>
				<div className='row d-flex justify-content-evenly justify-content-xl-center'>
					<div className='finDiv blu mb-3 mb-xl-0'>
						<div className='row mb-1'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='hmpgIcoControl mb-3' src={hmpgPts} alt='Subscribers' />
							</div>
						</div>
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
								<div className='finSubHdng'>Up to 80% lower healthcare costs & 400% more services</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-12'>
								<ul>
									<li className='finText'>Free Sign Up & Registration</li>
									<li className='finText'>Physician Led Healthcare</li>
									<li className='finText'>Local Offices</li>
									<li className='finText'>The Unlimited Plan Gives You Unlimited:</li>
									<ul>
										<li className='finText'>Office/Virtual Visits</li>
										<li className='finText'>In-House Diagnostics</li>
										<li className='finText'>Lifetime Medical Record</li>
										<li className='finText'>In-House Pharmacy</li>
										<li className='finText'>Lab Draws</li>
										<li className='finText'>And More</li>
									</ul>
								</ul>
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
					<div className='finDiv red mb-3 mb-xl-0 mx-xl-5'>
						<div className='row mb-1'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='hmpgIcoControl mb-3' src={hmpgPhy} alt='Physicians' />
							</div>
						</div>
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
									<li className='finText'>Complete Healthcare & Business System</li>
									<li className='finText'>Any device, anytime, anywhere</li>
									<li className='finText'>Up to 500 pre-paid patients per provider (with SUPERNOVA3X Professional Healthcare Marketplace Agreement)</li>
									<li className='finText'>Gain Financial Control</li>
									<li className='finText'>Simple set up & training</li>
									<li className='finText'>Traditional Business Model</li>
								</ul>
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
					<div className='finDiv ppl'>
						<div className='row mb-1'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='hmpgIcoControl mb-3' src={hmpgEmp} alt='Sponsors' />
							</div>
						</div>
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
								<div className='finSubHdng'>Up to 80% lower benefit costs & 100% happier employees</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-12'>
								<ul>
									<li className='finText'>Free Sign Up & Registration</li>
									<li className='finText'>Happier & Healthier Employees</li>
									<li className='finText'>Simple Roster & Payment System</li>
									<li className='finText'>Multiple Membership Options</li>
									<li className='finText'>Specialist Marketplace</li>
									<li className='finText'>Prescription Plans</li>
									<li className='finText'>Monthly Payments</li>
									<li className='finText'>Physician Relationships</li>
									<li className='finText'>No Surprises</li>
									<li className='finText'>No Gimmicks</li>
									<li className='finText'>No Failed Expectations</li>
								</ul>
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
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 px-3 px-lg-5'>
							<div className='pbpgHdng'>Regrouping the Original Stakeholders in the SUPERNOVA3X Professional Healthcare Marketplace</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='pbColSides ps-lg-3'>
							<div className='row d-flex justify-content-center'>
								<div className='col-12 mb-4'>
									<div className='hmpgMarketText'>A software-platform that connects stakeholders to affordable and premium physician led medical services.</div>
								</div>
								<div className='col-12 mb-4 d-flex justify-content-center'>
									<Image className='hmpgMarketLogo' src={hmpgLogo} alt='Supernova3x' />
								</div>
								<div className='col-12 mb-4 mb-xl-0'>
									<div className='hmpgMarketText'>Abundant, accessible and affordable healthcare for almost everyone.</div>
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-start'>
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
					<div className='row'>
						<div className='pbColSides mb-4 mb-lg-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-end'>
									<Image className='pbColImg blu' src={hmpgPatient} alt='Patients' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='pbpgText pe-lg-3'>
								<p>
									<strong>Every day more patients are choosing SUPERNOVA3X Licensed Physicians for high-quality, affordable healthcare in a safe environment.</strong>
								</p>
								<ul>
									<li className='pbpgText'>Affordable programs and low-cost medical services</li>
									<li className='pbpgText'>Unlimited Office & Virtual Visits</li>
									<li className='pbpgText'>Self- and Sponsor-paid options</li>
									<li className='pbpgText'>On-time and never rushed Appointments</li>
									<li className='pbpgText'>In-house Pharmacy and Prescription Plans</li>
									<li className='pbpgText'>Lifetime Medical Record (The Sphere)</li>
									<li className='pbpgText'>No complexity, confusion, or failed expectations</li>
									<li className='pbpgText'>Offices are independently owned and operated</li>
									<li className='pbpgText'>Terms and Conditions may vary</li>
									<li className='pbpgText'>PERSONAL HEALTH INFORMATION NOT FOR SALE</li>
								</ul>
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
					<div className='row'>
						<div className='pbColSides mb-2 mb-md-0'>
							<div className='pbpgText mb-lg-0 ps-lg-3'>
								<p>
									<strong>Elevate your healthcare business to new heights with SUPERNOVA3X Advanced Technology.</strong>
								</p>
								<ul>
									<li className='pbpgText'>Electronic Medical Record</li>
									<li className='pbpgText'>Virtual Healthcare</li>
									<li className='pbpgText'>Electronic Finance Manager</li>
									<li className='pbpgText'>Electronic Prescriptions</li>
									<li className='pbpgText'>The Sphere for Medical and Business Operations</li>
									<li className='pbpgText'>Vendor APIs</li>
									<li className='pbpgText'>Online Scheduling, SMS and Marketing Tools</li>
									<li className='pbpgText'>Paperless, Secure, and Evolving</li>
									<li className='pbpgText'>Any Time, Any Where, on Any Device</li>
								</ul>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-start'>
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
					<div className='row'>
						<div className='pbColSides mb-4 mb-lg-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-lg-end'>
									<Image className='pbColImg ppl' src={hmpgEmployer} alt='Employers' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides pe-lg-5'>
							<div className='pbpgText pe-3'>
								<p>
									<strong>
										Make Professional Healthcare the crown jewel of your employee benefits program. Register your company today for free with SUPERNOVA3X and bring
										competition and innovation to negotiations.
									</strong>
								</p>
								<ul>
									<li className='pbpgText'>Affordable!</li>
									<li className='pbpgText'>Basic, Group, and Custom Plans</li>
									<li className='pbpgText'>The SPHERE for Roster Management, Payments, and Membership Options</li>
									<li className='pbpgText'>Quarterly Value Reports (nonmedical)</li>
									<li className='pbpgText'>Offices are independently owned and operated</li>
									<li className='pbpgText'>Terms and Conditions may vary</li>
									<li className='pbpgText'>Monthly ACH Payments Required</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 col-lg-10 offset-lg-1 px-3'>
							<div className='pbpgHdng'>Join the Revolution to Restore America&apos;s Ailing Healthcare System!</div>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 col-md-8 offset-md-2 d-flex justify-content-center'>
							<ul>
								<li className='hmpgBulletText blu mb-2'>Patients! Enjoy lower costs and healthier outcomes.</li>
								<li className='hmpgBulletText red mb-2'>Physicians! Love being a doctor again.</li>
								<li className='hmpgBulletText ppl'>Sponsors! Get the monkey off your back.</li>
							</ul>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col-12 px-3 d-flex justify-content-center'>
							<div className='pbpgText'>
								<strong>Be part of American Healthcare&apos;s great come-back story!</strong>
							</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 col-sm-10 offset-sm-1 px-3'>
							<div className='pbpgText'>
								To begin, simply visit Supernova3x.com to register. We are here to assist physicians in starting their New Professional Healthcare Company, help patients find
								a SUPERNOVA3X Licensed Physician, and aid Sponsors in finding high-value healthcare for their employees.
							</div>
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
							<Link href='/subscribers/learnmore'>
								<Button border='0000FF'>
									Patients
									<br />
									Learn More
								</Button>
							</Link>
						</div>
						<div className='col-12 col-sm-auto mx-0 mx-sm-4 mb-3 mb-sm-0 d-flex justify-content-center'>
							<Link href='/physicians/prescreen'>
								<Button border='FF0000'>
									Physicians
									<br />
									Learn More
								</Button>
							</Link>
						</div>
						<div className='col-12 col-sm-auto d-flex justify-content-center'>
							<Link href='/sponsors/learnmore'>
								<Button border='8000FF'>
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
