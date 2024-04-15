'use client';
import React, { useContext, useState } from 'react';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { saveInLocalStorage } from '@/utils/helpers/auth';

export default function SetLocation({ funcCall }) {
	const lsDefLoc = process.env.DEFAULT_LOCATION;
	const [office, setOffice] = useContext(OfficeContext);
	const [locId, setLocId] = useState(office.defLoc);

	const handleLocation = async (id) => {
		const response = await fetch(`${process.env.API_URL}/private/physicians/office/locations/get/byid?locid=${id}`, {
			method: 'GET',
		});
		const data = await response.json();
		setOffice({
			locations: office.locations,
			selLoc: data.loc,
			locOptions: office.locOptions,
			defLoc: id,
			users: office.users,
			resources: office.resources,
			rscOptions: office.rscOptions,
		});
		//save in local storage
		saveInLocalStorage(lsDefLoc, id);
		setLocId(id);
		handleClose();
	};

	const handleClose = () => {
		funcCall(true);
	};

	return (
		<>
			{office.locOptions.length > 1 && (
				<div className='col-10 mb-1'>
					<label className='frmLabel'>Select Location</label>
					<select className='inpBorder form-control' value={locId} onChange={(e) => handleLocation(e.target.value)}>
						<option value=''>Select One...</option>
						{office.locOptions.map((loc) => (
							<option value={loc.value} key={loc.value}>
								{loc.label}
							</option>
						))}
					</select>
				</div>
			)}
		</>
	);
}
