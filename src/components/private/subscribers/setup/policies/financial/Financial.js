import React from 'react';
import Link from 'next/link';
import Button from '@/components/global/forms/buttons/Button';

export default function Financial() {
	return (
		<div className='polContainer p-3'>
			<div className='polHdng mb-3 d-flex justify-content-center'>SUPERNOVA3X SUBSCRIBER</div>
			<div className='polSubHdng mb-4 d-flex justify-content-center'>Financial Responsibility</div>
			<div className='polText'>
				<div className='mb-3'>For your convenience, we offer the following methods of payment: ACH, Cash or Credit/Debit Card.</div>
				<ul>
					<li className='mb-3'>
						<strong>Sponsor </strong>&ndash; I hereby authorize direct payment from SPONSOR NAME to CLINIC NAME for payment of membership, and
						pre-approved goods and services rendered. I understand that I am financially responsible for any balance not covered by SPONSOR NAME
						including collection costs. I hereby waive my confidentiality rights should collection become necessary. I understand membership fees
						must be paid at the time of service.
						<ul>
							<li>
								<strong>Sponsor ID: </strong>SPONSOR ID
							</li>
						</ul>
					</li>
					<li>
						<strong>Self-Sponsorship </strong>&ndash; I hereby authorize direct payment from my bank account or credit card for payment of
						membership, and pre-approved medical goods and services rendered. I understand that I am financially responsible for any balance due
						including collection costs. I hereby waive my confidentiality rights should collection become necessary.
						<ul>
							<li>
								<strong>Bank Account: </strong>*LAST 4 OF ACCOUNT NUMBER
							</li>
							<li>
								<strong>Credit/Debit Card: </strong>*LAST 4 OF CARD NUMBER
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div className='mt-4 d-flex justify-content-center'>
				<Link href={`${pdfUrl}/subscribers/pdf/financial`} passHref legacyBehavior>
					<a target='_blank' rel='noopener noreferrer'>
						<Button type='submit' border='555555'>
							Sign & Save
						</Button>
					</a>
				</Link>
			</div>
		</div>
	);
}
