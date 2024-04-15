import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { saveInLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function AddTemplate() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [name, setName] = useState('');
	const [cat, setCat] = useState('');
	const [body, setBody] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/templates/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					category: cat,
					tmpBody: body,
					userId: auth.user._id,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				saveInLocalStorage('tmpRefresh', true);
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	const handleClose = () => {
		setName('');
		setCat('');
		setBody('');
		setMenu({ type: menu.type, func: '' });
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Add Template</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-12 col-xl-8'>
					<form onSubmit={handleSubmit}>
						<Input label='Name' type='text' value={name} setValue={setName} />
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>Category</label>
							</div>
							<div className='col-12'>
								<select className='form-control inpBorder' value={cat} onChange={(e) => setCat(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='Subjective'>Subjective</option>
									<option value='Objective'>Objective</option>
									<option value='Assessment'>Assessment</option>
									<option value='Plan'>Plan</option>
								</select>
							</div>
						</div>
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>Template Body</label>
							</div>
							<div className='col-12'>
								<textarea className='form-control inpBorder' rows={2} value={body} onChange={(e) => setBody(e.target.value)} />
							</div>
						</div>
						<div className='row my-3 d-flex justify-content-center'>
							<Button border='ff0000' disabled={!name || !cat || !body}>
								Save Changes
							</Button>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</>
	);
}
