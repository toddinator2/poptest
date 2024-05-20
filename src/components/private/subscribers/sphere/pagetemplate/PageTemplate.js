import React from 'react';
import './PageTemplate.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import SubSphereContent from '../SubSphereContent';

export default function PageTemplate() {
	return (
		<>
			<div className='subPgContainer'>
				<Header />
				<div className='row'>
					<div className='col-12 col-md-4 col-xl-3 col-xxl-2'>
						<div className='subSideDiv py-2'>
							<Sidebar />
						</div>
					</div>
					<div className='subContContainer col-12 col-md-8 col-xl-9 col-xxl-10'>
						<SubSphereContent />
					</div>
				</div>
			</div>
		</>
	);
}
