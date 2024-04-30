import React, { useState } from 'react';
import Image from 'next/image';
import icoMin from '@/assets/images/icoMinimize.png';
import icoShow from '@/assets/images/icoShow.png';
import icoClose from '@/assets/images/icoClose.png';

export default function ReminderBoard() {
	const [shwReminders, setShwReminders] = useState(false);
	const [close, setClose] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleShow = () => {
		setShwReminders(!shwReminders);
	};

	const handleClose = () => {
		setClose(true);
	};

	return (
		<>
			{!close && (
				<>
					{!shwReminders ? (
						<div className='sbButton'>
							<div className='row d-flex align-items-center'>
								<div className='col-9 d-flex justify-content-start'>
									<div>Reminder Board</div>
								</div>
								<div className='col-3'>
									<div className='row d-flex align-items-center'>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoShow}
												width={15}
												height={15}
												title='Show'
												alt='Show'
												onClick={() => handleShow()}
											/>
										</div>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoClose}
												width={15}
												height={15}
												title='Close'
												alt='Close'
												onClick={() => handleClose()}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='sbButton active'>
							<div className='row d-flex align-items-center'>
								<div className='col-9 d-flex justify-content-start'>
									<div>Reminder Board</div>
								</div>
								<div className='col-3'>
									<div className='row d-flex align-items-center'>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoMin}
												width={15}
												height={5}
												title='Minimize'
												alt='Min'
												onClick={() => handleShow()}
											/>
										</div>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoClose}
												width={15}
												height={15}
												title='Close'
												alt='Close'
												onClick={() => handleClose()}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='row '>
								<div className='col-12 d-flex justify-content-center'>
									<div className='errMsg'>Coming Soon</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}
