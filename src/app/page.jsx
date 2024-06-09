import React from 'react';
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
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='text-2xl lg:text-3xl xl:text-4xl mb-7 text-center'>
						Reuniting American Healthcare&apos;s Original Stakeholders to Restore the System to its Former Glory
					</div>
					<div className='mb-5 w-full flex-auto lg:flex'>
						<div className='w-full lg:w-1/2 text-left text-sm lg:text-base lg:pe-7 2xl:ps-9'>
							<div className='mb-5'>
								Introducing SUPERNOVA3X &ndash; a revolutionary Healthcare Software solution for America&apos;s ailing healthcare system,
								empowering patients, employers, and physicians to take back control once and for all.
							</div>
							<div className='mb-5'>
								&quot;The rules have changed. We are bidding farewell to the low-value, high-cost, overregulated system and welcoming
								accessible, affordable healthcare like never before. Come and explore the Professional Healthcare Membership Platform that has
								been specifically designed for American Healthcare&apos;s Original Stakeholders.&quot;
							</div>
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7'>
							<Image
								className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry'
								src={hmpgTablet}
								priority={true}
								alt='Sample Offices'
							/>
						</div>
					</div>
					<div className='mb-5 text-sm lg:text-base text-center'>Available online at www.supernova3x.com</div>
					<div className='mb-1 text-sm lg:text-base text-center'>Coming soon to the Apple Store and Google Play</div>
					<div className='w-full flex-auto lg:flex lg:gap-6 lg:justify-center lg:items-center'>
						<div className='w-full lg:w-1/5 xl:w-1/6 mb-1 lg:mb-0 flex justify-center'>
							<Image className='max-h-28 w-auto' src={america} priority={true} alt='Made in America' />
						</div>
						<div className='w-full lg:w-1/5 xl:w-1/6 mb-2 lg:mb-0 flex justify-center'>
							<Image className='max-h-12 w-auto' src={btnSx3} priority={true} alt='POPpc' />
						</div>
						<div className='w-full lg:w-1/5 xl:w-1/6 mb-2 lg:mb-0 flex justify-center'>
							<Image className='max-h-12 w-auto' src={btnApple} priority={true} alt='Apple Store' />
						</div>
						<div className='w-full lg:w-1/5 xl:w-1/6 flex justify-center'>
							<Image className='max-h-12 w-auto' src={btnGoogle} priority={true} alt='Google Play' />
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='text-2xl lg:text-3xl 2xl:text-4xl mb-7 text-center'>
						Returning Financial Control of Healthcare to the Original Stake Holders
					</div>
				</div>
				<div className='w-5/6 md:w-2/5 xl:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='w-full flex-auto xl:flex xl:gap-3'>
						<div className='xl:w-1/3'>
							<div className='w-full mb-2 flex justify-center'>
								<Image className='max-h-24 w-auto' src={hmpgPts} priority={true} alt='Subscribers' />
							</div>
							<div className='w-full h-5/6 p-4 mb-7 rounded-3xl border-4 border-drkgry relative'>
								<div className='flex justify-center'>
									<div className='text-2xl'>PATIENTS</div>
								</div>
								<div className='mb-5 flex justify-center'>
									<div className='text-base'>(Subscribers)</div>
								</div>
								<div className=' mb-5 text-lg lg:text-xl text-center text-txtblu'>
									Up to 80% lower healthcare costs & 500% more medical services
								</div>
								<div className='ps-12 text-sm lg:text-base'>
									<ul className='list-disc'>
										<li>Free Sign Up & Registration</li>
										<li>Physician Led Healthcare</li>
										<li>Affordable Memberships</li>
										<li>Local Offices</li>
										<li>Lifetime Medical Record</li>
										<li>The Unlimited Membership:</li>
										<div className='ps-10'>
											<ul className='list-square'>
												<li>Office/Virtual Visits</li>
												<li>In-House Diagnostics</li>
												<li>In-House Pharmacy</li>
												<li>Lab Draws</li>
												<li>And More</li>
											</ul>
										</div>
									</ul>
								</div>
								<div className='py-4'>&nbsp;</div>
								<div className='w-full pe-9 absolute bottom-2'>
									<div className='text-xs text-center'>
										*Doctor&apos;s offices are independently owned and operated.
										<br />
										Offers may vary.
									</div>
								</div>
							</div>
						</div>
						<div className='xl:w-1/3'>
							<div className='w-full mb-2 flex justify-center'>
								<Image className='max-h-24 w-auto' src={hmpgPhy} priority={true} alt='Physicians' />
							</div>
							<div className='w-full h-5/6 p-4 mb-7 rounded-3xl border-4 border-drkgry relative'>
								<div className='flex justify-center'>
									<div className='text-2xl'>DOCTORS</div>
								</div>
								<div className='mb-5 flex justify-center'>
									<div className='text-base'>(Physicians)</div>
								</div>
								<div className=' mb-5 text-lg lg:text-xl text-center text-lgtred'>Up to 50% lower operating costs & 100% less red tape</div>
								<div className='ps-12 mb-5 text-sm lg:text-base'>
									<ul className='list-disc'>
										<li>Free Sign Up & Registration</li>
										<li>Medical & Business System</li>
										<li>Professional Healthcare Model</li>
										<li>User Friendly</li>
										<li>Automation</li>
										<li>Any device, anytime, anywhere</li>
										<li>Includes:</li>
										<div className='ps-12'>
											<ul className='list-square'>
												<li>Advanced EMR</li>
												<li>Financial Center</li>
												<li>SN3X Network Directory</li>
												<li>Employer Integration</li>
											</ul>
										</div>
									</ul>
								</div>
								<div className='py-4'>&nbsp;</div>
								<div className='w-full pe-9 absolute bottom-2'>
									<div className='text-xs text-center'>
										*Doctor&apos;s offices are independently owned and operated.
										<br />
										Savings may vary.
									</div>
								</div>
							</div>
						</div>
						<div className='xl:w-1/3'>
							<div className='w-full mb-2 flex justify-center'>
								<Image className='max-h-24 w-auto' src={hmpgEmp} priority={true} alt='Sponsors' />
							</div>
							<div className='w-full h-5/6 p-4 mb-7 rounded-3xl border-4 border-drkgry relative'>
								<div className='flex justify-center'>
									<div className='text-2xl'>EMPLOYERS</div>
								</div>
								<div className='mb-5 flex justify-center'>
									<div className='text-base'>(Sponsors)</div>
								</div>
								<div className=' mb-5 text-lg lg:text-xl text-center text-lgtppl'>Up to 80% lower benefit costs & 100% happier employees</div>
								<div className='ps-12 mb-5 text-sm lg:text-base'>
									<ul className='list-disc'>
										<li>Free Sign Up & Registration</li>
										<li>Integrated Roster Management</li>
										<li>Physician Integration</li>
										<li>SN3X Network Directory</li>
										<li>More:</li>
										<div className='ps-12'>
											<ul className='list-square'>
												<li>Network Directory</li>
												<li>Prescription Plans</li>
												<li>Transparency</li>
												<li>No Gimmicks or Surprises</li>
												<li>No Failed Expectations</li>
												<li>No Premiums to increase</li>
											</ul>
										</div>
									</ul>
								</div>
								<div className='py-4'>&nbsp;</div>
								<div className='w-full pe-9 absolute bottom-2'>
									<div className='text-xs text-center'>
										*Doctor&apos;s offices are independently owned and operated.
										<br />
										Offers may vary.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='text-2xl lg:text-3xl xl:text-4xl mb-7 text-center'>
						Regrouping the Original Stakeholders in the SN3X Professional Healthcare Directory
					</div>
					<div className='mb-5 w-full flex-auto lg:flex'>
						<div className='w-full lg:w-1/2 text-left text-sm lg:text-base lg:pe-7 2xl:ps-9'>
							<div className='w-full mb-5 text-center text-sm lg:text-base'>
								The SN3X Network Directory connects patients and employers to premium Physician supervised medical services.
							</div>
							<div className='w-full mb-5 flex justify-center'>
								<Image className='max-h-28 lg:max-h-40 w-auto' src={hmpgLogo} priority={true} alt='Supernova3x' />
							</div>
							<div className='mb-7 lg:mb-0 text-center text-sm lg:text-base'>
								Abundant, accessible and affordable healthcare is found in the SN3X Directory.
							</div>
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={hmpgMap} priority={true} alt='Sample Offices' />
							<div className='w-full flex justify-center'>
								<div className='mt-1 text-xs'>For demonstration purposes only</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberPts} priority={true} alt='Subscribers' />
					</div>
					<div className='mb-5 text-2xl lg:text-3xl flex justify-center'>For Patients</div>
					<div className='w-full flex-auto lg:flex '>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={hmpgPatient} priority={true} alt='Patients' />
						</div>
						<div className='w-full mb-5 lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-3 text-xl lg:text-2xl text-center text-txtblu'>
								Experience high-quality Healthcare with SN3X Licensed Physicians at a local, friendly, safe medical facility
							</div>
							<div className='ps-12 mb-4 text-sm lg:text-base'>
								<ul className='list-disc'>
									<li>Affordable healthcare and prescription programs</li>
									<li>Affordable Memberships</li>
									<li>On-time and never rushed Appointments</li>
									<li>Local Office & Virtual Visits</li>
									<li>&quot;The Sphere&quot; for medical records, communications and Virtual Visits</li>
									<li>Offices are independently owned and operated. Offers may vary by location.</li>
								</ul>
							</div>
							<div className='flex justify-center'>
								<div className='text-sm font-medium underline'>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberPhy} priority={true} alt='Physicians' />
					</div>
					<div className='mb-5 text-2xl lg:text-3xl flex justify-center'>For Physicians</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:ps-9'>
							<div className='mb-3 text-xl lg:text-2xl text-center text-lgtred'>
								Elevate your clinic to new heights with Professional Healthcare. Make it easy with SN3X Healthcare Technology
							</div>
							<div className='ps-12 mb-4 text-sm lg:text-base'>
								<ul className='list-disc'>
									<li>Electronic Medical Record</li>
									<li>Online Scheduling, E-Fax, and Payment Center</li>
									<li>Virtual Healthcare Module (NOVA VISIT)</li>
									<li>SN3X Network Directory</li>
									<li>The &quot;NOVA Sphere&quot; for Business Operations and much more</li>
									<li>COMING SOON - Payroll, Text Messaging, and E-Rx</li>
								</ul>
							</div>
							<div className='flex justify-center'>
								<div className='text-sm font-medium underline'>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</div>
							</div>
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7'>
							<Image
								className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry'
								src={hmpgPhysician}
								priority={true}
								alt='Physicians'
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberEmp} priority={true} alt='Employers' />
					</div>
					<div className='mb-5 text-2xl lg:text-3xl flex justify-center'>For Sponsors</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={hmpgEmployer} priority={true} alt='Employers' />
						</div>
						<div className='w-full mb-5 lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-3 text-xl lg:text-2xl text-center text-lgtppl'>
								Register for FREE with SUPERNOVA3X and access America&apos;s only Professional Healthcare Marketplace
							</div>
							<div className='ps-12 mb-4 text-sm lg:text-base'>
								<ul className='list-disc'>
									<li>Shop for affordable, high-value Healthcare in the SN3X Professional Healthcare Network Directory</li>
									<li>Affordable Unlimited and Custom Plans</li>
									<li>Affordable Supplemental and Specialty Medical Services</li>
									<li>The &quot;NOVA SPHERE&quot; for Roster Management and Physician &quot;NOVA VISITS&quot; (virtual meetings)</li>
									<li>Offices are independently owned and operated</li>
								</ul>
							</div>
							<div className='flex justify-center'>
								<div className='text-sm font-medium underline'>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full pt-7 pb-10'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='text-2xl lg:text-3xl xl:text-4xl mb-7 text-center'>Join the Revolution to Restore American Healthcare!</div>
					<div className='lg:ps-0 lg:w-1/2 lg:mx-auto'>
						<div className='ps-8 mb-7 text-sm lg:text-base'>
							<ul className='list-disc'>
								<li className='mb-2'>
									<strong>Patients!</strong> Enjoy lower healthcare costs and healthier outcomes.
								</li>
								<li className='mb-2'>
									<strong>Physicians!</strong> Love being a doctor again while growing your clinic.
								</li>
								<li>
									<strong>Sponsors!</strong> Get the monkey off your back with self funding.
								</li>
							</ul>
						</div>
					</div>
					<div className='w-4/5 mx-auto mb-7 text-sm lg:text-base'>
						SN3X is here to assist physicians thrive in Professional Healthcare&apos;s free market, help patients find a SN3X Licensed Physician,
						and aid sponsors in finding high-value healthcare benefits for their employees. Experience the difference of Professional Healthcare
						today!
					</div>
					<div className='w-full flex-auto lg:flex lg:justify-center lg:gap-3'>
						<div className='w-full lg:w-auto mb-3 lg:mb-0 flex justify-center'>
							<Link href='/subscribers/learnmore'>
								<Button type='button'>
									<div className='w-full text-lg text-center'>Patients</div>
									<div className='w-full text-sm text-center'>Learn More</div>
								</Button>
							</Link>
						</div>
						<div className='w-full lg:w-auto mb-3 lg:mb-0 flex justify-center'>
							<Link href='/physicians/prescreen'>
								<Button type='button'>
									<div className='w-full text-lg text-center'>Physicians</div>
									<div className='w-full text-sm text-center'>Learn More</div>
								</Button>
							</Link>
						</div>
						<div className='w-full lg:w-auto mb-3 lg:mb-0 flex justify-center'>
							<Link href='/sponsors/learnmore'>
								<Button type='button'>
									<div className='w-full text-lg text-center'>Sponsors</div>
									<div className='w-full text-sm text-center'>Learn More</div>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
