import React from 'react';
import './page.css';
import Image from 'next/image';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import icoMemberSpn from '@/assets/images/hmpgIcoEmp.png';
import doctors from '@/assets/images/lmEmpDoctors.png';
import reports from '@/assets/images/lmEmpReports.png';
import logo from '@/assets/images/logoCircle.png';
import hmpgMap from '@/assets/images/hmpgMap.png';
import flags from '@/assets/images/lmEmpFlags.png';
import Button from '@/components/global/forms/buttons/Button';
import Link from 'next/link';

export default function SpnLearnMore() {
	return (
		<PageTemplate>
			<div className='pbpgSection pb-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberSpn} alt='Sponsors' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>For Sponsors</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>Welcome to the Future of Employee Healthcare Benefits!</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='pbpgSubHdng start ppl mb-3'>
								Let&apos;s face it. The once fair and equitable relationship between American Healthcare&apos;s Original Stakeholders and
								third-party payers is over.
							</div>
							<div className='pbpgText'>
								<div className='mb-3'>
									The reality is every trip the doctor&apos;s office is an insurance claim and every claim ultimately adds to future premium
									increases. While this is great for the regulators of healthcare its also financially devastating for Stakeholders.
								</div>
								<div>The solution is to implement sensible healthcare programs that are run by Stakeholders for Stakeholders.</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Image className='pbColImg' src={doctors} priority={true} alt='Employers' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='pbpgHdng mb-4'>The choice is simple.</div>
					<div className='row'>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='pbpgSubHdng ppl mb-2'>Professional Healthcare and happier, healthier employees.</div>
							<div className='pbpgText ps-3'>
								<ul>
									<li>Affordable programs and low-cost medical services</li>
									<li>Basic and Custom Plans</li>
									<li>On-time and never rushed Appointments</li>
									<li>In-house Pharmacy and Prescription Plans</li>
									<li>Life-time Sponsor Roster (The Sphere)</li>
									<li>Offices are independently owned and operated</li>
									<li>Terms and Conditions may vary</li>
								</ul>
							</div>
						</div>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='d-flex justify-content-center'>
								<Image className='centerLogo' src={logo} alt='Supernova3x' />
							</div>
						</div>
						<div className='col-12 col-md-10 col-xl-4 px-3 px-lg-0 mb-3 mb-xl-0 offset-0 offset-md-1 offset-xl-0'>
							<div className='pbpgSubHdng ppl mb-2'>Regulated Healthcare and the relentless rising costs of insurance</div>
							<div className='pbpgText mb-3 ps-3'>
								<ul>
									<li>Unbearable premium increases</li>
									<li>Rising Employee out-of-pocket costs</li>
									<li>Shrinking coverage limits</li>
									<li>Limited options (full-benefit coverage only)</li>
									<li>Costs of unwanted and unneeded coverage</li>
									<li>Questionable and unfair underwriting decisions</li>
									<li>
										Growing shortage of doctors and local offices (due to burnout, regulation, increasing costs and decreasing
										reimbursement)
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>Receive Detailed Employee Reports</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Image className='pbColImg' src={reports} priority={true} alt='Reports' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='pbpgSubHdng ppl mb-3'>View Detailed &amp; Comprehensive Reports</div>
							<div className='pbpgText'>
								Your Nova Sphere has the reports you need to effectively manage each employees costs, membership status, wellness programs, and
								so much more!
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>The SN3X Professional Healthcare Directory is Growing!</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='pbpgSubHdng ppl mb-3'>
								Register for FREE with SUPERNOVA3X to access America&apos;s only Professional Healthcare Marketplace.
							</div>
							<div className='pbpgText ps-3 mb-2'>
								<ul>
									<li>Find Primary Care Physicians for your employees</li>
									<li>Choose from Unlimited and Custom Membership Plans</li>
									<li>Shop for Specialist and Supplemental Healthcare in the SN3X Professional Healthcare Network Directory</li>
									<li>The &quot;NOVA SPHERE&quot; for Roster Management and Virtual Meetings</li>
									<li>Offices are independently owned and operated</li>
								</ul>
							</div>
							<div className='pbpgText d-flex justify-content-center'>
								<strong>
									<u>
										<font color='#c175ff'>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</font>
									</u>
								</strong>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='row mt-4 mt-xl-0'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-start'>
									<Image className='pbColImg' src={hmpgMap} priority={true} alt='Sample Offices' />
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
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>Find Value in Professional Healthcare with SN3X</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Image className='pbColImg' src={flags} priority={true} alt='Flags' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='pbpgSubHdng ppl mb-3'>Self Funding, Independent Physician Offices, and SUPERNOVA3X for Better Employee Health</div>
							<div className='pbpgText'>
								Stakeholders have the power to change healthcare, and it starts with employers. As an employer, you control the finances, and
								you have the greatest need for an affordable yet high-value solution for employee healthcare. You bear the costs more than
								anyone, and until now, you had no way out. Stop paying for failed expectations. Take a stand and be a leader for American
								Healthcare.
							</div>
						</div>
						<div className='row mt-4'>
							<div className='col-10 offset-1 d-flex justify-content-center'>
								<Link href='/sponsors/register'>
									<Button type='button' border='#555'>
										Register Now
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
