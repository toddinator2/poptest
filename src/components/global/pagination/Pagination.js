import React from 'react';
import './Pagination.css';

export default function Pagination(props) {
	return (
		<nav>
			<ul className='pagination justify-content-center'>
				<li className='page-item'>
					<button className='page-link' onClick={props.prev}>
						&#60;
					</button>
				</li>
				{props.pgNums.map((pgNumber) => (
					<li key={pgNumber} className={`page-item ${props.curPage === pgNumber ? 'active' : ''} `}>
						<button className='page-link' onClick={() => props.handler(pgNumber)}>
							{pgNumber}
						</button>
					</li>
				))}
				<li className='page-item'>
					<button className='page-link' onClick={props.next}>
						&#62;
					</button>
				</li>
			</ul>
		</nav>
	);
}
