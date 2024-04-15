'use client';
import React, { useState } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Register from '@/actions/global/register/Register';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';
import sphere from '@/assets/images/lmPhySphere.png';
import sales from '@/assets/images/lmPhySales.png';
import start from '@/assets/images/lmPhyStart.png';
import logo from '@/assets/images/logoLgt.png';
import price from '@/assets/images/lmPhyPrice.png';

export default function PhyRegister({ params }) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const verifycode = params?.slug;
	const router = useRouter();
	const [uname, setUname] = useState('');
	const [newPword, setNewPword] = useState('');
	const [cnfPword, setCnfPword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Check Password
		if (!newPword || newPword.length < 6) {
			toast.error('Password is required and must be at least 6 characters long');
			setNewPword('');
			setCnfPword('');
			document.getElementById('newPword').focus();
			return;
		}
		if (newPword !== cnfPword) {
			toast.error('Passwords do not match, please try again');
			setNewPword('');
			setCnfPword('');
			document.getElementById('newPword').focus();
			return;
		}

		try {
			const objData = {
				register: 'physicians/register',
				verifycode,
				username: uname,
				password: newPword,
				token,
			};
			//Encrypt data to send and send
			const regData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await Register(regData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('User not found');
				return;
			}
			if (data.status === 401) {
				toast.error('Username is already taken, please try another');
				document.getElementById('username').focus();
				return;
			}
			if (data.status === 500) {
				toast.error('Network Error: Please try again');
				return;
			}
			if (data.status === 501) {
				toast.error('Invalid Data: Please try again');
				return;
			}

			if (data.status === 200) {
				//Need to login for Demo page
				const result = await signIn('credentials', {
					redirect: false,
					type: 'physician',
					username: uname.toLowerCase(),
					password: newPword,
				});

				if (result?.error) {
					toast.error('Error with username or password');
				} else {
					toast.success('Account created successfully');
					router.push('/physicians/demo');
				}
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setLoading(false);
		}
	};

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
							<div className='pbpgHdng mb-3'>Designed for Docs by a Doc, with critical input from other Docs</div>
							<div className='pbpgText'>
								<p>
									<strong>With Supernova3x Digital Properties</strong>, managing healthcare and business operations is affordable and easy. The Golden Ratio Design allows
									doctors to balance their time between medical services and finances effortlessly. Allowing more time to devote to their family, patients, employees, and
									community. Supernova3x empowers doctors to practice efficiently and live fully.
								</p>
								<p>
									Now available, Supernova3x offers User-Friendly and Intelligent Business Tools designed for both Doctors and Owners, who are often the same. Built from
									scratch Supernova3x Digital Properties delivers reliability and sustainability for the future of professional healthcare.
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
							<div className='pbpgHdng mb-3'>Technology designed specifically for the advancement of healthcare.</div>
							<div className='pbpgText'>
								<p>
									<strong>Supernova3x EMR & Finance is the all-in-one solution</strong> for every Professional Healthcare company&apos;s crucial needs:{' '}
									<strong>Medical and Business Operations.</strong>
								</p>
								<p>
									<strong>With Supernova3x&apos;s EMR</strong>, medical teams experience a seamless workflow thanks to its Golden Ratio Design, resulting in{' '}
									<strong>fewer clicks</strong>, smooth charting, effective communication, recording and much, much more.
								</p>
								<p>
									<strong>Supernova3x Digital Finance</strong> reliably manages the company&apos;s transactions, inventory, and sales, while auto connecting with your bank
									and the accountant in real-time. This saves everyone time and money while also painting <strong>a reliable financial picture for the owners</strong>.
								</p>
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
									<Image className='pbColImg red' src={sphere} alt='Physician Sphere' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='pbpgText mb-4'>
								<p>
									<strong>The Physician Sphere serves as the central hub</strong> for managing both the medical and business aspects of any healthcare company. It offers
									automation and peace of mind.
								</p>
							</div>
							<div className='row mb-4 d-flex justify-content-center'>
								<div className='col-10 col-md-4 col-xl-6'>
									<div className='phyPreRegHdngSphere'>Manage Medical</div>
									<div className='pbpgText'>
										<ul>
											<li>Virtual Visit</li>
											<li>Medical Records</li>
											<li>Medical Services</li>
											<li>Communications</li>
											<li>Care Coordination</li>
											<li>Messaging</li>
										</ul>
									</div>
								</div>
								<div className='col-10 col-md-4 col-xl-6'>
									<div className='phyPreRegHdngSphere'>Manage Business</div>
									<div className='pbpgText'>
										<ul>
											<li>Control:</li>
											<ul>
												<li>Costs & Finances</li>
												<li>Products & Services</li>
											</ul>
											<li>Connect With:</li>
											<ul>
												<li>Bank</li>
												<li>Accountant</li>
											</ul>
										</ul>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='phyPreRegHdngSphere center'>Get your Supernova3x License now!</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='pbColSides mb-3 mb-md-0'>
							<div className='row mb-3'>
								<div className='col-12 px-3 px-lg-5'>
									<div className='phyPreRegMidTextSm'>Professional Healthcare Finance Meets General Store Simplicity</div>
								</div>
							</div>
							<div className='pbpgText mb-3'>
								<p>
									<strong>The Heart of every Professional Company</strong> is its finances, and when it comes to managing those finances,{' '}
									<strong>Supernova3x Digital Finance</strong> integrates with most Digital Banking Services. Use Supernova3x Digital Finance to manage transactions, view
									reports, and keep the accountant up to date.
								</p>
								<p>
									<strong>Supernova3x Digital Finance anytime, any where and from any device.</strong>
								</p>
								<ul>
									<li>Supernova3x API Integration for Automation and Security</li>
									<li>Connect with Banks and Accountants</li>
									<li>User Friendly and informative thanks to FREE Sales Reports</li>
									<li>Track inventory, costs, taxes and more</li>
									<li>Standard Reports - DAILY, WEEKLY, MONTHLY, SALES FORECAST, YTD, YTM, AR</li>
								</ul>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center'>
									<Image className='pbColImg red' src={sales} alt='Physician Sales Forecast' />
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='phyPreRegInfoText'>For demonstration purposes only</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='pbColSides mb-3 mb-md-0'>
							<div className='row mb-3'>
								<div className='col-12 px-3 px-lg-5'>
									<div className='phyPreRegMidTextLg'>Upgrade to Supernova3x for:</div>
								</div>
							</div>
							<div className='row d-flex justify-content-center'>
								<div className='col-11'>
									<div className='pbpgText'>
										<ul>
											<li>Reasonable Margins</li>
											<li>Reasonable Pay</li>
											<li>Financial Control</li>
											<li>Retirement Planning</li>
											<li>Manageability</li>
											<li>Body, Mind, and Soul</li>
											<li>Family & Vacation Time</li>
											<li>Community Leadership</li>
											<li>Mentorship</li>
											<li>Succession Planning</li>
											<li>Comfortable Retirement</li>
											<li>Charitable Giving</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='row mb-3'>
								<div className='col-12 px-3 px-lg-5'>
									<div className='phyPreRegHdngStrikeThru'>Outdated payment method:</div>
								</div>
							</div>
							<div className='row d-flex justify-content-center'>
								<div className='col-11'>
									<div className='phyPreRegTextStrikeThru'>
										<ul>
											<li>High Cost</li>
											<li>Low Pay</li>
											<li>Soul Crushing Red Tape</li>
											<li>High Complexity & Confusion</li>
											<li>Unreasonable Interference of Business</li>
											<li>Billing & Coding</li>
											<li>Billing Companies & Clearing Houses</li>
											<li>Denial & Rejections</li>
											<li>Prior Authorization</li>
											<li>PBM&apos;s, ACO&apos;s & Billing Co&apos;s.</li>
											<li>Pursuit of Payment & Collections</li>
											<li>Credentialing</li>
											<li>A Business With Little Value</li>
											<li>Additional Staff and Vendors</li>
											<li>Co-pay&apos;s & deductibles</li>
											<li>HIPPA</li>
											<li>Email Chaos</li>
										</ul>
									</div>
								</div>
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
									<Image className='pbColImg red' src={start} alt='Physician Quick Start' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='row mb-3'>
								<div className='col-12 px-3 px-lg-5'>
									<div className='phyPreRegHdngSphere'>Supernova3x&apos;s Quick Start can help you quickly start new, or transition your existing business.</div>
								</div>
							</div>
							<div className='row d-flex justify-content-center'>
								<div className='col-12 col-sm-11'>
									<div className='pbpgText mb-4'>
										<ul>
											<li>Affordable & Automated</li>
											<li>Innovative & Intelligent</li>
											<li>Simple Set-up & Training</li>
											<li>Free Technical Support</li>
											<li>Accessible at www.supernova3x.com and coming soon to the Apple Store and Google Play.</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='pbColSides mb-3 mb-md-0'>
							<div className='row mb-4'>
								<div className='col-12 px-3 px-lg-5'>
									<div className='phyPreRegMidTextSm'>Upgrade to Professional Healthcare</div>
								</div>
							</div>
							<div className='row mb-4'>
								<div className='col-12 d-flex justify-content-center'>
									<Image className='phyPreRegLogo' src={logo} alt='Supernova3x' />
								</div>
							</div>
							<div className='pbpgText'>
								<p>
									Early adopter support, in return, gives Supernova3x&apos;s lowest price ever and our most valuable features to help run your New Professional Healthcare
									Company.
								</p>
								<p>
									Early onboarding guarantees Free automatic upgrades as we rapidly deploy new features. We are committed to improving the lives of doctors and the patient
									population. We appreciate your Early Adopter support.
								</p>
							</div>
						</div>
						<div className='pbColCenter d-none d-md-block'></div>
						<div className='pbColSides'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='pbColImg red'>
										<div className='row my-2'>
											<div className='col-12 d-flex justify-content-center'>
												<div className='phyPreRegPriceTextLg'>Special Offer - Early Adopter</div>
											</div>
										</div>
										<div className='row mb-3'>
											<div className='col-12'>
												<div className='phyPreRegMidTextSm'>Get Licensed For</div>
											</div>
										</div>
										<div className='row mb-3'>
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
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-5'>
				<div className='pbpgContainer'>
					<div className='row mb-3'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='phyPreRegHdngSphere'>Get Started Now!</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='row d-flex justify-content-center'>
							<div className='col-8 col-md-4 col-xl-3 '>
								<Input label='Create a Username' type='text' id='username' required={true} value={uname} setValue={setUname} />
								<Input label='Create a Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
								<Input label='Confirm Password' type='password' required={true} value={cnfPword} setValue={setCnfPword} />
								<div className='row mt-4'>
									<div className='col-12 d-flex justify-content-center'>
										<Button border='ff0000' disabled={!uname || !newPword || !cnfPword}>
											Submit Information
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</PageTemplate>
	);
}
