import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import icoShow from '@/assets/images/icoShow.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function SbMsgList() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [messages, setMessages] = useState([]);
	const [shwSvdDiv, setShwSvdDiv] = useState(false);
	const [chkdMsgs, setChkdMsgs] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadMessages = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/get/messages?subid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.msgs.length !== 0) {
				setMessages(data.msgs);
			}
			setChkdMsgs(true);
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadMessages();
	}, [loadMessages]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchMessages = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const msgs = mongodb.db(dbName).collection('messages');

			for await (const change of msgs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadMessages();
				}
			}
		};
		wchMessages();
	}, [dbName, loadMessages]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const shwSvdList = () => {
		setShwSvdDiv(!shwSvdDiv);
	};

	const handleAdd = () => {
		setMenu({ type: 'msgAdd', func: '', dets: '', vids: menu.vids, page: menu.page });
	};

	return (
		<>
			<div className='w-full flex justify-end'>
				<Image className='hover: cursor-pointer' src={icoShow} width={20} height={20} title='Create Message' alt='New' onClick={() => handleAdd()} />
			</div>
			{messages.length === 0 && chkdMsgs ? (
				<div className='text-sm text-center font-semibold text-drkred'>No Messages Found</div>
			) : (
				<>
					{messages.map((msg) => (
						<div className='mb-1 text-sm text-txtblu hover:text-lgtblu cursor-pointer' key={msg._id} onClick={() => handleAdd()}>
							{msg.datesent} &dash; {msg.subject}
						</div>
					))}
				</>
			)}
		</>
	);
}
