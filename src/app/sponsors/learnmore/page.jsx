import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Button from '@/components/global/forms/buttons/Button';
import icoMemberSpn from '@/assets/images/hmpgIcoEmp.png';
import doctors from '@/assets/images/lmEmpDoctors.png';
import reports from '@/assets/images/lmEmpReports.png';
import logo from '@/assets/images/logoCircle.png';
import hmpgMap from '@/assets/images/hmpgMap.png';
import flags from '@/assets/images/lmEmpFlags.png';

export default function SpnLearnMore() {
	return (
		<PageTemplate>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberSpn} alt='Sponsors' />
					</div>
					<div className='mb-5 text-2xl lg:text-3xl flex justify-center'>For Sponsors</div>
					<div className='mb-7 text-2xl lg:text-3xl 2xl:text-4xl text-center'>Welcome to the Future of Employee Healthcare Benefits!</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={doctors} priority={true} alt='Employers' />
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtppl'>
								Let&apos;s face it. The once fair and equitable relationship between American Healthcare&apos;s Original Stakeholders and
								third-party payers is over.
							</div>
							<div className='text-left text-sm lg:text-base'>
								<div className='mb-2'>
									The reality is every trip the doctor&apos;s office is an insurance claim and every claim ultimately adds to future premium
									increases. While this is great for the regulators of healthcare its also financially devastating for Stakeholders.
								</div>
								<div>The solution is to implement sensible healthcare programs that are run by Stakeholders for Stakeholders.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='mb-7 text-2xl lg:text-3xl 2xl:text-4xl text-center'>The choice is simple</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full lg:2/5 lg:pe-7'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtppl'>Professional Healthcare and happier, healthier employees</div>
							<div className='mb-5 lg:mb-0 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
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
						<div className='w-full lg:1/5'>
							<div className='w-full flex justify-center'>
								<Image className='w-52 max-w-full h-auto' src={logo} alt='Supernova3x' />
							</div>
						</div>
						<div className='w-full lg:2/5 lg:ps-7'>
							<div className='mb-2 mt-5 lg:mt-0 text-xl lg:text-2xl text-center text-lgtppl'>
								Regulated Healthcare and the relentless rising costs of insurance
							</div>
							<div className='ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
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
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='mb-7 text-2xl lg:text-3xl 2xl:text-4xl text-center'>Receive Detailed Employee Reports</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={reports} priority={true} alt='Reports' />
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtppl'>View Detailed &amp; Comprehensive Reports</div>
							<div className='text-left text-sm lg:text-base'>
								<div className='mb-2'>
									Your Nova Sphere has the reports you need to effectively manage each employees costs, membership status, wellness programs,
									and so much more!
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='mb-7 text-2xl lg:text-3xl 2xl:text-4xl text-center'>The SN3X Professional Healthcare Directory is Growing!</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full lg:w-1/2 lg:pe-7 2xl:ps-9'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtppl'>
								Register for FREE with SUPERNOVA3X to access America&apos;s only Professional Healthcare Marketplace
							</div>
							<div className='text-left text-sm lg:text-base'>
								<div className='mb-4 ps-12 text-sm xl:text-base'>
									<ul className='list-disc'>
										<li>Find Primary Care Physicians for your employees</li>
										<li>Choose from Unlimited and Custom Membership Plans</li>
										<li>Shop for Specialist and Supplemental Healthcare in the SN3X Professional Healthcare Network Directory</li>
										<li>The &quot;NOVA SPHERE&quot; for Roster Management and Virtual Meetings</li>
										<li>Offices are independently owned and operated</li>
									</ul>
								</div>
								<div className='mb-5 lg:mb-0 flex justify-center'>
									<div className='text-sm font-medium underline'>PERSONAL HEALTH INFORMATION IS NOT FOR SALE</div>
								</div>
							</div>
						</div>
						<div className='w-full lg:mb-0 lg:w-1/2 lg:ps-7'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={hmpgMap} priority={true} alt='Sample Offices' />
							<div className='w-full 2xl:w-4/5 flex justify-center'>
								<div className='mt-1 text-xs'>For demonstration purposes only</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='mb-7 text-2xl lg:text-3xl 2xl:text-4xl text-center'>Find Value in Professional Healthcare with SN3X</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={flags} priority={true} alt='Flags' />
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-2 text-xl lg:text-2xl text-center text-lgtppl'>
								Self Funding, Independent Physician Offices, and SUPERNOVA3X for Better Employee Health
							</div>
							<div className='text-left text-sm lg:text-base'>
								<div className='mb-2'>
									Stakeholders have the power to change healthcare, and it starts with employers. As an employer, you control the finances,
									and you have the greatest need for an affordable yet high-value solution for employee healthcare. You bear the costs more
									than anyone, and until now, you had no way out. Stop paying for failed expectations. Take a stand and be a leader for
									American Healthcare.
								</div>
							</div>
						</div>
					</div>
					<div className='w-full mt-4 flex justify-center'>
						<Link href='/sponsors/register'>
							<Button type='button'>Register Now</Button>
						</Link>
					</div>
				</div>
			</div>
		</PageTemplate>
	);
}
